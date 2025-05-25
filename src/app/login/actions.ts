"use server";

import { loginUser } from "@/core/usecases/loginUser";
import { LoginFormSchema, LoginFormState } from "@/core/validation/loginForm";
import { dependencyContainer } from "@/lib/dependencyContainer";
import { redirect } from "next/navigation";

export async function loginAction(state: LoginFormState, formData: FormData) {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      message: "Invalid email or password",
    };
  }

  const { email, password } = validatedFields.data;

  let message = "";
  try {
    const user = await loginUser(email, password, dependencyContainer);
    if (!user) {
      message = "Invalid email or password";
    }
  } catch (error) {
    message = "An error occurred while loggin in. Please try again later.";
  }

  if (message) {
    return { message };
  }

  // Next redirect can't be used within try/catch blocks
  redirect("/admin");
}
