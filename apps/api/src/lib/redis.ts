import Redis from 'ioredis'

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379'

export const redis = new Redis(redisUrl, {
  maxRetriesPerRequest: 3,
  retryStrategy(times) {
    if (times > 3) return null
    return Math.min(times * 100, 3000)
  },
})

redis.on('error', (err) => {
  console.error('Redis connection error:', err)
})

redis.on('connect', () => {
  console.log('Redis connected')
})

export const cacheGet = async <T>(key: string): Promise<T | null> => {
  const data = await redis.get(key)
  if (!data) return null
  return JSON.parse(data) as T
}

export const cacheSet = async (
  key: string,
  value: unknown,
  ttlSeconds = 3600
): Promise<void> => {
  await redis.setex(key, ttlSeconds, JSON.stringify(value))
}

export const cacheDelete = async (key: string): Promise<void> => {
  await redis.del(key)
}

export const cacheClear = async (pattern: string): Promise<void> => {
  const keys = await redis.keys(pattern)
  if (keys.length > 0) {
    await redis.del(...keys)
  }
}
