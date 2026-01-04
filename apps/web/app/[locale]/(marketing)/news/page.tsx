import { type Locale } from '@/lib/i18n'
import type { Metadata } from 'next'
import { getBlogPosts, getPageHero } from '@/lib/strapi'
import { HeroSection } from '@/components/sections/hero-section'
import { buildHeroBackground } from '@/lib/hero-utils'
import { NewsGrid } from './news-grid'

type Props = {
  params: Promise<{ locale: Locale }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params

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

export default async function NewsPage({ params }: Props) {
  const { locale } = await params

  // Fetch hero and posts in parallel
  const [heroData, { posts: strapiPosts }] = await Promise.all([
    getPageHero('news', locale),
    getBlogPosts(locale)
  ])

  const heroBackground = buildHeroBackground(heroData)

  // Map Strapi data to our format
  const posts = (strapiPosts as BlogPost[]).map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt || '',
    date: post.publishedAt,
    category: post.category || 'General',
    featuredImage: post.featuredImage?.formats?.medium?.url || post.featuredImage?.url || null,
  }))

  return (
    <>
      {/* Hero Section */}
      <HeroSection background={heroBackground} minHeight="min-h-[40vh]">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
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
          <NewsGrid posts={posts} locale={locale} />
        </div>
      </section>
    </>
  )
}
