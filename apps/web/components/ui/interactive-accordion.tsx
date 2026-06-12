'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, type LucideIcon } from 'lucide-react'

export interface AccordionPanel {
  id: string
  title: string
  caption: string
  image: string
  icon: LucideIcon
  href: string
  /** rgba glow colour used for the section's ambient background when this card is active */
  accent?: string
}

interface Props {
  panels: AccordionPanel[]
  /** controlled active index (owned by the parent so the hero can sync its background) */
  active: number
  onSelect: (index: number) => void
  /** label for the "learn more" link inside the active panel */
  ctaLabel: string
  /** autoplay duration in ms — drives the countdown progress rail on the active panel */
  autoPlayMs: number
  /** when true (user interacting) or reduced-motion, the rail is static instead of counting down */
  paused: boolean
}

/**
 * Interactive image accordion — a row of image panels where the active panel
 * expands and the rest collapse to thin strips. Controlled: the parent owns the
 * active index (so it can drive autoplay + a matching section background).
 * Activates on hover/focus (desktop) and tap (mobile); only the in-panel
 * "Explore" link navigates, so tapping a collapsed panel just opens it.
 */
export function InteractiveAccordion({ panels, active, onSelect, ctaLabel, autoPlayMs, paused }: Props): React.JSX.Element {
  return (
    <div className="flex h-[360px] w-full gap-1.5 sm:h-[420px] md:h-[500px] md:gap-2">
      {panels.map((panel, i) => {
        const isActive = i === active
        const Icon = panel.icon
        return (
          <div
            key={panel.id}
            role="button"
            tabIndex={0}
            aria-label={panel.title}
            aria-expanded={isActive}
            onMouseEnter={() => onSelect(i)}
            onFocus={() => onSelect(i)}
            onClick={() => onSelect(i)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onSelect(i)
              }
            }}
            style={{ flexGrow: isActive ? 7 : 1 }}
            className="group relative min-w-[44px] cursor-pointer overflow-hidden rounded-xl border border-white/10 outline-none transition-[flex-grow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:ring-2 focus-visible:ring-primary"
          >
            {/* image — bypass the optimizer for remote CMS images (already sized by Strapi) */}
            <Image
              src={panel.image}
              alt={panel.title}
              fill
              sizes="(max-width: 768px) 60vw, 40vw"
              unoptimized={/^https?:\/\//.test(panel.image)}
              className={`object-cover transition-transform duration-700 ease-out ${isActive ? 'scale-100' : 'scale-[1.18]'}`}
            />

            {/* overlay — darker + bottom-weighted when active for legibility */}
            <div
              className={`absolute inset-0 transition-all duration-500 ${
                isActive
                  ? 'bg-gradient-to-t from-secondary/95 via-secondary/45 to-secondary/15'
                  : 'bg-secondary/70 group-hover:bg-secondary/60'
              }`}
            />

            {/* active panel: green progress rail counting down to the next card
                (static full rail when paused / reduced-motion). Mounted only when
                active so the CSS animation restarts each time a card takes focus. */}
            {isActive && (
              <span
                className="absolute inset-x-0 bottom-0 z-10 h-1 origin-left bg-gradient-to-r from-primary to-[#4ade80]"
                style={
                  paused
                    ? { transform: 'scaleX(1)' }
                    : {
                        animationName: 'accordionProgress',
                        animationDuration: `${autoPlayMs}ms`,
                        animationTimingFunction: 'linear',
                        animationFillMode: 'forwards',
                      }
                }
              />
            )}

            {/* icon badge */}
            <div className="absolute left-0 top-0 p-3 md:p-4">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/20 bg-white/10 text-white backdrop-blur-sm md:h-10 md:w-10">
                <Icon className="h-4 w-4 md:h-5 md:w-5" />
              </span>
            </div>

            {/* collapsed: vertical label */}
            <div
              className={`absolute inset-0 flex items-end justify-center pb-5 transition-opacity duration-300 ${
                isActive ? 'pointer-events-none opacity-0' : 'opacity-100'
              }`}
            >
              <span className="whitespace-nowrap text-xs font-semibold uppercase tracking-[0.18em] text-white/85 [writing-mode:vertical-rl] [transform:rotate(180deg)] md:text-sm">
                {panel.title}
              </span>
            </div>

            {/* active: title + caption + cta */}
            <div
              className={`absolute inset-x-0 bottom-0 p-4 transition-all duration-500 md:p-6 ${
                isActive ? 'translate-y-0 opacity-100 delay-150' : 'pointer-events-none translate-y-3 opacity-0'
              }`}
            >
              <h3 className="text-lg font-semibold leading-tight text-white md:text-xl">{panel.title}</h3>
              <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-white/80 line-clamp-2">{panel.caption}</p>
              <Link
                href={panel.href}
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-[#4ade80]"
              >
                {ctaLabel}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        )
      })}
    </div>
  )
}
