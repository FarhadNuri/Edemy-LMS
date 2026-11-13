# Edemy — Learning Management Platform

A modern, minimal, and responsive Learning Management System (LMS) built with Next.js (App Router), Express (MVC architecture), TypeScript, and MongoDB.

---

## Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend (`client/`)** | Next.js 16 (App Router), React 19, TypeScript (Strict), Tailwind CSS, Framer Motion |
| **Backend (`server/`)** | Node.js, Express 4, TypeScript, MongoDB, Mongoose, JWT (`jsonwebtoken`), `bcryptjs` |
| **Architecture** | REST API · MVC Pattern · Responsive Design · Token Authentication |

---

## Architecture Highlights

### Frontend (`client/`)
- **Skeleton Loaders:** Dedicated placeholder states across all pages to prevent layout shift (CLS) and ensure instant perceived load times.
- **Framer Motion:** Tasteful scroll transitions, staggered hero entry, and an auto-sliding featured carousel with reduced motion accessibility.
- **Responsive Video Player:** 16:9 embedded player supporting YouTube and Vimeo with automatic URL resolution and playlist navigation.
- **State & Route Guards:** Centralized auth and toast context providers with client-side route protection and zero external UI kits.

### Backend (`server/`)
- **MVC Architecture:** Strict separation into Mongoose models, business logic controllers, and modular express routes.
- **Strict TypeScript:** 100% typed codebase with strict compiler checks, centralized input validation, and zero `any`.
- **JWT Authentication:** Stateless token-based authentication with bcrypt password hashing and role-based access control.

---

## Demo Credentials

Clickable demo credentials are provided on both login portals:

| Role | Portal URL | Email | Password |
|---|---|---|---|
| **Administrator** | `/admin/login` | `admin@example.com` | `Admin@12345` |
| **Student** | `/login` | `user@example.com` | `User@12345` |

---

## Core Features

### Student Experience (Public & Authenticated)
- **Landing Page:** Interactive hero, 6-course featured carousel (auto-sliding with pause-on-hover), platform highlights, and value propositions.
- **Courses Catalog (`/courses`):** Protected course grid displaying 9 initial courses with sequential "View More" loading (6 per step).
- **Course & Lecture View:** Responsive embedded video player with chapter listings and next/previous lecture navigation.
- **Mobile Responsive Navigation:** Accessible hamburger drawer with account details, navigation links, and logout.

### Admin Dashboard (`/admin`)
- **Course Management:** Full CRUD operations for courses with confirmation dialogs.
- **Curriculum & Lectures:** Add, edit, reorder, and remove video lessons per course.
- **Mobile-Adaptive Table:** Automatically converts from desktop data table to responsive card blocks with easy-tap action buttons on smaller viewports.
- **Account & Navigation Modal:** Quick switching between student homepage, admin dashboard, and session logout.

---

## API Reference Summary

Base URL: `http://localhost:5000/api`

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/health` | Public | Healthcheck status |
| `POST` | `/auth/register` | Public | Register a student account |
| `POST` | `/auth/login` | Public | Sign in user or administrator (returns JWT) |
| `GET` | `/auth/me` | Admin | Verify admin authentication token |
| `GET` | `/courses` | Public | List all published courses |
| `GET` | `/courses/:courseId` | Public | Fetch single course with lecture playlist |
| `POST` | `/courses` | Admin | Create a new course |
| `PUT` | `/courses/:courseId` | Admin | Update course metadata |
| `DELETE` | `/courses/:courseId` | Admin | Delete course and its cascade lectures |
| `GET` | `/courses/:courseId/lectures` | Public | List lectures for a course |
| `POST` | `/courses/:courseId/lectures` | Admin | Add lecture to a course |
| `GET` | `/lectures/:lectureId` | Public | Get single lecture details |
| `PUT` | `/lectures/:lectureId` | Admin | Edit lecture details or video URL |
| `DELETE` | `/lectures/:lectureId` | Admin | Delete single lecture |

*Admin endpoints require: `Authorization: Bearer <token>`*

---

## Repository Structure

```text
lmsrepo/
├── client/                     # Next.js 16 Frontend Application
│   ├── src/
│   │   ├── app/                # App Router pages ((student), admin, login, etc.)
│   │   ├── components/         # course/, lecture/, layout/, ui/
│   │   ├── context/            # AuthContext, ToastContext
│   │   ├── hooks/              # useAuth, useCourses, useCourse, useLecture
│   │   ├── services/           # apiClient, authService, courseService, lectureService
│   │   └── utils/              # formatPrice, tokenStorage, validators
│   └── package.json
├── server/                     # Express & TypeScript Backend API
│   ├── src/
│   │   ├── controllers/        # authController, courseController, lectureController
│   │   ├── models/             # Admin, Course, Lecture, User
│   │   ├── routes/             # authRoutes, courseRoutes, lectureRoutes
│   │   ├── middlewares/        # authMiddleware, errorMiddleware, notFoundMiddleware
│   │   ├── seed.ts             # Database seed script
│   │   └── server.ts           # Server entrypoint
│   └── package.json
└── README.md
```

---

## Getting Started

### Prerequisites
- **Node.js** 18+ (LTS recommended)
- **MongoDB** (local MongoDB instance or MongoDB Atlas cluster)

---

### 1. Backend Setup (`server/`)

```bash
# 1. Enter server directory
cd server

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp .env.example .env
# Windows (PowerShell): Copy-Item .env.example .env

# 4. Seed database (creates default admin, demo student, courses & lectures)
npm run seed

# 5. Start development server (runs on port 5000)
npm run dev
```

**Server Environment Variables (`server/.env`):**
- `PORT`: Server port (default: `5000`)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT signing
- `JWT_EXPIRES_IN`: Token expiration (e.g. `1d`)
- `CLIENT_URL`: Allowed CORS origin (`http://localhost:3000`)
- `ADMIN_EMAIL`: Default admin email (`admin@example.com`)
- `ADMIN_PASSWORD`: Default admin password (`Admin@12345`)

---

### 2. Frontend Setup (`client/`)

```bash
# 1. Enter client directory
cd client

# 2. Install dependencies
npm install

# 3. Setup local environment (optional, defaults to http://localhost:5000/api)
echo "NEXT_PUBLIC_API_URL=http://localhost:5000/api" > .env.local

# 4. Start frontend development server (runs on port 3000)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Author & Support

**Farhad Nuri**
- **GitHub:** [@FarhadNuri](https://github.com/FarhadNuri)
- **LinkedIn:** [Farhad Nuri](https://www.linkedin.com/in/farhad-nuri-ba99a62a5/)
- **Email:** farhadnuri559@gmail.com

---