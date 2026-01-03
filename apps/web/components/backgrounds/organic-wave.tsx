'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface OrganicWaveProps {
  className?: string
}

export function OrganicWave({ className = '' }: OrganicWaveProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-base-100 via-base-100 to-primary/5" />

      {/* Animated wave layers */}
      <svg
        className="absolute bottom-0 left-0 w-full h-[60%] opacity-30"
        viewBox="0 0 1440 600"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="wave-gradient-1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--p) / 0.3)" />
            <stop offset="50%" stopColor="hsl(var(--a) / 0.2)" />
            <stop offset="100%" stopColor="hsl(var(--p) / 0.3)" />
          </linearGradient>
          <linearGradient id="wave-gradient-2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--a) / 0.2)" />
            <stop offset="50%" stopColor="hsl(var(--p) / 0.3)" />
            <stop offset="100%" stopColor="hsl(var(--a) / 0.2)" />
          </linearGradient>
          <linearGradient id="wave-gradient-3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--p) / 0.15)" />
            <stop offset="50%" stopColor="hsl(var(--s) / 0.1)" />
            <stop offset="100%" stopColor="hsl(var(--p) / 0.15)" />
          </linearGradient>
        </defs>

        {/* Wave 1 - Slowest, back layer */}
        <motion.path
          fill="url(#wave-gradient-1)"
          initial={{ d: "M0,300 C320,400 420,250 720,300 C1020,350 1200,280 1440,320 L1440,600 L0,600 Z" }}
          animate={{
            d: [
              "M0,300 C320,400 420,250 720,300 C1020,350 1200,280 1440,320 L1440,600 L0,600 Z",
              "M0,350 C280,280 520,380 720,320 C920,260 1100,350 1440,300 L1440,600 L0,600 Z",
              "M0,280 C360,350 480,280 720,340 C960,400 1150,300 1440,350 L1440,600 L0,600 Z",
              "M0,300 C320,400 420,250 720,300 C1020,350 1200,280 1440,320 L1440,600 L0,600 Z",
            ],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Wave 2 - Medium speed, middle layer */}
        <motion.path
          fill="url(#wave-gradient-2)"
          initial={{ d: "M0,400 C240,350 480,450 720,380 C960,310 1200,400 1440,370 L1440,600 L0,600 Z" }}
          animate={{
            d: [
              "M0,400 C240,350 480,450 720,380 C960,310 1200,400 1440,370 L1440,600 L0,600 Z",
              "M0,380 C300,430 520,340 720,400 C920,460 1140,360 1440,410 L1440,600 L0,600 Z",
              "M0,420 C280,380 460,440 720,360 C980,280 1180,420 1440,380 L1440,600 L0,600 Z",
              "M0,400 C240,350 480,450 720,380 C960,310 1200,400 1440,370 L1440,600 L0,600 Z",
            ],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Wave 3 - Fastest, front layer */}
        <motion.path
          fill="url(#wave-gradient-3)"
          initial={{ d: "M0,480 C180,450 360,500 540,470 C720,440 900,490 1080,460 C1260,430 1350,480 1440,460 L1440,600 L0,600 Z" }}
          animate={{
            d: [
              "M0,480 C180,450 360,500 540,470 C720,440 900,490 1080,460 C1260,430 1350,480 1440,460 L1440,600 L0,600 Z",
              "M0,460 C200,490 380,450 560,480 C740,510 920,460 1100,490 C1280,520 1380,470 1440,490 L1440,600 L0,600 Z",
              "M0,490 C160,460 340,510 520,475 C700,440 880,500 1060,470 C1240,440 1360,490 1440,470 L1440,600 L0,600 Z",
              "M0,480 C180,450 360,500 540,470 C720,440 900,490 1080,460 C1260,430 1350,480 1440,460 L1440,600 L0,600 Z",
            ],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </svg>

      {/* Floating orbs representing innovation/space */}
      <motion.div
        className="absolute top-[15%] left-[10%] w-64 h-64 rounded-full bg-gradient-to-br from-primary/20 to-transparent blur-3xl"
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-[25%] right-[15%] w-80 h-80 rounded-full bg-gradient-to-bl from-accent/15 to-transparent blur-3xl"
        animate={{
          x: [0, -25, 0],
          y: [0, 25, 0],
          scale: [1.1, 1, 1.1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-[30%] left-[25%] w-48 h-48 rounded-full bg-gradient-to-tr from-secondary/10 to-primary/10 blur-2xl"
        animate={{
          x: [0, 20, 0],
          y: [0, -15, 0],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Subtle grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Radial fade from center */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-base-100/50" />
    </div>
  )
}

// Alternative: Particle field for "space" theme
export function SpaceParticles({ className = '' }: OrganicWaveProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Particles
    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = []
    const particleCount = 50

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

      // Draw and update particles
      particles.forEach((p, i) => {
        p.x += p.vx
        p.y += p.vy

        // Wrap around
        if (p.x < 0) p.x = canvas.offsetWidth
        if (p.x > canvas.offsetWidth) p.x = 0
        if (p.y < 0) p.y = canvas.offsetHeight
        if (p.y > canvas.offsetHeight) p.y = 0

        // Draw particle
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(34, 197, 94, ${p.opacity})`
        ctx.fill()

        // Draw connections
        particles.forEach((p2, j) => {
          if (i === j) return
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(34, 197, 94, ${0.1 * (1 - dist / 120)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })

      requestAnimationFrame(animate)
    }

    const animationId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-base-100 via-base-100 to-primary/5" />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.6 }}
      />
    </div>
  )
}
