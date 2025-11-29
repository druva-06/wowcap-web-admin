"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, Phone, MapPin, DollarSign, TrendingUp, Eye, Power, Edit, Activity, Clock, UserPlus } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function SubAgentPartnerDetailPage() {
  const params = useParams()
  const [activeTab, setActiveTab] = useState("overview")

  const partner = {
    id: params.id,
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
    address: "Shop 12, Andheri West, Mumbai 400058",
    partnerSince: "Jan 2024",
    commissionRate: "15%",
    conversionRate: "36%",
  }

  const leads = [
    {
      id: 1,
      name: "Amit Sharma",
      course: "Computer Science MS",
      college: "Harvard University",
      status: "Converted",
      date: "2024-01-15",
      commission: "₹28,000",
    },
    {
      id: 2,
      name: "Priya Patel",
      course: "Business Administration MBA",
      college: "Stanford University",
      status: "In Progress",
      date: "2024-01-10",
      commission: "₹32,000",
    },
    {
      id: 3,
      name: "Rahul Kumar",
      course: "Data Science MS",
      college: "MIT",
      status: "Converted",
      date: "2024-01-05",
      commission: "₹30,000",
    },
  ]

  const loginActivities = [
    { id: 1, user: "Rajesh Kumar", action: "Logged in", timestamp: "2 hours ago", ip: "203.0.113.45" },
    { id: 2, user: "Rajesh Kumar", action: "Added new lead", timestamp: "3 hours ago", ip: "203.0.113.45" },
    { id: 3, user: "Rajesh Kumar", action: "Updated lead status", timestamp: "5 hours ago", ip: "203.0.113.45" },
    { id: 4, user: "Rajesh Kumar", action: "Logged in", timestamp: "1 day ago", ip: "203.0.113.45" },
    { id: 5, user: "Rajesh Kumar", action: "Downloaded documents", timestamp: "2 days ago", ip: "203.0.113.45" },
  ]

  const commissionHistory = [
    { month: "Jan 2024", leads: 28, conversions: 12, revenue: "₹2.8L", commission: "₹0.4L" },
    { month: "Dec 2023", leads: 32, conversions: 14, revenue: "₹3.2L", commission: "₹0.45L" },
    { month: "Nov 2023", leads: 25, conversions: 10, revenue: "₹2.5L", commission: "₹0.35L" },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/partners/subagents">
            <Button variant="outline" size="sm">
              ← Back
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{partner.name}</h1>
            <p className="text-gray-500 mt-1">Sub-Agent Partner Details</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href={`/admin/partners/subagents/${partner.id}/edit`}>
            <Button variant="outline">
              <Edit className="w-4 h-4 mr-2" />
              Edit Partner
            </Button>
          </Link>
          <Button variant="outline" className={partner.status === "active" ? "text-red-600" : "text-green-600"}>
            <Power className="w-4 h-4 mr-2" />
            {partner.status === "active" ? "Disable Login" : "Enable Login"}
          </Button>
        </div>
      </div>

      <Card className="p-6">
        <div className="flex items-start gap-6">
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 w-24 h-24 rounded-lg flex items-center justify-center text-white font-bold text-3xl">
            {partner.owner
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-2xl font-bold text-gray-900">{partner.name}</h2>
              <Badge variant={partner.status === "active" ? "default" : "secondary"}>
                {partner.status === "active" ? "Active" : "Inactive"}
              </Badge>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">Owner</p>
                <p className="font-medium text-gray-900">{partner.owner}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Location</p>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <p className="font-medium text-gray-900">{partner.city}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Partner Since</p>
                <p className="font-medium text-gray-900">{partner.partnerSince}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Last Login</p>
                <p className="font-medium text-gray-900">{partner.lastLogin}</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Leads Generated</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{partner.leadsGenerated}</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <UserPlus className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Conversions</p>
              <p className="text-3xl font-bold text-green-600 mt-2">{partner.conversions}</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Revenue Generated</p>
              <p className="text-3xl font-bold text-orange-600 mt-2">{partner.revenue}</p>
            </div>
            <div className="bg-orange-50 p-3 rounded-lg">
              <DollarSign className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Commission Earned</p>
              <p className="text-3xl font-bold text-purple-600 mt-2">{partner.commission}</p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="leads">Leads ({leads.length})</TabsTrigger>
          <TabsTrigger value="commission">Commission History</TabsTrigger>
          <TabsTrigger value="activity">Login Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium text-gray-900">{partner.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium text-gray-900">{partner.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="font-medium text-gray-900">{partner.address}</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Commission Structure</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">Commission Rate</p>
                <p className="text-2xl font-bold text-gray-900">{partner.commissionRate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Conversion Rate</p>
                <p className="text-2xl font-bold text-green-600">{partner.conversionRate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Payment Terms</p>
                <p className="text-lg font-medium text-gray-900">Net 15 Days</p>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="leads" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Recent Leads</h3>
            <div className="space-y-4">
              {leads.map((lead) => (
                <Card key={lead.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-bold text-gray-900">{lead.name}</p>
                      <p className="text-sm text-gray-500">
                        {lead.course} - {lead.college}
                      </p>
                    </div>
                    <div className="flex items-center gap-6">
                      <div>
                        <p className="text-sm text-gray-500">Date</p>
                        <p className="text-sm font-medium text-gray-900">{lead.date}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Commission</p>
                        <p className="text-sm font-bold text-green-600">{lead.commission}</p>
                      </div>
                      <Badge variant={lead.status === "Converted" ? "default" : "secondary"}>{lead.status}</Badge>
                      <Link href={`/admin/leads/${lead.id}`}>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="commission" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Commission History</h3>
            <div className="space-y-4">
              {commissionHistory.map((data, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-gray-900">{data.month}</p>
                      <p className="text-sm text-gray-500">
                        {data.leads} leads, {data.conversions} conversions
                      </p>
                    </div>
                    <div className="flex items-center gap-6">
                      <div>
                        <p className="text-sm text-gray-500">Revenue</p>
                        <p className="text-lg font-bold text-orange-600">{data.revenue}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Commission</p>
                        <p className="text-lg font-bold text-green-600">{data.commission}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Login Activity Log</h3>
            <div className="space-y-4">
              {loginActivities.map((activity) => (
                <Card key={activity.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Activity className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-bold text-gray-900">{activity.user}</p>
                        <p className="text-sm text-gray-500">{activity.action}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div>
                        <p className="text-sm text-gray-500">IP Address</p>
                        <p className="text-sm font-medium text-gray-900">{activity.ip}</p>
                      </div>
                      <div className="flex items-center gap-2 text-gray-500">
                        <Clock className="w-4 h-4" />
                        <p className="text-sm">{activity.timestamp}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
