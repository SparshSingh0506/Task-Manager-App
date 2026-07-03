import { z } from "zod";

export const postProjectSchema = z.object({
  title: z.string().trim()
    .min(1, "Title must be atleast 1 character long.")
    .max(100, "Title must be under 100 characters."),

  description: z.string().trim()
    .max(500, "Description must be under 500 characters.")
    .nullable().default(null),
}).strict();

export type PostProjectSchema = z.infer<typeof postProjectSchema>;
export type CreateProjectInput = { userId: string } & PostProjectSchema;


export const patchProjectSchema = z.object({
  title: z.string().trim()
    .min(1, "Title must be atleast 1 character long.")
    .max(100, "Title must be under 100 characters.")
    .optional(),

  description: z.string().trim()
    .max(500, "Description must be under 500 characters.")
    .optional()
})

export type PatchProjectSchema = z.infer<typeof patchProjectSchema>;