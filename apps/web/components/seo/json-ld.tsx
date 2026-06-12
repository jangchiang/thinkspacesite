import { type Locale } from '@/lib/i18n'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://techthinkspace.com'

/**
 * Renders one or more schema.org JSON-LD blocks. Server component — safe to drop
 * anywhere in a page/layout. Pass a single object or an array of objects.
 */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }): React.JSX.Element {
  const blocks = Array.isArray(data) ? data : [data]
  return (
    <>
      {blocks.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
    </>
  )
}

/** schema.org BreadcrumbList from a list of { name, path } (path is locale-relative, e.g. "/products"). */
export function breadcrumbJsonLd(
  locale: Locale,
  trail: { name: string; path: string }[],
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { name: locale === 'th' ? 'หน้าแรก' : 'Home', path: '' },
      ...trail,
    ].map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}/${locale}${item.path}`,
    })),
  }
}

/** schema.org FAQPage from a list of { q, a }. */
export function faqJsonLd(faqs: { q: string; a: string }[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

/** schema.org SoftwareApplication for a product page. */
export function productJsonLd(opts: {
  locale: Locale
  name: string
  description: string
  path: string
  category?: string
}): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: opts.name,
    description: opts.description,
    applicationCategory: opts.category ?? 'BusinessApplication',
    operatingSystem: 'Web, On-premise, Cloud',
    url: `${SITE_URL}/${opts.locale}${opts.path}`,
    brand: { '@type': 'Brand', name: 'ThinkSpace Technologies' },
    publisher: { '@type': 'Organization', name: 'ThinkSpace Technologies', url: SITE_URL },
    offers: { '@type': 'Offer', priceCurrency: 'THB', price: '0', availability: 'https://schema.org/InStock' },
  }
}
