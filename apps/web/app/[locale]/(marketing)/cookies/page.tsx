import { type Locale } from '@/lib/i18n'
import type { Metadata } from 'next'
import { getLegalPage } from '@/lib/strapi'
import { MarkdownRenderer } from '@/components/markdown-renderer'

type Props = {
  params: Promise<{ locale: Locale }>
}

// Fallback content
const fallbackContent = {
  th: `## 1. คุกกี้คืออะไร

คุกกี้คือไฟล์ข้อความขนาดเล็กที่จัดเก็บบนอุปกรณ์ของคุณเมื่อคุณเยี่ยมชมเว็บไซต์

## 2. คุกกี้ที่เราใช้

- **คุกกี้ที่จำเป็น**: จำเป็นสำหรับการทำงานของเว็บไซต์
- **คุกกี้วิเคราะห์**: ช่วยเราเข้าใจว่าผู้เยี่ยมชมใช้เว็บไซต์อย่างไร
- **คุกกี้การตลาด**: ใช้เพื่อแสดงโฆษณาที่เกี่ยวข้อง

## 3. การจัดการคุกกี้

คุณสามารถควบคุมและลบคุกกี้ผ่านการตั้งค่าเบราว์เซอร์ของคุณ

## 4. ติดต่อเรา

หากคุณมีคำถามเกี่ยวกับนโยบายคุกกี้ กรุณาติดต่อเราที่ info@techthinkspace.com`,
  en: `## 1. What Are Cookies

Cookies are small text files stored on your device when you visit a website.

## 2. Types of Cookies We Use

- **Essential Cookies**: Required for website functionality
- **Analytics Cookies**: Help us understand how visitors use our website
- **Marketing Cookies**: Used to display relevant advertisements

## 3. Managing Cookies

You can control and delete cookies through your browser settings.

## 4. Contact Us

If you have questions about our cookie policy, please contact us at info@techthinkspace.com`,
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const page = await getLegalPage('cookie-policy', locale)

  return {
    title: page?.title || (locale === 'th' ? 'นโยบายคุกกี้' : 'Cookie Policy'),
  }
}

export default async function CookiesPage({ params }: Props) {
  const { locale } = await params
  const page = await getLegalPage('cookie-policy', locale)

  const title = page?.title || (locale === 'th' ? 'นโยบายคุกกี้' : 'Cookie Policy')
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
