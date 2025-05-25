"use server";

import { signUpUser } from "@/core/usecases/signupUser";
import { dependencyContainer } from "@/lib/dependencyContainer";
import { FormState, SignupFormSchema } from "@/core/validation/signupForm";
import { redirect } from "next/navigation";

export async function onSignUpSubmit(state: FormState, formData: FormData) {
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, password } = validatedFields.data;

  try {
    await signUpUser(name, email, password, dependencyContainer);
  } catch (error) {
    return { message: "An error occurred while creating your account." };
  }

  redirect("/admin");
}
