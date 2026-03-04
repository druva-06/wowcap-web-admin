// ─── Bulk Upload Types ───────────────────────────────────────────────────────

export interface UploadResponse {
    jobId: number;
    fileName: string;
    status: string;
}

export interface JobStatus {
    jobId: number;
    fileName: string | null;
    totalRecords: number | null;
    processedRecords: number | null;
    percentComplete: number | null;
    status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "FAILED";
    errorMessage: string | null;
    createdAt: string | null;
    updatedAt: string | null;
}

export interface UploadJob {
    id: number;
    fileName: string;
    fileSize: number;
    status: JobStatus["status"];
    progress: number;
    totalRecords: number | null;
    processedRecords: number | null;
    errorMessage: string | null;
    startedAt: Date;
    completedAt: Date | null;
}
