import { z } from "zod";

export const newPostSchema = z.object({
  heading: z.string().min(1, { message: "Heading is required" }),
});

export type NewPostSchema = z.infer<typeof newPostSchema>;
