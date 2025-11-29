"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Users, Search, Filter, Eye, Edit, Power, UserPlus, Building, Clock } from "lucide-react"

export default function PartnerUsersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const users = [
    {
      id: 1,
      name: "Dr. John Smith",
      email: "john.smith@harvard.edu",
      partnerName: "Harvard University",
      partnerType: "College",
      role: "Admin",
      status: "active",
      lastLogin: "2 hours ago",
      createdDate: "Jan 2022",
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      email: "rajesh@globaledu.com",
      partnerName: "Global Education Consultants",
      partnerType: "Sub-Agent",
      role: "Owner",
      status: "active",
      lastLogin: "3 hours ago",
      createdDate: "Jan 2024",
    },
    {
      id: 3,
      name: "Sarah Johnson",
      email: "s.johnson@harvard.edu",
      partnerName: "Harvard University",
      partnerType: "College",
      role: "Counselor",
      status: "active",
      lastLogin: "5 hours ago",
      createdDate: "Feb 2022",
    },
    {
      id: 4,
      name: "Priya Sharma",
      email: "priya@studyabroad.com",
      partnerName: "Study Abroad Experts",
      partnerType: "Sub-Agent",
      role: "Owner",
      status: "active",
      lastLogin: "6 hours ago",
      createdDate: "Feb 2024",
    },
    {
      id: 5,
      name: "Prof. Emily Davis",
      email: "e.davis@stanford.edu",
      partnerName: "Stanford University",
      partnerType: "College",
      role: "Admin",
      status: "active",
      lastLogin: "1 day ago",
      createdDate: "Mar 2022",
    },
    {
      id: 6,
      name: "Amit Patel",
      email: "amit@overseaseduhub.com",
      partnerName: "Overseas Education Hub",
      partnerType: "Sub-Agent",
      role: "Owner",
      status: "active",
      lastLogin: "1 day ago",
      createdDate: "Mar 2024",
    },
    {
      id: 7,
      name: "Michael Brown",
      email: "m.brown@harvard.edu",
      partnerName: "Harvard University",
      partnerType: "College",
      role: "Viewer",
      status: "active",
      lastLogin: "2 days ago",
      createdDate: "Apr 2022",
    },
    {
      id: 8,
      name: "Dr. Lisa Wang",
      email: "l.wang@mit.edu",
      partnerName: "MIT",
      partnerType: "College",
      role: "Admin",
      status: "active",
      lastLogin: "3 hours ago",
      createdDate: "Jan 2023",
    },
    {
      id: 9,
      name: "Sneha Reddy",
      email: "sneha@careercounseling.com",
      partnerName: "Career Counseling Services",
      partnerType: "Sub-Agent",
      role: "Owner",
      status: "inactive",
      lastLogin: "1 week ago",
      createdDate: "Jan 2024",
    },
    {
      id: 10,
      name: "Prof. David Lee",
      email: "d.lee@toronto.ca",
      partnerName: "University of Toronto",
      partnerType: "College",
      role: "Counselor",
      status: "active",
      lastLogin: "4 hours ago",
      createdDate: "Feb 2023",
    },
  ]

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.partnerName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = typeFilter === "all" || user.partnerType.toLowerCase() === typeFilter.toLowerCase()
    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    return matchesSearch && matchesType && matchesStatus
  })

  const stats = {
    total: users.length,
    active: users.filter((u) => u.status === "active").length,
    inactive: users.filter((u) => u.status === "inactive").length,
    college: users.filter((u) => u.partnerType === "College").length,
    subAgent: users.filter((u) => u.partnerType === "Sub-Agent").length,
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Partner Users</h1>
          <p className="text-gray-500 mt-1">Manage all partner user accounts and access</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <UserPlus className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 font-medium">Total Users</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
            </div>
            <div className="bg-blue-50 p-2 rounded-lg">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 font-medium">Active</p>
              <p className="text-2xl font-bold text-green-600 mt-1">{stats.active}</p>
            </div>
            <div className="bg-green-50 p-2 rounded-lg">
              <Power className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 font-medium">Inactive</p>
              <p className="text-2xl font-bold text-red-600 mt-1">{stats.inactive}</p>
            </div>
            <div className="bg-red-50 p-2 rounded-lg">
              <Power className="w-5 h-5 text-red-600" />
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 font-medium">College Users</p>
              <p className="text-2xl font-bold text-purple-600 mt-1">{stats.college}</p>
            </div>
            <div className="bg-purple-50 p-2 rounded-lg">
              <Building className="w-5 h-5 text-purple-600" />
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 font-medium">Sub-Agent Users</p>
              <p className="text-2xl font-bold text-orange-600 mt-1">{stats.subAgent}</p>
            </div>
            <div className="bg-orange-50 p-2 rounded-lg">
              <Users className="w-5 h-5 text-orange-600" />
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search by name, email, or partner..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="border border-gray-200 rounded-lg px-4 py-2 text-sm"
            >
              <option value="all">All Types</option>
              <option value="college">College</option>
              <option value="sub-agent">Sub-Agent</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-200 rounded-lg px-4 py-2 text-sm"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {filteredUsers.map((user) => (
            <Card key={user.id} className="p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-gray-900">{user.name}</h3>
                      <Badge variant={user.status === "active" ? "default" : "secondary"}>
                        {user.status === "active" ? "Active" : "Inactive"}
                      </Badge>
                      <Badge variant="outline">{user.role}</Badge>
                    </div>
                    <p className="text-sm text-gray-500">{user.email}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Building className="w-3 h-3 text-gray-400" />
                      <p className="text-sm text-gray-600">
                        {user.partnerName} ({user.partnerType})
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div>
                    <p className="text-xs text-gray-500">Last Login</p>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-gray-400" />
                      <p className="text-sm font-medium text-gray-900">{user.lastLogin}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Created</p>
                    <p className="text-sm font-medium text-gray-900">{user.createdDate}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className={user.status === "active" ? "text-red-600" : "text-green-600"}
                    >
                      <Power className="w-4 h-4 mr-2" />
                      {user.status === "active" ? "Disable" : "Enable"}
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No users found</p>
          </div>
        )}
      </Card>
    </div>
  )
}
