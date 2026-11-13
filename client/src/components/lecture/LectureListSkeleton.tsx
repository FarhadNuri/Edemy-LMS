import { Skeleton } from "@/components/ui/Skeleton";

export function LectureListSkeleton() {
  return (
    <div className="divide-y divide-border rounded-lg border border-border bg-surface overflow-hidden">
      {[1, 2, 3, 4].map((index) => (
        <div key={index} className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3 w-3/4">
            <Skeleton className="h-6 w-6 rounded-full" />
            <div className="flex-1 space-y-1.5">
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-3 w-1/3" />
            </div>
          </div>
          <Skeleton className="h-4 w-12" />
        </div>
      ))}
    </div>
  );
}

