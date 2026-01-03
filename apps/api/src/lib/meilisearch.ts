import { MeiliSearch, type Index } from 'meilisearch'

const meiliHost = process.env.MEILISEARCH_HOST || 'http://localhost:7700'
const meiliKey = process.env.MEILISEARCH_API_KEY || ''

export const meili = new MeiliSearch({
  host: meiliHost,
  apiKey: meiliKey,
})

export const INDEXES = {
  SERVICES: 'services',
  BLOG_POSTS: 'blog_posts',
  CASE_STUDIES: 'case_studies',
  PAGES: 'pages',
} as const

export type IndexName = (typeof INDEXES)[keyof typeof INDEXES]

export const getIndex = (name: IndexName): Index => {
  return meili.index(name)
}

export const initializeIndexes = async (): Promise<void> => {
  const indexConfigs = [
    {
      name: INDEXES.SERVICES,
      searchableAttributes: ['title', 'description', 'content'],
      filterableAttributes: ['category', 'locale'],
      sortableAttributes: ['createdAt', 'title'],
    },
    {
      name: INDEXES.BLOG_POSTS,
      searchableAttributes: ['title', 'excerpt', 'content', 'author'],
      filterableAttributes: ['category', 'tags', 'locale', 'publishedAt'],
      sortableAttributes: ['publishedAt', 'title'],
    },
    {
      name: INDEXES.CASE_STUDIES,
      searchableAttributes: ['title', 'client', 'industry', 'challenge', 'solution'],
      filterableAttributes: ['industry', 'services', 'locale'],
      sortableAttributes: ['createdAt', 'title'],
    },
    {
      name: INDEXES.PAGES,
      searchableAttributes: ['title', 'content', 'metaDescription'],
      filterableAttributes: ['locale', 'slug'],
      sortableAttributes: ['title'],
    },
  ]

  for (const config of indexConfigs) {
    try {
      await meili.createIndex(config.name, { primaryKey: 'id' })
    } catch {
      // Index may already exist
    }

    const index = meili.index(config.name)
    await index.updateSearchableAttributes(config.searchableAttributes)
    await index.updateFilterableAttributes(config.filterableAttributes)
    await index.updateSortableAttributes(config.sortableAttributes)
  }

  console.log('Meilisearch indexes initialized')
}
