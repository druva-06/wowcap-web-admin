"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { type User, mockUsers } from "./mock-data"
import { secureStorage } from "./crypto-utils"

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string, rememberMe?: boolean) => Promise<{ success: boolean; message?: string; redirectPath: string }>
  logout: () => void
  isAdmin: boolean
  isManager: boolean
  isCounselor: boolean
  hasPermission: (permission: string) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Load user from localStorage or sessionStorage on mount
  useEffect(() => {
    // Try localStorage first (for remembered sessions)
    let savedUser = secureStorage.getItem("currentUser", localStorage)
    if (!savedUser) {
      // Try sessionStorage (for non-remembered sessions)
      savedUser = secureStorage.getItem("currentUser", sessionStorage)
    }
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error("Error parsing saved user:", error)
      }
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string, rememberMe: boolean = false): Promise<{ success: boolean; message?: string; redirectPath: string }> => {
    try {
      // Call the actual API endpoint
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (data.success && data.response) {
        const apiUser = data.response.user

        // Normalize role: Convert SUPER_ADMIN to admin
        let normalizedRole = apiUser.role
        if (apiUser.role?.toUpperCase() === 'SUPER_ADMIN') {
          normalizedRole = 'admin'
        }

        // Transform API response to our User format
        const user: User = {
          id: apiUser.user_id || apiUser.id,
          name: `${apiUser.first_name || ''} ${apiUser.last_name || ''}`.trim() || apiUser.username,
          email: apiUser.email,
          role: normalizedRole,
          phone: apiUser.phone_number,
          first_name: apiUser.first_name,
          last_name: apiUser.last_name,
          username: apiUser.username,
          phone_number: apiUser.phone_number,
          user_id: apiUser.user_id,
        }

        // Choose storage based on rememberMe flag
        const storage = rememberMe ? localStorage : sessionStorage

        // Store tokens and user data with encryption
        secureStorage.setItem('id_token', data.response.id_token, storage)
        secureStorage.setItem('access_token', data.response.access_token, storage)
        secureStorage.setItem('refresh_token', data.response.refresh_token, storage)
        secureStorage.setItem('currentUser', JSON.stringify(user), storage)

        setUser(user)

        // Determine redirect path based on role
        let redirectPath = '/login'
        const userRole = apiUser.role?.toUpperCase()

        // Block STUDENT role from accessing admin portals
        if (userRole === 'STUDENT') {
          return {
            success: false,
            message: 'Students cannot access this portal. Please use the student portal.',
            redirectPath: '/dashboard'
          }
        }

        switch (userRole) {
          case 'COLLEGE':
            redirectPath = '/college/dashboard'
            break
          case 'SUB_AGENT':
          case 'SUBAGENT':
            redirectPath = '/subagent/dashboard'
            break
          case 'COUNSELOR':
          case 'COUNSELLOR':
            redirectPath = '/counselor/dashboard'
            break
          case 'SUPER_ADMIN':
          case 'ADMIN':
            redirectPath = '/admin/dashboard'
            break
          case 'MANAGER':
            redirectPath = '/admin/dashboard'
            break
          default:
            // Invalid role, redirect to login
            return {
              success: false,
              message: 'Invalid user role. Please contact administrator.',
              redirectPath: '/login'
            }
        }

        return { success: true, redirectPath }
      }

      return {
        success: false,
        message: data.message || 'Invalid credentials',
        redirectPath: '/login'
      }
    } catch (error) {
      console.error('Login error:', error)
      return {
        success: false,
        message: 'Network error. Please try again.',
        redirectPath: '/login'
      }
    }
  }

  const logout = () => {
    setUser(null)
    // Clear from both localStorage and sessionStorage
    secureStorage.removeItem("currentUser", localStorage)
    secureStorage.removeItem("id_token", localStorage)
    secureStorage.removeItem("access_token", localStorage)
    secureStorage.removeItem("refresh_token", localStorage)
    secureStorage.removeItem("currentUser", sessionStorage)
    secureStorage.removeItem("id_token", sessionStorage)
    secureStorage.removeItem("access_token", sessionStorage)
    secureStorage.removeItem("refresh_token", sessionStorage)
  }

  const isAdmin = user?.role?.toLowerCase() === "admin" || user?.role?.toLowerCase() === "super_admin"
  const isManager = user?.role?.toLowerCase() === "manager"
  const isCounselor = user?.role?.toLowerCase() === "counselor"

  const hasPermission = (permission: string): boolean => {
    if (!user) return false

    // Define permissions by role (case-insensitive)
    const userRole = user.role?.toLowerCase()
    const permissions: Record<string, string[]> = {
      admin: ["*"], // Admin has all permissions
      super_admin: ["*"], // Super Admin has all permissions (same as admin)
      manager: [
        "view-leads",
        "assign-leads",
        "view-reports",
        "create-campaigns",
        "allocate-leads",
        "view-call-logs",
        "manage-team",
      ],
      counselor: ["view-leads", "call-leads", "update-lead-status", "book-appointments", "view-own-leads"],
    }

    const userPermissions = permissions[userRole || ''] || []

    // Admin has all permissions
    if (userPermissions.includes("*")) return true

    return userPermissions.includes(permission)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAdmin,
        isManager,
        isCounselor,
        hasPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
