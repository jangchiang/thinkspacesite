'use client'

import Image from 'next/image'
import { type ReactNode } from 'react'
import { type HeroBackground } from '@/lib/hero-utils'

export type { HeroBackground }

interface HeroSectionProps {
  children: ReactNode
  background?: HeroBackground | null
  className?: string
  minHeight?: string
  defaultGradient?: string
}

export function HeroSection({
  children,
  background,
  className = '',
  minHeight = 'min-h-[50vh]',
  defaultGradient = 'bg-gradient-to-br from-base-100 to-primary/5',
}: HeroSectionProps) {
  const hasBackground = background && background.type !== 'none'
  const overlayOpacity = background?.overlayOpacity ?? 60
  const overlayColor = background?.overlayColor ?? '#000000'
  const textColorClass = background?.textColor === 'dark' ? 'text-base-content' : 'text-white'

  // Convert hex to RGB for rgba
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 0, g: 0, b: 0 }
  }

  const rgb = hexToRgb(overlayColor)
  const overlayStyle = {
    backgroundColor: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${overlayOpacity / 100})`,
  }

  if (!hasBackground) {
    // Default gradient background
    return (
      <section className={`section-padding ${defaultGradient} ${className}`}>
        <div className="container-custom">
          {children}
        </div>
      </section>
    )
  }

  return (
    <section className={`relative ${minHeight} flex items-center overflow-hidden ${className}`}>
      {/* Background Media */}
      {background.type === 'image' && background.imageUrl && (
        <div className="absolute inset-0">
          <Image
            src={background.imageUrl}
            alt=""
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
      )}

      {background.type === 'video' && background.videoUrl && (
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={background.videoUrl} type="video/mp4" />
          </video>
        </div>
      )}

      {/* Overlay */}
      <div className="absolute inset-0" style={overlayStyle} />

      {/* Gradient fade at bottom for smooth transition */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-base-100 to-transparent" />

      {/* Content */}
      <div className={`container-custom relative z-10 py-20 ${textColorClass}`}>
        {children}
      </div>
    </section>
  )
}

