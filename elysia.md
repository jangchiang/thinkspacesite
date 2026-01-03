# Elysia API Instructions
## Backend API Development Guide

---

## Overview

- **Runtime:** Bun
- **Framework:** Elysia
- **Validation:** TypeBox (built-in)
- **Database:** Supabase (PostgreSQL)
- **Cache:** Redis

---

## Project Structure

```
apps/api/
├── src/
│   ├── index.ts              # Entry point
│   ├── routes/
│   │   ├── index.ts          # Route aggregator
│   │   ├── leads.ts          # Lead management
│   │   ├── contact.ts        # Contact forms
│   │   ├── newsletter.ts     # Newsletter subscription
│   │   ├── events.ts         # Event registration
│   │   ├── resources.ts      # Resource downloads
│   │   ├── search.ts         # Search API
│   │   └── analytics.ts      # Analytics tracking
│   │
│   ├── services/
│   │   ├── email.service.ts  # Email sending
│   │   ├── lead.service.ts   # Lead business logic
│   │   └── search.service.ts # Search operations
│   │
│   ├── middleware/
│   │   ├── auth.ts           # JWT authentication
│   │   ├── rateLimit.ts      # Rate limiting
│   │   ├── cors.ts           # CORS config
│   │   └── logger.ts         # Request logging
│   │
│   ├── lib/
│   │   ├── supabase.ts       # Supabase client
│   │   ├── redis.ts          # Redis client
│   │   ├── meilisearch.ts    # Search client
│   │   └── resend.ts         # Email client
│   │
│   ├── types/
│   │   └── index.ts          # Shared types
│   │
│   └── utils/
│       ├── validation.ts     # Custom validators
│       └── helpers.ts        # Utility functions
│
├── package.json
├── tsconfig.json
└── bunfig.toml
```

---

## Entry Point

```typescript
// src/index.ts
import { Elysia } from 'elysia'
import { cors } from '@elysiajs/cors'
import { swagger } from '@elysiajs/swagger'
import { rateLimit } from 'elysia-rate-limit'

import { routes } from './routes'
import { logger } from './middleware/logger'

const app = new Elysia()
  // Plugins
  .use(cors({
    origin: process.env.CORS_ORIGINS?.split(',') || ['http://localhost:3000'],
    credentials: true,
  }))
  .use(swagger({
    documentation: {
      info: {
        title: 'Think Space API',
        version: '1.0.0',
      },
    },
  }))
  .use(rateLimit({
    max: 100,
    duration: 60000, // 1 minute
  }))
  
  // Middleware
  .use(logger)
  
  // Routes
  .use(routes)
  
  // Health check
  .get('/health', () => ({ status: 'ok', timestamp: new Date().toISOString() }))
  
  // Error handling
  .onError(({ code, error }) => {
    console.error(`Error [${code}]:`, error)
    
    return {
      success: false,
      error: code === 'VALIDATION' 
        ? 'Invalid request data' 
        : 'Internal server error',
    }
  })
  
  .listen(process.env.PORT || 3001)

console.log(`🦊 API running at ${app.server?.hostname}:${app.server?.port}`)
```

---

## Route Patterns

### Basic Route

```typescript
// src/routes/leads.ts
import { Elysia, t } from 'elysia'
import { supabase } from '../lib/supabase'
import { sendEmail } from '../services/email.service'

export const leadsRoutes = new Elysia({ prefix: '/leads' })

  // Create lead
  .post(
    '/',
    async ({ body }) => {
      const { data, error } = await supabase
        .from('leads')
        .insert({
          ...body,
          status: 'new',
          source: 'website',
        })
        .select()
        .single()

      if (error) throw new Error(error.message)

      // Send notification email
      await sendEmail({
        to: process.env.SALES_EMAIL!,
        subject: 'New Lead Received',
        template: 'new-lead',
        data: body,
      })

      return { success: true, data }
    },
    {
      body: t.Object({
        firstName: t.String({ minLength: 1 }),
        lastName: t.String({ minLength: 1 }),
        email: t.String({ format: 'email' }),
        phone: t.Optional(t.String()),
        company: t.Optional(t.String()),
        jobTitle: t.Optional(t.String()),
        message: t.Optional(t.String()),
        service: t.Optional(t.String()),
      }),
      response: t.Object({
        success: t.Boolean(),
        data: t.Any(),
      }),
    }
  )

  // Get lead by ID (authenticated)
  .get(
    '/:id',
    async ({ params: { id } }) => {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw new Error(error.message)
      return data
    },
    {
      params: t.Object({
        id: t.String({ format: 'uuid' }),
      }),
    }
  )
```

### Route with Authentication

```typescript
// src/routes/admin.ts
import { Elysia, t } from 'elysia'
import { authMiddleware } from '../middleware/auth'

export const adminRoutes = new Elysia({ prefix: '/admin' })
  .use(authMiddleware)  // Apply to all routes in this group
  
  .get('/leads', async ({ user }) => {
    // user is available from auth middleware
    const { data } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })
    
    return data
  })
  
  .patch(
    '/leads/:id',
    async ({ params: { id }, body }) => {
      const { data, error } = await supabase
        .from('leads')
        .update(body)
        .eq('id', id)
        .select()
        .single()

      if (error) throw new Error(error.message)
      return { success: true, data }
    },
    {
      params: t.Object({ id: t.String() }),
      body: t.Object({
        status: t.Optional(t.Union([
          t.Literal('new'),
          t.Literal('contacted'),
          t.Literal('qualified'),
          t.Literal('converted'),
          t.Literal('lost'),
        ])),
        assignedTo: t.Optional(t.String()),
        notes: t.Optional(t.String()),
      }),
    }
  )
```

### Route Aggregator

```typescript
// src/routes/index.ts
import { Elysia } from 'elysia'
import { leadsRoutes } from './leads'
import { contactRoutes } from './contact'
import { newsletterRoutes } from './newsletter'
import { eventsRoutes } from './events'
import { searchRoutes } from './search'
import { analyticsRoutes } from './analytics'

export const routes = new Elysia()
  .use(leadsRoutes)
  .use(contactRoutes)
  .use(newsletterRoutes)
  .use(eventsRoutes)
  .use(searchRoutes)
  .use(analyticsRoutes)
```

---

## Middleware

### Authentication

```typescript
// src/middleware/auth.ts
import { Elysia } from 'elysia'
import { jwt } from '@elysiajs/jwt'

export const authMiddleware = new Elysia()
  .use(jwt({
    name: 'jwt',
    secret: process.env.JWT_SECRET!,
  }))
  .derive(async ({ headers, jwt }) => {
    const auth = headers.authorization
    
    if (!auth?.startsWith('Bearer ')) {
      throw new Error('Unauthorized')
    }

    const token = auth.slice(7)
    const payload = await jwt.verify(token)
    
    if (!payload) {
      throw new Error('Invalid token')
    }

    return { user: payload }
  })
```

### Logging

```typescript
// src/middleware/logger.ts
import { Elysia } from 'elysia'

export const logger = new Elysia()
  .onRequest(({ request }) => {
    console.log(`→ ${request.method} ${request.url}`)
  })
  .onResponse(({ request, set }) => {
    console.log(`← ${request.method} ${request.url} ${set.status}`)
  })
```

### Rate Limiting (Custom)

```typescript
// src/middleware/rateLimit.ts
import { Elysia } from 'elysia'
import { redis } from '../lib/redis'

export const customRateLimit = (options: {
  max: number
  window: number // seconds
  keyPrefix?: string
}) => {
  return new Elysia()
    .derive(async ({ request }) => {
      const ip = request.headers.get('x-forwarded-for') || 'unknown'
      const key = `${options.keyPrefix || 'ratelimit'}:${ip}`
      
      const current = await redis.incr(key)
      
      if (current === 1) {
        await redis.expire(key, options.window)
      }
      
      if (current > options.max) {
        throw new Error('Rate limit exceeded')
      }
      
      return { rateLimitRemaining: options.max - current }
    })
}
```

---

## Services

### Email Service

```typescript
// src/services/email.service.ts
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

interface EmailOptions {
  to: string | string[]
  subject: string
  template: string
  data: Record<string, any>
}

export async function sendEmail(options: EmailOptions) {
  const html = await renderTemplate(options.template, options.data)
  
  const { data, error } = await resend.emails.send({
    from: 'Think Space <noreply@thinkspace.com>',
    to: options.to,
    subject: options.subject,
    html,
  })

  if (error) {
    console.error('Email error:', error)
    throw error
  }

  return data
}

async function renderTemplate(
  template: string, 
  data: Record<string, any>
): Promise<string> {
  // Simple template rendering
  const templates: Record<string, (data: any) => string> = {
    'new-lead': (d) => `
      <h1>New Lead Received</h1>
      <p><strong>Name:</strong> ${d.firstName} ${d.lastName}</p>
      <p><strong>Email:</strong> ${d.email}</p>
      <p><strong>Company:</strong> ${d.company || 'N/A'}</p>
      <p><strong>Message:</strong> ${d.message || 'N/A'}</p>
    `,
    'contact-confirmation': (d) => `
      <h1>Thank you for contacting us</h1>
      <p>Hi ${d.firstName},</p>
      <p>We received your message and will get back to you shortly.</p>
    `,
  }

  return templates[template]?.(data) || ''
}
```

### Search Service

```typescript
// src/services/search.service.ts
import { meilisearch } from '../lib/meilisearch'

const INDEX_NAME = 'content'

export async function search(query: string, options?: {
  filters?: string
  limit?: number
  offset?: number
}) {
  const index = meilisearch.index(INDEX_NAME)
  
  return index.search(query, {
    limit: options?.limit || 10,
    offset: options?.offset || 0,
    filter: options?.filters,
    attributesToHighlight: ['title', 'content'],
  })
}

export async function indexDocument(doc: {
  id: string
  type: 'page' | 'blog' | 'service' | 'case-study'
  title: string
  content: string
  slug: string
  [key: string]: any
}) {
  const index = meilisearch.index(INDEX_NAME)
  await index.addDocuments([doc])
}

export async function removeDocument(id: string) {
  const index = meilisearch.index(INDEX_NAME)
  await index.deleteDocument(id)
}
```

---

## Library Clients

### Supabase

```typescript
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'
import type { Database } from '../types/database.types'

export const supabase = createClient<Database>(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
)
```

### Redis

```typescript
// src/lib/redis.ts
import { Redis } from 'ioredis'

export const redis = new Redis(process.env.REDIS_URL || 'redis://redis:6379')

// Helper functions
export async function cacheGet<T>(key: string): Promise<T | null> {
  const data = await redis.get(key)
  return data ? JSON.parse(data) : null
}

export async function cacheSet(
  key: string, 
  value: any, 
  ttl?: number
): Promise<void> {
  const data = JSON.stringify(value)
  if (ttl) {
    await redis.setex(key, ttl, data)
  } else {
    await redis.set(key, data)
  }
}

export async function cacheDelete(key: string): Promise<void> {
  await redis.del(key)
}
```

### Meilisearch

```typescript
// src/lib/meilisearch.ts
import { MeiliSearch } from 'meilisearch'

export const meilisearch = new MeiliSearch({
  host: process.env.MEILISEARCH_HOST || 'http://meilisearch:7700',
  apiKey: process.env.MEILISEARCH_KEY,
})

// Initialize indexes
export async function initSearchIndexes() {
  const index = meilisearch.index('content')
  
  await index.updateSettings({
    searchableAttributes: ['title', 'content', 'description'],
    filterableAttributes: ['type', 'industry', 'service'],
    sortableAttributes: ['createdAt', 'title'],
  })
}
```

---

## Validation Schemas

```typescript
// src/types/schemas.ts
import { t } from 'elysia'

export const leadSchema = t.Object({
  firstName: t.String({ minLength: 1, maxLength: 100 }),
  lastName: t.String({ minLength: 1, maxLength: 100 }),
  email: t.String({ format: 'email' }),
  phone: t.Optional(t.String({ pattern: '^[+]?[0-9\\s-()]+$' })),
  company: t.Optional(t.String({ maxLength: 200 })),
  jobTitle: t.Optional(t.String({ maxLength: 100 })),
  message: t.Optional(t.String({ maxLength: 2000 })),
  service: t.Optional(t.String()),
  source: t.Optional(t.String()),
})

export const newsletterSchema = t.Object({
  email: t.String({ format: 'email' }),
  preferences: t.Optional(t.Object({
    updates: t.Boolean(),
    blog: t.Boolean(),
    events: t.Boolean(),
  })),
})

export const eventRegistrationSchema = t.Object({
  eventId: t.String(),
  firstName: t.String({ minLength: 1 }),
  lastName: t.String({ minLength: 1 }),
  email: t.String({ format: 'email' }),
  company: t.Optional(t.String()),
  dietaryRequirements: t.Optional(t.String()),
})

export const searchSchema = t.Object({
  q: t.String({ minLength: 1 }),
  type: t.Optional(t.Union([
    t.Literal('page'),
    t.Literal('blog'),
    t.Literal('service'),
    t.Literal('case-study'),
  ])),
  limit: t.Optional(t.Number({ minimum: 1, maximum: 50 })),
  offset: t.Optional(t.Number({ minimum: 0 })),
})
```

---

## Error Handling

```typescript
// Custom error types
class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code: string = 'INTERNAL_ERROR'
  ) {
    super(message)
  }
}

class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400, 'VALIDATION_ERROR')
  }
}

class NotFoundError extends AppError {
  constructor(resource: string) {
    super(`${resource} not found`, 404, 'NOT_FOUND')
  }
}

class UnauthorizedError extends AppError {
  constructor() {
    super('Unauthorized', 401, 'UNAUTHORIZED')
  }
}

// Usage in routes
.post('/leads', async ({ body }) => {
  const existing = await checkExisting(body.email)
  if (existing) {
    throw new ValidationError('Email already registered')
  }
  // ...
})
```

---

## Testing

```typescript
// src/routes/leads.test.ts
import { describe, it, expect } from 'bun:test'
import { app } from '../index'

describe('Leads API', () => {
  it('should create a new lead', async () => {
    const response = await app.handle(
      new Request('http://localhost/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
        }),
      })
    )

    expect(response.status).toBe(200)
    const data = await response.json()
    expect(data.success).toBe(true)
  })

  it('should validate email format', async () => {
    const response = await app.handle(
      new Request('http://localhost/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: 'John',
          lastName: 'Doe',
          email: 'invalid-email',
        }),
      })
    )

    expect(response.status).toBe(400)
  })
})
```
