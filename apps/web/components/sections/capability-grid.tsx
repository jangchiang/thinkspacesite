'use client'

import { useRef } from 'react'
import {
  Bot, Library, Brain, Plug, Sparkles, UserCog, Server, Rocket, KeyRound, Network,
  type LucideIcon,
} from 'lucide-react'

const ICONS: Record<string, LucideIcon> = {
  Bot, Library, Brain, Plug, Sparkles, UserCog, Server, Rocket, KeyRound, Network,
}

export interface Capability {
  icon: string
  title: string
  body: string
}

/**
 * Dark BENTO grid — mixed-size glassmorphism cards with a masked dot-grid
 * pattern, a corner radial glow, and a cursor-following spotlight.
 */
export function CapabilityGrid({ features }: { features: Capability[] }): React.JSX.Element {
  return (
    <div className="mt-12 grid grid-cols-1 gap-4 [grid-auto-flow:dense] md:grid-cols-3">
      {features.map((c, i) => (
        // every 5th card is a wide (2-col) tile → asymmetric bento rhythm
        <BentoCard key={c.title} c={c} wide={i % 5 === 0} />
      ))}
    </div>
  )
}

function BentoCard({ c, wide }: { c: Capability; wide: boolean }): React.JSX.Element {
  const ref = useRef<HTMLDivElement>(null)
  const Icon = ICONS[c.icon] || Bot

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--x', `${e.clientX - r.left}px`)
    el.style.setProperty('--y', `${e.clientY - r.top}px`)
  }

  const mask = 'radial-gradient(130% 90% at 50% 0%, #000 30%, transparent 75%)'

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm transition-colors duration-300 hover:border-primary/30 ${
        wide ? 'md:col-span-2' : ''
      }`}
    >
      {/* masked dot-grid pattern */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
          backgroundSize: '16px 16px',
          maskImage: mask,
          WebkitMaskImage: mask,
        }}
      />
      {/* corner radial glow */}
      <div
        aria-hidden
        className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-primary/15 opacity-50 blur-3xl transition-opacity duration-300 group-hover:opacity-90"
      />
      {/* cursor-following spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(260px circle at var(--x, 50%) var(--y, 50%), rgba(34,197,94,0.13), transparent 70%)',
        }}
      />

      <div className={`relative ${wide ? 'md:flex md:items-start md:gap-5' : ''}`}>
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-primary/10 text-primary transition-colors duration-300 group-hover:border-primary/40">
          <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
        </span>
        <div className={wide ? 'mt-5 md:mt-0' : 'mt-5'}>
          <h3 className="font-semibold text-white">{c.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-white/65">{c.body}</p>
        </div>
      </div>
    </div>
  )
}
