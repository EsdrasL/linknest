import { z } from "zod";

const usernameValidation = z
  .string()
  .min(3, { message: "Username must be at least 3 characters long." })
  .max(20, { message: "Username must be at most 20 characters long." })
  .regex(/^[a-zA-Z0-9_]+$/, {
    message: "Username can only contain letters, numbers, and underscores.",
  })
  .trim();

export const SignupFormSchema = z.object({
  username: usernameValidation,
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(8, { message: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character.",
    })
    .trim(),
});

export const UsernameSchema = z.object({
  username: usernameValidation,
});

export type SignupFormState = {
  username: string;
  email: string;
  errors?: {
    username?: string[];
    email?: string[];
    password?: string[];
  };
  message?: string;
} | null;
