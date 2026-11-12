import { Router } from 'express';
import { authRoutes } from './authRoutes';
import { courseRoutes } from './courseRoutes';

export const routes = Router();

routes.use('/auth', authRoutes);
routes.use('/courses', courseRoutes);
