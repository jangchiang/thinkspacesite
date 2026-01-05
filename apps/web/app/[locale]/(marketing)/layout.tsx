import { type Locale } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionary'
import { getServices, getContactInfo, getSiteSettings } from '@/lib/strapi'
import { Navbar } from '@/components/layouts/navbar'
import { Footer } from '@/components/layouts/footer'

// Force dynamic rendering - don't try to fetch from Strapi during build
export const dynamic = 'force-dynamic'

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: Locale }>
}

interface StrapiService {
  id: number
  documentId: string
  title: string
  slug: string
  shortDescription?: string
}

export default async function MarketingLayout({ children, params }: Props) {
  const { locale } = await params

  // Fetch dictionary, services, contact info, and site settings in parallel
  const [dict, strapiServices, contactInfo, siteSettings] = await Promise.all([
    getDictionary(locale),
    getServices(locale).catch(() => []) as Promise<StrapiService[]>,
    getContactInfo(locale).catch(() => null),
    getSiteSettings(locale).catch(() => null)
  ])

  const headerCompanyName = siteSettings?.headerCompanyName || 'Thinkspace Technology'
  const footerCompanyName = siteSettings?.footerCompanyName || 'Thinkspace Technology'
  const copyrightText = siteSettings?.copyrightText

  // Transform services for navbar
  const services = (strapiServices || []).map((service) => ({
    name: service.title,
    href: `/${locale}/services/${service.slug}`,
  }))

  return (
    <>
      <Navbar locale={locale} dict={dict} services={services} companyName={headerCompanyName} />
      <main className="min-h-screen page-transition">{children}</main>
      <Footer locale={locale} dict={dict} contactInfo={contactInfo} companyName={footerCompanyName} copyrightText={copyrightText} />
    </>
  )
}
