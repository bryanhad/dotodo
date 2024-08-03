import { Tag, Todo, User } from "@prisma/client";

export const dummyUsers: (Omit<User, "id" | "passwordHash"> & {
    password: string;
})[] = [
    {
        email: "bruh@gmail.com",
        displayName: "Bambang",
        bio: "Bruh Moment",
        password: "password",
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

export const dummyTags: Pick<Tag, "name" | "color">[] = [
    { name: "School", color: "#caaac0" },
    { name: "Important", color: "#67afc8" },
    { name: "Work", color: "#d26318" },
    { name: "Study", color: "#953f67" },
    { name: "Chores", color: "#5f8a7a" },
    { name: "Friends", color: "#b1d19b" },
] as const;

export const dummyTodos: Pick<Todo, "title" | "detail">[] = [
    {
        title: "Learn TypeScript",
        detail: "Study the basics of TypeScript.",
    },
    {
        title: "Set up Prisma",
        detail: "Install and configure Prisma in the project.",
    },
    {
        title: "Seed the database",
        detail: "Create a seed script to populate the database with dummy data.",
    },
    {
        title: "Write documentation",
        detail: "Document the project setup and usage.",
    },
    {
        title: "Create UI components",
        detail: "Build reusable UI components for the project.",
    },
    {
        title: "Implement authentication",
        detail: "Set up user authentication and authorization.",
    },
    {
        title: "Deploy the application",
        detail: "Deploy the application to a cloud provider.",
    },
    {
        title: "Fix bugs",
        detail: "Identify and fix bugs in the application.",
    },
] as const;
