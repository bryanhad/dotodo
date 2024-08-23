import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { PrismaClient } from "@prisma/client";
import { Lucia } from "lucia";
import {
    generateCutoffSchedulesSeed,
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
        await prisma.module.deleteMany();
        await prisma.currency.deleteMany();

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
            modulesSeed
        );
        const cutoffSeed = await generateSeed(
            "cutoffs",
            generateCutoffsSeed,
            modulesSeed,
            usersSeed,
            dummyCurrencies,
        );
        const cutoffSchedulesSeed = await generateSeed(
            "cutoffs",
            generateCutoffSchedulesSeed,
            cutoffSeed,
        );

        console.log("🌱  BEGIN SEEDING");

        await seedTables([
            {
                tableName: "users",
                seedData: usersSeed,
                method: (data) =>
                    prisma.user.createMany({ data, skipDuplicates: true }),
            },
            {
                tableName: "sessions",
                seedData: usersSeed,
                method: async (data) =>
                    await Promise.all(
                        data.map((user) => {
                            lucia.createSession(user.id, {});
                        }),
                    ),
            },
            {
                tableName: "tags",
                seedData: tagsSeed,
                method: (data) =>
                    prisma.tag.createMany({ data, skipDuplicates: true }),
            },
            {
                tableName: "currencies",
                seedData: dummyCurrencies,
                method: (data) =>
                    prisma.currency.createMany({ data, skipDuplicates: true }),
            },
            {
                tableName: "modules",
                seedData: modulesSeed,
                method: (data) =>
                    prisma.module.createMany({ data, skipDuplicates: true }),
            },
            {
                tableName: "issues",
                seedData: issuesSeed,
                method: (data) =>
                    prisma.issue.createMany({ data, skipDuplicates: true }),
            },
            {
                tableName: "cutoffs",
                seedData: cutoffSeed,
                method: (data) =>
                    prisma.cutoff.createMany({ data, skipDuplicates: true }),
            },
            {
                tableName: "cutoff_schedules",
                seedData: cutoffSchedulesSeed,
                method: (data) =>
                    prisma.cutoffSchedules.createMany({
                        data,
                        skipDuplicates: true,
                    }),
            },
        ]);

        console.log("\nDUMMY SEED COMPLETE BROK");
    } catch (err) {
        console.error("SEEDING ERROR:", err);
    } finally {
        await prisma.$disconnect();
    }
})();
