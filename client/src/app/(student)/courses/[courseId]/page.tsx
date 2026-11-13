"use client";

import { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useCourse } from "@/hooks/useCourse";
import { useAuth } from "@/hooks/useAuth";
import { CourseDetailsSkeleton } from "@/components/course/CourseDetailsSkeleton";
import { LectureList } from "@/components/lecture/LectureList";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageTransition } from "@/components/layout/PageTransition";
import { formatPrice } from "@/utils/formatPrice";

function CourseDetailsContent() {
  const router = useRouter();
  const params = useParams();
  const courseId = params?.courseId as string;

  const { isAuthenticated, isCheckingAuth } = useAuth();
  const { course, lectures, isLoading, error, refetch } = useCourse(courseId);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (!isCheckingAuth && !isAuthenticated) {
      router.push(`/login?redirect=/courses/${courseId}`);
    }
  }, [isAuthenticated, isCheckingAuth, courseId, router]);

  if (isCheckingAuth || isLoading) {
    return <CourseDetailsSkeleton />;
  }

  if (!isAuthenticated) {
    return null;
  }

  if (error) {
    return (
      <div className="py-12">
        <ErrorMessage message={error} onRetry={refetch} />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="py-12">
        <EmptyState
          title="Course not found"
          description="The course you are looking for does not exist or may have been deleted."
          action={{
            label: "Back to courses",
            href: "/courses",
          }}
        />
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="space-y-8">
        <Link
          href="/courses"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          <span>Back to courses</span>
        </Link>

        <section className="overflow-hidden rounded-lg border border-border bg-surface p-6 sm:p-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-start">
            <div className="relative aspect-video w-full overflow-hidden rounded-md bg-slate-100 md:col-span-1">
              {!imageError ? (
                <img
                  src={course.thumbnailUrl}
                  alt={course.title}
                  onError={() => setImageError(true)}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-slate-100 text-xs text-muted">
                  <span>No image preview</span>
                </div>
              )}
            </div>

            <div className="space-y-3 md:col-span-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h1 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                  {course.title}
                </h1>
                <span className="text-xl font-bold text-primary">
                  {formatPrice(course.price)}
                </span>
              </div>

              <div className="pt-2 border-t border-border">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-muted">
                  About this course
                </h2>
                <p className="mt-2 text-sm sm:text-base text-slate-700 leading-relaxed whitespace-pre-line max-w-3xl">
                  {course.description}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-ink">
              Lectures ({lectures.length})
            </h2>
            {lectures.length > 0 && (
              <span className="text-xs text-muted">Click any lecture to start watching</span>
            )}
          </div>

          <LectureList courseId={course._id} lectures={lectures} />
        </section>
      </div>
    </PageTransition>
  );
}

export default function CourseDetailsPage() {
  return (
    <Suspense fallback={<CourseDetailsSkeleton />}>
      <CourseDetailsContent />
    </Suspense>
  );
}
