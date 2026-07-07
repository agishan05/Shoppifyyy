function LoadingSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="animate-pulse overflow-hidden rounded-[1.5rem] border border-black/5 bg-white shadow-sm">
          <div className="h-56 bg-gray-200" />
          <div className="space-y-3 p-5">
            <div className="h-4 w-24 rounded bg-gray-200" />
            <div className="h-5 w-3/4 rounded bg-gray-200" />
            <div className="h-4 w-full rounded bg-gray-200" />
            <div className="h-4 w-1/2 rounded bg-gray-200" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default LoadingSkeleton;
