export type Course = {
  _id: string;
  title: string;
  description: string;
  price: number;
  thumbnailUrl: string;
  createdAt: string;
  updatedAt: string;
};

export type Lecture = {
  _id: string;
  course: string;
  title: string;
  description: string;
  videoUrl: string;
  createdAt: string;
  updatedAt: string;
};

export type Admin = {
  _id?: string;
  id?: string;
  name: string;
  email: string;
};

export type User = {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  role?: string;
};

export type CourseFormValues = {
  title: string;
  description: string;
  price: number;
  thumbnailUrl: string;
};

export type LectureFormValues = {
  title: string;
  description: string;
  videoUrl: string;
};

export type ApiSuccess<T> = {
  success: true;
  data: T;
  message?: string;
};

export type ApiError = {
  success: false;
  message: string;
};

export type LoginData = {
  token: string;
  admin?: Admin;
  user?: User;
};
