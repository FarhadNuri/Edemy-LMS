import bcrypt from 'bcryptjs';
import { getRequiredEnv } from './config/env';
import { connectDatabase } from './config/db';
import { Admin } from './models/Admin';
import { User } from './models/User';
import { Course } from './models/Course';
import { Lecture } from './models/Lecture';

const coursesData = [
  {
    title: 'React for Beginners',
    description: 'Master React fundamentals including JSX, project structure, components, and props.',
    price: 49,
    thumbnailUrl: '',
    lectures: [
      {
        title: 'ReactJS Tutorial - Introduction',
        description: 'Overview of React, component-based architecture, and why it is used.',
        videoUrl: 'https://www.youtube.com/embed/QFaFIcGhPoM',
      },
      {
        title: 'React Folder Structure & Entry Point',
        description: 'Understand package.json, src files, and how a React app boots up.',
        videoUrl: 'https://www.youtube.com/embed/9VIiLJL0H4Y',
      },
      {
        title: 'Working with Components and Props',
        description: 'Pass dynamic data between components using props.',
        videoUrl: 'https://www.youtube.com/embed/m7OWXtbiXX8',
      },
    ],
  },
  {
    title: 'React Hooks Deep Dive',
    description: 'Manage component state, context, and complex state transitions using modern React Hooks.',
    price: 55,
    thumbnailUrl: '',
    lectures: [
      {
        title: 'Managing State with useState',
        description: 'Add reactive state variables to functional components.',
        videoUrl: 'https://www.youtube.com/embed/lAW1Jmmr9hc',
      },
      {
        title: 'Global State with useContext',
        description: 'Avoid prop drilling by sharing data across the component tree.',
        videoUrl: 'https://www.youtube.com/embed/CI7EYWmRDJE',
      },
      {
        title: 'Complex State Logic with useReducer',
        description: 'Structure predictable state updates with reducer functions.',
        videoUrl: 'https://www.youtube.com/embed/cVYp4u1m6iA',
      },
    ],
  },
  {
    title: 'Redux Toolkit State Management',
    description: 'Scalable global state management in React applications using Redux Toolkit.',
    price: 59,
    thumbnailUrl: '',
    lectures: [
      {
        title: 'Redux Toolkit Actions & Slices',
        description: 'Define actions and slice reducers cleanly with createSlice.',
        videoUrl: 'https://www.youtube.com/embed/ir0F2PeJugo',
      },
      {
        title: 'Combining Multiple Reducers',
        description: 'Organize domain-specific state across multiple slices.',
        videoUrl: 'https://www.youtube.com/embed/AUYUE3x3sUY',
      },
      {
        title: 'Connecting Redux Toolkit to React',
        description: 'Set up the Redux store and Provider in a React project.',
        videoUrl: 'https://www.youtube.com/embed/VfRGyfw7kGY',
      },
    ],
  },
  {
    title: 'Next.js App Router Crash Course',
    description: 'Build fast, SEO-friendly React applications using Next.js routing, layouts, and server components.',
    price: 69,
    thumbnailUrl: '',
    lectures: [
      {
        title: 'Next.js Introduction & App Router Features',
        description: 'Explore server components, file-based routing, and project setup.',
        videoUrl: 'https://www.youtube.com/embed/TJQbDPGzm0Y',
      },
      {
        title: 'Pages, Nested Routes & Layouts',
        description: 'Structure multi-page navigation and shared UI layouts.',
        videoUrl: 'https://www.youtube.com/embed/vwg4Wrk-kWE',
      },
      {
        title: 'Next.js with TypeScript Essentials',
        description: 'Build type-safe routes, data fetching, and components.',
        videoUrl: 'https://www.youtube.com/embed/ZVnjOPwW4ZA',
      },
    ],
  },
  {
    title: 'Full-Stack Next.js Development',
    description: 'End-to-end full-stack web engineering with Next.js, server actions, and deployment.',
    price: 79,
    thumbnailUrl: '',
    lectures: [
      {
        title: 'Next.js Architecture & Environment Setup',
        description: 'Initialize a modern Next.js workspace from scratch.',
        videoUrl: 'https://www.youtube.com/embed/A63UxsQsEbU',
      },
      {
        title: 'Building a Complete Next.js Project',
        description: 'Implement data mutations, dynamic routes, and UI states.',
        videoUrl: 'https://www.youtube.com/embed/LOmjWb9JfOI',
      },
      {
        title: 'Production Full-Stack Next.js Deployment',
        description: 'Optimize, build, and deploy a full-stack Next.js application.',
        videoUrl: 'https://www.youtube.com/embed/I1V9YWqRIeI',
      },
    ],
  },
  {
    title: 'Node.js Backend Fundamentals',
    description: 'Understand the Node.js runtime, modules, file system, and HTTP servers.',
    price: 49,
    thumbnailUrl: '',
    lectures: [
      {
        title: 'Node.js Introduction & Setup',
        description: 'Install Node.js and run server-side JavaScript.',
        videoUrl: 'https://www.youtube.com/embed/zb3Qk8SG5Ms',
      },
      {
        title: 'Node.js Core Modules & File System',
        description: 'Work with global objects, modules, streams, and buffers.',
        videoUrl: 'https://www.youtube.com/embed/OIBIXYLJjsI',
      },
      {
        title: 'Handling HTTP Requests & Responses',
        description: 'Create an HTTP server and handle status codes and routing.',
        videoUrl: 'https://www.youtube.com/embed/DQD00NAUPNk',
      },
    ],
  },
  {
    title: 'Express.js & MVC API Architecture',
    description: 'Design clean, modular REST APIs with Express middleware, routers, and MVC controllers.',
    price: 59,
    thumbnailUrl: '',
    lectures: [
      {
        title: 'Understanding Express Middleware',
        description: 'Build custom logging, body-parsing, and error-handling middleware.',
        videoUrl: 'https://www.youtube.com/embed/_GJKAs7A0_4',
      },
      {
        title: 'Express Router & MVC Pattern',
        description: 'Separate routes, controllers, and models for scalable backends.',
        videoUrl: 'https://www.youtube.com/embed/zW_tZR0Ir3Q',
      },
      {
        title: 'Complete Node.js & Express.js REST API',
        description: 'Build and test full CRUD endpoints with Express.',
        videoUrl: 'https://www.youtube.com/embed/Oe421EPjeBE',
      },
    ],
  },
  {
    title: 'Node.js Authentication & JWT Security',
    description: 'Secure backend APIs with password hashing, JSON Web Tokens, and protected routes.',
    price: 65,
    thumbnailUrl: '',
    lectures: [
      {
        title: 'Designing the User Model & Validation',
        description: 'Set up Mongoose user schemas with email validation and bcrypt hooks.',
        videoUrl: 'https://www.youtube.com/embed/mnJxyc0DGM8',
      },
      {
        title: 'User Signup & Issuing JWT Cookies',
        description: 'Register users and sign HTTP-only JWT tokens.',
        videoUrl: 'https://www.youtube.com/embed/eWGwQ1__73E',
      },
      {
        title: 'User Login & Credential Verification',
        description: 'Authenticate login requests and protect private endpoints.',
        videoUrl: 'https://www.youtube.com/embed/VliJT26LPFA',
      },
    ],
  },
  {
    title: 'Full-Stack MERN Development',
    description: 'Connect MongoDB, Express, React, and Node.js into a unified full-stack application.',
    price: 75,
    thumbnailUrl: '',
    lectures: [
      {
        title: 'Building Forms & Submitting Data to Express',
        description: 'Connect React forms to backend POST endpoints.',
        videoUrl: 'https://www.youtube.com/embed/tRmeik-IpUQ',
      },
      {
        title: 'Deleting Records & Syncing React State',
        description: 'Handle DELETE requests and keep frontend state consistent.',
        videoUrl: 'https://www.youtube.com/embed/TcWmmJUG5K4',
      },
      {
        title: 'Polishing & Finalizing a MERN App',
        description: 'Add error handling, validation feedback, and production polish.',
        videoUrl: 'https://www.youtube.com/embed/Hwsj5iS-rA0',
      },
    ],
  },
  {
    title: 'MongoDB NoSQL Database Mastery',
    description: 'Learn document modeling, CRUD queries, indexing, and Node.js integration with MongoDB.',
    price: 55,
    thumbnailUrl: '',
    lectures: [
      {
        title: 'What is MongoDB? Collections & Documents',
        description: 'Understand BSON documents, collections, and NoSQL data modeling.',
        videoUrl: 'https://www.youtube.com/embed/ExcRbA7fy_A',
      },
      {
        title: 'Installing MongoDB & Using MongoDB Compass',
        description: 'Set up local and cloud databases and inspect documents visually.',
        videoUrl: 'https://www.youtube.com/embed/gDOKSgqM-bQ',
      },
      {
        title: 'Connecting MongoDB to a Node.js Application',
        description: 'Perform database reads and writes directly from Node.js.',
        videoUrl: 'https://www.youtube.com/embed/gGNquGHqpNI',
      },
    ],
  },
  {
    title: 'PostgreSQL Relational Database Course',
    description: 'Master PostgreSQL setup, schemas, constraints, joins, and relational data integrity.',
    price: 65,
    thumbnailUrl: '',
    lectures: [
      {
        title: 'Getting Started with PostgreSQL & psql',
        description: 'Install PostgreSQL and run your first database commands.',
        videoUrl: 'https://www.youtube.com/embed/BLH3s5eTL4Y',
      },
      {
        title: 'PostgreSQL Tables, Constraints & Queries',
        description: 'Define primary keys, foreign keys, and relational schemas.',
        videoUrl: 'https://www.youtube.com/embed/SpfIwlAYaKk',
      },
      {
        title: 'Complete PostgreSQL Engineering Course',
        description: 'Deep dive into joins, indexing, aggregates, and transactions.',
        videoUrl: 'https://www.youtube.com/embed/qw--VYLpxG4',
      },
    ],
  },
  {
    title: 'SQL Querying & Database Design',
    description: 'Write complex SQL queries, normalize relational tables, and optimize database lookups.',
    price: 49,
    thumbnailUrl: '',
    lectures: [
      {
        title: 'Basic SQL SELECT, WHERE & Filtering',
        description: 'Query relational tables and filter datasets accurately.',
        videoUrl: 'https://www.youtube.com/embed/kbKty5ZVKMY',
      },
      {
        title: 'SQL Joins, Grouping & Subqueries',
        description: 'Combine multi-table datasets using INNER and OUTER joins.',
        videoUrl: 'https://www.youtube.com/embed/7S_tz1z_5bA',
      },
      {
        title: 'SQL for Backend Engineers',
        description: 'Apply relational database modeling to real-world applications.',
        videoUrl: 'https://www.youtube.com/embed/5hzZtqCNQKk',
      },
    ],
  },
  {
    title: 'Redis Caching & In-Memory Databases',
    description: 'Accelerate backend performance using Redis key-value caching, TTLs, and data structures.',
    price: 55,
    thumbnailUrl: '',
    lectures: [
      {
        title: 'How Redis Works Under the Hood',
        description: 'Understand in-memory storage, latency reduction, and use cases.',
        videoUrl: 'https://www.youtube.com/embed/G1rOthIU-uo',
      },
      {
        title: 'Setting Up a Redis Cloud Instance',
        description: 'Provision a hosted Redis database and connect via CLI.',
        videoUrl: 'https://www.youtube.com/embed/yta9xLUGKgM',
      },
      {
        title: 'Core Redis Commands & Key Expiration',
        description: 'Use GET, SET, hashes, lists, and TTL caching strategies.',
        videoUrl: 'https://www.youtube.com/embed/yYUWwHtRebg',
      },
    ],
  },
  {
    title: 'GraphQL API Development',
    description: 'Build flexible, strongly typed GraphQL APIs with schemas, queries, and resolvers.',
    price: 59,
    thumbnailUrl: '',
    lectures: [
      {
        title: 'What is GraphQL? REST vs GraphQL',
        description: 'Solve over-fetching and under-fetching with a single endpoint.',
        videoUrl: 'https://www.youtube.com/embed/xMCnDesBggM',
      },
      {
        title: 'GraphQL Query Basics & Nested Fields',
        description: 'Write structured client queries and explore GraphQL schemas.',
        videoUrl: 'https://www.youtube.com/embed/39CPVkZE4nM',
      },
      {
        title: 'Setting Up a GraphQL Backend Server',
        description: 'Configure type definitions and resolvers on the server.',
        videoUrl: 'https://www.youtube.com/embed/pH02J0U5OBI',
      },
    ],
  },
  {
    title: 'Python FastAPI Backend Engineering',
    description: 'Build high-performance async Python APIs with automatic OpenAPI docs and Pydantic validation.',
    price: 65,
    thumbnailUrl: '',
    lectures: [
      {
        title: 'FastAPI Setup & First REST Endpoints',
        description: 'Create path operations and explore interactive Swagger UI docs.',
        videoUrl: 'https://www.youtube.com/embed/iWS9ogMPOI0',
      },
      {
        title: 'Pydantic Models & Request Validation',
        description: 'Enforce strict request and response schemas in Python.',
        videoUrl: 'https://www.youtube.com/embed/SORiTsvnU28',
      },
      {
        title: 'Complete FastAPI Production Course',
        description: 'Implement database integration, authentication, and CRUD routes.',
        videoUrl: 'https://www.youtube.com/embed/tLKKmouUams',
      },
    ],
  },
  {
    title: 'Docker & Containerized Deployment',
    description: 'Package backend services and databases into portable containers with Docker and Docker Compose.',
    price: 59,
    thumbnailUrl: '',
    lectures: [
      {
        title: 'What is Docker? Images vs Containers',
        description: 'Understand containerization and why it eliminates environment drift.',
        videoUrl: 'https://www.youtube.com/embed/31ieHmcTUOk',
      },
      {
        title: 'Installing Docker & Running Containers',
        description: 'Pull images, map ports, and manage container lifecycles.',
        videoUrl: 'https://www.youtube.com/embed/8Ev1aXl7TGY',
      },
      {
        title: 'Multi-Container Apps with Docker Compose',
        description: 'Orchestrate your backend API, database, and cache together.',
        videoUrl: 'https://www.youtube.com/embed/TSySwrQcevM',
      },
    ],
  },
  {
    title: 'Modern JavaScript ES6+ Foundations',
    description: 'Build a rock-solid foundation in modern JavaScript syntax, data types, and control flow.',
    price: 39,
    thumbnailUrl: '',
    lectures: [
      {
        title: 'Modern JavaScript Intro & Dev Environment',
        description: 'Set up VS Code, browser dev tools, and ES6+ workflows.',
        videoUrl: 'https://www.youtube.com/embed/iWOYAxlnaww',
      },
      {
        title: 'JavaScript Syntax, Variables & Data Types',
        description: 'Master let/const, template literals, arrays, and type conversion.',
        videoUrl: 'https://www.youtube.com/embed/FhguwBJeqWs',
      },
      {
        title: 'Control Flow, Loops & Conditional Logic',
        description: 'Write clean branching logic and iteration patterns.',
        videoUrl: 'https://www.youtube.com/embed/JloLGV9DmtQ',
      },
    ],
  },
  {
    title: 'TypeScript for Full-Stack Developers',
    description: 'Eliminate runtime bugs with static typing, interfaces, classes, and compiler configs.',
    price: 55,
    thumbnailUrl: '',
    lectures: [
      {
        title: 'Compiling TypeScript & tsconfig Setup',
        description: 'Configure the TypeScript compiler and strict type checking.',
        videoUrl: 'https://www.youtube.com/embed/iTZ1-85I77c',
      },
      {
        title: 'Classes, Access Modifiers & OOP in TS',
        description: 'Use public, private, and readonly modifiers in TypeScript classes.',
        videoUrl: 'https://www.youtube.com/embed/OsFwOzr3_sE',
      },
      {
        title: 'Interfaces & Strongly Typed Contracts',
        description: 'Define reusable object shapes for APIs and frontend props.',
        videoUrl: 'https://www.youtube.com/embed/VbW6vWTaHOY',
      },
    ],
  },
  {
    title: 'HTML5 & CSS3 Frontend Foundations',
    description: 'Create accessible semantic web pages, structured forms, and responsive layouts.',
    price: 35,
    thumbnailUrl: '',
    lectures: [
      {
        title: 'HTML5 Document Structure & Semantic Tags',
        description: 'Build clean, accessible page layouts with modern HTML elements.',
        videoUrl: 'https://www.youtube.com/embed/hu-q2zYwEYs',
      },
      {
        title: 'HTML Forms, Inputs & Validation',
        description: 'Create user input forms with labels, types, and attributes.',
        videoUrl: 'https://www.youtube.com/embed/YwbIeMlxZAU',
      },
      {
        title: 'Responsive Navigation with CSS Flexbox',
        description: 'Align and distribute UI elements cleanly across screen sizes.',
        videoUrl: 'https://www.youtube.com/embed/2plKBskaKfY',
      },
    ],
  },
  {
    title: 'Tailwind CSS Modern UI Design',
    description: 'Rapidly build custom, responsive frontend interfaces using Tailwind CSS utility classes.',
    price: 45,
    thumbnailUrl: '',
    lectures: [
      {
        title: 'Tailwind CSS Intro & Utility-First Workflow',
        description: 'Configure Tailwind CSS and style components without leaving HTML/JSX.',
        videoUrl: 'https://www.youtube.com/embed/bxmDnn7lrnk',
      },
      {
        title: 'Building Responsive Layouts with Tailwind Grid',
        description: 'Create multi-column responsive grids and breakpoints.',
        videoUrl: 'https://www.youtube.com/embed/_r2qB44o_Fs',
      },
      {
        title: 'Mastering Tailwind CSS v4 Components',
        description: 'Design modern cards, dark mode themes, and interactive states.',
        videoUrl: 'https://www.youtube.com/embed/6biMWgD6_JY',
      },
    ],
  },
];

async function seedDatabase() {
  const adminEmail = getRequiredEnv('ADMIN_EMAIL');
  const adminPassword = getRequiredEnv('ADMIN_PASSWORD');

  await connectDatabase();

  await Lecture.deleteMany({});
  await Course.deleteMany({});
  await Admin.deleteMany({});
  await User.deleteMany({});

  const hashedPassword = await bcrypt.hash(adminPassword, 10);
  await Admin.create({
    name: 'Admin',
    email: adminEmail,
    password: hashedPassword,
  });

  const hashedUserPassword = await bcrypt.hash('User@12345', 10);
  await User.create({
    name: 'Demo Student',
    email: 'user@example.com',
    password: hashedUserPassword,
    role: 'user',
  });

  for (const courseItem of coursesData) {
    const { lectures, ...courseFields } = courseItem;
    const thumbnailUrl =
      courseFields.thumbnailUrl && courseFields.thumbnailUrl.trim().length > 0
        ? courseFields.thumbnailUrl.trim()
        : `https://picsum.photos/seed/${encodeURIComponent(courseFields.title.toLowerCase().replace(/[^a-z0-9]/g, '-'))}/600/400`;

    const createdCourse = await Course.create({
      ...courseFields,
      thumbnailUrl,
    });

    const lecturesWithCourseId = lectures.map((lecture) => ({
      ...lecture,
      course: createdCourse._id,
    }));

    await Lecture.insertMany(lecturesWithCourseId);
  }

  console.log(`Seed finished: ${coursesData.length} courses created.`);
  console.log(`Admin login: ${adminEmail} / ${adminPassword}`);
  process.exit(0);
}

seedDatabase().catch((error) => {
  console.error('Seed failed:', error);
  process.exit(1);
});