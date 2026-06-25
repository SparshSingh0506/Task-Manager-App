import { z } from "zod";

export const tasksPostSchema = z.object({
  title: z.string().trim().max(100),
  description: z.string().trim().optional(),
  status: z.enum(["todo", "ongoing", "done"]).optional(),
  priority: z.enum(["low", "medium", "high"]).optional(),
  due_date: z.iso.date().optional(),
});

export type tasksPost = z.infer<typeof tasksPostSchema>;