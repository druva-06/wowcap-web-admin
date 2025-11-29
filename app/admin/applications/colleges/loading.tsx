export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="h-8 w-64 bg-gray-200 rounded animate-pulse" />
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-32 bg-gray-200 rounded animate-pulse" />
        ))}
      </div>
      <div className="h-20 bg-gray-200 rounded animate-pulse" />
      {[...Array(3)].map((_, i) => (
        <div key={i} className="h-64 bg-gray-200 rounded animate-pulse" />
      ))}
    </div>
  )
}
