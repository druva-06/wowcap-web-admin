"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Search, Eye, UserPlus, Phone, Mail, FileText } from "lucide-react"
import Link from "next/link"

export default function SubAgentStudents() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [addStudentOpen, setAddStudentOpen] = useState(false)
  const [viewStudentOpen, setViewStudentOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<any>(null)

  const students = [
    {
      id: "1",
      name: "Amit Kumar",
      email: "amit.k@email.com",
      phone: "+91 9876543210",
      status: "Application Submitted",
      university: "University of Toronto",
      course: "Computer Science",
      intake: "Fall 2025",
      commission: "₹45,000",
    },
    {
      id: "2",
      name: "Priya Sharma",
      email: "priya.s@email.com",
      phone: "+91 9876543211",
      status: "Offer Received",
      university: "University of Melbourne",
      course: "MBA",
      intake: "Fall 2025",
      commission: "₹55,000",
    },
    {
      id: "3",
      name: "Rahul Patel",
      email: "rahul.p@email.com",
      phone: "+91 9876543212",
      status: "Documents Pending",
      university: "University of Manchester",
      course: "Engineering",
      intake: "Spring 2026",
      commission: "₹40,000",
    },
  ]

  const getStatusColor = (status: string) => {
    if (status.includes("Offer")) return "bg-green-100 text-green-700"
    if (status.includes("Pending")) return "bg-yellow-100 text-yellow-700"
    if (status.includes("Submitted")) return "bg-blue-100 text-blue-700"
    return "bg-gray-100 text-gray-700"
  }

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.university.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || student.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href="/subagent/dashboard">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center cursor-pointer">
                  <span className="text-white font-bold text-lg">W</span>
                </div>
              </Link>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Student Management</h1>
                <p className="text-sm text-gray-600">Manage your student applications</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Dialog open={addStudentOpen} onOpenChange={setAddStudentOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add Student
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add New Student</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>Student Name</Label>
                      <Input placeholder="Enter student name" />
                    </div>
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input type="email" placeholder="student@email.com" />
                    </div>
                    <div className="space-y-2">
                      <Label>Phone</Label>
                      <Input placeholder="+91 9876543210" />
                    </div>
                    <div className="space-y-2">
                      <Label>Interested Country</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="usa">USA</SelectItem>
                          <SelectItem value="uk">UK</SelectItem>
                          <SelectItem value="canada">Canada</SelectItem>
                          <SelectItem value="australia">Australia</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setAddStudentOpen(false)}>
                        Cancel
                      </Button>
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white">Add Student</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              <Link href="/login">
                <Button variant="ghost" size="sm">
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
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search by name, email, or university..."
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
                    <SelectItem value="Application Submitted">Application Submitted</SelectItem>
                    <SelectItem value="Offer Received">Offer Received</SelectItem>
                    <SelectItem value="Documents Pending">Documents Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Students Table */}
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Student</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Contact</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                        University & Course
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Commission</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredStudents.map((student) => (
                      <tr key={student.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-blue-600 font-semibold text-sm">{student.name.charAt(0)}</span>
                            </div>
                            <p className="font-semibold text-gray-900">{student.name}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div>
                            <p className="text-sm text-gray-900 flex items-center">
                              <Mail className="w-3 h-3 mr-1 text-gray-400" />
                              {student.email}
                            </p>
                            <p className="text-sm text-gray-500 flex items-center mt-1">
                              <Phone className="w-3 h-3 mr-1 text-gray-400" />
                              {student.phone}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div>
                            <p className="font-medium text-gray-900">{student.university}</p>
                            <p className="text-sm text-gray-500">
                              {student.course} • {student.intake}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <Badge className={getStatusColor(student.status)}>{student.status}</Badge>
                        </td>
                        <td className="px-4 py-3">
                          <p className="font-semibold text-gray-900">{student.commission}</p>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <Dialog
                              open={viewStudentOpen && selectedStudent?.id === student.id}
                              onOpenChange={setViewStudentOpen}
                            >
                              <DialogTrigger asChild>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-8 w-8 p-0"
                                  onClick={() => setSelectedStudent(student)}
                                >
                                  <Eye className="w-4 h-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle>Student Details - {selectedStudent?.name}</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label className="text-xs text-gray-500">Email</Label>
                                      <p className="text-sm font-medium">{selectedStudent?.email}</p>
                                    </div>
                                    <div>
                                      <Label className="text-xs text-gray-500">Phone</Label>
                                      <p className="text-sm font-medium">{selectedStudent?.phone}</p>
                                    </div>
                                    <div>
                                      <Label className="text-xs text-gray-500">University</Label>
                                      <p className="text-sm font-medium">{selectedStudent?.university}</p>
                                    </div>
                                    <div>
                                      <Label className="text-xs text-gray-500">Course</Label>
                                      <p className="text-sm font-medium">{selectedStudent?.course}</p>
                                    </div>
                                    <div>
                                      <Label className="text-xs text-gray-500">Intake</Label>
                                      <p className="text-sm font-medium">{selectedStudent?.intake}</p>
                                    </div>
                                    <div>
                                      <Label className="text-xs text-gray-500">Commission</Label>
                                      <p className="text-sm font-medium">{selectedStudent?.commission}</p>
                                    </div>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                            <Button size="sm" variant="outline" className="h-8 bg-transparent">
                              <FileText className="w-4 h-4 mr-1" />
                              Documents
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
      </div>
    </div>
  )
}
