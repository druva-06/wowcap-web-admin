"use client"

import { useState } from "react"
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
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { mockData } from "@/lib/mock-data"

export default function ApplicationsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const applications = mockData.applications

  const totalApplications = applications.length
  const inReview = applications.filter((app) => app.status === "in-review").length
  const approved = applications.filter((app) => app.status === "approved").length
  const pendingDocs = applications.filter((app) => app.status === "pending-docs").length

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      searchQuery === "" ||
      app.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.university.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || app.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "submitted":
        return {
          label: "Submitted",
          color: "bg-green-100 text-green-700 border-green-200",
          icon: CheckCircle2,
        }
      case "in-review":
        return {
          label: "In Review",
          color: "bg-blue-100 text-blue-700 border-blue-200",
          icon: Clock,
        }
      case "pending-docs":
        return {
          label: "Pending Documents",
          color: "bg-orange-100 text-orange-700 border-orange-200",
          icon: AlertCircle,
        }
      case "approved":
        return {
          label: "Approved",
          color: "bg-green-100 text-green-700 border-green-200",
          icon: CheckCircle2,
        }
      case "rejected":
        return {
          label: "Rejected",
          color: "bg-red-100 text-red-700 border-red-200",
          icon: XCircle,
        }
      default:
        return {
          label: "Unknown",
          color: "bg-gray-100 text-gray-700 border-gray-200",
          icon: FileText,
        }
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Applications</h1>
          <p className="text-gray-600 mt-1">Track and manage student applications</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Applications</p>
                <p className="text-3xl font-bold text-gray-900">{totalApplications}</p>
                <p className="text-xs text-green-600 mt-1">↑ 12% from last month</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">In Review</p>
                <p className="text-3xl font-bold text-gray-900">{inReview}</p>
                <p className="text-xs text-blue-600 mt-1">Requires attention</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Approved</p>
                <p className="text-3xl font-bold text-gray-900">{approved}</p>
                <p className="text-xs text-green-600 mt-1">↑ 18% success rate</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Pending Docs</p>
                <p className="text-3xl font-bold text-gray-900">{pendingDocs}</p>
                <p className="text-xs text-orange-600 mt-1">Action required</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search by student name, ID, or university..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48 h-11">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Applications</SelectItem>
                <SelectItem value="submitted">Submitted</SelectItem>
                <SelectItem value="in-review">In Review</SelectItem>
                <SelectItem value="pending-docs">Pending Documents</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="h-11 bg-transparent">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Applications List */}
      <div className="space-y-4">
        {filteredApplications.map((app) => {
          const statusConfig = getStatusConfig(app.status)
          const StatusIcon = statusConfig.icon

          return (
            <Card key={app.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Left Section */}
                  <div className="flex-1 space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {app.studentName.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900">{app.studentName}</h3>
                          <p className="text-sm text-gray-500">{app.studentId}</p>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                            <span className="flex items-center">
                              <GraduationCap className="w-4 h-4 mr-1" />
                              {app.course}
                            </span>
                            <span className="flex items-center">
                              <Globe className="w-4 h-4 mr-1" />
                              {app.country}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Badge className={statusConfig.color}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {statusConfig.label}
                      </Badge>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Application Progress</span>
                        <span className="text-sm font-semibold text-blue-600">{app.progress}%</span>
                      </div>
                      <Progress value={app.progress} className="h-2" />
                      <div className="grid grid-cols-3 gap-4 mt-3 text-sm">
                        <div>
                          <span className="text-gray-600">Documents:</span>
                          <span className="font-medium ml-1">
                            {app.documents.submitted}/{app.documents.total}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">Deadline:</span>
                          <span className="font-medium ml-1">{app.deadline}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Counselor:</span>
                          <span className="font-medium ml-1">{app.counselorName}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Section - Actions */}
                  <div className="flex flex-col space-y-2 lg:w-48">
                    <Link href={`/admin/applications/${app.id}`}>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </Link>
                    <Button variant="outline" className="w-full bg-transparent">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Contact
                    </Button>
                    {app.documents.pending > 0 && (
                      <Link href={`/admin/applications/${app.id}/documents`}>
                        <Button
                          variant="outline"
                          className="w-full text-orange-600 border-orange-200 hover:bg-orange-50 bg-transparent"
                        >
                          <AlertCircle className="w-4 h-4 mr-2" />
                          {app.documents.pending} Docs Pending
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
