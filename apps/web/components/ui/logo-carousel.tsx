'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

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
}

export function LogoCarousel({ partners, title, strapiUrl = '' }: LogoCarouselProps): React.JSX.Element | null {
  if (partners.length === 0) return null

  // Double the partners for seamless infinite scroll
  const doubledPartners = [...partners, ...partners]

  return (
    <div className="w-full overflow-hidden py-4 sm:py-6 md:py-8">
      {title && (
        <p className="text-xs sm:text-sm text-base-content/50 text-center mb-4 sm:mb-6 md:mb-8">
          {title}
        </p>
      )}
      <div className="relative">
        {/* Gradient overlays - smaller on mobile */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 md:w-32 bg-gradient-to-r from-base-100 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 md:w-32 bg-gradient-to-l from-base-100 to-transparent z-10 pointer-events-none" />

        {/* Scrolling container */}
        <motion.div
          className="flex items-center gap-6 sm:gap-10 md:gap-16"
          animate={{
            x: ['0%', '-50%'],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 30,
              ease: 'linear',
            },
          }}
        >
          {doubledPartners.map((partner, index) => {
            const logoUrl = partner.logo?.formats?.small?.url ||
                            partner.logo?.formats?.thumbnail?.url ||
                            partner.logo?.url
            // Build full URL - strapiUrl is passed from server component
            const fullLogoUrl = logoUrl ? `${strapiUrl}${logoUrl}` : null
            return (
              <div
                key={`${partner.id}-${index}`}
                className="relative h-8 w-20 sm:h-10 sm:w-28 md:h-14 md:w-36 lg:h-16 lg:w-40 flex-shrink-0 opacity-60 hover:opacity-100 transition-all duration-300"
              >
                {fullLogoUrl && (
                  <Image
                    src={fullLogoUrl}
                    alt={partner.name}
                    fill
                    className="object-contain"
                    unoptimized
                  />
                )}
              </div>
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}
