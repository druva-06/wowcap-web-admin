"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { Search, Download, UserPlus, Eye, FileText, Upload, CheckCircle, AlertCircle, Calendar, Phone, Mail, GraduationCap, Users, MessageSquare, Briefcase, BookOpen, Target, TrendingUp, ExternalLink, Award, ClipboardCheck, DollarSign, MapPin, Building } from 'lucide-react'
import { mockData } from "@/lib/mock-data"

export default function AdminStudents() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStudent, setSelectedStudent] = useState<any>(null)
  const [userTypeFilter, setUserTypeFilter] = useState("all")
  const [servicesFilter, setServicesFilter] = useState("all")

  const students = mockData.students

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesUserType =
      userTypeFilter === "all" ||
      (student.userType && student.userType.includes(userTypeFilter as any))

    const matchesServices =
      servicesFilter === "all" ||
      (servicesFilter === "counseling" && student.applications?.length > 0) ||
      (servicesFilter === "psychometric" && student.services?.psychometricTests) ||
      (servicesFilter === "interviews" && student.services?.mockInterviews) ||
      (servicesFilter === "loans" && student.services?.loans) ||
      (servicesFilter === "training" && student.services?.training) ||
      (servicesFilter === "community" && student.communityActivity) ||
      (servicesFilter === "jobs" && student.jobsPortal)

    return matchesSearch && matchesUserType && matchesServices
  })

  const getUserTypeBadge = (type: string) => {
    const colors: Record<string, string> = {
      counseling_client: "bg-blue-100 text-blue-800",
      community_member: "bg-green-100 text-green-800",
      job_seeker: "bg-purple-100 text-purple-800",
      early_explorer: "bg-amber-100 text-amber-800",
    }
    return colors[type] || "bg-gray-100 text-gray-800"
  }

  const getServiceIcons = (student: any) => {
    const icons = []
    if (student.applications?.length > 0) icons.push({ icon: GraduationCap, tooltip: "Counseling Client" })
    if (student.communityActivity) icons.push({ icon: Users, tooltip: "Community Member" })
    if (student.jobsPortal) icons.push({ icon: Briefcase, tooltip: "Job Seeker" })
    if (student.services?.psychometricTests) icons.push({ icon: Target, tooltip: "Psychometric Tests" })
    if (student.services?.mockInterviews) icons.push({ icon: ClipboardCheck, tooltip: "Mock Interviews" })
    if (student.services?.loans) icons.push({ icon: DollarSign, tooltip: "Loans" })
    if (student.services?.training) icons.push({ icon: BookOpen, tooltip: "Training" })
    return icons
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Students</h1>
          <p className="text-gray-600">Manage student profiles and services</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700" asChild>
          <Link href="/admin/students/new">
            <UserPlus className="w-4 h-4 mr-2" />
            Add Student
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{students.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Counseling Clients</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {students.filter((s) => s.userType?.includes("counseling_client")).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Community Members</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {students.filter((s) => s.userType?.includes("community_member")).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Job Seekers</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {students.filter((s) => s.userType?.includes("job_seeker")).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search by name, email, student ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={userTypeFilter} onValueChange={setUserTypeFilter}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="User Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All User Types</SelectItem>
                <SelectItem value="counseling_client">Counseling Clients</SelectItem>
                <SelectItem value="community_member">Community Members</SelectItem>
                <SelectItem value="job_seeker">Job Seekers</SelectItem>
                <SelectItem value="early_explorer">Early Explorers</SelectItem>
              </SelectContent>
            </Select>
            <Select value={servicesFilter} onValueChange={setServicesFilter}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Services Used" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Services</SelectItem>
                <SelectItem value="counseling">Counseling</SelectItem>
                <SelectItem value="psychometric">Psychometric Tests</SelectItem>
                <SelectItem value="interviews">Mock Interviews</SelectItem>
                <SelectItem value="loans">Loans</SelectItem>
                <SelectItem value="training">Training</SelectItem>
                <SelectItem value="community">Community</SelectItem>
                <SelectItem value="jobs">Jobs Portal</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full lg:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Students Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>All Students ({filteredStudents.length})</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="text-left p-4 text-sm font-semibold text-gray-700">Student Info</th>
                      <th className="text-left p-4 text-sm font-semibold text-gray-700">User Type</th>
                      <th className="text-left p-4 text-sm font-semibold text-gray-700">Services</th>
                      <th className="text-left p-4 text-sm font-semibold text-gray-700">Study Intent</th>
                      <th className="text-left p-4 text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((student) => (
                      <tr
                        key={student.id}
                        className="border-b hover:bg-blue-50 cursor-pointer"
                        onClick={() => setSelectedStudent(student)}
                      >
                        <td className="p-4">
                          <div>
                            <p className="font-semibold text-gray-900">{student.name}</p>
                            <p className="text-sm text-gray-600">{student.id}</p>
                            <div className="flex items-center text-xs text-gray-500 mt-1">
                              <Mail className="w-3 h-3 mr-1" />
                              {student.email}
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex flex-wrap gap-1">
                            {student.userType?.map((type) => (
                              <Badge key={type} className={`${getUserTypeBadge(type)} text-xs`}>
                                {type.replace("_", " ")}
                              </Badge>
                            ))}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            {getServiceIcons(student).map((service, idx) => (
                              <div
                                key={idx}
                                className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center"
                                title={service.tooltip}
                              >
                                <service.icon className="w-4 h-4 text-blue-600" />
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="p-4">
                          <div>
                            <p className="text-sm font-medium text-gray-900 capitalize">
                              {student.studyIntent?.replace("_", " ") || "Exploring"}
                            </p>
                            {student.educationLevel && (
                              <p className="text-xs text-gray-600">{student.educationLevel}</p>
                            )}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
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

        <div className="lg:col-span-1">
          {selectedStudent ? (
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Student Details</span>
                  <Button variant="ghost" size="sm" onClick={() => setSelectedStudent(null)}>
                    ✕
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="overview">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="services">Services</TabsTrigger>
                    <TabsTrigger value="community">Activity</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-4 mt-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Personal Information</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Name:</span>
                          <span className="font-medium">{selectedStudent.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Email:</span>
                          <span className="font-medium text-xs">{selectedStudent.email}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Phone:</span>
                          <span className="font-medium">{selectedStudent.phone}</span>
                        </div>
                      </div>
                    </div>

                    {selectedStudent.applications?.length > 0 && (
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Study Plans</h3>
                        <div className="space-y-2">
                          {selectedStudent.applications.slice(0, 2).map((app: any) => (
                            <div key={app.id} className="p-3 bg-gray-50 rounded-lg">
                              <p className="text-sm font-semibold text-gray-900">{app.college}</p>
                              <p className="text-xs text-gray-600">{app.course}</p>
                              <Badge className="mt-1 text-xs bg-green-100 text-green-800">{app.status}</Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="services" className="space-y-4 mt-4">
                    {/* Psychometric Tests */}
                    {selectedStudent.services?.psychometricTests && (
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                          <Target className="w-4 h-4 mr-2 text-blue-600" />
                          Psychometric Tests
                        </h3>
                        {selectedStudent.services.psychometricTests.map((test: any, idx: number) => (
                          <div key={idx} className="p-3 bg-gray-50 rounded-lg mb-2">
                            <p className="text-sm font-medium">{test.testName}</p>
                            <div className="flex items-center justify-between mt-1">
                              <span className="text-xs text-gray-600">{test.date}</span>
                              <Badge className="bg-blue-100 text-blue-800 text-xs">Score: {test.score}</Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Mock Interviews */}
                    {selectedStudent.services?.mockInterviews && (
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                          <ClipboardCheck className="w-4 h-4 mr-2 text-purple-600" />
                          Mock Interviews
                        </h3>
                        {selectedStudent.services.mockInterviews.map((interview: any, idx: number) => (
                          <div key={idx} className="p-3 bg-gray-50 rounded-lg mb-2">
                            <p className="text-sm font-medium">{interview.interviewType}</p>
                            <div className="flex items-center justify-between mt-1">
                              <span className="text-xs text-gray-600">{interview.date}</span>
                              <Badge className="bg-purple-100 text-purple-800 text-xs">
                                Rating: {interview.rating}/10
                              </Badge>
                            </div>
                            <p className="text-xs text-gray-600 mt-1">{interview.feedback}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Loans */}
                    {selectedStudent.services?.loans && (
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                          <DollarSign className="w-4 h-4 mr-2 text-green-600" />
                          Loan Applications
                        </h3>
                        {selectedStudent.services.loans.map((loan: any, idx: number) => (
                          <div key={idx} className="p-3 bg-gray-50 rounded-lg mb-2">
                            <p className="text-sm font-medium">{loan.loanProvider}</p>
                            <div className="flex items-center justify-between mt-1">
                              <span className="text-xs text-gray-600">{loan.amount}</span>
                              <Badge
                                className={`text-xs ${
                                  loan.status === "approved"
                                    ? "bg-green-100 text-green-800"
                                    : loan.status === "rejected"
                                      ? "bg-red-100 text-red-800"
                                      : "bg-amber-100 text-amber-800"
                                }`}
                              >
                                {loan.status}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Training Programs */}
                    {selectedStudent.services?.training && (
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                          <BookOpen className="w-4 h-4 mr-2 text-indigo-600" />
                          Training Programs
                        </h3>
                        {selectedStudent.services.training.map((training: any, idx: number) => (
                          <div key={idx} className="p-3 bg-gray-50 rounded-lg mb-2">
                            <p className="text-sm font-medium">{training.programName}</p>
                            <Progress value={training.progress} className="mt-2 h-2" />
                            <div className="flex items-center justify-between mt-1">
                              <span className="text-xs text-gray-600">
                                {training.startDate} - {training.endDate}
                              </span>
                              <span className="text-xs font-medium">{training.progress}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Campus Visits */}
                    {selectedStudent.services?.campusVisits && (
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                          <MapPin className="w-4 h-4 mr-2 text-orange-600" />
                          Campus Visits
                        </h3>
                        {selectedStudent.services.campusVisits.map((visit: any, idx: number) => (
                          <div key={idx} className="p-3 bg-gray-50 rounded-lg mb-2">
                            <p className="text-sm font-medium">{visit.college}</p>
                            <div className="flex items-center justify-between mt-1">
                              <span className="text-xs text-gray-600">{visit.visitDate}</span>
                              <Badge className="bg-orange-100 text-orange-800 text-xs capitalize">{visit.type}</Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="community" className="space-y-4 mt-4">
                    {/* Community Activity */}
                    {selectedStudent.communityActivity && (
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                          <Users className="w-4 h-4 mr-2 text-blue-600" />
                          Community Activity
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="p-3 bg-blue-50 rounded-lg">
                            <p className="text-2xl font-bold text-blue-600">
                              {selectedStudent.communityActivity.postsCreated}
                            </p>
                            <p className="text-xs text-gray-600">Posts Created</p>
                          </div>
                          <div className="p-3 bg-green-50 rounded-lg">
                            <p className="text-2xl font-bold text-green-600">
                              {selectedStudent.communityActivity.commentsPosted}
                            </p>
                            <p className="text-xs text-gray-600">Comments</p>
                          </div>
                          <div className="p-3 bg-purple-50 rounded-lg">
                            <p className="text-2xl font-bold text-purple-600">
                              {selectedStudent.communityActivity.groupsMembership?.length || 0}
                            </p>
                            <p className="text-xs text-gray-600">Groups</p>
                          </div>
                          <div className="p-3 bg-amber-50 rounded-lg">
                            <p className="text-2xl font-bold text-amber-600">
                              {selectedStudent.communityActivity.reputation}
                            </p>
                            <p className="text-xs text-gray-600">Reputation</p>
                          </div>
                        </div>
                        <div className="mt-3">
                          <p className="text-xs text-gray-600">
                            Last Active: {selectedStudent.communityActivity.lastActive}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Jobs Portal Activity */}
                    {selectedStudent.jobsPortal && (
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                          <Briefcase className="w-4 h-4 mr-2 text-purple-600" />
                          Jobs Portal
                        </h3>
                        <div className="space-y-2">
                          <div className="p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-600">Applications Submitted</p>
                            <p className="text-xl font-bold text-gray-900">
                              {selectedStudent.jobsPortal.applicationsSubmitted}
                            </p>
                          </div>
                          <div className="p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-600 mb-2">Companies Interested</p>
                            <div className="flex flex-wrap gap-1">
                              {selectedStudent.jobsPortal.companiesInterested?.map((company: string) => (
                                <Badge key={company} className="bg-purple-100 text-purple-800 text-xs">
                                  {company}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          {selectedStudent.jobsPortal.externalProfileLink && (
                            <Button variant="outline" size="sm" className="w-full" asChild>
                              <a
                                href={selectedStudent.jobsPortal.externalProfileLink}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <ExternalLink className="w-4 h-4 mr-2" />
                                View LinkedIn Profile
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ) : (
            <Card className="sticky top-24">
              <CardContent className="p-12 text-center">
                <GraduationCap className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Select a student to view details</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
