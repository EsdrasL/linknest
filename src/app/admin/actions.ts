"use server";

import { redirect } from "next/navigation";
import { dependencyContainer } from "@/lib/dependencyContainer";

export async function getCurrentUser() {
  const { isAuth, userId } =
    await dependencyContainer.authService.verifySession();

  if (!isAuth) {
    redirect("/login");
  }

  return userId;
}
