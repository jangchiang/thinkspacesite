'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { type Locale } from '@/lib/i18n'

interface CategoryFilterProps {
  categories: string[]
  locale: Locale
  basePath: string
}

export function CategoryFilter({ categories, locale, basePath }: CategoryFilterProps): React.JSX.Element {
  const searchParams = useSearchParams()
  const currentCategory = searchParams.get('category') || ''

  const allLabel = locale === 'th' ? 'ทั้งหมด' : 'All'

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <Link
        href={basePath}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          !currentCategory
            ? 'bg-primary text-primary-content'
            : 'bg-base-200 text-base-content hover:bg-base-300'
        }`}
      >
        {allLabel}
      </Link>
      {categories.map((category) => (
        <Link
          key={category}
          href={`${basePath}?category=${encodeURIComponent(category)}`}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            currentCategory === category
              ? 'bg-primary text-primary-content'
              : 'bg-base-200 text-base-content hover:bg-base-300'
          }`}
        >
          {category}
        </Link>
      ))}
    </div>
  )
}
