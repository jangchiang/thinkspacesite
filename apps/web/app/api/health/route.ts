import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  const health = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
    version: process.env.npm_package_version || '1.0.0',
    checks: {
      strapi: 'unknown',
    },
  }

  // Check Strapi connection
  try {
    const strapiUrl = process.env.STRAPI_URL || 'http://localhost:1337'
    const response = await fetch(`${strapiUrl}/_health`, {
      method: 'GET',
      cache: 'no-store',
      signal: AbortSignal.timeout(5000),
    })
    health.checks.strapi = response.ok ? 'ok' : 'error'
  } catch {
    health.checks.strapi = 'error'
  }

  const allHealthy = Object.values(health.checks).every((v) => v === 'ok')

  return NextResponse.json(health, {
    status: allHealthy ? 200 : 503,
    headers: {
      'Cache-Control': 'no-store',
    },
  })
}
