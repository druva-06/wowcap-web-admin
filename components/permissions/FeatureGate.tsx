"use client"

import React from "react"
import { usePermissions } from "@/lib/permissions-context"
import { FEATURE_PERMISSIONS } from "@/lib/permissions-config"

interface FeatureGateProps {
    feature: keyof typeof FEATURE_PERMISSIONS
    children: React.ReactNode
    fallback?: React.ReactNode
}

/**
 * Conditional rendering based on feature permissions
 * Uses the FEATURE_PERMISSIONS mapping
 * 
 * @example
 * <FeatureGate feature="APPLICATION_REVIEW">
 *   <Button>Accept/Reject</Button>
 * </FeatureGate>
 */
export function FeatureGate({ feature, children, fallback = null }: FeatureGateProps) {
    const { hasAnyPermission, loading } = usePermissions()

    // Show nothing while loading permissions
    if (loading) {
        return <>{fallback}</>
    }

    const requiredPermissions = FEATURE_PERMISSIONS[feature]

    if (!requiredPermissions || requiredPermissions.length === 0) {
        return <>{children}</>
    }

    const hasAccess = hasAnyPermission(requiredPermissions)

    return hasAccess ? <>{children}</> : <>{fallback}</>
}
