export default function SearchLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
          {/* Search Bar Skeleton */}
          <div className="max-w-2xl mx-auto mb-4">
            <div className="h-12 w-full rounded-lg bg-gray-200 animate-pulse" />
          </div>

          {/* Filter Tags Skeleton */}
          <div className="flex flex-wrap gap-2 justify-center">
            <div className="h-6 w-16 rounded-full bg-gray-200 animate-pulse" />
            <div className="h-6 w-20 rounded-full bg-gray-200 animate-pulse" />
            <div className="h-6 w-18 rounded-full bg-gray-200 animate-pulse" />
            <div className="h-6 w-14 rounded-full bg-gray-200 animate-pulse" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-6">
        <div className="flex gap-4 lg:gap-8">
          {/* Filters Sidebar Skeleton - Hidden on mobile */}
          <div className="hidden lg:block w-72 xl:w-80 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-4 lg:p-6 sticky top-24">
              <div className="h-6 w-16 mb-4 bg-gray-200 animate-pulse rounded" />
              <div className="space-y-6">
                {/* Budget Range */}
                <div>
                  <div className="h-4 w-24 mb-3 bg-gray-200 animate-pulse rounded" />
                  <div className="h-6 w-full mb-2 bg-gray-200 animate-pulse rounded" />
                  <div className="flex justify-between">
                    <div className="h-3 w-12 bg-gray-200 animate-pulse rounded" />
                    <div className="h-3 w-12 bg-gray-200 animate-pulse rounded" />
                  </div>
                </div>

                {/* Filter Sections */}
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i}>
                    <div className="h-4 w-20 mb-3 bg-gray-200 animate-pulse rounded" />
                    <div className="space-y-2">
                      {Array.from({ length: 3 }).map((_, j) => (
                        <div key={j} className="flex items-center space-x-2">
                          <div className="h-4 w-4 bg-gray-200 animate-pulse rounded" />
                          <div className="h-3 w-16 bg-gray-200 animate-pulse rounded" />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3 sm:gap-4">
              <div>
                <div className="h-8 w-48 mb-2 bg-gray-200 animate-pulse rounded" />
                <div className="h-4 w-32 bg-gray-200 animate-pulse rounded" />
              </div>

              <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
                <div className="h-10 w-24 lg:hidden bg-gray-200 animate-pulse rounded" />
                <div className="h-10 w-48 bg-gray-200 animate-pulse rounded" />
              </div>
            </div>

            {/* Trip Cards Skeleton */}
            <div className="space-y-3 sm:space-y-4 lg:space-y-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="flex flex-col sm:flex-row">
                    {/* Image */}
                    <div className="w-full sm:w-64 h-48 sm:h-40">
                      <div className="w-full h-full bg-gray-200 animate-pulse" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                        <div className="flex-1">
                          {/* Title and Location */}
                          <div className="h-6 w-3/4 mb-2 bg-gray-200 animate-pulse rounded" />
                          <div className="h-4 w-1/2 mb-3 bg-gray-200 animate-pulse rounded" />

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2 mb-3">
                            <div className="h-5 w-16 rounded-full bg-gray-200 animate-pulse" />
                            <div className="h-5 w-20 rounded-full bg-gray-200 animate-pulse" />
                            <div className="h-5 w-14 rounded-full bg-gray-200 animate-pulse" />
                          </div>

                          {/* Details */}
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="h-4 w-20 bg-gray-200 animate-pulse rounded" />
                            <div className="h-4 w-24 bg-gray-200 animate-pulse rounded" />
                            <div className="h-4 w-16 bg-gray-200 animate-pulse rounded" />
                            <div className="h-4 w-18 bg-gray-200 animate-pulse rounded" />
                          </div>
                        </div>

                        {/* Price and Actions */}
                        <div className="flex sm:flex-col items-end sm:items-end gap-3">
                          <div className="text-right">
                            <div className="h-6 w-20 mb-1 bg-gray-200 animate-pulse rounded" />
                            <div className="h-4 w-16 bg-gray-200 animate-pulse rounded" />
                          </div>

                          <div className="flex gap-2">
                            <div className="h-8 w-8 rounded bg-gray-200 animate-pulse" />
                            <div className="h-8 w-8 rounded bg-gray-200 animate-pulse" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
