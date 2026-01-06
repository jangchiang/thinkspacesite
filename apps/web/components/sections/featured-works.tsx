'use client'

import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, Building2, Server, Shield, Cloud, Code, Database, BarChart } from 'lucide-react'
import { type Locale } from '@/lib/i18n'

interface CaseStudy {
  id: number
  clientName: string
  title: string
  slug: string
  excerpt: string
  industry: string
  resultValue: string
  resultLabel: string
}

interface FeaturedWorksSectionProps {
  locale: Locale
  caseStudies?: CaseStudy[]
}

// Icon mapping based on industry
const industryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'Banking': Building2,
  'ธนาคาร': Building2,
  'Energy': Server,
  'พลังงาน': Server,
  'Government': Shield,
  'ภาครัฐ': Shield,
  'Retail': Cloud,
  'ค้าปลีก': Cloud,
  'Technology': Code,
  'เทคโนโลยี': Code,
  'Healthcare': Database,
  'สาธารณสุข': Database,
  'Finance': BarChart,
  'การเงิน': BarChart,
}

// Color mapping based on industry
const industryColors: Record<string, string> = {
  'Banking': 'from-blue-500/20 to-cyan-500/20',
  'ธนาคาร': 'from-blue-500/20 to-cyan-500/20',
  'Energy': 'from-orange-500/20 to-yellow-500/20',
  'พลังงาน': 'from-orange-500/20 to-yellow-500/20',
  'Government': 'from-red-500/20 to-pink-500/20',
  'ภาครัฐ': 'from-red-500/20 to-pink-500/20',
  'Retail': 'from-purple-500/20 to-indigo-500/20',
  'ค้าปลีก': 'from-purple-500/20 to-indigo-500/20',
  'Technology': 'from-green-500/20 to-emerald-500/20',
  'เทคโนโลยี': 'from-green-500/20 to-emerald-500/20',
  'Healthcare': 'from-teal-500/20 to-cyan-500/20',
  'สาธารณสุข': 'from-teal-500/20 to-cyan-500/20',
  'Finance': 'from-amber-500/20 to-orange-500/20',
  'การเงิน': 'from-amber-500/20 to-orange-500/20',
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
}

export function FeaturedWorksSection({ locale, caseStudies }: FeaturedWorksSectionProps): React.JSX.Element | null {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  // Use provided case studies only (no fallbacks), limit to 4
  const works = (caseStudies || []).slice(0, 4)

  // Don't render section if no works
  if (works.length === 0) {
    return null
  }

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-base-200" ref={ref}>
      <div className="container-custom">
        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {locale === 'th' ? 'ผลงานที่โดดเด่น' : 'Featured Works'}
            </h2>
            <p className="text-lg text-base-content/70 max-w-2xl">
              {locale === 'th'
                ? 'โครงการที่เราภูมิใจนำเสนอ สะท้อนความเชี่ยวชาญและความสำเร็จของทีมงาน'
                : 'Projects we are proud to present, reflecting our expertise and team success'}
            </p>
          </div>
          <Link
            href={`/${locale}/works`}
            className="btn btn-outline btn-primary group"
          >
            {locale === 'th' ? 'ดูผลงานทั้งหมด' : 'View All Works'}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Works Grid */}
        <motion.div
          className="grid md:grid-cols-2 gap-6 lg:gap-8"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          {works.map((work) => {
            const IconComponent = industryIcons[work.industry] || Building2
            const colorClass = industryColors[work.industry] || 'from-gray-500/20 to-slate-500/20'

            return (
              <motion.div
                key={work.id}
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <Link
                  href={`/${locale}/works/${work.slug}`}
                  className="group block relative overflow-hidden rounded-2xl bg-base-100 border border-base-300 hover:border-primary/30 transition-all duration-300"
                >
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${colorClass} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  <div className="relative p-6 lg:p-8">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-all duration-300 flex-shrink-0">
                        <IconComponent className="w-6 h-6 text-primary group-hover:text-primary-content transition-colors" />
                      </div>
                      <div>
                        <span className="text-xs font-medium text-primary uppercase tracking-wider">
                          {work.industry}
                        </span>
                        <h3 className="font-bold text-xl mt-1">
                          {work.title}
                        </h3>
                      </div>
                    </div>

                    <p className="text-base-content/70 mb-4">
                      {work.excerpt}
                    </p>

                    {/* Result Badge */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-primary">{work.resultValue}</span>
                        <span className="text-sm text-base-content/60">{work.resultLabel}</span>
                      </div>
                      <div className="flex items-center gap-2 text-primary font-medium">
                        <span className="text-sm">
                          {locale === 'th' ? 'ดูรายละเอียด' : 'View Details'}
                        </span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
