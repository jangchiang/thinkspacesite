'use client'

import Link from 'next/link'
import { Code2, ShieldCheck, BrainCircuit, Cpu, Radio, FlaskConical, ArrowRight, type LucideIcon } from 'lucide-react'
import { type Locale } from '@/lib/i18n'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

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

const headerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.08,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
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

export function ServicesSection({ locale, services: strapiServices }: ServicesSectionProps): React.JSX.Element {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
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

  const learnMore = isTh ? 'ดูเพิ่มเติม' : 'Learn more'

  return (
    <section className="section-padding bg-base-100" ref={ref}>
      <div className="container-custom">
        {/* Header */}
        <motion.div
          className="max-w-2xl mb-12 md:mb-16"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={headerVariants}
        >
          <p className="eyebrow mb-3">{isTh ? 'บริการของเรา' : 'What we do'}</p>
          <h2 className="display-heading text-3xl md:text-4xl lg:text-5xl mb-5">
            {isTh ? 'ขีดความสามารถครบวงจรสำหรับองค์กร' : 'End-to-end capabilities for the modern enterprise'}
          </h2>
          <div className="rule-accent mb-6" />
          <p className="text-lg text-base-content/70 leading-relaxed">
            {isTh
              ? 'หกเสาหลักด้านเทคโนโลยีที่ทำงานร่วมกัน ตั้งแต่ซอฟต์แวร์และความปลอดภัย ไปจนถึง AI การประมวลผลสมรรถนะสูง และงานวิจัยขั้นสูง'
              : 'Six technology pillars working in concert — from software and security to AI, high-performance computing, and advanced research.'}
          </p>
        </motion.div>

        {/* 6-card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon
            return (
              <motion.div
                key={pillar.slug}
                custom={index}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                variants={cardVariants}
              >
                <Link
                  href={`/${locale}/services/${pillar.slug}`}
                  className="card-surface group flex h-full flex-col p-7"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center border border-base-300 bg-base-200 text-primary transition-colors duration-300 group-hover:bg-secondary group-hover:text-primary-content">
                    <Icon className="h-6 w-6" strokeWidth={1.75} />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-base-content">
                    {pillar.title}
                  </h3>
                  <p className="mb-6 flex-1 text-base-content/70 leading-relaxed">
                    {pillar.description}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                    {learnMore}
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
