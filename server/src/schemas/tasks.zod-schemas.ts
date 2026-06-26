import { z } from "zod";

export const tasksPostSchema = z.object({
  title: z.string().trim().max(100),
  description: z.string().trim().nullable(),
  status: z.enum(["todo", "ongoing", "done"]).nullable(),
  priority: z.enum(["low", "medium", "high"]).nullable(),
  due_date: z.iso.date().nullable(),
});

export type TasksPost = z.infer<typeof tasksPostSchema>;