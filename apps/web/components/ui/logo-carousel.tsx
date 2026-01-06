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
    <div className="w-full overflow-hidden py-2 sm:py-4 md:py-6">
      {title && (
        <p className="text-[10px] sm:text-xs md:text-sm text-base-content/50 text-center mb-2 sm:mb-4 md:mb-6">
          {title}
        </p>
      )}
      <div className="relative">
        {/* Gradient overlays - smaller on mobile */}
        <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 md:w-24 bg-gradient-to-r from-base-100 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 md:w-24 bg-gradient-to-l from-base-100 to-transparent z-10 pointer-events-none" />

        {/* Scrolling container */}
        <motion.div
          className="flex items-center gap-4 sm:gap-8 md:gap-12"
          animate={{
            x: ['0%', '-50%'],
          }}
          transition={{
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
            // Build full URL - strapiUrl is passed from server component
            const fullLogoUrl = logoUrl ? `${strapiUrl}${logoUrl}` : null
            return (
              <div
                key={`${partner.id}-${index}`}
                className="relative h-6 w-16 sm:h-8 sm:w-24 md:h-12 md:w-32 lg:h-14 lg:w-36 flex-shrink-0 opacity-50 hover:opacity-100 transition-all duration-300"
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
