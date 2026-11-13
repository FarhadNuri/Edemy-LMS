import { Skeleton } from "@/components/ui/Skeleton";

export function CourseCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-surface shadow-sm">
      <Skeleton className="aspect-video w-full rounded-none" />

      <div className="p-4 space-y-3">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="pt-2">
          <Skeleton className="h-5 w-1/4" />
        </div>
      </div>
    </div>
  );
}

