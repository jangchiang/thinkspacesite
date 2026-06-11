import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { locales, type Locale } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionary'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params as { locale: Locale }
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
      'AI solutions',
      'data science',
      'high-performance computing',
      'simulation',
      'digital engineering',
      'cybersecurity',
      'software development',
      'Logix AI platform',
      'Proxmox reseller Thailand',
      // Location keywords
      'Thailand',
      'Chiang Mai',
      // Thai keywords
      locale === 'th' ? 'บริษัท ธิงค์สเปซ เทคโนโลยี' : '',
      locale === 'th' ? 'ปัญญาประดิษฐ์' : '',
      locale === 'th' ? 'วิทยาการข้อมูล' : '',
      locale === 'th' ? 'การประมวลผลสมรรถนะสูง' : '',
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
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.metadata.title,
      description: dict.metadata.description,
      site: '@techthinkspace',
      creator: '@techthinkspace',
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
  params: Promise<{ locale: string }>
}): Promise<React.JSX.Element> {
  const { locale } = await params as { locale: Locale }

  if (!locales.includes(locale)) {
    notFound()
  }

  // Simply pass through children - JSON-LD will be added in root layout
  return <>{children}</>
}
