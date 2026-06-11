'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

interface MatrixGridProps {
  /** grid cell size in px */
  cell?: number
  /** line color (use rg+a so opacity reads well on dark) */
  line?: string
  /** accent glow color */
  glow?: string
  className?: string
}

/**
 * Animated "matrix" grid background for dark sections.
 * - fine grid lines faded with a radial mask
 * - two slow-drifting accent glows
 * - subtle scroll-linked parallax (grid drifts up as the section scrolls by)
 * Respects prefers-reduced-motion.
 */
export function MatrixGrid({
  cell = 38,
  line = 'rgba(34,197,94,0.10)',
  glow = 'rgba(34,197,94,0.18)',
  className = '',
}: MatrixGridProps): React.JSX.Element {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  // grid drifts up + fades slightly as you scroll past
  const y = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '-14%'])
  const opacity = useTransform(scrollYProgress, [0, 0.85, 1], [1, 1, 0.35])

  return (
    <div ref={ref} className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {/* Parallax grid layer */}
      <motion.div
        className="absolute inset-x-0 -top-[14%] h-[128%]"
        style={{
          y,
          opacity,
          backgroundImage: `linear-gradient(to right, ${line} 1px, transparent 1px), linear-gradient(to bottom, ${line} 1px, transparent 1px)`,
          backgroundSize: `${cell}px ${cell}px`,
          maskImage:
            'radial-gradient(120% 90% at 70% 10%, #000 35%, transparent 78%)',
          WebkitMaskImage:
            'radial-gradient(120% 90% at 70% 10%, #000 35%, transparent 78%)',
        }}
      />

      {/* Drifting accent glows */}
      {!reduce && (
        <>
          <motion.div
            className="absolute -top-1/4 right-[8%] h-[42rem] w-[42rem] rounded-full blur-[150px]"
            style={{ background: glow }}
            animate={{ x: [0, 40, -20, 0], y: [0, 30, 10, 0], opacity: [0.6, 0.9, 0.7, 0.6] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-0 left-[6%] h-[30rem] w-[30rem] rounded-full blur-[150px]"
            style={{ background: glow, opacity: 0.5 }}
            animate={{ x: [0, -30, 20, 0], y: [0, -20, 10, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          />
        </>
      )}

      {/* Faint top-down vignette so content stays legible */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-secondary/60" />
    </div>
  )
}
