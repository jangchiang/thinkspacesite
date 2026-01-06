import type { Metadata } from 'next'
import { Inter, Kanit } from 'next/font/google'
import { notFound } from 'next/navigation'
import { locales, type Locale } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionary'
import { ThemeProvider } from '@/components/theme-provider'
import '../globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const kanit = Kanit({
  subsets: ['thai', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-kanit',
})

type Props = {
  params: Promise<{ locale: Locale }>
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const dict = await getDictionary(locale)
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://techthinkspace.com'

  return {
    title: {
      default: dict.metadata.title,
      template: `%s | Thinkspace Technology`,
    },
    description: dict.metadata.description,
    keywords: [
      // Brand keywords (important for branded search)
      'Thinkspace Technology',
      'thinkspace technology',
      'techthinkspace',
      'Think Space',
      // Service keywords
      'enterprise technology',
      'IT consulting',
      'cloud services',
      'managed services',
      'cybersecurity',
      'digital transformation',
      'AI solutions',
      'software development',
      // Location keywords
      'Thailand',
      'Bangkok',
      // Thai keywords
      locale === 'th' ? 'บริษัท Thinkspace Technology' : '',
      locale === 'th' ? 'เทคโนโลยีองค์กร' : '',
      locale === 'th' ? 'บริการคลาวด์' : '',
      locale === 'th' ? 'ที่ปรึกษาไอที' : '',
    ].filter(Boolean),
    authors: [{ name: 'Thinkspace Technology' }],
    creator: 'Thinkspace Technology',
    publisher: 'Thinkspace Technology',
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: `${siteUrl}/${locale}`,
      languages: {
        en: `${siteUrl}/en`,
        th: `${siteUrl}/th`,
      },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'th' ? 'th_TH' : 'en_US',
      url: siteUrl,
      siteName: 'Thinkspace Technology',
      title: dict.metadata.title,
      description: dict.metadata.description,
      images: [
        {
          url: `${siteUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: 'Thinkspace Technology - Enterprise Technology Solutions',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.metadata.title,
      description: dict.metadata.description,
      site: '@thinkspacetech',
      creator: '@thinkspacetech',
      images: [`${siteUrl}/og-image.jpg`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
    },
    other: {
      'msvalidate.01': process.env.BING_SITE_VERIFICATION || '',
    },
  }
}

// JSON-LD structured data for Organization
function OrganizationJsonLd({ siteUrl }: { siteUrl: string }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Thinkspace Technology',
    alternateName: ['Think Space', 'techthinkspace', 'Thinkspace Tech'],
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    description: 'Thinkspace Technology is a leading enterprise technology company providing cloud services, IT consulting, cybersecurity, AI solutions, software development, and digital transformation services in Thailand.',
    foundingDate: '2020',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bangkok',
      addressCountry: 'TH',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Thailand',
    },
    sameAs: [
      'https://www.facebook.com/thinkspacetechnology',
      'https://www.linkedin.com/company/thinkspace-technology',
      'https://twitter.com/thinkspacetech',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['English', 'Thai'],
    },
    knowsAbout: [
      'Cloud Computing',
      'Cybersecurity',
      'AI Solutions',
      'Software Development',
      'IT Consulting',
      'Digital Transformation',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

// JSON-LD for WebSite with search
function WebSiteJsonLd({ siteUrl, locale }: { siteUrl: string; locale: string }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Thinkspace Technology',
    url: siteUrl,
    inLanguage: locale === 'th' ? 'th-TH' : 'en-US',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/${locale}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: Locale }>
}): Promise<React.JSX.Element> {
  const { locale } = await params

  if (!locales.includes(locale)) {
    notFound()
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://techthinkspace.com'

  // Include both font variables - CSS will apply correct one based on lang attribute
  // suppressHydrationWarning is needed because lang attribute changes based on route
  return (
    <html
      lang={locale}
      data-theme="thinkspace"
      className={`${inter.variable} ${kanit.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="alternate" hrefLang="en" href={`${siteUrl}/en`} />
        <link rel="alternate" hrefLang="th" href={`${siteUrl}/th`} />
        <link rel="alternate" hrefLang="x-default" href={`${siteUrl}/en`} />
        <OrganizationJsonLd siteUrl={siteUrl} />
        <WebSiteJsonLd siteUrl={siteUrl} locale={locale} />
      </head>
      <body className="min-h-screen bg-base-100" suppressHydrationWarning>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
