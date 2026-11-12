import { Router } from 'express';
import {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} from '../controllers/courseController';
import { protectAdmin } from '../middlewares/authMiddleware';

export const courseRoutes = Router();

// Public (students)
courseRoutes.get('/', getAllCourses);
courseRoutes.get('/:courseId', getCourseById);

// Admin only
courseRoutes.post('/', protectAdmin, createCourse);
courseRoutes.put('/:courseId', protectAdmin, updateCourse);
courseRoutes.delete('/:courseId', protectAdmin, deleteCourse);

