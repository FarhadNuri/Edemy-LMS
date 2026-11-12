import { Router } from 'express';
import {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} from '../controllers/courseController';
import { getLecturesByCourse, createLecture } from '../controllers/lectureController';
import { protectAdmin } from '../middlewares/authMiddleware';

export const courseRoutes = Router();

courseRoutes.get('/', getAllCourses);
courseRoutes.get('/:courseId', getCourseById);
courseRoutes.get('/:courseId/lectures', getLecturesByCourse);

courseRoutes.post('/', protectAdmin, createCourse);
courseRoutes.put('/:courseId', protectAdmin, updateCourse);
courseRoutes.delete('/:courseId', protectAdmin, deleteCourse);
courseRoutes.post('/:courseId/lectures', protectAdmin, createLecture);

