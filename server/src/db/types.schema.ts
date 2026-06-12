export interface User {
  id: string,
  username: string,
  email: string,
  password_hash: string,
  created_at: string
}

export interface Project {
  id: string,
  user_id: string,
  title: string,
  created_at: string
}

type Status = "todo" | "ongoing" | "done";
type Priority = "low" | "medium" | "high";

export interface Task {
  id: string,
  project_id: string,
  title: string,
  description?: string,
  status: Status,
  priority: Priority,
  due_date?: string,
  created_at: string,
  updated_at: string
}