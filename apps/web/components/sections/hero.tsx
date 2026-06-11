'use client'

import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { type Locale } from '@/lib/i18n'
import { motion } from 'framer-motion'
import { MatrixGrid } from '@/components/backgrounds/matrix-grid'

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

// initial state animates transform only (no opacity) so text is visible instantly —
// avoids the blank-flash / LCP hit of fading in from opacity:0.
const rise = (delay = 0) => ({
  initial: { y: 16 },
  animate: { y: 0 },
  transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
})

export function HeroSection({ dict, locale }: HeroSectionProps): React.JSX.Element {
  const isTh = locale === 'th'

  const tags = isTh
    ? ['AI และวิทยาการข้อมูล', 'HPC', 'ความปลอดภัยไซเบอร์', 'Private AI', 'Digital Twin']
    : ['AI & Data Science', 'HPC', 'Cybersecurity', 'Private AI', 'Digital Twins']

  const stats = [
    { k: isTh ? 'องค์กรที่ไว้วางใจ' : 'Organizations served', v: '20+' },
    { k: isTh ? 'สาขาความเชี่ยวชาญ' : 'Solution pillars', v: '6' },
    { k: isTh ? 'ก่อตั้ง' : 'Founded', v: '2024' },
    { k: isTh ? 'ฐานที่ตั้ง' : 'Based in', v: isTh ? 'เชียงใหม่' : 'Chiang Mai' },
  ]

  return (
    <section className="relative overflow-hidden bg-secondary text-white">
      {/* Optional video background — drop a file at /public/videos/hero.mp4. */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster="/images/hero-poster.jpg"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/92 via-secondary/72 to-secondary/88" />
      <MatrixGrid />

      <div className="container-custom relative z-10">
        <div className="grid items-center gap-10 py-20 md:py-28 lg:grid-cols-12 lg:py-32">
          {/* Copy */}
          <div className="lg:col-span-7">
            <motion.div className="eyebrow !text-primary" {...rise(0)}>
              <span className="rule-accent" />
              {dict.hero.badge}
            </motion.div>

            <motion.h1
              className="mt-5 text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl"
              {...rise(0.05)}
            >
              {dict.hero.title}
              <br />
              <span className="bg-gradient-to-r from-primary to-[#4ade80] bg-clip-text text-transparent">
                {dict.hero.titleHighlight}
              </span>
            </motion.h1>

            <motion.p className="mt-6 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg" {...rise(0.1)}>
              {dict.hero.subtitle}
            </motion.p>

            <motion.div className="mt-6 flex flex-wrap gap-2" {...rise(0.15)}>
              {tags.map((t) => (
                <span key={t} className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-xs font-medium text-white/75">
                  {t}
                </span>
              ))}
            </motion.div>

            <motion.div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center" {...rise(0.2)}>
              <Link href={`/${locale}/contact`} className="btn btn-primary btn-md group gap-2 md:btn-lg">
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

          {/* Credentials panel */}
          <motion.div className="lg:col-span-5" {...rise(0.25)}>
            <div className="rounded-lg border border-white/12 bg-white/[0.03] p-1.5 backdrop-blur-sm">
              <div className="grid grid-cols-2 gap-px overflow-hidden rounded-md bg-white/[0.06]">
                {stats.map((s) => (
                  <div key={s.k} className="bg-secondary/60 p-5">
                    <div className="text-2xl font-bold text-primary md:text-3xl">{s.v}</div>
                    <div className="mt-1 text-xs text-white/75">{s.k}</div>
                  </div>
                ))}
              </div>
              <div className="px-5 pb-4 pt-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">
                  {isTh ? 'พันธมิตรเทคโนโลยี' : 'Technology partners'}
                </p>
                <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm">
                  <span className="font-semibold text-white/90">
                    Proxmox <span className="text-xs font-medium text-primary">Authorized Reseller</span>
                  </span>
                  <span className="text-white/25">·</span>
                  <span className="font-semibold text-white/90">Dell</span>
                  <span className="text-white/25">·</span>
                  <span className="font-semibold text-white/90">Google Cloud</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  )
}
