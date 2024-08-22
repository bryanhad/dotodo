import { User } from "@prisma/client";

export const dummyUsers: (Omit<User, "id" | "passwordHash"> & {
    password: string;
})[] = [
    {
        email: "bambang@gmail.com",
        displayName: "Bambang",
        bio: "Bambang Jarwo",
        password: "bambang",
        avatarUrl: null,
    },
    {
        email: "bruh2@gmail.com",
        displayName: "Colombus",
        bio: "The Sailor Man",
        password: "password",
        avatarUrl: null,
    },
] as const;