import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-revalidate-secret')

  // Verify secret
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json(
      { success: false, message: 'Invalid secret' },
      { status: 401 }
    )
  }

  try {
    const body = await request.json()

    // Strapi webhook payload
    const { model, entry } = body

    if (!model) {
      return NextResponse.json(
        { success: false, message: 'Missing model in payload' },
        { status: 400 }
      )
    }

    // Map Strapi model names to cache tags
    const tagMap: Record<string, string[]> = {
      page: ['pages', entry?.slug ? `page-${entry.slug}` : ''],
      service: ['services', entry?.slug ? `service-${entry.slug}` : ''],
      'blog-post': ['blog-posts', entry?.slug ? `blog-${entry.slug}` : ''],
      'case-study': ['case-studies', entry?.slug ? `case-study-${entry.slug}` : ''],
    }

    const tags = tagMap[model] || [model]

    // Revalidate each tag
    const revalidated: string[] = []
    for (const tag of tags) {
      if (tag) {
        revalidateTag(tag)
        revalidated.push(tag)
      }
    }

    console.log(`Revalidated tags: ${revalidated.join(', ')}`)

    return NextResponse.json({
      success: true,
      revalidated,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json(
      { success: false, message: 'Revalidation failed' },
      { status: 500 }
    )
  }
}

// Health check
export async function GET() {
  return NextResponse.json({ status: 'ok' })
}
