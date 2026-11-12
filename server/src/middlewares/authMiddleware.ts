import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { Admin } from '../models/Admin';
import { AuthRequest, TokenPayload } from '../types';

// Put this before any route that only admins may use.
export async function protectAdmin(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  // Expected format: "Authorization: Bearer <token>"
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Please log in first' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // We created this token ourselves, so we know it contains { id }.
    const decoded = jwt.verify(token, env.JWT_SECRET) as TokenPayload;

    // The admin could have been deleted after the token was issued.
    const admin = await Admin.findById(decoded.id);
    if (!admin) {
      return res.status(401).json({ success: false, message: 'Admin no longer exists' });
    }

    // Controllers after this can read req.admin.
    req.admin = admin;
    next();
  } catch (error) {
    // jwt.verify throws when the token is fake or expired.
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
}

