import { z } from "zod";

const stringRequired = z.string().min(1, "Required");
const containsNumberRegex = /\d/
const usernameSchema = z
  .string()
  .regex(/^[a-zA-Z0-9_-]+$/, "Only letters, numbers, -, and _ are allowed");

export const signUpFormSchema = z.object({
  email: stringRequired
    .email("Invalid email address")
    .max(255, "Email cannot exceed 255 characters"),
  password: stringRequired.max(12),
});

export type SignUpFormValues = z.infer<typeof signUpFormSchema>;

export const signInFormSchema = z.object({
  email: stringRequired.max(50),
  password: stringRequired.max(8),
});

export type SignInFormValues = z.infer<typeof signInFormSchema>;
