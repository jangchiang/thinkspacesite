// Strapi CMS types

export interface StrapiResponse<T> {
  data: T
  meta: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export interface StrapiEntity<T> {
  id: number
  attributes: T & {
    createdAt: string
    updatedAt: string
    publishedAt: string | null
  }
}

export interface StrapiMedia {
  id: number
  attributes: {
    name: string
    alternativeText: string | null
    caption: string | null
    width: number
    height: number
    formats: {
      thumbnail?: StrapiImageFormat
      small?: StrapiImageFormat
      medium?: StrapiImageFormat
      large?: StrapiImageFormat
    }
    url: string
    previewUrl: string | null
    mime: string
    size: number
  }
}

export interface StrapiImageFormat {
  name: string
  hash: string
  ext: string
  mime: string
  width: number
  height: number
  size: number
  url: string
}

// SEO Component
export interface StrapiSEO {
  metaTitle: string | null
  metaDescription: string | null
  ogImage: { data: StrapiMedia | null }
  canonicalUrl: string | null
  noIndex: boolean
}

// Button Component
export interface StrapiButton {
  label: string
  url: string
  variant: 'primary' | 'secondary' | 'outline' | 'ghost'
  openInNewTab: boolean
}

// Feature Item Component
export interface StrapiFeatureItem {
  title: string
  description: string
  icon: string | null
}

// Metric Component
export interface StrapiMetric {
  value: string
  label: string
  prefix: string | null
  suffix: string | null
}

// Testimonial Quote Component
export interface StrapiTestimonialQuote {
  quote: string
  author: string
  title: string | null
  company: string | null
  image: { data: StrapiMedia | null }
}

// Section Components
export interface StrapiHeroSection {
  __component: 'sections.hero'
  headline: string
  subheadline: string | null
  backgroundType: 'image' | 'video' | 'gradient'
  backgroundImage: { data: StrapiMedia | null }
  backgroundVideo: string | null
  primaryButton: StrapiButton | null
  secondaryButton: StrapiButton | null
  alignment: 'left' | 'center' | 'right'
}

export interface StrapiFeaturesSection {
  __component: 'sections.features'
  title: string | null
  subtitle: string | null
  columns: '2' | '3' | '4'
  features: StrapiFeatureItem[]
}

export interface StrapiCTASection {
  __component: 'sections.cta'
  title: string
  description: string | null
  primaryButton: StrapiButton | null
  secondaryButton: StrapiButton | null
  backgroundType: 'primary' | 'secondary' | 'gradient'
}

export interface StrapiStatsSection {
  __component: 'sections.stats'
  title: string | null
  metrics: StrapiMetric[]
}

export interface StrapiTestimonialsSection {
  __component: 'sections.testimonials'
  title: string | null
  testimonials: StrapiTestimonialQuote[]
}

export type StrapiDynamicZone =
  | StrapiHeroSection
  | StrapiFeaturesSection
  | StrapiCTASection
  | StrapiStatsSection
  | StrapiTestimonialsSection

// Content Types
export interface StrapiPage {
  title: string
  slug: string
  seo: StrapiSEO | null
  sections: StrapiDynamicZone[]
}

export interface StrapiService {
  name: string
  slug: string
  shortDescription: string
  description: string | null
  icon: string | null
  image: { data: StrapiMedia | null }
  features: StrapiFeatureItem[]
  relatedServices: { data: StrapiEntity<StrapiService>[] }
  caseStudies: { data: StrapiEntity<StrapiCaseStudy>[] }
  seo: StrapiSEO | null
  order: number
}

export interface StrapiCaseStudy {
  title: string
  slug: string
  client: string
  clientLogo: { data: StrapiMedia | null }
  industry: { data: StrapiEntity<StrapiIndustry> | null }
  services: { data: StrapiEntity<StrapiService>[] }
  challenge: string
  solution: string
  results: StrapiMetric[]
  testimonial: StrapiTestimonialQuote | null
  featuredImage: { data: StrapiMedia | null }
  gallery: { data: StrapiMedia[] }
  featured: boolean
  seo: StrapiSEO | null
}

export interface StrapiBlogPost {
  title: string
  slug: string
  excerpt: string
  content: string
  featuredImage: { data: StrapiMedia | null }
  author: { data: StrapiEntity<StrapiTeamMember> | null }
  category: { data: StrapiEntity<StrapiCategory> | null }
  tags: { data: StrapiEntity<StrapiTag>[] }
  readTime: number | null
  seo: StrapiSEO | null
}

export interface StrapiTeamMember {
  name: string
  slug: string
  title: string
  department: string | null
  bio: string | null
  image: { data: StrapiMedia | null }
  email: string | null
  linkedin: string | null
  twitter: string | null
  order: number
}

export interface StrapiIndustry {
  name: string
  slug: string
  description: string | null
  icon: string | null
}

export interface StrapiCategory {
  name: string
  slug: string
  description: string | null
}

export interface StrapiTag {
  name: string
  slug: string
}

export interface StrapiTestimonial {
  quote: string
  author: string
  title: string | null
  company: string | null
  image: { data: StrapiMedia | null }
  featured: boolean
}

export interface StrapiPartner {
  name: string
  logo: { data: StrapiMedia | null }
  tier: 'platinum' | 'gold' | 'silver' | 'bronze'
  website: string | null
  order: number
}

// Helper type aliases
export type Page = StrapiEntity<StrapiPage>
export type Service = StrapiEntity<StrapiService>
export type CaseStudy = StrapiEntity<StrapiCaseStudy>
export type BlogPost = StrapiEntity<StrapiBlogPost>
export type TeamMember = StrapiEntity<StrapiTeamMember>
