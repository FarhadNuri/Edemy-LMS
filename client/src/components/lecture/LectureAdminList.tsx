import { Lecture } from "@/types";
import { Button } from "@/components/ui/Button";
import { getWatchUrl } from "@/utils/getEmbedUrl";

type LectureAdminListProps = {
  lectures: Lecture[];
  onEdit: (lecture: Lecture) => void;
  onDelete: (lecture: Lecture) => void;
};

export function LectureAdminList({
  lectures,
  onEdit,
  onDelete,
}: LectureAdminListProps) {
  if (lectures.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border bg-surface p-12 text-center">
        <h3 className="text-base font-semibold text-ink">No lectures yet</h3>
        <p className="mt-1 text-sm text-muted">
          This course does not have any lectures. Click &ldquo;Add lecture&rdquo; to add the first lesson.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border bg-surface shadow-sm overflow-hidden">
      <div className="block md:hidden divide-y divide-border">
        {lectures.map((lecture, index) => (
          <div
            key={lecture._id}
            className="p-4 space-y-3 hover:bg-slate-50/50 transition-colors"
          >
            <div className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-muted">
                {index + 1}
              </span>
              <div className="min-w-0 flex-1">
                <h4 className="font-semibold text-ink text-sm leading-tight line-clamp-1">
                  {lecture.title}
                </h4>
                {lecture.description && (
                  <p className="mt-0.5 line-clamp-1 text-xs text-muted">
                    {lecture.description}
                  </p>
                )}
                <div className="mt-1.5">
                  <a
                    href={getWatchUrl(lecture.videoUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-primary hover:underline max-w-full truncate"
                  >
                    <span className="truncate">{getWatchUrl(lecture.videoUrl)}</span>
                    <span className="text-[10px]">↗</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border/50">
              <Button
                variant="secondary"
                size="sm"
                className="w-full"
                onClick={() => onEdit(lecture)}
              >
                Edit
              </Button>
              <Button
                variant="danger"
                size="sm"
                className="w-full"
                onClick={() => onDelete(lecture)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border bg-slate-50 text-xs font-semibold uppercase tracking-wider text-muted">
            <tr>
              <th scope="col" className="py-3 px-4 w-12 text-center">
                #
              </th>
              <th scope="col" className="py-3 px-4">
                Title & Description
              </th>
              <th scope="col" className="py-3 px-4 w-40">
                Video Link
              </th>
              <th scope="col" className="py-3 px-4 w-40 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {lectures.map((lecture, index) => (
              <tr
                key={lecture._id}
                className="hover:bg-slate-50/60 transition-colors"
              >
                <td className="py-3 px-4 text-center font-medium text-muted">
                  {index + 1}
                </td>

                <td className="py-3 px-4">
                  <div className="max-w-md">
                    <span className="font-semibold text-ink line-clamp-1">
                      {lecture.title}
                    </span>
                    <p className="mt-0.5 line-clamp-1 text-xs text-muted">
                      {lecture.description}
                    </p>
                  </div>
                </td>

                <td className="py-3 px-4">
                  <a
                    href={getWatchUrl(lecture.videoUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-primary hover:underline max-w-[160px] truncate"
                  >
                    <span className="truncate">{getWatchUrl(lecture.videoUrl)}</span>
                    <span className="text-[10px]">↗</span>
                  </a>
                </td>

                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => onEdit(lecture)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => onDelete(lecture)}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

