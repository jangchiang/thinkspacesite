'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { type Locale } from '@/lib/i18n'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

type Dict = Record<string, any>

interface CTASectionProps {
  dict: Dict
  locale: Locale
}

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
}

export function CTASection({ dict, locale }: CTASectionProps): React.JSX.Element {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="section-padding bg-base-100" ref={ref}>
      <div className="container-custom">
        <motion.div
          className="relative overflow-hidden bg-secondary text-secondary-content p-10 md:p-14 lg:p-20"
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Static teal accent rule + subtle decoration */}
          <div className="absolute top-0 left-0 h-1 w-24 bg-primary" />
          <div
            className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full bg-primary/10 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-3xl">
            <motion.h2
              className="display-heading text-secondary-content text-3xl md:text-4xl lg:text-5xl mb-6"
              variants={fadeInUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              custom={0.1}
            >
              {dict.cta.title}
            </motion.h2>
            <motion.p
              className="text-lg md:text-xl text-secondary-content/80 mb-10 leading-relaxed"
              variants={fadeInUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              custom={0.2}
            >
              {dict.cta.subtitle}
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row items-start gap-4"
              variants={fadeInUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              custom={0.3}
            >
              <Link
                href={`/${locale}/contact`}
                className="btn btn-primary btn-lg gap-2 group"
              >
                {dict.cta.schedule}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href={`/${locale}/works`}
                className="btn btn-outline btn-lg text-secondary-content border-secondary-content/30 hover:bg-secondary-content hover:text-base-content hover:border-secondary-content"
              >
                {dict.cta.viewWorks}
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
