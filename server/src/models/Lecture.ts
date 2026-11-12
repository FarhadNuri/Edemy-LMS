import { Schema, Types, model } from 'mongoose';

export interface ILecture {
  course: Types.ObjectId;
  title: string;
  description: string;
  videoUrl: string;
}

const lectureSchema = new Schema<ILecture>(
  {
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
      index: true,
    },
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
    videoUrl: {
      type: String,
      required: [true, 'Video URL is required'],
      trim: true,
    },
  },
  { timestamps: true }
);

export const Lecture = model<ILecture>('Lecture', lectureSchema);

