"use client";

import { useState } from "react";
import { LectureFormValues } from "@/types";
import { getLectureFormError } from "@/utils/validators";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

type LectureFormProps = {
  initialValues?: Partial<LectureFormValues>;
  onSubmit: (values: LectureFormValues) => Promise<void>;
  submitLabel: string;
  isSubmitting: boolean;
  serverError?: string;
  onCancel: () => void;
};

export function LectureForm({
  initialValues,
  onSubmit,
  submitLabel,
  isSubmitting,
  serverError,
  onCancel,
}: LectureFormProps) {
  const [title, setTitle] = useState(initialValues?.title || "");
  const [description, setDescription] = useState(initialValues?.description || "");
  const [videoUrl, setVideoUrl] = useState(initialValues?.videoUrl || "");
  const [validationError, setValidationError] = useState("");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const formError = getLectureFormError({
      title,
      description,
      videoUrl,
    });

    if (formError) {
      setValidationError(formError);
      return;
    }

    setValidationError("");

    await onSubmit({
      title: title.trim(),
      description: description.trim(),
      videoUrl: videoUrl.trim(),
    });
  }

  const displayedError = validationError || serverError;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {displayedError && (
        <div
          role="alert"
          className="rounded-md border border-red-200 bg-red-50 p-3 text-xs text-danger"
        >
          {displayedError}
        </div>
      )}

      <Input
        label="Title"
        placeholder="e.g. 01 — Introduction to the Architecture"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        helperText="Maximum 120 characters"
        maxLength={120}
        required
      />

      <Input
        label="Video URL"
        type="url"
        placeholder="https://www.youtube.com/watch?v=..."
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        helperText="YouTube or Vimeo link (http:// or https://)"
        required
      />

      <Textarea
        label="Description"
        placeholder="Summary of topics covered in this lesson..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={4}
        required
      />

      <div className="flex items-center justify-end gap-3 pt-3 border-t border-border">
        <Button
          type="button"
          variant="secondary"
          size="sm"
          disabled={isSubmitting}
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          size="sm"
          isLoading={isSubmitting}
        >
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}

