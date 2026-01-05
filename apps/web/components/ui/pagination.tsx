'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { type Locale } from '@/lib/i18n'

interface PaginationProps {
  currentPage: number
  totalPages: number
  basePath: string
  locale: Locale
}

export function Pagination({ currentPage, totalPages, basePath, locale }: PaginationProps) {
  const searchParams = useSearchParams()

  if (totalPages <= 1) return null

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    if (page === 1) {
      params.delete('page')
    } else {
      params.set('page', String(page))
    }
    const queryString = params.toString()
    return queryString ? `${basePath}?${queryString}` : basePath
  }

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | 'ellipsis')[] = []
    const showPages = 5 // Number of page buttons to show

    if (totalPages <= showPages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Always show first page
      pages.push(1)

      if (currentPage > 3) {
        pages.push('ellipsis')
      }

      // Show pages around current
      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)

      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      if (currentPage < totalPages - 2) {
        pages.push('ellipsis')
      }

      // Always show last page
      pages.push(totalPages)
    }

    return pages
  }

  const pageNumbers = getPageNumbers()

  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      {/* Previous */}
      {currentPage > 1 ? (
        <Link
          href={createPageUrl(currentPage - 1)}
          className="btn btn-ghost btn-sm"
          aria-label={locale === 'th' ? 'หน้าก่อนหน้า' : 'Previous page'}
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">{locale === 'th' ? 'ก่อนหน้า' : 'Previous'}</span>
        </Link>
      ) : (
        <button className="btn btn-ghost btn-sm btn-disabled" disabled>
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">{locale === 'th' ? 'ก่อนหน้า' : 'Previous'}</span>
        </button>
      )}

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {pageNumbers.map((page, index) =>
          page === 'ellipsis' ? (
            <span key={`ellipsis-${index}`} className="px-2 text-base-content/50">
              ...
            </span>
          ) : (
            <Link
              key={page}
              href={createPageUrl(page)}
              className={`btn btn-sm min-w-[40px] ${
                currentPage === page
                  ? 'btn-primary'
                  : 'btn-ghost'
              }`}
            >
              {page}
            </Link>
          )
        )}
      </div>

      {/* Next */}
      {currentPage < totalPages ? (
        <Link
          href={createPageUrl(currentPage + 1)}
          className="btn btn-ghost btn-sm"
          aria-label={locale === 'th' ? 'หน้าถัดไป' : 'Next page'}
        >
          <span className="hidden sm:inline">{locale === 'th' ? 'ถัดไป' : 'Next'}</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      ) : (
        <button className="btn btn-ghost btn-sm btn-disabled" disabled>
          <span className="hidden sm:inline">{locale === 'th' ? 'ถัดไป' : 'Next'}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}
