"use client";

import React from "react";
import {
    FileSpreadsheet,
    CheckCircle2,
    XCircle,
    Clock,
    Trash2,
    RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import type { UploadJob } from "../_lib/types";
import {
    formatBytes,
    formatDuration,
    statusColor,
    statusIcon,
} from "../_lib/helpers";

interface JobCardProps {
    job: UploadJob;
    onRemove: (jobId: number) => void;
    onRetry: () => void;
}

export function JobCard({ job, onRemove, onRetry }: JobCardProps) {
    return (
        <Card
            className={`transition-all duration-300 ${
                job.status === "IN_PROGRESS"
                    ? "ring-2 ring-blue-200 shadow-md"
                    : ""
            }`}
        >
            <CardContent className="p-5">
                {/* Header row */}
                <div className="flex items-start justify-between gap-4">
                    {/* Left: File info */}
                    <div className="flex items-start gap-3 min-w-0 flex-1">
                        <div
                            className={`p-2 rounded-lg flex-shrink-0 ${
                                job.status === "COMPLETED"
                                    ? "bg-emerald-100"
                                    : job.status === "FAILED"
                                        ? "bg-red-100"
                                        : "bg-blue-100"
                            }`}
                        >
                            <FileSpreadsheet
                                className={`h-5 w-5 ${
                                    job.status === "COMPLETED"
                                        ? "text-emerald-600"
                                        : job.status === "FAILED"
                                            ? "text-red-600"
                                            : "text-blue-600"
                                }`}
                            />
                        </div>
                        <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                                <p className="font-medium text-sm text-gray-900 truncate">
                                    {job.fileName}
                                </p>
                                <Badge
                                    variant="outline"
                                    className={`text-xs ${statusColor(job.status)} gap-1`}
                                >
                                    {statusIcon(job.status)}
                                    {job.status.replace("_", " ")}
                                </Badge>
                            </div>
                            <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                                <span>{formatBytes(job.fileSize)}</span>
                                <span>&bull;</span>
                                <span>Job #{job.id}</span>
                                <span>&bull;</span>
                                <span className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {formatDuration(
                                        job.startedAt,
                                        job.completedAt
                                    )}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-1">
                        {(job.status === "COMPLETED" ||
                            job.status === "FAILED") && (
                            <button
                                onClick={() => onRemove(job.id)}
                                className="p-1.5 rounded-md text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                                title="Remove from list"
                            >
                                <Trash2 className="h-4 w-4" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Progress bar */}
                {(job.status === "PENDING" ||
                    job.status === "IN_PROGRESS") && (
                    <div className="mt-4">
                        <div className="flex items-center justify-between mb-1.5">
                            <span className="text-xs font-medium text-gray-600">
                                {job.status === "PENDING"
                                    ? "Waiting to start..."
                                    : "Processing records..."}
                            </span>
                            <span className="text-xs font-semibold text-blue-600">
                                {job.progress}%
                            </span>
                        </div>
                        <Progress
                            value={job.progress}
                            className="h-2 bg-blue-100"
                        />
                        {job.processedRecords !== null &&
                            job.totalRecords !== null && (
                                <p className="text-xs text-gray-500 mt-1.5">
                                    {job.processedRecords.toLocaleString()} /{" "}
                                    {job.totalRecords.toLocaleString()} records
                                    processed
                                </p>
                            )}
                    </div>
                )}

                {/* Completed stats */}
                {job.status === "COMPLETED" && (
                    <div className="mt-4 p-3 rounded-lg bg-emerald-50 border border-emerald-100">
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                            <span className="text-sm font-medium text-emerald-700">
                                Upload completed successfully
                            </span>
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-xs text-emerald-600">
                            {job.totalRecords !== null && (
                                <span>
                                    {job.totalRecords.toLocaleString()} total
                                    records
                                </span>
                            )}
                            {job.processedRecords !== null && (
                                <span>
                                    {job.processedRecords.toLocaleString()}{" "}
                                    processed
                                </span>
                            )}
                            <span>
                                Completed in{" "}
                                {formatDuration(
                                    job.startedAt,
                                    job.completedAt
                                )}
                            </span>
                        </div>
                    </div>
                )}

                {/* Failed message */}
                {job.status === "FAILED" && (
                    <div className="mt-4 p-3 rounded-lg bg-red-50 border border-red-100">
                        <div className="flex items-start gap-2">
                            <XCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                            <div>
                                <span className="text-sm font-medium text-red-700">
                                    Upload failed
                                </span>
                                {job.errorMessage && (
                                    <p className="text-xs text-red-600 mt-1">
                                        {job.errorMessage}
                                    </p>
                                )}
                            </div>
                        </div>
                        {job.processedRecords !== null &&
                            job.totalRecords !== null && (
                                <p className="text-xs text-red-500 mt-2">
                                    Processed{" "}
                                    {job.processedRecords.toLocaleString()} of{" "}
                                    {job.totalRecords.toLocaleString()} records
                                    before failure
                                </p>
                            )}
                        <Button
                            variant="outline"
                            size="sm"
                            className="mt-2 text-red-600 border-red-200 hover:bg-red-100"
                            onClick={onRetry}
                        >
                            <RefreshCw className="h-3 w-3 mr-1" />
                            Retry Upload
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
