"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { Link } from "@/core/models/LinkConfig";
import { dependencyContainer } from "@/lib/dependencyContainer";
import {
  AddLinkFormSchema,
  AddLinkFormState,
} from "@/core/validation/addLinkForm";
import { addLink } from "@/core/usecases/addLink";
import { removeLink } from "@/core/usecases/removeLink";
import {
  UpdateLinkFormSchema,
  UpdateLinkFormState,
} from "@/core/validation/updateLinkForm";
import { updateLink } from "@/core/usecases/updateLink";

export async function addLinkAction(
  _state: AddLinkFormState,
  formData: FormData
): Promise<AddLinkFormState> {
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
      title: formData.get("title")?.toString() || "",
      url: formData.get("url")?.toString() || "",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  await addLink(userId, validatedFields.data, dependencyContainer);
  revalidatePath("/admin");

  return { title: "", url: "" };
}

export async function removeLinkAction(link: Link) {
  const userId = await dependencyContainer.authService.verifySession();

  if (!userId) {
    redirect("/login");
  }

  await removeLink(userId, link, dependencyContainer);

  revalidatePath("/admin");
}

export async function updateLinkAction(
  _state: UpdateLinkFormState,
  formData: FormData
): Promise<UpdateLinkFormState> {
  const userId = await dependencyContainer.authService.verifySession();

  if (!userId) {
    redirect("/login");
  }

  const validatedFields = UpdateLinkFormSchema.safeParse({
    id: formData.get("id"),
    title: formData.get("title"),
    url: formData.get("url"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  await updateLink(userId, validatedFields.data, dependencyContainer);
  revalidatePath("/admin");

  return {};
}
