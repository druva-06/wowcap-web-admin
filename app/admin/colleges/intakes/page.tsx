"use client"

import { useState } from "react"
import { Calendar, Search, Plus, Download, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function IntakeCalendarPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterMonth, setFilterMonth] = useState("all")
  const [filterCountry, setFilterCountry] = useState("all")

  const intakes = [
    {
      id: 1,
      college: "Harvard University",
      country: "USA",
      intake: "Fall 2025",
      month: "September",
      date: "Sep 1, 2025",
      applicationDeadline: "Jan 15, 2025",
      courses: 45,
      status: "Open",
      daysLeft: 87,
    },
    {
      id: 2,
      college: "Stanford University",
      country: "USA",
      intake: "Fall 2025",
      month: "September",
      date: "Sep 15, 2025",
      applicationDeadline: "Jan 31, 2025",
      courses: 38,
      status: "Open",
      daysLeft: 103,
    },
    {
      id: 3,
      college: "Stanford University",
      country: "USA",
      intake: "Spring 2026",
      month: "January",
      date: "Jan 10, 2026",
      applicationDeadline: "Sep 1, 2025",
      courses: 25,
      status: "Upcoming",
      daysLeft: 225,
    },
    {
      id: 4,
      college: "MIT",
      country: "USA",
      intake: "Fall 2025",
      month: "September",
      date: "Sep 1, 2025",
      applicationDeadline: "Jan 1, 2025",
      courses: 32,
      status: "Open",
      daysLeft: 73,
    },
    {
      id: 5,
      college: "University of Toronto",
      country: "Canada",
      intake: "Fall 2025",
      month: "September",
      date: "Sep 5, 2025",
      applicationDeadline: "Feb 1, 2025",
      courses: 28,
      status: "Open",
      daysLeft: 104,
    },
    {
      id: 6,
      college: "University of Toronto",
      country: "Canada",
      intake: "Winter 2026",
      month: "January",
      date: "Jan 8, 2026",
      applicationDeadline: "Oct 1, 2025",
      courses: 18,
      status: "Upcoming",
      daysLeft: 255,
    },
    {
      id: 7,
      college: "University of Melbourne",
      country: "Australia",
      intake: "Semester 1, 2025",
      month: "February",
      date: "Feb 24, 2025",
      applicationDeadline: "Nov 30, 2024",
      courses: 25,
      status: "Closed",
      daysLeft: 0,
    },
    {
      id: 8,
      college: "University of Melbourne",
      country: "Australia",
      intake: "Semester 2, 2025",
      month: "July",
      date: "Jul 28, 2025",
      applicationDeadline: "May 31, 2025",
      courses: 22,
      status: "Open",
      daysLeft: 153,
    },
    {
      id: 9,
      college: "University of British Columbia",
      country: "Canada",
      intake: "Fall 2025",
      month: "September",
      date: "Sep 3, 2025",
      applicationDeadline: "Jan 15, 2025",
      courses: 22,
      status: "Open",
      daysLeft: 87,
    },
    {
      id: 10,
      college: "IIM Ahmedabad",
      country: "India",
      intake: "June 2025",
      month: "June",
      date: "Jun 15, 2025",
      applicationDeadline: "Mar 31, 2025",
      courses: 12,
      status: "Open",
      daysLeft: 122,
    },
    {
      id: 11,
      college: "BITS Pilani",
      country: "India",
      intake: "August 2025",
      month: "August",
      date: "Aug 1, 2025",
      applicationDeadline: "Jun 30, 2025",
      courses: 18,
      status: "Upcoming",
      daysLeft: 183,
    },
    {
      id: 12,
      college: "Manipal University",
      country: "India",
      intake: "July 2025",
      month: "July",
      date: "Jul 15, 2025",
      applicationDeadline: "May 15, 2025",
      courses: 35,
      status: "Open",
      daysLeft: 137,
    },
  ]

  const stats = [
    { title: "Total Intakes", value: intakes.length, color: "text-blue-600", bgColor: "bg-blue-100" },
    {
      title: "Open for Applications",
      value: intakes.filter((i) => i.status === "Open").length,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Upcoming Intakes",
      value: intakes.filter((i) => i.status === "Upcoming").length,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Closed Intakes",
      value: intakes.filter((i) => i.status === "Closed").length,
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
  ]

  const filteredIntakes = intakes.filter((intake) => {
    const matchesSearch =
      intake.college.toLowerCase().includes(searchQuery.toLowerCase()) ||
      intake.intake.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesMonth = filterMonth === "all" || intake.month === filterMonth
    const matchesCountry = filterCountry === "all" || intake.country === filterCountry
    return matchesSearch && matchesMonth && matchesCountry
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-green-100 text-green-700 border-green-200"
      case "Upcoming":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "Closed":
        return "bg-red-100 text-red-700 border-red-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Intake Calendar</h1>
          <p className="text-gray-600 mt-1">Track application deadlines and intake dates</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Calendar
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Intake
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-lg transition-transform duration-300 hover:scale-110`}>
                  <Calendar className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by college or intake..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={filterMonth} onValueChange={setFilterMonth}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Months</SelectItem>
                <SelectItem value="January">January</SelectItem>
                <SelectItem value="February">February</SelectItem>
                <SelectItem value="June">June</SelectItem>
                <SelectItem value="July">July</SelectItem>
                <SelectItem value="August">August</SelectItem>
                <SelectItem value="September">September</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterCountry} onValueChange={setFilterCountry}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Countries</SelectItem>
                <SelectItem value="USA">USA</SelectItem>
                <SelectItem value="Canada">Canada</SelectItem>
                <SelectItem value="Australia">Australia</SelectItem>
                <SelectItem value="India">India</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {filteredIntakes.map((intake) => (
          <Card key={intake.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <Calendar className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{intake.college}</h3>
                      <p className="text-sm text-gray-600">{intake.country}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
                    <div>
                      <div className="text-xs text-gray-600">Intake Period</div>
                      <div className="text-sm font-semibold text-gray-900 mt-1">{intake.intake}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-600">Start Date</div>
                      <div className="text-sm font-semibold text-gray-900 mt-1">{intake.date}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-600">Application Deadline</div>
                      <div className="text-sm font-semibold text-red-600 mt-1">{intake.applicationDeadline}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-600">Available Courses</div>
                      <div className="text-sm font-semibold text-gray-900 mt-1">{intake.courses}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-600">Days Left</div>
                      <div className="text-sm font-semibold text-orange-600 mt-1 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {intake.daysLeft > 0 ? `${intake.daysLeft} days` : "Closed"}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <Badge className={getStatusColor(intake.status)}>{intake.status}</Badge>
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
