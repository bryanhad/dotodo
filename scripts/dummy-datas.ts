import { Tag, Issue, User, Module, Currency } from "@prisma/client";

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

export const dummyTags: Pick<Tag, "name" | "color">[] = [
    { name: "School", color: "#caaac0" },
    { name: "Important", color: "#67afc8" },
    { name: "Work", color: "#d26318" },
    { name: "Study", color: "#953f67" },
    { name: "Chores", color: "#5f8a7a" },
    { name: "Friends", color: "#b1d19b" },
] as const;

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

export const dummyModules: Pick<
    Module,
    "name" | "abbreviation" | "description" | "color" | "fee"
>[] = [
    {
        abbreviation: "IFT",
        name: "Internal Fund Transfer",
        description: "BRI to BRI",
        color: "#d26318",
        fee: null,
    },
    {
        abbreviation: "RTGS",
        name: "Real Time Gross Settlement",
        description:
            "Metode transfer dana elektronik untuk mengirimkan dana ke rekening tujuan dalam jumlah besar dalam waktu yang lebih cepat secara real time. (diatas Rp 100 juta).",
        color: "#d26318",
        fee: "Rp25.000 – Rp50.000",
    },
    {
        abbreviation: "SWIFT",
        name: "Society for Worldwide Interbank Financial Telecommunications",
        description:
            "Sistem transaksi yang memudahkan pertukaran informasi perbankan antar negara menggunakan Bank Identifier Codes (BIC).",
        color: "#d26318",
        fee: "Tergantung Bank. ($15-$50)",
    },
    {
        name: "Bi-Fast",
        abbreviation: null,
        description:
            "Sistem pembayaran milik Bank Indonesia untuk menciptakan transfer real time yang lebih murah, aman, dan efisien.",
        fee: "Rp 2.500",
        color: "#d26318",
    },
    {
        name: "Kliring",
        abbreviation: null,
        description: "Rransfer uang antar rekening / Lalu Lintas Giro (LLG).",
        color: "#d26318",
        fee: "Tergantung Lembaga Kliringnya.",
    },
    {
        name: "Modul Penerimaan Negara",
        abbreviation: "MPN",
        description:
            "Sistem penerimaan negara yang menggunakan surat setoran elektronik.",
        color: "#d26318",
        fee: null,
    },
] as const;

export const dummyCurrencies: Currency[] = [
    {
        code: "IDR",
        countryCode: "ID",
        countryName: "Indonesia",
        name: "Indonesian Rupiah",
    },
    {
        code: "USD",
        countryCode: "US",
        countryName: "United States",
        name: "United States Dollar",
    },
    {
        code: "JPY",
        countryCode: "JP",
        countryName: "Japan",
        name: "Japanese Yen",
    },
    {
        code: "SGD",
        countryCode: "SG",
        countryName: "Singapore",
        name: "Singapore Dollar",
    },
    {
        code: "SAR",
        countryCode: "SA",
        countryName: "Saudi Arabia",
        name: "Saudi Riyal",
    },
    {
        code: "HKD",
        countryCode: "HK",
        countryName: "Hong Kong",
        name: "Hong Kong Dollar",
    },
    {
        code: "GBP",
        countryCode: "GB",
        countryName: "United Kingdom",
        name: "British Pound Sterling",
    },
    {
        code: "CNY",
        countryCode: "CN",
        countryName: "China",
        name: "Chinese Yuan",
    },
    {
        code: "NZD",
        countryCode: "NZ",
        countryName: "New Zealand",
        name: "New Zealand Dollar",
    },
    {
        code: "SEK",
        countryCode: "SE",
        countryName: "Sweden",
        name: "Swedish Krona",
    },
    {
        code: "AED",
        countryCode: "AE",
        countryName: "United Arab Emirates",
        name: "UAE Dirham",
    },
    {
        code: "NOK",
        countryCode: "NO",
        countryName: "Norway",
        name: "Norwegian Krone",
    },
    {
        code: "EUR",
        countryCode: "EU",
        countryName: "Eurozone",
        name: "Euro",
    },
    {
        code: "CHF",
        countryCode: "CH",
        countryName: "Switzerland",
        name: "Swiss Franc",
    },
    {
        code: "CAD",
        countryCode: "CA",
        countryName: "Canada",
        name: "Canadian Dollar",
    },
    {
        code: "AUD",
        countryCode: "AU",
        countryName: "Australia",
        name: "Australian Dollar",
    },
    {
        code: "TWD",
        countryCode: "TW",
        countryName: "Taiwan",
        name: "New Taiwan Dollar",
    },
];
