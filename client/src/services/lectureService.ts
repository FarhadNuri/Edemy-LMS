import { apiRequest } from "./apiClient";
import { ApiSuccess, Lecture, LectureFormValues } from "@/types";

export async function getLecturesByCourse(courseId: string): Promise<Lecture[]> {
  const result = await apiRequest<ApiSuccess<{ lectures: Lecture[] }>>(
    `/courses/${courseId}/lectures`
  );
  return result.data.lectures;
}

export async function getLectureById(lectureId: string): Promise<Lecture> {
  const result = await apiRequest<ApiSuccess<{ lecture: Lecture }>>(
    `/lectures/${lectureId}`
  );
  return result.data.lecture;
}

export async function createLecture(
  courseId: string,
  values: LectureFormValues
): Promise<Lecture> {
  const result = await apiRequest<ApiSuccess<{ lecture: Lecture }>>(
    `/courses/${courseId}/lectures`,
    {
      method: "POST",
      body: values,
      requiresAuth: true,
    }
  );
  return result.data.lecture;
}

export async function updateLecture(
  lectureId: string,
  values: LectureFormValues
): Promise<Lecture> {
  const result = await apiRequest<ApiSuccess<{ lecture: Lecture }>>(
    `/lectures/${lectureId}`,
    {
      method: "PUT",
      body: values,
      requiresAuth: true,
    }
  );
  return result.data.lecture;
}

export async function deleteLecture(lectureId: string): Promise<void> {
  await apiRequest(`/lectures/${lectureId}`, {
    method: "DELETE",
    requiresAuth: true,
  });
}

