import { Currency } from "@prisma/client";

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
] as const
