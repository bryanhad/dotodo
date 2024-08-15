import { z } from "zod";

const stringRequired = z.string().min(1, "Required");
const containsNumberRegex = /\d/;
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

export const createTagActionSchema = z.object({
    id: stringRequired,
    name: stringRequired.max(50, "Cannot exceed 50 characters"),
    color: stringRequired.max(255, "Cannot exceed 255 characters"),
});
export const createTagFormSchema = z.object({
    name: stringRequired.max(50),
    color: stringRequired.max(255),
});

export type CreateTagFormValues = z.infer<typeof createTagFormSchema>;

export const deleteTagSchema = z.object({ id: stringRequired });

export const editTagSchema = z.object({
    id: stringRequired,
    name: z.string().max(50, "Cannot exceed 50 characters").optional(),
    color: stringRequired.max(255, "Cannot exceed 255 characters").optional(),
});
