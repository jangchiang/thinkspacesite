import { Elysia } from 'elysia'
import { cors } from '@elysiajs/cors'
import { swagger } from '@elysiajs/swagger'
import { routes } from './routes'
import { logger } from './middleware/logger'
import { initializeIndexes } from './lib/meilisearch'

const port = process.env.PORT || 3001
const isDev = process.env.NODE_ENV !== 'production'

// Initialize Meilisearch indexes on startup
initializeIndexes().catch((err) => {
  console.warn('Failed to initialize Meilisearch indexes:', err.message)
})

const app = new Elysia()
  .use(
    cors({
      origin: isDev
        ? ['http://localhost:3000', 'http://127.0.0.1:3000']
        : (process.env.ALLOWED_ORIGINS?.split(',') || []),
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Webhook-Secret'],
      credentials: true,
    })
  )
  .use(
    swagger({
      documentation: {
        info: {
          title: 'Think Space API',
          version: '1.0.0',
          description: 'API for Think Space website',
        },
        tags: [
          { name: 'Leads', description: 'Lead management endpoints' },
          { name: 'Contact', description: 'Contact form endpoints' },
          { name: 'Newsletter', description: 'Newsletter subscription endpoints' },
          { name: 'Search', description: 'Content search endpoints' },
        ],
      },
      path: '/swagger',
    })
  )
  .use(logger)
  .get('/health', () => ({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  }))
  .get('/', () => ({
    name: 'Think Space API',
    version: '1.0.0',
    docs: '/swagger',
  }))
  .use(routes)
  .onError(({ code, error, set }) => {
    console.error('Global error:', code, error)

    if (code === 'VALIDATION') {
      set.status = 400
      return {
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid request data',
          details: error.message,
        },
      }
    }

    if (code === 'NOT_FOUND') {
      set.status = 404
      return {
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Resource not found',
        },
      }
    }

    set.status = 500
    return {
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: isDev ? error.message : 'An unexpected error occurred',
      },
    }
  })
  .listen(port)

console.log(`🚀 Think Space API running at http://localhost:${port}`)
console.log(`📚 Swagger docs at http://localhost:${port}/swagger`)

export type App = typeof app
