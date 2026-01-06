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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}): React.JSX.Element {
  return (
    <html lang="en" data-theme="thinkspace" className={`${inter.variable} ${kanit.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-base-100" suppressHydrationWarning>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
