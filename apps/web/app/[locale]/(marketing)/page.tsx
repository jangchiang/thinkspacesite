import { type Locale } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionary'
import { getPartners, getClients, getStats, getCaseStudies, getBlogPosts, getHomepage, getServices, getHeroCards, type HeroCard } from '@/lib/strapi'
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
// Render dynamically but reuse cached CMS responses (revalidate + tags) — fast TTFB, no per-request Strapi round-trips.
export const fetchCache = 'default-cache'

type Props = {
  params: Promise<{ locale: string }>
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
  const { locale } = await params as { locale: Locale }
  const [dict, partnersData, clientsData, statsData, caseStudiesData, blogData, homepageData, servicesData, heroCardsData] = await Promise.all([
    getDictionary(locale),
    getPartners().catch(() => []),
    getClients().catch(() => []),
    getStats(locale).catch(() => []),
    getCaseStudies(locale, 4).catch(() => []),
    getBlogPosts(locale, { pageSize: 3 }).catch(() => ({ posts: [] })),
    getHomepage(locale).catch(() => null),
    getServices(locale).catch(() => []),
    getHeroCards(locale).catch(() => [])
  ])

  const partners = (partnersData || []) as Partner[]
  const clients = (clientsData || []) as Partner[]
  const stats = (statsData || []) as Stat[]
  const caseStudies = (caseStudiesData || []) as CaseStudy[]
  const blogPosts = (blogData?.posts || []) as BlogPost[]
  const services = (servicesData || []) as Service[]
  const heroCards = (heroCardsData || []) as HeroCard[]

  // Get PUBLIC Strapi URL for client components (images need to be accessible from browser)
  // STRAPI_URL is internal (http://cms:1337), but images need public URL
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://cms.techthinkspace.com'

  // Helper function to check if a string is valid (not empty, not just "?")
  const isValidText = (text: string | undefined | null): text is string => {
    return !!text && text.trim() !== '' && text.trim() !== '?'
  }

  // Build hero data from Strapi or fallback to dict
  const hs = homepageData?.heroSection as any
  const heroData = hs ? {
    badge: isValidText(hs.badge) ? hs.badge : dict.hero.badge,
    title: isValidText(hs.title) ? hs.title : dict.hero.title,
    titleHighlight: isValidText(hs.titleHighlight) ? hs.titleHighlight : dict.hero.titleHighlight,
    subtitle: isValidText(hs.subtitle) ? hs.subtitle : dict.hero.subtitle,
    cta: isValidText(hs.ctaButtonText) ? hs.ctaButtonText : dict.hero.cta,
    trustedBy: isValidText(hs.trustedByText) ? hs.trustedByText : dict.hero.trustedBy,
    // Secondary ("Discover Logix") button — CMS-managed, falls back to code defaults in the hero.
    ctaSecondary: isValidText(hs.secondaryButtonText) ? hs.secondaryButtonText : undefined,
    ctaSecondaryLink: isValidText(hs.secondaryButtonLink) ? hs.secondaryButtonLink : undefined,
    // Stats + partners — only used when the CMS has entries, else the hero shows its built-in defaults.
    stats: Array.isArray(hs.stats) && hs.stats.length > 0
      ? hs.stats.filter((s: any) => isValidText(s?.value) && isValidText(s?.label)).map((s: any) => ({ v: s.value, k: s.label }))
      : undefined,
    showPartners: hs.showPartners !== false,
    partners: Array.isArray(hs.partners) && hs.partners.length > 0
      ? hs.partners.filter((p: any) => isValidText(p?.name)).map((p: any) => ({ name: p.name, note: isValidText(p?.note) ? p.note : undefined }))
      : undefined,
  } : dict.hero

  return (
    <>
      <HeroSection dict={{ ...dict, hero: heroData }} locale={locale} partners={partners} clients={clients} heroCards={heroCards} strapiUrl={strapiUrl} />
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
