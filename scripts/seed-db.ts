import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { PrismaClient } from "@prisma/client";
import { Lucia } from "lucia";
import {
    generateCutoffsSeed,
    generateIssuesSeed,
    generateModulesSeed,
    generateSeed,
    generateTagsSeed,
    generateUsersSeed,
    seedTables,
} from "./action";
import { dummyCurrencies } from "./seed/currencies";

(async () => {
    const prisma = new PrismaClient();

    const adapter = new PrismaAdapter(prisma.session, prisma.user);
    const lucia = new Lucia(adapter);

    try {
        await prisma.user.deleteMany();
        await prisma.module.deleteMany()
        await prisma.currency.deleteMany()
        
        console.log("Successfully cleared all tables\n");

        const usersSeed = await generateSeed("users", generateUsersSeed);
        const tagsSeed = await generateSeed(
            "tags",
            generateTagsSeed,
            usersSeed,
        );
        const modulesSeed = await generateSeed(
            "modules",
            generateModulesSeed,
            usersSeed,
        );
        const issuesSeed = await generateSeed(
            "issues",
            generateIssuesSeed,
            usersSeed,
            tagsSeed,
        );
        const cutoffSeed = await generateSeed(
            "cutoffs",
            generateCutoffsSeed,
            modulesSeed,
            usersSeed,
            dummyCurrencies,
        );

        console.log("🌱  BEGIN SEEDING");

        await seedTables([
            {
                tableName: "users",
                method: (data) =>
                    prisma.user.createMany({ data, skipDuplicates: true }),
                seedData: usersSeed,
            },
            {
                tableName: "sessions",
                method: async (data) =>
                    await Promise.all(
                        data.map((user) => {
                            lucia.createSession(user.id, {});
                        }),
                    ),
                seedData: usersSeed,
            },
            {
                tableName: "tags",
                method: (data) =>
                    prisma.tag.createMany({ data, skipDuplicates: true }),
                seedData: tagsSeed,
            },
            {
                tableName: "currencies",
                method: (data) =>
                    prisma.currency.createMany({ data, skipDuplicates: true }),
                seedData: dummyCurrencies,
            },
            {
                tableName: "modules",
                method: (data) =>
                    prisma.module.createMany({ data, skipDuplicates: true }),
                seedData: modulesSeed,
            },
            {
                tableName: "issues",
                method: (data) =>
                    prisma.issue.createMany({ data, skipDuplicates: true }),
                seedData: issuesSeed,
            },
            {
                tableName: "cutoffs",
                method: (data) =>
                    prisma.cutoff.createMany({ data, skipDuplicates: true }),
                seedData: cutoffSeed,
            },
        ]);

        console.log("\nDUMMY SEED COMPLETE BROK");
    } catch (err) {
        console.error("SEEDING ERROR:", err);
    } finally {
        await prisma.$disconnect();
    }
})();
