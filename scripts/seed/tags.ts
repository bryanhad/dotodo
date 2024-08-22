import { Tag } from "@prisma/client";

export const dummyTags: Pick<Tag, "name" | "color">[] = [
    { name: "School", color: "#caaac0" },
    { name: "Important", color: "#67afc8" },
    { name: "Work", color: "#d26318" },
    { name: "Study", color: "#953f67" },
    { name: "Chores", color: "#5f8a7a" },
    { name: "Friends", color: "#b1d19b" },
] as const;