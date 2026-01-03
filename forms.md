# Forms Instructions
## Form Handling & Validation Guide

---

## Stack

- **Library:** React Hook Form
- **Validation:** Zod
- **UI:** Custom components
- **Submission:** Server Actions or API

---

## Validation Schemas

```typescript
// lib/validations.ts
import { z } from 'zod'

export const contactSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(100),
  lastName: z.string().min(1, 'Last name is required').max(100),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  company: z.string().optional(),
  jobTitle: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
})

export const newsletterSchema = z.object({
  email: z.string().email('Invalid email address'),
})

export const eventRegistrationSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  company: z.string().optional(),
  dietaryRequirements: z.string().optional(),
})

export type ContactFormData = z.infer<typeof contactSchema>
export type NewsletterFormData = z.infer<typeof newsletterSchema>
```

---

## Contact Form Component

```typescript
// components/forms/contact-form.tsx
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactSchema, type ContactFormData } from '@/lib/validations'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'

interface ContactFormProps {
  services?: { value: string; label: string }[]
  onSuccess?: () => void
}

export function ContactForm({ services, onSuccess }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  async function onSubmit(data: ContactFormData) {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to submit form')
      }

      setIsSuccess(true)
      reset()
      onSuccess?.()
    } catch (error) {
      setSubmitError('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckIcon className="w-8 h-8 text-primary-600" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Thank you!</h3>
        <p className="text-neutral-600">We'll get back to you shortly.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="First Name *"
          {...register('firstName')}
          error={errors.firstName?.message}
        />
        <Input
          label="Last Name *"
          {...register('lastName')}
          error={errors.lastName?.message}
        />
      </div>

      <Input
        label="Email *"
        type="email"
        {...register('email')}
        error={errors.email?.message}
      />

      <Input
        label="Phone"
        type="tel"
        {...register('phone')}
        error={errors.phone?.message}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Company"
          {...register('company')}
        />
        <Input
          label="Job Title"
          {...register('jobTitle')}
        />
      </div>

      {services && (
        <Select
          label="Service Interest"
          options={services}
          {...register('service')}
        />
      )}

      <Textarea
        label="Message *"
        rows={5}
        {...register('message')}
        error={errors.message?.message}
      />

      {submitError && (
        <div className="p-4 bg-red-50 text-red-700 rounded-md">
          {submitError}
        </div>
      )}

      <Button type="submit" isLoading={isSubmitting} className="w-full">
        Send Message
      </Button>
    </form>
  )
}
```

---

## Newsletter Form

```typescript
// components/forms/newsletter-form.tsx
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { newsletterSchema, type NewsletterFormData } from '@/lib/validations'

export function NewsletterForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const { register, handleSubmit, reset, formState: { errors } } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  })

  async function onSubmit(data: NewsletterFormData) {
    setStatus('loading')
    
    try {
      await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      setStatus('success')
      reset()
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return <p className="text-primary-600">Thanks for subscribing!</p>
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
      <input
        type="email"
        placeholder="Enter your email"
        className="flex-1 px-4 py-2 rounded-md border border-neutral-300"
        {...register('email')}
      />
      <Button type="submit" isLoading={status === 'loading'}>
        Subscribe
      </Button>
    </form>
  )
}
```

---

## Server Action Pattern

```typescript
// app/actions/contact.ts
'use server'

import { z } from 'zod'
import { contactSchema } from '@/lib/validations'
import { supabaseAdmin } from '@/lib/supabase-server'
import { sendEmail } from '@/lib/email'

export async function submitContactForm(formData: FormData) {
  const rawData = {
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    company: formData.get('company'),
    message: formData.get('message'),
  }

  // Validate
  const result = contactSchema.safeParse(rawData)
  if (!result.success) {
    return { success: false, errors: result.error.flatten().fieldErrors }
  }

  // Save to database
  const { error } = await supabaseAdmin
    .from('contact_submissions')
    .insert({
      form_type: 'contact',
      ...result.data,
    })

  if (error) {
    return { success: false, error: 'Failed to save submission' }
  }

  // Send notification
  await sendEmail({
    to: process.env.CONTACT_EMAIL!,
    subject: 'New Contact Form Submission',
    template: 'contact-notification',
    data: result.data,
  })

  return { success: true }
}
```

---

## Form with Server Action

```typescript
// components/forms/contact-form-action.tsx
'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { submitContactForm } from '@/app/actions/contact'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Sending...' : 'Send Message'}
    </Button>
  )
}

export function ContactFormAction() {
  const [state, formAction] = useFormState(submitContactForm, null)

  return (
    <form action={formAction} className="space-y-4">
      <Input name="firstName" label="First Name" required />
      <Input name="lastName" label="Last Name" required />
      <Input name="email" type="email" label="Email" required />
      <Textarea name="message" label="Message" required />
      
      {state?.error && (
        <div className="text-red-600">{state.error}</div>
      )}
      
      <SubmitButton />
    </form>
  )
}
```

---

## Honeypot Spam Protection

```typescript
// Add hidden field
<input
  type="text"
  name="website"
  className="hidden"
  tabIndex={-1}
  autoComplete="off"
/>

// Check on server
if (formData.get('website')) {
  // Bot detected, silently reject
  return { success: true }
}
```

---

## Rate Limiting

```typescript
// middleware.ts or API route
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '1 m'), // 5 requests per minute
})

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown'
  const { success } = await ratelimit.limit(ip)
  
  if (!success) {
    return Response.json({ error: 'Too many requests' }, { status: 429 })
  }
  
  // Process form...
}
```
