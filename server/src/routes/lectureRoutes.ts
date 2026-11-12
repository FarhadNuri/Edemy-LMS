import { Router } from 'express';
import { getLectureById, updateLecture, deleteLecture } from '../controllers/lectureController';
import { protectAdmin } from '../middlewares/authMiddleware';

export const lectureRoutes = Router();

lectureRoutes.get('/:lectureId', getLectureById);

lectureRoutes.put('/:lectureId', protectAdmin, updateLecture);
lectureRoutes.delete('/:lectureId', protectAdmin, deleteLecture);

