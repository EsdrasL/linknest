"use server";

import { signUpUser } from "@/core/usecases/signupUser";
import { dependencyContainer } from "@/lib/dependencyContainer";
import { SignupFormState, SignupFormSchema } from "@/core/validation/signupForm";
import { redirect } from "next/navigation";

export async function onSignUpSubmit(state: SignupFormState, formData: FormData) {
  const validatedFields = SignupFormSchema.safeParse({
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { username, email, password } = validatedFields.data;

  try {
    await signUpUser(username, email, password, dependencyContainer);
  } catch (error) {
    return { message: "An error occurred while creating your account." };
  }

  redirect("/admin");
}
