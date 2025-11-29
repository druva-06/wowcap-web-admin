"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Users, Search, Filter, Eye, Edit, Power, DollarSign, UserPlus, TrendingUp, MapPin } from "lucide-react"
import Link from "next/link"

export default function SubAgentPartnersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const subAgents = [
    {
      id: 1,
      name: "Global Education Consultants",
      owner: "Rajesh Kumar",
      country: "India",
      city: "Mumbai",
      status: "active",
      leadsGenerated: 125,
      conversions: 45,
      revenue: "₹8.5L",
      commission: "₹1.2L",
      lastLogin: "2 hours ago",
      email: "rajesh@globaledu.com",
      phone: "+91 98765 43210",
      joinedDate: "Jan 2024",
    },
    {
      id: 2,
      name: "Study Abroad Experts",
      owner: "Priya Sharma",
      country: "India",
      city: "Delhi",
      status: "active",
      leadsGenerated: 98,
      conversions: 38,
      revenue: "₹7.2L",
      commission: "₹1.0L",
      lastLogin: "5 hours ago",
      email: "priya@studyabroad.com",
      phone: "+91 98765 43211",
      joinedDate: "Feb 2024",
    },
    {
      id: 3,
      name: "Overseas Education Hub",
      owner: "Amit Patel",
      country: "India",
      city: "Ahmedabad",
      status: "active",
      leadsGenerated: 87,
      conversions: 32,
      revenue: "₹6.5L",
      commission: "₹0.9L",
      lastLogin: "1 day ago",
      email: "amit@overseaseduhub.com",
      phone: "+91 98765 43212",
      joinedDate: "Mar 2024",
    },
    {
      id: 4,
      name: "Career Counseling Services",
      owner: "Sneha Reddy",
      country: "India",
      city: "Hyderabad",
      status: "active",
      leadsGenerated: 76,
      conversions: 28,
      revenue: "₹5.8L",
      commission: "₹0.8L",
      lastLogin: "3 hours ago",
      email: "sneha@careercounseling.com",
      phone: "+91 98765 43213",
      joinedDate: "Jan 2024",
    },
    {
      id: 5,
      name: "International Study Partners",
      owner: "Vikram Singh",
      country: "India",
      city: "Bangalore",
      status: "active",
      leadsGenerated: 65,
      conversions: 25,
      revenue: "₹5.2L",
      commission: "₹0.7L",
      lastLogin: "6 hours ago",
      email: "vikram@intlstudy.com",
      phone: "+91 98765 43214",
      joinedDate: "Apr 2024",
    },
    {
      id: 6,
      name: "Dream University Consultants",
      owner: "Neha Gupta",
      country: "India",
      city: "Pune",
      status: "active",
      leadsGenerated: 54,
      conversions: 22,
      revenue: "₹4.8L",
      commission: "₹0.6L",
      lastLogin: "4 hours ago",
      email: "neha@dreamuni.com",
      phone: "+91 98765 43215",
      joinedDate: "Feb 2024",
    },
    {
      id: 7,
      name: "Future Scholars Academy",
      owner: "Arjun Mehta",
      country: "India",
      city: "Chennai",
      status: "active",
      leadsGenerated: 48,
      conversions: 20,
      revenue: "₹4.2L",
      commission: "₹0.5L",
      lastLogin: "8 hours ago",
      email: "arjun@futurescholars.com",
      phone: "+91 98765 43216",
      joinedDate: "Mar 2024",
    },
    {
      id: 8,
      name: "Bright Future Consultancy",
      owner: "Kavita Joshi",
      country: "India",
      city: "Kolkata",
      status: "active",
      leadsGenerated: 42,
      conversions: 18,
      revenue: "₹3.8L",
      commission: "₹0.5L",
      lastLogin: "12 hours ago",
      email: "kavita@brightfuture.com",
      phone: "+91 98765 43217",
      joinedDate: "Apr 2024",
    },
    {
      id: 9,
      name: "Elite Education Services",
      owner: "Rahul Verma",
      country: "India",
      city: "Jaipur",
      status: "active",
      leadsGenerated: 38,
      conversions: 16,
      revenue: "₹3.5L",
      commission: "₹0.4L",
      lastLogin: "1 day ago",
      email: "rahul@eliteedu.com",
      phone: "+91 98765 43218",
      joinedDate: "Jan 2024",
    },
    {
      id: 10,
      name: "Success Path Consultants",
      owner: "Pooja Nair",
      country: "India",
      city: "Kochi",
      status: "active",
      leadsGenerated: 35,
      conversions: 15,
      revenue: "₹3.2L",
      commission: "₹0.4L",
      lastLogin: "2 days ago",
      email: "pooja@successpath.com",
      phone: "+91 98765 43219",
      joinedDate: "Feb 2024",
    },
    {
      id: 11,
      name: "Aspire Education Group",
      owner: "Sanjay Desai",
      country: "India",
      city: "Surat",
      status: "inactive",
      leadsGenerated: 28,
      conversions: 12,
      revenue: "₹2.8L",
      commission: "₹0.3L",
      lastLogin: "1 week ago",
      email: "sanjay@aspireedu.com",
      phone: "+91 98765 43220",
      joinedDate: "Mar 2024",
    },
    {
      id: 12,
      name: "Wisdom Education Hub",
      owner: "Anjali Kapoor",
      country: "India",
      city: "Chandigarh",
      status: "active",
      leadsGenerated: 32,
      conversions: 14,
      revenue: "₹3.0L",
      commission: "₹0.4L",
      lastLogin: "5 hours ago",
      email: "anjali@wisdomedu.com",
      phone: "+91 98765 43221",
      joinedDate: "Apr 2024",
    },
    {
      id: 13,
      name: "Pioneer Study Abroad",
      owner: "Manish Agarwal",
      country: "India",
      city: "Lucknow",
      status: "active",
      leadsGenerated: 30,
      conversions: 13,
      revenue: "₹2.9L",
      commission: "₹0.3L",
      lastLogin: "7 hours ago",
      email: "manish@pioneerstudy.com",
      phone: "+91 98765 43222",
      joinedDate: "Jan 2024",
    },
    {
      id: 14,
      name: "Horizon Education Services",
      owner: "Deepa Iyer",
      country: "India",
      city: "Coimbatore",
      status: "active",
      leadsGenerated: 26,
      conversions: 11,
      revenue: "₹2.5L",
      commission: "₹0.3L",
      lastLogin: "10 hours ago",
      email: "deepa@horizonedu.com",
      phone: "+91 98765 43223",
      joinedDate: "Feb 2024",
    },
    {
      id: 15,
      name: "Zenith Consultancy",
      owner: "Karan Malhotra",
      country: "India",
      city: "Indore",
      status: "inactive",
      leadsGenerated: 22,
      conversions: 9,
      revenue: "₹2.2L",
      commission: "₹0.2L",
      lastLogin: "2 weeks ago",
      email: "karan@zenithconsult.com",
      phone: "+91 98765 43224",
      joinedDate: "Mar 2024",
    },
  ]

  const filteredAgents = subAgents.filter((agent) => {
    const matchesSearch =
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.city.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || agent.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const stats = {
    total: subAgents.length,
    active: subAgents.filter((a) => a.status === "active").length,
    inactive: subAgents.filter((a) => a.status === "inactive").length,
    totalLeads: subAgents.reduce((sum, a) => sum + a.leadsGenerated, 0),
    totalRevenue: "₹62.9L",
    totalCommission: "₹8.5L",
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sub-Agent Partners</h1>
          <p className="text-gray-500 mt-1">Manage your sub-agent network and track performance</p>
        </div>
        <Link href="/admin/partners/subagents/new">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <UserPlus className="w-4 h-4 mr-2" />
            Add Sub-Agent
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 font-medium">Total Sub-Agents</p>
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
              <TrendingUp className="w-5 h-5 text-green-600" />
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
              <p className="text-xs text-gray-500 font-medium">Total Leads</p>
              <p className="text-2xl font-bold text-purple-600 mt-1">{stats.totalLeads}</p>
            </div>
            <div className="bg-purple-50 p-2 rounded-lg">
              <UserPlus className="w-5 h-5 text-purple-600" />
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 font-medium">Total Revenue</p>
              <p className="text-2xl font-bold text-orange-600 mt-1">{stats.totalRevenue}</p>
            </div>
            <div className="bg-orange-50 p-2 rounded-lg">
              <DollarSign className="w-5 h-5 text-orange-600" />
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 font-medium">Commission Paid</p>
              <p className="text-2xl font-bold text-teal-600 mt-1">{stats.totalCommission}</p>
            </div>
            <div className="bg-teal-50 p-2 rounded-lg">
              <DollarSign className="w-5 h-5 text-teal-600" />
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search by name, owner, or city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
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
          {filteredAgents.map((agent) => (
            <Card key={agent.id} className="p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-gradient-to-br from-blue-500 to-purple-600 w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                      {agent.owner
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-gray-900">{agent.name}</h3>
                        <Badge variant={agent.status === "active" ? "default" : "secondary"}>
                          {agent.status === "active" ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500">Owner: {agent.owner}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                    <div>
                      <p className="text-xs text-gray-500">Location</p>
                      <p className="text-sm font-medium text-gray-900 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {agent.city}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Leads Generated</p>
                      <p className="text-sm font-medium text-gray-900">{agent.leadsGenerated}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Conversions</p>
                      <p className="text-sm font-medium text-green-600">{agent.conversions}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Conversion Rate</p>
                      <p className="text-sm font-medium text-blue-600">
                        {((agent.conversions / agent.leadsGenerated) * 100).toFixed(1)}%
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Revenue Generated</p>
                      <p className="text-sm font-medium text-orange-600">{agent.revenue}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Commission Earned</p>
                      <p className="text-sm font-medium text-teal-600">{agent.commission}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Last Login</p>
                      <p className="text-sm font-medium text-gray-900">{agent.lastLogin}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Joined</p>
                      <p className="text-sm font-medium text-gray-900">{agent.joinedDate}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 ml-4">
                  <Link href={`/admin/partners/subagents/${agent.id}`}>
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                  </Link>
                  <Link href={`/admin/partners/subagents/${agent.id}/edit`}>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    className={agent.status === "active" ? "text-red-600" : "text-green-600"}
                  >
                    <Power className="w-4 h-4 mr-2" />
                    {agent.status === "active" ? "Disable" : "Enable"}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredAgents.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No sub-agents found</p>
          </div>
        )}
      </Card>
    </div>
  )
}
