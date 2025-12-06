"use client"

import { ShieldX, Home, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface UnauthorizedAccessProps {
    message?: string
    allowedRoles?: string[]
    userRole?: string
}

export function UnauthorizedAccess({
    message = "Access Denied",
    allowedRoles = [],
    userRole
}: UnauthorizedAccessProps) {
    const router = useRouter()

    // Check if user is a student trying to access admin/college/subagent portals
    const isStudentAccess = userRole?.toUpperCase() === "STUDENT"

    const getRoleDashboard = (role: string) => {
        switch (role?.toUpperCase()) {
            case "COLLEGE":
                return "/college/dashboard"
            case "SUB_AGENT":
            case "SUBAGENT":
                return "/subagent/dashboard"
            case "COUNSELOR":
            case "COUNSELLOR":
                return "/counselor/dashboard"
            case "ADMIN":
            case "MANAGER":
            case "SUPER_ADMIN":
                return "/admin/dashboard"
            case "STUDENT":
                return "/dashboard" // Student dashboard
            default:
                return "/login"
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full text-center">
                <div className="mb-8">
                    <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                        <ShieldX className="w-12 h-12 text-red-600" />
                    </div>
                    <h1 className="text-6xl font-bold text-gray-900 mb-2">403</h1>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                        {isStudentAccess ? "Student Portal Access Restricted" : message}
                    </h2>
                    <p className="text-gray-600 mb-2">
                        {isStudentAccess
                            ? "This portal is for administrators, colleges, and sub-agents only. Students have a separate portal."
                            : "You don't have permission to access this page."
                        }
                    </p>
                    {!isStudentAccess && allowedRoles.length > 0 && (
                        <p className="text-sm text-gray-500 mb-6">
                            This page is only accessible to: {allowedRoles.join(", ")}
                        </p>
                    )}
                    {userRole && (
                        <p className="text-sm text-gray-500">
                            Your current role: <span className="font-semibold text-gray-700 capitalize">{userRole}</span>
                        </p>
                    )}
                </div>

                <div className="space-y-3">
                    {userRole && (
                        <Button
                            onClick={() => router.push(getRoleDashboard(userRole))}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            <Home className="w-4 h-4 mr-2" />
                            {isStudentAccess ? "Go to Student Portal" : "Go to My Dashboard"}
                        </Button>
                    )}
                    <Button
                        onClick={() => router.back()}
                        variant="outline"
                        className="w-full"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Go Back
                    </Button>
                    <Link href="/login" className="block">
                        <Button variant="ghost" className="w-full">
                            Logout & Sign In Again
                        </Button>
                    </Link>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-200">
                    <p className="text-xs text-gray-500">
                        {isStudentAccess
                            ? "Students should access their portal through the student dashboard."
                            : "If you believe this is an error, please contact your administrator."
                        }
                    </p>
                </div>
            </div>
        </div>
    )
}
