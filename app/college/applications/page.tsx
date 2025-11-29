"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Search, Eye, Download, CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"

export default function CollegeApplications() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedApp, setSelectedApp] = useState<any>(null)
  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [actionDialogOpen, setActionDialogOpen] = useState(false)
  const [actionType, setActionType] = useState<"accept" | "reject" | null>(null)
  const [remarks, setRemarks] = useState("")

  const applications = [
    {
      id: "APP001",
      studentName: "Priya Sharma",
      email: "priya.sharma@email.com",
      phone: "+91 98765 43210",
      course: "MBA",
      intake: "Fall 2025",
      status: "Under Review",
      submittedDate: "2024-01-15",
      gpa: "3.8",
      testScore: "GMAT: 720",
      country: "India",
    },
    {
      id: "APP002",
      studentName: "Rahul Patel",
      email: "rahul.patel@email.com",
      phone: "+91 87654 32109",
      course: "Computer Science",
      intake: "Fall 2025",
      status: "Accepted",
      submittedDate: "2024-01-14",
      gpa: "3.9",
      testScore: "GRE: 325",
      country: "India",
    },
    {
      id: "APP003",
      studentName: "Sneha Reddy",
      email: "sneha.reddy@email.com",
      phone: "+91 76543 21098",
      course: "Business Administration",
      intake: "Spring 2026",
      status: "Pending Documents",
      submittedDate: "2024-01-13",
      gpa: "3.7",
      testScore: "IELTS: 7.5",
      country: "India",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Accepted":
        return "bg-green-100 text-green-700"
      case "Under Review":
        return "bg-yellow-100 text-yellow-700"
      case "Pending Documents":
        return "bg-orange-100 text-orange-700"
      case "Rejected":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.course.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || app.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleAction = () => {
    console.log("[v0] Action:", actionType, "Remarks:", remarks)
    setActionDialogOpen(false)
    setActionType(null)
    setRemarks("")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href="/college/dashboard">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center cursor-pointer">
                  <span className="text-white font-bold text-lg">W</span>
                </div>
              </Link>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Applications Management</h1>
                <p className="text-sm text-gray-600">Review and manage student applications</p>
              </div>
            </div>
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Logout
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search by name, email, or course..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Under Review">Under Review</SelectItem>
                    <SelectItem value="Accepted">Accepted</SelectItem>
                    <SelectItem value="Pending Documents">Pending Documents</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Applications Table */}
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Student</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Course</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Academics</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Submitted</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredApplications.map((app) => (
                      <tr key={app.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <div>
                            <p className="font-semibold text-gray-900">{app.studentName}</p>
                            <p className="text-sm text-gray-500">{app.email}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div>
                            <p className="font-medium text-gray-900">{app.course}</p>
                            <p className="text-sm text-gray-500">{app.intake}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div>
                            <p className="text-sm text-gray-900">GPA: {app.gpa}</p>
                            <p className="text-sm text-gray-500">{app.testScore}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <Badge className={getStatusColor(app.status)}>{app.status}</Badge>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm text-gray-900">{app.submittedDate}</p>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            {/* View Details */}
                            <Dialog
                              open={viewDialogOpen && selectedApp?.id === app.id}
                              onOpenChange={setViewDialogOpen}
                            >
                              <DialogTrigger asChild>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-8 w-8 p-0"
                                  onClick={() => setSelectedApp(app)}
                                >
                                  <Eye className="w-4 h-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle>Application Details - {selectedApp?.studentName}</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label className="text-xs text-gray-500">Email</Label>
                                      <p className="text-sm font-medium">{selectedApp?.email}</p>
                                    </div>
                                    <div>
                                      <Label className="text-xs text-gray-500">Phone</Label>
                                      <p className="text-sm font-medium">{selectedApp?.phone}</p>
                                    </div>
                                    <div>
                                      <Label className="text-xs text-gray-500">Course</Label>
                                      <p className="text-sm font-medium">{selectedApp?.course}</p>
                                    </div>
                                    <div>
                                      <Label className="text-xs text-gray-500">Intake</Label>
                                      <p className="text-sm font-medium">{selectedApp?.intake}</p>
                                    </div>
                                    <div>
                                      <Label className="text-xs text-gray-500">GPA</Label>
                                      <p className="text-sm font-medium">{selectedApp?.gpa}</p>
                                    </div>
                                    <div>
                                      <Label className="text-xs text-gray-500">Test Score</Label>
                                      <p className="text-sm font-medium">{selectedApp?.testScore}</p>
                                    </div>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>

                            {/* Accept */}
                            {app.status === "Under Review" && (
                              <Dialog
                                open={actionDialogOpen && selectedApp?.id === app.id && actionType === "accept"}
                                onOpenChange={setActionDialogOpen}
                              >
                                <DialogTrigger asChild>
                                  <Button
                                    size="sm"
                                    className="h-8 bg-green-600 hover:bg-green-700 text-white"
                                    onClick={() => {
                                      setSelectedApp(app)
                                      setActionType("accept")
                                    }}
                                  >
                                    <CheckCircle className="w-4 h-4 mr-1" />
                                    Accept
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Accept Application</DialogTitle>
                                  </DialogHeader>
                                  <div className="space-y-4 py-4">
                                    <div className="space-y-2">
                                      <Label>Remarks / Comments</Label>
                                      <Textarea
                                        placeholder="Add acceptance remarks..."
                                        value={remarks}
                                        onChange={(e) => setRemarks(e.target.value)}
                                        rows={4}
                                      />
                                    </div>
                                    <div className="flex justify-end gap-2">
                                      <Button variant="outline" onClick={() => setActionDialogOpen(false)}>
                                        Cancel
                                      </Button>
                                      <Button
                                        className="bg-green-600 hover:bg-green-700 text-white"
                                        onClick={handleAction}
                                      >
                                        Confirm Accept
                                      </Button>
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            )}

                            {/* Reject */}
                            {app.status === "Under Review" && (
                              <Dialog
                                open={actionDialogOpen && selectedApp?.id === app.id && actionType === "reject"}
                                onOpenChange={setActionDialogOpen}
                              >
                                <DialogTrigger asChild>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="h-8 text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent"
                                    onClick={() => {
                                      setSelectedApp(app)
                                      setActionType("reject")
                                    }}
                                  >
                                    <XCircle className="w-4 h-4 mr-1" />
                                    Reject
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Reject Application</DialogTitle>
                                  </DialogHeader>
                                  <div className="space-y-4 py-4">
                                    <div className="space-y-2">
                                      <Label>Reason for Rejection</Label>
                                      <Textarea
                                        placeholder="Provide reason for rejection..."
                                        value={remarks}
                                        onChange={(e) => setRemarks(e.target.value)}
                                        rows={4}
                                      />
                                    </div>
                                    <div className="flex justify-end gap-2">
                                      <Button variant="outline" onClick={() => setActionDialogOpen(false)}>
                                        Cancel
                                      </Button>
                                      <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={handleAction}>
                                        Confirm Reject
                                      </Button>
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
