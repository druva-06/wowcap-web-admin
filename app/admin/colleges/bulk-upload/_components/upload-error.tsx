"use client";

import React from "react";
import { AlertTriangle, XCircle } from "lucide-react";

interface UploadErrorProps {
    message: string;
    onDismiss: () => void;
}

export function UploadError({ message, onDismiss }: UploadErrorProps) {
    return (
        <div className="flex items-start gap-3 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700">
            <AlertTriangle className="h-5 w-5 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
                <p className="font-medium text-sm">Upload Error</p>
                <p className="text-sm mt-0.5">{message}</p>
            </div>
            <button
                onClick={onDismiss}
                className="text-red-400 hover:text-red-600"
            >
                <XCircle className="h-4 w-4" />
            </button>
        </div>
    );
}
