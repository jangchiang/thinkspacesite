import { type Locale } from '@/lib/i18n'
import type { Metadata } from 'next'
import { getLegalPage } from '@/lib/strapi'
import { MarkdownRenderer } from '@/components/markdown-renderer'

type Props = {
  params: Promise<{ locale: Locale }>
}

// Fallback content
const fallbackContent = {
  th: `## 1. การยอมรับข้อกำหนด

การใช้งานเว็บไซต์และบริการของเราถือว่าคุณยอมรับข้อกำหนดเหล่านี้

## 2. บริการของเรา

Think Space ให้บริการด้านเทคโนโลยีสารสนเทศรวมถึง Cloud, Security, Data & AI และบริการจัดการ

## 3. การใช้งาน

คุณตกลงที่จะใช้บริการของเราเพื่อวัตถุประสงค์ที่ถูกกฎหมายเท่านั้น

## 4. ทรัพย์สินทางปัญญา

เนื้อหาทั้งหมดบนเว็บไซต์นี้เป็นทรัพย์สินของ Think Space และได้รับการคุ้มครองตามกฎหมาย

## 5. ข้อจำกัดความรับผิดชอบ

Think Space จะไม่รับผิดชอบต่อความเสียหายใดๆ ที่เกิดจากการใช้บริการของเรา

## 6. การเปลี่ยนแปลงข้อกำหนด

เราอาจปรับปรุงข้อกำหนดเหล่านี้เป็นครั้งคราว การใช้งานต่อไปถือว่าคุณยอมรับการเปลี่ยนแปลง`,
  en: `## 1. Acceptance of Terms

By using our website and services, you agree to these terms.

## 2. Our Services

Think Space provides IT services including Cloud, Security, Data & AI, and Managed Services.

## 3. Use of Services

You agree to use our services only for lawful purposes.

## 4. Intellectual Property

All content on this website is the property of Think Space and is protected by law.

## 5. Limitation of Liability

Think Space shall not be liable for any damages arising from the use of our services.

## 6. Changes to Terms

We may update these terms from time to time. Continued use constitutes acceptance of changes.`,
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const page = await getLegalPage('terms-of-service', locale)

  return {
    title: page?.title || (locale === 'th' ? 'ข้อกำหนดการใช้งาน' : 'Terms of Service'),
  }
}

export default async function TermsPage({ params }: Props): Promise<React.JSX.Element> {
  const { locale } = await params
  const page = await getLegalPage('terms-of-service', locale)

  const title = page?.title || (locale === 'th' ? 'ข้อกำหนดการใช้งาน' : 'Terms of Service')
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
