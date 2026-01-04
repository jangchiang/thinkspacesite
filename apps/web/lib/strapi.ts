import { type Locale } from './i18n'

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337'
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN

// Map frontend locale to Strapi locale
const LOCALE_MAP: Record<string, string> = {
  'en': 'en',
  'th': 'th-TH',
}

interface StrapiResponse<T> {
  data: T
  meta?: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

interface FetchOptions {
  locale?: Locale | null  // null = skip locale parameter (for non-i18n content types)
  populate?: string | string[] | Record<string, unknown>
  filters?: Record<string, unknown>
  sort?: string | string[]
  pagination?: {
    page?: number
    pageSize?: number
  }
  revalidate?: number | false
  tags?: string[]
}

async function fetchStrapi<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<StrapiResponse<T>> {
  const {
    locale = 'en',
    populate,
    filters,
    sort,
    pagination,
    revalidate = 60,
    tags,
  } = options

  const url = new URL(`/api${endpoint}`, STRAPI_URL)

  // Add locale (map to Strapi locale format) - skip if null for non-i18n content types
  if (locale !== null) {
    const strapiLocale = LOCALE_MAP[locale] || locale
    url.searchParams.set('locale', strapiLocale)
  }

  // Add populate (Strapi 5 format)
  if (populate) {
    if (typeof populate === 'string') {
      url.searchParams.set('populate', populate)
    } else if (Array.isArray(populate)) {
      // Strapi 5 requires array format: populate[0]=field1&populate[1]=field2
      populate.forEach((field, index) => {
        url.searchParams.set(`populate[${index}]`, field)
      })
    } else {
      // For nested populate, use bracket notation
      Object.entries(populate).forEach(([key, value]) => {
        if (value === true || value === '*') {
          url.searchParams.set(`populate[${key}]`, '*')
        } else {
          url.searchParams.set(`populate[${key}]`, JSON.stringify(value))
        }
      })
    }
  }

  // Add filters
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (typeof value === 'object') {
        Object.entries(value as Record<string, unknown>).forEach(([op, val]) => {
          url.searchParams.set(`filters[${key}][${op}]`, String(val))
        })
      } else {
        url.searchParams.set(`filters[${key}]`, String(value))
      }
    })
  }

  // Add sort
  if (sort) {
    const sortValue = Array.isArray(sort) ? sort.join(',') : sort
    url.searchParams.set('sort', sortValue)
  }

  // Add pagination
  if (pagination) {
    if (pagination.page) url.searchParams.set('pagination[page]', String(pagination.page))
    if (pagination.pageSize) url.searchParams.set('pagination[pageSize]', String(pagination.pageSize))
  }

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  }

  if (STRAPI_API_TOKEN) {
    headers['Authorization'] = `Bearer ${STRAPI_API_TOKEN}`
  }

  const response = await fetch(url.toString(), {
    headers,
    next: {
      revalidate: revalidate === false ? undefined : revalidate,
      tags,
    },
  })

  if (!response.ok) {
    throw new Error(`Strapi fetch error: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

// Content fetching functions
export async function getPage(slug: string, locale: Locale) {
  const response = await fetchStrapi<unknown[]>('/pages', {
    locale,
    filters: { slug: { $eq: slug } },
    populate: 'deep',
    tags: ['pages', `page-${slug}`],
  })

  return response.data?.[0] ?? null
}

export async function getServices(locale: Locale) {
  const response = await fetchStrapi<unknown[]>('/services', {
    locale,
    populate: ['featuredImage', 'features'],
    sort: 'order:asc',
    tags: ['services'],
    revalidate: 0,
  })

  return response.data
}

export async function getStats(locale: Locale) {
  const response = await fetchStrapi<unknown[]>('/stats', {
    locale,
    sort: 'order:asc',
    tags: ['stats'],
    revalidate: 0,
  })

  return response.data
}

export async function getCaseStudies(locale: Locale, limit?: number) {
  const response = await fetchStrapi<unknown[]>('/case-studies', {
    locale,
    populate: ['featuredImage', 'clientLogo'],
    sort: 'createdAt:desc',
    pagination: limit ? { pageSize: limit } : undefined,
    tags: ['case-studies'],
    revalidate: 0,
  })

  return response.data
}

export async function getService(slug: string, locale: Locale) {
  const response = await fetchStrapi<unknown[]>('/services', {
    locale,
    filters: { slug: { $eq: slug } },
    populate: ['featuredImage', 'features', 'useCases', 'technologies', 'processSteps'],
    tags: ['services', `service-${slug}`],
    revalidate: 0,
  })

  return response.data?.[0] ?? null
}

export async function getBlogPosts(
  locale: Locale,
  options?: { page?: number; pageSize?: number; category?: string }
) {
  const filters: Record<string, unknown> = {}
  if (options?.category) {
    filters.category = { $eq: options.category }
  }

  const response = await fetchStrapi<unknown[]>('/blog-posts', {
    locale,
    filters,
    populate: ['featuredImage', 'authorImage'],
    sort: 'publishedAt:desc',
    pagination: {
      page: options?.page || 1,
      pageSize: options?.pageSize || 10,
    },
    tags: ['blog-posts'],
  })

  return {
    posts: response.data,
    pagination: response.meta?.pagination,
  }
}

export async function getBlogPost(slug: string, locale: Locale) {
  const response = await fetchStrapi<unknown[]>('/blog-posts', {
    locale,
    filters: { slug: { $eq: slug } },
    populate: ['featuredImage', 'authorImage'],
    tags: ['blog-posts', `blog-${slug}`],
  })

  return response.data?.[0] ?? null
}

export async function getCaseStudy(slug: string, locale: Locale) {
  const response = await fetchStrapi<unknown[]>('/case-studies', {
    locale,
    filters: { slug: { $eq: slug } },
    populate: ['featuredImage', 'clientLogo', 'services', 'additionalResults'],
    tags: ['case-studies', `case-study-${slug}`],
    revalidate: 0,
  })

  return response.data?.[0] ?? null
}

export async function getPartners() {
  const response = await fetchStrapi<unknown[]>('/partners', {
    locale: null,  // Partner is not an i18n content type
    populate: ['logo'],
    sort: 'order:asc',
    tags: ['partners'],
    revalidate: 0,  // Don't cache partners for now
  })

  return response.data
}

export interface PageHero {
  id: number
  documentId: string
  pageIdentifier: string
  title?: string
  subtitle?: string
  backgroundType: 'none' | 'image' | 'video'
  backgroundImage?: {
    url: string
    formats?: {
      large?: { url: string }
      medium?: { url: string }
      small?: { url: string }
    }
  }
  backgroundVideo?: {
    url: string
  }
  videoUrl?: string
  overlayOpacity: number
  overlayColor: string
  textColor: 'light' | 'dark'
}

export async function getPageHero(pageIdentifier: string, locale: Locale): Promise<PageHero | null> {
  try {
    const response = await fetchStrapi<PageHero[]>('/page-heroes', {
      locale,
      filters: { pageIdentifier: { $eq: pageIdentifier } },
      populate: '*',
      tags: ['page-heroes', `hero-${pageIdentifier}`],
      revalidate: 0,
    })

    return response.data?.[0] ?? null
  } catch (error) {
    console.log(`Failed to fetch page hero for ${pageIdentifier}`)
    return null
  }
}

export interface AboutPageValue {
  id: number
  iconName: string
  title: string
  description: string
}

export interface AboutPageMilestone {
  id: number
  year: string
  event: string
  detail: string
}

export interface AboutPageTeamMember {
  id: number
  name: string
  role: string
  photo?: {
    url: string
    formats?: {
      thumbnail?: { url: string }
      small?: { url: string }
    }
  }
  bio?: string
}

export interface AboutPage {
  id: number
  documentId: string
  storyTitle: string
  storyParagraph1: string
  storyParagraph2: string
  milestonesTitle: string
  teamSectionTitle: string
  teamSectionDescription: string
  values: AboutPageValue[]
  milestones: AboutPageMilestone[]
  teamMembers: AboutPageTeamMember[]
}

export async function getAboutPage(locale: Locale): Promise<AboutPage | null> {
  try {
    const response = await fetchStrapi<AboutPage>('/about-page', {
      locale,
      populate: ['values', 'milestones', 'teamMembers', 'teamMembers.photo'],
      tags: ['about-page'],
      revalidate: 0,
    })

    return response.data ?? null
  } catch (error) {
    console.log('Failed to fetch about page:', error)
    return null
  }
}

export { fetchStrapi }
