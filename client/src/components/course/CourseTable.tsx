"use client";

import { useState } from "react";
import Link from "next/link";
import { Course } from "@/types";
import { formatPrice } from "@/utils/formatPrice";
import { Button } from "@/components/ui/Button";

type CourseTableProps = {
  courses: Course[];
  onDeleteClick: (course: Course) => void;
};

export function CourseTable({ courses, onDeleteClick }: CourseTableProps) {
  const [brokenImages, setBrokenImages] = useState<Record<string, boolean>>({});

  return (
    <div className="rounded-lg border border-border bg-surface shadow-sm overflow-hidden">
      <div className="block md:hidden divide-y divide-border">
        {courses.map((course) => (
          <div
            key={course._id}
            className="p-4 space-y-3 hover:bg-slate-50/50 transition-colors"
          >
            <div className="flex items-start gap-3">
              <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded bg-slate-100 border border-border">
                {!brokenImages[course._id] ? (
                  <img
                    src={course.thumbnailUrl}
                    alt={course.title}
                    onError={() =>
                      setBrokenImages((prev) => ({ ...prev, [course._id]: true }))
                    }
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-slate-100 text-[10px] text-muted text-center p-0.5">
                    No img
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-ink text-sm leading-snug line-clamp-1">
                  {course.title}
                </h3>
                <p className="mt-0.5 line-clamp-1 text-xs text-muted">
                  {course.description}
                </p>
                <p className="mt-1 font-bold text-ink text-sm">
                  {formatPrice(course.price)}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border/50">
              <Link href={`/admin/courses/${course._id}/lectures`} className="w-full">
                <Button variant="secondary" size="sm" className="w-full">
                  Lectures
                </Button>
              </Link>

              <Link href={`/admin/courses/${course._id}/edit`} className="w-full">
                <Button variant="secondary" size="sm" className="w-full">
                  Edit
                </Button>
              </Link>

              <Button
                variant="danger"
                size="sm"
                className="w-full"
                onClick={() => onDeleteClick(course)}
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
              <th scope="col" className="py-3 px-4 w-20">
                Thumbnail
              </th>
              <th scope="col" className="py-3 px-4">
                Title & Description
              </th>
              <th scope="col" className="py-3 px-4 w-28">
                Price
              </th>
              <th scope="col" className="py-3 px-4 w-56 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {courses.map((course) => (
              <tr
                key={course._id}
                className="hover:bg-slate-50/60 transition-colors"
              >
                <td className="py-3 px-4">
                  <div className="relative h-10 w-16 overflow-hidden rounded bg-slate-100 border border-border">
                    {!brokenImages[course._id] ? (
                      <img
                        src={course.thumbnailUrl}
                        alt={course.title}
                        onError={() =>
                          setBrokenImages((prev) => ({ ...prev, [course._id]: true }))
                        }
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-slate-100 text-[10px] text-muted text-center p-0.5">
                        No img
                      </div>
                    )}
                  </div>
                </td>

                <td className="py-3 px-4">
                  <div className="max-w-md">
                    <span className="font-semibold text-ink line-clamp-1">
                      {course.title}
                    </span>
                    <p className="mt-0.5 line-clamp-1 text-xs text-muted">
                      {course.description}
                    </p>
                  </div>
                </td>

                <td className="py-3 px-4 font-medium text-ink">
                  {formatPrice(course.price)}
                </td>

                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/admin/courses/${course._id}/lectures`}>
                      <Button variant="secondary" size="sm">
                        Lectures
                      </Button>
                    </Link>

                    <Link href={`/admin/courses/${course._id}/edit`}>
                      <Button variant="secondary" size="sm">
                        Edit
                      </Button>
                    </Link>

                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => onDeleteClick(course)}
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

