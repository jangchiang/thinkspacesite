'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Mail, Phone, MessageCircle, Clock, type LucideIcon } from 'lucide-react'
import Image from 'next/image'
import { type HeroBackground } from '@/lib/hero-utils'

// Icon mapping for serialization
const iconMap: Record<string, LucideIcon> = {
  Mail,
  Phone,
  MessageCircle,
  Clock,
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

// Contact Hero Section
interface ContactHeroProps {
  title: string
  description: string
  background?: HeroBackground | null
}

export function ContactHero({ title, description, background }: ContactHeroProps) {
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

// Contact Info Section
interface ContactInfoItem {
  iconName: string
  label: string
  value: string
  href: string
}

interface ContactInfoSectionProps {
  title: string
  items: ContactInfoItem[]
  children: React.ReactNode
  formTitle: string
}

export function ContactInfoSection({ title, items, children, formTitle }: ContactInfoSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="section-padding" ref={ref}>
      <div className="container-custom">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-2xl font-bold mb-6">{title}</h2>
            <motion.div
              className="space-y-6"
              variants={staggerContainer}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
            >
              {items.map((item) => {
                const IconComponent = iconMap[item.iconName] || Mail
                return (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    className="flex items-start gap-4 group"
                    variants={staggerItem}
                    whileHover={{ x: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <motion.div
                      className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors duration-300"
                      whileHover={{ scale: 1.1 }}
                    >
                      <IconComponent className="w-5 h-5 text-primary group-hover:text-primary-content transition-colors duration-300" />
                    </motion.div>
                    <div>
                      <p className="font-medium">{item.label}</p>
                      <p className="text-base-content/70">{item.value}</p>
                    </div>
                  </motion.a>
                )
              })}
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-6">{formTitle}</h2>
                {children}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Map Section
interface MapSectionProps {
  placeholder: string
}

export function MapSection({ placeholder }: MapSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="section-padding bg-base-200" ref={ref}>
      <div className="container-custom">
        <motion.div
          className="aspect-video bg-base-300 rounded-2xl flex items-center justify-center overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-base-content/50">{placeholder}</p>
        </motion.div>
      </div>
    </section>
  )
}
