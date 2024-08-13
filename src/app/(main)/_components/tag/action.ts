"use server";

import db from "@/lib/db";
import { actionClient, CustomError } from "@/lib/safe-action";
import { createTagSchema } from "@/lib/validation";
import { revalidatePath } from "next/cache";

export const createTag = actionClient
    .schema(createTagSchema)
    .action(async ({ parsedInput }) => {
        await new Promise((res) => setTimeout(res, 2000));

        const { authorId, color, name, id } = parsedInput;

        const existingTag = await db.tag.findFirst({
            where: {
                AND: [
                    { authorId },
                    { name: { equals: name, mode: "insensitive" } },
                ],
            },
        });
        if (existingTag) {
            throw new CustomError(`Tag '${existingTag.name}' already exists`);
        }

        await db.tag.create({
            data: {
                id,
                name,
                color,
                authorId: authorId,
            },
        });

        revalidatePath("/");
        return parsedInput;
    });
