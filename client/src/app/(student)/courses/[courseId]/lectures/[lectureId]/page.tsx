"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useLecture } from "@/hooks/useLecture";
import { useCourse } from "@/hooks/useCourse";
import { VideoPlayer } from "@/components/lecture/VideoPlayer";
import { LectureViewerSkeleton } from "@/components/lecture/LectureViewerSkeleton";
import { Button } from "@/components/ui/Button";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageTransition } from "@/components/layout/PageTransition";

function LectureViewerContent() {
  const router = useRouter();
  const params = useParams();
  const courseId = params?.courseId as string;
  const lectureId = params?.lectureId as string;

  const {
    lecture,
    isLoading: isLectureLoading,
    error: lectureError,
    refetch: refetchLecture,
  } = useLecture(lectureId);

  const {
    course,
    lectures,
    isLoading: isCourseLoading,
    error: courseError,
    refetch: refetchCourse,
  } = useCourse(courseId);

  const isLoading = isLectureLoading || isCourseLoading;

  if (isLoading) {
    return <LectureViewerSkeleton />;
  }

  if (lectureError || courseError) {
    return (
      <div className="py-12">
        <ErrorMessage
          message={lectureError || courseError || "Failed to load lecture."}
          onRetry={() => {
            refetchLecture();
            refetchCourse();
          }}
        />
      </div>
    );
  }

  if (!lecture) {
    return (
      <div className="py-12">
        <EmptyState
          title="Lecture not found"
          description="The lecture you are looking for does not exist or has been removed."
          action={{
            label: "Back to course",
            href: `/courses/${courseId}`,
          }}
        />
      </div>
    );
  }

  const currentIndex = lectures.findIndex((item) => item._id === lectureId);
  const previousLecture = currentIndex > 0 ? lectures[currentIndex - 1] : null;
  const nextLecture =
    currentIndex !== -1 && currentIndex < lectures.length - 1
      ? lectures[currentIndex + 1]
      : null;

  return (
    <PageTransition>
      <div className="space-y-6">
        <Link
          href={`/courses/${courseId}`}
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
          <span>Back to {course?.title || "course"}</span>
        </Link>

    
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-6">
            <VideoPlayer videoUrl={lecture.videoUrl} title={lecture.title} />

            <div className="flex items-center justify-between border-y border-border py-3">
              <Button
                variant="secondary"
                size="sm"
                disabled={!previousLecture}
                onClick={() => {
                  if (previousLecture) {
                    router.push(`/courses/${courseId}/lectures/${previousLecture._id}`);
                  }
                }}
              >
                ← Previous lecture
              </Button>

              <span className="text-xs text-muted">
                {currentIndex !== -1
                  ? `Lecture ${currentIndex + 1} of ${lectures.length}`
                  : ""}
              </span>

              <Button
                variant="secondary"
                size="sm"
                disabled={!nextLecture}
                onClick={() => {
                  if (nextLecture) {
                    router.push(`/courses/${courseId}/lectures/${nextLecture._id}`);
                  }
                }}
              >
                Next lecture →
              </Button>
            </div>

            <div className="rounded-lg border border-border bg-surface p-6 shadow-sm space-y-3">
              <h1 className="text-2xl font-bold tracking-tight text-ink">
                {lecture.title}
              </h1>
              <div className="pt-2 border-t border-border">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-muted">
                  About this lecture
                </h2>
                <p className="mt-2 text-sm sm:text-base text-slate-700 leading-relaxed whitespace-pre-line">
                  {lecture.description}
                </p>
              </div>
            </div>
          </div>

          <aside className="lg:col-span-1 rounded-lg border border-border bg-surface p-4 shadow-sm space-y-3">
            <div className="border-b border-border pb-3">
              <h2 className="text-sm font-semibold text-ink">Course Content</h2>
              <p className="text-xs text-muted mt-0.5">
                {lectures.length} {lectures.length === 1 ? "lecture" : "lectures"} total
              </p>
            </div>

            <nav className="space-y-1 max-h-[540px] overflow-y-auto">
              {lectures.map((item, index) => {
                const isCurrent = item._id === lectureId;

                return (
                  <Link
                    key={item._id}
                    href={`/courses/${courseId}/lectures/${item._id}`}
                    className={`flex items-start gap-3 rounded-md p-2.5 text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                      isCurrent
                        ? "bg-primary-soft text-primary font-semibold border-l-2 border-primary"
                        : "text-ink hover:bg-slate-50"
                    }`}
                  >
                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-medium ${
                        isCurrent
                          ? "bg-primary text-white"
                          : "bg-slate-100 text-muted"
                      }`}
                    >
                      {index + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="truncate">{item.title}</p>
                    </div>
                  </Link>
                );
              })}
            </nav>
          </aside>
        </div>
      </div>
    </PageTransition>
  );
}

export default function LectureViewerPage() {
  return (
    <Suspense fallback={<LectureViewerSkeleton />}>
      <LectureViewerContent />
    </Suspense>
  );
}

