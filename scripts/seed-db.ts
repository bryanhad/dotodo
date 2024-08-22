import { hash } from "@node-rs/argon2";
import { Module, PrismaClient, Tag, User } from "@prisma/client";
import { generateIdFromEntropySize } from "lucia";
import { argonHashOptionConfig } from "../src/lib/utils";
import {
    dummyTags,
    dummyIssues,
    dummyUsers,
    dummyModules,
    dummyCurrencies,
} from "./dummy-datas";
import { generateRandomDate, getRandomNumberInRange } from "./lib";

import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { Lucia } from "lucia";

(async () => {
    const prisma = new PrismaClient();

    const adapter = new PrismaAdapter(prisma.session, prisma.user);
    const lucia = new Lucia(adapter);

    try {
        await prisma.user.deleteMany();
        console.log("Successfully cleared all tables\n");

        const usersSeed = await Promise.all(
            dummyUsers.map(async ({ password, ...user }): Promise<User> => {
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
        console.log("Successfully generated users seed data");

        const tagsSeed = await Promise.all(
            dummyTags.map(async (tag): Promise<Omit<Tag, "createdAt">> => {
                const randomUserIndex = getRandomNumberInRange(
                    0,
                    usersSeed.length - 1,
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
        console.log("Successfully generated tags seed data");

        // const currenciesSeed = await Promise.all(
        //     dummyCurrencies.map(async (currency): Promise<Omit<Currency, "createdAt">> => {
        //         const randomUserIndex = getRandomNumberInRange(
        //             0,
        //             usersSeed.length - 1,
        //         );
        //         const randomUserId = usersSeed[randomUserIndex].id;
        //         const currencyId = generateIdFromEntropySize(10); // 16 characters long

        //         return {
        //             ...currency,
        //             id: currencyId,
        //             authorId: randomUserId,
        //         };
        //     }),
        // );
        // console.log("Successfully generated currencys seed data");

        const modulesSeed = await Promise.all(
            dummyModules.map(
                async (
                    module,
                ): Promise<
                    Omit<Module, "editorId" | "createdAt" | "lastUpdatedAt">
                > => {
                    const randomUserIndex = getRandomNumberInRange(
                        0,
                        usersSeed.length - 1,
                    );
                    const randomUserId = usersSeed[randomUserIndex].id;
                    const moduleId = generateIdFromEntropySize(10); // 16 characters long

                    return {
                        ...module,
                        id: moduleId,
                        authorId: randomUserId,
                    };
                },
            ),
        );
        console.log("Successfully generated modules seed data");

        const issuesSeed = dummyIssues.map((issue) => {
            const issueId = generateIdFromEntropySize(10); // 16 characters long
            const randomDate = generateRandomDate();
            const randomUserIndex = getRandomNumberInRange(
                0,
                usersSeed.length - 1,
            );
            const randomUserId = usersSeed[randomUserIndex].id;
            const randomTagIndex = getRandomNumberInRange(
                0,
                tagsSeed.length - 1,
            );
            const randomTagId = tagsSeed[randomTagIndex].id;
            const isSolved = getRandomNumberInRange(1, 10) % 2 === 0;
            const randomOccurenceCount = getRandomNumberInRange(0, 35);

            return {
                ...issue,
                id: issueId,
                createdAt: randomDate,
                authorId: randomUserId,
                occurenceCount: randomOccurenceCount,
                tagId: randomTagId,
                isSolved,
            };
        });
        console.log("Successfully generated issues seed data");

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

        await prisma.currency.createMany({
            data: dummyCurrencies,
            skipDuplicates: true,
        });
        console.log("Successfully seeded tags table!");

        await prisma.module.createMany({
            data: modulesSeed,
            skipDuplicates: true,
        });
        console.log("Successfully seeded modules table!");

        await prisma.issue.createMany({
            data: issuesSeed,
            skipDuplicates: true,
        });
        console.log("Successfully seeded issues table!");
        console.log("\nDUMMY SEED COMPLETE BROK");
    } catch (err) {
        console.error("SEEDING ERROR:", err);
    } finally {
        await prisma.$disconnect();
    }
})();
