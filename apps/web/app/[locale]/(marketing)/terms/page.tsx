import { type Locale } from '@/lib/i18n'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ locale: Locale }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return {
    title: locale === 'th' ? 'ข้อกำหนดการใช้งาน' : 'Terms of Service',
  }
}

export default async function TermsPage({ params }: Props) {
  const { locale } = await params

  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto prose prose-lg">
          <h1>{locale === 'th' ? 'ข้อกำหนดการใช้งาน' : 'Terms of Service'}</h1>
          <p className="text-base-content/70">
            {locale === 'th' ? 'อัปเดตล่าสุด: มกราคม 2024' : 'Last updated: January 2024'}
          </p>

          <h2>{locale === 'th' ? '1. การยอมรับข้อกำหนด' : '1. Acceptance of Terms'}</h2>
          <p>
            {locale === 'th'
              ? 'การใช้งานเว็บไซต์และบริการของเราถือว่าคุณยอมรับข้อกำหนดเหล่านี้'
              : 'By using our website and services, you agree to these terms.'}
          </p>

          <h2>{locale === 'th' ? '2. บริการของเรา' : '2. Our Services'}</h2>
          <p>
            {locale === 'th'
              ? 'Think Space ให้บริการด้านเทคโนโลยีสารสนเทศรวมถึง Cloud, Security, Data & AI และบริการจัดการ'
              : 'Think Space provides IT services including Cloud, Security, Data & AI, and Managed Services.'}
          </p>

          <h2>{locale === 'th' ? '3. การใช้งาน' : '3. Use of Services'}</h2>
          <p>
            {locale === 'th'
              ? 'คุณตกลงที่จะใช้บริการของเราเพื่อวัตถุประสงค์ที่ถูกกฎหมายเท่านั้น'
              : 'You agree to use our services only for lawful purposes.'}
          </p>

          <h2>{locale === 'th' ? '4. ทรัพย์สินทางปัญญา' : '4. Intellectual Property'}</h2>
          <p>
            {locale === 'th'
              ? 'เนื้อหาทั้งหมดบนเว็บไซต์นี้เป็นทรัพย์สินของ Think Space และได้รับการคุ้มครองตามกฎหมาย'
              : 'All content on this website is the property of Think Space and is protected by law.'}
          </p>

          <h2>{locale === 'th' ? '5. ข้อจำกัดความรับผิดชอบ' : '5. Limitation of Liability'}</h2>
          <p>
            {locale === 'th'
              ? 'Think Space จะไม่รับผิดชอบต่อความเสียหายใดๆ ที่เกิดจากการใช้บริการของเรา'
              : 'Think Space shall not be liable for any damages arising from the use of our services.'}
          </p>

          <h2>{locale === 'th' ? '6. การเปลี่ยนแปลงข้อกำหนด' : '6. Changes to Terms'}</h2>
          <p>
            {locale === 'th'
              ? 'เราอาจปรับปรุงข้อกำหนดเหล่านี้เป็นครั้งคราว การใช้งานต่อไปถือว่าคุณยอมรับการเปลี่ยนแปลง'
              : 'We may update these terms from time to time. Continued use constitutes acceptance of changes.'}
          </p>
        </div>
      </div>
    </section>
  )
}
