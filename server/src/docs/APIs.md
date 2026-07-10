# Authentication

* **POST** /api/v1/auth/register
* **POST**  /api/v1/auth/login
* (⚠️ Pending) **PATCH** /api/v1/auth/profile (pending)

# Projects

* **POST**  /api/v1/projects
* **GET** /api/v1/projects
* **GET** /api/v1/projects/:projectId
* **DELETE** /api/v1/projects/:projectId
* **PATCH**  /api/v1/projects/:projectId

# Tasks

* **POST**  /api/v1/tasks
* **GET** /api/v1/tasks
* **GET** /api/v1/projects/:id/tasks/:taskId
* **DELETE** /api/v1/projects/:id/tasks/:taskId
* **PATCH**  /api/v1/projects/:id/tasks/:taskId