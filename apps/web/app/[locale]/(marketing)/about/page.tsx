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
