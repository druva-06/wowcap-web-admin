"use client";

import React from "react";
import { Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function InstructionsCard() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                    <Info className="h-5 w-5 text-blue-500" />
                    How It Works
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid sm:grid-cols-3 gap-6">
                    <div className="flex gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-bold">
                            1
                        </div>
                        <div>
                            <p className="font-medium text-sm text-gray-800">
                                Upload Excel
                            </p>
                            <p className="text-xs text-gray-500 mt-0.5">
                                Upload a .xlsx file with sheets for Colleges,
                                Courses, and CollegeCourse mappings
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-bold">
                            2
                        </div>
                        <div>
                            <p className="font-medium text-sm text-gray-800">
                                Processing
                            </p>
                            <p className="text-xs text-gray-500 mt-0.5">
                                The server parses the file, creates/updates
                                colleges, courses, and links them together
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-bold">
                            3
                        </div>
                        <div>
                            <p className="font-medium text-sm text-gray-800">
                                Review Results
                            </p>
                            <p className="text-xs text-gray-500 mt-0.5">
                                Track progress in real-time. Re-uploading the
                                same file safely updates existing records
                                (upsert)
                            </p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
