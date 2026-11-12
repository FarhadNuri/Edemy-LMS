import jwt, { SignOptions } from 'jsonwebtoken';
import { env } from '../config/env';

export function generateToken(adminId: string): string {
  const options: SignOptions = {
    expiresIn: env.JWT_EXPIRES_IN as SignOptions['expiresIn'],
  };

  return jwt.sign({ id: adminId }, env.JWT_SECRET, options);
}

