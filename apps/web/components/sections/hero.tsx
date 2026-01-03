'use client'

import Link from 'next/link'
import { ArrowRight, Play } from 'lucide-react'
import { type Locale } from '@/lib/i18n'
import { motion } from 'framer-motion'

type Dict = Record<string, any>

interface HeroSectionProps {
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

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay: number) => ({
    opacity: 1,
    transition: {
      duration: 0.8,
      delay,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (delay: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      delay,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

export function HeroSection({ dict, locale }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-base-100 via-base-100 to-primary/5">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

      {/* Animated background shapes */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className="container-custom relative">
        <div className="py-24 md:py-32 lg:py-40">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8"
              variants={scaleIn}
              initial="hidden"
              animate="visible"
              custom={0}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              {dict.hero.badge}
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={0.1}
            >
              {dict.hero.title}
              <br />
              <span className="text-gradient">{dict.hero.titleHighlight}</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              className="text-lg md:text-xl text-base-content/70 max-w-2xl mx-auto mb-10"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={0.2}
            >
              {dict.hero.subtitle}
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={0.3}
            >
              <Link
                href={`/${locale}/contact`}
                className="btn btn-primary btn-lg gap-2 group"
              >
                {dict.hero.cta}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="btn btn-outline btn-lg gap-2 group">
                <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                {dict.hero.watchDemo}
              </button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              className="mt-16 pt-8 border-t border-base-200"
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              custom={0.5}
            >
              <p className="text-sm text-base-content/60 mb-6">
                {dict.hero.trustedBy}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
                {['Company A', 'Company B', 'Company C', 'Company D', 'Company E'].map(
                  (company, index) => (
                    <motion.div
                      key={company}
                      className="text-lg font-semibold text-base-content/40"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: 0.6 + index * 0.1,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      {company}
                    </motion.div>
                  )
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
