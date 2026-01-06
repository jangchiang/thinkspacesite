import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { locales, type Locale } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionary'

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

// Locale layout - simple passthrough, JSON-LD moved to root layout
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

  // Simply pass through children - JSON-LD will be added in root layout
  return <>{children}</>
}
