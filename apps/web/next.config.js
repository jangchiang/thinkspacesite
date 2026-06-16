/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'standalone', // Disabled for simpler Docker deployment
  transpilePackages: ['@thinkspace/ui', '@thinkspace/types'],
  images: {
    // The Next.js image optimizer was rejecting every CMS image with
    // "url parameter is not allowed" (400), breaking PNG/JPG on /works, /news,
    // product pages, etc. Strapi already generates sized variants
    // (thumbnail/small/medium/large) and Cloudflare serves them compressed and
    // cached, so we skip the optimizer entirely and serve images as-is. This
    // also covers SVGs uniformly (no dangerouslyAllowSVG dance needed).
    unoptimized: true,
    remotePatterns: [
      // Development
      { protocol: 'http', hostname: 'localhost', port: '1337' },
      { protocol: 'http', hostname: 'localhost', port: '3000' },
      { protocol: 'http', hostname: 'localhost' },
      { protocol: 'http', hostname: 'cms', port: '1337' },
      { protocol: 'http', hostname: 'cms' },
      // Production - Strapi CMS
      { protocol: 'https', hostname: 'cms.techthinkspace.com' },
      { protocol: 'http', hostname: 'cms.techthinkspace.com' },
      // Supabase
      { protocol: 'https', hostname: '*.supabase.co' },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  async rewrites() {
    return [
      {
        source: '/cms-uploads/:path*',
        destination: `${process.env.STRAPI_URL || 'http://cms:1337'}/uploads/:path*`,
      },
    ]
  },
  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: '/:path*',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          // CSP temporarily disabled for debugging - uncomment after fixing
          // {
          //   key: 'Content-Security-Policy',
          //   value: [
          //     "default-src 'self'",
          //     "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
          //     "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
          //     "img-src 'self' data: blob: https: http:",
          //     "font-src 'self' https://fonts.gstatic.com",
          //     "connect-src 'self' https://cms.techthinkspace.com https://www.google-analytics.com https://vitals.vercel-insights.com",
          //     "frame-src 'self' https://www.youtube.com https://www.google.com",
          //     "frame-ancestors 'self'",
          //     "base-uri 'self'",
          //     "form-action 'self'",
          //   ].join('; '),
          // },
        ],
      },
    ]
  },
}

module.exports = nextConfig
