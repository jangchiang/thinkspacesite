import { type Locale } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionary'
import { Users, Target, Award, Globe } from 'lucide-react'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ locale: Locale }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const dict = await getDictionary(locale)

  return {
    title: dict.about?.meta?.title || 'About Us',
    description: dict.about?.meta?.description || 'Learn about Think Space',
  }
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params
  const dict = await getDictionary(locale)

  const values = [
    {
      icon: Target,
      title: locale === 'th' ? 'พันธกิจ' : 'Mission',
      description: locale === 'th'
        ? 'เราช่วยองค์กรเปลี่ยนแปลงด้วยเทคโนโลยีที่ทันสมัยและโซลูชันที่ขับเคลื่อนผลลัพธ์'
        : 'We help organizations transform with cutting-edge technology and solutions that drive results.',
    },
    {
      icon: Award,
      title: locale === 'th' ? 'วิสัยทัศน์' : 'Vision',
      description: locale === 'th'
        ? 'เป็นพันธมิตรด้านเทคโนโลยีชั้นนำในภูมิภาค สร้างนวัตกรรมและคุณค่าให้กับลูกค้า'
        : 'To be the leading technology partner in the region, creating innovation and value for our clients.',
    },
    {
      icon: Users,
      title: locale === 'th' ? 'ทีมงาน' : 'Team',
      description: locale === 'th'
        ? 'ทีมผู้เชี่ยวชาญกว่า 200 คน พร้อมให้บริการและสนับสนุนลูกค้าทุกขนาด'
        : 'Over 200 experts ready to serve and support clients of all sizes.',
    },
    {
      icon: Globe,
      title: locale === 'th' ? 'ขอบเขต' : 'Reach',
      description: locale === 'th'
        ? 'ให้บริการลูกค้าในกว่า 15 ประเทศทั่วภูมิภาคเอเชียแปซิฟิก'
        : 'Serving clients in over 15 countries across the Asia-Pacific region.',
    },
  ]

  const milestones = [
    { year: '2008', event: locale === 'th' ? 'ก่อตั้งบริษัท' : 'Company Founded' },
    { year: '2012', event: locale === 'th' ? 'ขยายบริการ Cloud' : 'Cloud Services Expansion' },
    { year: '2016', event: locale === 'th' ? 'เปิดศูนย์ Security' : 'Security Center Launch' },
    { year: '2020', event: locale === 'th' ? 'ลูกค้า 500+ ราย' : '500+ Clients Milestone' },
    { year: '2024', event: locale === 'th' ? 'ขยายสู่ AI Solutions' : 'AI Solutions Launch' },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-base-100 to-primary/5">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {locale === 'th' ? 'เกี่ยวกับเรา' : 'About Us'}
            </h1>
            <p className="text-lg md:text-xl text-base-content/70">
              {locale === 'th'
                ? 'Thinkspace Technology เป็นผู้นำด้านโซลูชันเทคโนโลยีสำหรับองค์กร ให้บริการครบวงจรตั้งแต่ Cloud, Security, Data & AI จนถึง Research & Development'
                : 'Thinkspace Technology is a leading enterprise technology solutions provider, offering end-to-end services from Cloud, Security, Data & AI to Research & Development.'}
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div key={value.title} className="card bg-base-100 shadow-lg">
                <div className="card-body items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <value.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="card-title">{value.title}</h3>
                  <p className="text-base-content/70">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding bg-base-200">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {locale === 'th' ? 'เรื่องราวของเรา' : 'Our Story'}
              </h2>
              <div className="space-y-4 text-base-content/70">
                <p>
                  {locale === 'th'
                    ? 'Thinkspace Technology เริ่มต้นจากทีมวิศวกรที่มีความหลงใหลในเทคโนโลยี ด้วยเป้าหมายในการช่วยให้องค์กรสามารถใช้ประโยชน์จากเทคโนโลยีได้อย่างเต็มที่'
                    : 'Thinkspace Technology started as a team of engineers passionate about technology, with a goal to help organizations leverage technology to its fullest potential.'}
                </p>
                <p>
                  {locale === 'th'
                    ? 'ปัจจุบันเราให้บริการลูกค้ากว่า 500 รายในหลากหลายอุตสาหกรรม ตั้งแต่สตาร์ทอัพจนถึงองค์กรขนาดใหญ่ ด้วยทีมผู้เชี่ยวชาญกว่า 200 คน'
                    : 'Today, we serve over 500 clients across various industries, from startups to large enterprises, with a team of over 200 experts.'}
                </p>
              </div>
            </div>
            <div className="bg-base-100 rounded-2xl p-8">
              <h3 className="text-xl font-semibold mb-6">
                {locale === 'th' ? 'เหตุการณ์สำคัญ' : 'Key Milestones'}
              </h3>
              <div className="space-y-4">
                {milestones.map((milestone) => (
                  <div key={milestone.year} className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-lg bg-primary text-primary-content flex items-center justify-center font-bold">
                      {milestone.year}
                    </div>
                    <p className="font-medium">{milestone.event}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {locale === 'th' ? 'ทีมผู้บริหาร' : 'Leadership Team'}
            </h2>
            <p className="text-base-content/70 max-w-2xl mx-auto">
              {locale === 'th'
                ? 'ทีมผู้บริหารที่มีประสบการณ์กว่า 20 ปีในอุตสาหกรรมเทคโนโลยี'
                : 'Experienced leadership with over 20 years in the technology industry.'}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'John Smith', role: 'CEO & Founder', roleTh: 'ประธานเจ้าหน้าที่บริหาร' },
              { name: 'Sarah Chen', role: 'CTO', roleTh: 'ประธานเจ้าหน้าที่ฝ่ายเทคโนโลยี' },
              { name: 'Michael Wong', role: 'COO', roleTh: 'ประธานเจ้าหน้าที่ฝ่ายปฏิบัติการ' },
            ].map((member) => (
              <div key={member.name} className="card bg-base-100 shadow-lg">
                <div className="card-body items-center text-center">
                  <div className="w-24 h-24 rounded-full bg-base-300 mb-4" />
                  <h3 className="card-title">{member.name}</h3>
                  <p className="text-base-content/70">
                    {locale === 'th' ? member.roleTh : member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
