'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Cloud,
  Shield,
  Database,
  Code,
  BarChart,
  Server,
  FlaskConical,
  Cpu,
  Check,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react'
import { type HeroBackground } from '@/lib/hero-utils'

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  Cloud,
  Shield,
  Database,
  Code,
  BarChart,
  Server,
  FlaskConical,
  Cpu,
}

// Animation variants — calm, formal fade/translate-on-scroll
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
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
}

// Service Hero Section
interface ServiceHeroProps {
  iconName: string
  color: string
  title: string
  description: string
  background?: HeroBackground | null
}

// Convert hex to RGB for rgba
function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 }
}

export function ServiceHero({ iconName, title, description, background }: ServiceHeroProps): React.JSX.Element {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const Icon = iconMap[iconName] || Code

  const hasBackground = background && background.type !== 'none'
  const overlayOpacity = background?.overlayOpacity ?? 70
  const overlayColor = background?.overlayColor ?? '#0B2447'
  const textColorClass = background?.textColor === 'dark' ? 'text-base-content' : 'text-white'

  const rgb = hexToRgb(overlayColor)
  const overlayStyle = {
    backgroundColor: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${overlayOpacity / 100})`,
  }

  if (!hasBackground) {
    return (
      <section className="bg-secondary text-white overflow-hidden" ref={ref}>
        <div className="container-custom py-20 md:py-28">
          <div className="max-w-3xl">
            <motion.div
              className="inline-flex items-center justify-center w-14 h-14 border border-white/20 bg-white/5 text-primary mb-8"
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <Icon className="w-7 h-7" />
            </motion.div>
            <motion.h1
              className="display-heading text-4xl md:text-5xl lg:text-6xl text-white mb-6"
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              {title}
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-white/70 leading-relaxed max-w-2xl"
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              {description}
            </motion.p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative min-h-[52vh] flex items-center overflow-hidden bg-secondary" ref={ref}>
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

      {/* Content */}
      <div className={`container-custom relative z-10 py-20 md:py-28 ${textColorClass}`}>
        <div className="max-w-3xl">
          <motion.div
            className="inline-flex items-center justify-center w-14 h-14 border border-white/20 bg-white/5 text-primary mb-8"
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <Icon className="w-7 h-7" />
          </motion.div>
          <motion.h1
            className="display-heading text-4xl md:text-5xl lg:text-6xl text-white mb-6"
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {title}
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl"
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {description}
          </motion.p>
        </div>
      </div>
    </section>
  )
}

// Features Section
interface FeaturesSectionProps {
  title: string
  features: string[]
  imagePlaceholder: string
  imageUrl?: string
}

export function FeaturesSection({ title, features, imagePlaceholder, imageUrl }: FeaturesSectionProps): React.JSX.Element {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="section-padding" ref={ref}>
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="eyebrow mb-3">{title}</p>
            <div className="rule-accent mb-8" />
            <motion.ul
              className="space-y-5"
              variants={staggerContainer}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
            >
              {features.map((feature, index) => (
                <motion.li
                  key={index}
                  className="flex items-start gap-4"
                  variants={staggerItem}
                >
                  <span className="w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5 border border-primary/30 bg-primary/5">
                    <Check className="w-3.5 h-3.5 text-primary" />
                  </span>
                  <span className="text-base md:text-lg text-base-content leading-snug">{feature}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
          <motion.div
            className="card-surface aspect-[4/3] overflow-hidden bg-base-200 flex items-center justify-center"
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={title}
                className="w-full h-full object-cover"
              />
            ) : (
              <p className="text-base-content/40">{imagePlaceholder}</p>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Benefits Section
interface Benefit {
  title: string
  description: string
}

interface BenefitsSectionProps {
  title: string
  benefits: Benefit[]
}

export function BenefitsSection({ title, benefits }: BenefitsSectionProps): React.JSX.Element {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="section-padding bg-base-200" ref={ref}>
      <div className="container-custom">
        <motion.div
          className="max-w-2xl mb-12"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="display-heading text-3xl md:text-4xl mb-4">{title}</h2>
          <div className="rule-accent" />
        </motion.div>
        <motion.div
          className="grid md:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {benefits.map((item, index) => (
            <motion.div
              key={index}
              className="card-surface bg-base-100 p-8"
              variants={staggerItem}
            >
              <span className="block text-sm font-semibold text-primary mb-4 tracking-widest">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="text-lg font-semibold text-base-content mb-2">{item.title}</h3>
              <p className="text-base-content/70 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// Use Cases Section
interface UseCase {
  title: string
  description: string
}

interface UseCasesSectionProps {
  title: string
  subtitle: string
  useCases: UseCase[]
}

export function UseCasesSection({ title, subtitle, useCases }: UseCasesSectionProps): React.JSX.Element {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="section-padding bg-base-200" ref={ref}>
      <div className="container-custom">
        <motion.div
          className="max-w-2xl mb-12"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6 }}
        >
          <p className="eyebrow mb-3">{title}</p>
          <h2 className="display-heading text-3xl md:text-4xl mb-4">{subtitle}</h2>
          <div className="rule-accent" />
        </motion.div>
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              className="card-surface bg-base-100 p-7 hover-lift"
              variants={staggerItem}
            >
              <span className="block text-sm font-semibold text-primary mb-4 tracking-widest">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="text-lg font-semibold text-base-content mb-2">{useCase.title}</h3>
              <p className="text-base-content/70 text-sm leading-relaxed">{useCase.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// Technologies Section
interface TechnologiesSectionProps {
  title: string
  technologies: string[]
}

export function TechnologiesSection({ title, technologies }: TechnologiesSectionProps): React.JSX.Element {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="section-padding" ref={ref}>
      <div className="container-custom">
        <motion.div
          className="max-w-2xl mb-10"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6 }}
        >
          <p className="eyebrow mb-3">Tech Stack</p>
          <h2 className="display-heading text-3xl md:text-4xl mb-4">{title}</h2>
          <div className="rule-accent" />
        </motion.div>

        <motion.div
          className="flex flex-wrap gap-3"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {technologies.map((tech, index) => (
            <motion.span
              key={index}
              className="inline-flex items-center px-4 py-2 border border-base-300 bg-base-100 text-sm font-medium text-base-content hover:border-primary hover:text-primary transition-colors"
              variants={staggerItem}
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// Process Section
interface ProcessStep {
  title: string
  description: string
}

interface ProcessSectionProps {
  title: string
  subtitle: string
  steps: ProcessStep[]
}

export function ProcessSection({ title, subtitle, steps }: ProcessSectionProps): React.JSX.Element {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="section-padding bg-base-200" ref={ref}>
      <div className="container-custom">
        <motion.div
          className="max-w-2xl mb-12"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6 }}
        >
          <p className="eyebrow mb-3">{title}</p>
          <h2 className="display-heading text-3xl md:text-4xl mb-4">{subtitle}</h2>
          <div className="rule-accent" />
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative card-surface bg-base-100 p-7"
              variants={staggerItem}
            >
              <span className="block text-2xl font-bold text-primary/30 mb-4">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="text-lg font-semibold text-base-content mb-2">{step.title}</h3>
              <p className="text-base-content/70 text-sm leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// Service CTA Section
interface ServiceCTAProps {
  title: string
  description: string
  contactText: string
  viewAllText: string
  locale: string
}

export function ServiceCTA({ title, description, contactText, viewAllText, locale }: ServiceCTAProps): React.JSX.Element {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="section-padding" ref={ref}>
      <div className="container-custom">
        <motion.div
          className="bg-secondary text-white p-10 md:p-16 text-center"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="rule-accent mx-auto mb-8" />
          <h2 className="display-heading text-3xl md:text-4xl text-white mb-4">{title}</h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto leading-relaxed">{description}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/${locale}/contact`} className="btn btn-primary">
              {contactText}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link
              href={`/${locale}/services`}
              className="btn btn-outline border-white/30 text-white hover:bg-white hover:text-base-content hover:border-white"
            >
              {viewAllText}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
