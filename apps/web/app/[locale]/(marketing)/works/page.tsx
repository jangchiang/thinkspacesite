import { type Locale } from '@/lib/i18n'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Building2, TrendingUp } from 'lucide-react'
import type { Metadata } from 'next'
import { getCaseStudies, getPageHero } from '@/lib/strapi'
import { HeroSection } from '@/components/sections/hero-section'
import { buildHeroBackground } from '@/lib/hero-utils'

type Props = {
  params: Promise<{ locale: Locale }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params

  return {
    title: locale === 'th' ? 'ผลงาน' : 'Work Profile',
    description: locale === 'th'
      ? 'ผลงานและโครงการที่ Thinkspace Technology ได้ดำเนินการ'
      : 'Projects and work completed by Thinkspace Technology',
  }
}

interface StrapiWork {
  id: number
  documentId: string
  title: string
  slug: string
  clientName?: string
  industry?: string
  excerpt?: string
  challenge?: string
  resultValue?: string
  resultLabel?: string
  featuredImage?: {
    url: string
    formats?: {
      medium?: { url: string }
      small?: { url: string }
    }
  }
  clientLogo?: {
    url: string
    formats?: {
      thumbnail?: { url: string }
      small?: { url: string }
    }
  }
}

// Helper to build Strapi image URL
function getStrapiImageUrl(url: string | undefined): string | undefined {
  if (!url) return undefined
  const baseUrl = process.env.STRAPI_URL || 'http://localhost:1337'
  return `${baseUrl}${url}`
}

export default async function WorksPage({ params }: Props) {
  const { locale } = await params

  // Fetch hero and works in parallel
  const [heroData, strapiWorksResult] = await Promise.all([
    getPageHero('works', locale),
    getCaseStudies(locale).catch(() => [] as StrapiWork[])
  ])

  const strapiWorks = (strapiWorksResult || []) as StrapiWork[]
  const heroBackground = buildHeroBackground(heroData)

  // Use Strapi data only (no fallbacks)
  const works = strapiWorks.map((work) => ({
    slug: work.slug,
    client: work.clientName || '',
    industry: work.industry || '',
    title: work.title,
    challenge: work.excerpt || work.challenge || '',
    resultValue: work.resultValue || '',
    resultLabel: work.resultLabel || '',
    featuredImage: getStrapiImageUrl(
      work.featuredImage?.formats?.medium?.url || work.featuredImage?.url
    ),
    clientLogo: getStrapiImageUrl(
      work.clientLogo?.formats?.small?.url || work.clientLogo?.url
    ),
  }))

  return (
    <>
      {/* Hero Section */}
      <HeroSection background={heroBackground} minHeight="min-h-[40vh]">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {heroData?.title || (locale === 'th' ? 'ผลงานของเรา' : 'Our Work Profile')}
          </h1>
          <p className={`text-lg md:text-xl ${heroBackground ? 'opacity-80' : 'text-base-content/70'}`}>
            {heroData?.subtitle || (locale === 'th'
              ? 'ดูผลงานและโครงการที่เราได้ดำเนินการให้กับลูกค้า'
              : 'Explore our portfolio of successful projects and client work')}
          </p>
        </div>
      </HeroSection>

      {/* Works Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="space-y-8">
            {works.map((work) => (
              <div key={work.slug} className="card bg-base-100 shadow-lg lg:card-side">
                <div className="lg:w-1/3 bg-base-200 flex items-center justify-center p-8 relative overflow-hidden">
                  {work.featuredImage ? (
                    <Image
                      src={work.featuredImage}
                      alt={work.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="text-center">
                      {work.clientLogo ? (
                        <Image
                          src={work.clientLogo}
                          alt={work.client}
                          width={120}
                          height={60}
                          className="mx-auto mb-4 object-contain"
                        />
                      ) : (
                        <Building2 className="w-16 h-16 text-primary mx-auto mb-4" />
                      )}
                      <p className="font-bold text-lg">{work.client}</p>
                      <p className="text-sm text-base-content/60">{work.industry}</p>
                    </div>
                  )}
                </div>
                <div className="card-body lg:w-2/3">
                  <h2 className="card-title text-2xl">{work.title}</h2>
                  {work.featuredImage && (
                    <div className="flex items-center gap-2 text-sm text-base-content/60 mb-2">
                      <span className="font-semibold">{work.client}</span>
                      <span>•</span>
                      <span>{work.industry}</span>
                    </div>
                  )}
                  <p className="text-base-content/70 mb-4">
                    <strong>{locale === 'th' ? 'ความท้าทาย: ' : 'Challenge: '}</strong>
                    {work.challenge}
                  </p>
                  {work.resultValue && (
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-lg">
                        <TrendingUp className="w-5 h-5" />
                        <span className="font-bold text-2xl">{work.resultValue}</span>
                      </div>
                      <span className="text-base-content/70">{work.resultLabel}</span>
                    </div>
                  )}
                  <div className="card-actions">
                    <Link
                      href={`/${locale}/works/${work.slug}`}
                      className="btn btn-primary"
                    >
                      {locale === 'th' ? 'ดูรายละเอียด' : 'View Details'}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-base-200">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              {locale === 'th' ? 'สนใจร่วมงานกับเรา?' : 'Interested in Working With Us?'}
            </h2>
            <p className="text-base-content/70 mb-8">
              {locale === 'th'
                ? 'ติดต่อเราเพื่อพูดคุยเกี่ยวกับโครงการของคุณ'
                : 'Contact us to discuss your project'}
            </p>
            <Link href={`/${locale}/contact`} className="btn btn-primary btn-lg">
              {locale === 'th' ? 'ติดต่อเรา' : 'Contact Us'}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
