'use client'

import Link from 'next/link'
import { Cloud, Shield, Database, Code, BarChart, Server, FlaskConical, ArrowRight } from 'lucide-react'
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

// Icon mapping
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  cloud: Cloud,
  software: Code,
  hpc: Server,
  dataAi: Database,
  security: Shield,
  consulting: BarChart,
  research: FlaskConical,
}

export function ServicesSection({ dict, locale, services: strapiServices }: ServicesSectionProps): React.JSX.Element {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  // Fallback services from dictionary
  const fallbackServices = [
    { key: 'cloud', slug: 'cloud' },
    { key: 'software', slug: 'software' },
    { key: 'security', slug: 'cybersecurity' },
    { key: 'dataAi', slug: 'ai-datascience' },
  ]

  // Use Strapi services if available, otherwise use dictionary fallback
  // For homepage marquee, show first 4 services
  const services = strapiServices && strapiServices.length > 0
    ? strapiServices.slice(0, 4).map(s => ({
        key: s.icon?.toLowerCase() || 'code',
        slug: s.slug,
        title: s.title,
        description: s.shortDescription || '',
        icon: s.icon || 'Code',
      }))
    : fallbackServices.map(s => ({
        key: s.key,
        slug: s.slug,
        title: dict.services[s.key]?.title || s.key,
        description: dict.services[s.key]?.description || '',
        icon: s.key,
      }))

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-base-200 overflow-hidden" ref={ref}>
      <div className="container-custom">
        {/* Header */}
        <motion.div
          className="max-w-3xl mx-auto text-center mb-12"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={headerVariants}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {dict.services.title}
          </h2>
          <p className="text-lg md:text-xl text-base-content/70">
            {dict.services.subtitle}
          </p>
        </motion.div>
      </div>

      {/* Services Marquee - Full Width */}
      <motion.div
        className="relative"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {/* Gradient fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-base-200 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-base-200 to-transparent z-10 pointer-events-none" />

        {/* Marquee container */}
        <div className="flex animate-marquee-slow hover:[animation-play-state:paused]">
          {/* First set */}
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon] || iconMap[service.key] || Code
            return (
              <Link
                key={`first-${service.slug}-${index}`}
                href={`/${locale}/services/${service.slug}`}
                className="flex-shrink-0 mx-4 group"
              >
                <motion.div
                  className="w-72 md:w-80 bg-base-100 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-base-300 hover:border-primary/30"
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-all duration-300">
                      <IconComponent className="w-7 h-7 text-primary group-hover:text-primary-content transition-colors" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-sm text-base-content/60 line-clamp-2">
                        {service.description}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-base-200">
                    <span className="inline-flex items-center gap-2 text-primary text-sm font-medium group-hover:gap-3 transition-all">
                      {dict.services.learnMore}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </motion.div>
              </Link>
            )
          })}
          {/* Duplicate set for seamless loop */}
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon] || iconMap[service.key] || Code
            return (
              <Link
                key={`second-${service.slug}-${index}`}
                href={`/${locale}/services/${service.slug}`}
                className="flex-shrink-0 mx-4 group"
              >
                <motion.div
                  className="w-72 md:w-80 bg-base-100 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-base-300 hover:border-primary/30"
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-all duration-300">
                      <IconComponent className="w-7 h-7 text-primary group-hover:text-primary-content transition-colors" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-sm text-base-content/60 line-clamp-2">
                        {service.description}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-base-200">
                    <span className="inline-flex items-center gap-2 text-primary text-sm font-medium group-hover:gap-3 transition-all">
                      {dict.services.learnMore}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </motion.div>
              </Link>
            )
          })}
        </div>
      </motion.div>

      {/* CTA */}
      <div className="container-custom">
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            href={`/${locale}/services`}
            className="btn btn-primary btn-lg group shadow-lg shadow-primary/20"
          >
            {dict.services.viewAll}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
