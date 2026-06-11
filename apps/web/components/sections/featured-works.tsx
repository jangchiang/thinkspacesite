'use client'

import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, Building2, Server, Shield, Cloud, Code, Database, BarChart, Check } from 'lucide-react'
import { type Locale } from '@/lib/i18n'
import { isMetricValue } from '@/lib/case-study-utils'

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
}

export function FeaturedWorksSection({ locale, caseStudies }: FeaturedWorksSectionProps): React.JSX.Element | null {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const isTh = locale === 'th'

  // Use provided case studies only (no fallbacks), limit to 4
  const works = (caseStudies || []).slice(0, 4)

  // Don't render section if no works
  if (works.length === 0) {
    return null
  }

  return (
    <section className="section-padding bg-base-200" ref={ref}>
      <div className="container-custom">
        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-2xl">
            <p className="eyebrow mb-3">{isTh ? 'เรื่องราวความสำเร็จ' : 'Customer Stories'}</p>
            <h2 className="display-heading text-3xl md:text-4xl lg:text-5xl mb-5">
              {isTh ? 'โครงการที่เราภูมิใจนำเสนอ' : 'Projects We Are Proud Of'}
            </h2>
            <div className="rule-accent mb-6" />
            <p className="text-lg text-base-content/70 leading-relaxed">
              {isTh
                ? 'โครงการจริงที่ส่งมอบให้องค์กร ภาครัฐ และมหาวิทยาลัย ทั้งในและต่างประเทศ'
                : 'Real engagements delivered for enterprises, government, and universities across borders.'}
            </p>
          </div>
          <Link
            href={`/${locale}/works`}
            className="btn btn-outline btn-primary group shrink-0"
          >
            {isTh ? 'ดูเรื่องราวทั้งหมด' : 'View all stories'}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Works Grid */}
        <motion.div
          className="grid md:grid-cols-2 gap-6"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          {works.map((work) => {
            const IconComponent = industryIcons[work.industry] || Building2

            return (
              <motion.div key={work.id} variants={itemVariants}>
                <Link
                  href={`/${locale}/works/${work.slug}`}
                  className="card-surface group flex flex-col h-full p-7 lg:p-8"
                >
                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-12 h-12 flex items-center justify-center bg-secondary text-primary shrink-0">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="min-w-0">
                      <p className="eyebrow mb-1">{work.industry}</p>
                      <h3 className="font-bold text-xl text-base-content leading-snug">
                        {work.title}
                      </h3>
                      {work.clientName ? (
                        <p className="text-sm text-base-content/70 mt-1">{work.clientName}</p>
                      ) : null}
                    </div>
                  </div>

                  <p className="text-base-content/70 mb-6 leading-relaxed">
                    {work.excerpt}
                  </p>

                  {/* Result + link */}
                  <div className="mt-auto flex items-end justify-between gap-4 pt-5 border-t border-base-300">
                    {isMetricValue(work.resultValue) ? (
                      <div>
                        <span className="block text-3xl font-bold text-base-content tracking-tight">{work.resultValue}</span>
                        <span className="text-xs uppercase tracking-wider text-base-content/70">{work.resultLabel}</span>
                      </div>
                    ) : (
                      <div className="flex items-start gap-2 min-w-0">
                        <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <div className="min-w-0">
                          <span className="block text-xs font-semibold text-accent uppercase tracking-wider">{work.resultLabel}</span>
                          <p className="text-sm text-base-content/70 line-clamp-2 leading-snug">{work.resultValue}</p>
                        </div>
                      </div>
                    )}
                    <span className="flex items-center gap-1.5 text-accent font-medium text-sm shrink-0">
                      {isTh ? 'รายละเอียด' : 'Details'}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
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
