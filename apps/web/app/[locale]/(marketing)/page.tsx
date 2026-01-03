import { type Locale } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionary'
import { HeroSection } from '@/components/sections/hero'
import { ServicesSection } from '@/components/sections/services'
import { StatsSection } from '@/components/sections/stats'
import { CTASection } from '@/components/sections/cta'

type Props = {
  params: Promise<{ locale: Locale }>
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  const dict = await getDictionary(locale)

  return (
    <>
      <HeroSection dict={dict} locale={locale} />
      <ServicesSection dict={dict} locale={locale} />
      <StatsSection dict={dict} />
      <CTASection dict={dict} locale={locale} />
    </>
  )
}
