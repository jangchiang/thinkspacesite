'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

interface Stat {
  id: number
  value: string
  label: string
  order: number
}

interface StatsSectionProps {
  stats?: Stat[]
}

function AnimatedNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    const duration = 2000
    const startTime = performance.now()

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function: easeOutCubic
      const easeProgress = 1 - Math.pow(1 - progress, 3)

      setDisplayValue(Math.round(value * easeProgress))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isInView, value])

  return (
    <span ref={ref}>
      {displayValue}{suffix}
    </span>
  )
}

// Parse value to extract number and suffix for animation
function parseStatValue(value: string): { number: number | null; suffix: string; displayRaw: boolean } {
  // Check for special cases like 24/7
  if (value.includes('/')) {
    return { number: null, suffix: '', displayRaw: true }
  }

  // Extract number and suffix (e.g., "500+" -> 500, "+")
  const match = value.match(/^([\d.]+)(.*)$/)
  if (match) {
    const num = parseFloat(match[1])
    const suffix = match[2] || ''
    // If it's a decimal, don't animate
    if (match[1].includes('.')) {
      return { number: null, suffix: '', displayRaw: true }
    }
    return { number: num, suffix, displayRaw: false }
  }

  return { number: null, suffix: '', displayRaw: true }
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
}

export function StatsSection({ stats }: StatsSectionProps): React.JSX.Element | null {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  // Use provided stats only (no fallbacks)
  const displayStats = stats || []

  // Don't render section if no stats
  if (displayStats.length === 0) {
    return null
  }

  return (
    <section className="section-padding bg-base-100 border-y border-base-300" ref={ref}>
      <div className="container-custom">
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-base-300"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          {displayStats.map((stat) => {
            const parsed = parseStatValue(stat.value)

            return (
              <motion.div
                key={stat.id}
                className="bg-base-100 text-center px-4 py-8 md:py-10"
                variants={itemVariants}
              >
                <div className="display-heading text-base-content text-4xl md:text-5xl lg:text-6xl mb-3">
                  {parsed.displayRaw ? (
                    stat.value
                  ) : (
                    <AnimatedNumber value={parsed.number!} suffix={parsed.suffix} />
                  )}
                </div>
                <div className="mx-auto mb-3 h-px w-8 bg-primary" />
                <div className="text-base-content/70 text-xs md:text-sm uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
