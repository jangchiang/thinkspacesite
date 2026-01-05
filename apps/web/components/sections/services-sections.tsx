'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Cloud, Shield, Database, Code, BarChart, Server, FlaskConical, ArrowRight, type LucideIcon } from 'lucide-react'
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
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
}

export function ServicesPageContent({ locale, dict, heroBackground, heroTitle, heroSubtitle, services: servicesProp }: ServicesPageContentProps) {
  const heroRef = useRef(null)
  const gridRef = useRef(null)
  const ctaRef = useRef(null)
  const heroInView = useInView(heroRef, { once: true })
  const gridInView = useInView(gridRef, { once: true, margin: '-100px' })
  const ctaInView = useInView(ctaRef, { once: true, margin: '-100px' })

  const hasBackground = heroBackground && heroBackground.type !== 'none'
  const overlayOpacity = heroBackground?.overlayOpacity ?? 60
  const overlayColor = heroBackground?.overlayColor ?? '#000000'
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

  // Use services from props (Strapi) or fall back to empty array
  const services = servicesProp && servicesProp.length > 0
    ? servicesProp.map(service => ({
        slug: service.slug,
        title: service.title,
        description: service.description,
        icon: iconMap[service.icon] || Code,
        color: service.color || 'bg-primary',
        href: `/${locale}/services/${service.slug}`,
      }))
    : []

  const defaultTitle = dict.services?.title || (locale === 'th' ? 'บริการของเรา' : 'Our Services')
  const defaultSubtitle = dict.services?.subtitle || (locale === 'th'
    ? 'โซลูชันเทคโนโลยีครบวงจรสำหรับองค์กรของคุณ'
    : 'Comprehensive technology solutions for your organization')

  return (
    <>
      {/* Hero Section */}
      {!hasBackground ? (
        <section className="section-padding bg-gradient-to-br from-base-100 to-primary/5" ref={heroRef}>
          <div className="container-custom">
            <motion.div
              className="max-w-3xl mx-auto text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                {heroTitle || defaultTitle}
              </h1>
              <motion.p
                className="text-lg md:text-xl text-base-content/70"
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                {heroSubtitle || defaultSubtitle}
              </motion.p>
            </motion.div>
          </div>
        </section>
      ) : (
        <section className="relative min-h-[50vh] flex items-center overflow-hidden" ref={heroRef}>
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

          {/* Gradient fade at bottom */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-base-100 to-transparent" />

          {/* Content */}
          <div className={`container-custom relative z-10 py-20 ${textColorClass}`}>
            <motion.div
              className="max-w-3xl mx-auto text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                {heroTitle || defaultTitle}
              </h1>
              <motion.p
                className="text-lg md:text-xl opacity-80"
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                {heroSubtitle || defaultSubtitle}
              </motion.p>
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
                {locale === 'th' ? 'ยังไม่มีบริการ' : 'No services yet'}
              </p>
            </div>
          ) : (
            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
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
                      className="group card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 border border-base-200 hover:border-primary/20 h-full"
                    >
                      <div className="card-body">
                        <motion.div
                          className={`w-16 h-16 rounded-xl ${service.color} flex items-center justify-center mb-4 transition-transform`}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                        >
                          <Icon className="w-8 h-8 text-white" />
                        </motion.div>
                        <h3 className="card-title text-xl mb-2">
                          {service.title}
                        </h3>
                        <p className="text-base-content/70 mb-4">
                          {service.description}
                        </p>
                        <div className="card-actions mt-auto">
                          <span className="inline-flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                            {dict.services?.learnMore || (locale === 'th' ? 'เรียนรู้เพิ่มเติม' : 'Learn More')}
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary text-primary-content" ref={ctaRef}>
        <div className="container-custom">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {locale === 'th' ? 'พร้อมเริ่มต้นหรือยัง?' : 'Ready to Get Started?'}
            </h2>
            <motion.p
              className="text-lg text-primary-content/80 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              {locale === 'th'
                ? 'ติดต่อเราวันนี้เพื่อรับคำปรึกษาฟรี'
                : 'Contact us today for a free consultation'}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link href={`/${locale}/contact`} className="btn btn-secondary btn-lg group">
                {locale === 'th' ? 'ติดต่อเรา' : 'Contact Us'}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
