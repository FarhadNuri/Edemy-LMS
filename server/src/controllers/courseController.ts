import { Request, Response, NextFunction } from 'express';
import { Course } from '../models/Course';
import { Lecture } from '../models/Lecture';
import { getCourseError } from '../utils/validateInput';
import { CourseInput } from '../types';

export async function getAllCourses(req: Request, res: Response, next: NextFunction) {
  try {
    // Newest first, so a new course shows up at the top.
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

    // Oldest first, so lectures appear in the order they were added.
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

    // We pick each field by hand so a client cannot sneak in extra fields.
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

    // Pick each field by hand so clients cannot overwrite extra fields.
    const { title, description, price, thumbnailUrl } = req.body as CourseInput;

    // new: true  -> return the updated course, not the old one
    // runValidators: true -> apply the model rules on update too
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

    // Lectures without a course are useless, so remove them together.
    await Lecture.deleteMany({ course: course._id });

    return res.status(200).json({ success: true, message: 'Course and its lectures deleted' });
  } catch (error) {
    next(error);
  }
}

