"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { getUserPermissions, type UserPermissionsResponseDto } from "./api/permissions"
import { useAuth } from "./auth-context"

interface PermissionsContextType {
    permissions: Set<string>
    loading: boolean
    error: string | null
    hasPermission: (permission: string) => boolean
    hasAnyPermission: (permissions: string[]) => boolean
    hasAllPermissions: (permissions: string[]) => boolean
    refreshPermissions: () => Promise<void>
    userPermissionsData: UserPermissionsResponseDto | null
}

const PermissionsContext = createContext<PermissionsContextType | undefined>(undefined)

export function PermissionsProvider({ children }: { children: React.ReactNode }) {
    const { user } = useAuth()
    const [permissions, setPermissions] = useState<Set<string>>(new Set())
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [userPermissionsData, setUserPermissionsData] = useState<UserPermissionsResponseDto | null>(null)

    const loadPermissions = async () => {
        if (!user?.user_id) {
            setPermissions(new Set())
            setLoading(false)
            return
        }

        try {
            setLoading(true)
            setError(null)

            const data = await getUserPermissions(user.user_id)

            // Extract all permission names into a Set for fast lookup
            const permissionNames = new Set<string>()
            data.allPermissions.forEach(p => permissionNames.add(p.name))

            setPermissions(permissionNames)
            setUserPermissionsData(data)
        } catch (err) {
            console.error("Failed to load permissions:", err)
            setError(err instanceof Error ? err.message : "Failed to load permissions")
            setPermissions(new Set())
        } finally {
            setLoading(false)
        }
    }

    // Load permissions when user changes
    useEffect(() => {
        loadPermissions()
    }, [user?.user_id])

    const hasPermission = (permission: string): boolean => {
        // Admins have all permissions
        if (user?.role?.toUpperCase() === "ADMIN" || user?.role?.toUpperCase() === "SUPER_ADMIN") {
            return true
        }
        return permissions.has(permission)
    }

    const hasAnyPermission = (requiredPermissions: string[]): boolean => {
        // Admins have all permissions
        if (user?.role?.toUpperCase() === "ADMIN" || user?.role?.toUpperCase() === "SUPER_ADMIN") {
            return true
        }
        return requiredPermissions.some(p => permissions.has(p))
    }

    const hasAllPermissions = (requiredPermissions: string[]): boolean => {
        // Admins have all permissions
        if (user?.role?.toUpperCase() === "ADMIN" || user?.role?.toUpperCase() === "SUPER_ADMIN") {
            return true
        }
        return requiredPermissions.every(p => permissions.has(p))
    }

    const refreshPermissions = async () => {
        await loadPermissions()
    }

    return (
        <PermissionsContext.Provider
            value={{
                permissions,
                loading,
                error,
                hasPermission,
                hasAnyPermission,
                hasAllPermissions,
                refreshPermissions,
                userPermissionsData,
            }}
        >
            {children}
        </PermissionsContext.Provider>
    )
}

export function usePermissions() {
    const context = useContext(PermissionsContext)
    if (context === undefined) {
        throw new Error("usePermissions must be used within a PermissionsProvider")
    }
    return context
}
