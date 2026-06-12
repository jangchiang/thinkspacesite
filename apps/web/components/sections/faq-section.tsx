'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export interface FaqItem {
  q: string
  a: string
}

interface FaqSectionProps {
  eyebrow: string
  heading: string
  faqs: FaqItem[]
  /** 'light' (base-100) default, or 'muted' (base-200) */
  surface?: 'light' | 'muted'
}

/** Accessible FAQ accordion. Pair with faqJsonLd() for FAQPage structured data. */
export function FaqSection({ eyebrow, heading, faqs, surface = 'light' }: FaqSectionProps): React.JSX.Element {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className={`section-padding ${surface === 'muted' ? 'bg-base-200' : 'bg-base-100'}`}>
      <div className="container-custom max-w-3xl">
        <span className="eyebrow text-accent">{eyebrow}</span>
        <h2 className="display-heading mt-4 text-3xl font-bold tracking-tight text-base-content sm:text-4xl">
          {heading}
        </h2>

        <div className="mt-10 divide-y divide-base-300 border-y border-base-300">
          {faqs.map((f, i) => {
            const isOpen = open === i
            return (
              <div key={i}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="text-base font-semibold text-base-content md:text-lg">{f.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-accent transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ease-out ${isOpen ? 'grid-rows-[1fr] pb-5' : 'grid-rows-[0fr]'}`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-2xl leading-relaxed text-base-content/75">{f.a}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
