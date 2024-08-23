import { z } from "zod";
import { stringRequired } from "@/lib/validation";

export const createModuleActionSchema = z.object({
    id: stringRequired,
    name: stringRequired.max(50, "Cannot exceed 50 characters"),
    abbreviation: z.string().optional(),
    description: z.string().optional(),
    color: stringRequired.max(255, "Cannot exceed 255 characters"),
    fee: z.string().optional(),
    currencyId: z.string().optional()
});

export const createModuleFormSchema = z.object({
    name: stringRequired.max(50, "Cannot exceed 50 characters"),
    abbreviation: z.string().optional(),
    description: z.string().optional(),
    color: stringRequired.max(255, "Cannot exceed 255 characters"),
    fee: z.string().optional(),
    currencyId: z.string().optional()
});

export type CreateModuleFormValues = z.infer<typeof createModuleFormSchema>;

export const deleteModuleActionSchema = z.object({ id: stringRequired });

export const editModuleActionSchema = z.object({
    id: stringRequired,
    name: z.string().max(50, "Cannot exceed 50 characters").optional(),
    color: stringRequired.max(255, "Cannot exceed 255 characters").optional(),
});

export type EditModuleFormValues = z.infer<typeof editModuleActionSchema>;
