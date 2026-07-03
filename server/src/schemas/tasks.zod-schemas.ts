import { z } from "zod";

export const postTaskSchema = z.object({
  title: z.string().trim()
    .min(1, "Title must be atleast 1 character long.")
    .max(100, "Title must be atmost 100 characters long."),

  description: z.string().trim()
    .max(500, "Description must be atmost 500 characters long.")
    .nullable().default(null),

  status: z.enum(["todo", "ongoing", "done"]).default("todo"),
  priority: z.enum(["low", "medium", "high"]).default("low"),

  due_date: z.iso.date().nullable().default(null)
}).strict();

export type PostTaskSchema = z.infer<typeof postTaskSchema>;
export type CreateTaskInput = {userId: string, projectId: string} & PostTaskSchema;