"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createCourse } from "@/services/courseService";
import { CourseFormValues } from "@/types";
import { useToast } from "@/context/ToastContext";
import { CourseForm } from "@/components/course/CourseForm";
import { PageTransition } from "@/components/layout/PageTransition";

export default function NewCoursePage() {
  const router = useRouter();
  const { showToast } = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  async function handleCreateCourse(values: CourseFormValues) {
    setIsSubmitting(true);
    setServerError("");

    try {
      await createCourse(values);
      showToast("Course created successfully", "success");
      router.push("/admin");
    } catch (err) {
      setServerError(
        err instanceof Error ? err.message : "Failed to create course. Please try again."
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
          <h1 className="text-2xl font-bold tracking-tight text-ink">Create New Course</h1>
          <p className="mt-1 text-sm text-muted">
            Fill in the course details below to publish it to the student catalog.
          </p>
        </div>

        <div className="rounded-lg border border-border bg-surface p-6 sm:p-8 shadow-sm">
          <CourseForm
            onSubmit={handleCreateCourse}
            submitLabel="Create course"
            isSubmitting={isSubmitting}
            serverError={serverError}
          />
        </div>
      </div>
    </PageTransition>
  );
}

