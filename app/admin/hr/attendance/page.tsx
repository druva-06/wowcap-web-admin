"use client"

import { useState } from "react"
import { Download, Calendar, CheckCircle, XCircle, Clock, Filter, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AttendancePage() {
  const [monthFilter, setMonthFilter] = useState("february")
  const [searchQuery, setSearchQuery] = useState("")

  const attendanceData = [
    {
      id: 1,
      employeeName: "Amit Kumar",
      employeeId: "EMP001",
      role: "Senior Counselor",
      branch: "Mumbai",
      present: 20,
      absent: 2,
      halfDay: 1,
      late: 3,
      totalDays: 23,
      percentage: 87,
    },
    {
      id: 2,
      employeeName: "Priya Sharma",
      employeeId: "EMP002",
      role: "Counselor",
      branch: "Delhi",
      present: 22,
      absent: 0,
      halfDay: 1,
      late: 1,
      totalDays: 23,
      percentage: 96,
    },
    {
      id: 3,
      employeeName: "Rahul Verma",
      employeeId: "EMP003",
      role: "Counselor",
      branch: "Bangalore",
      present: 21,
      absent: 1,
      halfDay: 1,
      late: 2,
      totalDays: 23,
      percentage: 91,
    },
    {
      id: 4,
      employeeName: "Sneha Patel",
      employeeId: "EMP004",
      role: "Junior Counselor",
      branch: "Mumbai",
      present: 19,
      absent: 3,
      halfDay: 1,
      late: 4,
      totalDays: 23,
      percentage: 83,
    },
    {
      id: 5,
      employeeName: "Vikram Singh",
      employeeId: "EMP005",
      role: "Senior Counselor",
      branch: "Delhi",
      present: 23,
      absent: 0,
      halfDay: 0,
      late: 0,
      totalDays: 23,
      percentage: 100,
    },
  ]

  const stats = {
    avgAttendance: 91,
    totalPresent: attendanceData.reduce((sum, emp) => sum + emp.present, 0),
    totalAbsent: attendanceData.reduce((sum, emp) => sum + emp.absent, 0),
    perfectAttendance: attendanceData.filter((emp) => emp.percentage === 100).length,
  }

  const filteredData = attendanceData.filter((emp) =>
    emp.employeeName.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getAttendanceColor = (percentage: number) => {
    if (percentage >= 95) return "text-green-600"
    if (percentage >= 85) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Attendance Tracking</h1>
          <p className="text-gray-600 mt-1">Monitor employee attendance and punctuality</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Attendance</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.avgAttendance}%</p>
                <p className="text-xs text-green-600 mt-1">Above target</p>
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
                <p className="text-sm text-gray-600">Total Present</p>
                <p className="text-2xl font-bold text-green-600 mt-1">{stats.totalPresent}</p>
                <p className="text-xs text-gray-500 mt-1">This month</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center transition-transform duration-300 hover:scale-110">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Absent</p>
                <p className="text-2xl font-bold text-red-600 mt-1">{stats.totalAbsent}</p>
                <p className="text-xs text-gray-500 mt-1">This month</p>
              </div>
              <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center transition-transform duration-300 hover:scale-110">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Perfect Attendance</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.perfectAttendance}</p>
                <p className="text-xs text-gray-500 mt-1">100% attendance</p>
              </div>
              <div className="h-12 w-12 bg-amber-100 rounded-lg flex items-center justify-center transition-transform duration-300 hover:scale-110">
                <Clock className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Employee Attendance</CardTitle>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search employees..."
                  className="pl-10 w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Filter className="h-4 w-4 text-gray-500" />
              <Select value={monthFilter} onValueChange={setMonthFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="january">January 2024</SelectItem>
                  <SelectItem value="february">February 2024</SelectItem>
                  <SelectItem value="march">March 2024</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Employee</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Role</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Present</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Absent</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Half Day</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Late</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Total Days</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Attendance %</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((employee) => (
                  <tr key={employee.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-semibold text-gray-900">{employee.employeeName}</p>
                        <p className="text-sm text-gray-500">{employee.employeeId}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="secondary">{employee.role}</Badge>
                      <Badge variant="outline" className="ml-2">
                        {employee.branch}
                      </Badge>
                    </td>
                    <td className="text-center py-3 px-4">
                      <span className="inline-flex items-center justify-center w-10 h-10 bg-green-100 text-green-700 rounded-full font-semibold">
                        {employee.present}
                      </span>
                    </td>
                    <td className="text-center py-3 px-4">
                      <span className="inline-flex items-center justify-center w-10 h-10 bg-red-100 text-red-700 rounded-full font-semibold">
                        {employee.absent}
                      </span>
                    </td>
                    <td className="text-center py-3 px-4">
                      <span className="inline-flex items-center justify-center w-10 h-10 bg-yellow-100 text-yellow-700 rounded-full font-semibold">
                        {employee.halfDay}
                      </span>
                    </td>
                    <td className="text-center py-3 px-4">
                      <span className="inline-flex items-center justify-center w-10 h-10 bg-orange-100 text-orange-700 rounded-full font-semibold">
                        {employee.late}
                      </span>
                    </td>
                    <td className="text-center py-3 px-4 font-semibold text-gray-900">{employee.totalDays}</td>
                    <td className="text-center py-3 px-4">
                      <span className={`text-2xl font-bold ${getAttendanceColor(employee.percentage)}`}>
                        {employee.percentage}%
                      </span>
                    </td>
                    <td className="text-center py-3 px-4">
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
