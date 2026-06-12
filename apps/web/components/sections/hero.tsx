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
import { InteractiveAccordion, type AccordionPanel } from '@/components/ui/interactive-accordion'
import { type HeroCard } from '@/lib/strapi'

const AUTOPLAY_MS = 7000

// Maps the CMS `icon` enumeration to a lucide icon component.
const ICON_MAP: Record<string, LucideIcon> = {
  Cpu, ShieldCheck, Server, Boxes, Sparkles, Newspaper, Package, Cloud, Database, Code, Cog, Rocket, Layers, BrainCircuit,
}

// Default accent colours cycled through CMS cards that don't set their own.
const DEFAULT_ACCENTS = [
  'rgba(34,197,94,0.22)', 'rgba(34,211,238,0.22)', 'rgba(56,189,248,0.22)', 'rgba(129,140,248,0.22)', 'rgba(45,212,191,0.22)',
]

// Decorative dots for the light hero background.
const DOTS = [
  'left-[20%] top-[15%] h-4 w-4 bg-primary/40',
  'right-[30%] top-[25%] h-3 w-3 bg-primary/50',
  'left-[15%] bottom-[30%] h-2 w-2 bg-primary/60',
  'right-[15%] top-[50%] h-5 w-5 bg-primary/30',
  'right-[40%] bottom-[20%] h-3 w-3 bg-primary/45',
]

const NOISE =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")"

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
    <section className="relative overflow-hidden">
      {/* Light decorative background (static, lightweight): gradient wash, grid,
          green blobs, dots, glowing rings, noise + top/bottom fades. */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-br from-base-100 via-base-100 to-primary/10" />
        <div className="absolute inset-0 hidden text-primary/30 opacity-[0.4] sm:block dark:opacity-[0.15]">
          <svg className="absolute inset-0 h-full w-full">
            <defs>
              <pattern id="hero-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-grid)" />
          </svg>
        </div>
        <div className="absolute -left-[10%] -top-[20%] h-[300px] w-[300px] rounded-full sm:h-[500px] sm:w-[500px] lg:h-[800px] lg:w-[800px]" style={{ background: 'radial-gradient(circle, rgba(34,197,94,0.22) 0%, rgba(34,197,94,0.08) 40%, transparent 70%)' }} />
        <div className="absolute -bottom-[30%] -right-[10%] h-[250px] w-[250px] rounded-full sm:h-[400px] sm:w-[400px] lg:h-[700px] lg:w-[700px]" style={{ background: 'radial-gradient(circle, rgba(21,128,61,0.18) 0%, rgba(34,197,94,0.08) 40%, transparent 70%)' }} />
        <div className="absolute right-[10%] top-[30%] hidden h-[300px] w-[300px] rounded-full sm:block lg:h-[500px] lg:w-[500px]" style={{ background: 'radial-gradient(circle, rgba(34,197,94,0.14) 0%, transparent 60%)' }} />
        <div className="hidden sm:block">
          {DOTS.map((d) => (
            <span key={d} className={`absolute rounded-full ${d}`} />
          ))}
        </div>
        <div className="absolute left-[60%] top-[20%] hidden h-[100px] w-[100px] rounded-full border-2 border-primary/20 sm:block sm:h-[200px] sm:w-[200px]" style={{ boxShadow: '0 0 60px 20px rgba(34,197,94,0.10)' }} />
        <div className="absolute bottom-[25%] left-[10%] hidden h-[80px] w-[80px] rounded-full border border-primary/15 sm:block sm:h-[150px] sm:w-[150px]" style={{ boxShadow: '0 0 40px 10px rgba(34,197,94,0.08)' }} />
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]" style={{ backgroundImage: NOISE }} />
        <div className="absolute left-0 right-0 top-0 h-40 bg-gradient-to-b from-base-100 via-base-100/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-base-200 via-base-100/80 to-transparent" />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid items-center gap-10 py-16 md:py-24 lg:grid-cols-12 lg:gap-12 lg:py-28">
          {/* Copy */}
          <div className="lg:col-span-5">
            <motion.div className="eyebrow" {...rise(0)}>
              <span className="rule-accent" />
              {dict.hero.badge}
            </motion.div>

            <motion.h1
              className="mt-5 text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl md:text-5xl"
              {...rise(0.05)}
            >
              {dict.hero.title}
              <br />
              <span className="bg-gradient-to-r from-[#16a34a] to-[#22c55e] bg-clip-text text-transparent">
                {dict.hero.titleHighlight}
              </span>
            </motion.h1>

            <motion.p className="mt-6 max-w-xl text-base leading-relaxed text-base-content/70 md:text-lg" {...rise(0.1)}>
              {dict.hero.subtitle}
            </motion.p>

            <motion.div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center" {...rise(0.15)}>
              <Link href={`/${locale}/contact`} className="btn btn-primary btn-md group gap-2 md:btn-lg">
                {dict.hero.cta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href={`/${locale}/products/logix`}
                className="btn btn-outline btn-md gap-2 border-base-content/20 hover:border-primary hover:bg-primary/5 md:btn-lg"
              >
                {isTh ? 'รู้จัก Logix' : 'Discover Logix'}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </motion.div>

            {/* Slim credentials row */}
            <motion.div className="mt-9 border-t border-base-content/10 pt-6" {...rise(0.2)}>
              <div className="flex flex-wrap gap-x-7 gap-y-3">
                {stats.map((s) => (
                  <div key={s.k}>
                    <div className="text-xl font-bold text-accent md:text-2xl">{s.v}</div>
                    <div className="mt-0.5 text-[11px] leading-tight text-base-content/60">{s.k}</div>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm">
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-base-content/45">
                  {isTh ? 'พันธมิตร' : 'Partners'}
                </span>
                <span className="font-semibold text-base-content">
                  Proxmox <span className="text-xs font-medium text-accent">{isTh ? 'ตัวแทนจำหน่าย' : 'Authorized Reseller'}</span>
                </span>
                <span className="text-base-content/25">·</span>
                <span className="font-semibold text-base-content">Dell</span>
                <span className="text-base-content/25">·</span>
                <span className="font-semibold text-base-content">Google Cloud</span>
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
            className="border-t border-base-content/10 py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            <LogoCarousel partners={clientLogos} title={dict.hero.trustedBy} strapiUrl={strapiUrl} surface="light" />
          </motion.div>
        )}
      </div>
    </section>
  )
}
