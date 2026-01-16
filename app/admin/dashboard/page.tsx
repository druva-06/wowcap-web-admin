"use client"

import { useAuth } from "@/lib/auth-context"
import { AdminDashboardView } from "@/components/dashboards/AdminDashboardView"
import { CollegeDashboardView } from "@/components/dashboards/CollegeDashboardView"
import { CounselorDashboardView } from "@/components/dashboards/CounselorDashboardView"
import { SubAgentDashboardView } from "@/components/dashboards/SubAgentDashboardView"

export default function AdminDashboard() {
  const { user } = useAuth()

  // Determine which dashboard to show based on user role
  const renderDashboard = () => {
    if (!user) {
      return <div className="p-6 text-center text-gray-600">Loading...</div>
    }

    const userRole = user.role?.toUpperCase()

    switch (userRole) {
      case "COLLEGE":
        return <CollegeDashboardView />
      case "COUNSELOR":
      case "COUNSELLOR":
        return <CounselorDashboardView />
      case "SUBAGENT":
      case "SUB_AGENT":
        return <SubAgentDashboardView />
      case "ADMIN":
      case "SUPER_ADMIN":
      default:
        return <AdminDashboardView />
    }
  }

  return (
    <div className="p-6">
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-600 mt-1">
          Welcome back, {user?.name || user?.username || "User"}
        </p>
      </div>

      {renderDashboard()}
    </div>
  )
}
