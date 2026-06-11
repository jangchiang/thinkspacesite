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

  // Animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 10, filter: 'blur(4px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
  }

  return (
    <div className="flex flex-col items-end">
      <div className={`flex items-center ${s.gap}`}>
        {/* THINK */}
        {animated ? (
          <motion.span
            className={`font-black ${s.text} tracking-tight text-base-content`}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            THINK
          </motion.span>
        ) : (
          <span className={`font-black ${s.text} tracking-tight text-base-content`}>
            THINK
          </span>
        )}

        {/* SPACE with brackets */}
        <div className={`relative ${s.bracket.padding}`}>
          {animated ? (
            <motion.span
              className={`font-black ${s.space} tracking-tight text-base-content relative z-10`}
              initial="hidden"
              animate="visible"
              variants={textVariants}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            >
              SPACE
            </motion.span>
          ) : (
            <span className={`font-black ${s.space} tracking-tight text-base-content relative z-10`}>
              SPACE
            </span>
          )}

          {/* SVG Brackets */}
          <svg
            className="absolute inset-0 w-full h-full overflow-visible"
            viewBox={`0 0 ${s.bracket.width} ${s.bracket.height}`}
            preserveAspectRatio="none"
            fill="none"
          >
            {animated ? (
              <>
                {/* Trail effects - Northern Lights */}
                <motion.path
                  d={bracketPath}
                  stroke="#4ADE80"
                  strokeWidth={s.bracket.strokeWidth}
                  strokeLinecap="square"
                  strokeDasharray="50 400"
                  initial={{ strokeDashoffset: 500 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 1.2, ease: 'linear', delay: 0.4 }}
                  style={{ filter: 'drop-shadow(0 0 6px #4ADE80)' }}
                />
                <motion.path
                  d={bracketPath}
                  stroke="#16A34A"
                  strokeWidth={s.bracket.strokeWidth}
                  strokeLinecap="square"
                  strokeDasharray="50 400"
                  initial={{ strokeDashoffset: 475 }}
                  animate={{ strokeDashoffset: -25 }}
                  transition={{ duration: 1.2, ease: 'linear', delay: 0.4 }}
                  style={{ filter: 'drop-shadow(0 0 6px #16A34A)' }}
                />
                <motion.path
                  d={bracketPath}
                  stroke="#22C55E"
                  strokeWidth={s.bracket.strokeWidth}
                  strokeLinecap="square"
                  strokeDasharray="50 400"
                  initial={{ strokeDashoffset: 450 }}
                  animate={{ strokeDashoffset: -50 }}
                  transition={{ duration: 1.2, ease: 'linear', delay: 0.4 }}
                  style={{ filter: 'drop-shadow(0 0 8px #22C55E)' }}
                />
                {/* Final bracket */}
                <motion.path
                  d={bracketPath}
                  stroke="#22C55E"
                  strokeWidth={s.bracket.strokeWidth}
                  strokeLinecap="square"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, ease: 'linear', delay: 0.4 }}
                />
              </>
            ) : (
              <path
                d={bracketPath}
                stroke="#22C55E"
                strokeWidth={s.bracket.strokeWidth}
                strokeLinecap="square"
              />
            )}
          </svg>
        </div>
      </div>

      {/* Tagline - technology with color transition */}
      {showTagline && (
        animated ? (
          <motion.span
            className={`${s.tagline} font-normal tracking-[0.2em] uppercase mt-0.5 mr-1`}
            initial={{
              opacity: 0,
              y: 10,
              filter: 'blur(4px)',
              backgroundPosition: '0% 50%'
            }}
            animate={{
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              backgroundPosition: '100% 50%'
            }}
            transition={{
              opacity: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.5 },
              y: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.5 },
              filter: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.5 },
              backgroundPosition: { duration: 1.8, ease: 'easeInOut', delay: 1.2 }
            }}
            style={{
              background: 'linear-gradient(90deg, #22C55E 0%, #22C55E 45%, oklch(var(--bc)) 55%, oklch(var(--bc)) 100%)',
              backgroundSize: '300% 100%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            technology
          </motion.span>
        ) : (
          <span
            className={`${s.tagline} font-normal tracking-[0.2em] uppercase mt-0.5 mr-1 text-base-content`}
          >
            technology
          </span>
        )
      )}
    </div>
  )
}
