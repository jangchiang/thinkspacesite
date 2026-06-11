import { type Locale } from '@/lib/i18n'
import Link from 'next/link'
import { MapPin, Clock, Briefcase, ArrowRight, Heart, Zap, Users, Shield, Globe, Award, Coffee, Target } from 'lucide-react'
import type { Metadata } from 'next'
import { getCareerBenefits, getJobPositions } from '@/lib/strapi'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params as { locale: Locale }

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

// Employment type labels
const employmentTypeLabels = {
  'full-time': { th: 'เต็มเวลา', en: 'Full-time' },
  'part-time': { th: 'พาร์ทไทม์', en: 'Part-time' },
  'contract': { th: 'สัญญาจ้าง', en: 'Contract' },
  'internship': { th: 'ฝึกงาน', en: 'Internship' },
}

export default async function CareersPage({ params }: Props): Promise<React.JSX.Element> {
  const { locale } = await params as { locale: Locale }

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
      <section className="section-padding bg-base-200 border-b border-base-300">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <p className="eyebrow mb-4">{locale === 'th' ? 'ร่วมงานกับเรา' : 'Careers'}</p>
            <h1 className="display-heading text-4xl md:text-5xl lg:text-6xl mb-6">
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
          <div className="text-center mb-12">
            <p className="eyebrow mb-4">{locale === 'th' ? 'วัฒนธรรมองค์กร' : 'Our Culture'}</p>
            <h2 className="display-heading text-3xl md:text-4xl">
              {locale === 'th' ? 'ทำไมต้อง Think Space' : 'Why Think Space'}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit) => {
              const IconComponent = iconMap[benefit.iconName as keyof typeof iconMap] || Heart

              return (
                <div key={benefit.id} className="card-surface bg-base-100 p-8 text-center flex flex-col items-center">
                  <div className="w-16 h-16 bg-primary/10 flex items-center justify-center mb-4">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-base-content mb-2">{benefit.title}</h3>
                  <p className="text-base-content/70 leading-relaxed">{benefit.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="section-padding bg-base-200 border-y border-base-300">
        <div className="container-custom">
          <div className="text-center mb-12">
            <p className="eyebrow mb-4">{locale === 'th' ? 'โอกาส' : 'Opportunities'}</p>
            <h2 className="display-heading text-3xl md:text-4xl">
              {locale === 'th' ? 'ตำแหน่งที่เปิดรับ' : 'Open Positions'}
            </h2>
          </div>
          <div className="space-y-4">
            {jobs.map((job) => {
              const typeLabel = employmentTypeLabels[job.employmentType]

              return (
                <Link
                  key={job.id}
                  href={`/${locale}/careers/${job.slug}`}
                  className="card-surface bg-base-100 block p-6 group"
                >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-bold text-base-content group-hover:text-primary transition-colors">{job.title}</h3>
                        <div className="flex flex-wrap gap-4 mt-2 text-sm text-base-content/70">
                          <span className="flex items-center gap-1">
                            <Briefcase className="w-4 h-4" />
                            {job.department}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {job.location}
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
          <div className="card-surface bg-base-200 p-8 md:p-12 text-center">
            <h2 className="display-heading text-2xl md:text-3xl mb-4">
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
