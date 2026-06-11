import { type Locale } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionary'
import { ServicesPageContent } from '@/components/sections/services-sections'
import type { Metadata } from 'next'
import { getPageHero, getServices } from '@/lib/strapi'
import { buildHeroBackground } from '@/lib/hero-utils'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params as { locale: Locale }

  return {
    title: locale === 'th' ? 'บริการของเรา' : 'Our Services',
    description: locale === 'th'
      ? 'บริการเทคโนโลยีครบวงจรจาก Thinkspace Technology'
      : 'Comprehensive technology services from Thinkspace Technology',
  }
}

// Strapi service interface
interface StrapiService {
  id: number
  documentId: string
  title: string
  slug: string
  shortDescription?: string
  icon?: string
  color?: string
  order?: number
}

export default async function ServicesPage({ params }: Props): Promise<React.JSX.Element> {
  const { locale } = await params as { locale: Locale }

  // Fetch hero, dictionary, and services in parallel
  const [heroData, dict, strapiServices] = await Promise.all([
    getPageHero('services', locale),
    getDictionary(locale),
    getServices(locale).catch(() => []) as Promise<StrapiService[]>
  ])

  const heroBackground = buildHeroBackground(heroData)

  // Transform Strapi services to the format expected by the component
  const services = (strapiServices || []).map((service) => ({
    slug: service.slug,
    title: service.title,
    description: service.shortDescription || '',
    icon: service.icon || 'Code',
    color: service.color || 'bg-primary',
  }))

  return (
    <ServicesPageContent
      locale={locale}
      dict={dict}
      heroBackground={heroBackground}
      heroTitle={heroData?.title}
      heroSubtitle={heroData?.subtitle}
      services={services}
    />
  )
}
