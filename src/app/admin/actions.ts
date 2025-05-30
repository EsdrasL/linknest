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
    redirect("/admin/login");
  }

  const validatedFields = AddLinkFormSchema.safeParse({
    username: formData.get("username"),
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
  revalidatePath(`/${validatedFields.data.username}`);

  return { title: "", url: "" };
}

export async function removeLinkAction(username: string, link: Link) {
  const userId = await dependencyContainer.authService.verifySession();

  if (!userId) {
    redirect("/admin/login");
  }

  await removeLink(userId, link, dependencyContainer);

  revalidatePath("/admin");
  revalidatePath(`/${username}`);
}

export async function updateLinkAction(
  _state: UpdateLinkFormState,
  formData: FormData
): Promise<UpdateLinkFormState> {
  const userId = await dependencyContainer.authService.verifySession();

  if (!userId) {
    redirect("/admin/login");
  }

  const validatedFields = UpdateLinkFormSchema.safeParse({
    username: formData.get("username"),
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
  revalidatePath(`/${validatedFields.data.username}`);

  return {};
}
