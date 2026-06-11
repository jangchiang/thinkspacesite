import { type Locale } from '@/lib/i18n'
import type { Metadata } from 'next'
import { getLegalPage } from '@/lib/strapi'
import { MarkdownRenderer } from '@/components/markdown-renderer'

type Props = {
  params: Promise<{ locale: string }>
}

// Fallback content
const fallbackContent = {
  th: `## 1. ข้อมูลที่เราเก็บรวบรวม

เราเก็บรวบรวมข้อมูลที่คุณให้โดยตรง เช่น ชื่อ อีเมล และข้อมูลติดต่ออื่นๆ เมื่อคุณกรอกแบบฟอร์มติดต่อหรือสมัครรับข่าวสาร

## 2. การใช้ข้อมูล

เราใช้ข้อมูลที่เก็บรวบรวมเพื่อให้บริการ ปรับปรุงผลิตภัณฑ์ และสื่อสารกับคุณเกี่ยวกับบริการของเรา

## 3. การแบ่งปันข้อมูล

เราไม่ขายหรือให้เช่าข้อมูลส่วนบุคคลของคุณแก่บุคคลที่สาม เราอาจแบ่งปันข้อมูลกับผู้ให้บริการที่ช่วยเราดำเนินธุรกิจ

## 4. ความปลอดภัยของข้อมูล

เราใช้มาตรการรักษาความปลอดภัยที่เหมาะสมเพื่อปกป้องข้อมูลของคุณจากการเข้าถึงโดยไม่ได้รับอนุญาต

## 5. สิทธิ์ของคุณ

คุณมีสิทธิ์เข้าถึง แก้ไข หรือลบข้อมูลส่วนบุคคลของคุณ ติดต่อเราที่ info@techthinkspace.com

## 6. ติดต่อเรา

หากคุณมีคำถามเกี่ยวกับนโยบายความเป็นส่วนตัวนี้ กรุณาติดต่อเราที่ info@techthinkspace.com`,
  en: `## 1. Information We Collect

We collect information you provide directly, such as name, email, and other contact information when you fill out contact forms or subscribe to our newsletter.

## 2. How We Use Information

We use the information collected to provide services, improve our products, and communicate with you about our services.

## 3. Information Sharing

We do not sell or rent your personal information to third parties. We may share information with service providers who help us operate our business.

## 4. Data Security

We implement appropriate security measures to protect your information from unauthorized access.

## 5. Your Rights

You have the right to access, correct, or delete your personal information. Contact us at info@techthinkspace.com

## 6. Contact Us

If you have questions about this privacy policy, please contact us at info@techthinkspace.com`,
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params as { locale: Locale }
  const page = await getLegalPage('privacy-policy', locale)

  return {
    title: page?.title || (locale === 'th' ? 'นโยบายความเป็นส่วนตัว' : 'Privacy Policy'),
  }
}

export default async function PrivacyPage({ params }: Props): Promise<React.JSX.Element> {
  const { locale } = await params as { locale: Locale }
  const page = await getLegalPage('privacy-policy', locale)

  const title = page?.title || (locale === 'th' ? 'นโยบายความเป็นส่วนตัว' : 'Privacy Policy')
  const content = page?.content || (locale === 'th' ? fallbackContent.th : fallbackContent.en)
  const lastUpdated = page?.lastUpdated || '2024-01-01'

  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{title}</h1>
          <p className="text-base-content/70 mb-8">
            {locale === 'th' ? 'อัปเดตล่าสุด: ' : 'Last updated: '}
            {new Date(lastUpdated).toLocaleDateString(locale === 'th' ? 'th-TH' : 'en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
          <MarkdownRenderer content={content} />
        </div>
      </div>
    </section>
  )
}
