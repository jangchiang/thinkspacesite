# Next.js 15 Instructions
## Frontend Development Guide

---

## Overview

- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS + Shadcn/ui
- **State:** Zustand (minimal usage)
- **Forms:** React Hook Form + Zod

---

## App Router Structure

```
apps/web/
├── app/
│   ├── (marketing)/           # Marketing pages group
│   │   ├── layout.tsx         # Shared marketing layout
│   │   ├── page.tsx           # Homepage
│   │   ├── about/
│   │   ├── services/
│   │   │   ├── page.tsx       # Services listing
│   │   │   └── [slug]/
│   │   │       └── page.tsx   # Individual service
│   │   ├── case-studies/
│   │   ├── industries/
│   │   ├── careers/
│   │   └── contact/
│   │
│   ├── (resources)/           # Content pages group
│   │   ├── layout.tsx
│   │   ├── blog/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   ├── resources/
│   │   └── events/
│   │
│   ├── api/                   # API routes (edge)
│   │   └── revalidate/
│   │
│   ├── [locale]/              # i18n (optional)
│   │
│   ├── layout.tsx             # Root layout
│   ├── not-found.tsx
│   ├── error.tsx
│   ├── loading.tsx
│   └── globals.css
│
├── components/
├── lib/
├── hooks/
└── types/
```

---

## Component Patterns

### Server Component (Default)

```typescript
// app/(marketing)/services/page.tsx
import { getServices } from '@/lib/strapi'
import { ServiceGrid } from '@/components/sections/service-grid'

export const metadata = {
  title: 'Services | Think Space',
  description: 'Enterprise technology solutions',
}

export default async function ServicesPage() {
  const services = await getServices()

  return (
    <main className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Our Services</h1>
      <ServiceGrid services={services} />
    </main>
  )
}
```

### Client Component

```typescript
// components/ui/contact-form.tsx
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactSchema, type ContactFormData } from '@/lib/validations'

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      message: '',
    },
  })

  async function onSubmit(data: ContactFormData) {
    setIsSubmitting(true)
    try {
      await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(data),
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* Form fields */}
    </form>
  )
}
```

### Hybrid Pattern (Server + Client)

```typescript
// app/(marketing)/case-studies/page.tsx
import { getCaseStudies } from '@/lib/strapi'
import { CaseStudyFilters } from './case-study-filters' // Client
import { CaseStudyGrid } from './case-study-grid'       // Server

export default async function CaseStudiesPage({
  searchParams,
}: {
  searchParams: { industry?: string; service?: string }
}) {
  const caseStudies = await getCaseStudies(searchParams)

  return (
    <main>
      <CaseStudyFilters />  {/* Client: handles filter state */}
      <CaseStudyGrid data={caseStudies} />  {/* Server: renders list */}
    </main>
  )
}
```

---

## Data Fetching

### From Strapi

```typescript
// lib/strapi.ts
import { cache } from 'react'

const STRAPI_URL = process.env.STRAPI_URL || 'http://cms:1337'
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN

async function fetchStrapi<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${STRAPI_URL}/api${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${STRAPI_TOKEN}`,
    },
    next: { revalidate: 3600 }, // ISR: 1 hour
    ...options,
  })

  if (!res.ok) {
    throw new Error(`Strapi error: ${res.status}`)
  }

  return res.json()
}

// Cached fetchers
export const getServices = cache(async () => {
  const data = await fetchStrapi<StrapiResponse<Service[]>>(
    '/services?populate=*'
  )
  return data.data
})

export const getServiceBySlug = cache(async (slug: string) => {
  const data = await fetchStrapi<StrapiResponse<Service[]>>(
    `/services?filters[slug][$eq]=${slug}&populate=*`
  )
  return data.data[0] || null
})
```

### From API Server

```typescript
// lib/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://api:3001'

export async function submitLead(data: LeadFormData) {
  const res = await fetch(`${API_URL}/leads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    throw new Error('Failed to submit lead')
  }

  return res.json()
}
```

---

## Metadata & SEO

### Static Metadata

```typescript
// app/(marketing)/about/page.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us | Think Space',
  description: 'Learn about Think Space, a leading technology company...',
  openGraph: {
    title: 'About Us | Think Space',
    description: 'Learn about Think Space...',
    images: ['/og/about.jpg'],
  },
}
```

### Dynamic Metadata

```typescript
// app/(marketing)/services/[slug]/page.tsx
import { Metadata } from 'next'
import { getServiceBySlug } from '@/lib/strapi'

type Props = { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = await getServiceBySlug(params.slug)

  if (!service) {
    return { title: 'Service Not Found' }
  }

  return {
    title: `${service.attributes.name} | Think Space`,
    description: service.attributes.description,
    openGraph: {
      title: service.attributes.name,
      description: service.attributes.description,
      images: [getImageUrl(service.attributes.image)],
    },
  }
}
```

### generateStaticParams

```typescript
// app/(marketing)/services/[slug]/page.tsx
export async function generateStaticParams() {
  const services = await getServices()
  
  return services.map((service) => ({
    slug: service.attributes.slug,
  }))
}
```

---

## Loading & Error States

### Loading UI

```typescript
// app/(marketing)/services/loading.tsx
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-16">
      <Skeleton className="h-12 w-64 mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-64 rounded-lg" />
        ))}
      </div>
    </div>
  )
}
```

### Error Boundary

```typescript
// app/(marketing)/services/error.tsx
'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
      <p className="text-neutral-600 mb-8">{error.message}</p>
      <Button onClick={reset}>Try again</Button>
    </div>
  )
}
```

---

## Internationalization

### Configuration

```typescript
// next.config.js
module.exports = {
  i18n: {
    locales: ['en', 'th'],
    defaultLocale: 'en',
  },
}
```

### Usage

```typescript
// lib/i18n.ts
const dictionaries = {
  en: () => import('@/dictionaries/en.json').then((m) => m.default),
  th: () => import('@/dictionaries/th.json').then((m) => m.default),
}

export const getDictionary = async (locale: 'en' | 'th') => {
  return dictionaries[locale]()
}

// app/[locale]/page.tsx
export default async function Page({
  params: { locale },
}: {
  params: { locale: 'en' | 'th' }
}) {
  const dict = await getDictionary(locale)
  return <h1>{dict.home.title}</h1>
}
```

---

## Performance Optimization

### Image Optimization

```typescript
import Image from 'next/image'

<Image
  src={imageUrl}
  alt="Description"
  width={800}
  height={600}
  priority={isAboveFold}
  placeholder="blur"
  blurDataURL={blurDataUrl}
  className="rounded-lg"
/>
```

### Dynamic Imports

```typescript
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('./heavy-component'), {
  loading: () => <Skeleton className="h-96" />,
  ssr: false, // Client-only if needed
})
```

### Route Prefetching

```typescript
import Link from 'next/link'

// Prefetch on hover (default)
<Link href="/services">Services</Link>

// Disable prefetch for less important links
<Link href="/terms" prefetch={false}>Terms</Link>
```

---

## Environment Variables

```typescript
// Access in Server Components
const apiUrl = process.env.API_URL

// Access in Client Components (must be NEXT_PUBLIC_)
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL

// Type-safe env
// lib/env.ts
import { z } from 'zod'

const envSchema = z.object({
  STRAPI_URL: z.string().url(),
  STRAPI_API_TOKEN: z.string(),
  NEXT_PUBLIC_SITE_URL: z.string().url(),
})

export const env = envSchema.parse(process.env)
```

---

## File Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Page | `page.tsx` | `app/about/page.tsx` |
| Layout | `layout.tsx` | `app/layout.tsx` |
| Loading | `loading.tsx` | `app/services/loading.tsx` |
| Error | `error.tsx` | `app/error.tsx` |
| Component | `kebab-case.tsx` | `components/ui/button.tsx` |
| Hook | `use-*.ts` | `hooks/use-scroll.ts` |
| Utility | `kebab-case.ts` | `lib/format-date.ts` |
| Type | `*.types.ts` | `types/strapi.types.ts` |
