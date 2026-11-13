import { Router } from 'express';
import { register, login, getCurrentAdmin } from '../controllers/authController';
import { protectAdmin } from '../middlewares/authMiddleware';

export const authRoutes = Router();

authRoutes.post('/register', register);
authRoutes.post('/login', login);
authRoutes.get('/me', protectAdmin, getCurrentAdmin);
