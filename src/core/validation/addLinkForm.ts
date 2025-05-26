import { z } from "zod";

export const AddLinkFormSchema = z.object({
  username: z.string().trim(),
  title: z.string().trim(),
  url: z.string().url({ message: "Must be a valid URL." }).trim(),
});

export type AddLinkFormState = {
  title: string;
  url: string;
  errors?: {
    title?: string[];
    url?: string[];
  };
  message?: string;
} | null;
