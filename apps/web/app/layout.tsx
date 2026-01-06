import type { Metadata, Viewport } from 'next'
import { Inter, Kanit } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'

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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: {
    default: 'Think Space | Enterprise Technology Solutions',
    template: '%s | Think Space',
  },
  description:
    'Think Space is a leading enterprise technology company providing cloud services, IT consulting, managed services, cybersecurity, and digital transformation solutions.',
  keywords: [
    'enterprise technology',
    'IT consulting',
    'cloud services',
    'managed services',
    'cybersecurity',
    'digital transformation',
  ],
  authors: [{ name: 'Think Space' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'Think Space',
    title: 'Think Space | Enterprise Technology Solutions',
    description:
      'Leading enterprise technology company providing cloud services, IT consulting, and digital transformation.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Think Space | Enterprise Technology Solutions',
    description:
      'Leading enterprise technology company providing cloud services, IT consulting, and digital transformation.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

// JSON-LD structured data
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://techthinkspace.com'

const organizationJsonLd = {
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

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Thinkspace Technology',
  url: siteUrl,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${siteUrl}/search?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}): React.JSX.Element {
  return (
    <html lang="en" data-theme="thinkspace" className={`${inter.variable} ${kanit.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-base-100" suppressHydrationWarning>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
