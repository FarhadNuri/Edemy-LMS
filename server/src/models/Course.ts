import { Schema, model } from 'mongoose';

export interface ICourse {
  title: string;
  description: string;
  price: number;
  thumbnailUrl: string;
}

const courseSchema = new Schema<ICourse>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [120, 'Title can be at most 120 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    thumbnailUrl: {
      type: String,
      required: [true, 'Thumbnail URL is required'],
      trim: true,
    },
  },
  { timestamps: true }
);

export const Course = model<ICourse>('Course', courseSchema);

