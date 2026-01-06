interface SkeletonProps {
  className?: string
}

export function Skeleton({ className = '' }: SkeletonProps): React.JSX.Element {
  return (
    <div className={`animate-pulse rounded-md bg-base-300 ${className}`} />
  )
}

export function CardSkeleton(): React.JSX.Element {
  return (
    <div className="card bg-base-100 shadow-lg">
      <Skeleton className="aspect-video w-full rounded-t-2xl" />
      <div className="card-body">
        <Skeleton className="h-4 w-20 mb-2" />
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  )
}

export function ServiceCardSkeleton(): React.JSX.Element {
  return (
    <div className="card bg-base-100 border border-base-200">
      <div className="card-body">
        <Skeleton className="w-14 h-14 rounded-xl mb-4" />
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    </div>
  )
}

export function HeroSkeleton(): React.JSX.Element {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center max-w-3xl mx-auto px-4">
        <Skeleton className="h-8 w-40 mx-auto mb-6 rounded-full" />
        <Skeleton className="h-12 w-full mb-4" />
        <Skeleton className="h-12 w-3/4 mx-auto mb-6" />
        <Skeleton className="h-6 w-full max-w-xl mx-auto mb-2" />
        <Skeleton className="h-6 w-4/5 max-w-lg mx-auto mb-8" />
        <div className="flex gap-4 justify-center">
          <Skeleton className="h-12 w-32 rounded-lg" />
          <Skeleton className="h-12 w-32 rounded-lg" />
        </div>
      </div>
    </div>
  )
}

export function StatsSkeleton(): React.JSX.Element {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="text-center">
          <Skeleton className="h-12 w-24 mx-auto mb-2" />
          <Skeleton className="h-4 w-20 mx-auto" />
        </div>
      ))}
    </div>
  )
}
