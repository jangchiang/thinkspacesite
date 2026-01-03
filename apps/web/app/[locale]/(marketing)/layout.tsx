import { type Locale } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionary'
import { Navbar } from '@/components/layouts/navbar'
import { Footer } from '@/components/layouts/footer'

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: Locale }>
}

export default async function MarketingLayout({ children, params }: Props) {
  const { locale } = await params
  const dict = await getDictionary(locale)

  return (
    <>
      <Navbar locale={locale} dict={dict} />
      <main className="min-h-screen">{children}</main>
      <Footer locale={locale} dict={dict} />
    </>
  )
}
