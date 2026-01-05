import { type Locale } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionary'
import { getPartners, getStats, getCaseStudies, getBlogPosts, getHomepage } from '@/lib/strapi'
import { HeroSection } from '@/components/sections/hero'
import { ServicesSection } from '@/components/sections/services'
import { WhyChooseUsSection } from '@/components/sections/why-choose-us'
import { FeaturedWorksSection } from '@/components/sections/featured-works'
import { NewsPreviewSection } from '@/components/sections/news-preview'
import { StatsSection } from '@/components/sections/stats'
import { CTASection } from '@/components/sections/cta'

export const dynamic = 'force-dynamic'

type Props = {
  params: Promise<{ locale: Locale }>
}

interface Partner {
  id: number
  name: string
  website?: string
  logo?: {
    url: string
    formats?: {
      thumbnail?: { url: string }
      small?: { url: string }
    }
  }
}

interface Stat {
  id: number
  value: string
  label: string
  order: number
}

interface CaseStudy {
  id: number
  clientName: string
  title: string
  slug: string
  excerpt: string
  industry: string
  resultValue: string
  resultLabel: string
}

interface BlogPost {
  id: number
  title: string
  slug: string
  excerpt: string | null
  publishedAt: string
  category: string | null
  featuredImage?: {
    url: string
    formats?: {
      medium?: { url: string }
      small?: { url: string }
    }
  }
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  const [dict, partnersData, statsData, caseStudiesData, blogData, homepageData] = await Promise.all([
    getDictionary(locale),
    getPartners().catch(() => []),
    getStats(locale).catch(() => []),
    getCaseStudies(locale, 4).catch(() => []),
    getBlogPosts(locale, { pageSize: 3 }).catch(() => ({ posts: [] })),
    getHomepage(locale).catch(() => null)
  ])

  const partners = (partnersData || []) as Partner[]
  const stats = (statsData || []) as Stat[]
  const caseStudies = (caseStudiesData || []) as CaseStudy[]
  const blogPosts = (blogData?.posts || []) as BlogPost[]

  // Build hero data from Strapi or fallback to dict
  const heroData = homepageData?.heroSection ? {
    badge: homepageData.heroSection.badge || dict.hero.badge,
    title: homepageData.heroSection.title || dict.hero.title,
    titleHighlight: homepageData.heroSection.titleHighlight || dict.hero.titleHighlight,
    subtitle: homepageData.heroSection.subtitle || dict.hero.subtitle,
    cta: homepageData.heroSection.ctaButtonText || dict.hero.cta,
    trustedBy: homepageData.heroSection.trustedByText || dict.hero.trustedBy,
  } : dict.hero

  return (
    <>
      <HeroSection dict={{ ...dict, hero: heroData }} locale={locale} partners={partners} />
      <ServicesSection dict={dict} locale={locale} />
      <WhyChooseUsSection locale={locale} />
      <FeaturedWorksSection locale={locale} caseStudies={caseStudies} />
      <NewsPreviewSection locale={locale} posts={blogPosts} />
      <StatsSection stats={stats} />
      <CTASection dict={dict} locale={locale} />
    </>
  )
}
