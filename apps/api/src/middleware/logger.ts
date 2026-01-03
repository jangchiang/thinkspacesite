import { Elysia } from 'elysia'

export const logger = new Elysia({ name: 'logger' })
  .onRequest(({ request }) => {
    const start = Date.now()
    const method = request.method
    const url = new URL(request.url)

    console.log(`→ ${method} ${url.pathname}`)

    return { startTime: start }
  })
  .onAfterResponse(({ request, set }) => {
    const end = Date.now()
    const method = request.method
    const url = new URL(request.url)
    const status = set.status || 200

    // Calculate duration if available
    console.log(`← ${method} ${url.pathname} ${status}`)
  })
  .onError(({ error, request }) => {
    const method = request.method
    const url = new URL(request.url)

    console.error(`✗ ${method} ${url.pathname}`, error)
  })
