'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight, ArrowUpRight,
  Cpu, ShieldCheck, Server, Boxes, Sparkles,
  Newspaper, Package, Cloud, Database, Code, Cog, Rocket, Layers, BrainCircuit,
  type LucideIcon,
} from 'lucide-react'
import { type Locale } from '@/lib/i18n'
import { motion, useReducedMotion } from 'framer-motion'
import { LogoCarousel } from '@/components/ui/logo-carousel'
import { MatrixGrid } from '@/components/backgrounds/matrix-grid'
import { InteractiveAccordion, type AccordionPanel } from '@/components/ui/interactive-accordion'
import { type HeroCard } from '@/lib/strapi'

const AUTOPLAY_MS = 4000

// Maps the CMS `icon` enumeration to a lucide icon component.
const ICON_MAP: Record<string, LucideIcon> = {
  Cpu, ShieldCheck, Server, Boxes, Sparkles, Newspaper, Package, Cloud, Database, Code, Cog, Rocket, Layers, BrainCircuit,
}

// Default accent colours cycled through CMS cards that don't set their own.
const DEFAULT_ACCENTS = [
  'rgba(34,197,94,0.22)', 'rgba(34,211,238,0.22)', 'rgba(56,189,248,0.22)', 'rgba(129,140,248,0.22)', 'rgba(45,212,191,0.22)',
]

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
  clients?: Partner[]
  heroCards?: HeroCard[]
  strapiUrl?: string
}

// initial state animates transform only (no opacity) so text is visible instantly —
// avoids the blank-flash / LCP hit of fading in from opacity:0.
const rise = (delay = 0) => ({
  initial: { y: 16 },
  animate: { y: 0 },
  transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
})

export function HeroSection({ dict, locale, clients = [], heroCards = [], strapiUrl = '' }: HeroSectionProps): React.JSX.Element {
  const isTh = locale === 'th'
  const reduceMotion = useReducedMotion()

  // Accordion state lives here so the section background can follow the active card.
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  // Only clients that actually have a logo (avoids empty boxes in the marquee).
  const clientLogos = clients.filter((c) => c.logo)

  // Interactive image-accordion panels — the solution pillars (fallback used
  // only when the CMS has no Hero Cards yet).
  const fallbackPanels: AccordionPanel[] = [
    {
      id: 'ai',
      title: isTh ? 'AI และวิทยาการข้อมูล' : 'AI & Data Science',
      caption: isTh
        ? 'โมเดล MLOps และการวิเคราะห์ที่เปลี่ยนข้อมูลให้เป็นการตัดสินใจ'
        : 'Models, MLOps and analytics that turn data into decisions.',
      image: '/images/services/ai-data-science.jpg',
      icon: Cpu,
      href: `/${locale}/services`,
      accent: 'rgba(34,197,94,0.22)', // emerald (brand)
    },
    {
      id: 'security',
      title: isTh ? 'ความปลอดภัยไซเบอร์' : 'Cybersecurity',
      caption: isTh
        ? 'สถาปัตยกรรม Zero-trust, SOC และโครงสร้างพื้นฐานที่ยืดหยุ่น'
        : 'Zero-trust architecture, SOC and resilient infrastructure.',
      image: '/images/services/cybersecurity.jpg',
      icon: ShieldCheck,
      href: `/${locale}/services`,
      accent: 'rgba(34,211,238,0.22)', // cyan
    },
    {
      id: 'hpc',
      title: isTh ? 'HPC และระบบ IoT' : 'HPC & IoT Systems',
      caption: isTh
        ? 'การประมวลผลสมรรถนะสูงและระบบเชื่อมต่อในระดับองค์กร'
        : 'High-performance compute and connected systems at scale.',
      image: '/images/services/iot-systems.jpg',
      icon: Server,
      href: `/${locale}/services`,
      accent: 'rgba(56,189,248,0.22)', // sky
    },
    {
      id: 'engineering',
      title: isTh ? 'วิศวกรรมดิจิทัล' : 'Digital Engineering',
      caption: isTh
        ? 'การจำลอง ดิจิทัลทวิน และการผลิตแบบเติมเนื้อวัสดุ'
        : 'Simulation, digital twins and additive manufacturing.',
      image: '/images/services/3d-printing.jpg',
      icon: Boxes,
      href: `/${locale}/services`,
      accent: 'rgba(129,140,248,0.22)', // indigo
    },
    {
      id: 'logix',
      title: isTh ? 'แพลตฟอร์ม Logix' : 'Logix Platform',
      caption: isTh
        ? 'แพลตฟอร์มที่ปรับแต่งได้และ Logix สแตก AI-native แบบอธิปไตยของเรา'
        : 'Custom platforms and Logix — our sovereign AI-native stack.',
      image: '/images/services/software-solutions.jpg',
      icon: Sparkles,
      href: `/${locale}/products/logix`,
      accent: 'rgba(45,212,191,0.22)', // teal
    },
  ]

  // Build a relative CMS link into a locale-aware href (external http(s) links pass through).
  const toHref = (linkUrl?: string): string => {
    if (!linkUrl) return `/${locale}`
    if (/^https?:\/\//.test(linkUrl)) return linkUrl
    return `/${locale}${linkUrl.startsWith('/') ? '' : '/'}${linkUrl}`
  }

  // Prefer CMS-managed Hero Cards; fall back to the built-in pillars when empty.
  const panels: AccordionPanel[] = heroCards.length > 0
    ? heroCards.map((c, i) => {
        const imgPath = c.image?.formats?.medium?.url || c.image?.formats?.large?.url || c.image?.url
        return {
          id: String(c.id),
          title: c.title,
          caption: c.caption ?? '',
          image: imgPath ? `${strapiUrl}${imgPath}` : '/images/services/software-solutions.jpg',
          icon: ICON_MAP[c.icon ?? 'Sparkles'] ?? Sparkles,
          href: toHref(c.linkUrl),
          accent: c.accentColor || DEFAULT_ACCENTS[i % DEFAULT_ACCENTS.length],
        }
      })
    : fallbackPanels

  // Optional per-card section background media (image / gif / video), aligned to `panels`.
  const cardBackgrounds: ({ url: string; isVideo: boolean } | null)[] = heroCards.length > 0
    ? heroCards.map((c) => {
        const m = c.background
        const isVideo = (m?.mime ?? '').startsWith('video')
        const path = isVideo ? m?.url : (m?.formats?.large?.url || m?.formats?.medium?.url || m?.url)
        return path ? { url: `${strapiUrl}${path}`, isVideo } : null
      })
    : panels.map(() => null)

  const hasMediaBg = cardBackgrounds.some(Boolean)

  const stats = [
    { k: isTh ? 'องค์กรที่ไว้วางใจ' : 'Organizations served', v: '20+' },
    { k: isTh ? 'สาขาความเชี่ยวชาญ' : 'Solution pillars', v: '6' },
    { k: isTh ? 'ก่อตั้ง' : 'Founded', v: '2024' },
    { k: isTh ? 'ฐานที่ตั้ง' : 'Based in', v: isTh ? 'เชียงใหม่' : 'Chiang Mai' },
  ]

  // Autoplay: advance to the next card while idle. The timer is keyed on `active`,
  // so it restarts whenever the card changes (manually or automatically) — keeping
  // the countdown rail in sync. Paused on hover/focus and for reduced-motion users.
  useEffect(() => {
    if (paused || reduceMotion) return
    const id = setTimeout(() => setActive((a) => (a + 1) % panels.length), AUTOPLAY_MS)
    return () => clearTimeout(id)
  }, [active, paused, reduceMotion, panels.length])

  return (
    <section className="relative overflow-hidden bg-secondary text-white">
      {/* Background that follows the active card:
          1) base + matrix grid (grid glow follows the active accent)
          2) a colour glow that crossfades to the active card's accent (fallback when
             a card has no media)
          3) the active card's OWN background media (image / gif / video) if set
          4) a dark gradient overlay so the left-hand text stays readable */}
      <div className="absolute inset-0 bg-secondary" />
      <MatrixGrid glow={panels[active]?.accent ?? 'rgba(34,197,94,0.18)'} />
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {panels.map((p, i) => (
          <div
            key={p.id}
            className="absolute inset-0 transition-opacity duration-1000 ease-out"
            style={{
              opacity: i === active ? 1 : 0,
              background: `radial-gradient(95% 85% at 60% 22%, ${p.accent ?? 'rgba(34,197,94,0.2)'}, transparent 70%)`,
            }}
          />
        ))}
      </div>
      {hasMediaBg && (
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          {cardBackgrounds.map((bg, i) =>
            !bg ? null : bg.isVideo ? (
              i === active ? (
                <video
                  key={i}
                  src={bg.url}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : null
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={i}
                src={bg.url}
                alt=""
                aria-hidden
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-out ${
                  i === active ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ),
          )}
        </div>
      )}
      {hasMediaBg && (
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/92 via-secondary/60 to-secondary/35" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-transparent" />

      <div className="container-custom relative z-10">
        <div className="grid items-center gap-10 py-16 md:py-24 lg:grid-cols-12 lg:gap-12 lg:py-28">
          {/* Copy */}
          <div className="lg:col-span-5">
            <motion.div className="eyebrow !text-primary" {...rise(0)}>
              <span className="rule-accent" />
              {dict.hero.badge}
            </motion.div>

            <motion.h1
              className="mt-5 text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl md:text-5xl"
              {...rise(0.05)}
            >
              {dict.hero.title}
              <br />
              <span className="bg-gradient-to-r from-primary to-[#4ade80] bg-clip-text text-transparent">
                {dict.hero.titleHighlight}
              </span>
            </motion.h1>

            <motion.p className="mt-6 max-w-xl text-base leading-relaxed text-white/85 md:text-lg" {...rise(0.1)}>
              {dict.hero.subtitle}
            </motion.p>

            <motion.div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center" {...rise(0.15)}>
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

            {/* Slim credentials row */}
            <motion.div className="mt-9 border-t border-white/10 pt-6" {...rise(0.2)}>
              <div className="flex flex-wrap gap-x-7 gap-y-3">
                {stats.map((s) => (
                  <div key={s.k}>
                    <div className="text-xl font-bold text-primary md:text-2xl">{s.v}</div>
                    <div className="mt-0.5 text-[11px] leading-tight text-white/65">{s.k}</div>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm">
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">
                  {isTh ? 'พันธมิตร' : 'Partners'}
                </span>
                <span className="font-semibold text-white/90">
                  Proxmox <span className="text-xs font-medium text-primary">{isTh ? 'ตัวแทนจำหน่าย' : 'Authorized Reseller'}</span>
                </span>
                <span className="text-white/25">·</span>
                <span className="font-semibold text-white/90">Dell</span>
                <span className="text-white/25">·</span>
                <span className="font-semibold text-white/90">Google Cloud</span>
              </div>
            </motion.div>
          </div>

          {/* Interactive image accordion — pauses autoplay while the user interacts */}
          <motion.div
            className="lg:col-span-7"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
            {...rise(0.2)}
          >
            <InteractiveAccordion
              panels={panels}
              active={active}
              onSelect={setActive}
              ctaLabel={isTh ? 'ดูเพิ่มเติม' : 'Explore'}
              autoPlayMs={AUTOPLAY_MS}
              paused={paused || !!reduceMotion}
            />
          </motion.div>
        </div>

        {/* Trusted-by strip — clients (only those with a logo) */}
        {clientLogos.length > 0 && (
          <motion.div
            className="border-t border-white/10 py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            <LogoCarousel partners={clientLogos} title={dict.hero.trustedBy} strapiUrl={strapiUrl} surface="dark" />
          </motion.div>
        )}
      </div>
    </section>
  )
}
