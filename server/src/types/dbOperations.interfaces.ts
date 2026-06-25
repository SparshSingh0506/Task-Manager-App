// Users
export interface CreateUserInput {
  username: string,
  email: string,
  password_hash: string,
}

// Projects
export interface CreateProjectInput {
  user_id: string,
  title: string,
  description: string | null
}

// Tasks
// export interface CreateTaskInput {

// }