import { Request } from 'express';
import { HydratedDocument } from 'mongoose';
import { IAdmin } from '../models/Admin';


export interface LoginInput {
  email: string;
  password: string;
}

export interface CourseInput {
  title: string;
  description: string;
  price: number;
  thumbnailUrl: string;
}

export interface LectureInput {
  title: string;
  description: string;
  videoUrl: string;
}

export interface TokenPayload {
  id: string;
}

export interface AuthRequest extends Request {
  admin?: HydratedDocument<IAdmin>;
}
