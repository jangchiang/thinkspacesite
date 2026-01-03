import { type Locale } from '@/lib/i18n'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ locale: Locale }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return {
    title: locale === 'th' ? 'นโยบายคุกกี้' : 'Cookie Policy',
  }
}

export default async function CookiesPage({ params }: Props) {
  const { locale } = await params

  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto prose prose-lg">
          <h1>{locale === 'th' ? 'นโยบายคุกกี้' : 'Cookie Policy'}</h1>
          <p className="text-base-content/70">
            {locale === 'th' ? 'อัปเดตล่าสุด: มกราคม 2024' : 'Last updated: January 2024'}
          </p>

          <h2>{locale === 'th' ? '1. คุกกี้คืออะไร' : '1. What Are Cookies'}</h2>
          <p>
            {locale === 'th'
              ? 'คุกกี้คือไฟล์ข้อความขนาดเล็กที่จัดเก็บบนอุปกรณ์ของคุณเมื่อคุณเยี่ยมชมเว็บไซต์'
              : 'Cookies are small text files stored on your device when you visit a website.'}
          </p>

          <h2>{locale === 'th' ? '2. คุกกี้ที่เราใช้' : '2. Types of Cookies We Use'}</h2>
          <ul>
            <li>
              <strong>{locale === 'th' ? 'คุกกี้ที่จำเป็น' : 'Essential Cookies'}</strong>:{' '}
              {locale === 'th'
                ? 'จำเป็นสำหรับการทำงานของเว็บไซต์'
                : 'Required for website functionality'}
            </li>
            <li>
              <strong>{locale === 'th' ? 'คุกกี้วิเคราะห์' : 'Analytics Cookies'}</strong>:{' '}
              {locale === 'th'
                ? 'ช่วยเราเข้าใจว่าผู้เยี่ยมชมใช้เว็บไซต์อย่างไร'
                : 'Help us understand how visitors use our website'}
            </li>
            <li>
              <strong>{locale === 'th' ? 'คุกกี้การตลาด' : 'Marketing Cookies'}</strong>:{' '}
              {locale === 'th'
                ? 'ใช้เพื่อแสดงโฆษณาที่เกี่ยวข้อง'
                : 'Used to display relevant advertisements'}
            </li>
          </ul>

          <h2>{locale === 'th' ? '3. การจัดการคุกกี้' : '3. Managing Cookies'}</h2>
          <p>
            {locale === 'th'
              ? 'คุณสามารถควบคุมและลบคุกกี้ผ่านการตั้งค่าเบราว์เซอร์ของคุณ'
              : 'You can control and delete cookies through your browser settings.'}
          </p>

          <h2>{locale === 'th' ? '4. ติดต่อเรา' : '4. Contact Us'}</h2>
          <p>
            {locale === 'th'
              ? 'หากคุณมีคำถามเกี่ยวกับนโยบายคุกกี้ กรุณาติดต่อเราที่ privacy@thinkspace.com'
              : 'If you have questions about our cookie policy, please contact us at privacy@thinkspace.com'}
          </p>
        </div>
      </div>
    </section>
  )
}
