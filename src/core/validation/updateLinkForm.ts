import { z } from "zod";

export const UpdateLinkFormSchema = z.object({
  id: z.string().trim(),
  title: z.string().trim(),
  url: z.string().url({ message: "Must be a valid URL." }).trim(),
});

export type UpdateLinkFormState =
  | {
      errors?: {
        title?: string[];
        url?: string[];
      };
      message?: string;
    }
  | null;
