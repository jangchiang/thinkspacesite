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
  GraduationCap,
  type LucideIcon,
} from 'lucide-react'
import Image from 'next/image'
import { type HeroBackground } from '@/lib/hero-utils'

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
}

export function AboutHero({ title, description, background }: AboutHeroProps): React.JSX.Element {
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
    // Formal navy editorial hero — clean, no background media
    return (
      <section className="relative overflow-hidden bg-secondary text-white" ref={ref}>
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary to-[#171717]" />
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
        <div className="container-custom relative z-10 py-20 md:py-28 lg:py-32">
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
              className="text-lg md:text-xl text-white/70 leading-relaxed"
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
          {values.map((value) => {
            const IconComponent = iconMap[value.iconName] || Target
            return (
              <motion.div
                key={value.title}
                className="card-surface p-8 flex flex-col"
                variants={staggerItem}
              >
                <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center mb-5">
                  <IconComponent className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-base-content mb-3">{value.title}</h3>
                <ValueDescription text={value.description} />
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

            <div className="relative">
              {/* Horizontal-ish staggered timeline as a grid of cards */}
              <div className="grid gap-6 md:grid-cols-3">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={`${milestone.year}-${index}`}
                    className="card-surface p-6 relative"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  >
                    <span className="absolute top-0 left-6 -translate-y-1/2 inline-flex items-center rounded bg-primary px-3 py-1 text-xs font-bold tracking-wide text-primary-content">
                      {milestone.year}
                    </span>
                    <h4 className="font-bold text-base-content mt-4 mb-2">{milestone.event}</h4>
                    <p className="text-sm text-base-content/60 leading-relaxed">{milestone.detail}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}

// Team Section — leadership with credentials
interface TeamMember {
  name: string
  role: string
  photo?: {
    url: string
    formats?: {
      thumbnail?: { url: string }
      small?: { url: string }
    }
  }
}

interface TeamSectionProps {
  title: string
  description: string
  members: TeamMember[]
  strapiUrl?: string
}

// Real leadership fallback with credentials (used when Strapi has no team data)
const LEADERSHIP_FALLBACK: Array<{
  name: string
  role: string
  credentials: string[]
}> = [
  {
    name: 'นายธีรดนย์ สมศรี',
    role: 'Chief Technology Officer (CTO)',
    credentials: [
      'M.CompSci (Artificial Intelligence), Monash University',
      'B.IT, James Cook University Singapore',
    ],
  },
  {
    name: 'นางสาวสรารัตน์ ขวัญใจ',
    role: 'Chief Executive Officer (CEO)',
    credentials: [
      'PhD, Civil Engineering, Chiang Mai University',
      'M.Eng & B.Eng, Civil Engineering, Chiang Mai University',
    ],
  },
  {
    name: 'นายทีปัชลิต บินอารี',
    role: 'Chief Design Officer (CDO)',
    credentials: [
      'PhD, Mechanical Engineering, Chiang Mai University',
      'B.Eng, Mechanical Engineering, Chiang Mai University',
    ],
  },
]

export function TeamSection({ title, description, members, strapiUrl = '' }: TeamSectionProps): React.JSX.Element | null {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const hasStrapiMembers = members && members.length > 0

  // Build photo lookup so we can reuse Strapi photos when present
  const photoFor = (name: string): TeamMember['photo'] | undefined =>
    members?.find((m) => m.name === name)?.photo

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
            <span className="rule-accent" /> Leadership
          </span>
          <h2 className="display-heading text-3xl md:text-4xl lg:text-5xl mt-4 mb-4">
            {title || 'Our Executive Team'}
          </h2>
          {description && (
            <p className="text-base-content/70 leading-relaxed">{description}</p>
          )}
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-6 lg:gap-8"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {(hasStrapiMembers
            ? members.map((m) => ({ name: m.name, role: m.role, credentials: [] as string[] }))
            : LEADERSHIP_FALLBACK
          ).map((member) => {
            const photo = photoFor(member.name)
            const photoUrl =
              photo?.formats?.small?.url ||
              photo?.formats?.thumbnail?.url ||
              photo?.url
            return (
              <motion.div
                key={member.name}
                className="card-surface p-8 flex flex-col items-start"
                variants={staggerItem}
              >
                <div className="w-20 h-20 rounded-md bg-secondary/5 mb-5 overflow-hidden relative flex items-center justify-center">
                  {photoUrl ? (
                    <Image
                      src={`${strapiUrl}${photoUrl}`}
                      alt={member.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <Users className="w-8 h-8 text-primary/60" />
                  )}
                </div>
                <h3 className="text-lg font-bold text-base-content">{member.name}</h3>
                <p className="text-sm font-medium text-accent mt-1 mb-4">{member.role}</p>
                {member.credentials.length > 0 && (
                  <ul className="space-y-2 border-t border-base-300 pt-4 w-full">
                    {member.credentials.map((cred, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-base-content/70 leading-relaxed">
                        <GraduationCap className="w-4 h-4 text-primary/70 flex-shrink-0 mt-0.5" />
                        <span>{cred}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
