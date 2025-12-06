"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { UnauthorizedAccess } from "@/components/unauthorized-access"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  FileText,
  DollarSign,
  TrendingUp,
  UserPlus,
  Award,
  Target,
  CheckCircle,
  Clock,
  AlertCircle,
  LogOut,
  Bell,
} from "lucide-react"
import Link from "next/link"

export default function SubAgentDashboard() {
  const router = useRouter()
  const { user, loading: authLoading, logout } = useAuth()
  const [hasUnauthorizedAccess, setHasUnauthorizedAccess] = useState(false)

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  useEffect(() => {
    // Wait for auth to finish loading
    if (authLoading) return

    // Check authentication
    if (!user) {
      router.push("/login")
      return
    }

    // Check if user has SUBAGENT role
    if (user.role !== "SUBAGENT") {
      setHasUnauthorizedAccess(true)
      return
    }

    setHasUnauthorizedAccess(false)
  }, [router, user, authLoading])

  // Show loading while authentication is being checked
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  // Show unauthorized access page if user doesn't have subagent role
  if (hasUnauthorizedAccess) {
    return (
      <UnauthorizedAccess
        message="Sub-Agent Access Required"
        allowedRoles={["Sub-Agent"]}
        userRole={user.role}
      />
    )
  }

  const stats = [
    {
      title: "Total Students",
      value: "156",
      change: "+12%",
      icon: Users,
      color: "blue",
    },
    {
      title: "Applications",
      value: "89",
      change: "+8%",
      icon: FileText,
      color: "green",
    },
    {
      title: "Commission Earned",
      value: "₹8.5L",
      change: "+23%",
      icon: DollarSign,
      color: "purple",
    },
    {
      title: "Success Rate",
      value: "78%",
      change: "+5%",
      icon: Award,
      color: "orange",
    },
  ]

  const recentStudents = [
    {
      id: "1",
      name: "Amit Kumar",
      email: "amit.k@email.com",
      status: "Application Submitted",
      university: "University of Toronto",
      date: "2024-01-15",
    },
    {
      id: "2",
      name: "Priya Sharma",
      email: "priya.s@email.com",
      status: "Offer Received",
      university: "University of Melbourne",
      date: "2024-01-14",
    },
    {
      id: "3",
      name: "Rahul Patel",
      email: "rahul.p@email.com",
      status: "Documents Pending",
      university: "University of Manchester",
      date: "2024-01-13",
    },
  ]

  const commissionBreakdown = [
    { month: "Jan", amount: 85000, students: 12 },
    { month: "Feb", amount: 92000, students: 15 },
    { month: "Mar", amount: 78000, students: 10 },
    { month: "Apr", amount: 105000, students: 18 },
  ]

  const getStatusColor = (status: string) => {
    if (status.includes("Offer")) return "bg-green-100 text-green-700"
    if (status.includes("Pending")) return "bg-yellow-100 text-yellow-700"
    if (status.includes("Submitted")) return "bg-blue-100 text-blue-700"
    return "bg-gray-100 text-gray-700"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">W</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Sub-Agent Dashboard</h1>
                <p className="text-sm text-gray-600">Welcome back, {user?.name || "Agent"}!</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Bell className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600" />
              <Link href="/subagent/students">
                <Button variant="outline" size="sm">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add Student
                </Button>
              </Link>
              <div className="flex items-center space-x-3 border-l pl-4">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">{user?.name?.charAt(0) || "A"}</span>
                </div>
                <div className="text-left hidden md:block">
                  <p className="text-sm font-medium text-gray-900">{user?.name || "Agent"}</p>
                  <p className="text-xs text-gray-500 capitalize">{user?.role || "Sub-Agent"}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                        <p className="text-sm text-green-600 mt-1 flex items-center">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          {stat.change}
                        </p>
                      </div>
                      <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                        <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Performance Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Monthly Commission</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {commissionBreakdown.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">{item.month}</span>
                        <div className="text-right">
                          <span className="text-sm font-bold text-gray-900">₹{(item.amount / 1000).toFixed(1)}K</span>
                          <span className="text-xs text-gray-500 ml-2">({item.students} students)</span>
                        </div>
                      </div>
                      <Progress value={(item.amount / 1200) * 100} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Performance Targets</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Monthly Target</span>
                      <span className="text-sm font-bold text-gray-900">18/20 Students</span>
                    </div>
                    <Progress value={90} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Commission Target</span>
                      <span className="text-sm font-bold text-gray-900">₹8.5L/₹10L</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Success Rate</span>
                      <span className="text-sm font-bold text-gray-900">78%/80%</span>
                    </div>
                    <Progress value={97.5} className="h-2" />
                  </div>
                  <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-sm font-semibold text-green-900 flex items-center">
                      <Target className="w-4 h-4 mr-2" />
                      On track to meet monthly targets!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Students */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Recent Students</CardTitle>
                <Link href="/subagent/students">
                  <Button variant="link" className="text-blue-600">
                    View All →
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentStudents.map((student) => (
                  <div
                    key={student.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-semibold">{student.name.charAt(0)}</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{student.name}</h4>
                        <p className="text-sm text-gray-500">{student.email}</p>
                        <p className="text-sm text-gray-600 mt-1">{student.university}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={getStatusColor(student.status)}>{student.status}</Badge>
                      <p className="text-xs text-gray-500 mt-1">{student.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Action Items */}
          <Card className="border-amber-200 bg-amber-50">
            <CardHeader>
              <CardTitle className="text-lg flex items-center text-amber-900">
                <AlertCircle className="w-5 h-5 mr-2 text-amber-600" />
                Action Items
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-orange-600" />
                    <div>
                      <p className="font-medium text-gray-900">3 students need document verification</p>
                      <p className="text-sm text-gray-600">Due today</p>
                    </div>
                  </div>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                    Review
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium text-gray-900">2 offers received - notify students</p>
                      <p className="text-sm text-gray-600">High priority</p>
                    </div>
                  </div>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                    Notify
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900">5 applications ready for submission</p>
                      <p className="text-sm text-gray-600">Review and submit</p>
                    </div>
                  </div>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                    Submit
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
