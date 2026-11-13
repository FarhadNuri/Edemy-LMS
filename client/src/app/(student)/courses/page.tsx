"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCourses } from "@/hooks/useCourses";
import { useAuth } from "@/hooks/useAuth";
import { CourseCard } from "@/components/course/CourseCard";
import { CourseCardSkeleton } from "@/components/course/CourseCardSkeleton";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { PageTransition } from "@/components/layout/PageTransition";

const INITIAL_VISIBLE_COUNT = 9;
const LOAD_MORE_STEP = 6;

export default function CoursesPage() {
  const router = useRouter();
  const { courses, isLoading, error, refetch } = useCourses();
  const { isAuthenticated, isCheckingAuth } = useAuth();
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);

  useEffect(() => {
    if (!isCheckingAuth && !isAuthenticated) {
      router.push("/login?redirect=/courses");
    }
  }, [isAuthenticated, isCheckingAuth, router]);

  const visibleCourses = courses.slice(0, visibleCount);
  const hasMore = visibleCount < courses.length;

  const handleViewMore = () => {
    setVisibleCount((prev) => prev + LOAD_MORE_STEP);
  };

  if (isCheckingAuth || (!isAuthenticated && isCheckingAuth)) {
    return (
      <div className="space-y-8 pb-12">
        <div className="h-20 animate-pulse rounded-md bg-slate-200" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
            <CourseCardSkeleton key={number} />
          ))}
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <PageTransition>
      <div className="space-y-8 pb-12">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-border pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-muted mb-2">
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-ink font-medium">Courses</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-ink">
              All Courses
            </h1>
            <p className="text-sm text-muted max-w-2xl">
              Browse our complete library of structured courses. Select any course to view full
              details and video lectures.
            </p>
          </div>
        </div>

        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
              <CourseCardSkeleton key={number} />
            ))}
          </div>
        )}

        {!isLoading && error && (
          <div className="py-8">
            <ErrorMessage message={error} onRetry={refetch} />
          </div>
        )}

        {!isLoading && !error && courses.length === 0 && (
          <EmptyState
            title="No courses published yet"
            description="Our instructor is preparing new courses. Please check back soon!"
            action={{
              label: "Return Home",
              onClick: () => {
                router.push("/");
              },
            }}
          />
        )}

        {!isLoading && !error && courses.length > 0 && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleCourses.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))}
            </div>

            {hasMore && (
              <div className="flex flex-col items-center justify-center pt-4 pb-2 space-y-2">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleViewMore}
                  className="cursor-pointer px-8"
                >
                  View More
                </Button>
                <p className="text-xs text-muted">
                  Showing {visibleCourses.length} of {courses.length} courses
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </PageTransition>
  );
}
