import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z.string().email().trim(),
  password: z.string().trim(),
});

export type LoginFormState =
  | {
      message?: string;
    }
  | undefined;
