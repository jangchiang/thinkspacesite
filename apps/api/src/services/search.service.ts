import { getIndex, INDEXES, type IndexName } from '@/lib/meilisearch'
import { cacheGet, cacheSet } from '@/lib/redis'

interface SearchOptions {
  query: string
  locale?: string
  limit?: number
  offset?: number
  filters?: string[]
}

interface SearchResult<T> {
  hits: T[]
  totalHits: number
  processingTimeMs: number
  query: string
}

export const searchIndex = async <T>(
  indexName: IndexName,
  options: SearchOptions
): Promise<SearchResult<T>> => {
  const { query, locale, limit = 20, offset = 0, filters = [] } = options

  // Build filter string
  const filterArray = [...filters]
  if (locale) {
    filterArray.push(`locale = "${locale}"`)
  }
  const filterString = filterArray.length > 0 ? filterArray.join(' AND ') : undefined

  // Create cache key
  const cacheKey = `search:${indexName}:${JSON.stringify({ query, filterString, limit, offset })}`

  // Check cache
  const cached = await cacheGet<SearchResult<T>>(cacheKey)
  if (cached) {
    return cached
  }

  // Execute search
  const index = getIndex(indexName)
  const results = await index.search<T>(query, {
    limit,
    offset,
    filter: filterString,
  })

  const searchResult: SearchResult<T> = {
    hits: results.hits,
    totalHits: results.estimatedTotalHits || results.hits.length,
    processingTimeMs: results.processingTimeMs,
    query,
  }

  // Cache for 5 minutes
  await cacheSet(cacheKey, searchResult, 300)

  return searchResult
}

export const searchAll = async (
  query: string,
  locale?: string
): Promise<{
  services: SearchResult<unknown>
  blogPosts: SearchResult<unknown>
  caseStudies: SearchResult<unknown>
  pages: SearchResult<unknown>
}> => {
  const options = { query, locale, limit: 5 }

  const [services, blogPosts, caseStudies, pages] = await Promise.all([
    searchIndex(INDEXES.SERVICES, options),
    searchIndex(INDEXES.BLOG_POSTS, options),
    searchIndex(INDEXES.CASE_STUDIES, options),
    searchIndex(INDEXES.PAGES, options),
  ])

  return { services, blogPosts, caseStudies, pages }
}

// Index management
export const indexDocument = async <T extends { id: string }>(
  indexName: IndexName,
  document: T
): Promise<void> => {
  const index = getIndex(indexName)
  await index.addDocuments([document])
}

export const indexDocuments = async <T extends { id: string }>(
  indexName: IndexName,
  documents: T[]
): Promise<void> => {
  const index = getIndex(indexName)
  await index.addDocuments(documents)
}

export const updateDocument = async <T extends { id: string }>(
  indexName: IndexName,
  document: T
): Promise<void> => {
  const index = getIndex(indexName)
  await index.updateDocuments([document])
}

export const deleteDocument = async (
  indexName: IndexName,
  documentId: string
): Promise<void> => {
  const index = getIndex(indexName)
  await index.deleteDocument(documentId)
}

export const clearIndex = async (indexName: IndexName): Promise<void> => {
  const index = getIndex(indexName)
  await index.deleteAllDocuments()
}
