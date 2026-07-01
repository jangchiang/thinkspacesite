import type { Metadata } from 'next'
import { CityLanding, cityMetadata, type CityLandingData } from '@/components/sections/city-landing'
import { type Locale } from '@/lib/i18n'

const CITY: CityLandingData = { slug: 'software-hat-yai', cityEn: 'Hat Yai', cityTh: 'หาดใหญ่', anchor: 'hatyai' }

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale }
  return cityMetadata(CITY, locale)
}

export default async function Page({ params }: Props): Promise<React.JSX.Element> {
  const { locale } = (await params) as { locale: Locale }
  return <CityLanding city={CITY} locale={locale} />
}
