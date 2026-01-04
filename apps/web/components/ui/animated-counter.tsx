'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

interface AnimatedCounterProps {
  value: string
  duration?: number
  className?: string
}

export function AnimatedCounter({ value, duration = 2000, className = '' }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [displayValue, setDisplayValue] = useState('0')

  useEffect(() => {
    if (!isInView) return

    // Extract numeric part and suffix
    const match = value.match(/^([\d.]+)(.*)$/)
    if (!match) {
      setDisplayValue(value)
      return
    }

    const numericValue = parseFloat(match[1])
    const suffix = match[2] || ''
    const isDecimal = match[1].includes('.')
    const decimalPlaces = isDecimal ? (match[1].split('.')[1]?.length || 0) : 0

    const startTime = Date.now()
    const startValue = 0

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function (ease out cubic)
      const easeOut = 1 - Math.pow(1 - progress, 3)

      const currentValue = startValue + (numericValue - startValue) * easeOut

      if (isDecimal) {
        setDisplayValue(currentValue.toFixed(decimalPlaces) + suffix)
      } else {
        setDisplayValue(Math.floor(currentValue) + suffix)
      }

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setDisplayValue(value)
      }
    }

    requestAnimationFrame(animate)
  }, [isInView, value, duration])

  return (
    <span ref={ref} className={className}>
      {displayValue}
    </span>
  )
}
