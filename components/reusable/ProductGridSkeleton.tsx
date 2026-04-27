export function ProductGridSkeleton() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-2xl p-4 shadow-md border border-gray-100">
            {/* Image skeleton */}
            <div className="h-56 w-full rounded-xl bg-gray-200 animate-pulse" />

            {/* Title skeleton */}
            <div className="mt-4 space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
              <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
            </div>

            {/* Price skeleton */}
            <div className="mt-2 flex gap-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4" />
              <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4" />
            </div>

            {/* Button skeletons */}
            <div className="mt-4 h-10 bg-gray-200 rounded-xl animate-pulse" />
            <div className="mt-2 h-10 bg-gray-200 rounded-xl animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}