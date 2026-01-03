'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import {
  Cloud,
  Shield,
  Database,
  Code,
  BarChart,
  Server,
  FlaskConical,
  Check,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react'

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  Cloud,
  Shield,
  Database,
  Code,
  BarChart,
  Server,
  FlaskConical,
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
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

// Service Hero Section
interface ServiceHeroProps {
  iconName: string
  color: string
  title: string
  description: string
}

export function ServiceHero({ iconName, color, title, description }: ServiceHeroProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const Icon = iconMap[iconName] || Cloud

  return (
    <section className="section-padding bg-gradient-to-br from-base-100 to-primary/5" ref={ref}>
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            className={`w-20 h-20 ${color} rounded-2xl flex items-center justify-center mx-auto mb-6`}
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.5, rotate: -10 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Icon className="w-10 h-10 text-white" />
          </motion.div>
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {title}
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-base-content/70"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
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
}

export function FeaturesSection({ title, features, imagePlaceholder }: FeaturesSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="section-padding" ref={ref}>
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-3xl font-bold mb-6">{title}</h2>
            <motion.ul
              className="space-y-4"
              variants={staggerContainer}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
            >
              {features.map((feature, index) => (
                <motion.li
                  key={index}
                  className="flex items-start gap-3"
                  variants={staggerItem}
                >
                  <motion.div
                    className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5"
                    whileHover={{ scale: 1.2, backgroundColor: 'hsl(var(--p))' }}
                  >
                    <Check className="w-4 h-4 text-primary" />
                  </motion.div>
                  <span className="text-lg">{feature}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
          <motion.div
            className="bg-base-200 rounded-2xl aspect-video flex items-center justify-center overflow-hidden"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-base-content/50">{imagePlaceholder}</p>
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

export function BenefitsSection({ title, benefits }: BenefitsSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="section-padding bg-base-200" ref={ref}>
      <div className="container-custom">
        <motion.h2
          className="text-3xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {title}
        </motion.h2>
        <motion.div
          className="grid md:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {benefits.map((item, index) => (
            <motion.div
              key={index}
              className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow duration-300"
              variants={staggerItem}
              whileHover={{ y: -5 }}
            >
              <div className="card-body text-center">
                <motion.div
                  className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1, type: 'spring' }}
                >
                  <span className="text-2xl font-bold text-primary">{index + 1}</span>
                </motion.div>
                <h3 className="card-title justify-center">{item.title}</h3>
                <p className="text-base-content/70">{item.description}</p>
              </div>
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

export function UseCasesSection({ title, subtitle, useCases }: UseCasesSectionProps) {
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
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          <p className="text-base-content/70 max-w-2xl mx-auto">{subtitle}</p>
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
              className="card bg-base-100 border border-base-200 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
              variants={staggerItem}
              whileHover={{ y: -5 }}
            >
              <div className="card-body">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <span className="text-lg font-bold text-primary">{index + 1}</span>
                </div>
                <h3 className="card-title text-lg">{useCase.title}</h3>
                <p className="text-base-content/70 text-sm">{useCase.description}</p>
              </div>
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

export function TechnologiesSection({ title, technologies }: TechnologiesSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="section-padding bg-base-200" ref={ref}>
      <div className="container-custom">
        <motion.h2
          className="text-3xl font-bold text-center mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          {title}
        </motion.h2>
        <motion.div
          className="flex flex-wrap justify-center gap-4"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              className="px-6 py-3 bg-base-100 rounded-full border border-base-300 text-base-content font-medium shadow-sm hover:border-primary hover:shadow-md transition-all duration-300"
              variants={staggerItem}
              whileHover={{ scale: 1.05, y: -2 }}
            >
              {tech}
            </motion.div>
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

export function ProcessSection({ title, subtitle, steps }: ProcessSectionProps) {
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
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          <p className="text-base-content/70 max-w-2xl mx-auto">{subtitle}</p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Connecting line */}
          <motion.div
            className="absolute left-8 top-8 bottom-8 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-primary/20 hidden md:block"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ transformOrigin: 'top' }}
          />

          <div className="space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="flex gap-6 items-start"
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                <motion.div
                  className="w-16 h-16 rounded-full bg-primary text-primary-content flex items-center justify-center font-bold text-xl flex-shrink-0 shadow-lg shadow-primary/30 relative z-10"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {index + 1}
                </motion.div>
                <div className="flex-1 pt-3">
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-base-content/70">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
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

export function ServiceCTA({ title, description, contactText, viewAllText, locale }: ServiceCTAProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="section-padding" ref={ref}>
      <div className="container-custom">
        <motion.div
          className="card bg-gradient-to-br from-green-600 to-green-800 text-white overflow-hidden relative"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Background decoration */}
          <motion.div
            className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <div className="card-body text-center py-12 relative z-10">
            <motion.h2
              className="text-3xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {title}
            </motion.h2>
            <motion.p
              className="text-white/80 mb-6 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {description}
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href={`/${locale}/contact`}
                  className="btn bg-white text-green-700 hover:bg-white/90 border-none"
                >
                  {contactText}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href={`/${locale}/services`}
                  className="btn btn-outline border-white text-white hover:bg-white hover:text-green-700"
                >
                  {viewAllText}
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
