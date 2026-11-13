"use client";

import { useState } from "react";
import Link from "next/link";
import { useCourses } from "@/hooks/useCourses";
import { useToast } from "@/context/ToastContext";
import { deleteCourse } from "@/services/courseService";
import { Course } from "@/types";
import { CourseTable } from "@/components/course/CourseTable";
import { TableRowSkeleton } from "@/components/course/TableRowSkeleton";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { PageTransition } from "@/components/layout/PageTransition";

const INITIAL_VISIBLE_COUNT = 10;
const LOAD_MORE_STEP = 10;

export default function AdminCoursesPage() {
  const { courses, isLoading, error, refetch } = useCourses();
  const { showToast } = useToast();

  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);
  const [courseToDelete, setCourseToDelete] = useState<Course | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const visibleCourses = courses.slice(0, visibleCount);
  const hasMore = visibleCount < courses.length;

  const handleViewMore = () => {
    setVisibleCount((prev) => prev + LOAD_MORE_STEP);
  };

  async function handleDeleteConfirm() {
    if (!courseToDelete) return;

    setIsDeleting(true);

    try {
      await deleteCourse(courseToDelete._id);
      showToast("Course and its lectures deleted", "success");
      await refetch();
    } catch (err) {
      showToast(
        err instanceof Error ? err.message : "Failed to delete course.",
        "error"
      );
    } finally {
      setIsDeleting(false);
      setCourseToDelete(null);
    }
  }

  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-ink">Courses</h1>
            <p className="mt-1 text-sm text-muted">
              Manage, edit, and organize all courses on the platform.
            </p>
          </div>

          <Link href="/admin/courses/new">
            <Button variant="primary">
              <span className="mr-1.5">+</span>
              <span>New course</span>
            </Button>
          </Link>
        </div>

        {isLoading && (
          <div className="rounded-lg border border-border bg-surface shadow-sm overflow-hidden">
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
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
                    <TableRowSkeleton key={index} />
                  ))}
                </tbody>
              </table>
            </div>

            <div className="block md:hidden divide-y divide-border">
              {[1, 2, 3, 4, 5].map((index) => (
                <div key={index} className="p-4 space-y-3">
                  <div className="flex gap-3">
                    <div className="h-14 w-20 animate-pulse rounded bg-slate-200 shrink-0" />
                    <div className="flex-1 space-y-1.5">
                      <div className="h-4 w-3/4 animate-pulse rounded bg-slate-200" />
                      <div className="h-3 w-full animate-pulse rounded bg-slate-200" />
                      <div className="h-4 w-16 animate-pulse rounded bg-slate-200" />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border/40">
                    <div className="h-8 animate-pulse rounded bg-slate-200" />
                    <div className="h-8 animate-pulse rounded bg-slate-200" />
                    <div className="h-8 animate-pulse rounded bg-slate-200" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!isLoading && error && (
          <div className="py-8">
            <ErrorMessage message={error} onRetry={refetch} />
          </div>
        )}

        {!isLoading && !error && courses.length === 0 && (
          <EmptyState
            title="No courses yet"
            description="You have not created any courses yet. Add your first course to get started."
            action={{
              label: "New course",
              href: "/admin/courses/new",
            }}
          />
        )}

        {!isLoading && !error && courses.length > 0 && (
          <div className="space-y-6">
            <CourseTable
              courses={visibleCourses}
              onDeleteClick={(course) => setCourseToDelete(course)}
            />

            {hasMore && (
              <div className="flex flex-col items-center justify-center pt-2 pb-4 space-y-2">
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleViewMore}
                  className="cursor-pointer px-6"
                >
                  View More Courses
                </Button>
                <p className="text-xs text-muted">
                  Showing {visibleCourses.length} of {courses.length} courses
                </p>
              </div>
            )}
          </div>
        )}

        <ConfirmDialog
          isOpen={Boolean(courseToDelete)}
          onClose={() => setCourseToDelete(null)}
          onConfirm={handleDeleteConfirm}
          title="Delete course"
          message={`Are you sure you want to delete "${courseToDelete?.title}"? All lectures belonging to this course will also be permanently deleted.`}
          confirmText="Delete course"
          isConfirming={isDeleting}
        />
      </div>
    </PageTransition>
  );
}
