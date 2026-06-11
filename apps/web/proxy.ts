import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['en', 'th']
const defaultLocale = 'en'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the path already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  // Skip for paths with locale, internal paths, or files
  if (
    pathnameHasLocale ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // For root path or paths without locale, redirect to default locale
  // Users can switch language via the language switcher
  const url = request.nextUrl.clone()
  url.pathname = `/${defaultLocale}${pathname}`

  return NextResponse.redirect(url)
}

export const config = {
  matcher: [
    // Match all paths except internal ones + Next metadata routes (opengraph/twitter/sitemap/robots)
    '/((?!_next|api|static|opengraph-image|twitter-image|sitemap|robots|.*\\..*).*)',
  ],
}
