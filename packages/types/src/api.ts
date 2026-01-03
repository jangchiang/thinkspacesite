// API request/response types

// Common response types
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta: {
    page: number
    pageSize: number
    pageCount: number
    total: number
  }
}

// Lead API
export interface CreateLeadRequest {
  firstName: string
  lastName: string
  email: string
  phone?: string
  company?: string
  jobTitle?: string
  message?: string
  service?: string
  source?: string
}

export interface UpdateLeadRequest {
  status?: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost'
  assignedTo?: string
  notes?: string
}

// Contact API
export interface ContactFormRequest {
  formType: 'general' | 'sales' | 'support' | 'partner'
  firstName: string
  lastName: string
  email: string
  phone?: string
  company?: string
  subject?: string
  message: string
}

// Newsletter API
export interface NewsletterSubscribeRequest {
  email: string
  preferences?: {
    updates?: boolean
    blog?: boolean
    events?: boolean
  }
}

export interface NewsletterUnsubscribeRequest {
  email: string
  token?: string
}

// Event Registration API
export interface EventRegistrationRequest {
  eventId: string
  firstName: string
  lastName: string
  email: string
  company?: string
  jobTitle?: string
  dietaryRequirements?: string
}

// Resource Download API
export interface ResourceDownloadRequest {
  resourceId: string
  resourceType: string
  firstName?: string
  lastName?: string
  email: string
  company?: string
}

// Search API
export interface SearchRequest {
  query: string
  type?: 'page' | 'blog' | 'service' | 'case-study'
  limit?: number
  offset?: number
}

export interface SearchResult {
  id: string
  type: 'page' | 'blog' | 'service' | 'case-study'
  title: string
  description: string | null
  slug: string
  url: string
  _formatted?: {
    title?: string
    description?: string
  }
}

export interface SearchResponse extends ApiResponse<SearchResult[]> {
  meta: {
    query: string
    processingTimeMs: number
    totalHits: number
  }
}

// Analytics API
export interface AnalyticsEventRequest {
  eventType: string
  pagePath?: string
  referrer?: string
  metadata?: Record<string, unknown>
}

// Health Check
export interface HealthCheckResponse {
  status: 'ok' | 'degraded' | 'down'
  timestamp: string
  services?: {
    database: 'ok' | 'down'
    redis: 'ok' | 'down'
    meilisearch: 'ok' | 'down'
  }
}
