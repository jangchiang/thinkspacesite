'use client'

import Link from 'next/link'
import { Cloud, Shield, Database, Code, BarChart, Server, FlaskConical, ArrowRight } from 'lucide-react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { type Locale } from '@/lib/i18n'

type Dict = Record<string, any>

interface ServicesPageContentProps {
  locale: Locale
  dict: Dict
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

export function ServicesPageContent({ locale, dict }: ServicesPageContentProps) {
  const heroRef = useRef(null)
  const gridRef = useRef(null)
  const ctaRef = useRef(null)
  const heroInView = useInView(heroRef, { once: true })
  const gridInView = useInView(gridRef, { once: true, margin: '-100px' })
  const ctaInView = useInView(ctaRef, { once: true, margin: '-100px' })

  const services = [
    {
      icon: Cloud,
      key: 'cloud',
      href: `/${locale}/services/cloud`,
      color: 'bg-blue-500',
    },
    {
      icon: Code,
      key: 'software',
      href: `/${locale}/services/software`,
      color: 'bg-green-500',
    },
    {
      icon: Server,
      key: 'hpc',
      href: `/${locale}/services/hpc-ai`,
      color: 'bg-indigo-500',
    },
    {
      icon: Database,
      key: 'dataAi',
      href: `/${locale}/services/ai-datascience`,
      color: 'bg-purple-500',
    },
    {
      icon: Shield,
      key: 'security',
      href: `/${locale}/services/cybersecurity`,
      color: 'bg-red-500',
    },
    {
      icon: BarChart,
      key: 'consulting',
      href: `/${locale}/services/consulting`,
      color: 'bg-orange-500',
    },
    {
      icon: FlaskConical,
      key: 'research',
      href: `/${locale}/services/research`,
      color: 'bg-teal-500',
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-base-100 to-primary/5" ref={heroRef}>
        <div className="container-custom">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {dict.services?.title || (locale === 'th' ? 'บริการของเรา' : 'Our Services')}
            </h1>
            <motion.p
              className="text-lg md:text-xl text-base-content/70"
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              {dict.services?.subtitle || (locale === 'th'
                ? 'โซลูชันเทคโนโลยีครบวงจรสำหรับองค์กรของคุณ'
                : 'Comprehensive technology solutions for your organization')}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding" ref={gridRef}>
        <div className="container-custom">
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            animate={gridInView ? 'visible' : 'hidden'}
            variants={containerVariants}
          >
            {services.map((service) => (
              <motion.div key={service.key} variants={itemVariants}>
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
                      <service.icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className="card-title text-xl mb-2">
                      {dict.services?.[service.key]?.title || service.key}
                    </h3>
                    <p className="text-base-content/70 mb-4">
                      {dict.services?.[service.key]?.description || ''}
                    </p>
                    <div className="card-actions mt-auto">
                      <span className="inline-flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                        {dict.services?.learnMore || 'Learn More'}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
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
