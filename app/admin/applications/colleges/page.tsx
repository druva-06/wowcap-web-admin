"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import {
  Search,
  Filter,
  Download,
  TrendingUp,
  Users,
  DollarSign,
  CheckCircle,
  Clock,
  XCircle,
  Eye,
  Building2,
} from "lucide-react"

export default function CollegeWiseApplicationsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [countryFilter, setCountryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  // College-wise application data
  const collegeApplications = [
    {
      id: 1,
      collegeName: "Harvard University",
      country: "USA",
      logo: "/harvard.jpg",
      totalApplications: 45,
      submitted: 30,
      inReview: 8,
      offerReceived: 5,
      rejected: 2,
      successRate: 75,
      totalRevenue: "₹45.2L",
      pendingRevenue: "₹12.5L",
      avgProcessingTime: "45 days",
      popularCourses: ["MBA", "MS CS", "MS Data Science"],
    },
    {
      id: 2,
      collegeName: "Stanford University",
      country: "USA",
      logo: "/stanford-campus.png",
      totalApplications: 38,
      submitted: 25,
      inReview: 10,
      offerReceived: 3,
      rejected: 0,
      successRate: 82,
      totalRevenue: "₹38.5L",
      pendingRevenue: "₹15.2L",
      avgProcessingTime: "50 days",
      popularCourses: ["MS CS", "MBA", "MS AI"],
    },
    {
      id: 3,
      collegeName: "MIT",
      country: "USA",
      logo: "/mit.jpg",
      totalApplications: 32,
      submitted: 20,
      inReview: 9,
      offerReceived: 2,
      rejected: 1,
      successRate: 70,
      totalRevenue: "₹32.8L",
      pendingRevenue: "₹10.5L",
      avgProcessingTime: "42 days",
      popularCourses: ["MS CS", "MS EE", "PhD CS"],
    },
    {
      id: 4,
      collegeName: "University of Toronto",
      country: "Canada",
      logo: "/toronto.jpg",
      totalApplications: 28,
      submitted: 18,
      inReview: 7,
      offerReceived: 3,
      rejected: 0,
      successRate: 85,
      totalRevenue: "₹22.4L",
      pendingRevenue: "₹8.2L",
      avgProcessingTime: "35 days",
      popularCourses: ["MBA", "MS CS", "MS Engineering"],
    },
    {
      id: 5,
      collegeName: "University of Melbourne",
      country: "Australia",
      logo: "/melbourne-skyline.png",
      totalApplications: 25,
      submitted: 15,
      inReview: 6,
      offerReceived: 4,
      rejected: 0,
      successRate: 90,
      totalRevenue: "₹20.5L",
      pendingRevenue: "₹6.8L",
      avgProcessingTime: "30 days",
      popularCourses: ["MBBS", "MBA", "MS Engineering"],
    },
  ]

  const filteredColleges = collegeApplications.filter((college) => {
    const matchesSearch = college.collegeName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCountry = countryFilter === "all" || college.country === countryFilter
    return matchesSearch && matchesCountry
  })

  // Calculate totals
  const totals = collegeApplications.reduce(
    (acc, college) => ({
      applications: acc.applications + college.totalApplications,
      submitted: acc.submitted + college.submitted,
      inReview: acc.inReview + college.inReview,
      offers: acc.offers + college.offerReceived,
      rejected: acc.rejected + college.rejected,
    }),
    { applications: 0, submitted: 0, inReview: 0, offers: 0, rejected: 0 },
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">College-wise Applications</h1>
          <p className="text-gray-600 mt-1">View applications grouped by college/university</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
          <Download className="w-4 h-4" />
          Export Report
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Applications</p>
                <p className="text-3xl font-bold text-gray-900">{totals.applications}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center transition-transform duration-300 hover:scale-110">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Submitted</p>
                <p className="text-3xl font-bold text-gray-900">{totals.submitted}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center transition-transform duration-300 hover:scale-110">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">In Review</p>
                <p className="text-3xl font-bold text-gray-900">{totals.inReview}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center transition-transform duration-300 hover:scale-110">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Offers</p>
                <p className="text-3xl font-bold text-gray-900">{totals.offers}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center transition-transform duration-300 hover:scale-110">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Rejected</p>
                <p className="text-3xl font-bold text-gray-900">{totals.rejected}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center transition-transform duration-300 hover:scale-110">
                <XCircle className="w-6 h-6 text-red-600" />
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
                placeholder="Search by college name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11"
              />
            </div>
            <Select value={countryFilter} onValueChange={setCountryFilter}>
              <SelectTrigger className="w-full md:w-48 h-11">
                <SelectValue placeholder="Filter by country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Countries</SelectItem>
                <SelectItem value="USA">USA</SelectItem>
                <SelectItem value="Canada">Canada</SelectItem>
                <SelectItem value="Australia">Australia</SelectItem>
                <SelectItem value="UK">UK</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48 h-11">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="submitted">Submitted</SelectItem>
                <SelectItem value="in-review">In Review</SelectItem>
                <SelectItem value="offers">Offers Received</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="h-11 bg-transparent">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* College Cards */}
      <div className="space-y-4">
        {filteredColleges.map((college) => (
          <Card key={college.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* College Info */}
                <div className="flex items-start gap-4 flex-1">
                  <img
                    src={college.logo || "/placeholder.svg"}
                    alt={college.collegeName}
                    className="w-16 h-16 rounded-lg object-cover border border-gray-200"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{college.collegeName}</h3>
                        <p className="text-sm text-gray-600">{college.country}</p>
                      </div>
                      <Badge className="bg-blue-100 text-blue-700">{college.totalApplications} Applications</Badge>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                      <div className="p-3 bg-green-50 rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">Submitted</p>
                        <p className="text-xl font-bold text-green-700">{college.submitted}</p>
                      </div>
                      <div className="p-3 bg-orange-50 rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">In Review</p>
                        <p className="text-xl font-bold text-orange-700">{college.inReview}</p>
                      </div>
                      <div className="p-3 bg-purple-50 rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">Offers</p>
                        <p className="text-xl font-bold text-purple-700">{college.offerReceived}</p>
                      </div>
                      <div className="p-3 bg-red-50 rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">Rejected</p>
                        <p className="text-xl font-bold text-red-700">{college.rejected}</p>
                      </div>
                    </div>

                    {/* Success Rate */}
                    <div className="mt-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Success Rate</span>
                        <span className="text-sm font-semibold text-green-600">{college.successRate}%</span>
                      </div>
                      <Progress value={college.successRate} className="h-2" />
                    </div>

                    {/* Additional Info */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4 text-sm">
                      <div>
                        <p className="text-gray-600">Total Revenue</p>
                        <p className="font-semibold text-gray-900">{college.totalRevenue}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Pending Revenue</p>
                        <p className="font-semibold text-gray-900">{college.pendingRevenue}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Avg Processing</p>
                        <p className="font-semibold text-gray-900">{college.avgProcessingTime}</p>
                      </div>
                    </div>

                    {/* Popular Courses */}
                    <div className="mt-4">
                      <p className="text-xs text-gray-600 mb-2">Popular Courses</p>
                      <div className="flex flex-wrap gap-2">
                        {college.popularCourses.map((course, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {course}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 lg:w-48">
                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700 gap-2"
                    onClick={() => router.push(`/admin/colleges/${college.id}`)}
                  >
                    <Eye className="w-4 h-4" />
                    View Details
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full bg-transparent gap-2"
                    onClick={() => router.push(`/admin/applications?college=${college.id}`)}
                  >
                    <Building2 className="w-4 h-4" />
                    View Applications
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent gap-2">
                    <DollarSign className="w-4 h-4" />
                    Revenue Report
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
