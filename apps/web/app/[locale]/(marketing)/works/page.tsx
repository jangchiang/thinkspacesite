import { type Locale } from '@/lib/i18n'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Building2, TrendingUp, Check } from 'lucide-react'
import type { Metadata } from 'next'
import { getCaseStudies, getPageHero } from '@/lib/strapi'
import { HeroSection } from '@/components/sections/hero-section'
import { buildHeroBackground } from '@/lib/hero-utils'
import { isMetricValue } from '@/lib/case-study-utils'
import { CategoryFilter } from '@/components/ui/category-filter'
import { Suspense } from 'react'

type Props = {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ category?: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params as { locale: Locale }

  return {
    title: locale === 'th' ? 'เรื่องราวความสำเร็จ' : 'Customer Stories',
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

// Real case studies from the company profile — shown when Strapi is unavailable.
const fallbackWorks: {
  slug: string
  client: { en: string; th: string }
  industry: { en: string; th: string }
  title: { en: string; th: string }
  challenge: { en: string; th: string }
  resultValue: { en: string; th: string }
  resultLabel: { en: string; th: string }
}[] = [
  {
    slug: 'cmu-railcfc-digital-twin',
    client: { en: 'CMU-RAILCFC', th: 'CMU-RAILCFC' },
    industry: { en: 'Railway Engineering', th: 'วิศวกรรมระบบราง' },
    title: {
      en: '3D Digital Twin for Railway Ballast',
      th: 'ดิจิทัลทวิน 3 มิติ สำหรับหินโรยทางรถไฟ',
    },
    challenge: {
      en: 'Inspecting and analysing railway ballast condition at scale required moving from manual surveys to a high-fidelity, data-driven model.',
      th: 'การตรวจสอบและวิเคราะห์สภาพหินโรยทางในวงกว้างจำเป็นต้องเปลี่ยนจากการสำรวจด้วยคนสู่แบบจำลองความละเอียดสูงที่ขับเคลื่อนด้วยข้อมูล',
    },
    resultValue: {
      en: 'Interactive 3D digital twin delivered for ballast condition assessment.',
      th: 'ส่งมอบดิจิทัลทวิน 3 มิติแบบโต้ตอบสำหรับการประเมินสภาพหินโรยทาง',
    },
    resultLabel: { en: 'Outcome', th: 'ผลลัพธ์' },
  },
  {
    slug: 'egat-slope-risk-ai',
    client: { en: 'EGAT · CMU-RAILCFC', th: 'กฟผ. · CMU-RAILCFC' },
    industry: { en: 'Energy & Infrastructure', th: 'พลังงานและโครงสร้างพื้นฐาน' },
    title: {
      en: 'Slope-Stability Risk AI',
      th: 'AI ประเมินความเสี่ยงเสถียรภาพลาดชัน',
    },
    challenge: {
      en: 'EGAT needed early-warning insight into slope-stability risks across critical infrastructure corridors.',
      th: 'กฟผ. ต้องการระบบเตือนล่วงหน้าเพื่อประเมินความเสี่ยงด้านเสถียรภาพของลาดชันตามแนวโครงสร้างพื้นฐานสำคัญ',
    },
    resultValue: {
      en: 'AI risk model for slope-stability monitoring and early warning.',
      th: 'โมเดล AI สำหรับติดตามและเตือนภัยความเสี่ยงเสถียรภาพลาดชัน',
    },
    resultLabel: { en: 'Outcome', th: 'ผลลัพธ์' },
  },
  {
    slug: 'bedding-houze-erp',
    client: { en: 'Bedding Houze', th: 'Bedding Houze' },
    industry: { en: 'Retail · Cross-border', th: 'ค้าปลีก · ข้ามพรมแดน' },
    title: {
      en: 'Cross-border ERP (TH–MY)',
      th: 'ระบบ ERP ข้ามพรมแดน (ไทย–มาเลเซีย)',
    },
    challenge: {
      en: 'Operations spanning Thailand and Malaysia needed a single ERP to unify inventory, sales and fulfilment.',
      th: 'การดำเนินงานระหว่างไทยและมาเลเซียจำเป็นต้องมีระบบ ERP เดียวเพื่อรวมสต็อก การขาย และการจัดส่ง',
    },
    resultValue: {
      en: 'Unified cross-border ERP for inventory, sales and fulfilment.',
      th: 'ระบบ ERP ข้ามพรมแดนแบบรวมศูนย์สำหรับสต็อก การขาย และการจัดส่ง',
    },
    resultLabel: { en: 'Outcome', th: 'ผลลัพธ์' },
  },
  {
    slug: 'suppaisan-gold-savings',
    client: { en: 'Suppaisan Goldsmith', th: 'ห้างทองศุภพิศาล' },
    industry: { en: 'Jewellery · FinTech', th: 'อัญมณี · ฟินเทค' },
    title: {
      en: 'Gold-Savings Web Application',
      th: 'เว็บแอปพลิเคชันออมทอง',
    },
    challenge: {
      en: 'A traditional goldsmith wanted a digital savings programme to let customers accumulate gold over time.',
      th: 'ห้างทองดั้งเดิมต้องการโปรแกรมออมเงินดิจิทัลให้ลูกค้าสะสมทองอย่างต่อเนื่อง',
    },
    resultValue: {
      en: 'Digital gold-savings platform for accumulating customers.',
      th: 'แพลตฟอร์มออมทองดิจิทัลสำหรับลูกค้าสะสม',
    },
    resultLabel: { en: 'Outcome', th: 'ผลลัพธ์' },
  },
  {
    slug: 'ubah-marketplace',
    client: { en: 'Nana Digital', th: 'Nana Digital' },
    industry: { en: 'Marketplace · Platform', th: 'มาร์เก็ตเพลส · แพลตฟอร์ม' },
    title: {
      en: 'Ubah Marketplace',
      th: 'Ubah Marketplace',
    },
    challenge: {
      en: 'Nana Digital needed a scalable marketplace platform connecting buyers and sellers.',
      th: 'Nana Digital ต้องการแพลตฟอร์มมาร์เก็ตเพลสที่ขยายตัวได้เพื่อเชื่อมผู้ซื้อและผู้ขาย',
    },
    resultValue: {
      en: 'Launched marketplace platform connecting buyers and sellers.',
      th: 'เปิดตัวแพลตฟอร์มมาร์เก็ตเพลสเชื่อมผู้ซื้อและผู้ขาย',
    },
    resultLabel: { en: 'Outcome', th: 'ผลลัพธ์' },
  },
  {
    slug: 'lum-dee-pos',
    client: { en: 'Hidden Cafe', th: 'Hidden Cafe' },
    industry: { en: 'Food & Beverage', th: 'อาหารและเครื่องดื่ม' },
    title: {
      en: 'LUM-DEE Point of Sale',
      th: 'ระบบ POS LUM-DEE',
    },
    challenge: {
      en: 'A growing cafe needed a modern, reliable point-of-sale tailored to its service flow.',
      th: 'คาเฟ่ที่กำลังเติบโตต้องการระบบ POS ที่ทันสมัยและเชื่อถือได้ ออกแบบให้เข้ากับการบริการ',
    },
    resultValue: {
      en: 'Modern POS tailored to cafe operations.',
      th: 'ระบบ POS ที่ทันสมัยออกแบบสำหรับการดำเนินงานคาเฟ่',
    },
    resultLabel: { en: 'Outcome', th: 'ผลลัพธ์' },
  },
]

// Helper to build Strapi image URL (use public URL for browser access)
function getStrapiImageUrl(url: string | undefined): string | undefined {
  if (!url) return undefined
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://cms.techthinkspace.com'
  return `${baseUrl}${url}`
}

export default async function WorksPage({ params, searchParams }: Props): Promise<React.JSX.Element> {
  const { locale } = await params as { locale: Locale }
  const { category } = await searchParams
  const isTh = locale === 'th'

  // Fetch hero and works in parallel
  const [heroData, strapiWorksResult] = await Promise.all([
    getPageHero('works', locale),
    getCaseStudies(locale).catch(() => [] as StrapiWork[])
  ])

  const strapiWorks = (strapiWorksResult || []) as StrapiWork[]
  const heroBackground = buildHeroBackground(heroData)

  // Use Strapi data when present, otherwise fall back to real profile case studies.
  const works = strapiWorks.length > 0
    ? strapiWorks.map((work) => ({
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
    : fallbackWorks.map((work) => ({
        slug: work.slug,
        client: isTh ? work.client.th : work.client.en,
        industry: isTh ? work.industry.th : work.industry.en,
        title: isTh ? work.title.th : work.title.en,
        challenge: isTh ? work.challenge.th : work.challenge.en,
        resultValue: isTh ? work.resultValue.th : work.resultValue.en,
        resultLabel: isTh ? work.resultLabel.th : work.resultLabel.en,
        featuredImage: undefined as string | undefined,
        clientLogo: undefined as string | undefined,
      }))

  // Derive the unique industries/sectors so visitors can filter the stories.
  const industries = [...new Set(
    works
      .map((work) => work.industry)
      .filter((industry): industry is string => Boolean(industry))
  )].sort()

  // Filter the displayed stories by the selected industry (from the query param).
  const filteredWorks = category
    ? works.filter((work) => work.industry === category)
    : works

  return (
    <>
      {/* Hero Section */}
      <HeroSection background={heroBackground} minHeight="min-h-[40vh]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="eyebrow mb-4">{isTh ? 'เรื่องราวความสำเร็จ' : 'Customer Stories'}</p>
          <h1 className="display-heading text-4xl md:text-5xl lg:text-6xl mb-6">
            {heroData?.title || (isTh ? 'เรื่องราวความสำเร็จของลูกค้า' : 'Customer Stories')}
          </h1>
          <p className={`text-lg md:text-xl ${heroBackground ? 'opacity-80' : 'text-base-content/70'}`}>
            {heroData?.subtitle || (isTh
              ? 'เรื่องราวจริงจากองค์กรที่เราร่วมงานด้วย ตั้งแต่ AI และ HPC ไปจนถึง ERP และระบบความปลอดภัย'
              : 'Real stories from the organizations we work with — from AI and HPC to ERP and security.')}
          </p>
        </div>
      </HeroSection>

      {/* Works Grid */}
      <section className="section-padding">
        <div className="container-custom">
          {/* Industry Filter */}
          {industries.length > 1 && (
            <Suspense fallback={<div className="h-10 mb-8" />}>
              <CategoryFilter
                categories={industries}
                locale={locale}
                basePath={`/${locale}/works`}
              />
            </Suspense>
          )}

          <div className="space-y-8">
            {filteredWorks.map((work) => (
              <div key={work.slug} className="card-surface bg-base-100 lg:card-side flex flex-col lg:flex-row overflow-hidden">
                <div className="lg:w-1/3 bg-base-200 flex items-center justify-center p-8 relative overflow-hidden min-h-[12rem]">
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
                        <Building2 className="w-12 h-12 text-primary mx-auto mb-4" />
                      )}
                      <p className="font-bold text-lg text-base-content">{work.client}</p>
                      <p className="text-sm text-base-content/60">{work.industry}</p>
                    </div>
                  )}
                </div>
                <div className="p-8 lg:w-2/3">
                  <h2 className="text-2xl font-bold text-base-content mb-2">{work.title}</h2>
                  <div className="flex items-center gap-2 text-sm text-base-content/60 mb-4">
                    <span className="font-semibold">{work.client}</span>
                    <span>•</span>
                    <span>{work.industry}</span>
                  </div>
                  <p className="text-base-content/70 mb-4 leading-relaxed">
                    <strong className="text-base-content">{isTh ? 'ความท้าทาย: ' : 'Challenge: '}</strong>
                    {work.challenge}
                  </p>
                  {work.resultValue && (
                    isMetricValue(work.resultValue) ? (
                      <div className="flex items-center gap-4 mb-6">
                        <div className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2">
                          <TrendingUp className="w-5 h-5" />
                          <span className="font-bold text-2xl">{work.resultValue}</span>
                        </div>
                        <span className="text-base-content/70">{work.resultLabel}</span>
                      </div>
                    ) : (
                      <div className="border-l-2 border-primary bg-base-200 p-4 mb-6">
                        <div className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="eyebrow mb-1">
                              {work.resultLabel}
                            </div>
                            <p className="text-sm text-base-content/80 leading-relaxed line-clamp-2">
                              {work.resultValue}
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                  <Link
                    href={`/${locale}/works/${work.slug}`}
                    className="btn btn-primary"
                  >
                    {isTh ? 'ดูรายละเอียด' : 'View Details'}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {filteredWorks.length === 0 && (
            <p className="text-center text-base-content/60 py-12">
              {isTh
                ? 'ไม่พบเรื่องราวในหมวดหมู่นี้'
                : 'No stories found in this category.'}
            </p>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-base-200 border-t border-base-300">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <p className="eyebrow mb-4">{isTh ? 'เริ่มต้นโครงการ' : 'Start a Project'}</p>
            <h2 className="display-heading text-3xl md:text-4xl mb-4">
              {isTh ? 'สนใจร่วมงานกับเรา?' : 'Interested in Working With Us?'}
            </h2>
            <p className="text-base-content/70 mb-8">
              {isTh
                ? 'ติดต่อเราเพื่อพูดคุยเกี่ยวกับโครงการของคุณ'
                : 'Contact us to discuss your project'}
            </p>
            <Link href={`/${locale}/contact`} className="btn btn-primary btn-lg">
              {isTh ? 'ติดต่อเรา' : 'Contact Us'}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
