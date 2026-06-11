'use client'

import Image from 'next/image'
import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

interface Partner {
  id: number
  name: string
  website?: string
  logo?: {
    url: string
    formats?: {
      thumbnail?: { url: string }
      small?: { url: string }
    }
  }
}

interface LogoCarouselProps {
  partners: Partner[]
  title?: string
  strapiUrl?: string
  /** 'light' (default) fades to base-100; 'dark' fades to the secondary surface used on dark heroes */
  surface?: 'light' | 'dark'
}

export function LogoCarousel({ partners, title, strapiUrl = '', surface = 'light' }: LogoCarouselProps): React.JSX.Element | null {
  const reduceMotion = useReducedMotion()

  if (partners.length === 0) return null

  // Double the partners for seamless infinite scroll
  const doubledPartners = [...partners, ...partners]

  const isDark = surface === 'dark'
  const fade = isDark ? 'from-secondary' : 'from-base-100'
  const titleColor = isDark ? 'text-white/60' : 'text-base-content/60'

  return (
    <div className="w-full overflow-hidden py-2 sm:py-4 md:py-6">
      {title && (
        <p className={`text-[10px] sm:text-xs md:text-sm ${titleColor} text-center mb-2 sm:mb-4 md:mb-6`}>
          {title}
        </p>
      )}
      <div className="relative">
        {/* Gradient overlays - matched to the surface so they don't smudge on dark heroes */}
        <div className={`absolute left-0 top-0 bottom-0 w-8 sm:w-16 md:w-24 bg-gradient-to-r ${fade} to-transparent z-10 pointer-events-none`} />
        <div className={`absolute right-0 top-0 bottom-0 w-8 sm:w-16 md:w-24 bg-gradient-to-l ${fade} to-transparent z-10 pointer-events-none`} />

        {/* Scrolling container — respects prefers-reduced-motion */}
        <motion.div
          className="flex items-center gap-4 sm:gap-8 md:gap-12"
          animate={reduceMotion ? undefined : { x: ['0%', '-50%'] }}
          transition={reduceMotion ? undefined : {
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 25,
              ease: 'linear',
            },
          }}
        >
          {doubledPartners.map((partner, index) => {
            const logoUrl = partner.logo?.formats?.small?.url ||
                            partner.logo?.formats?.thumbnail?.url ||
                            partner.logo?.url
            // Build full URL — guard for already-absolute paths (http/https/data)
            const fullLogoUrl = logoUrl
              ? (/^(https?:|data:)/.test(logoUrl) ? logoUrl : `${strapiUrl}${logoUrl}`)
              : null
            return (
              <CarouselLogo
                key={`${partner.id}-${index}`}
                name={partner.name}
                src={fullLogoUrl}
                isDark={isDark}
              />
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}

/** A single logo cell that falls back to a text wordmark when the image is
 *  missing or fails to load (e.g. a 404 from the CMS), instead of a broken icon. */
function CarouselLogo({ name, src, isDark }: { name: string; src: string | null; isDark: boolean }): React.JSX.Element {
  const [failed, setFailed] = useState(false)
  const showImage = src && !failed
  return (
    <div className="relative h-6 w-16 sm:h-8 sm:w-24 md:h-12 md:w-32 lg:h-14 lg:w-36 flex-shrink-0 opacity-60 hover:opacity-100 transition-all duration-300">
      {showImage ? (
        <Image
          src={src as string}
          alt={name}
          fill
          className="object-contain"
          unoptimized
          onError={() => setFailed(true)}
        />
      ) : (
        <span className={`flex h-full w-full items-center justify-center text-center text-[11px] sm:text-xs md:text-sm font-semibold tracking-tight ${isDark ? 'text-white/70' : 'text-base-content/70'}`}>
          {name}
        </span>
      )}
    </div>
  )
}
