import { z } from "zod";

export const projectsPostSchema = z.object({
  title: z.string().trim().max(100),
  description: z.string().trim().nullable()
});

export type ProjectsPostSchema = z.infer<typeof projectsPostSchema>;
export type CreateProjectInput = {userId: string} & ProjectsPostSchema;