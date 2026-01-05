import { Navbar } from '@/components/layouts/navbar'
import { Footer } from '@/components/layouts/footer'
import dict from '@/dictionaries/en.json'

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar locale="en" dict={dict} />
      <main className="min-h-screen">{children}</main>
      <Footer locale="en" dict={dict} />
    </>
  )
}
