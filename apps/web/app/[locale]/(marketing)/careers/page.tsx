import { type Locale } from '@/lib/i18n'
import Link from 'next/link'
import { MapPin, Clock, Briefcase, ArrowRight, Heart, Zap, Users } from 'lucide-react'
import type { Metadata } from 'next'

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

export default async function CareersPage({ params }: Props) {
  const { locale } = await params

  const benefits = [
    {
      icon: Heart,
      title: locale === 'th' ? 'สวัสดิการครบครัน' : 'Comprehensive Benefits',
      desc: locale === 'th' ? 'ประกันสุขภาพ, ทันตกรรม และสายตา' : 'Health, dental, and vision insurance',
    },
    {
      icon: Zap,
      title: locale === 'th' ? 'เติบโตอย่างรวดเร็ว' : 'Fast Growth',
      desc: locale === 'th' ? 'โอกาสในการพัฒนาและเลื่อนตำแหน่ง' : 'Development and promotion opportunities',
    },
    {
      icon: Users,
      title: locale === 'th' ? 'ทีมที่ยอดเยี่ยม' : 'Great Team',
      desc: locale === 'th' ? 'ทำงานร่วมกับผู้เชี่ยวชาญชั้นนำ' : 'Work with top industry experts',
    },
  ]

  const jobs = [
    {
      title: 'Senior Cloud Engineer',
      titleTh: 'วิศวกรคลาวด์อาวุโส',
      department: 'Engineering',
      departmentTh: 'วิศวกรรม',
      location: 'San Francisco / Remote',
      locationTh: 'ซานฟรานซิสโก / ทำงานระยะไกล',
      type: 'Full-time',
      typeTh: 'เต็มเวลา',
    },
    {
      title: 'Security Analyst',
      titleTh: 'นักวิเคราะห์ความปลอดภัย',
      department: 'Security',
      departmentTh: 'ความปลอดภัย',
      location: 'San Francisco',
      locationTh: 'ซานฟรานซิสโก',
      type: 'Full-time',
      typeTh: 'เต็มเวลา',
    },
    {
      title: 'Data Scientist',
      titleTh: 'นักวิทยาศาสตร์ข้อมูล',
      department: 'Data & AI',
      departmentTh: 'ข้อมูลและ AI',
      location: 'Remote',
      locationTh: 'ทำงานระยะไกล',
      type: 'Full-time',
      typeTh: 'เต็มเวลา',
    },
    {
      title: 'Project Manager',
      titleTh: 'ผู้จัดการโครงการ',
      department: 'Operations',
      departmentTh: 'ปฏิบัติการ',
      location: 'San Francisco',
      locationTh: 'ซานฟรานซิสโก',
      type: 'Full-time',
      typeTh: 'เต็มเวลา',
    },
  ]

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
            {benefits.map((benefit) => (
              <div key={benefit.title} className="card bg-base-100 shadow-lg">
                <div className="card-body items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <benefit.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="card-title">{benefit.title}</h3>
                  <p className="text-base-content/70">{benefit.desc}</p>
                </div>
              </div>
            ))}
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
            {jobs.map((job) => (
              <div key={job.title} className="card bg-base-100 shadow">
                <div className="card-body">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="card-title text-xl">
                        {locale === 'th' ? job.titleTh : job.title}
                      </h3>
                      <div className="flex flex-wrap gap-4 mt-2 text-sm text-base-content/70">
                        <span className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4" />
                          {locale === 'th' ? job.departmentTh : job.department}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {locale === 'th' ? job.locationTh : job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {locale === 'th' ? job.typeTh : job.type}
                        </span>
                      </div>
                    </div>
                    <Link href={`/${locale}/contact`} className="btn btn-primary btn-sm">
                      {locale === 'th' ? 'สมัครงาน' : 'Apply Now'}
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
