"use client";

import { useState } from "react";
import Link from "next/link";
import { CourseFormValues } from "@/types";
import { getCourseFormError } from "@/utils/validators";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

type CourseFormProps = {
  initialValues?: Partial<CourseFormValues>;
  onSubmit: (values: CourseFormValues) => Promise<void>;
  submitLabel: string;
  isSubmitting: boolean;
  serverError?: string;
  cancelHref?: string;
};

export function CourseForm({
  initialValues,
  onSubmit,
  submitLabel,
  isSubmitting,
  serverError,
  cancelHref = "/admin",
}: CourseFormProps) {
  const [title, setTitle] = useState(initialValues?.title || "");
  const [description, setDescription] = useState(initialValues?.description || "");
  const [price, setPrice] = useState(
    initialValues?.price !== undefined ? String(initialValues.price) : ""
  );
  const [thumbnailUrl, setThumbnailUrl] = useState(initialValues?.thumbnailUrl || "");
  const [validationError, setValidationError] = useState("");
  const [previewError, setPreviewError] = useState(false);

  const isUrlValid =
    thumbnailUrl.trim().startsWith("http://") ||
    thumbnailUrl.trim().startsWith("https://");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const formError = getCourseFormError({
      title,
      description,
      price,
      thumbnailUrl,
    });

    if (formError) {
      setValidationError(formError);
      return;
    }

    setValidationError("");

    await onSubmit({
      title: title.trim(),
      description: description.trim(),
      price: Number(price),
      thumbnailUrl: thumbnailUrl.trim(),
    });
  }

  const displayedError = validationError || serverError;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {displayedError && (
        <div
          role="alert"
          className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-danger"
        >
          {displayedError}
        </div>
      )}

      <Input
        label="Title"
        placeholder="e.g. Modern Web Development with React"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        helperText="Maximum 120 characters"
        maxLength={120}
        required
      />

      <Input
        label="Price (USD)"
        type="number"
        step="0.01"
        min="0"
        placeholder="49"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        helperText="Enter 0 for a free course"
        required
      />

      <Textarea
        label="Description"
        placeholder="Provide an overview of the curriculum, prerequisites, and learning outcomes..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={5}
        required
      />

      <div className="space-y-3">
        <Input
          label="Thumbnail URL"
          type="url"
          placeholder="https://images.unsplash.com/photo-..."
          value={thumbnailUrl}
          onChange={(e) => {
            setThumbnailUrl(e.target.value);
            setPreviewError(false);
          }}
          helperText="Must start with http:// or https://"
          required
        />

        {isUrlValid && (
          <div className="rounded-lg border border-border bg-slate-50 p-3">
            <span className="block text-xs font-medium text-muted mb-2">
              Thumbnail preview:
            </span>
            <div className="relative aspect-video w-48 overflow-hidden rounded border border-border bg-slate-100">
              {!previewError ? (
                <img
                  src={thumbnailUrl.trim()}
                  alt="Course thumbnail preview"
                  onError={() => setPreviewError(true)}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center p-2 text-center text-xs text-muted">
                  Image failed to load
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
        <Link href={cancelHref}>
          <Button type="button" variant="secondary" disabled={isSubmitting}>
            Cancel
          </Button>
        </Link>
        <Button type="submit" variant="primary" isLoading={isSubmitting}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}

