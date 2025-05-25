import { z } from "zod";

export const AddLinkFormSchema = z.object({
  title: z.string().trim(),
  url: z.string().url({ message: "Must be a valid URL." }).trim(),
});

export type AddLinkFormState =
  | {
      errors?: {
        title?: string[];
        url?: string[];
      };
      message?: string;
    }
  | undefined;
