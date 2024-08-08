"use server";

import db from "@/lib/db";
import { actionClient, CustomError } from "@/lib/safe-action";
import { createTagSchema } from "@/lib/validation";
import { generateIdFromEntropySize } from "lucia";
import { flattenValidationErrors } from "next-safe-action";

export const createTag = actionClient
    .schema(createTagSchema, {
        handleValidationErrorsShape: (validationErrors) =>
            flattenValidationErrors(validationErrors).fieldErrors,
    })
    .action(async ({ parsedInput: { name, color, authorId } }) => {
        const existingTag = await db.tag.findFirst({
            where: {
                AND: [
                    { authorId },
                    { name: { equals: name, mode: "insensitive" } },
                ],
            },
        });
        if (existingTag) {
            throw new CustomError(`Tag '${existingTag.name}' alreadt exists`);
        }

        const newTagId = generateIdFromEntropySize(10); // 16 characters long

        await db.tag.create({
            data: {
                id: newTagId,
                name,
                color,
                authorId: authorId,
            },
        });
    });
