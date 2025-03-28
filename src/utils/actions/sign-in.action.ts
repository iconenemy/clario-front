"use server";

import { signIn } from "@utils/auth";
import { SignInFormType, signInSchema } from "@utils/schemas/sign-in.schema";

export async function signInUser(formData: SignInFormType) {
  const validateData = await signInSchema.parseAsync(formData);
  return signIn("EmailForm", validateData);
}
