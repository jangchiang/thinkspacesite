import { type Locale } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionary'
import type { Metadata } from 'next'
import {
  AboutHero,
  ValuesSection,
  StorySection,
  TeamSection,
} from '@/components/sections/about-sections'
import { getPageHero, getAboutPage } from '@/lib/strapi'
import { buildHeroBackground } from '@/lib/hero-utils'

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

// Fallback data
const fallbackValues = {
  th: [
    { iconName: 'Target', title: 'พันธกิจ', description: 'เราช่วยองค์กรเปลี่ยนแปลงด้วยเทคโนโลยีที่ทันสมัยและโซลูชันที่ขับเคลื่อนผลลัพธ์' },
    { iconName: 'Award', title: 'วิสัยทัศน์', description: 'เป็นพันธมิตรด้านเทคโนโลยีชั้นนำในภูมิภาค สร้างนวัตกรรมและคุณค่าให้กับลูกค้า' },
    { iconName: 'Users', title: 'ทีมงาน', description: 'ทีมผู้เชี่ยวชาญกว่า 200 คน พร้อมให้บริการและสนับสนุนลูกค้าทุกขนาด' },
    { iconName: 'Globe', title: 'ขอบเขต', description: 'ให้บริการลูกค้าในกว่า 15 ประเทศทั่วภูมิภาคเอเชียแปซิฟิก' },
  ],
  en: [
    { iconName: 'Target', title: 'Mission', description: 'We help organizations transform with cutting-edge technology and solutions that drive results.' },
    { iconName: 'Award', title: 'Vision', description: 'To be the leading technology partner in the region, creating innovation and value for our clients.' },
    { iconName: 'Users', title: 'Team', description: 'Over 200 experts ready to serve and support clients of all sizes.' },
    { iconName: 'Globe', title: 'Reach', description: 'Serving clients in over 15 countries across the Asia-Pacific region.' },
  ],
}

const fallbackMilestones = {
  th: [
    { year: '2008', event: 'ก่อตั้งบริษัท', detail: 'เริ่มต้นด้วยทีมวิศวกร 5 คน ให้บริการด้าน IT Consulting' },
    { year: '2012', event: 'ขยายบริการ Cloud', detail: 'เปิดตัวบริการ Cloud Infrastructure และ Migration Services' },
    { year: '2016', event: 'เปิดศูนย์ Security', detail: 'เปิด Security Operations Center (SOC) ให้บริการ 24/7' },
    { year: '2020', event: 'ลูกค้า 500+ ราย', detail: 'ให้บริการลูกค้าในกว่า 15 ประเทศทั่วเอเชียแปซิฟิก' },
    { year: '2024', event: 'ขยายสู่ AI Solutions', detail: 'เปิดตัว AI & Data Analytics Platform สำหรับองค์กร' },
  ],
  en: [
    { year: '2008', event: 'Company Founded', detail: 'Started with a team of 5 engineers, providing IT Consulting services' },
    { year: '2012', event: 'Cloud Services Expansion', detail: 'Launched Cloud Infrastructure and Migration Services' },
    { year: '2016', event: 'Security Center Launch', detail: 'Opened 24/7 Security Operations Center (SOC)' },
    { year: '2020', event: '500+ Clients Milestone', detail: 'Serving clients across 15+ countries in Asia-Pacific' },
    { year: '2024', event: 'AI Solutions Launch', detail: 'Launched Enterprise AI & Data Analytics Platform' },
  ],
}

const fallbackTeamMembers = {
  th: [
    { name: 'Bangkok Bank', role: 'พันธมิตรด้านธนาคาร' },
    { name: 'PTT Exploration', role: 'พันธมิตรด้านพลังงาน' },
    { name: 'Revenue Department', role: 'พันธมิตรภาครัฐ' },
  ],
  en: [
    { name: 'Bangkok Bank', role: 'Banking Partner' },
    { name: 'PTT Exploration', role: 'Energy Partner' },
    { name: 'Revenue Department', role: 'Government Partner' },
  ],
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params

  // Fetch hero and about page in parallel
  const [heroData, aboutData] = await Promise.all([
    getPageHero('about', locale),
    getAboutPage(locale),
  ])

  const heroBackground = buildHeroBackground(heroData)

  // Use Strapi data only (no fallbacks)
  const values = aboutData?.values?.map(v => ({ iconName: v.iconName, title: v.title, description: v.description })) || []

  const milestones = aboutData?.milestones?.map(m => ({ year: m.year, event: m.event, detail: m.detail })) || []

  const teamMembers = aboutData?.teamMembers?.map(t => ({ name: t.name, role: t.role })) || []

  const storyTitle = aboutData?.storyTitle || ''
  const storyParagraph1 = aboutData?.storyParagraph1 || ''
  const storyParagraph2 = aboutData?.storyParagraph2 || ''
  const milestonesTitle = aboutData?.milestonesTitle || ''
  const teamSectionTitle = aboutData?.teamSectionTitle || ''
  const teamSectionDescription = aboutData?.teamSectionDescription || ''

  return (
    <>
      <AboutHero
        title={heroData?.title || ''}
        description={heroData?.subtitle || ''}
        background={heroBackground}
      />

      <ValuesSection values={values} />

      <StorySection
        locale={locale}
        storyTitle={storyTitle}
        storyParagraph1={storyParagraph1}
        storyParagraph2={storyParagraph2}
        milestonesTitle={milestonesTitle}
        milestones={milestones}
      />

      <TeamSection
        title={teamSectionTitle}
        description={teamSectionDescription}
        members={teamMembers}
      />
    </>
  )
}
