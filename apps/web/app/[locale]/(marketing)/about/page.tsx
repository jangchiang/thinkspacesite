import { type Locale } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionary'
import type { Metadata } from 'next'
import {
  AboutHero,
  ValuesSection,
  StorySection,
  TeamSection,
} from '@/components/sections/about-sections'

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
      iconName: 'Target',
      title: locale === 'th' ? 'พันธกิจ' : 'Mission',
      description: locale === 'th'
        ? 'เราช่วยองค์กรเปลี่ยนแปลงด้วยเทคโนโลยีที่ทันสมัยและโซลูชันที่ขับเคลื่อนผลลัพธ์'
        : 'We help organizations transform with cutting-edge technology and solutions that drive results.',
    },
    {
      iconName: 'Award',
      title: locale === 'th' ? 'วิสัยทัศน์' : 'Vision',
      description: locale === 'th'
        ? 'เป็นพันธมิตรด้านเทคโนโลยีชั้นนำในภูมิภาค สร้างนวัตกรรมและคุณค่าให้กับลูกค้า'
        : 'To be the leading technology partner in the region, creating innovation and value for our clients.',
    },
    {
      iconName: 'Users',
      title: locale === 'th' ? 'ทีมงาน' : 'Team',
      description: locale === 'th'
        ? 'ทีมผู้เชี่ยวชาญกว่า 200 คน พร้อมให้บริการและสนับสนุนลูกค้าทุกขนาด'
        : 'Over 200 experts ready to serve and support clients of all sizes.',
    },
    {
      iconName: 'Globe',
      title: locale === 'th' ? 'ขอบเขต' : 'Reach',
      description: locale === 'th'
        ? 'ให้บริการลูกค้าในกว่า 15 ประเทศทั่วภูมิภาคเอเชียแปซิฟิก'
        : 'Serving clients in over 15 countries across the Asia-Pacific region.',
    },
  ]

  const milestones = [
    {
      year: '2008',
      event: locale === 'th' ? 'ก่อตั้งบริษัท' : 'Company Founded',
      detail: locale === 'th'
        ? 'เริ่มต้นด้วยทีมวิศวกร 5 คน ให้บริการด้าน IT Consulting'
        : 'Started with a team of 5 engineers, providing IT Consulting services'
    },
    {
      year: '2012',
      event: locale === 'th' ? 'ขยายบริการ Cloud' : 'Cloud Services Expansion',
      detail: locale === 'th'
        ? 'เปิดตัวบริการ Cloud Infrastructure และ Migration Services'
        : 'Launched Cloud Infrastructure and Migration Services'
    },
    {
      year: '2016',
      event: locale === 'th' ? 'เปิดศูนย์ Security' : 'Security Center Launch',
      detail: locale === 'th'
        ? 'เปิด Security Operations Center (SOC) ให้บริการ 24/7'
        : 'Opened 24/7 Security Operations Center (SOC)'
    },
    {
      year: '2020',
      event: locale === 'th' ? 'ลูกค้า 500+ ราย' : '500+ Clients Milestone',
      detail: locale === 'th'
        ? 'ให้บริการลูกค้าในกว่า 15 ประเทศทั่วเอเชียแปซิฟิก'
        : 'Serving clients across 15+ countries in Asia-Pacific'
    },
    {
      year: '2024',
      event: locale === 'th' ? 'ขยายสู่ AI Solutions' : 'AI Solutions Launch',
      detail: locale === 'th'
        ? 'เปิดตัว AI & Data Analytics Platform สำหรับองค์กร'
        : 'Launched Enterprise AI & Data Analytics Platform'
    },
  ]

  const teamMembers = [
    {
      name: 'John Smith',
      role: locale === 'th' ? 'ประธานเจ้าหน้าที่บริหาร' : 'CEO & Founder',
    },
    {
      name: 'Sarah Chen',
      role: locale === 'th' ? 'ประธานเจ้าหน้าที่ฝ่ายเทคโนโลยี' : 'CTO',
    },
    {
      name: 'Michael Wong',
      role: locale === 'th' ? 'ประธานเจ้าหน้าที่ฝ่ายปฏิบัติการ' : 'COO',
    },
  ]

  return (
    <>
      <AboutHero
        title={locale === 'th' ? 'เกี่ยวกับเรา' : 'About Us'}
        description={
          locale === 'th'
            ? 'Thinkspace Technology เป็นผู้นำด้านโซลูชันเทคโนโลยีสำหรับองค์กร ให้บริการครบวงจรตั้งแต่ Cloud, Security, Data & AI จนถึง Research & Development'
            : 'Thinkspace Technology is a leading enterprise technology solutions provider, offering end-to-end services from Cloud, Security, Data & AI to Research & Development.'
        }
      />

      <ValuesSection values={values} />

      <StorySection
        locale={locale}
        storyTitle={locale === 'th' ? 'เรื่องราวของเรา' : 'Our Story'}
        storyParagraph1={
          locale === 'th'
            ? 'Thinkspace Technology เริ่มต้นจากทีมวิศวกรที่มีความหลงใหลในเทคโนโลยี ด้วยเป้าหมายในการช่วยให้องค์กรสามารถใช้ประโยชน์จากเทคโนโลยีได้อย่างเต็มที่'
            : 'Thinkspace Technology started as a team of engineers passionate about technology, with a goal to help organizations leverage technology to its fullest potential.'
        }
        storyParagraph2={
          locale === 'th'
            ? 'ปัจจุบันเราให้บริการลูกค้ากว่า 500 รายในหลากหลายอุตสาหกรรม ตั้งแต่สตาร์ทอัพจนถึงองค์กรขนาดใหญ่ ด้วยทีมผู้เชี่ยวชาญกว่า 200 คน'
            : 'Today, we serve over 500 clients across various industries, from startups to large enterprises, with a team of over 200 experts.'
        }
        milestonesTitle={locale === 'th' ? 'เหตุการณ์สำคัญ' : 'Key Milestones'}
        milestones={milestones}
      />

      <TeamSection
        title={locale === 'th' ? 'ทีมผู้บริหาร' : 'Leadership Team'}
        description={
          locale === 'th'
            ? 'ทีมผู้บริหารที่มีประสบการณ์กว่า 20 ปีในอุตสาหกรรมเทคโนโลยี'
            : 'Experienced leadership with over 20 years in the technology industry.'
        }
        members={teamMembers}
      />
    </>
  )
}
