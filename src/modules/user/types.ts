import { z } from "zod";

export const newUserFormSchema = z.object({
  displayName: z.string().min(1),
  profilePicture: z.string().optional(),
  username: z.string().min(1),
});

export type NewUserFormType = z.infer<typeof newUserFormSchema>;
