import { Skeleton } from "@/components/ui/Skeleton";

export function LectureViewerSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-4 w-36" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Skeleton className="aspect-video w-full rounded-lg" />
          <div className="flex justify-between items-center">
            <Skeleton className="h-9 w-28" />
            <Skeleton className="h-9 w-28" />
          </div>
          <div className="space-y-3">
            <Skeleton className="h-7 w-2/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </div>

        <div className="lg:col-span-1 space-y-4">
          <Skeleton className="h-6 w-32" />
          <div className="rounded-lg border border-border bg-surface p-4 space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

