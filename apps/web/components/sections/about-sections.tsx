'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Users, Target, Award, Globe, type LucideIcon } from 'lucide-react'
import Image from 'next/image'
import { type HeroBackground } from '@/lib/hero-utils'

// Icon mapping for serialization
const iconMap: Record<string, LucideIcon> = {
  Target,
  Award,
  Users,
  Globe,
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

// Animation variants
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
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

export function AboutHero({ title, description, background }: AboutHeroProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const hasBackground = background && background.type !== 'none'
  const overlayOpacity = background?.overlayOpacity ?? 60
  const overlayColor = background?.overlayColor ?? '#000000'
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
      : { r: 0, g: 0, b: 0 }
  }

  const rgb = hexToRgb(overlayColor)
  const overlayStyle = {
    backgroundColor: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${overlayOpacity / 100})`,
  }

  if (!hasBackground) {
    return (
      <section className="section-padding bg-gradient-to-br from-base-100 to-primary/5" ref={ref}>
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {title}
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-base-content/70"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
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
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {title}
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl opacity-80"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {description}
          </motion.p>
        </div>
      </div>
    </section>
  )
}

// Values Section
interface ValuesSectionProps {
  values: Value[]
}

export function ValuesSection({ values }: ValuesSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="section-padding" ref={ref}>
      <div className="container-custom">
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {values.map((value) => {
            const IconComponent = iconMap[value.iconName] || Target
            return (
              <motion.div
                key={value.title}
                className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow duration-300"
                variants={staggerItem}
              >
                <div className="card-body items-center text-center">
                  <motion.div
                    className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <IconComponent className="w-8 h-8 text-primary" />
                  </motion.div>
                  <h3 className="card-title">{value.title}</h3>
                  <p className="text-base-content/70">{value.description}</p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

// Story Section with Timeline
interface StorySectionProps {
  locale: string
  storyTitle: string
  storyParagraph1: string
  storyParagraph2: string
  milestonesTitle: string
  milestones: Milestone[]
}

export function StorySection({
  locale: _locale,
  storyTitle,
  storyParagraph1,
  storyParagraph2,
  milestonesTitle,
  milestones,
}: StorySectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="section-padding bg-base-200" ref={ref}>
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{storyTitle}</h2>
            <div className="space-y-4 text-base-content/70">
              <p>{storyParagraph1}</p>
              <p>{storyParagraph2}</p>
            </div>
          </motion.div>

          <motion.div
            className="bg-base-100 rounded-2xl p-8"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="text-xl font-semibold mb-8">{milestonesTitle}</h3>
            <div className="relative">
              {/* Timeline line */}
              <motion.div
                className="absolute left-[23px] top-3 bottom-3 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-primary/20"
                initial={{ scaleY: 0 }}
                animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                style={{ transformOrigin: 'top' }}
              />

              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={milestone.year}
                    className="relative flex items-start gap-6 group"
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  >
                    {/* Timeline dot */}
                    <div className="relative z-10 flex-shrink-0">
                      <motion.div
                        className="w-12 h-12 rounded-full bg-primary text-primary-content flex items-center justify-center font-bold text-sm shadow-lg shadow-primary/30"
                        whileHover={{ scale: 1.15 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        {milestone.year}
                      </motion.div>
                    </div>
                    {/* Content */}
                    <div className="flex-1 pb-2">
                      <h4 className="font-semibold text-base-content mb-1">{milestone.event}</h4>
                      <p className="text-sm text-base-content/60">{milestone.detail}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Team Section
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

export function TeamSection({ title, description, members, strapiUrl = '' }: TeamSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="section-padding" ref={ref}>
      <div className="container-custom">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <p className="text-base-content/70 max-w-2xl mx-auto">{description}</p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {members.map((member) => {
            const photoUrl = member.photo?.formats?.small?.url ||
                             member.photo?.formats?.thumbnail?.url ||
                             member.photo?.url
            return (
              <motion.div
                key={member.name}
                className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow duration-300"
                variants={staggerItem}
                whileHover={{ y: -5 }}
              >
                <div className="card-body items-center text-center">
                  <motion.div
                    className="w-24 h-24 rounded-full bg-base-300 mb-4 overflow-hidden relative"
                    whileHover={{ scale: 1.05 }}
                  >
                    {photoUrl && (
                      <Image
                        src={`${strapiUrl}${photoUrl}`}
                        alt={member.name}
                        fill
                        className="object-contain"
                        unoptimized
                      />
                    )}
                  </motion.div>
                  <h3 className="card-title">{member.name}</h3>
                  <p className="text-base-content/70">{member.role}</p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
