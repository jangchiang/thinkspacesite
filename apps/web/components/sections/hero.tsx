'use client'

import Link from 'next/link'
import { ArrowRight, Play } from 'lucide-react'
import { type Locale } from '@/lib/i18n'
import { motion } from 'framer-motion'
import { BackgroundPaths } from '@/components/backgrounds/background-paths'

type Dict = Record<string, any>

interface HeroSectionProps {
  dict: Dict
  locale: Locale
}

export function HeroSection({ dict, locale }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center">
      {/* Animated Paths Background */}
      <BackgroundPaths />

      <div className="container-custom relative z-10">
        <div className="py-24 md:py-32 lg:py-40">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-base-100/80 backdrop-blur-md border border-primary/20 text-primary text-sm font-medium mb-8 shadow-lg shadow-primary/5"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              {dict.hero.badge}
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {dict.hero.title}
              <br />
              <span
                className="inline-block"
                style={{
                  background: 'linear-gradient(to right, #22c55e, #16a34a)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {dict.hero.titleHighlight}
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              className="text-lg md:text-xl text-base-content/70 max-w-2xl mx-auto mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {dict.hero.subtitle}
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href={`/${locale}/contact`}
                  className="btn btn-primary btn-lg gap-2 group shadow-xl shadow-primary/30"
                >
                  {dict.hero.cta}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <button className="btn btn-lg gap-2 group bg-base-100/80 backdrop-blur-md border border-base-content/10 hover:bg-base-100 hover:border-primary/30 shadow-lg">
                  <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  {dict.hero.watchDemo}
                </button>
              </motion.div>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              className="mt-16 pt-8 border-t border-base-content/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <p className="text-sm text-base-content/50 mb-6">
                {dict.hero.trustedBy}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-8">
                {['Company A', 'Company B', 'Company C', 'Company D', 'Company E'].map(
                  (company, index) => (
                    <motion.div
                      key={company}
                      className="text-lg font-semibold text-base-content/30 hover:text-base-content/60 transition-colors"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
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
