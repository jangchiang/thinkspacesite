'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

interface PartnerLogoProps {
  name: string
  src?: string
  href?: string
  className?: string
}

/**
 * PartnerLogo renders a partner/client mark.
 * - If `src` is provided AND the image loads, it renders the logo image.
 * - Otherwise (no src, or the image 404s/errors) it falls back to a tasteful
 *   monochrome text wordmark of `name`.
 *
 * File slots referenced elsewhere: /images/partners/dell.svg,
 * /images/partners/google-cloud.svg, /images/partners/logix.svg — dropping
 * those files in "just works"; until then the wordmark shows automatically.
 */
export function PartnerLogo({ name, src, href, className = '' }: PartnerLogoProps): React.JSX.Element {
  const [failed, setFailed] = useState(false)
  const useImage = src && !failed

  const content = useImage ? (
    <span className={`relative inline-flex h-full w-full items-center justify-center ${className}`}>
      <Image
        src={src as string}
        alt={name}
        fill
        className="object-contain"
        sizes="200px"
        unoptimized
        onError={() => setFailed(true)}
      />
    </span>
  ) : (
    <span
      className={`inline-flex items-center justify-center font-semibold tracking-tight ${className}`}
    >
      {name}
    </span>
  )

  if (href) {
    return (
      <Link
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        className="inline-flex h-full w-full items-center justify-center"
      >
        {content}
      </Link>
    )
  }

  return content
}
