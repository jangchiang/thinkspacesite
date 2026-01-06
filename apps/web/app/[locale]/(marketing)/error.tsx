'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}): React.JSX.Element {
  useEffect(() => {
    // Log the error to console for debugging
    console.error('Page error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 px-4">
      <div className="text-center max-w-md">
        <h2 className="text-2xl font-bold text-base-content mb-4">
          Something went wrong
        </h2>
        <p className="text-base-content/70 mb-6">
          We encountered an error loading this page. Please try again.
        </p>
        <button
          onClick={() => reset()}
          className="btn btn-primary"
        >
          Try again
        </button>
      </div>
    </div>
  )
}
