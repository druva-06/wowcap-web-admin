"use client"

import React from "react"
import { usePermissions } from "@/lib/permissions-context"

interface PermissionGateProps {
    permission: string | string[]
    children: React.ReactNode
    fallback?: React.ReactNode
    requireAll?: boolean
}

/**
 * Conditional rendering based on user permissions
 * 
 * @example
 * <PermissionGate permission="APPLICATION_APPROVE">
 *   <Button>Accept</Button>
 * </PermissionGate>
 * 
 * @example Multiple permissions (OR logic by default)
 * <PermissionGate permission={["LEAD_CREATE", "LEAD_EDIT"]}>
 *   <Button>Create/Edit Lead</Button>
 * </PermissionGate>
 * 
 * @example Multiple permissions (AND logic)
 * <PermissionGate permission={["LEAD_CREATE", "LEAD_ASSIGN"]} requireAll={true}>
 *   <Button>Create and Assign Lead</Button>
 * </PermissionGate>
 */
export function PermissionGate({
    permission,
    children,
    fallback = null,
    requireAll = false,
}: PermissionGateProps) {
    const { hasPermission, hasAnyPermission, hasAllPermissions, loading } = usePermissions()

    // Show nothing while loading permissions
    if (loading) {
        return <>{fallback}</>
    }

    // Handle single permission
    if (typeof permission === "string") {
        return hasPermission(permission) ? <>{children}</> : <>{fallback}</>
    }

    // Handle multiple permissions
    if (Array.isArray(permission)) {
        const hasAccess = requireAll
            ? hasAllPermissions(permission)
            : hasAnyPermission(permission)

        return hasAccess ? <>{children}</> : <>{fallback}</>
    }

    return <>{fallback}</>
}
