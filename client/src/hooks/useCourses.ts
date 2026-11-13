"use client";

import { useCallback, useEffect, useState } from "react";
import { getAllCourses } from "@/services/courseService";
import { Course } from "@/types";

export function useCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const courseList = await getAllCourses();
      setCourses(courseList);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load courses.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let isCancelled = false;

    async function load() {
      try {
        const courseList = await getAllCourses();
        if (!isCancelled) {
          setCourses(courseList);
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err instanceof Error ? err.message : "Could not load courses.");
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
  }, []);

  return { courses, isLoading, error, refetch };
}
