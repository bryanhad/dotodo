import { hash } from "@node-rs/argon2";
import { PrismaClient, Tag, User } from "@prisma/client";
import { generateIdFromEntropySize } from "lucia";
import { argonHashOptionConfig } from "../src/lib/utils";
import { dummyTags, dummyTodos, dummyUsers } from "./dummy-datas";
import { generateRandomDate, getRandomNumberInRange } from "./lib";

import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { Lucia } from "lucia";

(async () => {
    const prisma = new PrismaClient();

    const adapter = new PrismaAdapter(prisma.session, prisma.user);
    const lucia = new Lucia(adapter);

    try {
        await prisma.user.deleteMany()
        console.log('Successfully cleared all tables\n')

        const usersSeed = await Promise.all(
            dummyUsers.map(async ({password, ...user}): Promise<User> => {
                const hashedPassword = await hash(
                    password,
                    argonHashOptionConfig,
                );
                const userId = generateIdFromEntropySize(10); // 16 characters long
                return {
                    ...user,
                    id: userId,
                    passwordHash: hashedPassword,
                };
            }),
        );
        console.log('Successfully generated users seed data')

        const tagsSeed = await Promise.all(
            dummyTags.map(async (tag): Promise<Omit<Tag, 'createdAt'>> => {
                const randomUserIndex = getRandomNumberInRange(
                    0,
                    usersSeed.length-1,
                );
                const randomUserId = usersSeed[randomUserIndex].id;
                const tagId = generateIdFromEntropySize(10); // 16 characters long

                return {
                    ...tag,
                    id: tagId,
                    authorId: randomUserId,
                };
            }),
        );
        console.log('Successfully generated tags seed data')

        const todosSeed = dummyTodos.map((todo) => {
            const todoId = generateIdFromEntropySize(10); // 16 characters long
            const randomDate = generateRandomDate();
            const randomUserIndex = getRandomNumberInRange(0, usersSeed.length-1);
            const randomUserId = usersSeed[randomUserIndex].id;
            const randomTagIndex = getRandomNumberInRange(0, tagsSeed.length-1);
            const randomTagId = tagsSeed[randomTagIndex].id;
            const isDone = getRandomNumberInRange(1, 10) % 2 === 0;

            return {
                ...todo,
                id: todoId,
                deadline: randomDate,
                authorId: randomUserId,
                tagId: randomTagId,
                isDone,
            };
        });
        console.log('Successfully generated todos seed data')

        console.log("BEGIN SEEDING");

        await prisma.user.createMany({
            data: usersSeed,
            skipDuplicates: true,
        });
        console.log("Successfully seeded users table!");

        await Promise.all(
            usersSeed.map(async (user) => {
                await lucia.createSession(user.id, {});
            }),
        );
        console.log("Successfully seeded sessions table!");

        await prisma.tag.createMany({
            data: tagsSeed,
            skipDuplicates: true,
        });
        console.log("Successfully seeded tags table!");

        await prisma.todo.createMany({
            data: todosSeed,
            skipDuplicates: true,
        });
        console.log("Successfully seeded todos table!");
        console.log("\nDUMMY SEED COMPLETE BROK");
    } catch (err) {
        console.error("SEEDING ERROR:", err);
    } finally {
        await prisma.$disconnect();
    }
})();
