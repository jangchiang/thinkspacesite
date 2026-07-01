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
    default: 'ThinkSpace Technologies | AI, Data & Digital Engineering',
    template: '%s | Think Space',
  },
  description:
    'ThinkSpace Technologies is a Chiang Mai–based technology and engineering partner specialising in AI, Data Science, High-Performance Computing, simulation, cybersecurity, and digital engineering solutions — including Logix, our sovereign AI-native platform for on-premise and on-cloud deployment.',
  keywords: [
    'AI solutions',
    'data science',
    'high-performance computing',
    'simulation',
    'digital engineering',
    'cybersecurity',
    'Logix AI platform',
    'Proxmox reseller Thailand',
    'Chiang Mai technology company',
  ],
  authors: [{ name: 'Think Space' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'Think Space',
    title: 'ThinkSpace Technologies | AI, Data & Digital Engineering',
    description:
      'AI, Data Science, HPC, simulation and cybersecurity from Chiang Mai. Maker of Logix — a sovereign AI-native platform for on-premise and on-cloud.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ThinkSpace Technologies | AI, Data & Digital Engineering',
    description:
      'AI, Data Science, HPC, simulation and cybersecurity from Chiang Mai. Maker of Logix — a sovereign AI-native platform for on-premise and on-cloud.',
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
  description: 'ThinkSpace Technologies Co., Ltd. is a Chiang Mai–based technology and engineering partner specialising in AI, Data Science, High-Performance Computing, simulation, cybersecurity, and digital engineering — and the maker of Logix, a sovereign AI-native platform.',
  foundingDate: '2024',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '211/141 Moo 2, Mae Hia',
    addressLocality: 'Muang Chiang Mai',
    addressRegion: 'Chiang Mai',
    postalCode: '50100',
    addressCountry: 'TH',
  },
  telephone: '+66-82-808-7666',
  email: 'info@techthinkspace.com',
  areaServed: {
    '@type': 'Country',
    name: 'Thailand',
  },
  sameAs: [
    'https://www.facebook.com/techthinkspace',
    'https://www.linkedin.com/company/techthinkspace',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    telephone: '+66-82-808-7666',
    email: 'info@techthinkspace.com',
    availableLanguage: ['English', 'Thai'],
  },
  knowsAbout: [
    'Software Development',
    'Custom Software Development',
    'Web Application Development',
    'Mobile Application Development',
    'Enterprise Software',
    'Artificial Intelligence',
    'Data Science',
    'High-Performance Computing',
    'Simulation & Digital Engineering',
    'Cybersecurity',
    'Private AI',
    'Proxmox Virtualization',
  ],
}

// Per-branch LocalBusiness entries — the strongest on-page signal that we are a
// software/technology company physically in Chiang Mai and Hat Yai. Google uses
// these (alongside a Google Business Profile per city) for local-pack + local
// organic queries such as "บริษัทซอฟต์แวร์ในเชียงใหม่".
const localBusinessJsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${siteUrl}/#chiangmai`,
    name: 'ThinkSpace Technology — บริษัทซอฟต์แวร์และเทคโนโลยีในเชียงใหม่',
    image: `${siteUrl}/logo.png`,
    url: `${siteUrl}/th/software-chiang-mai`,
    telephone: '+66-82-808-7666',
    email: 'info@techthinkspace.com',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '211/141 Moo 2, Mae Hia',
      addressLocality: 'Muang Chiang Mai',
      addressRegion: 'Chiang Mai',
      postalCode: '50100',
      addressCountry: 'TH',
    },
    geo: { '@type': 'GeoCoordinates', latitude: 18.7669, longitude: 98.9459 },
    areaServed: [{ '@type': 'City', name: 'Chiang Mai' }, { '@type': 'City', name: 'เชียงใหม่' }],
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    knowsAbout: ['Software Development', 'Custom Software', 'Web & Mobile Apps', 'AI', 'Enterprise Software'],
    sameAs: ['https://www.facebook.com/techthinkspace', 'https://www.linkedin.com/company/techthinkspace'],
    parentOrganization: { '@type': 'Organization', name: 'Thinkspace Technology', url: siteUrl },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${siteUrl}/#hatyai`,
    name: 'ThinkSpace Technology — บริษัทซอฟต์แวร์และเทคโนโลยีในหาดใหญ่',
    image: `${siteUrl}/logo.png`,
    url: `${siteUrl}/th/software-hat-yai`,
    telephone: '+66-82-808-7666',
    email: 'info@techthinkspace.com',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '15 Navamin Village Soi 4, Punnakan-Tungdon Rd., Kho Hong',
      addressLocality: 'Hat Yai',
      addressRegion: 'Songkhla',
      postalCode: '90110',
      addressCountry: 'TH',
    },
    geo: { '@type': 'GeoCoordinates', latitude: 7.0075, longitude: 100.498 },
    areaServed: [{ '@type': 'City', name: 'Hat Yai' }, { '@type': 'City', name: 'หาดใหญ่' }, { '@type': 'City', name: 'Songkhla' }],
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    knowsAbout: ['Software Development', 'Custom Software', 'Web & Mobile Apps', 'AI', 'Enterprise Software'],
    sameAs: ['https://www.facebook.com/techthinkspace', 'https://www.linkedin.com/company/techthinkspace'],
    parentOrganization: { '@type': 'Organization', name: 'Thinkspace Technology', url: siteUrl },
  },
]

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
        {localBusinessJsonLd.map((biz) => (
          <script
            key={biz['@id']}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(biz) }}
          />
        ))}
      </head>
      <body className="min-h-screen bg-base-100" suppressHydrationWarning>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
