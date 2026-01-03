import { type Locale } from '@/lib/i18n'
import Link from 'next/link'
import { ArrowRight, Building2, TrendingUp } from 'lucide-react'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ locale: Locale }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params

  return {
    title: locale === 'th' ? 'กรณีศึกษา' : 'Case Studies',
    description: locale === 'th'
      ? 'เรื่องราวความสำเร็จจากลูกค้าของ Think Space'
      : 'Success stories from Think Space clients',
  }
}

export default async function CaseStudiesPage({ params }: Props) {
  const { locale } = await params

  const caseStudies = [
    {
      slug: 'fintech-cloud-migration',
      client: 'FinTech Corp',
      industry: locale === 'th' ? 'การเงิน' : 'Financial Services',
      title: locale === 'th' ? 'การย้ายระบบสู่คลาวด์สำหรับ FinTech' : 'Cloud Migration for FinTech',
      challenge: locale === 'th'
        ? 'ระบบเก่าไม่สามารถรองรับการเติบโตของธุรกิจ'
        : 'Legacy systems unable to support business growth',
      result: '60%',
      resultLabel: locale === 'th' ? 'ลดค่าใช้จ่าย IT' : 'IT Cost Reduction',
    },
    {
      slug: 'retail-digital-transformation',
      client: 'RetailMax',
      industry: locale === 'th' ? 'ค้าปลีก' : 'Retail',
      title: locale === 'th' ? 'การเปลี่ยนแปลงดิจิทัลสำหรับค้าปลีก' : 'Digital Transformation for Retail',
      challenge: locale === 'th'
        ? 'ต้องการเชื่อมต่อช่องทางออนไลน์และออฟไลน์'
        : 'Need to connect online and offline channels',
      result: '3x',
      resultLabel: locale === 'th' ? 'เพิ่มยอดขายออนไลน์' : 'Online Sales Increase',
    },
    {
      slug: 'healthcare-security',
      client: 'MediCare Plus',
      industry: locale === 'th' ? 'สุขภาพ' : 'Healthcare',
      title: locale === 'th' ? 'ความปลอดภัยข้อมูลสุขภาพ' : 'Healthcare Data Security',
      challenge: locale === 'th'
        ? 'ปฏิบัติตามข้อกำหนด HIPAA และรักษาความปลอดภัยข้อมูล'
        : 'HIPAA compliance and data security',
      result: '100%',
      resultLabel: locale === 'th' ? 'ปฏิบัติตามข้อกำหนด' : 'Compliance Achieved',
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-base-100 to-primary/5">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {locale === 'th' ? 'กรณีศึกษา' : 'Case Studies'}
            </h1>
            <p className="text-lg md:text-xl text-base-content/70">
              {locale === 'th'
                ? 'ดูว่าเราช่วยลูกค้าประสบความสำเร็จได้อย่างไร'
                : 'See how we help our clients succeed'}
            </p>
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="space-y-8">
            {caseStudies.map((study) => (
              <div key={study.slug} className="card bg-base-100 shadow-lg lg:card-side">
                <div className="lg:w-1/3 bg-base-200 flex items-center justify-center p-8">
                  <div className="text-center">
                    <Building2 className="w-16 h-16 text-primary mx-auto mb-4" />
                    <p className="font-bold text-lg">{study.client}</p>
                    <p className="text-sm text-base-content/60">{study.industry}</p>
                  </div>
                </div>
                <div className="card-body lg:w-2/3">
                  <h2 className="card-title text-2xl">{study.title}</h2>
                  <p className="text-base-content/70 mb-4">
                    <strong>{locale === 'th' ? 'ความท้าทาย: ' : 'Challenge: '}</strong>
                    {study.challenge}
                  </p>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-lg">
                      <TrendingUp className="w-5 h-5" />
                      <span className="font-bold text-2xl">{study.result}</span>
                    </div>
                    <span className="text-base-content/70">{study.resultLabel}</span>
                  </div>
                  <div className="card-actions">
                    <Link
                      href={`/${locale}/case-studies/${study.slug}`}
                      className="btn btn-primary"
                    >
                      {locale === 'th' ? 'อ่านกรณีศึกษา' : 'Read Case Study'}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-base-200">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              {locale === 'th' ? 'พร้อมที่จะเป็นเรื่องราวความสำเร็จถัดไป?' : 'Ready to Be Our Next Success Story?'}
            </h2>
            <p className="text-base-content/70 mb-8">
              {locale === 'th'
                ? 'ติดต่อเราเพื่อพูดคุยเกี่ยวกับโครงการของคุณ'
                : 'Contact us to discuss your project'}
            </p>
            <Link href={`/${locale}/contact`} className="btn btn-primary btn-lg">
              {locale === 'th' ? 'เริ่มต้นวันนี้' : 'Get Started Today'}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
