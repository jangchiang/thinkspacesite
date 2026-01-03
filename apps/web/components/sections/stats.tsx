'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

type Dict = Record<string, any>

interface StatsSectionProps {
  dict: Dict
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
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

export function StatsSection({ dict }: StatsSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const stats = [
    { value: 500, suffix: '+', labelKey: 'clients' },
    { value: 99.9, suffix: '%', labelKey: 'uptime', isDecimal: true },
    { displayValue: '24/7', labelKey: 'support' },
    { value: 15, suffix: '+', labelKey: 'experience' },
  ]

  return (
    <section className="section-padding bg-primary text-primary-content overflow-hidden" ref={ref}>
      <div className="container-custom">
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.labelKey}
              className="text-center"
              variants={itemVariants}
            >
              <motion.div
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                {stat.displayValue ? (
                  stat.displayValue
                ) : stat.isDecimal ? (
                  <span>{stat.value}{stat.suffix}</span>
                ) : (
                  <AnimatedNumber value={stat.value!} suffix={stat.suffix} />
                )}
              </motion.div>
              <motion.div
                className="text-primary-content/80 text-sm md:text-base"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                {dict.stats[stat.labelKey]}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
