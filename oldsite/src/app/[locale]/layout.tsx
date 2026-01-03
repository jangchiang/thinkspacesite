// src/app/[locale]/layout.tsx
import { Navbar } from '@/components/common/navigation/Navbar'
import { Footer } from '@/components/layout/Footer'

type Props = {
  children: React.ReactNode
  params: { locale: string }
}

export default async function LocaleLayout({ children, params }: Props) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}