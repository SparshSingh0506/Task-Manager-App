import { z } from "zod";

export const tasksPostSchema = z.object({
  title: z.string().trim().max(100),
  description: z.string().trim().nullish().transform(val => val ?? null),
  status: z.enum(["todo", "ongoing", "done"]).nullish().transform(val => val ?? "todo"),
  priority: z.enum(["low", "medium", "high"]).nullish().transform(val => val ?? "low"),
  due_date: z.iso.date().nullish().transform(val => val ?? null),
});

export type TasksPostSchema = z.infer<typeof tasksPostSchema>;
export type CreateTaskInput = {userId: string, projectId: string} & TasksPostSchema;