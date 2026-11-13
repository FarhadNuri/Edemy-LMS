"use client";

import { useCallback, useEffect, useState } from "react";
import { getLectureById } from "@/services/lectureService";
import { Lecture } from "@/types";

export function useLecture(lectureId: string) {
  const [lecture, setLecture] = useState<Lecture | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    if (!lectureId) return;

    setIsLoading(true);
    setError(null);

    try {
      const data = await getLectureById(lectureId);
      setLecture(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load lecture.");
    } finally {
      setIsLoading(false);
    }
  }, [lectureId]);

  useEffect(() => {
    if (!lectureId) return;

    let isCancelled = false;

    async function load() {
      try {
        const data = await getLectureById(lectureId);
        if (!isCancelled) {
          setLecture(data);
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err instanceof Error ? err.message : "Could not load lecture.");
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
  }, [lectureId]);

  return { lecture, isLoading, error, refetch };
}
