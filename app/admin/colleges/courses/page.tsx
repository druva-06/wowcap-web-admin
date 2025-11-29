"use client"

import { useState } from "react"
import { Search, Plus, Download, BookOpen, Clock, DollarSign, GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function CourseCatalogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterCollege, setFilterCollege] = useState("all")
  const [filterLevel, setFilterLevel] = useState("all")
  const [filterCountry, setFilterCountry] = useState("all")

  const courses = [
    {
      id: 1,
      name: "Master of Business Administration (MBA)",
      college: "Harvard University",
      country: "USA",
      level: "Postgraduate",
      duration: "2 Years",
      tuitionFee: "$73,440/year",
      commission: "15%",
      intakes: "Fall (Sep)",
      status: "Active",
      applications: 12,
    },
    {
      id: 2,
      name: "Master of Science in Computer Science",
      college: "Stanford University",
      country: "USA",
      level: "Postgraduate",
      duration: "2 Years",
      tuitionFee: "$58,416/year",
      commission: "12%",
      intakes: "Fall (Sep), Spring (Jan)",
      status: "Active",
      applications: 18,
    },
    {
      id: 3,
      name: "Bachelor of Engineering in Electrical Engineering",
      college: "MIT",
      country: "USA",
      level: "Undergraduate",
      duration: "4 Years",
      tuitionFee: "$55,510/year",
      commission: "18%",
      intakes: "Fall (Sep)",
      status: "Active",
      applications: 8,
    },
    {
      id: 4,
      name: "Master of Data Science",
      college: "University of Toronto",
      country: "Canada",
      level: "Postgraduate",
      duration: "1.5 Years",
      tuitionFee: "CAD 45,690/year",
      commission: "Service Charge: ₹75K",
      intakes: "Fall (Sep), Winter (Jan)",
      status: "Active",
      applications: 15,
    },
    {
      id: 5,
      name: "Bachelor of Commerce",
      college: "University of Melbourne",
      country: "Australia",
      level: "Undergraduate",
      duration: "3 Years",
      tuitionFee: "AUD 44,256/year",
      commission: "20%",
      intakes: "Semester 1 (Feb), Semester 2 (Jul)",
      status: "Active",
      applications: 10,
    },
    {
      id: 6,
      name: "Master of Public Health",
      college: "University of British Columbia",
      country: "Canada",
      level: "Postgraduate",
      duration: "2 Years",
      tuitionFee: "CAD 38,400/year",
      commission: "10% + ₹40K",
      intakes: "Fall (Sep)",
      status: "Active",
      applications: 7,
    },
    {
      id: 7,
      name: "Post Graduate Programme in Management",
      college: "IIM Ahmedabad",
      country: "India",
      level: "Postgraduate",
      duration: "2 Years",
      tuitionFee: "₹33,00,000 (total)",
      commission: "Service Charge: ₹1.5L",
      intakes: "June",
      status: "Active",
      applications: 5,
    },
    {
      id: 8,
      name: "B.E. in Computer Science",
      college: "BITS Pilani",
      country: "India",
      level: "Undergraduate",
      duration: "4 Years",
      tuitionFee: "₹4,69,000/year",
      commission: "8%",
      intakes: "August",
      status: "Active",
      applications: 12,
    },
    {
      id: 9,
      name: "Bachelor of Technology in Information Technology",
      college: "Manipal University",
      country: "India",
      level: "Undergraduate",
      duration: "4 Years",
      tuitionFee: "₹3,50,000/year",
      commission: "5% + ₹25K",
      intakes: "July",
      status: "Active",
      applications: 20,
    },
    {
      id: 10,
      name: "Machine Learning Specialization",
      college: "Coursera",
      country: "Global",
      level: "Certificate",
      duration: "3 Months",
      tuitionFee: "$49/month",
      commission: "25%",
      intakes: "Rolling",
      status: "Active",
      applications: 45,
    },
    {
      id: 11,
      name: "Master of Laws (LLM)",
      college: "University of Oxford",
      country: "UK",
      level: "Postgraduate",
      duration: "1 Year",
      tuitionFee: "£32,740/year",
      commission: "14%",
      intakes: "October",
      status: "Active",
      applications: 6,
    },
    {
      id: 12,
      name: "Bachelor of Arts in Economics",
      college: "University of Cambridge",
      country: "UK",
      level: "Undergraduate",
      duration: "3 Years",
      tuitionFee: "£24,507/year",
      commission: "16%",
      intakes: "October",
      status: "Active",
      applications: 9,
    },
    {
      id: 13,
      name: "Master of Engineering in Mechanical Engineering",
      college: "University of Toronto",
      country: "Canada",
      level: "Postgraduate",
      duration: "2 Years",
      tuitionFee: "CAD 52,560/year",
      commission: "Service Charge: ₹75K",
      intakes: "Fall (Sep), Winter (Jan), Summer (May)",
      status: "Active",
      applications: 11,
    },
    {
      id: 14,
      name: "Bachelor of Science in Nursing",
      college: "University of Melbourne",
      country: "Australia",
      level: "Undergraduate",
      duration: "3 Years",
      tuitionFee: "AUD 38,976/year",
      commission: "20%",
      intakes: "Semester 1 (Feb)",
      status: "Active",
      applications: 8,
    },
    {
      id: 15,
      name: "MBA in Digital Marketing",
      college: "edX",
      country: "Global",
      level: "Certificate",
      duration: "6 Months",
      tuitionFee: "$299 (one-time)",
      commission: "30%",
      intakes: "Rolling",
      status: "Active",
      applications: 32,
    },
  ]

  const stats = [
    {
      title: "Total Courses",
      value: courses.length,
      icon: BookOpen,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Active Courses",
      value: courses.filter((c) => c.status === "Active").length,
      icon: GraduationCap,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Total Applications",
      value: courses.reduce((sum, course) => sum + course.applications, 0),
      icon: Clock,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Avg Commission",
      value: "15.2%",
      icon: DollarSign,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ]

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.college.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCollege = filterCollege === "all" || course.college === filterCollege
    const matchesLevel = filterLevel === "all" || course.level === filterLevel
    const matchesCountry = filterCountry === "all" || course.country === filterCountry
    return matchesSearch && matchesCollege && matchesLevel && matchesCountry
  })

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Course Catalog</h1>
          <p className="text-gray-600 mt-1">Browse and manage courses from partner colleges</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Course
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
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
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
                placeholder="Search by course name or college..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={filterCountry} onValueChange={setFilterCountry}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Countries</SelectItem>
                <SelectItem value="USA">USA</SelectItem>
                <SelectItem value="Canada">Canada</SelectItem>
                <SelectItem value="Australia">Australia</SelectItem>
                <SelectItem value="UK">UK</SelectItem>
                <SelectItem value="India">India</SelectItem>
                <SelectItem value="Global">Global</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterLevel} onValueChange={setFilterLevel}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="Undergraduate">Undergraduate</SelectItem>
                <SelectItem value="Postgraduate">Postgraduate</SelectItem>
                <SelectItem value="Certificate">Certificate</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course Name</TableHead>
                <TableHead>College</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Tuition Fee</TableHead>
                <TableHead>Commission</TableHead>
                <TableHead>Intakes</TableHead>
                <TableHead>Applications</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCourses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell className="font-medium">{course.name}</TableCell>
                  <TableCell>{course.college}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{course.level}</Badge>
                  </TableCell>
                  <TableCell>{course.duration}</TableCell>
                  <TableCell>{course.tuitionFee}</TableCell>
                  <TableCell className="text-green-600 font-semibold">{course.commission}</TableCell>
                  <TableCell className="text-sm">{course.intakes}</TableCell>
                  <TableCell>{course.applications}</TableCell>
                  <TableCell>
                    <Badge className="bg-green-100 text-green-700 border-green-200">{course.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline">
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
