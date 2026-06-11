import { type Locale } from '@/lib/i18n'
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
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params as { locale: Locale }
  const isTh = locale === 'th'

  return {
    title: isTh ? 'เกี่ยวกับเรา | ThinkSpace' : 'About Us | ThinkSpace',
    description: isTh
      ? 'บริษัท ธิงค์สเปซ เทคโนโลยี จำกัด ผู้นำด้าน AI, Data, Simulation และ Digital Engineering จากเชียงใหม่'
      : 'THINKSPACE TECHNOLOGIES CO., LTD. — a Chiang Mai based leader in AI, Data, Simulation and Digital Engineering.',
  }
}

export default async function AboutPage({ params }: Props): Promise<React.JSX.Element> {
  const { locale } = await params as { locale: Locale }
  const isTh = locale === 'th'

  // Fetch hero and about page in parallel
  const [heroData, aboutData] = await Promise.all([
    getPageHero('about', locale),
    getAboutPage(locale),
  ])

  const heroBackground = buildHeroBackground(heroData)

  // ---- Real-content fallbacks (used when Strapi is empty) ----

  const heroTitle =
    heroData?.title ||
    (isTh ? 'จากวิสัยทัศน์ สู่ความเป็นจริง' : 'From Vision to Reality')
  const heroDescription =
    heroData?.subtitle ||
    (isTh
      ? 'ธิงค์สเปซ เทคโนโลยี คือบริษัทเทคโนโลยีจากเชียงใหม่ที่มุ่งเป็นผู้นำด้าน AI, Data, Simulation และ Digital Engineering เพื่อเปลี่ยนวิสัยทัศน์ขององค์กรให้กลายเป็นความจริง'
      : 'ThinkSpace Technologies is a Chiang Mai based technology company on a mission to lead in AI, Data, Simulation and Digital Engineering — turning organizational vision into reality.')

  // Vision & Mission as "values" cards
  const valuesFallback = isTh
    ? [
        {
          iconName: 'Eye',
          title: 'วิสัยทัศน์',
          description:
            'เป็นผู้นำด้านปัญญาประดิษฐ์ (AI), ข้อมูล (DATA), การจำลองสถานการณ์ (SIMULATION) และวิศวกรรมดิจิทัล (DIGITAL ENGINEERING) ที่ขับเคลื่อนองค์กรไทยสู่อนาคต',
        },
        {
          iconName: 'Compass',
          title: 'พันธกิจ',
          description:
            'เปลี่ยนวิสัยทัศน์ให้เป็นความจริง (From Vision to Reality) ด้วยเทคโนโลยีที่ออกแบบมาเพื่อแก้ปัญหาจริง สร้างคุณค่าที่วัดผลได้ และยกระดับขีดความสามารถขององค์กร',
        },
      ]
    : [
        {
          iconName: 'Eye',
          title: 'Vision',
          description:
            'To be a leader in Artificial Intelligence (AI), Data, Simulation and Digital Engineering — driving Thai organizations toward the future.',
        },
        {
          iconName: 'Compass',
          title: 'Mission',
          description:
            'From Vision to Reality — delivering technology designed to solve real problems, create measurable value, and elevate the capability of every organization we serve.',
        },
      ]
  const values =
    aboutData?.values?.map((v) => ({
      iconName: v.iconName,
      title: v.title,
      description: v.description,
    })) || valuesFallback

  // Milestone timeline fallback
  const milestonesFallback = isTh
    ? [
        {
          year: '2024',
          event: 'ก่อตั้งบริษัท',
          detail:
            'จดทะเบียนจัดตั้ง บริษัท ธิงค์สเปซ เทคโนโลยี จำกัด เมื่อวันที่ 22 พฤศจิกายน 2567 ที่จังหวัดเชียงใหม่',
        },
        {
          year: '2025',
          event: 'โครงการระดับองค์กร',
          detail:
            'ร่วมงานกับ CMU-RAILCFC พัฒนา Digital Twin งานรถไฟ และ AI ประเมินความเสี่ยงเสถียรภาพลาดดินร่วมกับ กฟผ. (EGAT)',
        },
        {
          year: '2026',
          event: 'ขยายขอบเขต',
          detail:
            'ขยายงานด้าน Private AI, แพลตฟอร์ม Logix และโครงสร้างพื้นฐานองค์กรสู่ลูกค้าทั้งภาครัฐและเอกชน',
        },
      ]
    : [
        {
          year: '2024',
          event: 'Company Founded',
          detail:
            'THINKSPACE TECHNOLOGIES CO., LTD. registered on 22 November 2024 in Chiang Mai, Thailand.',
        },
        {
          year: '2025',
          event: 'Enterprise Projects',
          detail:
            'Delivered a 3D railway Digital Twin with CMU-RAILCFC and a slope-stability risk AI in partnership with EGAT.',
        },
        {
          year: '2026',
          event: 'Scaling Up',
          detail:
            'Expanding Private AI, the Logix platform, and enterprise infrastructure across public and private sector clients.',
        },
      ]
  const milestones =
    aboutData?.milestones?.map((m) => ({
      year: m.year,
      event: m.event,
      detail: m.detail,
    })) || milestonesFallback

  const teamMembers =
    aboutData?.teamMembers?.map((t) => ({
      name: t.name,
      role: t.role,
      photo: t.photo,
    })) || []

  const storyTitle =
    aboutData?.storyTitle ||
    (isTh ? 'เปลี่ยนวิสัยทัศน์ให้เป็นความจริง' : 'Turning vision into reality')
  const storyParagraph1 =
    aboutData?.storyParagraph1 ||
    (isTh
      ? 'ThinkSpace Technologies ก่อตั้งขึ้นในปี 2567 ที่จังหวัดเชียงใหม่ ด้วยทีมผู้เชี่ยวชาญด้านปัญญาประดิษฐ์ วิทยาศาสตร์ข้อมูล และวิศวกรรม เรารวมงานวิจัยระดับมหาวิทยาลัยเข้ากับการลงมือทำจริง เพื่อส่งมอบโซลูชันที่ใช้งานได้จริงให้กับองค์กร'
      : 'Founded in 2024 in Chiang Mai, ThinkSpace Technologies brings together specialists in artificial intelligence, data science and engineering. We combine university-grade research with hands-on delivery to ship solutions that work in the real world.')
  const storyParagraph2 =
    aboutData?.storyParagraph2 ||
    (isTh
      ? 'จากงาน Digital Twin ของระบบราง การวิเคราะห์ความเสี่ยงด้วย AI ไปจนถึงแพลตฟอร์ม AI แบบอธิปไตยข้อมูล (Private AI) เราทำงานเคียงข้างลูกค้าทั้งภาครัฐและเอกชน เพื่อสร้างเทคโนโลยีที่เป็นของคุณอย่างแท้จริง'
      : 'From railway Digital Twins and AI risk analytics to sovereign Private AI platforms, we work alongside public and private sector clients to build technology you truly own.')

  const milestonesTitle =
    aboutData?.milestonesTitle || (isTh ? 'เส้นทางการเติบโต' : 'Our Journey')
  const teamSectionTitle =
    aboutData?.teamSectionTitle || (isTh ? 'ทีมผู้บริหาร' : 'Our Executive Team')
  const teamSectionDescription =
    aboutData?.teamSectionDescription ||
    (isTh
      ? 'ทีมผู้บริหารของเรารวมความเชี่ยวชาญด้าน AI วิศวกรรมโยธา และวิศวกรรมเครื่องกล จากสถาบันชั้นนำ'
      : 'Our leadership combines expertise in AI, civil engineering and mechanical engineering from leading institutions.')

  // Get PUBLIC Strapi URL for client components (images need to be accessible from browser)
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://cms.techthinkspace.com'

  return (
    <>
      <AboutHero
        title={heroTitle}
        description={heroDescription}
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
        strapiUrl={strapiUrl}
      />
    </>
  )
}
