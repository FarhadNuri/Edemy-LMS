import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import { Admin } from '../models/Admin';
import { generateToken } from '../utils/generateToken';
import { getLoginError } from '../utils/validateInput';
import { AuthRequest, LoginInput } from '../types';

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const inputError = getLoginError(req.body);
    if (inputError) {
      return res.status(400).json({ success: false, message: inputError });
    }

    const { email, password } = req.body as LoginInput;
    const admin = await Admin.findOne({ email: email.toLowerCase().trim() }).select('+password');

    if (!admin) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, admin.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const token = generateToken(admin._id.toString());

    return res.status(200).json({
      success: true,
      data: {
        token,
        admin: { id: admin._id, name: admin.name, email: admin.email },
      },
    });
  } catch (error) {
    next(error);
  }
}

export function getCurrentAdmin(req: AuthRequest, res: Response) {
  const admin = req.admin; 
  if (!admin) {
    return res.status(401).json({ success: false, message: 'Please log in first' });
  }

  return res.status(200).json({
    success: true,
    data: { admin: { id: admin._id, name: admin.name, email: admin.email } },
  });
}

