import bcrypt from 'bcryptjs';
import { getRequiredEnv } from './config/env';
import { connectDatabase } from './config/db';
import { Admin } from './models/Admin';
import { Course } from './models/Course';
import { Lecture } from './models/Lecture';

async function seedDatabase() {
  const adminEmail = getRequiredEnv('ADMIN_EMAIL');
  const adminPassword = getRequiredEnv('ADMIN_PASSWORD');

  await connectDatabase();

  await Lecture.deleteMany({});
  await Course.deleteMany({});
  await Admin.deleteMany({});

  const hashedPassword = await bcrypt.hash(adminPassword, 10);
  await Admin.create({
    name: 'Admin',
    email: adminEmail,
    password: hashedPassword,
  });

  const reactCourse = await Course.create({
    title: 'React for Beginners',
    description: 'Learn components, props, state, and hooks step by step.',
    price: 49,
    thumbnailUrl: 'https://picsum.photos/seed/react/600/400',
  });

  const nodeCourse = await Course.create({
    title: 'Node.js and Express Basics',
    description: 'Build a REST API with Express and MongoDB.',
    price: 59,
    thumbnailUrl: 'https://picsum.photos/seed/node/600/400',
  });

  await Lecture.insertMany([
    {
      course: reactCourse._id,
      title: 'What is React?',
      description: 'A quick tour of what React is and why people use it.',
      videoUrl: 'https://www.youtube.com/embed/VIDEO_ID_1',
    },
    {
      course: reactCourse._id,
      title: 'Components and Props',
      description: 'Build your first components and pass data with props.',
      videoUrl: 'https://www.youtube.com/embed/VIDEO_ID_2',
    },
    {
      course: nodeCourse._id,
      title: 'Your First Express Server',
      description: 'Create a server and your first route.',
      videoUrl: 'https://www.youtube.com/embed/VIDEO_ID_3',
    },
  ]);

  console.log('Seed finished');
  console.log(`Admin login: ${adminEmail} / ${adminPassword}`);
  process.exit(0);
}

seedDatabase().catch((error) => {
  console.error('Seed failed:', error);
  process.exit(1);
});

