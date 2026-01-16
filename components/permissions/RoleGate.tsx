"use client"

import React from "react"
import { useAuth } from "@/lib/auth-context"

interface RoleGateProps {
    roles: string | string[]
    children: React.ReactNode
    fallback?: React.ReactNode
}

/**
 * Conditional rendering based on user role
 * 
 * @example
 * <RoleGate roles="ADMIN">
 *   <AdminPanel />
 * </RoleGate>
 * 
 * @example Multiple roles
 * <RoleGate roles={["ADMIN", "COLLEGE"]}>
 *   <CollegeSection />
 * </RoleGate>
 */
export function RoleGate({ roles, children, fallback = null }: RoleGateProps) {
    const { user, loading } = useAuth()

    // Show nothing while loading
    if (loading) {
        return <>{fallback}</>
    }

    if (!user) {
        return <>{fallback}</>
    }

    const userRole = user.role?.toUpperCase()
    const allowedRoles = Array.isArray(roles)
        ? roles.map(r => r.toUpperCase())
        : [roles.toUpperCase()]

    const hasAccess = allowedRoles.includes(userRole || "")

    return hasAccess ? <>{children}</> : <>{fallback}</>
}
