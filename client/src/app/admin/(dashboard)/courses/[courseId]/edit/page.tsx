"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useCourse } from "@/hooks/useCourse";
import { updateCourse } from "@/services/courseService";
import { CourseFormValues } from "@/types";
import { useToast } from "@/context/ToastContext";
import { CourseForm } from "@/components/course/CourseForm";
import { Skeleton } from "@/components/ui/Skeleton";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageTransition } from "@/components/layout/PageTransition";

function EditCourseSkeleton() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Skeleton className="h-4 w-32" />
      <div className="space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-72" />
      </div>
      <div className="rounded-lg border border-border bg-surface p-6 sm:p-8 space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-28 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    </div>
  );
}

function EditCourseContent() {
  const router = useRouter();
  const params = useParams();
  const courseId = params?.courseId as string;
  const { showToast } = useToast();

  const { course, isLoading, error, refetch } = useCourse(courseId);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  if (isLoading) {
    return <EditCourseSkeleton />;
  }

  if (error) {
    return (
      <div className="mx-auto max-w-2xl py-12">
        <ErrorMessage message={error} onRetry={refetch} />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="mx-auto max-w-2xl py-12">
        <EmptyState
          title="Course not found"
          description="The course you are attempting to edit does not exist or has been deleted."
          action={{
            label: "Back to courses",
            href: "/admin",
          }}
        />
      </div>
    );
  }

  async function handleUpdateCourse(values: CourseFormValues) {
    setIsSubmitting(true);
    setServerError("");

    try {
      await updateCourse(courseId, values);
      showToast("Course updated successfully", "success");
      router.push("/admin");
    } catch (err) {
      setServerError(
        err instanceof Error ? err.message : "Failed to update course. Please try again."
      );
      setIsSubmitting(false);
    }
  }

  return (
    <PageTransition>
      <div className="mx-auto max-w-2xl space-y-6">
        <Link
          href="/admin"
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

        <div>
          <h1 className="text-2xl font-bold tracking-tight text-ink">Edit Course</h1>
          <p className="mt-1 text-sm text-muted">
            Update the course title, description, pricing, or thumbnail image.
          </p>
        </div>

        <div className="rounded-lg border border-border bg-surface p-6 sm:p-8 shadow-sm">
          <CourseForm
            initialValues={{
              title: course.title,
              description: course.description,
              price: course.price,
              thumbnailUrl: course.thumbnailUrl,
            }}
            onSubmit={handleUpdateCourse}
            submitLabel="Save changes"
            isSubmitting={isSubmitting}
            serverError={serverError}
          />
        </div>
      </div>
    </PageTransition>
  );
}

export default function EditCoursePage() {
  return (
    <Suspense fallback={<EditCourseSkeleton />}>
      <EditCourseContent />
    </Suspense>
  );
}

