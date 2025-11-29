"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Save, Clock, CheckCircle, AlertCircle, XCircle, FileText, Calendar } from "lucide-react"

export default function ApplicationStatusUpdatePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [newStatus, setNewStatus] = useState("")
  const [notes, setNotes] = useState("")
  const [sendEmail, setSendEmail] = useState(true)
  const [sendSMS, setSendSMS] = useState(false)

  // Current application data
  const application = {
    id: params.id,
    applicationNumber: "APP-2024-001",
    currentStatus: "Under Review",
    student: {
      name: "Priya Sharma",
      email: "priya.sharma@email.com",
      phone: "+91 98765 43210",
    },
    college: {
      name: "Harvard University",
    },
    course: {
      name: "MBA",
    },
  }

  // Status history
  const statusHistory = [
    {
      id: 1,
      status: "Draft",
      date: "2024-01-10",
      time: "10:30 AM",
      user: "Amit Kumar",
      notes: "Application draft created",
      icon: FileText,
      color: "bg-gray-100 text-gray-700",
    },
    {
      id: 2,
      status: "Submitted",
      date: "2024-01-15",
      time: "11:00 AM",
      user: "Amit Kumar",
      notes: "Application submitted to Harvard University",
      icon: CheckCircle,
      color: "bg-green-100 text-green-700",
    },
    {
      id: 3,
      status: "Under Review",
      date: "2024-01-20",
      time: "09:30 AM",
      user: "Harvard Admissions",
      notes: "Application is under review by admissions committee",
      icon: Clock,
      color: "bg-blue-100 text-blue-700",
    },
    {
      id: 4,
      status: "Documents Requested",
      date: "2024-02-05",
      time: "03:45 PM",
      user: "Harvard Admissions",
      notes: "Requested updated bank statement and recommendation letter",
      icon: AlertCircle,
      color: "bg-yellow-100 text-yellow-700",
    },
    {
      id: 5,
      status: "Under Review",
      date: "2024-02-15",
      time: "10:20 AM",
      user: "Harvard Admissions",
      notes: "Additional documents received. Back under review.",
      icon: Clock,
      color: "bg-blue-100 text-blue-700",
    },
  ]

  // Available statuses
  const statuses = [
    { value: "Draft", label: "Draft", color: "bg-gray-100 text-gray-700", icon: FileText },
    { value: "Submitted", label: "Submitted", color: "bg-blue-100 text-blue-700", icon: CheckCircle },
    { value: "Under Review", label: "Under Review", color: "bg-blue-100 text-blue-700", icon: Clock },
    {
      value: "Documents Requested",
      label: "Documents Requested",
      color: "bg-yellow-100 text-yellow-700",
      icon: AlertCircle,
    },
    {
      value: "Interview Scheduled",
      label: "Interview Scheduled",
      color: "bg-purple-100 text-purple-700",
      icon: Calendar,
    },
    { value: "Offer Received", label: "Offer Received", color: "bg-green-100 text-green-700", icon: CheckCircle },
    { value: "Accepted", label: "Accepted", color: "bg-green-100 text-green-700", icon: CheckCircle },
    { value: "Rejected", label: "Rejected", color: "bg-red-100 text-red-700", icon: XCircle },
  ]

  const handleUpdate = () => {
    console.log("[v0] Updating status to:", newStatus, "with notes:", notes)
    console.log("[v0] Send email:", sendEmail, "Send SMS:", sendSMS)
    router.push(`/admin/applications/${params.id}`)
  }

  const getStatusColor = (status: string) => {
    const statusObj = statuses.find((s) => s.value === status)
    return statusObj?.color || "bg-gray-100 text-gray-700"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => router.back()} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Update Application Status</h1>
            <p className="text-sm text-gray-600 mt-1">{application.applicationNumber}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Current Status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Current Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Application Status</p>
                    <Badge className={getStatusColor(application.currentStatus)} style={{ fontSize: "14px" }}>
                      {application.currentStatus}
                    </Badge>
                  </div>
                  <Clock className="w-8 h-8 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Update Status Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Change Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="newStatus">New Status</Label>
                <Select value={newStatus} onValueChange={setNewStatus}>
                  <SelectTrigger id="newStatus">
                    <SelectValue placeholder="Select new status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        <div className="flex items-center gap-2">
                          <status.icon className="w-4 h-4" />
                          {status.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {newStatus && (
                <div className="p-4 bg-green-50 rounded-lg border-2 border-green-200">
                  <p className="text-sm text-gray-600 mb-2">New Status Preview</p>
                  <Badge className={getStatusColor(newStatus)} style={{ fontSize: "14px" }}>
                    {newStatus}
                  </Badge>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="notes">Status Update Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Add notes about this status change (required)..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={6}
                  className="resize-none"
                />
                <p className="text-xs text-gray-500">
                  These notes will be visible in the application timeline and sent to the student if notifications are
                  enabled.
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <p className="text-sm font-medium text-gray-900">Notification Settings</p>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="sendEmail">Send Email Notification</Label>
                    <p className="text-xs text-gray-500">Notify student via email about status change</p>
                  </div>
                  <Switch id="sendEmail" checked={sendEmail} onCheckedChange={setSendEmail} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="sendSMS">Send SMS Notification</Label>
                    <p className="text-xs text-gray-500">Notify student via SMS about status change</p>
                  </div>
                  <Switch id="sendSMS" checked={sendSMS} onCheckedChange={setSendSMS} />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-4">
                <Button
                  onClick={handleUpdate}
                  disabled={!newStatus || !notes}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 gap-2"
                >
                  <Save className="w-4 h-4" />
                  Update Status
                </Button>
                <Button variant="outline" onClick={() => router.back()} className="bg-transparent">
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Automated Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Automated Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-900 mb-1">Status: Offer Received</p>
                  <p className="text-xs text-gray-600">
                    • Send congratulations email to student
                    <br />• Create acceptance deadline reminder
                    <br />• Notify counselor for follow-up
                  </p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-900 mb-1">Status: Accepted</p>
                  <p className="text-xs text-gray-600">
                    • Trigger commission calculation
                    <br />• Create visa application task
                    <br />• Send pre-departure checklist
                  </p>
                </div>
                <div className="p-3 bg-red-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-900 mb-1">Status: Rejected</p>
                  <p className="text-xs text-gray-600">
                    • Send consolation email to student
                    <br />• Suggest alternative colleges
                    <br />• Schedule counseling call
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Application Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Application Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-xs text-gray-500">Student</p>
                <p className="text-sm font-medium text-gray-900">{application.student.name}</p>
                <p className="text-xs text-gray-600">{application.student.email}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">College</p>
                <p className="text-sm font-medium text-gray-900">{application.college.name}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Course</p>
                <p className="text-sm font-medium text-gray-900">{application.course.name}</p>
              </div>
            </CardContent>
          </Card>

          {/* Status History */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Status History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {statusHistory.map((event, index) => {
                  const Icon = event.icon
                  return (
                    <div key={event.id} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${event.color}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        {index < statusHistory.length - 1 && <div className="w-0.5 h-full bg-gray-200 mt-1" />}
                      </div>
                      <div className="flex-1 pb-4">
                        <p className="text-sm font-semibold text-gray-900">{event.status}</p>
                        <p className="text-xs text-gray-600 mt-1">{event.notes}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {event.date} • {event.user}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
