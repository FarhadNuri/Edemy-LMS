import { Request, Response, NextFunction } from 'express';
import { Course } from '../models/Course';
import { Lecture } from '../models/Lecture';
import { getCourseError } from '../utils/validateInput';
import { CourseInput } from '../types';

export async function getAllCourses(req: Request, res: Response, next: NextFunction) {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });

    return res.status(200).json({ success: true, data: { courses } });
  } catch (error) {
    next(error);
  }
}

export async function getCourseById(req: Request, res: Response, next: NextFunction) {
  try {
    const { courseId } = req.params;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    const lectures = await Lecture.find({ course: course._id }).sort({ createdAt: 1 });

    return res.status(200).json({ success: true, data: { course, lectures } });
  } catch (error) {
    next(error);
  }
}

export async function createCourse(req: Request, res: Response, next: NextFunction) {
  try {
    const inputError = getCourseError(req.body);
    if (inputError) {
      return res.status(400).json({ success: false, message: inputError });
    }
    const { title, description, price, thumbnailUrl } = req.body as CourseInput;

    const course = await Course.create({ title, description, price, thumbnailUrl });

    return res.status(201).json({ success: true, data: { course } });
  } catch (error) {
    next(error);
  }
}

export async function updateCourse(req: Request, res: Response, next: NextFunction) {
  try {
    const { courseId } = req.params;

    const inputError = getCourseError(req.body);
    if (inputError) {
      return res.status(400).json({ success: false, message: inputError });
    }

    const { title, description, price, thumbnailUrl } = req.body as CourseInput;

    const course = await Course.findByIdAndUpdate(
      courseId,
      { title, description, price, thumbnailUrl },
      { new: true, runValidators: true }
    );

    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    return res.status(200).json({ success: true, data: { course } });
  } catch (error) {
    next(error);
  }
}

export async function deleteCourse(req: Request, res: Response, next: NextFunction) {
  try {
    const { courseId } = req.params;

    const course = await Course.findByIdAndDelete(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    await Lecture.deleteMany({ course: course._id });

    return res.status(200).json({ success: true, message: 'Course and its lectures deleted' });
  } catch (error) {
    next(error);
  }
}

