import { type Locale } from '@/lib/i18n'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Building2, Quote, CheckCircle2, Lightbulb, Target, Rocket, Check } from 'lucide-react'
import type { Metadata } from 'next'
import { getCaseStudy } from '@/lib/strapi'
import { notFound } from 'next/navigation'
import { MarkdownRenderer } from '@/components/markdown-renderer'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { getResultDisplayMode } from '@/lib/case-study-utils'

type Props = {
  params: Promise<{ locale: Locale; slug: string }>
}

interface StrapiResultItem {
  id: number
  value: string
  label: string
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
  solution?: string
  resultValue?: string
  resultLabel?: string
  additionalResults?: StrapiResultItem[]
  results?: string[]
  technologies?: string[]
  featuredImage?: {
    url: string
    formats?: {
      large?: { url: string }
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

// Fallback data with additional fields for modern design
const fallbackWorks: Record<string, {
  client: { en: string; th: string }
  industry: { en: string; th: string }
  title: { en: string; th: string }
  excerpt: { en: string; th: string }
  challenge: { en: string; th: string }
  solution: { en: string; th: string }
  resultValue: string
  resultLabel: { en: string; th: string }
  additionalResults?: { value: string; label: { en: string; th: string } }[]
  testimonial?: { quote: { en: string; th: string }; author: string; role: { en: string; th: string } }
  technologies?: string[]
}> = {
  'cmu-railcfc-digital-twin': {
    client: { en: 'CMU-RAILCFC', th: 'CMU-RAILCFC' },
    industry: { en: 'Railway Engineering', th: 'วิศวกรรมระบบราง' },
    title: { en: '3D Digital Twin for Railway Ballast', th: 'ดิจิทัลทวิน 3 มิติ สำหรับหินโรยทางรถไฟ' },
    excerpt: {
      en: 'A high-fidelity 3D digital twin for assessing railway ballast condition',
      th: 'ดิจิทัลทวิน 3 มิติความละเอียดสูงสำหรับประเมินสภาพหินโรยทางรถไฟ'
    },
    challenge: {
      en: 'Inspecting and analysing railway ballast condition at scale required moving from manual surveys to a high-fidelity, data-driven model that engineers could explore interactively. The Railway Construction & Foundation Centre (CMU-RAILCFC) needed an accurate representation of ballast geometry to support condition assessment and maintenance planning.',
      th: 'การตรวจสอบและวิเคราะห์สภาพหินโรยทางในวงกว้างจำเป็นต้องเปลี่ยนจากการสำรวจด้วยคนสู่แบบจำลองความละเอียดสูงที่ขับเคลื่อนด้วยข้อมูลซึ่งวิศวกรสามารถสำรวจแบบโต้ตอบได้ ศูนย์ CMU-RAILCFC ต้องการการแทนค่ารูปทรงของหินโรยทางที่แม่นยำเพื่อสนับสนุนการประเมินสภาพและการวางแผนบำรุงรักษา'
    },
    solution: {
      en: 'We built an interactive 3D digital twin pipeline that reconstructs ballast geometry into an explorable model, enabling engineers to assess condition, visualise change over time, and ground their analysis in real survey data.',
      th: 'เราพัฒนากระบวนการสร้างดิจิทัลทวิน 3 มิติแบบโต้ตอบที่จำลองรูปทรงของหินโรยทางให้เป็นแบบจำลองที่สำรวจได้ ช่วยให้วิศวกรประเมินสภาพ มองเห็นการเปลี่ยนแปลงตามเวลา และวิเคราะห์บนพื้นฐานข้อมูลสำรวจจริง'
    },
    resultValue: 'Interactive 3D digital twin delivered for ballast condition assessment.',
    resultLabel: { en: 'Outcome', th: 'ผลลัพธ์' },
    technologies: ['3D Reconstruction', 'Point Cloud', 'Digital Twin', 'WebGL'],
  },
  'egat-slope-risk-ai': {
    client: { en: 'EGAT · CMU-RAILCFC', th: 'กฟผ. · CMU-RAILCFC' },
    industry: { en: 'Energy & Infrastructure', th: 'พลังงานและโครงสร้างพื้นฐาน' },
    title: { en: 'Slope-Stability Risk AI', th: 'AI ประเมินความเสี่ยงเสถียรภาพลาดชัน' },
    excerpt: {
      en: 'An AI risk model for slope-stability monitoring and early warning',
      th: 'โมเดล AI สำหรับติดตามและเตือนภัยความเสี่ยงเสถียรภาพลาดชัน'
    },
    challenge: {
      en: 'EGAT needed early-warning insight into slope-stability risks across critical infrastructure corridors, where slope failures can threaten safety and operational continuity. Existing monitoring lacked a predictive, data-driven view of evolving risk.',
      th: 'กฟผ. ต้องการระบบเตือนล่วงหน้าเพื่อประเมินความเสี่ยงด้านเสถียรภาพของลาดชันตามแนวโครงสร้างพื้นฐานสำคัญ ซึ่งความเสียหายของลาดชันอาจกระทบต่อความปลอดภัยและความต่อเนื่องของการดำเนินงาน การติดตามแบบเดิมยังขาดมุมมองเชิงพยากรณ์ที่ขับเคลื่อนด้วยข้อมูล'
    },
    solution: {
      en: 'We developed an AI risk model that analyses geotechnical and environmental data to assess slope-stability risk and support early-warning decisions for monitoring teams.',
      th: 'เราพัฒนาโมเดลความเสี่ยงด้วย AI ที่วิเคราะห์ข้อมูลธรณีเทคนิคและสิ่งแวดล้อมเพื่อประเมินความเสี่ยงเสถียรภาพลาดชันและสนับสนุนการตัดสินใจเตือนภัยล่วงหน้าสำหรับทีมติดตาม'
    },
    resultValue: 'AI risk model deployed for slope-stability monitoring and early warning.',
    resultLabel: { en: 'Outcome', th: 'ผลลัพธ์' },
    technologies: ['Machine Learning', 'Geotechnical Analytics', 'Risk Modelling', 'Python'],
  },
  'bedding-houze-erp': {
    client: { en: 'Bedding Houze', th: 'Bedding Houze' },
    industry: { en: 'Retail · Cross-border', th: 'ค้าปลีก · ข้ามพรมแดน' },
    title: { en: 'Cross-border ERP (TH–MY)', th: 'ระบบ ERP ข้ามพรมแดน (ไทย–มาเลเซีย)' },
    excerpt: {
      en: 'A unified ERP spanning Thailand and Malaysia operations',
      th: 'ระบบ ERP แบบรวมศูนย์ที่ครอบคลุมการดำเนินงานไทยและมาเลเซีย'
    },
    challenge: {
      en: 'Operations spanning Thailand and Malaysia ran on fragmented systems, making it hard to keep inventory, sales and fulfilment consistent across borders. Bedding Houze needed a single source of truth to coordinate cross-border commerce.',
      th: 'การดำเนินงานระหว่างไทยและมาเลเซียทำงานบนระบบที่กระจัดกระจาย ทำให้ยากต่อการรักษาความสอดคล้องของสต็อก การขาย และการจัดส่งข้ามพรมแดน Bedding Houze ต้องการแหล่งข้อมูลเดียวเพื่อประสานการค้าข้ามพรมแดน'
    },
    solution: {
      en: 'We delivered a unified, cross-border ERP that consolidates inventory, sales and fulfilment across both markets, giving the team a single, consistent operating picture.',
      th: 'เราส่งมอบระบบ ERP ข้ามพรมแดนแบบรวมศูนย์ที่รวมสต็อก การขาย และการจัดส่งของทั้งสองตลาด ให้ทีมงานมีภาพการดำเนินงานเดียวที่สอดคล้องกัน'
    },
    resultValue: 'Unified cross-border ERP for inventory, sales and fulfilment.',
    resultLabel: { en: 'Outcome', th: 'ผลลัพธ์' },
    technologies: ['ERP', 'PostgreSQL', 'Next.js', 'API Integration'],
  },
  'suppaisan-gold-savings': {
    client: { en: 'Suppaisan Goldsmith', th: 'ห้างทองศุภพิศาล' },
    industry: { en: 'Jewellery · FinTech', th: 'อัญมณี · ฟินเทค' },
    title: { en: 'Gold-Savings Web Application', th: 'เว็บแอปพลิเคชันออมทอง' },
    excerpt: {
      en: 'A digital gold-savings platform for a traditional goldsmith',
      th: 'แพลตฟอร์มออมทองดิจิทัลสำหรับห้างทองดั้งเดิม'
    },
    challenge: {
      en: 'A traditional goldsmith wanted to offer a digital savings programme letting customers accumulate gold over time, but lacked the online platform to manage balances, transactions and customer relationships.',
      th: 'ห้างทองดั้งเดิมต้องการเสนอโปรแกรมออมเงินดิจิทัลให้ลูกค้าสะสมทองอย่างต่อเนื่อง แต่ยังขาดแพลตฟอร์มออนไลน์สำหรับจัดการยอด ธุรกรรม และความสัมพันธ์กับลูกค้า'
    },
    solution: {
      en: 'We built a gold-savings web application that lets customers accumulate gold digitally, with clear balances and transaction history, modernising a traditional business.',
      th: 'เราพัฒนาเว็บแอปพลิเคชันออมทองที่ให้ลูกค้าสะสมทองแบบดิจิทัล พร้อมยอดและประวัติธุรกรรมที่ชัดเจน ยกระดับธุรกิจดั้งเดิมให้ทันสมัย'
    },
    resultValue: 'Digital gold-savings platform launched for accumulating customers.',
    resultLabel: { en: 'Outcome', th: 'ผลลัพธ์' },
    technologies: ['Next.js', 'Web App', 'Payments', 'PostgreSQL'],
  },
  'ubah-marketplace': {
    client: { en: 'Nana Digital', th: 'Nana Digital' },
    industry: { en: 'Marketplace · Platform', th: 'มาร์เก็ตเพลส · แพลตฟอร์ม' },
    title: { en: 'Ubah Marketplace', th: 'Ubah Marketplace' },
    excerpt: {
      en: 'A scalable marketplace platform connecting buyers and sellers',
      th: 'แพลตฟอร์มมาร์เก็ตเพลสที่ขยายตัวได้ เชื่อมผู้ซื้อและผู้ขาย'
    },
    challenge: {
      en: 'Nana Digital needed a scalable marketplace platform to connect buyers and sellers, with the catalogue, transaction and management capabilities a growing marketplace demands.',
      th: 'Nana Digital ต้องการแพลตฟอร์มมาร์เก็ตเพลสที่ขยายตัวได้เพื่อเชื่อมผู้ซื้อและผู้ขาย พร้อมความสามารถด้านแคตตาล็อก ธุรกรรม และการจัดการที่มาร์เก็ตเพลสที่เติบโตต้องการ'
    },
    solution: {
      en: 'We launched the Ubah Marketplace platform, connecting buyers and sellers with a scalable foundation for catalogue, transactions and ongoing growth.',
      th: 'เราเปิดตัวแพลตฟอร์ม Ubah Marketplace เชื่อมผู้ซื้อและผู้ขายด้วยรากฐานที่ขยายตัวได้สำหรับแคตตาล็อก ธุรกรรม และการเติบโตในระยะยาว'
    },
    resultValue: 'Marketplace platform launched, connecting buyers and sellers.',
    resultLabel: { en: 'Outcome', th: 'ผลลัพธ์' },
    technologies: ['Next.js', 'Marketplace', 'Elysia', 'PostgreSQL'],
  },
  'lum-dee-pos': {
    client: { en: 'Hidden Cafe', th: 'Hidden Cafe' },
    industry: { en: 'Food & Beverage', th: 'อาหารและเครื่องดื่ม' },
    title: { en: 'LUM-DEE Point of Sale', th: 'ระบบ POS LUM-DEE' },
    excerpt: {
      en: 'A modern point-of-sale tailored to cafe operations',
      th: 'ระบบ POS ที่ทันสมัยออกแบบสำหรับการดำเนินงานคาเฟ่'
    },
    challenge: {
      en: 'A growing cafe needed a modern, reliable point-of-sale tailored to its service flow, replacing ad-hoc tools that could not keep pace with daily operations.',
      th: 'คาเฟ่ที่กำลังเติบโตต้องการระบบ POS ที่ทันสมัยและเชื่อถือได้ ออกแบบให้เข้ากับการบริการ แทนเครื่องมือชั่วคราวที่ตามการดำเนินงานประจำวันไม่ทัน'
    },
    solution: {
      en: 'We built the LUM-DEE point-of-sale, designed around the cafe’s real service flow for fast, reliable day-to-day operations.',
      th: 'เราพัฒนาระบบ POS LUM-DEE ที่ออกแบบรอบการบริการจริงของคาเฟ่ เพื่อการดำเนินงานประจำวันที่รวดเร็วและเชื่อถือได้'
    },
    resultValue: 'Modern POS delivered, tailored to cafe operations.',
    resultLabel: { en: 'Outcome', th: 'ผลลัพธ์' },
    technologies: ['POS', 'Next.js', 'Offline-first', 'PostgreSQL'],
  },
}

function getStrapiImageUrl(url: string | undefined): string | undefined {
  if (!url) return undefined
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://cms.techthinkspace.com'
  return `${baseUrl}${url}`
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  let title = ''
  let description = ''

  try {
    const work = (await getCaseStudy(slug, locale)) as StrapiWork | null
    if (work) {
      title = work.title
      description = work.excerpt || work.challenge || ''
    }
  } catch {
    const fallback = fallbackWorks[slug]
    if (fallback) {
      title = locale === 'th' ? fallback.title.th : fallback.title.en
      description = locale === 'th' ? fallback.excerpt.th : fallback.excerpt.en
    }
  }

  return {
    title: title || (locale === 'th' ? 'ผลงาน' : 'Work Profile'),
    description: description || (locale === 'th' ? 'รายละเอียดผลงาน' : 'Work details'),
  }
}

export default async function WorkDetailPage({ params }: Props): Promise<React.JSX.Element> {
  const { locale, slug } = await params

  let strapiWork: StrapiWork | null = null
  try {
    strapiWork = (await getCaseStudy(slug, locale)) as StrapiWork | null
  } catch (error) {
    console.log('Failed to fetch work from Strapi, using fallback data')
  }

  const fallback = fallbackWorks[slug]
  if (!strapiWork && !fallback) {
    notFound()
  }

  // Build the work data - use Strapi data if available, otherwise fallback
  const work = strapiWork ? {
    title: strapiWork.title,
    client: strapiWork.clientName || '',
    industry: strapiWork.industry || '',
    excerpt: strapiWork.excerpt || '',
    challenge: strapiWork.challenge || '',
    solution: strapiWork.solution || '',
    resultValue: strapiWork.resultValue || '',
    resultLabel: strapiWork.resultLabel || '',
    featuredImage: getStrapiImageUrl(
      strapiWork.featuredImage?.formats?.large?.url ||
      strapiWork.featuredImage?.formats?.medium?.url ||
      strapiWork.featuredImage?.url
    ),
    clientLogo: getStrapiImageUrl(
      strapiWork.clientLogo?.formats?.small?.url ||
      strapiWork.clientLogo?.url
    ),
    // Use Strapi data for additional results and technologies, with fallback as backup
    additionalResults: strapiWork.additionalResults && strapiWork.additionalResults.length > 0
      ? strapiWork.additionalResults.map(r => ({ value: r.value, label: r.label }))
      : fallback?.additionalResults?.map(r => ({
          value: r.value,
          label: locale === 'th' ? r.label.th : r.label.en
        })),
    results: strapiWork.results || [],
    testimonial: undefined, // Remove testimonial for Strapi data
    technologies: strapiWork.technologies && strapiWork.technologies.length > 0
      ? strapiWork.technologies
      : fallback?.technologies,
  } : {
    title: locale === 'th' ? fallback!.title.th : fallback!.title.en,
    client: locale === 'th' ? fallback!.client.th : fallback!.client.en,
    industry: locale === 'th' ? fallback!.industry.th : fallback!.industry.en,
    excerpt: locale === 'th' ? fallback!.excerpt.th : fallback!.excerpt.en,
    challenge: locale === 'th' ? fallback!.challenge.th : fallback!.challenge.en,
    solution: locale === 'th' ? fallback!.solution.th : fallback!.solution.en,
    resultValue: fallback!.resultValue,
    resultLabel: locale === 'th' ? fallback!.resultLabel.th : fallback!.resultLabel.en,
    featuredImage: undefined,
    clientLogo: undefined,
    additionalResults: fallback!.additionalResults?.map(r => ({
      value: r.value,
      label: locale === 'th' ? r.label.th : r.label.en
    })),
    results: [],
    testimonial: fallback!.testimonial,
    technologies: fallback!.technologies,
  }

  const allResults = [
    { value: work.resultValue, label: work.resultLabel },
    ...(work.additionalResults || [])
  ]

  const displayMode = getResultDisplayMode(allResults)
  const isMetric = displayMode === 'metric'

  const journeySteps = [
    {
      icon: Target,
      title: locale === 'th' ? 'ความท้าทาย' : 'Challenge',
      description: locale === 'th' ? 'ระบุปัญหาและความต้องการ' : 'Identify problems and needs'
    },
    {
      icon: Lightbulb,
      title: locale === 'th' ? 'โซลูชัน' : 'Solution',
      description: locale === 'th' ? 'ออกแบบและพัฒนา' : 'Design and develop'
    },
    {
      icon: Rocket,
      title: locale === 'th' ? 'ผลลัพธ์' : 'Results',
      description: locale === 'th' ? 'ส่งมอบคุณค่า' : 'Deliver value'
    },
  ]

  return (
    <>
      {/* Hero Section - Full Width with Navy Surface */}
      <section className="relative min-h-[70vh] flex items-center bg-secondary text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        {/* Featured Image Overlay */}
        {work.featuredImage && (
          <div className="absolute inset-0">
            <Image
              src={work.featuredImage}
              alt={work.title}
              fill
              className="object-cover opacity-20"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/90 to-transparent" />
          </div>
        )}

        <div className="container-custom relative z-10 py-20">
          <Breadcrumb
            items={[
              { label: locale === 'th' ? 'ผลงาน' : 'Works', href: `/${locale}/works` },
              { label: work.title }
            ]}
            locale={locale}
            className="mb-8 [&_a]:text-white/70 [&_a:hover]:text-white [&_span]:text-white [&_svg]:text-white/40"
          />

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {/* Client Badge */}
              <div className="inline-flex items-center gap-3 bg-white/10 border border-white/15 px-4 py-2">
                {work.clientLogo ? (
                  <Image
                    src={work.clientLogo}
                    alt={work.client}
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                ) : (
                  <Building2 className="w-5 h-5 text-primary" />
                )}
                <span className="font-medium">{work.client}</span>
                <span className="text-white/50">•</span>
                <span className="text-white/70">{work.industry}</span>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                {work.title}
              </h1>

              {/* Excerpt */}
              <p className="text-xl text-white/80 max-w-xl">
                {work.excerpt}
              </p>

              {/* Primary Metric */}
              {work.resultValue && (
                isMetric ? (
                  <div className="flex items-center gap-4 pt-4">
                    <div className="text-5xl md:text-6xl font-bold text-primary">
                      {work.resultValue}
                    </div>
                    <div className="text-lg text-white/70 max-w-[150px]">
                      {work.resultLabel}
                    </div>
                  </div>
                ) : (
                  <div className="bg-white/10 p-5 border-l-2 border-primary max-w-lg mt-4">
                    <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                      {work.resultLabel}
                    </div>
                    <div className="text-xl md:text-2xl font-semibold leading-snug">
                      {work.resultValue}
                    </div>
                  </div>
                )
              )}
            </div>

            {/* Stats Cards - Floating */}
            {work.additionalResults && work.additionalResults.length > 0 && (
              isMetric ? (
                <div className="hidden lg:grid grid-cols-2 gap-4">
                  {allResults.slice(0, 4).map((result, index) => (
                    <div
                      key={index}
                      className="bg-white/10 p-6 border border-white/10 hover:bg-white/15 transition-colors"
                    >
                      <div className="text-3xl font-bold text-primary mb-1">
                        {result.value}
                      </div>
                      <div className="text-sm text-white/70">
                        {result.label}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="hidden lg:block space-y-3">
                  {allResults.slice(0, 4).map((result, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 bg-white/10 px-5 py-4 border-l-2 border-primary"
                    >
                      <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">
                          {result.label}
                        </div>
                        <div className="text-sm text-white/90 leading-relaxed">
                          {result.value}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-16 bg-base-100 border-b border-base-300">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            {journeySteps.map((step, index) => (
              <div key={index} className="flex items-center gap-4 flex-1">
                <div className="flex-shrink-0 w-14 h-14 bg-primary/10 flex items-center justify-center">
                  <step.icon className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-base-content">{step.title}</h3>
                  <p className="text-sm text-base-content/60">{step.description}</p>
                </div>
                {index < journeySteps.length - 1 && (
                  <ArrowRight className="hidden md:block w-6 h-6 text-base-content/30 ml-auto" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile Stats (visible on small screens) */}
      {work.additionalResults && work.additionalResults.length > 0 && (
        <section className="lg:hidden py-8 bg-base-200">
          <div className="container-custom">
            {isMetric ? (
              <div className="grid grid-cols-2 gap-4">
                {allResults.map((result, index) => (
                  <div
                    key={index}
                    className="card-surface bg-base-100 p-4 text-center"
                  >
                    <div className="text-2xl font-bold text-primary mb-1">
                      {result.value}
                    </div>
                    <div className="text-xs text-base-content/70">
                      {result.label}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {allResults.map((result, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 card-surface bg-base-100 p-4"
                  >
                    <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">
                        {result.label}
                      </div>
                      <div className="text-sm text-base-content/80 leading-relaxed">
                        {result.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Challenge Section */}
      <section className="py-20 bg-base-100">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-secondary/10 flex items-center justify-center">
                <Target className="w-6 h-6 text-base-content" />
              </div>
              <h2 className="display-heading text-3xl md:text-4xl">
                {locale === 'th' ? 'ความท้าทาย' : 'The Challenge'}
              </h2>
            </div>
            <div className="pl-0 md:pl-16">
              {work.challenge && (
                <MarkdownRenderer content={work.challenge} />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 bg-base-200">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary/10 flex items-center justify-center">
                <Lightbulb className="w-6 h-6 text-primary" />
              </div>
              <h2 className="display-heading text-3xl md:text-4xl">
                {locale === 'th' ? 'โซลูชันของเรา' : 'Our Solution'}
              </h2>
            </div>
            <div className="pl-0 md:pl-16">
              {work.solution && (
                <div className="mb-8">
                  <MarkdownRenderer content={work.solution} />
                </div>
              )}

              {/* Technologies Used */}
              {work.technologies && work.technologies.length > 0 && (
                <div className="mt-8 pt-8 border-t border-base-300">
                  <h3 className="text-sm font-semibold text-base-content/50 uppercase tracking-wider mb-4">
                    {locale === 'th' ? 'เทคโนโลยีที่ใช้' : 'Technologies Used'}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {work.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-base-100 text-sm font-medium border border-base-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-20 bg-secondary text-white">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 mb-4">
                <Rocket className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                {locale === 'th' ? 'ผลลัพธ์ที่ได้' : 'The Results'}
              </h2>
            </div>

            {isMetric ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {allResults.map((result, index) => (
                  <div
                    key={index}
                    className="bg-white/10 p-6 text-center border border-white/20"
                  >
                    <CheckCircle2 className="w-8 h-8 mx-auto mb-3 text-primary" />
                    <div className="text-4xl font-bold text-primary mb-2">{result.value}</div>
                    <div className="text-sm text-white/70">{result.label}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {allResults.map((result, index) => (
                  <div
                    key={index}
                    className="bg-white/10 p-6 border border-white/20 flex items-start gap-4"
                  >
                    <CheckCircle2 className="w-7 h-7 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-1">
                        {result.label}
                      </div>
                      <div className="text-base leading-relaxed">
                        {result.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Key Achievements from results JSON */}
            {work.results && work.results.length > 0 && (
              <div className="mt-12">
                <h3 className="text-xl font-bold text-center mb-6">
                  {locale === 'th' ? 'ผลสำเร็จหลัก' : 'Key Achievements'}
                </h3>
                <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
                  {work.results.map((achievement, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 bg-white/10 px-5 py-4 border-l-2 border-primary"
                    >
                      <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm leading-relaxed">{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      {work.testimonial && (
        <section className="py-20 bg-base-100">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="relative card-surface bg-base-200 p-8 md:p-12">
                <Quote className="absolute top-6 left-6 w-12 h-12 text-primary/20" />
                <blockquote className="relative z-10">
                  <p className="text-xl md:text-2xl font-medium leading-relaxed mb-8 pl-8 text-base-content">
                    "{locale === 'th' ? work.testimonial.quote.th : work.testimonial.quote.en}"
                  </p>
                  <footer className="flex items-center gap-4 pl-8">
                    <div className="w-12 h-12 bg-primary/10 flex items-center justify-center">
                      <span className="text-lg font-bold text-primary">
                        {work.testimonial.author.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <cite className="not-italic font-semibold block">
                        {work.testimonial.author}
                      </cite>
                      <span className="text-sm text-base-content/60">
                        {locale === 'th' ? work.testimonial.role.th : work.testimonial.role.en}
                      </span>
                    </div>
                  </footer>
                </blockquote>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-secondary text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
              {locale === 'th'
                ? 'พร้อมที่จะเริ่มโปรเจกต์ของคุณ?'
                : 'Ready to Start Your Project?'}
            </h2>
            <p className="text-lg text-white/70 mb-8">
              {locale === 'th'
                ? 'ติดต่อเราวันนี้เพื่อพูดคุยว่าเราจะช่วยธุรกิจของคุณได้อย่างไร'
                : 'Contact us today to discuss how we can help your business'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${locale}/contact`} className="btn btn-primary btn-lg">
                {locale === 'th' ? 'ติดต่อเรา' : 'Contact Us'}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link href={`/${locale}/works`} className="btn btn-outline btn-lg text-white border-white/30 hover:bg-white/10 hover:border-white/50">
                {locale === 'th' ? 'ดูผลงานเพิ่มเติม' : 'View More Works'}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
