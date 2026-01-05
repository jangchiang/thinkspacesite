import { type Locale } from '@/lib/i18n'
import Link from 'next/link'
import { MapPin, Clock, Briefcase, ArrowRight, Heart, Zap, Users, Shield, Globe, Award, Coffee, Target } from 'lucide-react'
import type { Metadata } from 'next'
import { getCareerBenefits, getJobPositions, type CareerBenefit, type JobPosition } from '@/lib/strapi'

type Props = {
  params: Promise<{ locale: Locale }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params

  return {
    title: locale === 'th' ? 'ร่วมงานกับเรา' : 'Careers',
    description: locale === 'th'
      ? 'ร่วมทีม Think Space และสร้างอนาคตด้านเทคโนโลยี'
      : 'Join Think Space and build the future of technology',
  }
}

// Icon mapping for dynamic rendering
const iconMap = {
  Heart,
  Zap,
  Users,
  Shield,
  Globe,
  Award,
  Coffee,
  Briefcase,
  Clock,
  Target,
}

// Fallback data for when Strapi is unavailable
const fallbackBenefits = [
  {
    id: 1,
    documentId: '1',
    iconName: 'Heart' as const,
    title: { th: 'สวัสดิการครบครัน', en: 'Comprehensive Benefits' },
    description: { th: 'ประกันสุขภาพ, ทันตกรรม และสายตา', en: 'Health, dental, and vision insurance' },
    order: 1,
  },
  {
    id: 2,
    documentId: '2',
    iconName: 'Zap' as const,
    title: { th: 'เติบโตอย่างรวดเร็ว', en: 'Fast Growth' },
    description: { th: 'โอกาสในการพัฒนาและเลื่อนตำแหน่ง', en: 'Development and promotion opportunities' },
    order: 2,
  },
  {
    id: 3,
    documentId: '3',
    iconName: 'Users' as const,
    title: { th: 'ทีมที่ยอดเยี่ยม', en: 'Great Team' },
    description: { th: 'ทำงานร่วมกับผู้เชี่ยวชาญชั้นนำ', en: 'Work with top industry experts' },
    order: 3,
  },
]

const fallbackJobs = [
  {
    id: 1,
    documentId: '1',
    title: { th: 'วิศวกรคลาวด์อาวุโส', en: 'Senior Cloud Engineer' },
    slug: 'senior-cloud-engineer',
    department: { th: 'วิศวกรรม', en: 'Engineering' },
    location: { th: 'กรุงเทพฯ / ทำงานระยะไกล', en: 'Bangkok / Remote' },
    employmentType: 'full-time' as const,
    isActive: true,
    order: 1,
  },
  {
    id: 2,
    documentId: '2',
    title: { th: 'นักวิเคราะห์ความปลอดภัย', en: 'Security Analyst' },
    slug: 'security-analyst',
    department: { th: 'ความปลอดภัย', en: 'Security' },
    location: { th: 'กรุงเทพฯ', en: 'Bangkok' },
    employmentType: 'full-time' as const,
    isActive: true,
    order: 2,
  },
  {
    id: 3,
    documentId: '3',
    title: { th: 'นักวิทยาศาสตร์ข้อมูล', en: 'Data Scientist' },
    slug: 'data-scientist',
    department: { th: 'ข้อมูลและ AI', en: 'Data & AI' },
    location: { th: 'ทำงานระยะไกล', en: 'Remote' },
    employmentType: 'full-time' as const,
    isActive: true,
    order: 3,
  },
  {
    id: 4,
    documentId: '4',
    title: { th: 'ผู้จัดการโครงการ', en: 'Project Manager' },
    slug: 'project-manager',
    department: { th: 'ปฏิบัติการ', en: 'Operations' },
    location: { th: 'กรุงเทพฯ', en: 'Bangkok' },
    employmentType: 'full-time' as const,
    isActive: true,
    order: 4,
  },
]

// Employment type labels
const employmentTypeLabels = {
  'full-time': { th: 'เต็มเวลา', en: 'Full-time' },
  'part-time': { th: 'พาร์ทไทม์', en: 'Part-time' },
  'contract': { th: 'สัญญาจ้าง', en: 'Contract' },
  'internship': { th: 'ฝึกงาน', en: 'Internship' },
}

export default async function CareersPage({ params }: Props) {
  const { locale } = await params

  // Fetch data from Strapi
  const [strapiBenefits, strapiJobs] = await Promise.all([
    getCareerBenefits(locale),
    getJobPositions(locale),
  ])

  // Use Strapi data only (no fallbacks)
  const benefits = strapiBenefits
  const jobs = strapiJobs

  return (
    <>
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-base-100 to-primary/5">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {locale === 'th' ? 'ร่วมงานกับเรา' : 'Join Our Team'}
            </h1>
            <p className="text-lg md:text-xl text-base-content/70">
              {locale === 'th'
                ? 'สร้างอนาคตด้านเทคโนโลยีไปด้วยกัน'
                : 'Build the future of technology with us'}
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">
            {locale === 'th' ? 'ทำไมต้อง Think Space' : 'Why Think Space'}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit) => {
              const IconComponent = iconMap[benefit.iconName as keyof typeof iconMap] || Heart
              const title = typeof benefit.title === 'string' ? benefit.title : (locale === 'th' ? benefit.title.th : benefit.title.en)
              const description = typeof benefit.description === 'string' ? benefit.description : (locale === 'th' ? benefit.description.th : benefit.description.en)

              return (
                <div key={benefit.id} className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="card-body items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <IconComponent className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="card-title">{title}</h3>
                    <p className="text-base-content/70">{description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="section-padding bg-base-200">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">
            {locale === 'th' ? 'ตำแหน่งที่เปิดรับ' : 'Open Positions'}
          </h2>
          <div className="space-y-4">
            {jobs.map((job) => {
              const title = typeof job.title === 'string' ? job.title : (locale === 'th' ? job.title.th : job.title.en)
              const department = typeof job.department === 'string' ? job.department : (locale === 'th' ? job.department.th : job.department.en)
              const location = typeof job.location === 'string' ? job.location : (locale === 'th' ? job.location.th : job.location.en)
              const typeLabel = employmentTypeLabels[job.employmentType]

              return (
                <Link
                  key={job.id}
                  href={`/${locale}/careers/${job.slug}`}
                  className="card bg-base-100 shadow hover:shadow-lg transition-all hover:border-primary/30 border border-transparent"
                >
                  <div className="card-body">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h3 className="card-title text-xl group-hover:text-primary">{title}</h3>
                        <div className="flex flex-wrap gap-4 mt-2 text-sm text-base-content/70">
                          <span className="flex items-center gap-1">
                            <Briefcase className="w-4 h-4" />
                            {department}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {locale === 'th' ? typeLabel.th : typeLabel.en}
                          </span>
                        </div>
                      </div>
                      <span className="btn btn-primary btn-sm">
                        {locale === 'th' ? 'ดูรายละเอียด' : 'View Details'}
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>

          {jobs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-base-content/70">
                {locale === 'th'
                  ? 'ไม่มีตำแหน่งที่เปิดรับในขณะนี้ กรุณากลับมาตรวจสอบอีกครั้ง'
                  : 'No open positions at the moment. Please check back later.'}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="bg-primary/5 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {locale === 'th' ? 'ไม่เห็นตำแหน่งที่ต้องการ?' : "Don't see the right position?"}
            </h2>
            <p className="text-base-content/70 mb-6 max-w-2xl mx-auto">
              {locale === 'th'
                ? 'ส่ง Resume ของคุณมาให้เราและเราจะติดต่อกลับหากมีตำแหน่งที่เหมาะสม'
                : "Send us your resume and we'll reach out when we have a position that fits"}
            </p>
            <Link href={`/${locale}/contact`} className="btn btn-primary">
              {locale === 'th' ? 'ติดต่อเรา' : 'Contact Us'}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
