import { Skeleton } from "@/components/ui/Skeleton";
import { LectureListSkeleton } from "@/components/lecture/LectureListSkeleton";

export function CourseDetailsSkeleton() {
  return (
    <div className="space-y-8">
      <Skeleton className="h-4 w-28" />

      <div className="overflow-hidden rounded-lg border border-border bg-surface p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="aspect-video w-full rounded-md md:col-span-1" />
          <div className="space-y-3 md:col-span-2">
            <Skeleton className="h-7 w-3/4" />
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <Skeleton className="h-6 w-44" />
        <LectureListSkeleton />
      </div>
    </div>
  );
}

