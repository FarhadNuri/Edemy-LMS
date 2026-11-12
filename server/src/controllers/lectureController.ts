import { Request, Response, NextFunction } from 'express';
import { Course } from '../models/Course';
import { Lecture } from '../models/Lecture';
import { getLectureError } from '../utils/validateInput';
import { LectureInput } from '../types';

export async function getLecturesByCourse(req: Request, res: Response, next: NextFunction) {
  try {
    const { courseId } = req.params;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    const lectures = await Lecture.find({ course: course._id }).sort({ createdAt: 1 });

    return res.status(200).json({ success: true, data: { lectures } });
  } catch (error) {
    next(error);
  }
}

export async function getLectureById(req: Request, res: Response, next: NextFunction) {
  try {
    const { lectureId } = req.params;

    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(404).json({ success: false, message: 'Lecture not found' });
    }

    return res.status(200).json({ success: true, data: { lecture } });
  } catch (error) {
    next(error);
  }
}

export async function createLecture(req: Request, res: Response, next: NextFunction) {
  try {
    const { courseId } = req.params;

    const inputError = getLectureError(req.body);
    if (inputError) {
      return res.status(400).json({ success: false, message: inputError });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    const { title, description, videoUrl } = req.body as LectureInput;

    const lecture = await Lecture.create({
      course: course._id,
      title,
      description,
      videoUrl,
    });

    return res.status(201).json({ success: true, data: { lecture } });
  } catch (error) {
    next(error);
  }
}

export async function updateLecture(req: Request, res: Response, next: NextFunction) {
  try {
    const { lectureId } = req.params;

    const inputError = getLectureError(req.body);
    if (inputError) {
      return res.status(400).json({ success: false, message: inputError });
    }

    const { title, description, videoUrl } = req.body as LectureInput;

    const lecture = await Lecture.findByIdAndUpdate(
      lectureId,
      { title, description, videoUrl },
      { new: true, runValidators: true }
    );

    if (!lecture) {
      return res.status(404).json({ success: false, message: 'Lecture not found' });
    }

    return res.status(200).json({ success: true, data: { lecture } });
  } catch (error) {
    next(error);
  }
}

export async function deleteLecture(req: Request, res: Response, next: NextFunction) {
  try {
    const { lectureId } = req.params;

    const lecture = await Lecture.findByIdAndDelete(lectureId);
    if (!lecture) {
      return res.status(404).json({ success: false, message: 'Lecture not found' });
    }

    return res.status(200).json({ success: true, message: 'Lecture deleted' });
  } catch (error) {
    next(error);
  }
}

