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
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

export function CTASection({ dict, locale }: CTASectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="section-padding" ref={ref}>
      <div className="container-custom">
        <motion.div
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-600 to-green-800 text-white p-8 md:p-12 lg:p-16"
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.98 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Background decoration - animated */}
          <motion.div
            className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-white/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute bottom-0 left-0 -mb-16 -ml-16 w-64 h-64 bg-white/10 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
              variants={fadeInUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              custom={0.1}
            >
              {dict.cta.title}
            </motion.h2>
            <motion.p
              className="text-lg md:text-xl text-white/90 mb-8"
              variants={fadeInUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              custom={0.2}
            >
              {dict.cta.subtitle}
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              variants={fadeInUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              custom={0.3}
            >
              <Link
                href={`/${locale}/contact`}
                className="btn btn-lg gap-2 group bg-white text-primary hover:bg-white/90 border-none shadow-lg"
              >
                {dict.cta.schedule}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href={`/${locale}/works`}
                className="btn btn-outline btn-lg text-white border-white/40 hover:bg-white hover:text-primary hover:border-white group"
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
