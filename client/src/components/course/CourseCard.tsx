"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Course } from "@/types";
import { useAuth } from "@/hooks/useAuth";

type CourseCardProps = {
  course: Course;
};

export function CourseCard({ course }: CourseCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const { isAuthenticated } = useAuth();
  const [imageError, setImageError] = useState(false);

  const targetHref = isAuthenticated
    ? `/courses/${course._id}`
    : `/login?redirect=/courses/${course._id}`;

  return (
    <motion.div
      whileHover={shouldReduceMotion ? undefined : { y: -2 }}
      transition={{ duration: 0.15 }}
      className="h-full"
    >
      <Link
        href={targetHref}
        className="group flex flex-col h-full overflow-hidden rounded-lg border border-border bg-surface shadow-xs transition-all hover:border-primary hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
          {!imageError ? (
            <img
              src={course.thumbnailUrl}
              alt={course.title}
              onError={() => setImageError(true)}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-slate-100 text-xs text-muted">
              <span>No image preview</span>
            </div>
          )}
        </div>

        <div className="p-4 flex-1 bg-surface">
          <h2 className="text-base font-semibold text-ink line-clamp-2 group-hover:text-primary transition-colors">
            {course.title}
          </h2>
        </div>
      </Link>
    </motion.div>
  );
}
