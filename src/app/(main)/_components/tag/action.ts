"use server";

import db from "@/lib/db";
import {
    actionClient,
    ActionError,
    authenticatedActionClient,
} from "@/lib/safe-action";
import { createTagActionSchema, deleteTagSchema } from "@/lib/validation";
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

export const deleteTag = actionClient
    .schema(deleteTagSchema)
    .action(async ({ parsedInput: { id } }) => {
        await db.tag.delete({
            where: { id },
        });
    });
