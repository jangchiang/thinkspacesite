'use client'

import Link from 'next/link'
import { Cloud, Shield, Database, Code, BarChart, Server, FlaskConical, ArrowRight } from 'lucide-react'
import { type Locale } from '@/lib/i18n'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

type Dict = Record<string, any>

interface ServicesSectionProps {
  dict: Dict
  locale: Locale
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
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

const headerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

export function ServicesSection({ dict, locale }: ServicesSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const services = [
    {
      icon: Cloud,
      key: 'cloud',
      href: `/${locale}/services/cloud`,
    },
    {
      icon: Code,
      key: 'software',
      href: `/${locale}/services/software`,
    },
    {
      icon: Server,
      key: 'hpc',
      href: `/${locale}/services/hpc-ai`,
    },
    {
      icon: Database,
      key: 'dataAi',
      href: `/${locale}/services/ai-datascience`,
    },
    {
      icon: Shield,
      key: 'security',
      href: `/${locale}/services/cybersecurity`,
    },
    {
      icon: BarChart,
      key: 'consulting',
      href: `/${locale}/services/consulting`,
    },
    {
      icon: FlaskConical,
      key: 'research',
      href: `/${locale}/services/research`,
    },
  ]

  return (
    <section className="section-padding bg-base-200" ref={ref}>
      <div className="container-custom">
        {/* Header */}
        <motion.div
          className="max-w-3xl mx-auto text-center mb-16"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={headerVariants}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {dict.services.title}
          </h2>
          <p className="text-lg text-base-content/70">
            {dict.services.subtitle}
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          {services.map((service) => (
            <motion.div key={service.key} variants={itemVariants}>
              <Link
                href={service.href}
                className="group card bg-base-100 hover:shadow-xl transition-all duration-300 h-full"
              >
                <div className="card-body">
                  <motion.div
                    className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary transition-all duration-300"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  >
                    <service.icon className="w-7 h-7 text-primary group-hover:text-primary-content transition-colors" />
                  </motion.div>
                  <h3 className="card-title text-xl">
                    {dict.services[service.key].title}
                  </h3>
                  <p className="text-base-content/70">
                    {dict.services[service.key].description}
                  </p>
                  <div className="card-actions mt-4">
                    <span className="inline-flex items-center gap-1 text-primary font-medium group-hover:gap-2 transition-all">
                      {dict.services.learnMore}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            href={`/${locale}/services`}
            className="btn btn-primary btn-lg group"
          >
            {dict.services.viewAll}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
