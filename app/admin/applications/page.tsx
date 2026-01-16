"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  Search,
  Filter,
  Download,
  FileText,
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  Eye,
  MessageSquare,
  GraduationCap,
  Globe,
  Loader2,
  Calendar,
  User,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { api } from "@/lib/api-client"

interface RegistrationData {
  registrationId: number
  studentId: number
  collegeCourseSnapshotId: number
  intakeSession: string
  applicationYear: number
  status: string
  remarks: string | null
  createdAt: string
  updatedAt: string
  courseName: string
  collegeName: string
}

interface StatisticsData {
  totalRegistrations: number
  pending: number
  submitted: number
  approved: number
  rejected: number
}

export default function ApplicationsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [applications, setApplications] = useState<RegistrationData[]>([])
  const [statistics, setStatistics] = useState<StatisticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch applications and statistics
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)

      try {
        // Fetch applications list
        const appsResult = await api.get<RegistrationData[]>(
          `/api/admin/student-college-course-registration${statusFilter !== "all" ? `?status=${statusFilter.toUpperCase()}` : ""}`
        )

        // Fetch statistics
        const statsResult = await api.get<StatisticsData>("/api/admin/student-college-course-registration/stats")

        if (appsResult.success && appsResult.data) {
          setApplications(appsResult.data)
        } else {
          setError(appsResult.message || "Failed to fetch applications")
        }

        if (statsResult.success && statsResult.data) {
          setStatistics(statsResult.data)
        }
      } catch (err) {
        setError("An error occurred while fetching data")
        console.error("Error fetching applications:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [statusFilter])

  const filteredApplications = applications.filter((app) => {
    if (!searchQuery) return true

    const searchLower = searchQuery.toLowerCase()

    return (
      app.studentId.toString().includes(searchLower) ||
      app.collegeName.toLowerCase().includes(searchLower) ||
      app.courseName.toLowerCase().includes(searchLower) ||
      app.intakeSession.toLowerCase().includes(searchLower)
    )
  })

  const getStatusConfig = (status: string) => {
    const normalizedStatus = status?.toUpperCase() || "PENDING"

    switch (normalizedStatus) {
      case "SUBMITTED":
        return {
          label: "Submitted",
          color: "bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold border-0",
          icon: CheckCircle2,
        }
      case "PENDING":
        return {
          label: "Pending",
          color: "bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold border-0",
          icon: Clock,
        }
      case "APPROVED":
        return {
          label: "Approved",
          color: "bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold border-0",
          icon: CheckCircle2,
        }
      case "REJECTED":
        return {
          label: "Rejected",
          color: "bg-gradient-to-r from-red-500 to-rose-600 text-white font-semibold border-0",
          icon: XCircle,
        }
      case "IN_REVIEW":
        return {
          label: "In Review",
          color: "bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold border-0",
          icon: AlertCircle,
        }
      default:
        return {
          label: status || "Pending",
          color: "bg-gradient-to-r from-gray-500 to-slate-600 text-white font-semibold border-0",
          icon: FileText,
        }
    }
  }

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    } catch {
      return "N/A"
    }
  }

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-[1800px] mx-auto">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl">
          {error}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">Applications</h1>
          <p className="text-gray-600 mt-2">Track and manage student applications</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg">
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-md">
          <CardContent className="p-6 lg:p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-2">Total Applications</p>
                <p className="text-3xl lg:text-4xl font-bold text-gray-900">
                  {loading ? "..." : statistics?.totalRegistrations || 0}
                </p>
                <p className="text-xs text-green-600 mt-2 font-medium">Active registrations</p>
              </div>
              <div className="w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <FileText className="w-7 h-7 lg:w-8 lg:h-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-md">
          <CardContent className="p-6 lg:p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-2">Pending</p>
                <p className="text-3xl lg:text-4xl font-bold text-gray-900">
                  {loading ? "..." : statistics?.pending || 0}
                </p>
                <p className="text-xs text-blue-600 mt-2 font-medium">Requires review</p>
              </div>
              <div className="w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Clock className="w-7 h-7 lg:w-8 lg:h-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-md">
          <CardContent className="p-6 lg:p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-2">Approved</p>
                <p className="text-3xl lg:text-4xl font-bold text-gray-900">
                  {loading ? "..." : statistics?.approved || 0}
                </p>
                <p className="text-xs text-green-600 mt-2 font-medium">Successfully approved</p>
              </div>
              <div className="w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                <CheckCircle2 className="w-7 h-7 lg:w-8 lg:h-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-md">
          <CardContent className="p-6 lg:p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-2">Submitted</p>
                <p className="text-3xl lg:text-4xl font-bold text-gray-900">
                  {loading ? "..." : statistics?.submitted || 0}
                </p>
                <p className="text-xs text-indigo-600 mt-2 font-medium">Ready for review</p>
              </div>
              <div className="w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <AlertCircle className="w-7 h-7 lg:w-8 lg:h-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-md">
        <CardContent className="p-6 lg:p-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search by student ID, college, course, or intake..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 text-base border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-56 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Applications</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="submitted">Submitted</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="h-12 px-6 border-gray-200 hover:bg-gray-50">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Applications List */}
      <div className="space-y-6">
        {loading ? (
          <Card className="border-0 shadow-md">
            <CardContent className="p-24 text-center">
              <Loader2 className="w-16 h-16 text-blue-600 animate-spin mx-auto mb-6" />
              <p className="text-gray-500 text-lg font-medium">Loading applications...</p>
            </CardContent>
          </Card>
        ) : filteredApplications.length === 0 ? (
          <Card className="border-0 shadow-md">
            <CardContent className="p-24 text-center">
              <FileText className="w-20 h-20 text-gray-300 mx-auto mb-6" />
              <p className="text-gray-500 font-medium text-lg mb-2">No applications found</p>
              <p className="text-sm text-gray-400">
                {searchQuery ? "Try adjusting your search criteria" : "No applications available"}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredApplications.map((app) => {
            const statusConfig = getStatusConfig(app.status)
            const StatusIcon = statusConfig.icon

            return (
              <Card
                key={app.registrationId}
                className="hover:shadow-2xl transition-all duration-300 border-0 shadow-md overflow-hidden"
              >
                <CardContent className="p-6 lg:p-8">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    {/* Left Section */}
                    <div className="flex-1 space-y-6">
                      <div className="flex items-start justify-between flex-wrap gap-4">
                        <div className="flex items-start space-x-4 flex-1 min-w-0">
                          <div className="w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl lg:text-2xl shadow-lg flex-shrink-0">
                            {app.collegeName?.charAt(0) || "C"}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-lg lg:text-xl text-gray-900 mb-1 truncate">
                              {app.collegeName || "College Name N/A"}
                            </h3>
                            <p className="text-sm lg:text-base text-gray-500 mb-3">
                              Registration #{app.registrationId} | Student ID: {app.studentId || "N/A"}
                            </p>
                            <div className="flex flex-wrap items-center gap-3 lg:gap-5 text-sm lg:text-base text-gray-600">
                              <span className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg">
                                <GraduationCap className="w-4 h-4 text-blue-600" />
                                <span className="font-medium">{app.courseName || "Course N/A"}</span>
                              </span>
                              <span className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg">
                                <Calendar className="w-4 h-4 text-green-600" />
                                <span className="font-medium">{app.intakeSession || "N/A"}</span>
                              </span>
                              <span className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg">
                                <User className="w-4 h-4 text-purple-600" />
                                <span className="font-medium">{app.applicationYear || "N/A"}</span>
                              </span>
                            </div>
                          </div>
                        </div>
                        <Badge className={`${statusConfig.color} px-4 py-2 text-sm flex items-center gap-2 shadow-lg`}>
                          <StatusIcon className="w-4 h-4" />
                          {statusConfig.label}
                        </Badge>
                      </div>

                      <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-5 lg:p-6 border border-gray-100">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 text-sm lg:text-base">
                          <div className="space-y-1">
                            <span className="text-gray-600 font-medium block">Created Date</span>
                            <span className="font-semibold text-gray-900 block">
                              {formatDate(app.createdAt)}
                            </span>
                          </div>
                          <div className="space-y-1">
                            <span className="text-gray-600 font-medium block">Last Updated</span>
                            <span className="font-semibold text-gray-900 block">
                              {formatDate(app.updatedAt)}
                            </span>
                          </div>
                          <div className="space-y-1 sm:col-span-2 lg:col-span-1">
                            <span className="text-gray-600 font-medium block">Remarks</span>
                            <span className="font-semibold text-gray-900 block truncate">
                              {app.remarks || "No remarks"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Section - Actions */}
                    <div className="flex flex-col space-y-3 lg:w-56">
                      <Link href={`/admin/applications/${app.registrationId}`} className="w-full">
                        <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg h-12 text-base font-semibold">
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        className="w-full border-2 border-gray-200 hover:bg-gray-50 h-12 text-base font-semibold"
                      >
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Contact
                      </Button>
                      {app.status?.toUpperCase() === "PENDING" && (
                        <Button
                          variant="outline"
                          className="w-full text-amber-600 border-2 border-amber-200 hover:bg-amber-50 h-12 text-base font-semibold"
                        >
                          <AlertCircle className="w-4 h-4 mr-2" />
                          Action Required
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })
        )}
      </div>
    </div>
  )
}
