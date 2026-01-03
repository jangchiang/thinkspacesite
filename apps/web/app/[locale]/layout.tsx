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
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thinkspace.com'

  return {
    title: {
      default: dict.metadata.title,
      template: `%s | Think Space`,
    },
    description: dict.metadata.description,
    keywords: [
      'enterprise technology',
      'IT consulting',
      'cloud services',
      'managed services',
      'cybersecurity',
      'digital transformation',
      locale === 'th' ? 'เทคโนโลยีองค์กร' : '',
      locale === 'th' ? 'บริการคลาวด์' : '',
    ].filter(Boolean),
    authors: [{ name: 'Think Space' }],
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: '/en',
        th: '/th',
      },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'th' ? 'th_TH' : 'en_US',
      url: siteUrl,
      siteName: 'Think Space',
      title: dict.metadata.title,
      description: dict.metadata.description,
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Think Space - Enterprise Technology Solutions',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.metadata.title,
      description: dict.metadata.description,
      images: ['/og-image.jpg'],
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
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params

  if (!locales.includes(locale)) {
    notFound()
  }

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
        <link rel="alternate" hrefLang="en" href="/en" />
        <link rel="alternate" hrefLang="th" href="/th" />
        <link rel="alternate" hrefLang="x-default" href="/en" />
      </head>
      <body className="min-h-screen bg-base-100" suppressHydrationWarning>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
