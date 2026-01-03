import { Elysia } from 'elysia'
import { jwt } from '@elysiajs/jwt'
import { supabase } from '@/lib/supabase'

const jwtSecret = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

export const authPlugin = new Elysia({ name: 'auth' })
  .use(
    jwt({
      name: 'jwt',
      secret: jwtSecret,
      exp: '7d',
    })
  )
  .derive(async ({ headers, jwt }) => {
    const authHeader = headers.authorization

    if (!authHeader?.startsWith('Bearer ')) {
      return { user: null, isAuthenticated: false }
    }

    const token = authHeader.slice(7)

    try {
      // Verify JWT token
      const payload = await jwt.verify(token)

      if (!payload) {
        return { user: null, isAuthenticated: false }
      }

      return {
        user: payload as { id: string; email: string; role: string },
        isAuthenticated: true,
      }
    } catch {
      return { user: null, isAuthenticated: false }
    }
  })

// Guard for protected routes
export const requireAuth = new Elysia({ name: 'require-auth' })
  .use(authPlugin)
  .onBeforeHandle(({ user, isAuthenticated, set }) => {
    if (!isAuthenticated || !user) {
      set.status = 401
      return {
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Authentication required',
        },
      }
    }
  })

// Guard for admin routes
export const requireAdmin = new Elysia({ name: 'require-admin' })
  .use(authPlugin)
  .onBeforeHandle(({ user, isAuthenticated, set }) => {
    if (!isAuthenticated || !user) {
      set.status = 401
      return {
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Authentication required',
        },
      }
    }

    if (user.role !== 'admin') {
      set.status = 403
      return {
        success: false,
        error: {
          code: 'FORBIDDEN',
          message: 'Admin access required',
        },
      }
    }
  })

// Webhook authentication (for Strapi webhooks)
export const webhookAuth = new Elysia({ name: 'webhook-auth' })
  .derive(({ headers, set }) => {
    const webhookSecret = process.env.WEBHOOK_SECRET
    const providedSecret = headers['x-webhook-secret']

    if (!webhookSecret || providedSecret !== webhookSecret) {
      return { webhookValid: false }
    }

    return { webhookValid: true }
  })
  .onBeforeHandle(({ webhookValid, set }) => {
    if (!webhookValid) {
      set.status = 401
      return {
        success: false,
        error: {
          code: 'INVALID_WEBHOOK',
          message: 'Invalid webhook secret',
        },
      }
    }
  })
