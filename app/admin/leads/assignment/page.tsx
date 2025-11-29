"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, User, Search, UserCheck, TrendingUp, Target } from "lucide-react"

export default function LeadAssignmentPage() {
  const router = useRouter()
  const [selectedLeads, setSelectedLeads] = useState<string[]>([])
  const [selectedCounselor, setSelectedCounselor] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  // Sample counselors data
  const counselors = [
    {
      id: "1",
      name: "Amit Counselor",
      email: "amit@wowcap.com",
      role: "Senior Counselor",
      specialization: "USA & Canada",
      activeLeads: 12,
      maxCapacity: 20,
      conversionRate: 85,
      avgResponseTime: "2 hours",
      status: "Available",
      performance: "Excellent",
    },
    {
      id: "2",
      name: "Priya Counselor",
      email: "priya@wowcap.com",
      role: "Senior Counselor",
      specialization: "UK & Europe",
      activeLeads: 15,
      maxCapacity: 20,
      conversionRate: 82,
      avgResponseTime: "3 hours",
      status: "Available",
      performance: "Excellent",
    },
    {
      id: "3",
      name: "Ravi Counselor",
      email: "ravi@wowcap.com",
      role: "Counselor",
      specialization: "Australia & New Zealand",
      activeLeads: 18,
      maxCapacity: 20,
      conversionRate: 78,
      avgResponseTime: "4 hours",
      status: "Busy",
      performance: "Good",
    },
    {
      id: "4",
      name: "Sneha Counselor",
      email: "sneha@wowcap.com",
      role: "Counselor",
      specialization: "USA & UK",
      activeLeads: 10,
      maxCapacity: 20,
      conversionRate: 80,
      avgResponseTime: "2.5 hours",
      status: "Available",
      performance: "Excellent",
    },
    {
      id: "5",
      name: "Rahul Counselor",
      email: "rahul@wowcap.com",
      role: "Junior Counselor",
      specialization: "General",
      activeLeads: 8,
      maxCapacity: 15,
      conversionRate: 72,
      avgResponseTime: "5 hours",
      status: "Available",
      performance: "Good",
    },
    {
      id: "6",
      name: "Anjali Counselor",
      email: "anjali@wowcap.com",
      role: "Senior Counselor",
      specialization: "Canada & Europe",
      activeLeads: 14,
      maxCapacity: 20,
      conversionRate: 88,
      avgResponseTime: "1.5 hours",
      status: "Available",
      performance: "Excellent",
    },
    {
      id: "7",
      name: "Vikram Counselor",
      email: "vikram@wowcap.com",
      role: "Counselor",
      specialization: "Australia",
      activeLeads: 16,
      maxCapacity: 20,
      conversionRate: 75,
      avgResponseTime: "3.5 hours",
      status: "Busy",
      performance: "Good",
    },
    {
      id: "8",
      name: "Neha Counselor",
      email: "neha@wowcap.com",
      role: "Junior Counselor",
      specialization: "UK",
      activeLeads: 6,
      maxCapacity: 15,
      conversionRate: 70,
      avgResponseTime: "4 hours",
      status: "Available",
      performance: "Average",
    },
    {
      id: "9",
      name: "Karan Counselor",
      email: "karan@wowcap.com",
      role: "Senior Counselor",
      specialization: "USA",
      activeLeads: 13,
      maxCapacity: 20,
      conversionRate: 86,
      avgResponseTime: "2 hours",
      status: "Available",
      performance: "Excellent",
    },
    {
      id: "10",
      name: "Pooja Counselor",
      email: "pooja@wowcap.com",
      role: "Counselor",
      specialization: "Canada",
      activeLeads: 11,
      maxCapacity: 20,
      conversionRate: 79,
      avgResponseTime: "3 hours",
      status: "Available",
      performance: "Good",
    },
  ]

  // Sample unassigned leads
  const unassignedLeads = [
    {
      id: "L001",
      name: "Rahul Kumar",
      email: "rahul.k@email.com",
      phone: "+91 98765 11111",
      country: "USA",
      course: "Computer Science - MS",
      status: "HOT",
      score: 92,
      source: "Website",
    },
    {
      id: "L002",
      name: "Anita Desai",
      email: "anita.d@email.com",
      phone: "+91 98765 22222",
      country: "UK",
      course: "MBA",
      status: "Warm",
      score: 78,
      source: "Facebook Ads",
    },
    {
      id: "L003",
      name: "Suresh Patel",
      email: "suresh.p@email.com",
      phone: "+91 98765 33333",
      country: "Canada",
      course: "Data Science - MS",
      status: "HOT",
      score: 88,
      source: "Google Ads",
    },
  ]

  const handleAssign = () => {
    if (selectedLeads.length === 0) {
      alert("Please select at least one lead")
      return
    }
    if (!selectedCounselor) {
      alert("Please select a counselor")
      return
    }
    console.log("[v0] Assigning leads:", selectedLeads, "to counselor:", selectedCounselor)
    alert(`Successfully assigned ${selectedLeads.length} lead(s)`)
    router.push("/admin/leads")
  }

  const toggleLeadSelection = (leadId: string) => {
    setSelectedLeads((prev) => (prev.includes(leadId) ? prev.filter((id) => id !== leadId) : [...prev, leadId]))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-700 border-green-300"
      case "Busy":
        return "bg-yellow-100 text-yellow-700 border-yellow-300"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case "Excellent":
        return "bg-green-100 text-green-700"
      case "Good":
        return "bg-blue-100 text-blue-700"
      case "Average":
        return "bg-yellow-100 text-yellow-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getLeadStatusColor = (status: string) => {
    switch (status) {
      case "HOT":
        return "bg-red-100 text-red-700 border-red-300"
      case "Warm":
        return "bg-yellow-100 text-yellow-700 border-yellow-300"
      case "Cold":
        return "bg-blue-100 text-blue-700 border-blue-300"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const filteredCounselors = counselors.filter(
    (counselor) =>
      counselor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      counselor.specialization.toLowerCase().includes(searchQuery.toLowerCase()),
  )

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
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Lead Assignment</h1>
            <p className="text-sm text-gray-600 mt-1">Assign leads to counselors based on availability and expertise</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 mb-1">Total Counselors</p>
                <p className="text-2xl font-bold text-blue-600">{counselors.length}</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 mb-1">Available</p>
                <p className="text-2xl font-bold text-green-600">
                  {counselors.filter((c) => c.status === "Available").length}
                </p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <UserCheck className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 mb-1">Unassigned Leads</p>
                <p className="text-2xl font-bold text-orange-600">{unassignedLeads.length}</p>
              </div>
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 mb-1">Avg Conversion</p>
                <p className="text-2xl font-bold text-purple-600">
                  {Math.round(counselors.reduce((acc, c) => acc + c.conversionRate, 0) / counselors.length)}%
                </p>
              </div>
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Counselors List */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Select Counselor</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Search counselors..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {filteredCounselors.map((counselor) => {
                const capacityPercentage = (counselor.activeLeads / counselor.maxCapacity) * 100
                const isSelected = selectedCounselor === counselor.id

                return (
                  <div
                    key={counselor.id}
                    onClick={() => setSelectedCounselor(counselor.id)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      isSelected
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center text-white font-semibold">
                          {counselor.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{counselor.name}</p>
                          <p className="text-xs text-gray-600">{counselor.role}</p>
                          <p className="text-xs text-blue-600 mt-1">{counselor.specialization}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge className={getStatusColor(counselor.status)}>{counselor.status}</Badge>
                        <Badge className={getPerformanceColor(counselor.performance)}>{counselor.performance}</Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                      <div>
                        <p className="text-xs text-gray-500">Active Leads</p>
                        <p className="text-sm font-semibold text-gray-900">
                          {counselor.activeLeads}/{counselor.maxCapacity}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Conversion</p>
                        <p className="text-sm font-semibold text-green-600">{counselor.conversionRate}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Response Time</p>
                        <p className="text-sm font-semibold text-gray-900">{counselor.avgResponseTime}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Capacity</p>
                        <p className="text-sm font-semibold text-gray-900">{Math.round(capacityPercentage)}%</p>
                      </div>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          capacityPercentage >= 90
                            ? "bg-red-600"
                            : capacityPercentage >= 70
                              ? "bg-yellow-600"
                              : "bg-green-600"
                        }`}
                        style={{ width: `${capacityPercentage}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </div>

        {/* Unassigned Leads */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Unassigned Leads</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {unassignedLeads.map((lead) => (
                <div
                  key={lead.id}
                  className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                    selectedLeads.includes(lead.id)
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-200 hover:border-blue-300"
                  }`}
                  onClick={() => toggleLeadSelection(lead.id)}
                >
                  <div className="flex items-start gap-3">
                    <Checkbox checked={selectedLeads.includes(lead.id)} className="mt-1" />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-semibold text-sm text-gray-900">{lead.name}</p>
                          <p className="text-xs text-gray-600">{lead.email}</p>
                        </div>
                        <Badge className={getLeadStatusColor(lead.status)}>{lead.status}</Badge>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-gray-600">
                          <span className="font-medium">Country:</span> {lead.country}
                        </p>
                        <p className="text-xs text-gray-600">
                          <span className="font-medium">Course:</span> {lead.course}
                        </p>
                        <p className="text-xs text-gray-600">
                          <span className="font-medium">Score:</span> {lead.score}
                        </p>
                        <p className="text-xs text-gray-600">
                          <span className="font-medium">Source:</span> {lead.source}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Assignment Summary */}
          <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-lg text-blue-900">Assignment Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm text-blue-700">Selected Leads:</p>
                <Badge className="bg-blue-600 text-white">{selectedLeads.length}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-blue-700">Selected Counselor:</p>
                <Badge className="bg-blue-600 text-white">
                  {selectedCounselor ? counselors.find((c) => c.id === selectedCounselor)?.name : "None"}
                </Badge>
              </div>
              <Button
                onClick={handleAssign}
                disabled={selectedLeads.length === 0 || !selectedCounselor}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white gap-2"
              >
                <UserCheck className="w-4 h-4" />
                Assign Leads
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
