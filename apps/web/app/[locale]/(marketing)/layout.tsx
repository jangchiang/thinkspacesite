import { type Locale } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionary'
import { getServices, getContactInfo } from '@/lib/strapi'
import { Navbar } from '@/components/layouts/navbar'
import { Footer } from '@/components/layouts/footer'

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

  // Fetch dictionary, services, and contact info in parallel
  const [dict, strapiServices, contactInfo] = await Promise.all([
    getDictionary(locale),
    getServices(locale).catch(() => []) as Promise<StrapiService[]>,
    getContactInfo(locale).catch(() => null)
  ])

  // Transform services for navbar
  const services = (strapiServices || []).map((service) => ({
    name: service.title,
    href: `/${locale}/services/${service.slug}`,
  }))

  return (
    <>
      <Navbar locale={locale} dict={dict} services={services} />
      <main className="min-h-screen page-transition">{children}</main>
      <Footer locale={locale} dict={dict} contactInfo={contactInfo} />
    </>
  )
}
