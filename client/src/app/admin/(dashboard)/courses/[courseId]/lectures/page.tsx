"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCourse } from "@/hooks/useCourse";
import {
  createLecture,
  updateLecture,
  deleteLecture,
} from "@/services/lectureService";
import { Lecture, LectureFormValues } from "@/types";
import { useToast } from "@/context/ToastContext";
import { LectureAdminList } from "@/components/lecture/LectureAdminList";
import { LectureForm } from "@/components/lecture/LectureForm";
import { Modal } from "@/components/ui/Modal";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageTransition } from "@/components/layout/PageTransition";

function AdminLecturesSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-4 w-32" />
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-40" />
        </div>
        <Skeleton className="h-9 w-28" />
      </div>
      <div className="rounded-lg border border-border bg-surface p-4 space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    </div>
  );
}

function AdminLecturesContent() {
  const params = useParams();
  const courseId = params?.courseId as string;
  const { showToast } = useToast();

  const { course, lectures, isLoading, error, refetch } = useCourse(courseId);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lectureToEdit, setLectureToEdit] = useState<Lecture | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalError, setModalError] = useState("");

  const [lectureToDelete, setLectureToDelete] = useState<Lecture | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  if (isLoading) {
    return <AdminLecturesSkeleton />;
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
          description="The course you are attempting to manage does not exist or has been deleted."
          action={{
            label: "Back to courses",
            href: "/admin",
          }}
        />
      </div>
    );
  }

  function handleOpenAddModal() {
    setLectureToEdit(null);
    setModalError("");
    setIsModalOpen(true);
  }

  function handleOpenEditModal(lecture: Lecture) {
    setLectureToEdit(lecture);
    setModalError("");
    setIsModalOpen(true);
  }

  async function handleFormSubmit(values: LectureFormValues) {
    setIsSubmitting(true);
    setModalError("");

    try {
      if (lectureToEdit) {
        await updateLecture(lectureToEdit._id, values);
        showToast("Lecture updated successfully", "success");
      } else {
        await createLecture(courseId, values);
        showToast("Lecture added successfully", "success");
      }

      setIsModalOpen(false);
      await refetch();
    } catch (err) {
      setModalError(
        err instanceof Error ? err.message : "Failed to save lecture."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDeleteConfirm() {
    if (!lectureToDelete) return;

    setIsDeleting(true);

    try {
      await deleteLecture(lectureToDelete._id);
      showToast("Lecture deleted", "success");
      await refetch();
    } catch (err) {
      showToast(
        err instanceof Error ? err.message : "Failed to delete lecture.",
        "error"
      );
    } finally {
      setIsDeleting(false);
      setLectureToDelete(null);
    }
  }

  return (
    <PageTransition>
      <div className="space-y-6">
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

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-ink">
              Lectures: {course.title}
            </h1>
            <p className="mt-1 text-sm text-muted">
              Organize, edit, or add video lectures for this course ({lectures.length} total).
            </p>
          </div>

          <Button variant="primary" onClick={handleOpenAddModal}>
            <span className="mr-1.5">+</span>
            <span>Add lecture</span>
          </Button>
        </div>

        <LectureAdminList
          lectures={lectures}
          onEdit={handleOpenEditModal}
          onDelete={(lecture) => setLectureToDelete(lecture)}
        />

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={lectureToEdit ? "Edit lecture" : "Add lecture"}
        >
          <LectureForm
            key={lectureToEdit ? lectureToEdit._id : "new-lecture"}
            initialValues={
              lectureToEdit
                ? {
                    title: lectureToEdit.title,
                    description: lectureToEdit.description,
                    videoUrl: lectureToEdit.videoUrl,
                  }
                : undefined
            }
            onSubmit={handleFormSubmit}
            submitLabel={lectureToEdit ? "Save changes" : "Add lecture"}
            isSubmitting={isSubmitting}
            serverError={modalError}
            onCancel={() => setIsModalOpen(false)}
          />
        </Modal>

        <ConfirmDialog
          isOpen={Boolean(lectureToDelete)}
          onClose={() => setLectureToDelete(null)}
          onConfirm={handleDeleteConfirm}
          title="Delete lecture"
          message={`Are you sure you want to delete "${lectureToDelete?.title}"? This action cannot be undone.`}
          confirmText="Delete lecture"
          isConfirming={isDeleting}
        />
      </div>
    </PageTransition>
  );
}

export default function AdminCourseLecturesPage() {
  return (
    <Suspense fallback={<AdminLecturesSkeleton />}>
      <AdminLecturesContent />
    </Suspense>
  );
}

