/**
 * Server-safe utility functions for hero backgrounds
 */

export interface HeroBackground {
  type: 'none' | 'image' | 'video'
  imageUrl?: string
  videoUrl?: string
  overlayOpacity?: number // 0-100
  overlayColor?: string // hex color
  textColor?: 'light' | 'dark'
}

export interface HeroData {
  backgroundType?: 'none' | 'image' | 'video'
  backgroundImage?: {
    url: string
    formats?: {
      large?: { url: string }
      medium?: { url: string }
    }
  }
  backgroundVideo?: { url: string }
  videoUrl?: string
  overlayOpacity?: number
  overlayColor?: string
  textColor?: 'light' | 'dark'
}

/**
 * Build background config from Strapi hero data
 * This function is safe to use in server components
 */
export function buildHeroBackground(
  heroData: HeroData | null,
  strapiUrl?: string
): HeroBackground | null {
  if (!heroData || heroData.backgroundType === 'none') {
    return null
  }

  let imageUrl: string | undefined
  if (heroData.backgroundImage) {
    const img = heroData.backgroundImage
    const url = img.formats?.large?.url || img.formats?.medium?.url || img.url
    // Use local proxy path so Next.js image optimizer can reach CMS internally
    if (url.startsWith('/uploads/')) {
      imageUrl = `/cms-uploads${url.replace('/uploads', '')}`
    } else if (url.startsWith('http')) {
      imageUrl = url
    } else {
      imageUrl = `/cms-uploads${url}`
    }
  }

  let videoUrl: string | undefined
  const baseUrl = strapiUrl || process.env.NEXT_PUBLIC_STRAPI_URL || 'https://cms.techthinkspace.com'
  if (heroData.backgroundVideo?.url) {
    const url = heroData.backgroundVideo.url
    videoUrl = url.startsWith('http') ? url : `${baseUrl}${url}`
  } else if (heroData.videoUrl) {
    videoUrl = heroData.videoUrl
  }

  return {
    type: heroData.backgroundType || 'none',
    imageUrl,
    videoUrl,
    overlayOpacity: heroData.overlayOpacity ?? 60,
    overlayColor: heroData.overlayColor ?? '#000000',
    textColor: heroData.textColor ?? 'light',
  }
}
