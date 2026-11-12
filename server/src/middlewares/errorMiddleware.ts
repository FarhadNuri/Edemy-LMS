import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

export function errorHandler(error: Error, req: Request, res: Response, next: NextFunction) {
  console.error(error);

  if (error instanceof mongoose.Error.CastError) {
    return res.status(400).json({ success: false, message: 'Invalid id format' });
  }

  if (error instanceof mongoose.Error.ValidationError) {
    const message = Object.values(error.errors)
      .map((fieldError) => fieldError.message)
      .join(', ');
    return res.status(400).json({ success: false, message });
  }

  return res.status(500).json({ success: false, message: 'Something went wrong on the server' });
}

