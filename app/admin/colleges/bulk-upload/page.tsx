"use client";

import React from "react";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useBulkUpload } from "./_hooks/use-bulk-upload";
import { UploadDropzone } from "./_components/upload-dropzone";
import { UploadError } from "./_components/upload-error";
import { InstructionsCard } from "./_components/instructions-card";
import { JobCard } from "./_components/job-card";

export default function BulkUploadPage() {
    const {
        jobs,
        isUploading,
        isDragging,
        uploadError,
        fileInputRef,
        activeJobs,
        completedJobs,
        failedJobs,
        handleDragOver,
        handleDragLeave,
        handleDrop,
        handleInputChange,
        removeJob,
        clearUploadError,
        openFilePicker,
    } = useBulkUpload();

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                        Bulk Upload
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Upload Excel files to bulk import colleges, courses, and
                        college-course mappings
                    </p>
                </div>
                {jobs.length > 0 && (
                    <div className="flex items-center gap-2 text-sm">
                        {activeJobs.length > 0 && (
                            <Badge
                                variant="outline"
                                className="bg-blue-50 text-blue-700 border-blue-200 gap-1"
                            >
                                <Loader2 className="h-3 w-3 animate-spin" />
                                {activeJobs.length} active
                            </Badge>
                        )}
                        {completedJobs.length > 0 && (
                            <Badge
                                variant="outline"
                                className="bg-emerald-50 text-emerald-700 border-emerald-200 gap-1"
                            >
                                <CheckCircle2 className="h-3 w-3" />
                                {completedJobs.length} done
                            </Badge>
                        )}
                        {failedJobs.length > 0 && (
                            <Badge
                                variant="outline"
                                className="bg-red-50 text-red-700 border-red-200 gap-1"
                            >
                                <XCircle className="h-3 w-3" />
                                {failedJobs.length} failed
                            </Badge>
                        )}
                    </div>
                )}
            </div>

            {/* Upload Zone */}
            <UploadDropzone
                isDragging={isDragging}
                isUploading={isUploading}
                fileInputRef={fileInputRef}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onInputChange={handleInputChange}
                onOpenFilePicker={openFilePicker}
            />

            {/* Upload Error */}
            {uploadError && (
                <UploadError
                    message={uploadError}
                    onDismiss={clearUploadError}
                />
            )}

            {/* Instructions (shown when no jobs) */}
            {jobs.length === 0 && <InstructionsCard />}

            {/* Job List */}
            {jobs.length > 0 && (
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-gray-800">
                        Upload Jobs
                    </h2>
                    {jobs.map((job) => (
                        <JobCard
                            key={job.id}
                            job={job}
                            onRemove={removeJob}
                            onRetry={openFilePicker}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
