import mongoose from 'mongoose';
import { env } from './env';

export async function connectDatabase() {
  if (mongoose.connection.readyState === 1) {
    return;
  }
  await mongoose.connect(env.MONGODB_URI, { dbName: 'lmsdb' });
  console.log('MongoDB connected');
}


