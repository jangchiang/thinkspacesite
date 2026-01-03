import { Elysia, t } from 'elysia'
import { searchAll, searchIndex } from '@/services/search.service'
import { INDEXES } from '@/lib/meilisearch'
import { rateLimit } from '@/middleware/rateLimit'

export const searchRoutes = new Elysia({ prefix: '/search' })
  .use(rateLimit({ maxRequests: 60, windowMs: 60000 }))
  .get(
    '/',
    async ({ query }) => {
      try {
        const results = await searchAll(query.q, query.locale)

        return {
          success: true,
          data: results,
        }
      } catch (error) {
        console.error('Search error:', error)
        return {
          success: false,
          error: {
            code: 'SEARCH_ERROR',
            message: 'Search failed',
          },
        }
      }
    },
    {
      query: t.Object({
        q: t.String({ minLength: 1, maxLength: 200 }),
        locale: t.Optional(t.String()),
      }),
      detail: {
        tags: ['Search'],
        summary: 'Global search',
        description: 'Search across all content types',
      },
    }
  )
  .get(
    '/services',
    async ({ query }) => {
      try {
        const results = await searchIndex(INDEXES.SERVICES, {
          query: query.q,
          locale: query.locale,
          limit: query.limit,
          offset: query.offset,
          filters: query.category ? [`category = "${query.category}"`] : [],
        })

        return {
          success: true,
          data: results,
        }
      } catch (error) {
        console.error('Services search error:', error)
        return {
          success: false,
          error: {
            code: 'SEARCH_ERROR',
            message: 'Search failed',
          },
        }
      }
    },
    {
      query: t.Object({
        q: t.String({ minLength: 1, maxLength: 200 }),
        locale: t.Optional(t.String()),
        category: t.Optional(t.String()),
        limit: t.Optional(t.Number({ minimum: 1, maximum: 100, default: 20 })),
        offset: t.Optional(t.Number({ minimum: 0, default: 0 })),
      }),
      detail: {
        tags: ['Search'],
        summary: 'Search services',
        description: 'Search within services content',
      },
    }
  )
  .get(
    '/blog',
    async ({ query }) => {
      try {
        const filters: string[] = []
        if (query.category) filters.push(`category = "${query.category}"`)
        if (query.tag) filters.push(`tags IN ["${query.tag}"]`)

        const results = await searchIndex(INDEXES.BLOG_POSTS, {
          query: query.q,
          locale: query.locale,
          limit: query.limit,
          offset: query.offset,
          filters,
        })

        return {
          success: true,
          data: results,
        }
      } catch (error) {
        console.error('Blog search error:', error)
        return {
          success: false,
          error: {
            code: 'SEARCH_ERROR',
            message: 'Search failed',
          },
        }
      }
    },
    {
      query: t.Object({
        q: t.String({ minLength: 1, maxLength: 200 }),
        locale: t.Optional(t.String()),
        category: t.Optional(t.String()),
        tag: t.Optional(t.String()),
        limit: t.Optional(t.Number({ minimum: 1, maximum: 100, default: 20 })),
        offset: t.Optional(t.Number({ minimum: 0, default: 0 })),
      }),
      detail: {
        tags: ['Search'],
        summary: 'Search blog posts',
        description: 'Search within blog content',
      },
    }
  )
  .get(
    '/case-studies',
    async ({ query }) => {
      try {
        const filters: string[] = []
        if (query.industry) filters.push(`industry = "${query.industry}"`)

        const results = await searchIndex(INDEXES.CASE_STUDIES, {
          query: query.q,
          locale: query.locale,
          limit: query.limit,
          offset: query.offset,
          filters,
        })

        return {
          success: true,
          data: results,
        }
      } catch (error) {
        console.error('Case studies search error:', error)
        return {
          success: false,
          error: {
            code: 'SEARCH_ERROR',
            message: 'Search failed',
          },
        }
      }
    },
    {
      query: t.Object({
        q: t.String({ minLength: 1, maxLength: 200 }),
        locale: t.Optional(t.String()),
        industry: t.Optional(t.String()),
        limit: t.Optional(t.Number({ minimum: 1, maximum: 100, default: 20 })),
        offset: t.Optional(t.Number({ minimum: 0, default: 0 })),
      }),
      detail: {
        tags: ['Search'],
        summary: 'Search case studies',
        description: 'Search within case studies content',
      },
    }
  )
