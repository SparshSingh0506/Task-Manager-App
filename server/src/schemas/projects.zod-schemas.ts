import { z } from "zod";

export const projectsPostSchema = z.object({
  title: z.string().trim().max(100),
  description: z.string().trim().optional()
});

export type ProjectsPost = z.infer<typeof projectsPostSchema>;