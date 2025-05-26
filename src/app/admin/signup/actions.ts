"use server";

import { signUpUser } from "@/core/usecases/signupUser";
import { dependencyContainer } from "@/lib/dependencyContainer";
import {
  SignupFormState,
  SignupFormSchema,
  UsernameSchema,
} from "@/core/validation/signupForm";
import { redirect } from "next/navigation";
import { usernameAvailiable } from "@/core/usecases/usernameAvailiable";

export async function signUpAction(
  _state: SignupFormState,
  formData: FormData
): Promise<SignupFormState> {
  const validatedFields = SignupFormSchema.safeParse({
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      username: formData.get("username")?.toString() || "",
      email: formData.get("email")?.toString() || "",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { username, email, password } = validatedFields.data;

  try {
    await signUpUser(username, email, password, dependencyContainer);
  } catch (error) {
    if (error instanceof Error) {
      if (error.cause === "username" || error.cause === "email") {
        return {
          username,
          email,
          errors: { [error.cause]: [error.message] },
        };
      }
    }

    return {
      username,
      email,
      message: "An error occurred while creating your account.",
    };
  }

  redirect("/admin");
}

export async function usernameAvailiableAction(
  username: string
): Promise<boolean> {
  const validatedFields = UsernameSchema.safeParse({ username });

  if (!validatedFields.success) return false;

  return await usernameAvailiable(username, dependencyContainer);
}
