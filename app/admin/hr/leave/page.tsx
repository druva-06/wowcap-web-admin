"use client"

import { useState } from "react"
import { Plus, Download, Calendar, Check, X, Clock, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"

export default function LeaveManagementPage() {
  const { toast } = useToast()
  const [statusFilter, setStatusFilter] = useState("all")
  const [dialogOpen, setDialogOpen] = useState(false)

  const leaveRequests = [
    {
      id: 1,
      employeeName: "Amit Kumar",
      employeeId: "EMP001",
      role: "Senior Counselor",
      leaveType: "Annual Leave",
      startDate: "2024-02-15",
      endDate: "2024-02-20",
      days: 6,
      reason: "Family vacation to Goa",
      status: "pending",
      appliedOn: "2024-01-28",
      balance: { annual: 15, sick: 8, casual: 5 },
    },
    {
      id: 2,
      employeeName: "Priya Sharma",
      employeeId: "EMP002",
      role: "Counselor",
      leaveType: "Sick Leave",
      startDate: "2024-02-10",
      endDate: "2024-02-11",
      days: 2,
      reason: "Medical appointment and recovery",
      status: "approved",
      appliedOn: "2024-02-08",
      approvedBy: "HR Manager",
      balance: { annual: 17, sick: 8, casual: 7 },
    },
    {
      id: 3,
      employeeName: "Rahul Verma",
      employeeId: "EMP003",
      role: "Counselor",
      leaveType: "Casual Leave",
      startDate: "2024-02-12",
      endDate: "2024-02-12",
      days: 1,
      reason: "Personal work",
      status: "approved",
      appliedOn: "2024-02-10",
      approvedBy: "Team Lead",
      balance: { annual: 18, sick: 10, casual: 6 },
    },
    {
      id: 4,
      employeeName: "Sneha Patel",
      employeeId: "EMP004",
      role: "Junior Counselor",
      leaveType: "Annual Leave",
      startDate: "2024-03-01",
      endDate: "2024-03-05",
      days: 5,
      reason: "Wedding ceremony",
      status: "pending",
      appliedOn: "2024-01-30",
      balance: { annual: 16, sick: 10, casual: 8 },
    },
    {
      id: 5,
      employeeName: "Vikram Singh",
      employeeId: "EMP005",
      role: "Senior Counselor",
      leaveType: "Sick Leave",
      startDate: "2024-02-08",
      endDate: "2024-02-09",
      days: 2,
      reason: "Fever and cold",
      status: "rejected",
      appliedOn: "2024-02-07",
      rejectedBy: "HR Manager",
      rejectionReason: "Insufficient sick leave balance",
      balance: { annual: 12, sick: 0, casual: 4 },
    },
  ]

  const stats = {
    pending: leaveRequests.filter((r) => r.status === "pending").length,
    approved: leaveRequests.filter((r) => r.status === "approved").length,
    rejected: leaveRequests.filter((r) => r.status === "rejected").length,
    total: leaveRequests.length,
  }

  const filteredRequests =
    statusFilter === "all" ? leaveRequests : leaveRequests.filter((r) => r.status === statusFilter)

  const handleApprove = (id: number, name: string) => {
    toast({
      title: "Leave Approved",
      description: `Leave request for ${name} has been approved.`,
    })
  }

  const handleReject = (id: number, name: string) => {
    toast({
      title: "Leave Rejected",
      description: `Leave request for ${name} has been rejected.`,
      variant: "destructive",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-700"
      case "rejected":
        return "bg-red-100 text-red-700"
      case "pending":
        return "bg-yellow-100 text-yellow-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getLeaveTypeColor = (type: string) => {
    switch (type) {
      case "Annual Leave":
        return "bg-blue-100 text-blue-700"
      case "Sick Leave":
        return "bg-red-100 text-red-700"
      case "Casual Leave":
        return "bg-purple-100 text-purple-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Leave Management</h1>
          <p className="text-gray-600 mt-1">Manage employee leave requests and approvals</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Apply Leave
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Apply for Leave</DialogTitle>
                <DialogDescription>Submit a new leave request for approval</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Employee</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select employee" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="emp1">Amit Kumar</SelectItem>
                      <SelectItem value="emp2">Priya Sharma</SelectItem>
                      <SelectItem value="emp3">Rahul Verma</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Leave Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select leave type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="annual">Annual Leave</SelectItem>
                      <SelectItem value="sick">Sick Leave</SelectItem>
                      <SelectItem value="casual">Casual Leave</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Input type="date" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Reason</Label>
                  <Textarea placeholder="Enter reason for leave..." rows={3} />
                </div>
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={() => {
                    toast({
                      title: "Leave Request Submitted",
                      description: "Your leave request has been submitted for approval.",
                    })
                    setDialogOpen(false)
                  }}
                >
                  Submit Request
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Requests</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
                <p className="text-xs text-gray-500 mt-1">This month</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center transition-transform duration-300 hover:scale-110">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600 mt-1">{stats.pending}</p>
                <p className="text-xs text-gray-500 mt-1">Awaiting approval</p>
              </div>
              <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center transition-transform duration-300 hover:scale-110">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-green-600 mt-1">{stats.approved}</p>
                <p className="text-xs text-gray-500 mt-1">This month</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center transition-transform duration-300 hover:scale-110">
                <Check className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Rejected</p>
                <p className="text-2xl font-bold text-red-600 mt-1">{stats.rejected}</p>
                <p className="text-xs text-gray-500 mt-1">This month</p>
              </div>
              <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center transition-transform duration-300 hover:scale-110">
                <X className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Leave Requests</CardTitle>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredRequests.map((request) => (
              <div key={request.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-900">{request.employeeName}</h3>
                      <Badge variant="secondary">{request.employeeId}</Badge>
                      <Badge variant="outline">{request.role}</Badge>
                      <Badge className={getLeaveTypeColor(request.leaveType)}>{request.leaveType}</Badge>
                      <Badge className={getStatusColor(request.status)}>{request.status.toUpperCase()}</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                      <div>
                        <span className="font-medium">Duration:</span> {request.startDate} to {request.endDate} (
                        {request.days} days)
                      </div>
                      <div>
                        <span className="font-medium">Applied on:</span> {request.appliedOn}
                      </div>
                      <div className="col-span-2">
                        <span className="font-medium">Reason:</span> {request.reason}
                      </div>
                      {request.status === "approved" && (
                        <div className="col-span-2 text-green-600">
                          <span className="font-medium">Approved by:</span> {request.approvedBy}
                        </div>
                      )}
                      {request.status === "rejected" && (
                        <div className="col-span-2 text-red-600">
                          <span className="font-medium">Rejected by:</span> {request.rejectedBy} -{" "}
                          {request.rejectionReason}
                        </div>
                      )}
                    </div>
                    <div className="flex gap-4 text-xs text-gray-500">
                      <span>Annual: {request.balance.annual} days left</span>
                      <span>Sick: {request.balance.sick} days left</span>
                      <span>Casual: {request.balance.casual} days left</span>
                    </div>
                  </div>
                  {request.status === "pending" && (
                    <div className="flex gap-2 ml-4">
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => handleApprove(request.id, request.employeeName)}
                      >
                        <Check className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleReject(request.id, request.employeeName)}
                      >
                        <X className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
