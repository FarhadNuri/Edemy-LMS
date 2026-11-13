import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import { Admin } from '../models/Admin';
import { User } from '../models/User';
import { generateToken } from '../utils/generateToken';
import { getLoginError, getRegisterError } from '../utils/validateInput';
import { AuthRequest, LoginInput, RegisterInput } from '../types';

export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const inputError = getRegisterError(req.body);
    if (inputError) {
      return res.status(400).json({ success: false, message: inputError });
    }

    const { name, email, password } = req.body as RegisterInput;
    const normalizedEmail = email.toLowerCase().trim();

    const existingUser = await User.findOne({ email: normalizedEmail });
    const existingAdmin = await Admin.findOne({ email: normalizedEmail });
    if (existingUser || existingAdmin) {
      return res.status(400).json({ success: false, message: 'Email is already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
    });

    const token = generateToken(user._id.toString());

    return res.status(201).json({
      success: true,
      data: {
        token,
        user: { id: user._id, name: user.name, email: user.email, role: user.role },
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const inputError = getLoginError(req.body);
    if (inputError) {
      return res.status(400).json({ success: false, message: inputError });
    }

    const { email, password } = req.body as LoginInput;
    const normalizedEmail = email.toLowerCase().trim();

    const admin = await Admin.findOne({ email: normalizedEmail }).select('+password');
    if (admin) {
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
    }

   
    const user = await User.findOne({ email: normalizedEmail }).select('+password');
    if (user) {
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return res.status(401).json({ success: false, message: 'Invalid email or password' });
      }

      const token = generateToken(user._id.toString());
      return res.status(200).json({
        success: true,
        data: {
          token,
          user: { id: user._id, name: user.name, email: user.email, role: user.role },
        },
      });
    }

    return res.status(401).json({ success: false, message: 'Invalid email or password' });
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
