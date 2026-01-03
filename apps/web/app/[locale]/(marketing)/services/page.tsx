import { type Locale } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionary'
import { ServicesPageContent } from '@/components/sections/services-sections'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ locale: Locale }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params

  return {
    title: locale === 'th' ? 'บริการของเรา' : 'Our Services',
    description: locale === 'th'
      ? 'บริการเทคโนโลยีครบวงจรจาก Thinkspace Technology'
      : 'Comprehensive technology services from Thinkspace Technology',
  }
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params
  const dict = await getDictionary(locale)

  return <ServicesPageContent locale={locale} dict={dict} />
}
