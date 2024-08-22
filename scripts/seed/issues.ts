import { Issue } from "@prisma/client";

export const dummyIssues: Pick<Issue, "title" | "detail" | "solution">[] = [
    {
        title: "Login Failure",
        detail: "Users are unable to log in due to a 500 error.",
        solution: "Update the authentication service and restart the server.",
    },
    {
        title: "Broken Link on Homepage",
        detail: "A link on the homepage is leading to a 404 page.",
        solution: "Update the link URL to point to the correct page.",
    },
    {
        title: "Slow Page Load",
        detail: "The dashboard page is taking too long to load.",
        solution: "Optimize the database queries and add caching.",
    },
    {
        title: "Incorrect Data in Reports",
        detail: "Reports are showing outdated information.",
        solution: "Fix the data aggregation logic and refresh the report data.",
    },
    {
        title: "Missing Images on Product Pages",
        detail: "Some product pages are missing images.",
        solution: "Re-upload the missing images and verify the file paths.",
    },
    {
        title: "API Rate Limiting",
        detail: "API requests are being rate-limited too aggressively.",
        solution: "Adjust the rate limit settings in the API gateway.",
    },
] as const;