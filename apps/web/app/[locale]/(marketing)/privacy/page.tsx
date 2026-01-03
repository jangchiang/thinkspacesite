import { type Locale } from '@/lib/i18n'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ locale: Locale }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return {
    title: locale === 'th' ? 'นโยบายความเป็นส่วนตัว' : 'Privacy Policy',
  }
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params

  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto prose prose-lg">
          <h1>{locale === 'th' ? 'นโยบายความเป็นส่วนตัว' : 'Privacy Policy'}</h1>
          <p className="text-base-content/70">
            {locale === 'th' ? 'อัปเดตล่าสุด: มกราคม 2024' : 'Last updated: January 2024'}
          </p>

          <h2>{locale === 'th' ? '1. ข้อมูลที่เราเก็บรวบรวม' : '1. Information We Collect'}</h2>
          <p>
            {locale === 'th'
              ? 'เราเก็บรวบรวมข้อมูลที่คุณให้โดยตรง เช่น ชื่อ อีเมล และข้อมูลติดต่ออื่นๆ เมื่อคุณกรอกแบบฟอร์มติดต่อหรือสมัครรับข่าวสาร'
              : 'We collect information you provide directly, such as name, email, and other contact information when you fill out contact forms or subscribe to our newsletter.'}
          </p>

          <h2>{locale === 'th' ? '2. การใช้ข้อมูล' : '2. How We Use Information'}</h2>
          <p>
            {locale === 'th'
              ? 'เราใช้ข้อมูลที่เก็บรวบรวมเพื่อให้บริการ ปรับปรุงผลิตภัณฑ์ และสื่อสารกับคุณเกี่ยวกับบริการของเรา'
              : 'We use the information collected to provide services, improve our products, and communicate with you about our services.'}
          </p>

          <h2>{locale === 'th' ? '3. การแบ่งปันข้อมูล' : '3. Information Sharing'}</h2>
          <p>
            {locale === 'th'
              ? 'เราไม่ขายหรือให้เช่าข้อมูลส่วนบุคคลของคุณแก่บุคคลที่สาม เราอาจแบ่งปันข้อมูลกับผู้ให้บริการที่ช่วยเราดำเนินธุรกิจ'
              : 'We do not sell or rent your personal information to third parties. We may share information with service providers who help us operate our business.'}
          </p>

          <h2>{locale === 'th' ? '4. ความปลอดภัยของข้อมูล' : '4. Data Security'}</h2>
          <p>
            {locale === 'th'
              ? 'เราใช้มาตรการรักษาความปลอดภัยที่เหมาะสมเพื่อปกป้องข้อมูลของคุณจากการเข้าถึงโดยไม่ได้รับอนุญาต'
              : 'We implement appropriate security measures to protect your information from unauthorized access.'}
          </p>

          <h2>{locale === 'th' ? '5. สิทธิ์ของคุณ' : '5. Your Rights'}</h2>
          <p>
            {locale === 'th'
              ? 'คุณมีสิทธิ์เข้าถึง แก้ไข หรือลบข้อมูลส่วนบุคคลของคุณ ติดต่อเราที่ privacy@thinkspace.com'
              : 'You have the right to access, correct, or delete your personal information. Contact us at privacy@thinkspace.com'}
          </p>

          <h2>{locale === 'th' ? '6. ติดต่อเรา' : '6. Contact Us'}</h2>
          <p>
            {locale === 'th'
              ? 'หากคุณมีคำถามเกี่ยวกับนโยบายความเป็นส่วนตัวนี้ กรุณาติดต่อเราที่ privacy@thinkspace.com'
              : 'If you have questions about this privacy policy, please contact us at privacy@thinkspace.com'}
          </p>
        </div>
      </div>
    </section>
  )
}
