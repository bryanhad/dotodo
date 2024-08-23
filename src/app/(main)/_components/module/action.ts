"use server";

import db from "@/lib/db";
import {
    ActionError,
    authenticatedActionClient
} from "@/lib/safe-action";
import {
    createModuleActionSchema,
    deleteModuleActionSchema,
    editModuleActionSchema,
} from "./validation";
import { revalidatePath } from "next/cache";

export const createModuleAction = authenticatedActionClient
    .metadata({ actionName: "create module" })
    .schema(createModuleActionSchema)
    .action(async ({ parsedInput, ctx: { user } }) => {
        const existingModule = await db.module.findFirst({
            where: {
                AND: [
                    { authorId: user.id },
                    { name: { equals: parsedInput.name, mode: "insensitive" } },
                ],
            },
        });

        if (existingModule) {
            throw new ActionError(
                `Module '${existingModule.name}' already exists`,
                "Failed to add new module",
            );
        }

        await db.module.create({
            data: {
                ...parsedInput,
                authorId: user.id,
            },
        });

        revalidatePath("/");
        return parsedInput;
    });

export const deleteModuleAction = authenticatedActionClient
    .metadata({actionName: "delete module"})
    .schema(deleteModuleActionSchema)
    .action(async ({ parsedInput, ctx: { user } }) => {
        const toBeDeletedModule = await db.module.findFirst({
            where: { AND: [{ id: parsedInput.id }, { authorId: user.id }] },
        });

        if (!toBeDeletedModule) {
            throw new ActionError(
                "Module id is not found",
                "Failed to delete module",
            );
        }

        await db.module.delete({ where: { id: parsedInput.id } });

        revalidatePath("/");
        return toBeDeletedModule;
    });

export const editModuleAction = authenticatedActionClient
    .metadata({actionName: 'edit module'})
    .schema(editModuleActionSchema)
    .action(async ({ parsedInput, ctx: { user } }) => {
        const tobeUpdatedModule = await db.module.findFirst({
            where: { AND: [{ id: parsedInput.id }, { authorId: user.id }] },
        });

        await new Promise(res => setTimeout(res, 2000))

        if (!tobeUpdatedModule) {
            throw new ActionError(
                "Module id is not found",
                "Failed to update module",
            );
        }

        await db.module.update({
            where: { id: parsedInput.id },
            data: {
                ...(parsedInput.name && { name: parsedInput.name }),
                ...(parsedInput.color && { color: parsedInput.color }),
            },
        });

        revalidatePath("/");
    });
