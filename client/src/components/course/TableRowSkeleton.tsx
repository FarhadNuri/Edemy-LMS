import { Skeleton } from "@/components/ui/Skeleton";

export function TableRowSkeleton() {
  return (
    <tr className="border-b border-border">
      <td className="py-3 px-4">
        <Skeleton className="h-10 w-16 rounded" />
      </td>

      <td className="py-3 px-4">
        <div className="space-y-1.5">
          <Skeleton className="h-4 w-44" />
          <Skeleton className="h-3 w-64" />
        </div>
      </td>

      <td className="py-3 px-4">
        <Skeleton className="h-4 w-14" />
      </td>

      <td className="py-3 px-4 text-right">
        <div className="flex items-center justify-end gap-2">
          <Skeleton className="h-8 w-16 rounded" />
          <Skeleton className="h-8 w-12 rounded" />
          <Skeleton className="h-8 w-14 rounded" />
        </div>
      </td>
    </tr>
  );
}

