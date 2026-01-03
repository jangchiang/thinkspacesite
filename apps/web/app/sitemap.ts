import { MetadataRoute } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thinkspace.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ['en', 'th']

  const staticPages = [
    '',
    '/about',
    '/services',
    '/services/cloud',
    '/services/cybersecurity',
    '/services/data-ai',
    '/services/development',
    '/services/consulting',
    '/services/managed',
    '/contact',
    '/blog',
    '/case-studies',
    '/careers',
  ]

  const routes: MetadataRoute.Sitemap = []

  // Add routes for each locale
  locales.forEach((locale) => {
    staticPages.forEach((page) => {
      routes.push({
        url: `${siteUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'daily' : 'weekly',
        priority: page === '' ? 1 : page.includes('/services') ? 0.9 : 0.8,
        alternates: {
          languages: {
            en: `${siteUrl}/en${page}`,
            th: `${siteUrl}/th${page}`,
          },
        },
      })
    })
  })

  return routes
}
