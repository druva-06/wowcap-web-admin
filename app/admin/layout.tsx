"use client"

import type React from "react"

import { useState, useEffect, Suspense } from "react"
import { useAuth } from "@/lib/auth-context"
import { UnauthorizedAccess } from "@/components/unauthorized-access"
import { Button } from "@/components/ui/button"
import { Home, Users, GraduationCap, FileText, Building2, Megaphone, DollarSign, UserCog, Laptop, BarChart3, Settings, Menu, X, ChevronRight, LogOut, Search, UserCheck, ChevronDown, Phone, MessageSquare } from 'lucide-react'
import Link from "next/link"
import { usePathname, useRouter } from 'next/navigation'
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { NotificationCenter } from "@/components/notification-center"

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [partnersExpanded, setPartnersExpanded] = useState(false)
  const [collegesExpanded, setCollegesExpanded] = useState(false)
  const [marketingExpanded, setMarketingExpanded] = useState(false)
  const [financeExpanded, setFinanceExpanded] = useState(false)
  const [hrExpanded, setHrExpanded] = useState(false)
  const [communityExpanded, setCommunityExpanded] = useState(false)
  const [hasUnauthorizedAccess, setHasUnauthorizedAccess] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const { user, loading: authLoading, logout, isAdmin, isManager, isCounselor } = useAuth()

  const isLoginPage = pathname === "/admin/login"

  useEffect(() => {
    if (isLoginPage) return

    // Wait for auth to finish loading
    if (authLoading) return

    if (!user) {
      router.push("/admin/login")
      return
    }

    // Check if user has admin access (admin, manager, counselor, or SUPER_ADMIN)
    const allowedRoles = ["admin", "manager", "counselor", "SUPER_ADMIN"]
    if (!allowedRoles.includes(user.role)) {
      setHasUnauthorizedAccess(true)
    } else {
      setHasUnauthorizedAccess(false)
    }
  }, [router, isLoginPage, user, authLoading])

  useEffect(() => {
    if (pathname.startsWith("/admin/partners")) {
      setPartnersExpanded(true)
    }
    if (pathname.startsWith("/admin/colleges")) {
      setCollegesExpanded(true)
    }
    if (pathname.startsWith("/admin/marketing")) {
      setMarketingExpanded(true)
    }
    if (pathname.startsWith("/admin/finance")) {
      setFinanceExpanded(true)
    }
    if (pathname.startsWith("/admin/hr")) {
      setHrExpanded(true)
    }
    if (pathname.startsWith("/admin/community")) {
      setCommunityExpanded(true)
    }
  }, [pathname])

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: Home, href: "/admin/dashboard" },
    { id: "leads", label: "Leads", icon: Users, href: "/admin/leads" },
    { id: "ai-calling", label: "AI Calling", icon: Phone, href: "/admin/ai-calling" },
    { id: "students", label: "Students", icon: GraduationCap, href: "/admin/students" },
    { id: "applications", label: "Applications", icon: FileText, href: "/admin/applications" },
    { id: "community", label: "Community", icon: MessageSquare, href: "/admin/community" },
    {
      id: "colleges",
      label: "Colleges",
      icon: Building2,
      href: "/admin/colleges",
      hasSubmenu: true,
      submenu: [
        { id: "all-colleges", label: "All Colleges", href: "/admin/colleges" },
        { id: "partner-colleges", label: "Partner Colleges", href: "/admin/colleges/partners" },
        { id: "partnership-performance", label: "Partnership Performance", href: "/admin/colleges/performance" },
        { id: "commission-structure", label: "Commission Structure", href: "/admin/colleges/commission" },
        { id: "course-catalog", label: "Course Catalog", href: "/admin/colleges/courses" },
        { id: "intake-calendar", label: "Intake Calendar", href: "/admin/colleges/intakes" },
        { id: "college-accounts", label: "College Accounts", href: "/admin/colleges/accounts" },
      ],
    },
    {
      id: "partners",
      label: "Partners",
      icon: UserCheck,
      href: "/admin/partners",
      hasSubmenu: true,
      submenu: [
        { id: "partners-overview", label: "Overview", href: "/admin/partners" },
        { id: "college-partners", label: "College Partners", href: "/admin/partners/colleges" },
        { id: "subagent-partners", label: "Sub-Agent Partners", href: "/admin/partners/subagents" },
      ],
    },
    {
      id: "marketing",
      label: "Marketing",
      icon: Megaphone,
      href: "/admin/marketing",
      hasSubmenu: true,
      submenu: [
        { id: "marketing-overview", label: "Overview", href: "/admin/marketing" },
        { id: "offline-marketing", label: "Offline Marketing", href: "/admin/marketing/offline" },
        { id: "webinars", label: "Webinars", href: "/admin/marketing/webinars" },
        { id: "social-media", label: "Social Media", href: "/admin/marketing/social" },
        { id: "digital-campaigns", label: "Digital Campaigns", href: "/admin/marketing/digital" },
        { id: "content-marketing", label: "Content Marketing", href: "/admin/marketing/content" },
        { id: "partner-marketing", label: "Partner Marketing", href: "/admin/marketing/partner" },
      ],
    },
    {
      id: "finance",
      label: "Finance",
      icon: DollarSign,
      href: "/admin/finance",
      hasSubmenu: true,
      submenu: [
        { id: "finance-overview", label: "Overview", href: "/admin/finance" },
        { id: "invoices", label: "Invoice Generation", href: "/admin/finance/invoices" },
        { id: "expenses", label: "Expense Management", href: "/admin/finance/expenses" },
      ],
    },
    {
      id: "hr",
      label: "HR",
      icon: UserCog,
      href: "/admin/hr",
      hasSubmenu: true,
      submenu: [
        { id: "hr-overview", label: "Overview", href: "/admin/hr" },
        { id: "leave-management", label: "Leave Management", href: "/admin/hr/leave" },
        { id: "attendance", label: "Attendance", href: "/admin/hr/attendance" },
        { id: "training", label: "Training Records", href: "/admin/hr/training" },
      ],
    },
    { id: "assets", label: "Assets", icon: Laptop, href: "/admin/assets" },
    { id: "reports", label: "Reports", icon: BarChart3, href: "/admin/reports" },
    { id: "settings", label: "Settings", icon: Settings, href: "/admin/settings" },
  ]

  const handleLogout = () => {
    logout()
    router.push("/admin/login")
  }

  if (isLoginPage) {
    return <>{children}</>
  }

  // Show loading while authentication is being checked
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  // Show unauthorized access page if user doesn't have admin role
  if (hasUnauthorizedAccess) {
    return (
      <UnauthorizedAccess
        message="Admin Access Required"
        allowedRoles={["Admin", "Manager", "Counselor"]}
        userRole={user.role}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <div
        className={`fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-blue-600 via-blue-700 to-blue-800 text-white transform transition-transform duration-300 ease-in-out z-50 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 shadow-2xl`}
      >
        <div className="flex items-center justify-between p-6 border-b border-blue-500/30">
          <Link href="/admin/dashboard" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <span className="text-2xl">🎓</span>
            </div>
            <div>
              <h1 className="text-xl font-bold">WowCap</h1>
              <p className="text-blue-100 text-xs">Admin Portal</p>
            </div>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white hover:bg-blue-500/20"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <nav className="flex-1 px-4 py-6 overflow-y-auto h-[calc(100vh-16rem)]">
          <ul className="space-y-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href || (item.hasSubmenu && pathname.startsWith(item.href))

              if (item.hasSubmenu) {
                const isExpanded =
                  item.id === "partners"
                    ? partnersExpanded
                    : item.id === "colleges"
                      ? collegesExpanded
                      : item.id === "marketing"
                        ? marketingExpanded
                        : item.id === "finance"
                          ? financeExpanded
                          : item.id === "hr"
                            ? hrExpanded
                            : item.id === "community"
                              ? communityExpanded
                              : false

                const toggleExpanded =
                  item.id === "partners"
                    ? () => setPartnersExpanded(!partnersExpanded)
                    : item.id === "colleges"
                      ? () => setCollegesExpanded(!collegesExpanded)
                      : item.id === "marketing"
                        ? () => setMarketingExpanded(!marketingExpanded)
                        : item.id === "finance"
                          ? () => setFinanceExpanded(!financeExpanded)
                          : item.id === "hr"
                            ? () => setHrExpanded(!hrExpanded)
                            : item.id === "community"
                              ? () => setCommunityExpanded(!communityExpanded)
                              : () => { }

                return (
                  <li key={item.id}>
                    <button
                      onClick={toggleExpanded}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all ${isActive
                        ? "bg-white text-blue-600 shadow-lg font-semibold"
                        : "text-blue-100 hover:bg-blue-500/20 hover:text-white"
                        }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className={`w-5 h-5 ${isActive ? "text-blue-600" : "text-blue-200"}`} />
                        <span className="font-medium">{item.label}</span>
                      </div>
                      <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                    </button>
                    {isExpanded && (
                      <ul className="mt-1 ml-4 space-y-1">
                        {item.submenu?.map((subItem) => {
                          const isSubActive = pathname === subItem.href
                          return (
                            <li key={subItem.id}>
                              <Link
                                href={subItem.href}
                                onClick={() => setSidebarOpen(false)}
                                className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-all text-sm ${isSubActive
                                  ? "bg-blue-500/30 text-white font-medium"
                                  : "text-blue-100 hover:bg-blue-500/20 hover:text-white"
                                  }`}
                              >
                                <span>{subItem.label}</span>
                              </Link>
                            </li>
                          )
                        })}
                      </ul>
                    )}
                  </li>
                )
              }

              return (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${isActive
                      ? "bg-white text-blue-600 shadow-lg font-semibold"
                      : "text-blue-100 hover:bg-blue-500/20 hover:text-white"
                      }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? "text-blue-600" : "text-blue-200"}`} />
                    <span className="font-medium">{item.label}</span>
                    {isActive && <ChevronRight className="w-4 h-4 ml-auto text-blue-600" />}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-blue-500/30">
          <Button
            variant="ghost"
            className="w-full justify-start text-blue-100 hover:bg-blue-500/20 hover:text-white"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </Button>
        </div>
      </div>

      <div className="lg:ml-64">
        <header className="bg-white shadow-sm border-b border-gray-200 fixed top-0 left-0 right-0 lg:left-64 z-30">
          <div className="px-4 md:px-6 py-3 md:py-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2"
                  aria-label="Open menu"
                >
                  <Menu className="w-5 h-5" />
                </Button>
              </div>

              <div className="flex-1 max-w-2xl">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search leads, students, applications..."
                    className="pl-10 bg-gray-50 border-gray-200 w-full"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <NotificationCenter />

                <Suspense fallback={<div className="w-10 h-10" />}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="flex items-center gap-2 p-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-semibold">{user?.name?.charAt(0) || "A"}</span>
                        </div>
                        <div className="hidden md:block text-left">
                          <p className="text-sm font-medium text-gray-900">{user?.name || "Admin"}</p>
                          <p className="text-xs text-gray-500 capitalize">{user?.role || "Admin"}</p>
                        </div>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Profile</DropdownMenuItem>
                      <DropdownMenuItem>Settings</DropdownMenuItem>
                      {(isAdmin || isManager) && <DropdownMenuItem>Switch Branch</DropdownMenuItem>}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </Suspense>
              </div>
            </div>
          </div>
        </header>

        <main className="pt-16 md:pt-20">{children}</main>
      </div>
    </div>
  )
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminLayoutContent>{children}</AdminLayoutContent>
}
