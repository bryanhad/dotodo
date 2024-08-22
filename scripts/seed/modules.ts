import { Module } from "@prisma/client";

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