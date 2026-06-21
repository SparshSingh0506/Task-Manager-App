export interface User { // user ts type that will be retrieved from db
  id: string,
  username: string,
  email: string,
  password_hash: string,
  created_at: string
}

export interface Project { // project ts type that will be retrieved from db
  id: string,
  user_id: string,
  title: string,
  description: string | null, // ?: sets it undefined, but db should store null
  created_at: string,
  updated_at: string
}

type Status = "todo" | "ongoing" | "done";
type Priority = "low" | "medium" | "high";

export interface Task { // task ts type that will be retrieved from db
  id: string,
  project_id: string,
  title: string,
  description: string | null,
  status: Status,
  priority: Priority,
  due_date: string | null,
  created_at: string,
  updated_at: string
}