# Search Instructions
## Meilisearch Implementation Guide

---

## Overview

- **Engine:** Meilisearch
- **Index:** `content` (unified index)
- **Types:** Pages, Blog Posts, Services, Case Studies

---

## Configuration

### Docker Service

```yaml
# docker-compose.yml
meilisearch:
  image: getmeili/meilisearch:v1.6
  container_name: thinkspace-search
  environment:
    - MEILI_MASTER_KEY=${MEILISEARCH_KEY}
    - MEILI_ENV=production
  volumes:
    - meilisearch-data:/meili_data
  ports:
    - "7700:7700"
```

### Client Setup

```typescript
// apps/api/src/lib/meilisearch.ts
import { MeiliSearch } from 'meilisearch'

export const meilisearch = new MeiliSearch({
  host: process.env.MEILISEARCH_HOST || 'http://meilisearch:7700',
  apiKey: process.env.MEILISEARCH_KEY,
})

export const SEARCH_INDEX = 'content'
```

---

## Index Configuration

```typescript
// apps/api/src/services/search.service.ts
import { meilisearch, SEARCH_INDEX } from '../lib/meilisearch'

export async function initializeSearchIndex() {
  const index = meilisearch.index(SEARCH_INDEX)

  await index.updateSettings({
    // Searchable fields (priority order)
    searchableAttributes: [
      'title',
      'description',
      'content',
      'tags',
    ],

    // Filterable for faceted search
    filterableAttributes: [
      'type',
      'category',
      'industry',
      'service',
      'locale',
    ],

    // Sortable fields
    sortableAttributes: [
      'publishedAt',
      'updatedAt',
      'title',
    ],

    // Ranking rules
    rankingRules: [
      'words',
      'typo',
      'proximity',
      'attribute',
      'sort',
      'exactness',
    ],

    // Typo tolerance
    typoTolerance: {
      enabled: true,
      minWordSizeForTypos: {
        oneTypo: 4,
        twoTypos: 8,
      },
    },

    // Pagination
    pagination: {
      maxTotalHits: 1000,
    },
  })

  console.log('Search index configured')
}
```

---

## Document Structure

```typescript
// types/search.ts
interface SearchDocument {
  // Required
  id: string              // Unique: `${type}_${originalId}`
  type: 'page' | 'blog' | 'service' | 'case-study' | 'resource'
  title: string
  slug: string
  
  // Content
  description?: string
  content?: string        // Plain text (stripped HTML)
  
  // Metadata
  category?: string
  industry?: string
  service?: string
  tags?: string[]
  locale: 'en' | 'th'
  
  // Media
  image?: string
  
  // Timestamps
  publishedAt?: number    // Unix timestamp for sorting
  updatedAt: number
}
```

---

## Indexing Operations

### Index Document

```typescript
export async function indexDocument(doc: SearchDocument) {
  const index = meilisearch.index(SEARCH_INDEX)
  await index.addDocuments([doc])
}

export async function indexDocuments(docs: SearchDocument[]) {
  const index = meilisearch.index(SEARCH_INDEX)
  await index.addDocuments(docs, { primaryKey: 'id' })
}
```

### Update Document

```typescript
export async function updateDocument(doc: Partial<SearchDocument> & { id: string }) {
  const index = meilisearch.index(SEARCH_INDEX)
  await index.updateDocuments([doc])
}
```

### Delete Document

```typescript
export async function deleteDocument(id: string) {
  const index = meilisearch.index(SEARCH_INDEX)
  await index.deleteDocument(id)
}

export async function deleteDocumentsByType(type: string) {
  const index = meilisearch.index(SEARCH_INDEX)
  await index.deleteDocuments({ filter: `type = "${type}"` })
}
```

---

## Search API

### Route

```typescript
// apps/api/src/routes/search.ts
import { Elysia, t } from 'elysia'
import { search, getSuggestions } from '../services/search.service'

export const searchRoutes = new Elysia({ prefix: '/search' })

  .get(
    '/',
    async ({ query }) => {
      const results = await search(query.q, {
        type: query.type,
        limit: query.limit || 10,
        offset: query.offset || 0,
      })
      return results
    },
    {
      query: t.Object({
        q: t.String({ minLength: 1 }),
        type: t.Optional(t.String()),
        limit: t.Optional(t.Number({ minimum: 1, maximum: 50 })),
        offset: t.Optional(t.Number({ minimum: 0 })),
      }),
    }
  )

  .get(
    '/suggestions',
    async ({ query }) => {
      return getSuggestions(query.q)
    },
    {
      query: t.Object({
        q: t.String({ minLength: 2 }),
      }),
    }
  )
```

### Search Service

```typescript
// apps/api/src/services/search.service.ts
import { meilisearch, SEARCH_INDEX } from '../lib/meilisearch'

interface SearchOptions {
  type?: string
  category?: string
  industry?: string
  limit?: number
  offset?: number
  sort?: string[]
}

export async function search(query: string, options: SearchOptions = {}) {
  const index = meilisearch.index(SEARCH_INDEX)

  // Build filter
  const filters: string[] = []
  if (options.type) filters.push(`type = "${options.type}"`)
  if (options.category) filters.push(`category = "${options.category}"`)
  if (options.industry) filters.push(`industry = "${options.industry}"`)

  const results = await index.search(query, {
    limit: options.limit || 10,
    offset: options.offset || 0,
    filter: filters.length > 0 ? filters.join(' AND ') : undefined,
    sort: options.sort,
    attributesToHighlight: ['title', 'description', 'content'],
    highlightPreTag: '<mark>',
    highlightPostTag: '</mark>',
    attributesToCrop: ['content'],
    cropLength: 200,
  })

  return {
    hits: results.hits,
    total: results.estimatedTotalHits,
    query: results.query,
    processingTimeMs: results.processingTimeMs,
  }
}

export async function getSuggestions(query: string) {
  const index = meilisearch.index(SEARCH_INDEX)

  const results = await index.search(query, {
    limit: 5,
    attributesToRetrieve: ['title', 'type', 'slug'],
  })

  return results.hits.map((hit) => ({
    title: hit.title,
    type: hit.type,
    slug: hit.slug,
  }))
}
```

---

## Frontend Search Component

```typescript
// apps/web/components/search/search-dialog.tsx
'use client'

import { useState, useEffect, useCallback } from 'react'
import { useDebounce } from '@/hooks/use-debounce'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

export function SearchDialog({ open, onOpenChange }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  
  const debouncedQuery = useDebounce(query, 300)

  const search = useCallback(async (q: string) => {
    if (q.length < 2) {
      setResults([])
      return
    }

    setIsLoading(true)
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`)
      const data = await res.json()
      setResults(data.hits)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    search(debouncedQuery)
  }, [debouncedQuery, search])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <Input
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />

        <div className="mt-4 max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="text-center py-8">Searching...</div>
          ) : results.length > 0 ? (
            <ul className="space-y-2">
              {results.map((result) => (
                <li key={result.id}>
                  <Link
                    href={getResultUrl(result)}
                    className="block p-3 rounded-lg hover:bg-neutral-100"
                    onClick={() => onOpenChange(false)}
                  >
                    <div className="text-sm text-primary-600 capitalize">
                      {result.type}
                    </div>
                    <div
                      className="font-medium"
                      dangerouslySetInnerHTML={{
                        __html: result._formatted?.title || result.title,
                      }}
                    />
                    {result._formatted?.description && (
                      <div
                        className="text-sm text-neutral-600 mt-1"
                        dangerouslySetInnerHTML={{
                          __html: result._formatted.description,
                        }}
                      />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          ) : query.length > 1 ? (
            <div className="text-center py-8 text-neutral-500">
              No results found
            </div>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  )
}

function getResultUrl(result: any) {
  switch (result.type) {
    case 'blog':
      return `/blog/${result.slug}`
    case 'service':
      return `/services/${result.slug}`
    case 'case-study':
      return `/case-studies/${result.slug}`
    default:
      return `/${result.slug}`
  }
}
```

---

## Webhook for Auto-Indexing

### Strapi Webhook Handler

```typescript
// apps/api/src/routes/webhooks.ts
import { Elysia, t } from 'elysia'
import { indexDocument, deleteDocument } from '../services/search.service'

export const webhookRoutes = new Elysia({ prefix: '/webhooks' })
  .post(
    '/strapi',
    async ({ body, headers }) => {
      // Verify webhook secret
      if (headers['x-webhook-secret'] !== process.env.WEBHOOK_SECRET) {
        throw new Error('Invalid secret')
      }

      const { event, model, entry } = body

      // Handle content changes
      if (['entry.create', 'entry.update', 'entry.publish'].includes(event)) {
        await indexDocument(transformToSearchDoc(model, entry))
      }

      if (['entry.delete', 'entry.unpublish'].includes(event)) {
        await deleteDocument(`${model}_${entry.id}`)
      }

      return { success: true }
    }
  )

function transformToSearchDoc(model: string, entry: any) {
  return {
    id: `${model}_${entry.id}`,
    type: model,
    title: entry.title || entry.name,
    slug: entry.slug,
    description: entry.description || entry.excerpt,
    content: stripHtml(entry.content),
    category: entry.category?.slug,
    industry: entry.industry?.slug,
    tags: entry.tags?.map((t: any) => t.name),
    locale: entry.locale || 'en',
    image: entry.featuredImage?.url,
    publishedAt: new Date(entry.publishedAt).getTime(),
    updatedAt: new Date(entry.updatedAt).getTime(),
  }
}
```

---

## Full Reindex Script

```typescript
// scripts/reindex-search.ts
import { meilisearch } from '../apps/api/src/lib/meilisearch'
import { fetchAllContent } from './fetch-content'

async function reindexAll() {
  console.log('Starting full reindex...')

  // Delete existing index
  try {
    await meilisearch.deleteIndex('content')
  } catch (e) {
    // Index may not exist
  }

  // Create new index
  await meilisearch.createIndex('content', { primaryKey: 'id' })

  // Fetch all content from Strapi
  const [pages, blogs, services, caseStudies] = await Promise.all([
    fetchAllContent('pages'),
    fetchAllContent('blog-posts'),
    fetchAllContent('services'),
    fetchAllContent('case-studies'),
  ])

  // Transform and index
  const documents = [
    ...pages.map((p) => transformToSearchDoc('page', p)),
    ...blogs.map((b) => transformToSearchDoc('blog', b)),
    ...services.map((s) => transformToSearchDoc('service', s)),
    ...caseStudies.map((c) => transformToSearchDoc('case-study', c)),
  ]

  const index = meilisearch.index('content')
  await index.addDocuments(documents)

  // Configure settings
  await initializeSearchIndex()

  console.log(`Indexed ${documents.length} documents`)
}

reindexAll()
```

---

## Commands

```bash
# Check index status
curl http://localhost:7700/indexes/content/stats \
  -H "Authorization: Bearer ${MEILISEARCH_KEY}"

# Manual reindex
docker compose exec api bun run scripts/reindex-search.ts

# Clear index
curl -X DELETE http://localhost:7700/indexes/content \
  -H "Authorization: Bearer ${MEILISEARCH_KEY}"
```
