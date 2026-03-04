// ─── Bulk Upload Constants ───────────────────────────────────────────────────

export const API_BASE =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export const POLL_INTERVAL = 3000; // 3 seconds

export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50 MB

export const ACCEPTED_TYPES = [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-excel",
];
