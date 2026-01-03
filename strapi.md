# Strapi CMS Instructions
## Content Management Guide

---

## Overview

- **Version:** Strapi 5
- **Database:** PostgreSQL (via Supabase)
- **Media:** Local storage (Docker volume) or S3

---

## Project Structure

```
apps/cms/
├── src/
│   ├── api/                    # Content types
│   │   ├── page/
│   │   ├── service/
│   │   ├── case-study/
│   │   ├── blog-post/
│   │   ├── team-member/
│   │   ├── testimonial/
│   │   └── resource/
│   │
│   ├── components/             # Reusable components
│   │   ├── shared/
│   │   │   ├── seo.json
│   │   │   ├── button.json
│   │   │   └── media.json
│   │   └── sections/
│   │       ├── hero.json
│   │       ├── features.json
│   │       └── cta.json
│   │
│   ├── plugins/                # Custom plugins
│   └── extensions/             # Core extensions
│
├── config/
│   ├── database.ts
│   ├── server.ts
│   ├── admin.ts
│   └── plugins.ts
│
├── public/
│   └── uploads/                # Media files
│
└── types/
    └── generated/              # Auto-generated types
```

---

## Content Types

### Page (Flexible Page Builder)

```json
// src/api/page/content-types/page/schema.json
{
  "kind": "collectionType",
  "collectionName": "pages",
  "info": {
    "singularName": "page",
    "pluralName": "pages",
    "displayName": "Page"
  },
  "options": {
    "draftAndPublish": true
  },
  "attributes": {
    "title": {
      "type": "string",
      "required": true
    },
    "slug": {
      "type": "uid",
      "targetField": "title",
      "required": true
    },
    "seo": {
      "type": "component",
      "component": "shared.seo"
    },
    "sections": {
      "type": "dynamiczone",
      "components": [
        "sections.hero",
        "sections.features",
        "sections.cta",
        "sections.testimonials",
        "sections.stats",
        "sections.content-block",
        "sections.team-grid",
        "sections.faq"
      ]
    }
  }
}
```

### Service

```json
// src/api/service/content-types/service/schema.json
{
  "kind": "collectionType",
  "collectionName": "services",
  "info": {
    "singularName": "service",
    "pluralName": "services",
    "displayName": "Service"
  },
  "options": {
    "draftAndPublish": true
  },
  "attributes": {
    "name": {
      "type": "string",
      "required": true
    },
    "slug": {
      "type": "uid",
      "targetField": "name",
      "required": true
    },
    "shortDescription": {
      "type": "text",
      "required": true
    },
    "description": {
      "type": "richtext"
    },
    "icon": {
      "type": "string"
    },
    "image": {
      "type": "media",
      "allowedTypes": ["images"]
    },
    "features": {
      "type": "component",
      "repeatable": true,
      "component": "shared.feature-item"
    },
    "relatedServices": {
      "type": "relation",
      "relation": "manyToMany",
      "target": "api::service.service"
    },
    "caseStudies": {
      "type": "relation",
      "relation": "manyToMany",
      "target": "api::case-study.case-study",
      "mappedBy": "services"
    },
    "seo": {
      "type": "component",
      "component": "shared.seo"
    },
    "order": {
      "type": "integer",
      "default": 0
    }
  }
}
```

### Case Study

```json
// src/api/case-study/content-types/case-study/schema.json
{
  "kind": "collectionType",
  "collectionName": "case_studies",
  "info": {
    "singularName": "case-study",
    "pluralName": "case-studies",
    "displayName": "Case Study"
  },
  "options": {
    "draftAndPublish": true
  },
  "attributes": {
    "title": {
      "type": "string",
      "required": true
    },
    "slug": {
      "type": "uid",
      "targetField": "title",
      "required": true
    },
    "client": {
      "type": "string",
      "required": true
    },
    "clientLogo": {
      "type": "media",
      "allowedTypes": ["images"]
    },
    "industry": {
      "type": "relation",
      "relation": "manyToOne",
      "target": "api::industry.industry"
    },
    "services": {
      "type": "relation",
      "relation": "manyToMany",
      "target": "api::service.service",
      "inversedBy": "caseStudies"
    },
    "challenge": {
      "type": "richtext",
      "required": true
    },
    "solution": {
      "type": "richtext",
      "required": true
    },
    "results": {
      "type": "component",
      "repeatable": true,
      "component": "shared.metric"
    },
    "testimonial": {
      "type": "component",
      "component": "shared.testimonial-quote"
    },
    "featuredImage": {
      "type": "media",
      "allowedTypes": ["images"]
    },
    "gallery": {
      "type": "media",
      "multiple": true,
      "allowedTypes": ["images"]
    },
    "featured": {
      "type": "boolean",
      "default": false
    },
    "seo": {
      "type": "component",
      "component": "shared.seo"
    }
  }
}
```

### Blog Post

```json
// src/api/blog-post/content-types/blog-post/schema.json
{
  "kind": "collectionType",
  "collectionName": "blog_posts",
  "info": {
    "singularName": "blog-post",
    "pluralName": "blog-posts",
    "displayName": "Blog Post"
  },
  "options": {
    "draftAndPublish": true
  },
  "attributes": {
    "title": {
      "type": "string",
      "required": true
    },
    "slug": {
      "type": "uid",
      "targetField": "title",
      "required": true
    },
    "excerpt": {
      "type": "text",
      "required": true
    },
    "content": {
      "type": "richtext",
      "required": true
    },
    "featuredImage": {
      "type": "media",
      "allowedTypes": ["images"]
    },
    "author": {
      "type": "relation",
      "relation": "manyToOne",
      "target": "api::team-member.team-member"
    },
    "category": {
      "type": "relation",
      "relation": "manyToOne",
      "target": "api::category.category"
    },
    "tags": {
      "type": "relation",
      "relation": "manyToMany",
      "target": "api::tag.tag"
    },
    "readTime": {
      "type": "integer"
    },
    "seo": {
      "type": "component",
      "component": "shared.seo"
    }
  }
}
```

---

## Components

### SEO Component

```json
// src/components/shared/seo.json
{
  "collectionName": "components_shared_seos",
  "info": {
    "displayName": "SEO",
    "icon": "search"
  },
  "attributes": {
    "metaTitle": {
      "type": "string",
      "maxLength": 60
    },
    "metaDescription": {
      "type": "text",
      "maxLength": 160
    },
    "ogImage": {
      "type": "media",
      "allowedTypes": ["images"]
    },
    "canonicalUrl": {
      "type": "string"
    },
    "noIndex": {
      "type": "boolean",
      "default": false
    }
  }
}
```

### Hero Section Component

```json
// src/components/sections/hero.json
{
  "collectionName": "components_sections_heroes",
  "info": {
    "displayName": "Hero",
    "icon": "star"
  },
  "attributes": {
    "headline": {
      "type": "string",
      "required": true
    },
    "subheadline": {
      "type": "text"
    },
    "backgroundType": {
      "type": "enumeration",
      "enum": ["image", "video", "gradient"],
      "default": "image"
    },
    "backgroundImage": {
      "type": "media",
      "allowedTypes": ["images"]
    },
    "backgroundVideo": {
      "type": "string"
    },
    "primaryButton": {
      "type": "component",
      "component": "shared.button"
    },
    "secondaryButton": {
      "type": "component",
      "component": "shared.button"
    },
    "alignment": {
      "type": "enumeration",
      "enum": ["left", "center", "right"],
      "default": "left"
    }
  }
}
```

### Features Section Component

```json
// src/components/sections/features.json
{
  "collectionName": "components_sections_features",
  "info": {
    "displayName": "Features",
    "icon": "grid"
  },
  "attributes": {
    "title": {
      "type": "string"
    },
    "subtitle": {
      "type": "text"
    },
    "columns": {
      "type": "enumeration",
      "enum": ["2", "3", "4"],
      "default": "3"
    },
    "features": {
      "type": "component",
      "repeatable": true,
      "component": "shared.feature-item"
    }
  }
}
```

---

## Configuration

### Database (PostgreSQL)

```typescript
// config/database.ts
export default ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST', 'db'),
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME', 'thinkspace'),
      user: env('DATABASE_USERNAME', 'postgres'),
      password: env('DATABASE_PASSWORD', ''),
      ssl: env.bool('DATABASE_SSL', false) && {
        rejectUnauthorized: false,
      },
    },
    pool: {
      min: 2,
      max: 10,
    },
  },
})
```

### Server

```typescript
// config/server.ts
export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: env('PUBLIC_URL', 'http://localhost:1337'),
  app: {
    keys: env.array('APP_KEYS'),
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
})
```

### Plugins

```typescript
// config/plugins.ts
export default ({ env }) => ({
  // GraphQL (optional)
  graphql: {
    enabled: true,
    config: {
      endpoint: '/graphql',
      shadowCRUD: true,
      playgroundAlways: env('NODE_ENV') !== 'production',
    },
  },
  
  // i18n
  i18n: {
    enabled: true,
    config: {
      defaultLocale: 'en',
      locales: ['en', 'th'],
    },
  },
  
  // Upload (local or S3)
  upload: {
    config: {
      provider: 'local',
      providerOptions: {
        sizeLimit: 10 * 1024 * 1024, // 10MB
      },
    },
  },
  
  // SEO
  seo: {
    enabled: true,
  },
})
```

---

## API Endpoints

### REST API

```
# Content
GET    /api/services              # List services
GET    /api/services/:id          # Get service by ID
GET    /api/services?filters[slug][$eq]=cloud-services  # Filter by slug

# With relations
GET    /api/services?populate=*   # Populate all relations
GET    /api/services?populate[0]=caseStudies&populate[1]=features

# Pagination
GET    /api/services?pagination[page]=1&pagination[pageSize]=10

# Sorting
GET    /api/services?sort=order:asc

# Complex queries
GET    /api/blog-posts?filters[category][slug][$eq]=news&sort=publishedAt:desc&pagination[limit]=5
```

### Fetching from Next.js

```typescript
// lib/strapi.ts

interface StrapiResponse<T> {
  data: T
  meta: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

interface StrapiEntity<T> {
  id: number
  attributes: T
}

// Fetch services
export async function getServices() {
  const res = await fetch(
    `${STRAPI_URL}/api/services?populate=*&sort=order:asc`,
    {
      headers: { Authorization: `Bearer ${STRAPI_TOKEN}` },
      next: { revalidate: 3600 },
    }
  )
  
  const data: StrapiResponse<StrapiEntity<Service>[]> = await res.json()
  return data.data
}

// Fetch single service by slug
export async function getServiceBySlug(slug: string) {
  const res = await fetch(
    `${STRAPI_URL}/api/services?filters[slug][$eq]=${slug}&populate=*`,
    {
      headers: { Authorization: `Bearer ${STRAPI_TOKEN}` },
      next: { revalidate: 3600 },
    }
  )
  
  const data: StrapiResponse<StrapiEntity<Service>[]> = await res.json()
  return data.data[0] || null
}

// Fetch blog posts with pagination
export async function getBlogPosts(page = 1, pageSize = 10) {
  const res = await fetch(
    `${STRAPI_URL}/api/blog-posts?` +
    `populate[0]=featuredImage&populate[1]=author&populate[2]=category&` +
    `sort=publishedAt:desc&` +
    `pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
    {
      headers: { Authorization: `Bearer ${STRAPI_TOKEN}` },
      next: { revalidate: 60 },
    }
  )
  
  return res.json()
}
```

---

## Webhooks (Revalidation)

### Strapi Webhook Config

Configure webhooks in Strapi admin:
- URL: `https://yoursite.com/api/revalidate`
- Events: `entry.create`, `entry.update`, `entry.delete`, `entry.publish`

### Next.js Revalidation Handler

```typescript
// app/api/revalidate/route.ts
import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-webhook-secret')
  
  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
  }

  const body = await request.json()
  const { model, entry } = body

  // Revalidate based on content type
  switch (model) {
    case 'service':
      revalidatePath('/services')
      revalidatePath(`/services/${entry.slug}`)
      break
    case 'blog-post':
      revalidatePath('/blog')
      revalidatePath(`/blog/${entry.slug}`)
      revalidateTag('blog-posts')
      break
    case 'case-study':
      revalidatePath('/case-studies')
      revalidatePath(`/case-studies/${entry.slug}`)
      break
    case 'page':
      revalidatePath(`/${entry.slug}`)
      break
  }

  return NextResponse.json({ revalidated: true })
}
```

---

## Admin Customization

### Custom Admin Logo

```javascript
// src/admin/app.tsx
export default {
  config: {
    locales: ['en', 'th'],
    auth: {
      logo: '/uploads/logo.svg',
    },
    menu: {
      logo: '/uploads/logo-small.svg',
    },
    head: {
      favicon: '/uploads/favicon.ico',
    },
    theme: {
      light: {
        colors: {
          primary100: '#f0fdf4',
          primary200: '#dcfce7',
          primary500: '#22c55e',
          primary600: '#16a34a',
          primary700: '#15803d',
        },
      },
    },
    tutorials: false,
    notifications: { releases: false },
  },
}
```

---

## Common Commands

```bash
# Development
npm run develop

# Build for production
npm run build
npm run start

# Generate types
npm run strapi ts:generate-types

# Create new content type
npm run strapi generate content-type

# Create new component
npm run strapi generate component

# Database
npm run strapi database:migrate

# Import/Export
npm run strapi export
npm run strapi import
```
