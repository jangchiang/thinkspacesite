'use client'

import { motion } from 'framer-motion'

interface LogoProps {
  showTagline?: boolean
  size?: 'sm' | 'md' | 'lg'
  animated?: boolean
}

export function Logo({ showTagline = false, size = 'md', animated = true }: LogoProps): React.JSX.Element {
  const sizes = {
    sm: {
      text: 'text-lg',
      space: 'text-lg',
      tagline: 'text-[8px]',
      bracket: { width: 90, height: 28, strokeWidth: 3, padding: 'px-2 py-0.5' },
      gap: 'gap-1',
    },
    md: {
      text: 'text-xl',
      space: 'text-xl',
      tagline: 'text-[9px]',
      bracket: { width: 105, height: 32, strokeWidth: 3, padding: 'px-2.5 py-1' },
      gap: 'gap-1.5',
    },
    lg: {
      text: 'text-3xl',
      space: 'text-3xl',
      tagline: 'text-xs',
      bracket: { width: 150, height: 44, strokeWidth: 4, padding: 'px-4 py-1.5' },
      gap: 'gap-2',
    },
  }

  const s = sizes[size]

  const bracketPath = `M 3,3 H ${s.bracket.width - 3} V ${s.bracket.height * 0.35} M ${s.bracket.width - 3},${s.bracket.height * 0.65} V ${s.bracket.height - 3} H 3 V ${s.bracket.height * 0.65} M 3,${s.bracket.height * 0.35} V 3`

  return (
    <div className="flex flex-col items-end">
      <div className={`flex items-center ${s.gap}`}>
        {/* THINK */}
        <span className={`font-black ${s.text} tracking-tight text-base-content`}>
          THINK
        </span>

        {/* SPACE with brackets */}
        <div className={`relative ${s.bracket.padding}`}>
          <span className={`font-black ${s.space} tracking-tight text-base-content relative z-10`}>
            SPACE
          </span>

          {/* SVG Brackets */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox={`0 0 ${s.bracket.width} ${s.bracket.height}`}
            preserveAspectRatio="none"
            fill="none"
          >
            {animated ? (
              <motion.path
                d={bracketPath}
                stroke="currentColor"
                strokeWidth={s.bracket.strokeWidth}
                strokeLinecap="square"
                className="text-primary"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
              />
            ) : (
              <path
                d={bracketPath}
                stroke="currentColor"
                strokeWidth={s.bracket.strokeWidth}
                strokeLinecap="square"
                className="text-primary"
              />
            )}
          </svg>
        </div>
      </div>

      {/* Tagline */}
      {showTagline && (
        <span
          className={`${s.tagline} font-normal tracking-[0.2em] uppercase mt-0.5 mr-1`}
          style={{
            background: 'linear-gradient(90deg, #10B981 0%, #10B981 45%, currentColor 55%, currentColor 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          technology
        </span>
      )}
    </div>
  )
}
