"use server";

import db from "@/lib/db";
import { ActionError, authenticatedActionClient } from "@/lib/safe-action";
import { createTodoActionSchema } from "@/lib/validation";
import { generateIdFromEntropySize } from "lucia";

export const createTodoAction = authenticatedActionClient
    .metadata({ actionName: "create todo" })
    .schema(createTodoActionSchema)
    .action(async ({ parsedInput, ctx: { user } }) => {
        const newTodoId = generateIdFromEntropySize(10);

        const existingTag = await db.tag.findUnique({
            where: { id: parsedInput.tagId },
        });

        if (!existingTag) {
            throw new ActionError("Tag not found", "Failed to add todo");
        }

        await db.todo.create({
            data: {
                id: newTodoId,
                isDone: false,
                title: parsedInput.title,
                authorId: user.id,
                tagId: parsedInput.tagId,
                ...(parsedInput.deadline && { deadline: parsedInput.deadline }),
                ...(parsedInput.detail && { detail: parsedInput.detail }),
            },
        });
    });
