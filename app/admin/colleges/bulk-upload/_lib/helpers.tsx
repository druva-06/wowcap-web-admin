import React from "react";
import { CheckCircle2, XCircle, Loader2, Clock } from "lucide-react";
import type { UploadJob } from "./types";

// ─── Formatting Helpers ─────────────────────────────────────────────────────

export function formatBytes(bytes: number): string {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}

export function formatDuration(start: Date, end: Date | null): string {
    const ms = (end || new Date()).getTime() - start.getTime();
    const totalSec = Math.floor(ms / 1000);
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    if (h > 0) return `${h}h ${m}m ${s}s`;
    if (m > 0) return `${m}m ${s}s`;
    return `${s}s`;
}

// ─── Status Helpers ─────────────────────────────────────────────────────────

export function statusColor(status: UploadJob["status"]): string {
    switch (status) {
        case "COMPLETED":
            return "bg-emerald-100 text-emerald-700 border-emerald-200";
        case "FAILED":
            return "bg-red-100 text-red-700 border-red-200";
        case "IN_PROGRESS":
            return "bg-blue-100 text-blue-700 border-blue-200";
        case "PENDING":
            return "bg-amber-100 text-amber-700 border-amber-200";
        default:
            return "bg-gray-100 text-gray-700";
    }
}

export function statusIcon(status: UploadJob["status"]): React.ReactNode {
    switch (status) {
        case "COMPLETED":
            return <CheckCircle2 className="h-4 w-4" />;
        case "FAILED":
            return <XCircle className="h-4 w-4" />;
        case "IN_PROGRESS":
            return <Loader2 className="h-4 w-4 animate-spin" />;
        case "PENDING":
            return <Clock className="h-4 w-4" />;
    }
}
