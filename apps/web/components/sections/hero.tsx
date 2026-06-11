'use client'

import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { type Locale } from '@/lib/i18n'
import { motion } from 'framer-motion'
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
  const isTh = locale === 'th'

  return (
    <section className="relative overflow-hidden bg-navy-950 text-white">
      {/* Subtle grid + restrained teal glow (kept low so the panel reads as solid dark) */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{ backgroundImage: 'url(/grid.svg)', backgroundSize: '32px 32px' }}
      />
      <div className="pointer-events-none absolute -top-1/4 right-0 h-[44rem] w-[44rem] rounded-full bg-primary/10 blur-[160px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[30rem] w-[30rem] rounded-full bg-info/[0.05] blur-[150px]" />

      <div className="container-custom relative z-10">
        <div className="grid items-center gap-10 py-20 md:py-28 lg:grid-cols-12 lg:py-32">
          {/* Copy */}
          <div className="lg:col-span-8 xl:col-span-7">
            <motion.div
              className="eyebrow !text-primary"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="rule-accent" />
              {dict.hero.badge}
            </motion.div>

            <motion.h1
              className="mt-5 text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {dict.hero.title}
              <br />
              <span className="bg-gradient-to-r from-primary to-[#5eead4] bg-clip-text text-transparent">
                {dict.hero.titleHighlight}
              </span>
            </motion.h1>

            <motion.p
              className="mt-6 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {dict.hero.subtitle}
            </motion.p>

            <motion.div
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link
                href={`/${locale}/contact`}
                className="btn btn-primary btn-md group gap-2 md:btn-lg"
              >
                {dict.hero.cta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href={`/${locale}/products/logix`}
                className="btn btn-outline btn-md gap-2 border-white/40 text-white hover:border-primary hover:bg-primary/10 hover:text-white md:btn-lg"
              >
                {isTh ? 'รู้จัก Logix' : 'Discover Logix'}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>

          {/* Stat rail */}
          <motion.div
            className="lg:col-span-4 xl:col-span-5"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-md border border-white/20 bg-white/10">
              {[
                { k: isTh ? 'องค์กรที่ไว้วางใจ' : 'Organizations served', v: '20+' },
                { k: isTh ? 'พันธมิตรเทคโนโลยี' : 'Technology partners', v: '3' },
                { k: isTh ? 'สาขาความเชี่ยวชาญ' : 'Solution pillars', v: '6' },
                { k: isTh ? 'ฐานที่ตั้ง' : 'Based in', v: isTh ? 'เชียงใหม่' : 'Chiang Mai' },
              ].map((s) => (
                <div key={s.k} className="bg-navy-950 p-5">
                  <div className="text-2xl font-bold text-primary md:text-3xl">{s.v}</div>
                  <div className="mt-1 text-xs text-white/75">{s.k}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Trust strip */}
        {partners.length > 0 && (
          <motion.div
            className="border-t border-secondary-content/10 py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <LogoCarousel partners={partners} title={dict.hero.trustedBy} strapiUrl={strapiUrl} />
          </motion.div>
        )}
      </div>
    </section>
  )
}
