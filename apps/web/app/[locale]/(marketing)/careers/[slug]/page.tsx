import { type Locale } from '@/lib/i18n'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MapPin, Clock, Briefcase, Send, Building2, CheckCircle2, Calendar } from 'lucide-react'
import type { Metadata } from 'next'
import { getJobPosition, getJobPositions } from '@/lib/strapi'
import { MarkdownRenderer } from '@/components/markdown-renderer'
import { Breadcrumb } from '@/components/ui/breadcrumb'

type Props = {
  params: Promise<{ locale: Locale; slug: string }>
}

// Generate static params for all job positions
export async function generateStaticParams() {
  const jobs = await getJobPositions('en')
  return jobs.map((job) => ({
    slug: job.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const job = await getJobPosition(slug, locale)

  if (!job) {
    return {
      title: locale === 'th' ? 'ไม่พบตำแหน่งงาน' : 'Job Not Found',
    }
  }

  return {
    title: job.title,
    description: locale === 'th'
      ? `สมัครตำแหน่ง ${job.title} ที่ Think Space`
      : `Apply for ${job.title} position at Think Space`,
  }
}

// Employment type labels
const employmentTypeLabels = {
  'full-time': { th: 'เต็มเวลา', en: 'Full-time' },
  'part-time': { th: 'พาร์ทไทม์', en: 'Part-time' },
  'contract': { th: 'สัญญาจ้าง', en: 'Contract' },
  'internship': { th: 'ฝึกงาน', en: 'Internship' },
}

// Fallback job data
const fallbackJobs: Record<string, {
  title: { th: string; en: string }
  department: { th: string; en: string }
  location: { th: string; en: string }
  employmentType: 'full-time' | 'part-time' | 'contract' | 'internship'
  description: { th: string; en: string }
  requirements: { th: string; en: string }
}> = {
  'senior-cloud-engineer': {
    title: { th: 'วิศวกรคลาวด์อาวุโส', en: 'Senior Cloud Engineer' },
    department: { th: 'วิศวกรรม', en: 'Engineering' },
    location: { th: 'กรุงเทพฯ / ทำงานระยะไกล', en: 'Bangkok / Remote' },
    employmentType: 'full-time',
    description: {
      th: 'เรากำลังมองหาวิศวกรคลาวด์อาวุโสที่มีประสบการณ์ในการออกแบบและพัฒนาระบบ Cloud Infrastructure สำหรับลูกค้าองค์กรขนาดใหญ่ คุณจะทำงานร่วมกับทีมเพื่อสร้างโซลูชันที่มีความยืดหยุ่นและปลอดภัย',
      en: 'We are looking for a Senior Cloud Engineer with experience in designing and developing Cloud Infrastructure for large enterprise clients. You will work with the team to build flexible and secure solutions.',
    },
    requirements: {
      th: '• ประสบการณ์ 5+ ปีในด้าน Cloud Engineering (AWS, Azure, หรือ GCP)\n• ความเชี่ยวชาญใน Kubernetes และ Docker\n• ประสบการณ์ใน Infrastructure as Code (Terraform, CloudFormation)\n• ทักษะการเขียนโปรแกรม Python, Go หรือ similar\n• ประสบการณ์ในการออกแบบระบบ High Availability\n• ทักษะการสื่อสารและทำงานเป็นทีมที่ดี',
      en: '• 5+ years experience in Cloud Engineering (AWS, Azure, or GCP)\n• Expertise in Kubernetes and Docker\n• Experience with Infrastructure as Code (Terraform, CloudFormation)\n• Programming skills in Python, Go or similar\n• Experience designing High Availability systems\n• Strong communication and teamwork skills',
    },
  },
  'security-analyst': {
    title: { th: 'นักวิเคราะห์ความปลอดภัย', en: 'Security Analyst' },
    department: { th: 'ความปลอดภัย', en: 'Security' },
    location: { th: 'กรุงเทพฯ', en: 'Bangkok' },
    employmentType: 'full-time',
    description: {
      th: 'ร่วมทีม Security Operations Center (SOC) ของเราเพื่อปกป้องลูกค้าจากภัยคุกคามทางไซเบอร์ คุณจะวิเคราะห์และตอบสนองต่อเหตุการณ์ด้านความปลอดภัยตลอด 24/7',
      en: 'Join our Security Operations Center (SOC) team to protect clients from cyber threats. You will analyze and respond to security incidents 24/7.',
    },
    requirements: {
      th: '• ประสบการณ์ 3+ ปีในด้าน Cybersecurity\n• ความรู้เกี่ยวกับ SIEM tools และ Security frameworks\n• ประสบการณ์ในการวิเคราะห์ภัยคุกคาม\n• Certifications เช่น Security+, CEH, หรือ CISSP\n• ทักษะการวิเคราะห์และแก้ปัญหาที่ดี',
      en: '• 3+ years experience in Cybersecurity\n• Knowledge of SIEM tools and Security frameworks\n• Experience in threat analysis\n• Certifications such as Security+, CEH, or CISSP\n• Strong analytical and problem-solving skills',
    },
  },
  'data-scientist': {
    title: { th: 'นักวิทยาศาสตร์ข้อมูล', en: 'Data Scientist' },
    department: { th: 'ข้อมูลและ AI', en: 'Data & AI' },
    location: { th: 'ทำงานระยะไกล', en: 'Remote' },
    employmentType: 'full-time',
    description: {
      th: 'พัฒนาโมเดล Machine Learning และ AI solutions สำหรับลูกค้าในหลากหลายอุตสาหกรรม คุณจะทำงานกับข้อมูลขนาดใหญ่และสร้าง insights ที่มีคุณค่า',
      en: 'Develop Machine Learning models and AI solutions for clients across various industries. You will work with large datasets and create valuable insights.',
    },
    requirements: {
      th: '• ปริญญาโทหรือเอกในสาขา Data Science, Statistics, หรือที่เกี่ยวข้อง\n• ประสบการณ์ 3+ ปีในการพัฒนา ML models\n• ความเชี่ยวชาญใน Python, TensorFlow/PyTorch\n• ประสบการณ์ใน Big Data technologies (Spark, Hadoop)\n• ทักษะการสื่อสารผลลัพธ์ให้ผู้ไม่เชี่ยวชาญเข้าใจ',
      en: '• Master\'s or PhD in Data Science, Statistics, or related field\n• 3+ years experience developing ML models\n• Expertise in Python, TensorFlow/PyTorch\n• Experience with Big Data technologies (Spark, Hadoop)\n• Ability to communicate results to non-technical stakeholders',
    },
  },
  'project-manager': {
    title: { th: 'ผู้จัดการโครงการ', en: 'Project Manager' },
    department: { th: 'ปฏิบัติการ', en: 'Operations' },
    location: { th: 'กรุงเทพฯ', en: 'Bangkok' },
    employmentType: 'full-time',
    description: {
      th: 'บริหารจัดการโครงการ IT สำหรับลูกค้าองค์กร ประสานงานระหว่างทีมเทคนิคและลูกค้าเพื่อส่งมอบโครงการตรงเวลาและตามงบประมาณ',
      en: 'Manage IT projects for enterprise clients. Coordinate between technical teams and clients to deliver projects on time and within budget.',
    },
    requirements: {
      th: '• ประสบการณ์ 5+ ปีในการบริหารโครงการ IT\n• PMP หรือ Scrum Master certification\n• ความเข้าใจเทคโนโลยี Cloud และ Enterprise systems\n• ทักษะการสื่อสารและ Stakeholder management\n• ประสบการณ์ใน Agile methodologies',
      en: '• 5+ years experience managing IT projects\n• PMP or Scrum Master certification\n• Understanding of Cloud and Enterprise systems\n• Strong communication and Stakeholder management\n• Experience with Agile methodologies',
    },
  },
}

export default async function JobDetailPage({ params }: Props) {
  const { locale, slug } = await params

  // Fetch job from Strapi
  const strapiJob = await getJobPosition(slug, locale)

  // Use Strapi data or fallback
  const fallback = fallbackJobs[slug]

  if (!strapiJob && !fallback) {
    notFound()
  }

  const job = strapiJob || {
    id: 1,
    documentId: slug,
    title: locale === 'th' ? fallback.title.th : fallback.title.en,
    slug,
    department: locale === 'th' ? fallback.department.th : fallback.department.en,
    location: locale === 'th' ? fallback.location.th : fallback.location.en,
    employmentType: fallback.employmentType,
    description: locale === 'th' ? fallback.description.th : fallback.description.en,
    requirements: locale === 'th' ? fallback.requirements.th : fallback.requirements.en,
    isActive: true,
    order: 1,
  }

  const typeLabel = employmentTypeLabels[job.employmentType]

  return (
    <>
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-base-100 to-primary/5">
        <div className="container-custom">
          <Breadcrumb
            items={[
              { label: locale === 'th' ? 'ร่วมงาน' : 'Careers', href: `/${locale}/careers` },
              { label: job.title }
            ]}
            locale={locale}
            className="mb-6"
          />

          <div className="max-w-4xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {job.title}
            </h1>

            <div className="flex flex-wrap gap-4 text-base-content/70">
              <span className="flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                {job.department}
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                {job.location}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                {locale === 'th' ? typeLabel.th : typeLabel.en}
              </span>
              {job.salaryRange && (
                <span className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  {job.salaryRange}
                </span>
              )}
            </div>

            {/* Application Period */}
            {(job.dateOpen || job.dateClose) && (
              <div className="mt-4 inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm">
                <Calendar className="w-4 h-4" />
                <span>
                  {locale === 'th' ? 'เปิดรับสมัคร: ' : 'Application Period: '}
                  {job.dateOpen && new Date(job.dateOpen).toLocaleDateString(locale === 'th' ? 'th-TH' : 'en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                  {job.dateOpen && job.dateClose && ' - '}
                  {job.dateClose && new Date(job.dateClose).toLocaleDateString(locale === 'th' ? 'th-TH' : 'en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Job Description */}
              {job.description && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">
                    {locale === 'th' ? 'รายละเอียดงาน' : 'Job Description'}
                  </h2>
                  <MarkdownRenderer content={job.description} />
                </div>
              )}

              {/* Requirements */}
              {job.requirements && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">
                    {locale === 'th' ? 'คุณสมบัติที่ต้องการ' : 'Requirements'}
                  </h2>
                  <MarkdownRenderer content={job.requirements} />
                </div>
              )}

              {/* Benefits Preview */}
              <div className="bg-base-200 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-4">
                  {locale === 'th' ? 'สิ่งที่คุณจะได้รับ' : 'What We Offer'}
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { th: 'ประกันสุขภาพครอบคลุม', en: 'Comprehensive health insurance' },
                    { th: 'ทำงานยืดหยุ่น/ระยะไกล', en: 'Flexible/remote work' },
                    { th: 'งบพัฒนาตนเอง', en: 'Learning & development budget' },
                    { th: 'โบนัสประจำปี', en: 'Annual bonus' },
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      <span className="text-sm">{locale === 'th' ? benefit.th : benefit.en}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar - Apply Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-base-100 rounded-2xl shadow-lg border border-base-200 p-6">
                <h3 className="text-xl font-bold mb-4">
                  {locale === 'th' ? 'สนใจตำแหน่งนี้?' : 'Interested in this role?'}
                </h3>
                <p className="text-base-content/70 mb-6">
                  {locale === 'th'
                    ? 'ส่ง Resume และ Portfolio ของคุณมาที่เรา เราจะติดต่อกลับโดยเร็วที่สุด'
                    : 'Send us your resume and portfolio. We\'ll get back to you as soon as possible.'}
                </p>

                <Link
                  href={`/${locale}/contact?position=${encodeURIComponent(job.title)}`}
                  className="btn btn-primary btn-block mb-3"
                >
                  <Send className="w-4 h-4" />
                  {locale === 'th' ? 'สมัครตำแหน่งนี้' : 'Apply Now'}
                </Link>

                <div className="text-center text-sm text-base-content/60">
                  {locale === 'th' ? 'หรือส่งอีเมลไปที่' : 'Or email us at'}
                  <br />
                  <a href="mailto:info@techthinkspace.com" className="text-primary hover:underline">
                    info@techthinkspace.com
                  </a>
                </div>

                <div className="divider"></div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-base-content/60">{locale === 'th' ? 'แผนก' : 'Department'}</span>
                    <span className="font-medium">{job.department}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-base-content/60">{locale === 'th' ? 'สถานที่' : 'Location'}</span>
                    <span className="font-medium">{job.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-base-content/60">{locale === 'th' ? 'ประเภท' : 'Type'}</span>
                    <span className="font-medium">{locale === 'th' ? typeLabel.th : typeLabel.en}</span>
                  </div>
                  {job.dateOpen && (
                    <div className="flex justify-between">
                      <span className="text-base-content/60">{locale === 'th' ? 'เปิดรับ' : 'Open Date'}</span>
                      <span className="font-medium">
                        {new Date(job.dateOpen).toLocaleDateString(locale === 'th' ? 'th-TH' : 'en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                  )}
                  {job.dateClose && (
                    <div className="flex justify-between">
                      <span className="text-base-content/60">{locale === 'th' ? 'ปิดรับ' : 'Close Date'}</span>
                      <span className="font-medium text-error">
                        {new Date(job.dateClose).toLocaleDateString(locale === 'th' ? 'th-TH' : 'en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Positions CTA */}
      <section className="section-padding bg-base-200">
        <div className="container-custom text-center">
          <h2 className="text-2xl font-bold mb-4">
            {locale === 'th' ? 'ดูตำแหน่งอื่นๆ' : 'View Other Positions'}
          </h2>
          <p className="text-base-content/70 mb-6">
            {locale === 'th'
              ? 'ค้นหาตำแหน่งที่เหมาะกับคุณ'
              : 'Find the right position for you'}
          </p>
          <Link href={`/${locale}/careers`} className="btn btn-outline btn-primary">
            {locale === 'th' ? 'ดูตำแหน่งทั้งหมด' : 'View All Positions'}
          </Link>
        </div>
      </section>
    </>
  )
}
