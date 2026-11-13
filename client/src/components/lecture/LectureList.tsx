import Link from "next/link";
import { Lecture } from "@/types";

type LectureListProps = {
  courseId: string;
  lectures: Lecture[];
};

export function LectureList({ courseId, lectures }: LectureListProps) {
  if (lectures.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border bg-surface p-6 text-center text-sm text-muted">
        No lectures have been added to this course yet.
      </div>
    );
  }

  return (
    <div className="divide-y divide-border rounded-lg border border-border bg-surface overflow-hidden shadow-sm">
      {lectures.map((lecture, index) => (
        <Link
          key={lecture._id}
          href={`/courses/${courseId}/lectures/${lecture._id}`}
          className="group flex items-start sm:items-center justify-between gap-4 p-4 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <div className="flex items-start sm:items-center gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-ink group-hover:bg-primary-soft group-hover:text-primary transition-colors">
              {index + 1}
            </span>

            <div>
              <h3 className="text-sm font-medium text-ink group-hover:text-primary transition-colors">
                {lecture.title}
              </h3>
              {lecture.description && (
                <p className="mt-0.5 line-clamp-1 text-xs text-muted">
                  {lecture.description}
                </p>
              )}
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-1.5 text-xs font-medium text-primary">
            <span>Watch</span>
            <svg
              className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </div>
        </Link>
      ))}
    </div>
  );
}

