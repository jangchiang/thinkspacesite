import { type Locale } from '@/lib/i18n'
import type { Metadata } from 'next'
import { getBlogPosts, getPageHero } from '@/lib/strapi'
import { HeroSection } from '@/components/sections/hero-section'
import { buildHeroBackground } from '@/lib/hero-utils'
import { NewsGrid } from './news-grid'
import { CategoryFilter } from '@/components/ui/category-filter'
import { Pagination } from '@/components/ui/pagination'
import { Suspense } from 'react'

type Props = {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ category?: string; page?: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params as { locale: Locale }

  return {
    title: locale === 'th' ? 'ข่าวสาร' : 'News',
    description: locale === 'th'
      ? 'ข่าวสารและอัพเดทล่าสุดจาก Thinkspace Technology'
      : 'Latest news and updates from Thinkspace Technology',
  }
}

interface BlogPost {
  id: number
  documentId: string
  title: string
  slug: string
  excerpt: string | null
  content: string | null
  author: string | null
  category: string | null
  publishedAt: string
  featuredImage?: {
    url: string
    formats?: {
      medium?: { url: string }
      small?: { url: string }
    }
  }
}

const PAGE_SIZE = 6

export default async function NewsPage({ params, searchParams }: Props): Promise<React.JSX.Element> {
  const { locale } = await params as { locale: Locale }
  const { category, page } = await searchParams
  const currentPage = Number(page) || 1

  // Fetch hero and posts in parallel
  const [heroData, { posts: strapiPosts, pagination }] = await Promise.all([
    getPageHero('news', locale),
    getBlogPosts(locale, {
      page: currentPage,
      pageSize: PAGE_SIZE,
      category: category || undefined
    })
  ])

  const heroBackground = buildHeroBackground(heroData)

  // Get unique categories from all posts (fetch all for category list)
  const { posts: allPosts } = await getBlogPosts(locale, { pageSize: 100 })
  const categories = [...new Set((allPosts as BlogPost[])
    .map(p => p.category)
    .filter((c): c is string => Boolean(c))
  )].sort()

  // Map Strapi data to our format
  const posts = (strapiPosts as BlogPost[]).map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt || '',
    date: post.publishedAt,
    category: post.category || 'General',
    featuredImage: post.featuredImage?.formats?.medium?.url || post.featuredImage?.url || null,
  }))

  const totalPages = pagination?.pageCount || 1

  // Get PUBLIC Strapi URL for client components (images need to be accessible from browser)
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://cms.techthinkspace.com'

  return (
    <>
      {/* Hero Section */}
      <HeroSection background={heroBackground} minHeight="min-h-[40vh]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="eyebrow mb-4">{locale === 'th' ? 'ข่าวสาร' : 'Newsroom'}</p>
          <h1 className="display-heading text-4xl md:text-5xl lg:text-6xl mb-6">
            {heroData?.title || (locale === 'th' ? 'ข่าวสาร' : 'News')}
          </h1>
          <p className={`text-lg md:text-xl ${heroBackground ? 'opacity-80' : 'text-base-content/70'}`}>
            {heroData?.subtitle || (locale === 'th'
              ? 'ข่าวสารล่าสุด อัพเดท และข้อมูลเชิงลึกจากทีมของเรา'
              : 'Latest news, updates, and insights from our team')}
          </p>
        </div>
      </HeroSection>

      {/* News Grid */}
      <section className="section-padding">
        <div className="container-custom">
          {/* Category Filter */}
          {categories.length > 0 && (
            <Suspense fallback={<div className="h-10 mb-8" />}>
              <CategoryFilter
                categories={categories}
                locale={locale}
                basePath={`/${locale}/news`}
              />
            </Suspense>
          )}

          <NewsGrid posts={posts} locale={locale} strapiUrl={strapiUrl} />

          {/* Pagination */}
          <Suspense fallback={null}>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              basePath={`/${locale}/news`}
              locale={locale}
            />
          </Suspense>
        </div>
      </section>
    </>
  )
}
