'use client'

import Link from 'next/link'
import { Code2, ShieldCheck, BrainCircuit, Cpu, Radio, FlaskConical, ArrowRight, type LucideIcon } from 'lucide-react'
import { type Locale } from '@/lib/i18n'

type Dict = Record<string, any>

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

interface ServicesSectionProps {
  dict: Dict
  locale: Locale
  services?: StrapiService[]
}

interface Pillar {
  slug: string
  icon: LucideIcon
  title: string
  description: string
}

// Icon mapping for Strapi-provided icon keys
const iconMap: Record<string, LucideIcon> = {
  software: Code2,
  code: Code2,
  security: ShieldCheck,
  cybersecurity: ShieldCheck,
  cloud: ShieldCheck,
  ai: BrainCircuit,
  dataai: BrainCircuit,
  datascience: BrainCircuit,
  hpc: Cpu,
  server: Cpu,
  iot: Radio,
  automation: Radio,
  research: FlaskConical,
}

export function ServicesSection({ dict, locale, services: strapiServices }: ServicesSectionProps): React.JSX.Element {
  const isTh = locale === 'th'

  // Real 6 pillars (source of truth — always available as fallback)
  const fallbackPillars: Pillar[] = [
    {
      slug: 'software',
      icon: Code2,
      title: isTh ? 'โซลูชันซอฟต์แวร์' : 'Software Solutions',
      description: isTh
        ? 'ออกแบบและพัฒนาแพลตฟอร์มเว็บ ระบบ ERP และแอปพลิเคชันองค์กรที่ปรับขนาดได้ตามความต้องการทางธุรกิจ'
        : 'Bespoke web platforms, ERP systems, and enterprise applications engineered to scale with your business.',
    },
    {
      slug: 'cybersecurity',
      icon: ShieldCheck,
      title: isTh ? 'ความมั่นคงปลอดภัยไซเบอร์และโครงสร้างคลาวด์' : 'Cybersecurity & Cloud Infrastructure',
      description: isTh
        ? 'ปกป้ององค์กรด้วยระบบความปลอดภัยเชิงรุก สถาปัตยกรรมคลาวด์ และโครงสร้างพื้นฐานเครือข่ายที่เชื่อถือได้'
        : 'Proactive security, resilient cloud architecture, and trusted network infrastructure that protect your organization.',
    },
    {
      slug: 'ai-datascience',
      icon: BrainCircuit,
      title: isTh ? 'ปัญญาประดิษฐ์และวิทยาการข้อมูล' : 'AI & Data Science',
      description: isTh
        ? 'เปลี่ยนข้อมูลให้เป็นการตัดสินใจด้วยโมเดล AI ระบบ Private AI และการวิเคราะห์ขั้นสูงที่ปรับใช้กับงานจริง'
        : 'Turn data into decisions with applied AI models, Private AI deployments, and advanced analytics.',
    },
    {
      slug: 'hpc',
      icon: Cpu,
      title: isTh ? 'การประมวลผลสมรรถนะสูง (HPC)' : 'High-Performance Computing (HPC)',
      description: isTh
        ? 'เร่งงานจำลองและการคำนวณเชิงวิทยาศาสตร์ด้วยการประมวลผลแบบขนานและการเร่งความเร็วด้วย GPU'
        : 'Accelerate simulation and scientific computing with parallel processing and GPU acceleration.',
    },
    {
      slug: 'iot',
      icon: Radio,
      title: isTh ? 'IoT และระบบอัตโนมัติ' : 'IoT & Automation',
      description: isTh
        ? 'เชื่อมต่ออุปกรณ์ เซ็นเซอร์ และกระบวนการเข้าด้วยกันเพื่อสร้างระบบอัตโนมัติที่ชาญฉลาดและตรวจสอบได้แบบเรียลไทม์'
        : 'Connect devices, sensors, and processes into intelligent automation with real-time visibility.',
    },
    {
      slug: 'research',
      icon: FlaskConical,
      title: isTh ? 'งานวิจัยขั้นสูง' : 'Advanced Research',
      description: isTh
        ? 'ร่วมวิจัยและพัฒนาเทคโนโลยีร่วมกับสถาบันชั้นนำ ตั้งแต่ดิจิทัลทวินไปจนถึงการจำลองทางวิศวกรรม'
        : 'Collaborative R&D with leading institutions, from digital twins to engineering simulation.',
    },
  ]

  // Use Strapi services if available, otherwise fall back to the real 6 pillars.
  const pillars: Pillar[] = strapiServices && strapiServices.length > 0
    ? strapiServices.slice(0, 6).map((s, i) => ({
        slug: s.slug,
        icon: iconMap[(s.icon || s.slug || '').toLowerCase().replace(/[^a-z]/g, '')] || fallbackPillars[i % 6].icon,
        title: s.title,
        description: s.shortDescription || '',
      }))
    : fallbackPillars

  const heading = dict?.services?.title || (isTh ? 'โซลูชันเทคโนโลยีครบวงจร' : 'Comprehensive Technology Solutions')
  const subtitle = dict?.services?.subtitle || (isTh
    ? 'ตั้งแต่โครงสร้างพื้นฐานคลาวด์ไปจนถึงความปลอดภัยไซเบอร์ เราส่งมอบโซลูชันครบวงจรเพื่อขับเคลื่อนการเปลี่ยนผ่านสู่ดิจิทัลขององค์กรคุณ'
    : 'From cloud infrastructure to cybersecurity, we provide end-to-end solutions to power your digital transformation journey.')
  const learnMore = isTh ? 'ดูเพิ่มเติม' : 'Learn more'
  const viewAll = isTh ? 'ดูบริการทั้งหมด' : 'View All Services'

  // Duplicate the cards for a seamless marquee loop.
  const marquee = [...pillars, ...pillars]

  return (
    <section className="overflow-hidden bg-base-200 py-16 md:py-20 lg:py-24">
      <div className="container-custom">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">{heading}</h2>
          <p className="text-lg text-base-content/70 md:text-xl">{subtitle}</p>
        </div>
      </div>

      {/* Auto-scrolling marquee of service cards (pauses on hover) */}
      <div className="relative">
        <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-20 bg-gradient-to-r from-base-200 to-transparent md:w-32" />
        <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-20 bg-gradient-to-l from-base-200 to-transparent md:w-32" />

        <div className="flex w-max animate-marquee-slow hover:[animation-play-state:paused] motion-reduce:animate-none">
          {marquee.map((pillar, i) => {
            const Icon = pillar.icon
            return (
              <Link
                key={`${pillar.slug}-${i}`}
                href={`/${locale}/services/${pillar.slug}`}
                className="group mx-4 flex-shrink-0"
                aria-hidden={i >= pillars.length}
                tabIndex={i >= pillars.length ? -1 : undefined}
              >
                <div className="w-72 rounded-2xl border border-base-300 bg-base-100 p-6 shadow-lg transition-all duration-300 hover:border-primary/30 hover:shadow-xl md:w-80">
                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-all duration-300 group-hover:bg-primary">
                      <Icon className="h-7 w-7 text-primary transition-colors group-hover:text-primary-content" strokeWidth={1.75} aria-hidden="true" />
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-2 text-lg font-bold text-base-content transition-colors group-hover:text-accent">{pillar.title}</h3>
                      <p className="line-clamp-2 text-sm text-base-content/60">{pillar.description}</p>
                    </div>
                  </div>
                  <div className="mt-4 border-t border-base-200 pt-4">
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-accent transition-all group-hover:gap-3">
                      {learnMore}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      <div className="container-custom">
        <div className="mt-12 text-center">
          <Link href={`/${locale}/services`} className="btn btn-primary btn-lg group gap-2 shadow-lg shadow-primary/20">
            {viewAll}
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
