'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Cloud, Shield, Database, Code, BarChart, Server, FlaskConical, Cpu, ArrowRight, type LucideIcon } from 'lucide-react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { type Locale } from '@/lib/i18n'
import { type HeroBackground } from '@/lib/hero-utils'

type Dict = Record<string, any>

// Icon mapping for dynamic icon rendering
const iconMap: Record<string, LucideIcon> = {
  Cloud,
  Shield,
  Database,
  Code,
  BarChart,
  Server,
  FlaskConical,
  Cpu,
  // Fallback key mappings (matching homepage)
  cloud: Cloud,
  software: Code,
  security: Shield,
  dataAi: Database,
}

interface ServiceItem {
  slug: string
  title: string
  description: string
  icon: string
  color: string
}

interface ServicesPageContentProps {
  locale: Locale
  dict: Dict
  heroBackground?: HeroBackground | null
  heroTitle?: string
  heroSubtitle?: string
  services?: ServiceItem[]
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
}

// REAL 6 ThinkSpace pillars used when Strapi returns nothing.
const fallbackServices: Array<{
  slug: string
  icon: LucideIcon
  title: { en: string; th: string }
  description: { en: string; th: string }
}> = [
  {
    slug: 'software',
    icon: Code,
    title: { en: 'Software Solutions', th: 'โซลูชันซอฟต์แวร์' },
    description: {
      en: 'Custom software, web and mobile platforms, and enterprise systems — from cross-border ERP to POS and digital marketplaces.',
      th: 'ซอฟต์แวร์ตามความต้องการ แพลตฟอร์มเว็บและมือถือ และระบบองค์กร ตั้งแต่ ERP ข้ามพรมแดนไปจนถึง POS และมาร์เก็ตเพลส',
    },
  },
  {
    slug: 'cybersecurity',
    icon: Shield,
    title: { en: 'Cybersecurity & Cloud Infrastructure', th: 'ความมั่นคงปลอดภัยไซเบอร์และคลาวด์' },
    description: {
      en: 'Enterprise security, identity and access control, and resilient cloud and network infrastructure you fully own.',
      th: 'ความปลอดภัยระดับองค์กร การควบคุมตัวตนและสิทธิ์การเข้าถึง และโครงสร้างพื้นฐานคลาวด์และเครือข่ายที่คุณเป็นเจ้าของเต็มที่',
    },
  },
  {
    slug: 'ai-datascience',
    icon: Database,
    title: { en: 'AI & Data Science', th: 'ปัญญาประดิษฐ์และวิทยาการข้อมูล' },
    description: {
      en: 'Applied AI, machine learning, and private AI systems — from risk prediction and document intelligence to sovereign on-prem AI.',
      th: 'การประยุกต์ใช้ AI แมชชีนเลิร์นนิง และระบบ AI ส่วนตัว ตั้งแต่การทำนายความเสี่ยงและความเข้าใจเอกสารไปจนถึง AI อธิปไตยบนเซิร์ฟเวอร์เอง',
    },
  },
  {
    slug: 'hpc',
    icon: Cpu,
    title: { en: 'High-Performance Computing', th: 'การประมวลผลสมรรถนะสูง' },
    description: {
      en: 'GPU-accelerated computing and large-scale simulation for research and engineering workloads.',
      th: 'การประมวลผลเร่งด้วย GPU และการจำลองขนาดใหญ่สำหรับงานวิจัยและวิศวกรรม',
    },
  },
  {
    slug: 'iot',
    icon: Server,
    title: { en: 'IoT & Automation', th: 'IoT และระบบอัตโนมัติ' },
    description: {
      en: 'Connected devices, sensor networks, and automation platforms that turn real-world data into real-time monitoring and control.',
      th: 'อุปกรณ์เชื่อมต่อ เครือข่ายเซ็นเซอร์ และแพลตฟอร์มอัตโนมัติที่เปลี่ยนข้อมูลจริงเป็นการตรวจสอบและควบคุมแบบเรียลไทม์',
    },
  },
  {
    slug: 'research',
    icon: FlaskConical,
    title: { en: 'Advanced Research', th: 'งานวิจัยขั้นสูง' },
    description: {
      en: 'Applied R&D with universities and industry — turning frontier research in simulation, AI, and digital engineering into working systems.',
      th: 'งานวิจัยและพัฒนาประยุกต์ร่วมกับมหาวิทยาลัยและอุตสาหกรรม เปลี่ยนงานวิจัยล้ำสมัยให้เป็นระบบที่ใช้งานได้จริง',
    },
  },
]

export function ServicesPageContent({ locale, dict, heroBackground, heroTitle, heroSubtitle, services: servicesProp }: ServicesPageContentProps): React.JSX.Element {
  const heroRef = useRef(null)
  const gridRef = useRef(null)
  const ctaRef = useRef(null)
  const heroInView = useInView(heroRef, { once: true })
  const gridInView = useInView(gridRef, { once: true, margin: '-100px' })
  const ctaInView = useInView(ctaRef, { once: true, margin: '-100px' })

  const isTh = locale === 'th'

  const hasBackground = heroBackground && heroBackground.type !== 'none'
  const overlayOpacity = heroBackground?.overlayOpacity ?? 70
  const overlayColor = heroBackground?.overlayColor ?? '#171717'
  const textColorClass = heroBackground?.textColor === 'dark' ? 'text-base-content' : 'text-white'

  // Convert hex to RGB for rgba
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 0, g: 0, b: 0 }
  }

  const rgb = hexToRgb(overlayColor)
  const overlayStyle = {
    backgroundColor: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${overlayOpacity / 100})`,
  }

  // Use services from props (Strapi) or fall back to the real 6 pillars.
  const services = servicesProp && servicesProp.length > 0
    ? servicesProp.map(service => ({
        slug: service.slug,
        title: service.title,
        description: service.description,
        icon: iconMap[service.icon] || Code,
        href: `/${locale}/services/${service.slug}`,
      }))
    : fallbackServices.map(service => ({
        slug: service.slug,
        title: isTh ? service.title.th : service.title.en,
        description: isTh ? service.description.th : service.description.en,
        icon: service.icon,
        href: `/${locale}/services/${service.slug}`,
      }))

  const defaultTitle = isTh ? 'บริการของเรา' : 'Our Services'
  const defaultSubtitle = isTh
    ? 'หกเสาหลักด้านเทคโนโลยี — ตั้งแต่ซอฟต์แวร์และความปลอดภัย ไปจนถึง AI, HPC, IoT และงานวิจัยขั้นสูง'
    : 'Six technology pillars — from software and security to AI, HPC, IoT, and advanced research.'
  const eyebrow = isTh ? 'บริการ' : 'What We Do'

  return (
    <>
      {/* Hero Section */}
      {!hasBackground ? (
        <section className="bg-secondary text-white overflow-hidden" ref={heroRef}>
          <div className="container-custom py-20 md:py-28">
            <motion.div
              className="max-w-3xl"
              initial={{ opacity: 0, y: 24 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="eyebrow mb-4">{eyebrow}</p>
              <h1 className="display-heading text-4xl md:text-5xl lg:text-6xl text-white mb-6">
                {heroTitle || defaultTitle}
              </h1>
              <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-2xl">
                {heroSubtitle || defaultSubtitle}
              </p>
            </motion.div>
          </div>
        </section>
      ) : (
        <section className="relative min-h-[50vh] flex items-center overflow-hidden bg-secondary" ref={heroRef}>
          {/* Background Media */}
          {heroBackground.type === 'image' && heroBackground.imageUrl && (
            <div className="absolute inset-0">
              <Image
                src={heroBackground.imageUrl}
                alt=""
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
            </div>
          )}

          {heroBackground.type === 'video' && heroBackground.videoUrl && (
            <div className="absolute inset-0">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src={heroBackground.videoUrl} type="video/mp4" />
              </video>
            </div>
          )}

          {/* Overlay */}
          <div className="absolute inset-0" style={overlayStyle} />

          {/* Content */}
          <div className={`container-custom relative z-10 py-20 md:py-28 ${textColorClass}`}>
            <motion.div
              className="max-w-3xl"
              initial={{ opacity: 0, y: 24 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="eyebrow mb-4">{eyebrow}</p>
              <h1 className="display-heading text-4xl md:text-5xl lg:text-6xl text-white mb-6">
                {heroTitle || defaultTitle}
              </h1>
              <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl">
                {heroSubtitle || defaultSubtitle}
              </p>
            </motion.div>
          </div>
        </section>
      )}

      {/* Services Grid */}
      <section className="section-padding" ref={gridRef}>
        <div className="container-custom">
          {services.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-base-content/70 text-lg">
                {isTh ? 'ยังไม่มีบริการ' : 'No services yet'}
              </p>
            </div>
          ) : (
            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial="hidden"
              animate={gridInView ? 'visible' : 'hidden'}
              variants={containerVariants}
            >
              {services.map((service) => {
                const Icon = service.icon
                return (
                  <motion.div key={service.slug} variants={itemVariants}>
                    <Link
                      href={service.href}
                      className="group card-surface bg-base-100 p-8 h-full flex flex-col hover-lift"
                    >
                      <span className="inline-flex items-center justify-center w-12 h-12 border border-base-300 text-accent bg-primary/5 mb-6 group-hover:border-primary transition-colors">
                        <Icon className="w-6 h-6" />
                      </span>
                      <h3 className="text-xl font-semibold text-base-content mb-3 group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-base-content/70 leading-relaxed mb-6 flex-1">
                        {service.description}
                      </p>
                      <span className="inline-flex items-center gap-2 text-accent font-medium text-sm mt-auto">
                        {dict.services?.learnMore || (isTh ? 'เรียนรู้เพิ่มเติม' : 'Learn More')}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Link>
                  </motion.div>
                )
              })}
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-base-200" ref={ctaRef}>
        <div className="container-custom">
          <motion.div
            className="bg-secondary text-white p-10 md:p-16 text-center"
            initial={{ opacity: 0, y: 24 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="rule-accent mx-auto mb-8" />
            <h2 className="display-heading text-3xl md:text-4xl text-white mb-4">
              {isTh ? 'พร้อมเริ่มต้นหรือยัง?' : 'Ready to Get Started?'}
            </h2>
            <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto leading-relaxed">
              {isTh
                ? 'ติดต่อเราวันนี้เพื่อพูดคุยเกี่ยวกับโครงการของคุณและรับคำปรึกษา'
                : 'Talk to us about your project and get a consultation.'}
            </p>
            <Link href={`/${locale}/contact`} className="btn btn-primary group">
              {isTh ? 'ติดต่อเรา' : 'Contact Us'}
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
