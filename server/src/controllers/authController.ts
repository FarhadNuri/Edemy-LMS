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

    // The input was checked above, so it is safe to treat it as LoginInput.
    const { email, password } = req.body as LoginInput;

    // password has select:false in the model, so we ask for it on purpose here.
    const admin = await Admin.findOne({ email: email.toLowerCase().trim() }).select('+password');

    // Same message for "no such email" and "wrong password",
    // this stops attackers learning which emails exist.
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

// The client calls this on page load to check if the saved token is still valid.
export function getCurrentAdmin(req: AuthRequest, res: Response) {
  const admin = req.admin; // set by protectAdmin

  // protectAdmin always sets it, but TypeScript cannot know that.
  if (!admin) {
    return res.status(401).json({ success: false, message: 'Please log in first' });
  }

  return res.status(200).json({
    success: true,
    data: { admin: { id: admin._id, name: admin.name, email: admin.email } },
  });
}

