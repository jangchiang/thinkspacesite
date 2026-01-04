import { type Locale } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionary'
import { ContactForm } from '@/components/forms/contact-form'
import type { Metadata } from 'next'
import {
  ContactHero,
  ContactInfoSection,
} from '@/components/sections/contact-sections'
import { getPageHero } from '@/lib/strapi'
import { buildHeroBackground } from '@/lib/hero-utils'

type Props = {
  params: Promise<{ locale: Locale }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params

  return {
    title: locale === 'th' ? 'ติดต่อเรา' : 'Contact Us',
    description: locale === 'th'
      ? 'ติดต่อ Thinkspace Technology สำหรับคำปรึกษาด้านเทคโนโลยี'
      : 'Contact Thinkspace Technology for technology consulting',
  }
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params

  // Fetch hero and dictionary in parallel
  const [heroData, dict] = await Promise.all([
    getPageHero('contact', locale),
    getDictionary(locale)
  ])

  const heroBackground = buildHeroBackground(heroData)

  const contactInfo = [
    {
      iconName: 'Mail',
      label: locale === 'th' ? 'อีเมล' : 'Email',
      value: 'info@techthinkspace.com',
      href: 'mailto:info@techthinkspace.com',
    },
    {
      iconName: 'Phone',
      label: locale === 'th' ? 'โทรศัพท์' : 'Phone',
      value: '+66 082-808-7666',
      href: 'tel:+66828087666',
    },
    {
      iconName: 'MessageCircle',
      label: 'Line',
      value: '@techthinkspace',
      href: 'https://lin.ee/PYH3ViE',
    },
    {
      iconName: 'Clock',
      label: locale === 'th' ? 'เวลาทำการ' : 'Business Hours',
      value: locale === 'th'
        ? 'จันทร์ - ศุกร์: 9:00 - 18:00'
        : 'Mon - Fri: 9:00 AM - 6:00 PM',
      href: '#',
    },
  ]

  return (
    <>
      <ContactHero
        title={heroData?.title || (locale === 'th' ? 'ติดต่อเรา' : 'Contact Us')}
        description={
          heroData?.subtitle || (locale === 'th'
            ? 'มีคำถามหรือต้องการข้อมูลเพิ่มเติม? ทีมงานของเราพร้อมให้ความช่วยเหลือ'
            : 'Have questions or need more information? Our team is here to help.')
        }
        background={heroBackground}
      />

      <ContactInfoSection
        title={locale === 'th' ? 'ข้อมูลติดต่อ' : 'Get in Touch'}
        items={contactInfo}
        formTitle={locale === 'th' ? 'ส่งข้อความถึงเรา' : 'Send us a Message'}
      >
        <ContactForm locale={locale} />
      </ContactInfoSection>
    </>
  )
}
