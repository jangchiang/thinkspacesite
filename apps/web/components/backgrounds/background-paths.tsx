'use client'

import { motion } from 'framer-motion'

interface BackgroundPathsProps {
  className?: string
}

export function BackgroundPaths({ className = '' }: BackgroundPathsProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Base gradient - enhanced for both modes */}
      <div className="absolute inset-0 bg-gradient-to-br from-base-100 via-base-100 to-primary/10" />

      {/* Animated grid pattern - hidden on mobile for performance */}
      <div className="absolute inset-0 opacity-[0.4] dark:opacity-[0.15] hidden sm:block">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-primary/30 dark:text-primary/40"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Large floating gradient orbs - smaller on mobile */}
      <motion.div
        className="absolute -top-[20%] -left-[10%] w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] lg:w-[800px] lg:h-[800px] rounded-full"
        style={{
          background: 'radial-gradient(circle, hsl(var(--p) / 0.25) 0%, hsl(var(--p) / 0.1) 40%, transparent 70%)',
        }}
        animate={{
          x: [0, 50, 0],
          y: [0, 25, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute -bottom-[30%] -right-[10%] w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] lg:w-[700px] lg:h-[700px] rounded-full"
        style={{
          background: 'radial-gradient(circle, hsl(var(--a) / 0.2) 0%, hsl(var(--p) / 0.1) 40%, transparent 70%)',
        }}
        animate={{
          x: [0, -40, 0],
          y: [0, -20, 0],
          scale: [1.1, 1, 1.1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Third orb - hidden on mobile */}
      <motion.div
        className="absolute top-[30%] right-[10%] w-[300px] h-[300px] lg:w-[500px] lg:h-[500px] rounded-full hidden sm:block"
        style={{
          background: 'radial-gradient(circle, hsl(var(--p) / 0.15) 0%, transparent 60%)',
        }}
        animate={{
          x: [0, 30, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Animated floating circles - hidden on mobile */}
      <div className="hidden sm:block">
        <motion.div
          className="absolute top-[15%] left-[20%] w-4 h-4 rounded-full bg-primary/40"
          animate={{
            y: [0, -30, 0],
            opacity: [0.4, 0.8, 0.4],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <motion.div
          className="absolute top-[25%] right-[30%] w-3 h-3 rounded-full bg-primary/50"
          animate={{
            y: [0, -25, 0],
            opacity: [0.5, 0.9, 0.5],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.5,
          }}
        />

        <motion.div
          className="absolute bottom-[30%] left-[15%] w-2 h-2 rounded-full bg-primary/60"
          animate={{
            y: [0, -20, 0],
            opacity: [0.6, 1, 0.6],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />

        <motion.div
          className="absolute top-[50%] right-[15%] w-5 h-5 rounded-full bg-primary/30"
          animate={{
            y: [0, -35, 0],
            opacity: [0.3, 0.7, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.8,
          }}
        />

        <motion.div
          className="absolute bottom-[20%] right-[40%] w-3 h-3 rounded-full bg-primary/45"
          animate={{
            y: [0, -28, 0],
            opacity: [0.45, 0.85, 0.45],
            scale: [1, 1.25, 1],
          }}
          transition={{
            duration: 4.2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1.2,
          }}
        />
      </div>

      {/* Animated diagonal lines - hidden on mobile */}
      <svg className="absolute inset-0 w-full h-full opacity-20 dark:opacity-10 hidden sm:block" xmlns="http://www.w3.org/2000/svg">
        <motion.line
          x1="0%"
          y1="100%"
          x2="100%"
          y2="0%"
          stroke="currentColor"
          strokeWidth="1"
          className="text-primary"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0.1, 0.3, 0.1] }}
          transition={{
            pathLength: { duration: 3, ease: 'easeInOut' },
            opacity: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
          }}
        />
        <motion.line
          x1="20%"
          y1="100%"
          x2="100%"
          y2="20%"
          stroke="currentColor"
          strokeWidth="0.5"
          className="text-primary"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0.05, 0.2, 0.05] }}
          transition={{
            pathLength: { duration: 3.5, ease: 'easeInOut', delay: 0.3 },
            opacity: { duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 },
          }}
        />
        <motion.line
          x1="0%"
          y1="80%"
          x2="80%"
          y2="0%"
          stroke="currentColor"
          strokeWidth="0.5"
          className="text-primary"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0.05, 0.15, 0.05] }}
          transition={{
            pathLength: { duration: 4, ease: 'easeInOut', delay: 0.6 },
            opacity: { duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.6 },
          }}
        />
      </svg>

      {/* Glowing accent rings - hidden on mobile */}
      <motion.div
        className="absolute top-[20%] left-[60%] w-[100px] h-[100px] sm:w-[200px] sm:h-[200px] rounded-full border-2 border-primary/20 hidden sm:block"
        style={{
          boxShadow: '0 0 60px 20px hsl(var(--p) / 0.1)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute bottom-[25%] left-[10%] w-[80px] h-[80px] sm:w-[150px] sm:h-[150px] rounded-full border border-primary/15 hidden sm:block"
        style={{
          boxShadow: '0 0 40px 10px hsl(var(--p) / 0.08)',
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.5, 0.2],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Subtle noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Top and bottom gradient fades */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-base-100 via-base-100/80 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-base-200 via-base-100/80 to-transparent" />
    </div>
  )
}

// Alternative: Letter-by-letter animated text component
interface AnimatedTextProps {
  text: string
  className?: string
}

export function AnimatedText({ text, className = '' }: AnimatedTextProps) {
  const words = text.split(' ')

  return (
    <span className={className}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block mr-[0.25em]">
          {word.split('').map((char, charIndex) => (
            <motion.span
              key={charIndex}
              className="inline-block"
              initial={{ opacity: 0, y: 20, rotateX: 90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                duration: 0.5,
                delay: wordIndex * 0.1 + charIndex * 0.03,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </span>
  )
}
