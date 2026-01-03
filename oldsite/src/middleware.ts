// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyAuth } from '@/lib/auth';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Define constants for locales and paths to skip
  const supportedLocales = ['en', 'th'];
  const defaultLocale = 'en';
  const skipPaths = ['/api', '/_next', '/login', '/favicon.ico'];
  const isStaticFile = /\.(.*)$/.test(pathname); // Match files with extensions

  // Admin route protection
  if (pathname.startsWith('/admin')) {
    const token = req.cookies.get('auth-token');
    if (!token) return NextResponse.redirect(new URL('/login', req.url));

    try {
      await verifyAuth(token.value);
      return NextResponse.next();
    } catch {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  // Skip middleware for static files, API, or login paths
  if (skipPaths.some((path) => pathname.startsWith(path)) || isStaticFile) {
    return NextResponse.next();
  }

  // Locale handling
  const pathnameHasLocale = supportedLocales.some((locale) =>
    pathname.startsWith(`/${locale}`)
  );

  if (!pathnameHasLocale) {
    // Redirect to default locale if none is present
    return NextResponse.redirect(
      new URL(`/${defaultLocale}${pathname}`, req.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all paths except static files, API routes, and favicon
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
    '/:path*',
  ],
};
