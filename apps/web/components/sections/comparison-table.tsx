import { Check, Minus } from 'lucide-react'

export interface CompareColumn {
  label: string
  /** highlight this column as "ours" (brand tint) */
  highlight?: boolean
}

export interface CompareRow {
  feature: string
  /** one value per column — boolean renders a check/dash, string renders as text */
  values: (boolean | string)[]
}

interface ComparisonTableProps {
  eyebrow: string
  heading: string
  subheading?: string
  columns: CompareColumn[]
  rows: CompareRow[]
  surface?: 'light' | 'muted'
}

/**
 * Enterprise comparison table (e.g. our product vs an alternative). Server
 * component. Horizontal-scrolls on small screens; the "ours" column is tinted.
 */
export function ComparisonTable({
  eyebrow,
  heading,
  subheading,
  columns,
  rows,
  surface = 'light',
}: ComparisonTableProps): React.JSX.Element {
  return (
    <section className={`section-padding ${surface === 'muted' ? 'bg-base-200' : 'bg-base-100'}`}>
      <div className="container-custom">
        <div className="max-w-2xl">
          <span className="eyebrow text-accent">{eyebrow}</span>
          <h2 className="display-heading mt-4 text-3xl font-bold tracking-tight text-base-content sm:text-4xl">
            {heading}
          </h2>
          {subheading && <p className="mt-4 leading-relaxed text-base-content/70">{subheading}</p>}
        </div>

        <div className="mt-10 overflow-x-auto rounded-xl border border-base-300">
          <table className="w-full min-w-[640px] border-collapse text-left">
            <thead>
              <tr className="bg-base-200/60">
                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-base-content/50">
                  {/* feature column */}
                </th>
                {columns.map((c, i) => (
                  <th
                    key={i}
                    className={`px-5 py-4 text-base font-bold ${
                      c.highlight ? 'bg-primary/[0.06] text-accent' : 'text-base-content'
                    }`}
                  >
                    {c.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, ri) => (
                <tr key={ri} className="border-t border-base-300">
                  <td className="px-5 py-4 text-sm font-medium text-base-content">{r.feature}</td>
                  {r.values.map((v, vi) => (
                    <td
                      key={vi}
                      className={`px-5 py-4 align-middle ${columns[vi]?.highlight ? 'bg-primary/[0.04]' : ''}`}
                    >
                      {typeof v === 'boolean' ? (
                        v ? (
                          <Check className="h-5 w-5 text-accent" aria-label="Yes" />
                        ) : (
                          <Minus className="h-5 w-5 text-base-content/30" aria-label="No" />
                        )
                      ) : (
                        <span className="text-sm text-base-content/75">{v}</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
