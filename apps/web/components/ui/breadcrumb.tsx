'use client'

import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { type Locale } from '@/lib/i18n'

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  locale: Locale
  className?: string
}

export function Breadcrumb({ items, locale, className = '' }: BreadcrumbProps) {
  const homeLabel = locale === 'th' ? 'หน้าแรก' : 'Home'

  return (
    <nav aria-label="Breadcrumb" className={`text-sm ${className}`}>
      <ol className="flex items-center flex-wrap gap-1">
        {/* Home */}
        <li className="flex items-center">
          <Link
            href={`/${locale}`}
            className="flex items-center gap-1 text-base-content/60 hover:text-primary transition-colors"
          >
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline">{homeLabel}</span>
          </Link>
        </li>

        {/* Items */}
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <ChevronRight className="w-4 h-4 mx-1 text-base-content/40" />
            {item.href ? (
              <Link
                href={item.href}
                className="text-base-content/60 hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-base-content font-medium">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

// Helper function to generate breadcrumb items from a pathname
export function generateBreadcrumbs(
  pathname: string,
  locale: Locale,
  currentPageTitle?: string
): BreadcrumbItem[] {
  const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/'
  const segments = pathWithoutLocale.split('/').filter(Boolean)

  // Route labels mapping
  const routeLabels: Record<string, { th: string; en: string }> = {
    about: { th: 'เกี่ยวกับเรา', en: 'About' },
    services: { th: 'บริการ', en: 'Services' },
    works: { th: 'ผลงาน', en: 'Works' },
    news: { th: 'ข่าวสาร', en: 'News' },
    careers: { th: 'ร่วมงาน', en: 'Careers' },
    contact: { th: 'ติดต่อ', en: 'Contact' },
    privacy: { th: 'นโยบายความเป็นส่วนตัว', en: 'Privacy Policy' },
    terms: { th: 'ข้อกำหนด', en: 'Terms of Service' },
    cookies: { th: 'นโยบายคุกกี้', en: 'Cookie Policy' },
  }

  const items: BreadcrumbItem[] = []
  let currentPath = `/${locale}`

  segments.forEach((segment, index) => {
    currentPath += `/${segment}`
    const isLast = index === segments.length - 1

    // Get label from mapping or use current page title for last item
    let label = routeLabels[segment]
      ? (locale === 'th' ? routeLabels[segment].th : routeLabels[segment].en)
      : segment

    // For the last item, use the provided title if available
    if (isLast && currentPageTitle) {
      label = currentPageTitle
    }

    items.push({
      label,
      href: isLast ? undefined : currentPath,
    })
  })

  return items
}
