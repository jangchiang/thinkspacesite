import { Check } from 'lucide-react'

export interface RoadmapNode {
  milestone: string
  status: 'live' | 'soon' | 'planned'
  statusLabel: string
  features: string[]
}

/**
 * Product roadmap timeline — horizontal on desktop, vertical on mobile.
 * "live" nodes get a filled green dot; "soon"/"planned" get outlined dots.
 */
export function RoadmapTimeline({ nodes }: { nodes: RoadmapNode[] }): React.JSX.Element {
  return (
    <div className="mt-12">
      {/* connecting rail */}
      <div className="relative grid gap-8 md:grid-cols-4 md:gap-6">
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-white/15 md:left-0 md:right-0 md:top-[7px] md:h-px md:w-auto md:bottom-auto" aria-hidden />

        {nodes.map((n) => {
          const live = n.status === 'live'
          return (
            <div key={n.milestone} className="relative pl-8 md:pl-0 md:pt-10">
              {/* node dot */}
              <span
                aria-hidden
                className={`absolute left-0 top-1 flex h-4 w-4 items-center justify-center rounded-full md:top-0 ${
                  live ? 'bg-primary text-secondary' : 'border-2 border-primary/60 bg-secondary'
                }`}
              >
                {live && <Check className="h-2.5 w-2.5" strokeWidth={3} />}
              </span>

              {/* status badge */}
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${
                  live
                    ? 'border border-primary/40 bg-primary/15 text-primary'
                    : n.status === 'soon'
                      ? 'border border-white/20 bg-white/5 text-white/80'
                      : 'border border-white/10 bg-transparent text-white/45'
                }`}
              >
                {n.statusLabel}
              </span>

              <h3 className="mt-3 text-lg font-bold text-white">{n.milestone}</h3>
              <ul className="mt-3 space-y-1.5">
                {n.features.map((f) => (
                  <li key={f} className="text-sm leading-relaxed text-white/65">{f}</li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </div>
  )
}
