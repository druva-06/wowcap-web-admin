"use client";

import React from "react";
import { Upload, Loader2, ArrowUpFromLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface UploadDropzoneProps {
    isDragging: boolean;
    isUploading: boolean;
    fileInputRef: React.RefObject<HTMLInputElement>;
    onDragOver: (e: React.DragEvent) => void;
    onDragLeave: (e: React.DragEvent) => void;
    onDrop: (e: React.DragEvent) => void;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onOpenFilePicker: () => void;
}

export function UploadDropzone({
    isDragging,
    isUploading,
    fileInputRef,
    onDragOver,
    onDragLeave,
    onDrop,
    onInputChange,
    onOpenFilePicker,
}: UploadDropzoneProps) {
    return (
        <Card className="border-2 border-dashed transition-colors duration-200">
            <CardContent className="p-0">
                <div
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}
                    onClick={onOpenFilePicker}
                    className={`
                        flex flex-col items-center justify-center py-16 px-6 cursor-pointer
                        rounded-lg transition-all duration-200
                        ${isDragging ? "bg-blue-50 border-blue-400" : "hover:bg-gray-50"}
                        ${isUploading ? "pointer-events-none opacity-60" : ""}
                    `}
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".xlsx,.xls"
                        onChange={onInputChange}
                        className="hidden"
                    />
                    <div
                        className={`
                            p-4 rounded-full mb-4 transition-colors
                            ${isDragging ? "bg-blue-100" : "bg-gray-100"}
                        `}
                    >
                        {isUploading ? (
                            <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
                        ) : (
                            <ArrowUpFromLine
                                className={`h-10 w-10 ${isDragging ? "text-blue-500" : "text-gray-400"}`}
                            />
                        )}
                    </div>
                    <p className="text-base font-medium text-gray-700">
                        {isUploading
                            ? "Uploading..."
                            : isDragging
                                ? "Drop your file here"
                                : "Drag & drop your Excel file here"}
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                        or click to browse &bull; .xlsx / .xls &bull; max 50 MB
                    </p>
                    {!isUploading && (
                        <Button
                            variant="outline"
                            size="sm"
                            className="mt-4"
                            onClick={(e) => {
                                e.stopPropagation();
                                fileInputRef.current?.click();
                            }}
                        >
                            <Upload className="h-4 w-4 mr-2" />
                            Choose File
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
