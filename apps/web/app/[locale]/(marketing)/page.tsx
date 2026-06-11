import { type Locale } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionary'
import { getPartners, getClients, getStats, getCaseStudies, getBlogPosts, getHomepage, getServices } from '@/lib/strapi'
import { HeroSection } from '@/components/sections/hero'
import { ServicesSection } from '@/components/sections/services'
import { LogixHighlight } from '@/components/sections/logix-highlight'
import { PartnersBand } from '@/components/sections/partners'
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

interface Service {
  id: number
  documentId: string
  title: string
  slug: string
  shortDescription?: string
  icon?: string
  color?: string
  order?: number
}

export default async function HomePage({ params }: Props): Promise<React.JSX.Element> {
  const { locale } = await params
  const [dict, partnersData, clientsData, statsData, caseStudiesData, blogData, homepageData, servicesData] = await Promise.all([
    getDictionary(locale),
    getPartners().catch(() => []),
    getClients().catch(() => []),
    getStats(locale).catch(() => []),
    getCaseStudies(locale, 4).catch(() => []),
    getBlogPosts(locale, { pageSize: 3 }).catch(() => ({ posts: [] })),
    getHomepage(locale).catch(() => null),
    getServices(locale).catch(() => [])
  ])

  const partners = (partnersData || []) as Partner[]
  const clients = (clientsData || []) as Partner[]
  const stats = (statsData || []) as Stat[]
  const caseStudies = (caseStudiesData || []) as CaseStudy[]
  const blogPosts = (blogData?.posts || []) as BlogPost[]
  const services = (servicesData || []) as Service[]

  // Get PUBLIC Strapi URL for client components (images need to be accessible from browser)
  // STRAPI_URL is internal (http://cms:1337), but images need public URL
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://cms.techthinkspace.com'

  // Helper function to check if a string is valid (not empty, not just "?")
  const isValidText = (text: string | undefined | null): text is string => {
    return !!text && text.trim() !== '' && text.trim() !== '?'
  }

  // Build hero data from Strapi or fallback to dict
  const heroData = homepageData?.heroSection ? {
    badge: isValidText(homepageData.heroSection.badge) ? homepageData.heroSection.badge : dict.hero.badge,
    title: isValidText(homepageData.heroSection.title) ? homepageData.heroSection.title : dict.hero.title,
    titleHighlight: isValidText(homepageData.heroSection.titleHighlight) ? homepageData.heroSection.titleHighlight : dict.hero.titleHighlight,
    subtitle: isValidText(homepageData.heroSection.subtitle) ? homepageData.heroSection.subtitle : dict.hero.subtitle,
    cta: isValidText(homepageData.heroSection.ctaButtonText) ? homepageData.heroSection.ctaButtonText : dict.hero.cta,
    trustedBy: isValidText(homepageData.heroSection.trustedByText) ? homepageData.heroSection.trustedByText : dict.hero.trustedBy,
  } : dict.hero

  return (
    <>
      <HeroSection dict={{ ...dict, hero: heroData }} locale={locale} partners={partners} strapiUrl={strapiUrl} />
      <ServicesSection dict={dict} locale={locale} services={services} />
      <LogixHighlight locale={locale} />
      <PartnersBand locale={locale} clients={clients} partners={partners} strapiUrl={strapiUrl} />
      <WhyChooseUsSection locale={locale} data={homepageData?.whyChooseUsSection} />
      <FeaturedWorksSection locale={locale} caseStudies={caseStudies} />
      <StatsSection stats={stats} />
      <NewsPreviewSection locale={locale} posts={blogPosts} strapiUrl={strapiUrl} />
      <CTASection dict={dict} locale={locale} />
    </>
  )
}
