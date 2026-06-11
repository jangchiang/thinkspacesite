import { type Locale } from '@/lib/i18n'
import { ContactForm } from '@/components/forms/contact-form'
import type { Metadata } from 'next'
import {
  ContactHero,
  ContactInfoSection,
} from '@/components/sections/contact-sections'
import { getPageHero, getContactInfo } from '@/lib/strapi'
import { buildHeroBackground } from '@/lib/hero-utils'

type Props = {
  params: Promise<{ locale: Locale }>
}

// Fallback contact info
const fallbackContactInfo = {
  email: 'info@techthinkspace.com',
  phone: '082-808-7666 / +66 28087666',
  lineId: '@techthinkspace',
  lineUrl: 'https://lin.ee/PYH3ViE',
  location: {
    th: 'เชียงใหม่ ประเทศไทย',
    en: 'Chiang Mai, Thailand',
  },
  workingHours: {
    th: 'จันทร์ - ศุกร์: 9:00 - 18:00',
    en: 'Mon - Fri: 9:00 AM - 6:00 PM',
  },
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

export default async function ContactPage({ params }: Props): Promise<React.JSX.Element> {
  const { locale } = await params

  // Fetch hero and contact info in parallel
  const [heroData, strapiContactInfo] = await Promise.all([
    getPageHero('contact', locale),
    getContactInfo(locale),
  ])

  const heroBackground = buildHeroBackground(heroData)

  // Use Strapi data or fallback
  const email = strapiContactInfo?.email || fallbackContactInfo.email
  const phone = strapiContactInfo?.phone || fallbackContactInfo.phone
  const lineId = strapiContactInfo?.lineId || fallbackContactInfo.lineId
  const workingHours = strapiContactInfo?.workingHours || (locale === 'th' ? fallbackContactInfo.workingHours.th : fallbackContactInfo.workingHours.en)
  const location = locale === 'th' ? fallbackContactInfo.location.th : fallbackContactInfo.location.en
  // Use the first phone number for the tel: link
  const primaryPhone = phone.split('/')[0].trim()

  const contactInfo = [
    {
      iconName: 'Mail',
      label: locale === 'th' ? 'อีเมล' : 'Email',
      value: email,
      href: `mailto:${email}`,
    },
    {
      iconName: 'Phone',
      label: locale === 'th' ? 'โทรศัพท์' : 'Phone',
      value: phone,
      href: `tel:${primaryPhone.replace(/[\s-]/g, '')}`,
    },
    {
      iconName: 'MessageCircle',
      label: 'Line',
      value: lineId,
      href: fallbackContactInfo.lineUrl,
    },
    {
      iconName: 'MapPin',
      label: locale === 'th' ? 'ที่ตั้ง' : 'Location',
      value: location,
      href: '#',
    },
    {
      iconName: 'Clock',
      label: locale === 'th' ? 'เวลาทำการ' : 'Business Hours',
      value: workingHours,
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
