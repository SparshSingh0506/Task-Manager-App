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


export const patchTaskSchema = z.object({
  title: z.string().trim()
    .min(1, "Title must be atleast 1 character long.")
    .max(100, "Title must be atmost 100 characters long.")
    .optional(),

  description: z.string().trim()
    .max(500, "Description must be atmost 500 characters long.")
    .optional(),

  status: z.enum(["todo", "ongoing", "done"]).optional(),
  priority: z.enum(["low", "medium", "high"]).optional(),

  due_date: z.iso.date().optional()
})
.strict()
.refine(
  data => Object.keys(data).length > 0,
  "At least one field must be provided for update."
);

export type PatchTaskSchema = z.infer<typeof patchTaskSchema>;