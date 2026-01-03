import { Elysia } from 'elysia'
import { redis } from '@/lib/redis'

interface RateLimitConfig {
  windowMs: number
  maxRequests: number
  keyPrefix?: string
}

const defaultConfig: RateLimitConfig = {
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 100,
  keyPrefix: 'ratelimit',
}

export const rateLimit = (config: Partial<RateLimitConfig> = {}) => {
  const { windowMs, maxRequests, keyPrefix } = { ...defaultConfig, ...config }
  const windowSec = Math.ceil(windowMs / 1000)

  return new Elysia({ name: 'rate-limit' })
    .derive(async ({ request, set }) => {
      const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
        || request.headers.get('x-real-ip')
        || 'unknown'

      const key = `${keyPrefix}:${ip}`

      try {
        const current = await redis.incr(key)

        if (current === 1) {
          await redis.expire(key, windowSec)
        }

        const remaining = Math.max(0, maxRequests - current)
        const ttl = await redis.ttl(key)

        set.headers['X-RateLimit-Limit'] = String(maxRequests)
        set.headers['X-RateLimit-Remaining'] = String(remaining)
        set.headers['X-RateLimit-Reset'] = String(Date.now() + ttl * 1000)

        if (current > maxRequests) {
          set.status = 429
          return {
            rateLimited: true,
            error: {
              code: 'RATE_LIMITED',
              message: 'Too many requests. Please try again later.',
              retryAfter: ttl,
            },
          }
        }

        return { rateLimited: false }
      } catch (error) {
        // If Redis fails, allow request but log error
        console.error('Rate limit check failed:', error)
        return { rateLimited: false }
      }
    })
    .onBeforeHandle(({ rateLimited, error }) => {
      if (rateLimited) {
        return error
      }
    })
}

// Stricter limit for form submissions
export const formRateLimit = rateLimit({
  windowMs: 60 * 1000,
  maxRequests: 10,
  keyPrefix: 'ratelimit:form',
})

// Stricter limit for authentication attempts
export const authRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 5,
  keyPrefix: 'ratelimit:auth',
})
