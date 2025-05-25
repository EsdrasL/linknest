"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { Link } from "@/core/models/LinkConfig";
import { dependencyContainer } from "@/lib/dependencyContainer";
import { AddLinkFormSchema } from "@/core/validation/addLinkForm";
import { addLink } from "@/core/usecases/addLink";
import { removeLink } from "@/core/usecases/removeLink";

export async function addLinkAction(formData: FormData) {
  const userId = await dependencyContainer.authService.verifySession();

  if (!userId) {
    redirect("/login");
  }

  const validatedFields = AddLinkFormSchema.safeParse({
    title: formData.get("title"),
    url: formData.get("url"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  await addLink(userId, validatedFields.data, dependencyContainer);

  revalidatePath("/admin");
}

export async function removeLinkAction(link: Link) {
  const userId = await dependencyContainer.authService.verifySession();

  if (!userId) {
    redirect("/login");
  }

  await removeLink(userId, link, dependencyContainer);

  revalidatePath("/admin");
}
