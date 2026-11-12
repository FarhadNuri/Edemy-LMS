import { Router } from 'express';
import { authRoutes } from './authRoutes';
import { courseRoutes } from './courseRoutes';
import { lectureRoutes } from './lectureRoutes';

export const routes = Router();

routes.use('/auth', authRoutes);
routes.use('/courses', courseRoutes);
routes.use('/lectures', lectureRoutes);
