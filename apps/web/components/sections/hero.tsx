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
    <section className="relative overflow-hidden flex items-center">
      {/* Animated Paths Background */}
      <BackgroundPaths />

      <div className="container-custom relative z-10 px-4 sm:px-6 w-full">
        <div className="py-6 sm:py-12 md:py-20 lg:py-28">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              className="inline-flex items-center px-2.5 py-1 sm:px-4 sm:py-2 rounded-full bg-base-100/80 backdrop-blur-md border border-primary/20 text-primary text-[10px] sm:text-sm font-medium mb-3 sm:mb-6 shadow-lg shadow-primary/5"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {dict.hero.badge}
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-normal leading-tight mb-2 sm:mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {dict.hero.title}
              <br />
              <span
                className="inline-block mt-0.5 sm:mt-1"
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
              className="text-xs sm:text-sm md:text-base lg:text-lg text-base-content/70 max-w-xl mx-auto mb-4 sm:mb-6 md:mb-8 px-1 sm:px-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {dict.hero.subtitle}
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4"
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
                  className="btn btn-primary btn-sm sm:btn-md md:btn-lg gap-1.5 sm:gap-2 group shadow-xl shadow-primary/30"
                >
                  {dict.hero.cta}
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>

            {/* Trust Indicators with Logo Carousel - hidden on very small screens */}
            {partners.length > 0 && (
              <motion.div
                className="mt-6 sm:mt-10 md:mt-14 pt-4 sm:pt-6 border-t border-base-content/10"
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
