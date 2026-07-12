# Task Manager App Backend

A backend-only task manager API built with Express, TypeScript, PostgreSQL, and JWT authentication. This project was created as a first serious backend project to understand how real server-side applications are structured, while intentionally keeping the stack minimal to learn the core concepts first.

## Why this project exists

This project focuses on backend fundamentals rather than UI. The goal was to build a practical API that demonstrates:

- request validation
- authentication and authorization
- layered backend architecture
- database access with PostgreSQL
- error handling and response consistency

## Tech Stack

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- JWT for authentication
- bcryptjs for password hashing
- Zod for request validation
- Vitest & Supertest for basic testing of some routes

## What I Implemented

- User registration and login endpoints
- Input validation for auth, project, and task requests
- JWT-based authentication middleware
- Password hashing before storing credentials
- Project & Task CRUD operations
- Ownership checks so users can only access their own data, enforcing authorization
- Centralized error handling using a custom AppError class & global error handler
- Service layer for business logic
- Repository layer for database queries

## Backend Architecture

The codebase is organized in a simple layered structure:

- Routes: define API endpoints and middleware order
- Controllers: handle request and response flow
- Services: contain business logic and domain checks
- Repositories: handle database queries
- Middlewares: handle auth, validation, and errors
- Schemas: define request validation rules with Zod

This structure keeps the code easier to test, reason about, and extend.

## API Overview

### Auth

- `POST /api/v1/auth/register` - create a new user
- `POST /api/v1/auth/login` - authenticate and receive a JWT

### Projects

- `POST /api/v1/projects` - create a project
- `GET /api/v1/projects` - get all projects for the logged-in user
- `GET /api/v1/projects/:projectId` - get a single project
- `PATCH /api/v1/projects/:projectId` - update a project
- `DELETE /api/v1/projects/:projectId` - delete a project

### Tasks

- `POST /api/v1/projects/:projectId/tasks` - create a task inside a project
- `GET /api/v1/projects/:projectId/tasks` - get all tasks inside a project
- `GET /api/v1/projects/:projectId/tasks/:taskId` - get a single task
- `PATCH /api/v1/projects/:projectId/tasks/:taskId` - update a task
- `DELETE /api/v1/projects/:projectId/tasks/:taskId` - delete a task

## What This Project Demonstrates

This project shows practical understanding of backend concepts that matter in real applications:

- how authentication flows work with JWT
- how to protect routes with middleware
- how to validate input before it reaches business logic
- how to keep database logic separate from request handling
- how to enforce ownership checks at the backend level
- how to avoid unsafe SQL patterns by using parameterized queries

## Environment Variables

The server expects the following environment variables:

- `PORT`
- `DATABASE_URL`
- `JWT_SECRET`

## Running Locally

1. Install dependencies inside the `server` folder.
2. Create a `.env` file with the required environment variables.
3. Start the server with the dev script.

Example:

```bash
cd server
npm install
npm run dev
```

## Notes

This project was intentionally built without a frontend so the focus stays on backend fundamentals. It is meant to show understanding of API design, data flow, validation, authentication, and code organization rather than UI polish.

## Future Improvements

If I continue this project later, the next improvements would be:

- automated tests
- structured logging
- rate limiting
- more detailed API documentation
- transaction handling for multi-step workflows