"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { type User, mockUsers } from "./mock-data"

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isAdmin: boolean
  isManager: boolean
  isCounselor: boolean
  hasPermission: (permission: string) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login - in production, this would call an API
    const foundUser = mockUsers.find((u) => u.email === email)

    if (foundUser) {
      setUser(foundUser)
      localStorage.setItem("currentUser", JSON.stringify(foundUser))
      return true
    }

    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("currentUser")
  }

  const isAdmin = user?.role === "admin"
  const isManager = user?.role === "manager"
  const isCounselor = user?.role === "counselor"

  const hasPermission = (permission: string): boolean => {
    if (!user) return false

    // Define permissions by role
    const permissions: Record<string, string[]> = {
      admin: ["*"], // Admin has all permissions
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

    const userPermissions = permissions[user.role] || []

    // Admin has all permissions
    if (userPermissions.includes("*")) return true

    return userPermissions.includes(permission)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
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
