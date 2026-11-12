import { Router } from 'express';
import { login, getCurrentAdmin } from '../controllers/authController';
import { protectAdmin } from '../middlewares/authMiddleware';

export const authRoutes = Router();

authRoutes.post('/login', login);
authRoutes.get('/me', protectAdmin, getCurrentAdmin);

