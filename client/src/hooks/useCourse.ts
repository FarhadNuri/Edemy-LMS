"use client";

import { useCallback, useEffect, useState } from "react";
import { getCourseWithLectures } from "@/services/courseService";
import { Course, Lecture } from "@/types";

export function useCourse(courseId: string) {
  const [course, setCourse] = useState<Course | null>(null);
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    if (!courseId) return;

    setIsLoading(true);
    setError(null);

    try {
      const data = await getCourseWithLectures(courseId);
      setCourse(data.course);
      setLectures(data.lectures);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load course details.");
    } finally {
      setIsLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    if (!courseId) return;

    let isCancelled = false;

    async function load() {
      try {
        const data = await getCourseWithLectures(courseId);
        if (!isCancelled) {
          setCourse(data.course);
          setLectures(data.lectures);
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err instanceof Error ? err.message : "Could not load course details.");
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    load();

    return () => {
      isCancelled = true;
    };
  }, [courseId]);

  return { course, lectures, isLoading, error, refetch };
}
