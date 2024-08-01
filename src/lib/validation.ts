import { z } from "zod"

const stringRequired = z.string().min(1, "Required")

export const signUpFormSchema = z.object({
    email: stringRequired.max(50),
    password: stringRequired.max(8),
})

export type SignUpFormValues = z.infer<typeof signUpFormSchema>

export const signInFormSchema = z.object({
    email: stringRequired.max(50),
    password: stringRequired.max(8),
})

export type SignInFormValues = z.infer<typeof signInFormSchema>
