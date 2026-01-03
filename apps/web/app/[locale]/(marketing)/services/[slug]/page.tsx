import { type Locale } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionary'
import Link from 'next/link'
import { Cloud, Shield, Database, Code, BarChart, Server, FlaskConical, Check, ArrowRight } from 'lucide-react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ locale: Locale; slug: string }>
}

const serviceData: Record<string, {
  icon: typeof Cloud
  key: string
  color: string
  features: { en: string; th: string }[]
}> = {
  cloud: {
    icon: Cloud,
    key: 'cloud',
    color: 'bg-blue-500',
    features: [
      { en: 'Cloud Migration & Strategy', th: 'การย้ายและกลยุทธ์คลาวด์' },
      { en: 'Multi-cloud Management', th: 'การจัดการมัลติคลาวด์' },
      { en: 'Cloud Security', th: 'ความปลอดภัยคลาวด์' },
      { en: 'Cost Optimization', th: 'การเพิ่มประสิทธิภาพค่าใช้จ่าย' },
      { en: 'DevOps & Automation', th: 'DevOps และระบบอัตโนมัติ' },
    ],
  },
  software: {
    icon: Code,
    key: 'software',
    color: 'bg-green-500',
    features: [
      { en: 'Custom Software Development', th: 'พัฒนาซอฟต์แวร์ตามความต้องการ' },
      { en: 'SaaS Development', th: 'พัฒนา SaaS' },
      { en: 'Web & Mobile Applications', th: 'แอปพลิเคชันเว็บและมือถือ' },
      { en: 'API Development & Integration', th: 'พัฒนาและเชื่อมต่อ API' },
      { en: 'Legacy System Modernization', th: 'ปรับปรุงระบบเก่า' },
    ],
  },
  'hpc-ai': {
    icon: Server,
    key: 'hpc',
    color: 'bg-indigo-500',
    features: [
      { en: 'HPC Infrastructure Design', th: 'ออกแบบโครงสร้าง HPC' },
      { en: 'GPU Cluster Management', th: 'จัดการ GPU Cluster' },
      { en: 'AI/ML Training Infrastructure', th: 'โครงสร้างสำหรับ AI/ML Training' },
      { en: 'Performance Optimization', th: 'เพิ่มประสิทธิภาพระบบ' },
      { en: 'Scientific Computing', th: 'การประมวลผลทางวิทยาศาสตร์' },
    ],
  },
  'ai-datascience': {
    icon: Database,
    key: 'dataAi',
    color: 'bg-purple-500',
    features: [
      { en: 'Data Analytics & BI', th: 'การวิเคราะห์ข้อมูลและ BI' },
      { en: 'Machine Learning Solutions', th: 'โซลูชัน Machine Learning' },
      { en: 'Data Engineering', th: 'วิศวกรรมข้อมูล' },
      { en: 'AI Integration', th: 'การรวม AI เข้ากับระบบ' },
      { en: 'Predictive Analytics', th: 'การวิเคราะห์เชิงคาดการณ์' },
    ],
  },
  cybersecurity: {
    icon: Shield,
    key: 'security',
    color: 'bg-red-500',
    features: [
      { en: 'Security Assessment & Audit', th: 'การประเมินและตรวจสอบความปลอดภัย' },
      { en: 'Threat Detection & Response', th: 'การตรวจจับและตอบสนองภัยคุกคาม' },
      { en: 'Identity & Access Management', th: 'การจัดการตัวตนและสิทธิ์' },
      { en: 'Compliance & Governance', th: 'การปฏิบัติตามข้อกำหนด' },
      { en: 'Security Training', th: 'การฝึกอบรมด้านความปลอดภัย' },
    ],
  },
  consulting: {
    icon: BarChart,
    key: 'consulting',
    color: 'bg-orange-500',
    features: [
      { en: 'Digital Transformation', th: 'การเปลี่ยนแปลงดิจิทัล' },
      { en: 'IT Strategy & Planning', th: 'กลยุทธ์และการวางแผน IT' },
      { en: 'Process Optimization', th: 'การเพิ่มประสิทธิภาพกระบวนการ' },
      { en: 'Technology Assessment', th: 'การประเมินเทคโนโลยี' },
      { en: 'Change Management', th: 'การจัดการการเปลี่ยนแปลง' },
    ],
  },
  research: {
    icon: FlaskConical,
    key: 'research',
    color: 'bg-teal-500',
    features: [
      { en: 'Academic Research Collaboration', th: 'ความร่วมมือวิจัยเชิงวิชาการ' },
      { en: 'Enterprise R&D', th: 'วิจัยและพัฒนาสำหรับองค์กร' },
      { en: 'Prototype Development', th: 'พัฒนาต้นแบบ' },
      { en: 'Technology Transfer', th: 'การถ่ายทอดเทคโนโลยี' },
      { en: 'Innovation Consulting', th: 'ที่ปรึกษาด้านนวัตกรรม' },
    ],
  },
}

export async function generateStaticParams() {
  return Object.keys(serviceData).flatMap((slug) => [
    { locale: 'en', slug },
    { locale: 'th', slug },
  ])
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const service = serviceData[slug]

  if (!service) return { title: 'Service Not Found' }

  const dict = await getDictionary(locale)
  const title = dict.services?.[service.key]?.title || slug

  return {
    title,
    description: dict.services?.[service.key]?.description || '',
  }
}

export default async function ServiceDetailPage({ params }: Props) {
  const { locale, slug } = await params
  const service = serviceData[slug]

  if (!service) {
    notFound()
  }

  const dict = await getDictionary(locale)
  const Icon = service.icon

  return (
    <>
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-base-100 to-primary/5">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <div className={`w-20 h-20 ${service.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
              <Icon className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {dict.services?.[service.key]?.title || slug}
            </h1>
            <p className="text-lg md:text-xl text-base-content/70">
              {dict.services?.[service.key]?.description || ''}
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                {locale === 'th' ? 'สิ่งที่เรานำเสนอ' : 'What We Offer'}
              </h2>
              <ul className="space-y-4">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-lg">
                      {locale === 'th' ? feature.th : feature.en}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-base-200 rounded-2xl aspect-video flex items-center justify-center">
              <p className="text-base-content/50">
                {locale === 'th' ? 'รูปภาพบริการ' : 'Service Image'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding bg-base-200">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">
            {locale === 'th' ? 'ทำไมต้องเลือกเรา' : 'Why Choose Us'}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: locale === 'th' ? 'ทีมผู้เชี่ยวชาญ' : 'Expert Team',
                desc: locale === 'th'
                  ? 'ทีมวิศวกรที่มีประสบการณ์และได้รับการรับรอง'
                  : 'Experienced and certified engineering team',
              },
              {
                title: locale === 'th' ? 'โซลูชันที่ปรับแต่งได้' : 'Tailored Solutions',
                desc: locale === 'th'
                  ? 'ออกแบบตามความต้องการเฉพาะของธุรกิจ'
                  : 'Designed for your specific business needs',
              },
              {
                title: locale === 'th' ? 'สนับสนุน 24/7' : '24/7 Support',
                desc: locale === 'th'
                  ? 'ทีมสนับสนุนพร้อมให้บริการตลอดเวลา'
                  : 'Support team available around the clock',
              },
            ].map((item, index) => (
              <div key={index} className="card bg-base-100 shadow-lg">
                <div className="card-body text-center">
                  <h3 className="card-title justify-center">{item.title}</h3>
                  <p className="text-base-content/70">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="card bg-primary text-primary-content">
            <div className="card-body text-center py-12">
              <h2 className="text-3xl font-bold mb-4">
                {locale === 'th' ? 'พร้อมเริ่มต้นหรือยัง?' : 'Ready to Get Started?'}
              </h2>
              <p className="text-primary-content/80 mb-6 max-w-2xl mx-auto">
                {locale === 'th'
                  ? 'ติดต่อเราวันนี้เพื่อรับคำปรึกษาฟรีและพูดคุยเกี่ยวกับความต้องการของคุณ'
                  : 'Contact us today for a free consultation and discuss your requirements'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={`/${locale}/contact`} className="btn btn-secondary">
                  {locale === 'th' ? 'ติดต่อเรา' : 'Contact Us'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
                <Link href={`/${locale}/services`} className="btn btn-outline border-primary-content text-primary-content hover:bg-primary-content hover:text-primary">
                  {locale === 'th' ? 'ดูบริการทั้งหมด' : 'View All Services'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
