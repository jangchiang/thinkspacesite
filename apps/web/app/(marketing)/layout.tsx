import { Navbar } from '@/components/layouts/navbar'
import { Footer } from '@/components/layouts/footer'
import { getSiteSettings } from '@/lib/strapi'
import dict from '@/dictionaries/en.json'

// Force dynamic rendering - don't try to fetch from Strapi during build
export const dynamic = 'force-dynamic'

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}): Promise<React.JSX.Element> {
  // Fetch site settings from Strapi
  const siteSettings = await getSiteSettings('en')
  const footerCompanyName = siteSettings?.footerCompanyName || 'Thinkspace Technology'
  const copyrightText = siteSettings?.copyrightText

  return (
    <>
      <Navbar locale="en" dict={dict} />
      <main className="min-h-screen">{children}</main>
      <Footer locale="en" dict={dict} companyName={footerCompanyName} copyrightText={copyrightText} />
    </>
  )
}
