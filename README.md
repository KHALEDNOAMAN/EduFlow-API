<div align="center">

# 🚀 EduFlow API

**RESTful Backend Service for Educational Technology Platform**

[![Node.js](https://img.shields.io/badge/Node.js-20_LTS-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.x-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

A production-grade RESTful API backend for an educational technology platform, featuring JWT authentication, role-based access control, and a clean layered architecture. Built during a software engineering internship at an EdTech startup in Istanbul.

</div>

---

## ✨ Features

- 🔐 **JWT Authentication** - Secure registration, login, and token-based session management
- 👥 **Role-Based Access Control** - Admin, Instructor, and Student roles with granular permissions
- 📚 **Course Management** - Full CRUD operations for courses, lessons, and enrollments
- 🏗️ **Layered Architecture** - Clean separation: Routes → Controllers → Services → Database
- ✅ **Input Validation** - Zod schema validation for all API endpoints
- 🔄 **Database Migrations** - Version-controlled schema changes with Knex.js
- 🌱 **Seed Data** - Realistic sample data for development and testing
- 📊 **Pagination** - Server-side pagination with metadata for all list endpoints
- 🛡️ **Security Best Practices** - Password hashing (bcrypt), CORS, helmet, rate limiting
- 🧪 **Testing** - Unit and integration tests with Jest and Supertest

## 🏗️ Architecture

```
Request → Routes → Middleware → Controllers → Services → Database
                   (Auth/Validation)  (HTTP Logic)  (Business Logic)  (Knex/PostgreSQL)
```

## 📁 Project Structure

```
EduFlow-API/
├── src/
│   ├── app.js                    # Express application setup
│   ├── config/
│   │   ├── database.js           # PostgreSQL connection pool
│   │   └── constants.js          # Application constants
│   ├── controllers/
│   │   ├── authController.js     # Authentication handlers
│   │   ├── userController.js     # User CRUD handlers
│   │   ├── courseController.js   # Course CRUD handlers
│   │   ├── lessonController.js   # Lesson CRUD handlers
│   │   └── enrollmentController.js # Enrollment handlers
│   ├── middleware/
│   │   ├── auth.js               # JWT verification
│   │   ├── roleMiddleware.js     # Role-based authorization
│   │   ├── errorHandler.js       # Global error handler
│   │   └── validate.js           # Zod validation middleware
│   ├── routes/
│   │   ├── authRoutes.js         # Auth endpoints
│   │   ├── userRoutes.js         # User endpoints
│   │   ├── courseRoutes.js       # Course endpoints
│   │   ├── lessonRoutes.js       # Lesson endpoints
│   │   └── enrollmentRoutes.js   # Enrollment endpoints
│   ├── services/
│   │   ├── authService.js        # Auth business logic
│   │   ├── userService.js        # User business logic
│   │   └── courseService.js      # Course business logic
│   ├── validators/
│   │   ├── authValidator.js      # Auth validation schemas
│   │   └── courseValidator.js    # Course validation schemas
│   └── utils/
│       ├── AppError.js           # Custom error class
│       └── helpers.js            # Response formatters
├── migrations/                   # Database migrations
├── seeds/                        # Seed data
├── tests/                        # Test files
├── server.js                     # Entry point
├── knexfile.js                   # Knex configuration
├── package.json
├── .env.example
└── .gitignore
```

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| Node.js 20 LTS | Runtime environment |
| Express.js 4 | Web framework |
| PostgreSQL 15 | Relational database |
| Knex.js | Query builder and migrations |
| bcryptjs | Password hashing |
| jsonwebtoken | JWT token management |
| Zod | Schema validation |
| Jest + Supertest | Testing framework |
| Morgan | HTTP request logging |
| CORS | Cross-origin resource sharing |

## 🚀 Getting Started

### Prerequisites

- Node.js 20+ and npm
- PostgreSQL 15+
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/KHALEDNOAMAN/EduFlow-API.git
cd EduFlow-API

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database credentials

# Run database migrations
npx knex migrate:latest

# Seed the database
npx knex seed:run

# Start the development server
npm run dev
```

### Environment Variables

```env
PORT=3001
NODE_ENV=development
DATABASE_URL=postgresql://user:password@localhost:5432/eduflow
JWT_SECRET=your-secret-key-here
JWT_EXPIRY=24h
CORS_ORIGIN=http://localhost:3000
```

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/profile` | Get current user profile | Yes |

### Users
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/users` | List all users (paginated) | Admin |
| GET | `/api/users/:id` | Get user by ID | Admin |
| PUT | `/api/users/:id` | Update user | Admin |
| DELETE | `/api/users/:id` | Delete user | Admin |

### Courses
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/courses` | List all courses | No |
| GET | `/api/courses/:id` | Get course details | No |
| POST | `/api/courses` | Create course | Instructor/Admin |
| PUT | `/api/courses/:id` | Update course | Instructor/Admin |
| DELETE | `/api/courses/:id` | Delete course | Admin |

### Lessons
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/courses/:courseId/lessons` | Get lessons for course | No |
| POST | `/api/courses/:courseId/lessons` | Add lesson | Instructor/Admin |
| PUT | `/api/lessons/:id` | Update lesson | Instructor/Admin |
| DELETE | `/api/lessons/:id` | Delete lesson | Admin |

### Enrollments
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/enrollments` | Enroll in course | Student |
| GET | `/api/enrollments/my` | Get my enrollments | Student |
| DELETE | `/api/enrollments/:id` | Unenroll | Student |

## 🗄️ Database Schema

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│    users     │     │   courses    │     │   lessons    │
├──────────────┤     ├──────────────┤     ├──────────────┤
│ id (UUID)    │     │ id (UUID)    │     │ id (UUID)    │
│ email        │◄────│ instructor_id│     │ course_id    │──►courses
│ password_hash│     │ title        │     │ title        │
│ first_name   │     │ description  │     │ content      │
│ last_name    │     │ category     │     │ video_url    │
│ role (ENUM)  │     │ difficulty   │     │ order_index  │
│ is_active    │     │ price        │     │ duration_min │
│ created_at   │     │ is_published │     │ created_at   │
│ updated_at   │     │ created_at   │     │ updated_at   │
└──────┬───────┘     └──────────────┘     └──────────────┘
       │
       │         ┌──────────────────┐
       └────────►│   enrollments    │
                 ├──────────────────┤
                 │ id (UUID)        │
                 │ user_id (FK)     │
                 │ course_id (FK)   │
                 │ progress (%)     │
                 │ enrolled_at      │
                 │ completed_at     │
                 │ UNIQUE(user,crs) │
                 └──────────────────┘
```

## 🧪 Running Tests

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  Built with ❤️ during internship at EduTech Yazilim A.S. - Istanbul, Turkey
</div>
