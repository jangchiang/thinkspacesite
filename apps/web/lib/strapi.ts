import { type Locale } from './i18n'

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337'
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN

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
  locale?: Locale
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

  // Add locale
  url.searchParams.set('locale', locale)

  // Add populate
  if (populate) {
    if (typeof populate === 'string') {
      url.searchParams.set('populate', populate)
    } else if (Array.isArray(populate)) {
      url.searchParams.set('populate', populate.join(','))
    } else {
      url.searchParams.set('populate', JSON.stringify(populate))
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
  })

  return response.data
}

export async function getService(slug: string, locale: Locale) {
  const response = await fetchStrapi<unknown[]>('/services', {
    locale,
    filters: { slug: { $eq: slug } },
    populate: 'deep',
    tags: ['services', `service-${slug}`],
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

export async function getCaseStudies(locale: Locale) {
  const response = await fetchStrapi<unknown[]>('/case-studies', {
    locale,
    populate: ['featuredImage', 'clientLogo', 'results', 'services'],
    sort: 'createdAt:desc',
    tags: ['case-studies'],
  })

  return response.data
}

export async function getCaseStudy(slug: string, locale: Locale) {
  const response = await fetchStrapi<unknown[]>('/case-studies', {
    locale,
    filters: { slug: { $eq: slug } },
    populate: 'deep',
    tags: ['case-studies', `case-study-${slug}`],
  })

  return response.data?.[0] ?? null
}

export { fetchStrapi }
