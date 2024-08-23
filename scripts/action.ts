import {
    Currency,
    Cutoff,
    CutoffSchedules,
    Issue,
    Module,
    Tag,
    User,
} from "@prisma/client";
import { dummyUsers } from "./seed/users";
import { argonHashOptionConfig } from "../src/lib/utils";
import { hash } from "@node-rs/argon2";
import { generateIdFromEntropySize } from "lucia";
import { dummyTags } from "./seed/tags";
import {
    generateRandomDate,
    getRandomNumberInRange,
    getRandomSeedId,
} from "./lib";
import { dummyModules } from "./seed/modules";
import { dummyIssues } from "./seed/issues";

export async function seedTables(
    seedDatas: {
        tableName: string;
        seedData: any[];
        method: (data: any[]) => Promise<any>;
    }[],
) {
    for (const { method, seedData, tableName } of seedDatas) {
        console.log(`🏁 BEGIN SEEDING '${tableName.toUpperCase()}' TABLE`);
        await method(seedData);
        console.log(`✔ SUCCESS`);
    }
}

// woaw! why is there multiple function with the same names? this is called overload signatures!
// it is used if you wan to write a function that can be called in variety of argument counts and types!
// pretty neeeaat
// Overload 1: for generateSeedFn that requires no arguments
// export async function generateSeed<T>(
//     tableName: string,
//     generateSeedFn: () => Promise<T>,
// ): Promise<T>;
// // Overload 2: for generateSeedFn that requires 1 argument
// export async function generateSeed<T, P1>(
//     tableName: string,
//     generateSeedFn: (param: P1) => Promise<T>,
//     param: P1,
// ): Promise<T>;
// // Overload 3: for generateSeedFn that requires 2 argumnets
// export async function generateSeed<T, P1, P2>(
//     tableName: string,
//     generateSeedFn: (param1: P1, param2: P2) => Promise<T>,
//     param: P1,
//     param2: P2,
// ): Promise<T>;

type GenerateSeedFn<T, P extends any[]> = (...params: P) => T | Promise<T>;

// The actual implementation of the function:
export async function generateSeed<T, P extends any[]>(
    tableName: string,
    generateSeedFn: GenerateSeedFn<T, P>,
    ...params: P
): Promise<T> {
    try {
        const seedData = await generateSeedFn(...params);
        console.log(`🏁 generated '${tableName}' seed data`);
        return seedData;
    } catch (err) {
        throw new Error(`Failed to generate '${tableName}' seed`);
    }
}

export async function generateUsersSeed() {
    return Promise.all(
        dummyUsers.map(async ({ password, ...user }): Promise<User> => {
            const hashedPassword = await hash(password, argonHashOptionConfig);
            const userId = generateIdFromEntropySize(10); // 16 characters long
            return {
                ...user,
                id: userId,
                passwordHash: hashedPassword,
            };
        }),
    );
}

export async function generateTagsSeed(usersSeed: Pick<User, "id">[]) {
    return dummyTags.map((tag) => {
        const randomUserId = getRandomSeedId(usersSeed);
        const tagId = generateIdFromEntropySize(10); // 16 characters long

        return {
            ...tag,
            id: tagId,
            authorId: randomUserId,
        };
    });
}

export function generateModulesSeed(usersSeed: Pick<User, "id">[]) {
    return dummyModules.map((module) => {
        const randomUserId = getRandomSeedId(usersSeed);
        const moduleId = generateIdFromEntropySize(10); // 16 characters long

        return {
            ...module,
            id: moduleId,
            authorId: randomUserId,
        };
    });
}

export function generateIssuesSeed(
    usersSeed: Pick<User, "id">[],
    tagsSeed: Pick<Tag, "id">[],
    modulesSeed: Pick<Tag, "id">[],
): Omit<Issue, 'lastUpdatedAt'>[] {
    return dummyIssues.map((issue) => {
        const issueId = generateIdFromEntropySize(10); // 16 characters long
        const randomDate = generateRandomDate();

        const randomUserId = getRandomSeedId(usersSeed);
        const randomTagId = getRandomSeedId(tagsSeed);
        const randomModuleId = getRandomSeedId(modulesSeed);

        const isSolved = getRandomNumberInRange(1, 10) % 2 === 0;
        const randomOccurenceCount = getRandomNumberInRange(0, 35);

        return {
            ...issue,
            id: issueId,
            createdAt: randomDate,
            authorId: randomUserId,
            occurenceCount: randomOccurenceCount,
            tagId: randomTagId,
            moduleId: randomModuleId,
            isSolved,
        };
    });
}

export function generateCutoffsSeed(
    modulesSeed: Pick<Module, "id">[],
    usersSeed: Pick<User, "id">[],
    currencySeed: Pick<Currency, "code">[],
): Cutoff[] {
    const moduleCutoffs: Cutoff[] = [];
    const cutoffDescriptions = ["Daily cutoff", "Weekly cutoff"];

    for (const moduleItem of modulesSeed) {
        const currencyCount = getRandomNumberInRange(1, currencySeed.length);
        const moduleCurrencies = currencySeed.slice(0, currencyCount);

        for (const currency of moduleCurrencies) {
            const cutoffId = generateIdFromEntropySize(10); // 16 characters long

            const randomUserId = getRandomSeedId(usersSeed);
            let cutoffDesc: null | string = null;
            let editorId: null | string = null;

            // 2/3 chance of the cutoff having a description
            const hasDescription = getRandomNumberInRange(1, 9) <= 6;
            const hasAnEditor = getRandomNumberInRange(1, 2) < 2;
            if (hasDescription) {
                // get random cutoff description
                cutoffDesc =
                    cutoffDescriptions[
                        getRandomNumberInRange(0, cutoffDescriptions.length - 1)
                    ];
            }
            if (hasAnEditor) {
                const randomEditorId = getRandomSeedId(usersSeed);
                editorId = randomEditorId;
            }

            moduleCutoffs.push({
                authorId: randomUserId,
                currencyCode: currency.code,
                description: cutoffDesc,
                editorId,
                id: cutoffId,
                moduleId: moduleItem.id,
            });
        }
    }
    return moduleCutoffs;
}

export function generateCutoffSchedulesSeed(
    cutoffsSeed: Pick<Cutoff, "id">[],
): CutoffSchedules[] {
    const cutoffSchedules: CutoffSchedules[] = [];

    cutoffsSeed.map((cutoff) => {
        const availableDays = [1, 2, 3, 4, 5, 6, 7];
        const randomDayCount = getRandomNumberInRange(1, 7);
        const cutoffScheduleDays: number[] = [];

        for (let i = 0; i < randomDayCount; i++) {
            const randomIndex = getRandomNumberInRange(
                0,
                availableDays.length - 1,
            );
            // splice returns an array of the deleted element.
            const randomDay = availableDays.splice(randomIndex, 1)[0];
            cutoffScheduleDays.push(randomDay);
        }

        for (const day of cutoffScheduleDays) {
            const cutoffScheduleId = generateIdFromEntropySize(10);
            const randomStartTime = getRandomNumberInRange(0, 4);
            const randomEndTime = getRandomNumberInRange(
                randomStartTime,
                12,
            ).toString();

            const formattedEndTime =
                randomEndTime.length > 1 ? randomEndTime : "0" + randomEndTime;

            cutoffSchedules.push({
                cutoffId: cutoff.id,
                day,
                startTime: `0${randomStartTime}:00`,
                endTime: `${formattedEndTime}:00`,
                id: cutoffScheduleId,
            });
        }
    });

    return cutoffSchedules;
}
