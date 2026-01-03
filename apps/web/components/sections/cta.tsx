import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { type Locale } from '@/lib/i18n'

type Dict = Record<string, any>

interface CTASectionProps {
  dict: Dict
  locale: Locale
}

export function CTASection({ dict, locale }: CTASectionProps) {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-neutral to-neutral/90 text-neutral-content p-8 md:p-12 lg:p-16">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              {dict.cta.title}
            </h2>
            <p className="text-lg md:text-xl text-neutral-content/80 mb-8">
              {dict.cta.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href={`/${locale}/contact`} className="btn btn-primary btn-lg gap-2">
                {dict.cta.schedule}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href={`/${locale}/case-studies`}
                className="btn btn-outline btn-lg text-neutral-content border-neutral-content/30 hover:bg-neutral-content hover:text-neutral"
              >
                {dict.cta.caseStudies}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
