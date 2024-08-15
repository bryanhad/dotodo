"use server";

import db from "@/lib/db";
import {
    ActionError,
    authenticatedActionClient
} from "@/lib/safe-action";
import {
    createTagActionSchema,
    deleteTagSchema,
    editTagSchema,
} from "@/lib/validation";
import { revalidatePath } from "next/cache";

export const createTagAction = authenticatedActionClient
    .metadata({ actionName: "create tag" })
    .schema(createTagActionSchema)
    .action(async ({ parsedInput, ctx: { user } }) => {
        const existingTag = await db.tag.findFirst({
            where: {
                AND: [
                    { authorId: user.id },
                    { name: { equals: parsedInput.name, mode: "insensitive" } },
                ],
            },
        });

        if (existingTag) {
            throw new ActionError(
                `Tag '${existingTag.name}' already exists`,
                "Failed to add new tag",
            );
        }

        await db.tag.create({
            data: {
                ...parsedInput,
                authorId: user.id,
            },
        });

        revalidatePath("/");
        return parsedInput;
    });

export const deleteTagAction = authenticatedActionClient
    .metadata({actionName: "delete tag"})
    .schema(deleteTagSchema)
    .action(async ({ parsedInput, ctx: { user } }) => {
        const toBeDeletedTag = await db.tag.findFirst({
            where: { AND: [{ id: parsedInput.id }, { authorId: user.id }] },
        });

        if (!toBeDeletedTag) {
            throw new ActionError(
                "Tag id is not found",
                "Failed to delete tag",
            );
        }

        await db.tag.delete({ where: { id: parsedInput.id } });

        revalidatePath("/");
        return toBeDeletedTag;
    });

export const editTagAction = authenticatedActionClient
    .metadata({actionName: 'edit tag'})
    .schema(editTagSchema)
    .action(async ({ parsedInput, ctx: { user } }) => {
        const tobeUpdatedTag = await db.tag.findFirst({
            where: { AND: [{ id: parsedInput.id }, { authorId: user.id }] },
        });

        await new Promise(res => setTimeout(res, 2000))

        if (!tobeUpdatedTag) {
            throw new ActionError(
                "Tag id is not found",
                "Failed to update tag",
            );
        }

        await db.tag.update({
            where: { id: parsedInput.id },
            data: {
                ...(parsedInput.name && { name: parsedInput.name }),
                ...(parsedInput.color && { color: parsedInput.color }),
            },
        });

        revalidatePath("/");
    });
