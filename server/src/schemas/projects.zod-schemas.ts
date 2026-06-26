import { z } from "zod";

export const projectsPostSchema = z.object({
  title: z.string().trim().max(100),
  description: z.string().trim().nullable()
});

export type ProjectsPost = z.infer<typeof projectsPostSchema>;