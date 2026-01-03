const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: {
    code: string
    message: string
    details?: string
  }
}

async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_URL}${endpoint}`

  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })

  const data = await response.json()

  if (!response.ok) {
    return {
      success: false,
      error: data.error || {
        code: 'UNKNOWN_ERROR',
        message: 'An unexpected error occurred',
      },
    }
  }

  return data
}

// Lead submission
export interface LeadFormData {
  name: string
  email: string
  company: string
  phone?: string
  service: string
  message?: string
  source?: string
  locale?: string
}

export async function submitLead(data: LeadFormData) {
  return fetchApi<{ id: string }>('/leads', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

// Contact form
export interface ContactFormData {
  name: string
  email: string
  company?: string
  phone?: string
  subject?: string
  message: string
  locale?: string
}

export async function submitContact(data: ContactFormData) {
  return fetchApi<{ id: string }>('/contact', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

// Newsletter
export interface NewsletterFormData {
  email: string
  name?: string
  locale?: string
  source?: string
}

export async function subscribeNewsletter(data: NewsletterFormData) {
  return fetchApi<void>('/newsletter/subscribe', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export async function unsubscribeNewsletter(email: string, locale?: string) {
  return fetchApi<void>('/newsletter/unsubscribe', {
    method: 'POST',
    body: JSON.stringify({ email, locale }),
  })
}

// Search
export interface SearchResult {
  services: { hits: unknown[]; totalHits: number }
  blogPosts: { hits: unknown[]; totalHits: number }
  caseStudies: { hits: unknown[]; totalHits: number }
  pages: { hits: unknown[]; totalHits: number }
}

export async function search(query: string, locale?: string) {
  const params = new URLSearchParams({ q: query })
  if (locale) params.set('locale', locale)

  return fetchApi<SearchResult>(`/search?${params.toString()}`)
}

export { fetchApi }
