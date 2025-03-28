import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters.",
    })
    .max(32, { message: "Password must be at least 32 characters." }),
});

export type SignInFormType = z.infer<typeof signInSchema>;
