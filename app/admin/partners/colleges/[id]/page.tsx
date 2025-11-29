"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Mail,
  Phone,
  Globe,
  MapPin,
  DollarSign,
  FileText,
  Users,
  TrendingUp,
  Calendar,
  Eye,
  Power,
  Edit,
  Activity,
  Clock,
  Building2,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function CollegePartnerDetailPage() {
  const params = useParams()
  const [activeTab, setActiveTab] = useState("overview")

  const partner = {
    id: params.id,
    name: "Harvard University",
    country: "USA",
    city: "Cambridge, MA",
    logo: "/harvard.jpg",
    status: "active",
    applications: 45,
    revenue: "₹12.5L",
    commission: "15%",
    lastLogin: "2 hours ago",
    contactPerson: "Dr. John Smith",
    email: "john.smith@harvard.edu",
    phone: "+1 617-495-1000",
    website: "https://www.harvard.edu",
    address: "Massachusetts Hall, Cambridge, MA 02138, USA",
    partnerSince: "Jan 2022",
    totalStudents: 156,
    activeApplications: 12,
    acceptanceRate: "78%",
  }

  const users = [
    {
      id: 1,
      name: "Dr. John Smith",
      email: "john.smith@harvard.edu",
      role: "Admin",
      status: "active",
      lastLogin: "2 hours ago",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "s.johnson@harvard.edu",
      role: "Counselor",
      status: "active",
      lastLogin: "5 hours ago",
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "m.brown@harvard.edu",
      role: "Viewer",
      status: "active",
      lastLogin: "1 day ago",
    },
  ]

  const applications = [
    {
      id: 1,
      studentName: "Rahul Sharma",
      course: "Computer Science MS",
      status: "Under Review",
      appliedDate: "2024-01-15",
      commission: "₹45,000",
    },
    {
      id: 2,
      studentName: "Priya Patel",
      course: "Business Administration MBA",
      status: "Offer Received",
      appliedDate: "2024-01-10",
      commission: "₹52,000",
    },
    {
      id: 3,
      studentName: "Amit Kumar",
      course: "Data Science MS",
      status: "Accepted",
      appliedDate: "2024-01-05",
      commission: "₹48,000",
    },
  ]

  const loginActivities = [
    { id: 1, user: "Dr. John Smith", action: "Logged in", timestamp: "2 hours ago", ip: "203.0.113.45" },
    { id: 2, user: "Sarah Johnson", action: "Logged in", timestamp: "5 hours ago", ip: "203.0.113.46" },
    {
      id: 3,
      user: "Dr. John Smith",
      action: "Updated application status",
      timestamp: "6 hours ago",
      ip: "203.0.113.45",
    },
    { id: 4, user: "Michael Brown", action: "Logged in", timestamp: "1 day ago", ip: "203.0.113.47" },
    { id: 5, user: "Sarah Johnson", action: "Downloaded documents", timestamp: "1 day ago", ip: "203.0.113.46" },
  ]

  const revenueData = [
    { month: "Jan 2024", revenue: "₹2.5L", applications: 8, commission: "15%" },
    { month: "Dec 2023", revenue: "₹2.2L", applications: 7, commission: "15%" },
    { month: "Nov 2023", revenue: "₹1.8L", applications: 6, commission: "15%" },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/partners/colleges">
            <Button variant="outline" size="sm">
              ← Back
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{partner.name}</h1>
            <p className="text-gray-500 mt-1">College Partner Details</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href={`/admin/partners/colleges/${partner.id}/edit`}>
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
          <img
            src={partner.logo || "/placeholder.svg"}
            alt={partner.name}
            className="w-24 h-24 rounded-lg object-cover border border-gray-200"
          />
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-2xl font-bold text-gray-900">{partner.name}</h2>
              <Badge variant={partner.status === "active" ? "default" : "secondary"}>
                {partner.status === "active" ? "Active" : "Inactive"}
              </Badge>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">Location</p>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <p className="font-medium text-gray-900">
                    {partner.city}, {partner.country}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Contact Person</p>
                <p className="font-medium text-gray-900">{partner.contactPerson}</p>
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
              <p className="text-sm text-gray-500 font-medium">Total Applications</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{partner.applications}</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Total Revenue</p>
              <p className="text-3xl font-bold text-green-600 mt-2">{partner.revenue}</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Total Students</p>
              <p className="text-3xl font-bold text-orange-600 mt-2">{partner.totalStudents}</p>
            </div>
            <div className="bg-orange-50 p-3 rounded-lg">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Acceptance Rate</p>
              <p className="text-3xl font-bold text-purple-600 mt-2">{partner.acceptanceRate}</p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview" className="gap-2">
            <Building2 className="w-4 h-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="users" className="gap-2">
            <Users className="w-4 h-4" />
            Users ({users.length})
          </TabsTrigger>
          <TabsTrigger value="applications" className="gap-2">
            <FileText className="w-4 h-4" />
            Applications ({applications.length})
          </TabsTrigger>
          <TabsTrigger value="revenue" className="gap-2">
            <DollarSign className="w-4 h-4" />
            Revenue
          </TabsTrigger>
          <TabsTrigger value="activity" className="gap-2">
            <Activity className="w-4 h-4" />
            Login Activity
          </TabsTrigger>
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
                <Globe className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Website</p>
                  <a
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-blue-600 hover:underline"
                  >
                    {partner.website}
                  </a>
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
                <p className="text-2xl font-bold text-gray-900">{partner.commission}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Payment Terms</p>
                <p className="text-lg font-medium text-gray-900">Net 30 Days</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Commission Type</p>
                <p className="text-lg font-medium text-gray-900">Per Application</p>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Partner Users</h3>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Users className="w-4 h-4 mr-2" />
                Add User
              </Button>
            </div>
            <div className="space-y-4">
              {users.map((user) => (
                <Card key={user.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-bold text-lg">{user.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div>
                        <p className="text-sm text-gray-500">Role</p>
                        <Badge>{user.role}</Badge>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Last Login</p>
                        <p className="text-sm font-medium text-gray-900">{user.lastLogin}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 bg-transparent">
                          <Power className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="applications" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Recent Applications</h3>
            <div className="space-y-4">
              {applications.map((app) => (
                <Card key={app.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-bold text-gray-900">{app.studentName}</p>
                      <p className="text-sm text-gray-500">{app.course}</p>
                    </div>
                    <div className="flex items-center gap-6">
                      <div>
                        <p className="text-sm text-gray-500">Applied Date</p>
                        <p className="text-sm font-medium text-gray-900">{app.appliedDate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Commission</p>
                        <p className="text-sm font-bold text-green-600">{app.commission}</p>
                      </div>
                      <Badge>{app.status}</Badge>
                      <Link href={`/admin/applications/${app.id}`}>
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

        <TabsContent value="revenue" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Revenue History</h3>
            <div className="space-y-4">
              {revenueData.map((data, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Calendar className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="font-bold text-gray-900">{data.month}</p>
                        <p className="text-sm text-gray-500">{data.applications} applications</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div>
                        <p className="text-sm text-gray-500">Revenue</p>
                        <p className="text-lg font-bold text-green-600">{data.revenue}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Commission Rate</p>
                        <p className="text-lg font-bold text-gray-900">{data.commission}</p>
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
