'use client'

import Link from 'next/link'
import { useState } from 'react'

interface PartnerLogoProps {
  name: string
  src?: string
  href?: string
  /** classes applied to the <img> (e.g. height, grayscale, opacity) */
  className?: string
  /** classes applied to the text wordmark fallback */
  wordmarkClassName?: string
}

/**
 * PartnerLogo renders a partner/client mark for a logo wall.
 * - If `src` is provided AND the image loads, it renders the logo as a height-
 *   constrained <img> (w-auto) so logos line up by height regardless of aspect.
 * - Otherwise (no src, or the image 404s) it falls back to a text wordmark.
 */
export function PartnerLogo({
  name,
  src,
  href,
  className = '',
  wordmarkClassName = '',
}: PartnerLogoProps): React.JSX.Element {
  const [failed, setFailed] = useState(false)
  const useImage = src && !failed

  const content = useImage ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src as string}
      alt={name}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`w-auto object-contain ${className}`}
    />
  ) : (
    <span className={`inline-flex items-center justify-center font-semibold tracking-tight ${wordmarkClassName}`}>
      {name}
    </span>
  )

  if (href) {
    return (
      <Link
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        className="inline-flex items-center justify-center"
      >
        {content}
      </Link>
    )
  }

  return content
}
