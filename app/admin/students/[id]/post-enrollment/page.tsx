"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  GraduationCap,
  TrendingUp,
  Calendar,
  Phone,
  Mail,
  AlertCircle,
  CheckCircle,
  Briefcase,
  Home,
  BookOpen,
  DollarSign,
} from "lucide-react"

export default function PostEnrollmentPage({ params }: { params: { id: string } }) {
  const router = useRouter()

  // Student enrollment data
  const enrollmentData = {
    student: {
      name: "Priya Sharma",
      id: params.id,
      email: "priya.sharma@email.com",
      phone: "+91 98765 43210",
    },
    university: {
      name: "Harvard University",
      course: "MS in Computer Science",
      startDate: "September 1, 2024",
      expectedGraduation: "May 2026",
      semester: "Fall 2024 - Semester 1",
    },
    academic: {
      currentGPA: 3.8,
      targetGPA: 4.0,
      creditsCompleted: 12,
      creditsRequired: 48,
      attendance: 95,
    },
  }

  // Course enrollment
  const courses = [
    {
      code: "CS 101",
      name: "Introduction to Computer Science",
      credits: 4,
      grade: "A",
      attendance: 98,
      status: "Completed",
    },
    {
      code: "CS 201",
      name: "Data Structures and Algorithms",
      credits: 4,
      grade: "A-",
      attendance: 96,
      status: "Completed",
    },
    {
      code: "CS 301",
      name: "Machine Learning",
      credits: 4,
      grade: "In Progress",
      attendance: 92,
      status: "In Progress",
    },
  ]

  // Support requests
  const supportRequests = [
    {
      id: 1,
      type: "Academic",
      subject: "Need help with course selection for next semester",
      status: "Open",
      priority: "Medium",
      date: "2024-02-15",
      assignedTo: "Amit Kumar",
    },
    {
      id: 2,
      type: "Accommodation",
      subject: "Roommate conflict - need mediation",
      status: "In Progress",
      priority: "High",
      date: "2024-02-10",
      assignedTo: "Priya Singh",
    },
    {
      id: 3,
      type: "Financial",
      subject: "Part-time job assistance required",
      status: "Resolved",
      priority: "Low",
      date: "2024-01-20",
      assignedTo: "Amit Kumar",
    },
  ]

  // Check-in calls
  const checkInCalls = [
    {
      id: 1,
      date: "2024-02-20",
      time: "10:00 AM",
      type: "Monthly Check-in",
      status: "Scheduled",
      counselor: "Amit Kumar",
      notes: "Discuss academic progress and upcoming semester planning",
    },
    {
      id: 2,
      date: "2024-01-15",
      time: "11:00 AM",
      type: "Monthly Check-in",
      status: "Completed",
      counselor: "Amit Kumar",
      notes: "Student settling in well. No major issues reported.",
    },
    {
      id: 3,
      date: "2023-12-10",
      time: "09:30 AM",
      type: "Initial Check-in",
      status: "Completed",
      counselor: "Amit Kumar",
      notes: "First call after arrival. Student adjusting to new environment.",
    },
  ]

  // Accommodation status
  const accommodationStatus = {
    type: "University Dormitory",
    building: "Harvard Yard Dormitory",
    roomNumber: "Room 305",
    roommates: 1,
    moveInDate: "August 16, 2024",
    leaseEnd: "May 31, 2026",
    monthlyRent: "$1,200",
    status: "Active",
    issues: [
      {
        id: 1,
        issue: "Heating not working properly",
        reportedDate: "2024-02-01",
        status: "Resolved",
        resolvedDate: "2024-02-05",
      },
    ],
  }

  // Part-time job
  const partTimeJob = {
    hasJob: true,
    employer: "Harvard Library",
    position: "Library Assistant",
    hoursPerWeek: 15,
    hourlyRate: "$18",
    startDate: "October 1, 2024",
    workPermit: "Valid F-1 CPT",
    permitExpiry: "August 31, 2025",
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-yellow-100 text-yellow-700"
      case "In Progress":
        return "bg-blue-100 text-blue-700"
      case "Resolved":
      case "Completed":
        return "bg-green-100 text-green-700"
      case "Scheduled":
        return "bg-purple-100 text-purple-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-700"
      case "Medium":
        return "bg-yellow-100 text-yellow-700"
      case "Low":
        return "bg-green-100 text-green-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
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
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Post-Enrollment Support</h1>
            <p className="text-sm text-gray-600 mt-1">
              {enrollmentData.student.name} • {enrollmentData.student.id}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white gap-2">
            <Phone className="w-4 h-4" />
            Call Student
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
            <Mail className="w-4 h-4" />
            Send Email
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Current GPA</p>
                <p className="text-3xl font-bold text-gray-900">{enrollmentData.academic.currentGPA}</p>
                <p className="text-xs text-green-600 mt-1">Target: {enrollmentData.academic.targetGPA}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Attendance</p>
                <p className="text-3xl font-bold text-gray-900">{enrollmentData.academic.attendance}%</p>
                <p className="text-xs text-green-600 mt-1">Excellent</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Credits</p>
                <p className="text-3xl font-bold text-gray-900">
                  {enrollmentData.academic.creditsCompleted}/{enrollmentData.academic.creditsRequired}
                </p>
                <p className="text-xs text-blue-600 mt-1">25% Complete</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Support Requests</p>
                <p className="text-3xl font-bold text-gray-900">2</p>
                <p className="text-xs text-orange-600 mt-1">1 High Priority</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="academic" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="academic">Academic</TabsTrigger>
          <TabsTrigger value="support">Support</TabsTrigger>
          <TabsTrigger value="checkins">Check-ins</TabsTrigger>
          <TabsTrigger value="accommodation">Accommodation</TabsTrigger>
          <TabsTrigger value="employment">Employment</TabsTrigger>
        </TabsList>

        {/* Academic Progress Tab */}
        <TabsContent value="academic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-blue-600" />
                Academic Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">University</p>
                    <p className="font-semibold text-gray-900">{enrollmentData.university.name}</p>
                    <p className="text-sm text-gray-600 mt-1">{enrollmentData.university.course}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Current Semester</p>
                    <p className="font-semibold text-gray-900">{enrollmentData.university.semester}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Expected Graduation: {enrollmentData.university.expectedGraduation}
                    </p>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-gray-700">Degree Progress</p>
                    <p className="text-sm font-semibold text-blue-600">25%</p>
                  </div>
                  <Progress value={25} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Course Enrollment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {courses.map((course, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold text-gray-900">
                          {course.code} - {course.name}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">{course.credits} Credits</p>
                      </div>
                      <Badge className={getStatusColor(course.status)}>{course.status}</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-3 text-sm">
                      <div>
                        <p className="text-gray-600">Grade</p>
                        <p className="font-semibold text-gray-900">{course.grade}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Attendance</p>
                        <p className="font-semibold text-gray-900">{course.attendance}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Support Requests Tab */}
        <TabsContent value="support" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Support Requests</CardTitle>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                  New Request
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {supportRequests.map((request) => (
                  <div key={request.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="text-xs">
                            {request.type}
                          </Badge>
                          <Badge className={getPriorityColor(request.priority)}>{request.priority}</Badge>
                        </div>
                        <p className="font-semibold text-gray-900">{request.subject}</p>
                        <p className="text-sm text-gray-600 mt-1">
                          Assigned to: {request.assignedTo} • {request.date}
                        </p>
                      </div>
                      <Badge className={getStatusColor(request.status)}>{request.status}</Badge>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" variant="outline" className="bg-transparent">
                        View Details
                      </Button>
                      {request.status !== "Resolved" && (
                        <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                          Resolve
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Check-in Calls Tab */}
        <TabsContent value="checkins" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Check-in Calls</CardTitle>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
                  <Calendar className="w-4 h-4" />
                  Schedule Call
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {checkInCalls.map((call) => (
                  <div key={call.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <p className="font-semibold text-gray-900">
                            {call.date} at {call.time}
                          </p>
                        </div>
                        <p className="text-sm text-gray-600">{call.type}</p>
                        <p className="text-sm text-gray-600 mt-1">Counselor: {call.counselor}</p>
                      </div>
                      <Badge className={getStatusColor(call.status)}>{call.status}</Badge>
                    </div>
                    {call.notes && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-700">{call.notes}</p>
                      </div>
                    )}
                    {call.status === "Scheduled" && (
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white gap-2">
                          <Phone className="w-4 h-4" />
                          Join Call
                        </Button>
                        <Button size="sm" variant="outline" className="bg-transparent">
                          Reschedule
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Accommodation Tab */}
        <TabsContent value="accommodation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Home className="w-5 h-5 text-orange-600" />
                Accommodation Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Type</p>
                    <p className="font-semibold text-gray-900">{accommodationStatus.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Building</p>
                    <p className="font-semibold text-gray-900">{accommodationStatus.building}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Room Number</p>
                    <p className="font-semibold text-gray-900">{accommodationStatus.roomNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Roommates</p>
                    <p className="font-semibold text-gray-900">{accommodationStatus.roommates}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Move-in Date</p>
                    <p className="font-semibold text-gray-900">{accommodationStatus.moveInDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Lease End</p>
                    <p className="font-semibold text-gray-900">{accommodationStatus.leaseEnd}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Monthly Rent</p>
                    <p className="font-semibold text-gray-900">{accommodationStatus.monthlyRent}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <Badge className="bg-green-100 text-green-700">{accommodationStatus.status}</Badge>
                  </div>
                </div>
              </div>

              {accommodationStatus.issues.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Reported Issues</h4>
                  <div className="space-y-2">
                    {accommodationStatus.issues.map((issue) => (
                      <div key={issue.id} className="p-3 border border-gray-200 rounded-lg">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-medium text-gray-900">{issue.issue}</p>
                            <p className="text-sm text-gray-600 mt-1">Reported: {issue.reportedDate}</p>
                            {issue.resolvedDate && (
                              <p className="text-sm text-green-600 mt-1">Resolved: {issue.resolvedDate}</p>
                            )}
                          </div>
                          <Badge className={getStatusColor(issue.status)}>{issue.status}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Employment Tab */}
        <TabsContent value="employment" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-purple-600" />
                Part-Time Employment
              </CardTitle>
            </CardHeader>
            <CardContent>
              {partTimeJob.hasJob ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-600">Employer</p>
                        <p className="font-semibold text-gray-900">{partTimeJob.employer}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Position</p>
                        <p className="font-semibold text-gray-900">{partTimeJob.position}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Hours per Week</p>
                        <p className="font-semibold text-gray-900">{partTimeJob.hoursPerWeek}</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-600">Hourly Rate</p>
                        <p className="font-semibold text-gray-900">{partTimeJob.hourlyRate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Start Date</p>
                        <p className="font-semibold text-gray-900">{partTimeJob.startDate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Work Permit</p>
                        <p className="font-semibold text-gray-900">{partTimeJob.workPermit}</p>
                        <p className="text-xs text-gray-600 mt-1">Expires: {partTimeJob.permitExpiry}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="w-5 h-5 text-blue-600" />
                      <p className="font-semibold text-gray-900">Estimated Monthly Income</p>
                    </div>
                    <p className="text-2xl font-bold text-blue-600">
                      $
                      {(
                        Number.parseInt(partTimeJob.hourlyRate.replace("$", "")) *
                        partTimeJob.hoursPerWeek *
                        4
                      ).toFixed(0)}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Based on {partTimeJob.hoursPerWeek} hours/week at {partTimeJob.hourlyRate}/hour
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">No part-time employment recorded</p>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">Add Employment Details</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
