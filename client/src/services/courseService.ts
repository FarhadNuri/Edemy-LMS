import { apiRequest } from "./apiClient";
import { ApiSuccess, Course, CourseFormValues, Lecture } from "@/types";

export async function getAllCourses(): Promise<Course[]> {
  const result = await apiRequest<ApiSuccess<{ courses: Course[] }>>("/courses");
  return result.data.courses;
}

export async function getCourseWithLectures(
  courseId: string
): Promise<{ course: Course; lectures: Lecture[] }> {
  const result = await apiRequest<ApiSuccess<{ course: Course; lectures: Lecture[] }>>(
    `/courses/${courseId}`
  );
  return result.data;
}

export async function createCourse(values: CourseFormValues): Promise<Course> {
  const result = await apiRequest<ApiSuccess<{ course: Course }>>("/courses", {
    method: "POST",
    body: values,
    requiresAuth: true,
  });
  return result.data.course;
}

export async function updateCourse(
  courseId: string,
  values: CourseFormValues
): Promise<Course> {
  const result = await apiRequest<ApiSuccess<{ course: Course }>>(`/courses/${courseId}`, {
    method: "PUT",
    body: values,
    requiresAuth: true,
  });
  return result.data.course;
}

export async function deleteCourse(courseId: string): Promise<void> {
  await apiRequest(`/courses/${courseId}`, {
    method: "DELETE",
    requiresAuth: true,
  });
}

