import { MetadataRoute } from 'next'
import { getServices, getBlogPosts, getCaseStudies, getJobPositions } from '@/lib/strapi'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://techthinkspace.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const locales = ['en', 'th'] as const

  // Static pages
  const staticPages = [
    '',
    '/about',
    '/services',
    '/contact',
    '/news',
    '/works',
    '/careers',
    '/privacy',
    '/terms',
    '/cookies',
  ]

  const routes: MetadataRoute.Sitemap = []

  // Add static routes for each locale
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

  // Fetch dynamic content for sitemap
  try {
    // Fetch services, news, works, and jobs
    const [services, newsData, works, jobs] = await Promise.all([
      getServices('en').catch(() => []),
      getBlogPosts('en', { pageSize: 100 }).catch(() => ({ posts: [] })),
      getCaseStudies('en', 100).catch(() => []),
      getJobPositions('en').catch(() => []),
    ])

    // Add service pages
    const serviceList = services as Array<{ slug?: string }>
    serviceList.forEach((service) => {
      if (service.slug) {
        locales.forEach((locale) => {
          routes.push({
            url: `${siteUrl}/${locale}/services/${service.slug}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
            alternates: {
              languages: {
                en: `${siteUrl}/en/services/${service.slug}`,
                th: `${siteUrl}/th/services/${service.slug}`,
              },
            },
          })
        })
      }
    })

    // Add news/blog pages
    const postList = newsData.posts as Array<{ slug?: string; publishedAt?: string }>
    postList.forEach((post) => {
      if (post.slug) {
        locales.forEach((locale) => {
          routes.push({
            url: `${siteUrl}/${locale}/news/${post.slug}`,
            lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
            alternates: {
              languages: {
                en: `${siteUrl}/en/news/${post.slug}`,
                th: `${siteUrl}/th/news/${post.slug}`,
              },
            },
          })
        })
      }
    })

    // Add works/case study pages
    const workList = works as Array<{ slug?: string }>
    workList.forEach((work) => {
      if (work.slug) {
        locales.forEach((locale) => {
          routes.push({
            url: `${siteUrl}/${locale}/works/${work.slug}`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
            alternates: {
              languages: {
                en: `${siteUrl}/en/works/${work.slug}`,
                th: `${siteUrl}/th/works/${work.slug}`,
              },
            },
          })
        })
      }
    })

    // Add job pages
    const jobList = jobs as Array<{ slug?: string }>
    jobList.forEach((job) => {
      if (job.slug) {
        locales.forEach((locale) => {
          routes.push({
            url: `${siteUrl}/${locale}/careers/${job.slug}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.6,
            alternates: {
              languages: {
                en: `${siteUrl}/en/careers/${job.slug}`,
                th: `${siteUrl}/th/careers/${job.slug}`,
              },
            },
          })
        })
      }
    })
  } catch (error) {
    console.log('Error fetching dynamic content for sitemap:', error)
  }

  return routes
}
