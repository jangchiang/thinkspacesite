'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import {
  Users,
  Target,
  Award,
  Globe,
  ChevronDown,
  ChevronUp,
  Eye,
  Compass,
  Building2,
  CalendarDays,
  Wallet,
  Hash,
  MapPin,
  ArrowUpRight,
  type LucideIcon,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { type HeroBackground } from '@/lib/hero-utils'

// Decorative SVG grid + noise reused across the dark editorial sections.
const HERO_NOISE =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"

// Icon mapping for serialization
const iconMap: Record<string, LucideIcon> = {
  Target,
  Award,
  Users,
  Globe,
  Eye,
  Compass,
}

interface Value {
  iconName: string
  title: string
  description: string
}

interface Milestone {
  year: string
  event: string
  detail: string
}

// Animation variants — calm, formal fade/translate
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
}

// About Hero Section
interface AboutHeroProps {
  title: string
  description: string
  background?: HeroBackground | null
  /** small credential chips shown under the description (e.g. Founded 2024 · Chiang Mai) */
  highlights?: string[]
}

export function AboutHero({ title, description, background, highlights = [] }: AboutHeroProps): React.JSX.Element {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const hasBackground = background && background.type !== 'none'
  const overlayOpacity = background?.overlayOpacity ?? 70
  const overlayColor = background?.overlayColor ?? '#171717'
  const textColorClass = background?.textColor === 'dark' ? 'text-base-content' : 'text-white'

  // Convert hex to RGB for rgba
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 23, g: 23, b: 23 }
  }

  const rgb = hexToRgb(overlayColor)
  const overlayStyle = {
    backgroundColor: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${overlayOpacity / 100})`,
  }

  if (!hasBackground) {
    // Formal navy editorial hero — layered decorative background, no media
    return (
      <section className="relative overflow-hidden bg-secondary text-white" ref={ref}>
        {/* decorative layers */}
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary to-[#0f1b12]" />
          {/* faint grid */}
          <svg className="absolute inset-0 h-full w-full text-white/[0.06]">
            <defs>
              <pattern id="about-grid" width="64" height="64" patternUnits="userSpaceOnUse">
                <path d="M 64 0 L 0 0 0 64" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#about-grid)" />
          </svg>
          {/* green glows */}
          <div className="absolute -top-32 -right-24 h-[420px] w-[420px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(34,197,94,0.30) 0%, rgba(34,197,94,0.08) 45%, transparent 70%)' }} />
          <div className="absolute -bottom-40 -left-20 h-[360px] w-[360px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(21,128,61,0.22) 0%, transparent 65%)' }} />
          {/* noise + bottom fade into the page */}
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: HERO_NOISE }} />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-base-100 to-transparent" />
        </div>

        <div className="container-custom relative z-10 py-20 md:py-28 lg:py-32">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mb-5"
            >
              <span className="eyebrow text-primary">
                <span className="rule-accent" /> About ThinkSpace
              </span>
            </motion.div>
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {title}
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-white/70 leading-relaxed"
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              {description}
            </motion.p>

            {highlights.length > 0 && (
              <motion.div
                className="mt-8 flex flex-wrap gap-2.5"
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                {highlights.map((chip) => (
                  <span
                    key={chip}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-sm font-medium text-white/85 backdrop-blur-sm"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {chip}
                  </span>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative min-h-[50vh] flex items-center overflow-hidden" ref={ref}>
      {/* Background Media */}
      {background.type === 'image' && background.imageUrl && (
        <div className="absolute inset-0">
          <Image
            src={background.imageUrl}
            alt=""
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
      )}

      {background.type === 'video' && background.videoUrl && (
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={background.videoUrl} type="video/mp4" />
          </video>
        </div>
      )}

      {/* Overlay */}
      <div className="absolute inset-0" style={overlayStyle} />

      {/* Gradient fade at bottom */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-base-100 to-transparent" />

      {/* Content */}
      <div className={`container-custom relative z-10 py-20 ${textColorClass}`}>
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mb-5"
          >
            <span className="eyebrow text-accent">
              <span className="rule-accent" /> About ThinkSpace
            </span>
          </motion.div>
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {title}
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl opacity-80 leading-relaxed"
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {description}
          </motion.p>
        </div>
      </div>
    </section>
  )
}

// Helper to render value descriptions - detects numbered lists and renders properly
function ValueDescription({ text }: { text: string }): React.JSX.Element {
  const [expanded, setExpanded] = useState(false)

  // Check if text contains numbered patterns like "1.", "2." etc. (handles "1.\n" CMS format)
  const numberedPattern = /(?:^|\n)\s*\d+\.\s*/
  if (numberedPattern.test(text)) {
    const items = text.split(/(?:^|\n)\s*\d+\.\s*/).filter(Boolean).map(s => s.trim())
    const collapsedCount = 2
    const showToggle = items.length > collapsedCount
    const displayItems = expanded ? items : items.slice(0, collapsedCount)

    return (
      <div className="text-left w-full">
        <ul className="text-sm text-base-content/70 leading-relaxed space-y-2">
          {displayItems.map((item, i) => {
            // Bold the title portion before the colon if present
            const colonIdx = item.indexOf(':')
            const hasTitle = colonIdx > 0 && colonIdx < 50
            return (
              <li key={i} className="flex items-start gap-2">
                <span className="text-accent font-semibold mt-0.5 flex-shrink-0">{i + 1}.</span>
                <span>
                  {hasTitle ? (
                    <>
                      <span className="font-medium text-base-content">{item.substring(0, colonIdx)}</span>
                      <span>{item.substring(colonIdx)}</span>
                    </>
                  ) : item}
                </span>
              </li>
            )
          })}
        </ul>
        {showToggle && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-accent text-xs font-medium mt-3 hover:underline"
          >
            {expanded ? (
              <><ChevronUp className="w-3 h-3" /> แสดงน้อยลง</>
            ) : (
              <><ChevronDown className="w-3 h-3" /> +{items.length - collapsedCount} รายการ</>
            )}
          </button>
        )}
      </div>
    )
  }

  // Long paragraph — collapsible
  if (text.length > 200) {
    return (
      <div className="text-left w-full">
        <p className={`text-sm text-base-content/70 leading-relaxed ${!expanded ? 'line-clamp-4' : ''}`}>
          {text}
        </p>
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 text-accent text-xs font-medium mt-2 hover:underline"
        >
          {expanded ? (
            <><ChevronUp className="w-3 h-3" /> แสดงน้อยลง</>
          ) : (
            <><ChevronDown className="w-3 h-3" /> อ่านเพิ่มเติม</>
          )}
        </button>
      </div>
    )
  }

  // Short text — render as-is
  return <p className="text-sm text-base-content/70 leading-relaxed">{text}</p>
}

// Values Section — Vision & Mission as formal 1px-border cards
interface ValuesSectionProps {
  values: Value[]
}

export function ValuesSection({ values }: ValuesSectionProps): React.JSX.Element {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="section-padding bg-base-100" ref={ref}>
      <div className="container-custom">
        <motion.div
          className="max-w-2xl mb-12"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="eyebrow mb-4">
            <span className="rule-accent" /> Vision &amp; Mission
          </span>
          <h2 className="display-heading text-3xl md:text-4xl lg:text-5xl mt-4">
            What drives us
          </h2>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-6 lg:gap-8"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {values.map((value, i) => {
            const IconComponent = iconMap[value.iconName] || Target
            return (
              <motion.div
                key={value.title}
                className="group relative overflow-hidden rounded-2xl border border-base-300 bg-base-100 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_20px_50px_-20px_rgba(34,197,94,0.35)]"
                variants={staggerItem}
              >
                {/* corner glow on hover */}
                <div
                  className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: 'radial-gradient(circle, rgba(34,197,94,0.18) 0%, transparent 70%)' }}
                  aria-hidden
                />
                <div className="relative flex items-start justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 ring-1 ring-primary/15">
                    <IconComponent className="h-7 w-7 text-primary" />
                  </div>
                  <span className="text-4xl font-bold leading-none text-base-content/[0.07] tabular-nums">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="relative mt-6 mb-3 text-xl font-bold text-base-content">{value.title}</h3>
                <div className="relative">
                  <ValueDescription text={value.description} />
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

// Company registration facts strip
const COMPANY_FACTS_TH = [
  { iconName: 'Building2', label: 'ชื่อบริษัท', value: 'บริษัท ธิงค์สเปซ เทคโนโลยี จำกัด' },
  { iconName: 'CalendarDays', label: 'จดทะเบียน', value: '22 พฤศจิกายน 2567' },
  { iconName: 'Wallet', label: 'ทุนจดทะเบียน', value: '1,000,000 บาท' },
  { iconName: 'Hash', label: 'เลขทะเบียน', value: '0505567026400' },
  { iconName: 'MapPin', label: 'สำนักงาน', value: 'จังหวัดเชียงใหม่' },
] as const

const COMPANY_FACTS_EN = [
  { iconName: 'Building2', label: 'Company', value: 'THINKSPACE TECHNOLOGIES CO., LTD.' },
  { iconName: 'CalendarDays', label: 'Registered', value: '22 November 2024' },
  { iconName: 'Wallet', label: 'Capital', value: 'THB 1,000,000' },
  { iconName: 'Hash', label: 'Registration No.', value: '0505567026400' },
  { iconName: 'MapPin', label: 'Office', value: 'Chiang Mai, Thailand' },
] as const

const factIconMap: Record<string, LucideIcon> = {
  Building2,
  CalendarDays,
  Wallet,
  Hash,
  MapPin,
}

// Story Section with company facts + milestone timeline
interface StorySectionProps {
  locale: string
  storyTitle: string
  storyParagraph1: string
  storyParagraph2: string
  milestonesTitle: string
  milestones: Milestone[]
}

export function StorySection({
  locale,
  storyTitle,
  storyParagraph1,
  storyParagraph2,
  milestonesTitle,
  milestones,
}: StorySectionProps): React.JSX.Element {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const isTh = locale === 'th'

  const facts = isTh ? COMPANY_FACTS_TH : COMPANY_FACTS_EN
  const factsEyebrow = isTh ? 'ข้อมูลบริษัท' : 'Company Profile'
  const timelineLabel = milestonesTitle || (isTh ? 'เส้นทางการเติบโต' : 'Our Journey')

  return (
    <section className="section-padding bg-base-200" ref={ref}>
      <div className="container-custom">
        {/* Story intro */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="eyebrow mb-4">
              <span className="rule-accent" /> {isTh ? 'เรื่องราวของเรา' : 'Our Story'}
            </span>
            <h2 className="display-heading text-3xl md:text-4xl lg:text-5xl mt-4 mb-6">
              {storyTitle}
            </h2>
            <div className="space-y-4 text-base-content/70 leading-relaxed">
              {storyParagraph1 && <p className="whitespace-pre-line">{storyParagraph1}</p>}
              {storyParagraph2 && <p className="whitespace-pre-line">{storyParagraph2}</p>}
            </div>
          </motion.div>

          {/* Company facts card */}
          <motion.div
            className="card-surface p-8"
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="eyebrow mb-6">
              <span className="rule-accent" /> {factsEyebrow}
            </span>
            <dl className="mt-6 divide-y divide-base-300">
              {facts.map((fact) => {
                const FactIcon = factIconMap[fact.iconName] || Building2
                return (
                  <div key={fact.label} className="flex items-start gap-4 py-4 first:pt-0 last:pb-0">
                    <div className="w-9 h-9 rounded-md bg-secondary/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <FactIcon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <dt className="text-xs uppercase tracking-wider text-base-content/50 mb-0.5">
                        {fact.label}
                      </dt>
                      <dd className="font-semibold text-base-content">{fact.value}</dd>
                    </div>
                  </div>
                )
              })}
            </dl>
          </motion.div>
        </div>

        {/* Milestone timeline */}
        {milestones.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="max-w-2xl mb-12">
              <span className="eyebrow mb-4">
                <span className="rule-accent" /> {isTh ? 'ก้าวสำคัญ' : 'Milestones'}
              </span>
              <h3 className="display-heading text-2xl md:text-3xl lg:text-4xl mt-4">
                {timelineLabel}
              </h3>
            </div>

            {/* Connected timeline — horizontal rail on desktop, vertical on mobile */}
            <div className="relative grid gap-8 md:grid-cols-3 md:gap-6">
              {/* the rail */}
              <div
                className="absolute left-[9px] top-2 bottom-2 w-px bg-gradient-to-b from-primary/60 via-base-300 to-transparent md:left-0 md:right-0 md:top-[9px] md:h-px md:w-auto md:bottom-auto md:bg-gradient-to-r"
                aria-hidden
              />
              {milestones.map((milestone, index) => (
                <motion.div
                  key={`${milestone.year}-${index}`}
                  className="relative pl-8 md:pl-0 md:pt-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.12 }}
                >
                  {/* node dot */}
                  <span className="absolute left-0 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary/15 ring-4 ring-base-200 md:top-0" aria-hidden>
                    <span className="h-2 w-2 rounded-full bg-primary" />
                  </span>
                  <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-0.5 text-xs font-bold tracking-wide text-accent">
                    {milestone.year}
                  </span>
                  <h4 className="mt-3 mb-2 font-bold text-base-content">{milestone.event}</h4>
                  <p className="text-sm leading-relaxed text-base-content/60">{milestone.detail}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}

// Partners Section — partner organizations / logos (replaces the executive team).
// Fed by the non-localized Partner collection, so EN and TH render identically.
interface PartnerItem {
  id?: number
  name: string
  website?: string
  logo?: {
    url: string
    formats?: {
      thumbnail?: { url: string }
      small?: { url: string }
      medium?: { url: string }
    }
  }
}

interface PartnersSectionProps {
  eyebrow: string
  title: string
  description: string
  partners: PartnerItem[]
  /** text-chip fallback names used when no partner has a logo in the CMS yet */
  fallbackNames: string[]
  strapiUrl?: string
}

export function PartnersSection({
  eyebrow,
  title,
  description,
  partners,
  fallbackNames,
  strapiUrl = '',
}: PartnersSectionProps): React.JSX.Element {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const withLogo = partners.filter((p) => p.logo)
  const hasLogos = withLogo.length > 0

  return (
    <section className="section-padding bg-base-100" ref={ref}>
      <div className="container-custom">
        <motion.div
          className="max-w-2xl mb-12"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="eyebrow mb-4">
            <span className="rule-accent" /> {eyebrow}
          </span>
          <h2 className="display-heading text-3xl md:text-4xl lg:text-5xl mt-4 mb-4">
            {title}
          </h2>
          {description && (
            <p className="text-base-content/70 leading-relaxed">{description}</p>
          )}
        </motion.div>

        {hasLogos ? (
          <motion.div
            className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4"
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {withLogo.map((p) => {
              const url =
                p.logo?.formats?.small?.url ||
                p.logo?.formats?.medium?.url ||
                p.logo?.url
              const card = (
                <div className="group relative flex h-28 items-center justify-center overflow-hidden rounded-xl border border-base-300 bg-base-100 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_18px_40px_-22px_rgba(34,197,94,0.4)]">
                  <div className="relative h-12 w-full">
                    <Image
                      src={`${strapiUrl}${url}`}
                      alt={p.name}
                      fill
                      className="object-contain opacity-70 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                      unoptimized
                    />
                  </div>
                  {p.website && (
                    <ArrowUpRight className="absolute right-3 top-3 h-4 w-4 text-base-content/0 transition-colors duration-300 group-hover:text-primary" />
                  )}
                </div>
              )
              return (
                <motion.div key={p.name} variants={staggerItem}>
                  {p.website ? (
                    <Link href={p.website} target="_blank" rel="noopener noreferrer" aria-label={p.name}>
                      {card}
                    </Link>
                  ) : (
                    card
                  )}
                </motion.div>
              )
            })}
          </motion.div>
        ) : (
          <motion.div
            className="flex flex-wrap gap-3"
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {fallbackNames.map((name) => (
              <motion.span
                key={name}
                variants={staggerItem}
                className="inline-flex items-center gap-2 rounded-full border border-base-300 bg-base-100 px-5 py-2.5 font-semibold text-base-content transition-colors hover:border-primary/40"
              >
                <Building2 className="h-4 w-4 text-primary" />
                {name}
              </motion.span>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}
