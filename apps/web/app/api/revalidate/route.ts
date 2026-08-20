import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

// The secret is spelled REVALIDATE_SECRET in .env.example but REVALIDATION_SECRET in
// docker-compose/.env.production — accept either so the endpoint authenticates whichever
// name the environment happens to define. An unset secret means the endpoint is disabled
// (rather than open), so a missing env var can never make it publicly callable.
const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET || process.env.REVALIDATION_SECRET

export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-revalidate-secret')

  if (!REVALIDATE_SECRET) {
    console.error('Revalidation rejected: neither REVALIDATE_SECRET nor REVALIDATION_SECRET is set')
    return NextResponse.json(
      { success: false, message: 'Revalidation not configured' },
      { status: 503 }
    )
  }

  // Verify secret
  if (secret !== REVALIDATE_SECRET) {
    return NextResponse.json(
      { success: false, message: 'Invalid secret' },
      { status: 401 }
    )
  }

  try {
    const body = await request.json()

    // Strapi webhook payload. entry.* events carry { event, model, entry };
    // media.* events carry { event, media } and no model at all.
    const { event, model, entry } = body

    // Replacing a file in the Media Library (e.g. swapping a partner logo for a new
    // version) fires media.update, not entry.update — the entry is untouched, so there
    // is no model to map. Purge every tag that renders CMS media instead.
    if (typeof event === 'string' && event.startsWith('media.')) {
      const mediaTags = ['clients', 'partners', 'hero-cards', 'homepage', 'services', 'products', 'case-studies', 'blog-posts', 'pages', 'about-page', 'page-heroes', 'site-settings']
      for (const tag of mediaTags) {
        revalidateTag(tag, { expire: 0 })
      }
      console.log(`Revalidated media tags: ${mediaTags.join(', ')}`)
      return NextResponse.json({
        success: true,
        revalidated: mediaTags,
        timestamp: new Date().toISOString(),
      })
    }

    if (!model) {
      return NextResponse.json(
        { success: false, message: 'Missing model in payload' },
        { status: 400 }
      )
    }

    // Map Strapi model names to cache tags (keeps the cached fetches fresh the
    // moment content changes, instead of waiting for the revalidate window).
    const tagMap: Record<string, string[]> = {
      page: ['pages', entry?.slug ? `page-${entry.slug}` : ''],
      service: ['services', entry?.slug ? `service-${entry.slug}` : ''],
      'blog-post': ['blog-posts', entry?.slug ? `blog-${entry.slug}` : ''],
      'case-study': ['case-studies', entry?.slug ? `case-study-${entry.slug}` : ''],
      product: ['products', entry?.slug ? `product-${entry.slug}` : ''],
      client: ['clients'],
      partner: ['partners'],
      'hero-card': ['hero-cards'],
      stat: ['stats'],
      homepage: ['homepage'],
      'about-page': ['about-page'],
      'contact-info': ['contact-info'],
      'site-setting': ['site-settings'],
      'page-hero': ['page-heroes'],
    }

    const tags = tagMap[model] || [model]

    // Revalidate each tag
    const revalidated: string[] = []
    for (const tag of tags) {
      if (tag) {
        // Next 16: revalidateTag now takes a cache profile; { expire: 0 } purges immediately
        revalidateTag(tag, { expire: 0 })
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
