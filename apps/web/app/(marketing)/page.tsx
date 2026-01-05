import { HeroSection } from '@/components/sections/hero'
import { ServicesSection } from '@/components/sections/services'
import { StatsSection } from '@/components/sections/stats'
import { CTASection } from '@/components/sections/cta'
import dict from '@/dictionaries/en.json'

export default function HomePage() {
  return (
    <>
      <HeroSection dict={dict} locale="en" />
      <ServicesSection dict={dict} locale="en" />
      <StatsSection />
      <CTASection dict={dict} locale="en" />
    </>
  )
}
