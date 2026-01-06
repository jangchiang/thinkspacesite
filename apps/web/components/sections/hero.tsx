'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { type Locale } from '@/lib/i18n'
import { motion } from 'framer-motion'
import { BackgroundPaths } from '@/components/backgrounds/background-paths'
import { LogoCarousel } from '@/components/ui/logo-carousel'

type Dict = Record<string, any>

interface Partner {
  id: number
  name: string
  website?: string
  logo?: {
    url: string
    formats?: {
      thumbnail?: { url: string }
      small?: { url: string }
    }
  }
}

interface HeroSectionProps {
  dict: Dict
  locale: Locale
  partners?: Partner[]
  strapiUrl?: string
}

export function HeroSection({ dict, locale, partners = [], strapiUrl = '' }: HeroSectionProps): React.JSX.Element {
  return (
    <section className="relative overflow-hidden min-h-[80vh] sm:min-h-[90vh] flex items-center">
      {/* Animated Paths Background */}
      <BackgroundPaths />

      <div className="container-custom relative z-10 px-4 sm:px-6">
        <div className="py-16 sm:py-24 md:py-32 lg:py-40">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              className="inline-flex items-center px-4 py-2 rounded-full bg-base-100/80 backdrop-blur-md border border-primary/20 text-primary text-sm font-medium mb-8 shadow-lg shadow-primary/5"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {dict.hero.badge}
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-normal leading-[1.25] sm:leading-[1.2] md:leading-[1.15] mb-4 sm:mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {dict.hero.title}
              <br />
              <span
                className="inline-block mt-1 sm:mt-2"
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
              className="text-base sm:text-lg md:text-xl text-base-content/70 max-w-2xl mx-auto mb-8 sm:mb-10 px-2 sm:px-0"
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
            </motion.div>

            {/* Trust Indicators with Logo Carousel */}
            {partners.length > 0 && (
              <motion.div
                className="mt-16 pt-8 border-t border-base-content/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <LogoCarousel
                  partners={partners}
                  title={dict.hero.trustedBy}
                  strapiUrl={strapiUrl}
                />
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
