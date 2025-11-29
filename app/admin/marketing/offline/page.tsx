"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Calendar,
  Users,
  DollarSign,
  TrendingUp,
  Plus,
  Download,
  Eye,
  Edit,
  MapPin,
  Presentation,
  Newspaper,
} from "lucide-react"

export default function OfflineMarketingPage() {
  const stats = [
    {
      title: "Total Events",
      value: "24",
      change: "+8 this month",
      icon: Calendar,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Leads Generated",
      value: "385",
      change: "+12.5%",
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Total Spend",
      value: "₹95K",
      change: "+8.3%",
      icon: DollarSign,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Conversion Rate",
      value: "18.7%",
      change: "+3.2%",
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ]

  const educationFairs = [
    {
      id: 1,
      name: "Study Abroad Fair - Mumbai",
      date: "2024-02-15",
      location: "Mumbai Convention Center",
      status: "upcoming",
      budget: "₹35K",
      expectedLeads: 120,
      registrations: 89,
    },
    {
      id: 2,
      name: "International Education Expo - Delhi",
      date: "2024-01-20",
      location: "Pragati Maidan, Delhi",
      status: "completed",
      budget: "₹45K",
      leads: 156,
      conversions: 28,
    },
    {
      id: 3,
      name: "UK Universities Fair - Bangalore",
      date: "2024-01-10",
      location: "Bangalore International Centre",
      status: "completed",
      budget: "₹30K",
      leads: 98,
      conversions: 18,
    },
  ]

  const seminars = [
    {
      id: 1,
      name: "MBA Abroad - Career Opportunities",
      date: "2024-02-10",
      location: "Hotel Taj, Mumbai",
      attendees: 45,
      leads: 38,
      conversions: 8,
      status: "completed",
    },
    {
      id: 2,
      name: "Study in Canada - Pathway Programs",
      date: "2024-02-20",
      location: "Hyatt Regency, Delhi",
      expectedAttendees: 60,
      registrations: 42,
      status: "upcoming",
    },
  ]

  const printMedia = [
    {
      id: 1,
      name: "Times of India - Full Page Ad",
      date: "2024-01-15",
      circulation: "500K",
      cost: "₹25K",
      leads: 45,
      status: "completed",
    },
    {
      id: 2,
      name: "Education Times - Half Page",
      date: "2024-02-01",
      circulation: "200K",
      cost: "₹12K",
      leads: 28,
      status: "completed",
    },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Offline Marketing</h1>
          <p className="text-gray-500 mt-1">Manage education fairs, seminars, and print media campaigns</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            New Event
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className="text-xs text-green-600 mt-1">{stat.change}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Tabs defaultValue="fairs" className="space-y-6">
        <TabsList>
          <TabsTrigger value="fairs" className="gap-2">
            <MapPin className="w-4 h-4" />
            Education Fairs
          </TabsTrigger>
          <TabsTrigger value="seminars" className="gap-2">
            <Presentation className="w-4 h-4" />
            Seminars & Workshops
          </TabsTrigger>
          <TabsTrigger value="print" className="gap-2">
            <Newspaper className="w-4 h-4" />
            Print Media
          </TabsTrigger>
        </TabsList>

        <TabsContent value="fairs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Education Fairs & Expos</CardTitle>
              <CardDescription>Track performance of education fairs and exhibitions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {educationFairs.map((fair) => (
                  <div
                    key={fair.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-gray-900">{fair.name}</h3>
                        <Badge variant={fair.status === "upcoming" ? "default" : "secondary"}>{fair.status}</Badge>
                      </div>
                      <div className="grid grid-cols-4 gap-4 mt-3">
                        <div>
                          <p className="text-xs text-gray-500">Date</p>
                          <p className="text-sm font-semibold text-gray-900">
                            {new Date(fair.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Location</p>
                          <p className="text-sm font-semibold text-gray-900">{fair.location}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Budget</p>
                          <p className="text-sm font-semibold text-gray-900">{fair.budget}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">
                            {fair.status === "upcoming" ? "Expected Leads" : "Leads Generated"}
                          </p>
                          <p className="text-sm font-semibold text-gray-900">
                            {fair.status === "upcoming" ? fair.expectedLeads : fair.leads}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seminars" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Seminars & Workshops</CardTitle>
              <CardDescription>Manage educational seminars and counseling sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {seminars.map((seminar) => (
                  <div
                    key={seminar.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-gray-900">{seminar.name}</h3>
                        <Badge variant={seminar.status === "upcoming" ? "default" : "secondary"}>
                          {seminar.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-4 gap-4 mt-3">
                        <div>
                          <p className="text-xs text-gray-500">Date</p>
                          <p className="text-sm font-semibold text-gray-900">
                            {new Date(seminar.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Location</p>
                          <p className="text-sm font-semibold text-gray-900">{seminar.location}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Attendees</p>
                          <p className="text-sm font-semibold text-gray-900">
                            {seminar.status === "upcoming" ? seminar.expectedAttendees : seminar.attendees}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Leads</p>
                          <p className="text-sm font-semibold text-gray-900">
                            {seminar.status === "upcoming" ? "-" : seminar.leads}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="print" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Print Media Campaigns</CardTitle>
              <CardDescription>Track newspaper and magazine advertisements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {printMedia.map((media) => (
                  <div
                    key={media.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-gray-900">{media.name}</h3>
                        <Badge variant="secondary">{media.status}</Badge>
                      </div>
                      <div className="grid grid-cols-4 gap-4 mt-3">
                        <div>
                          <p className="text-xs text-gray-500">Date</p>
                          <p className="text-sm font-semibold text-gray-900">
                            {new Date(media.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Circulation</p>
                          <p className="text-sm font-semibold text-gray-900">{media.circulation}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Cost</p>
                          <p className="text-sm font-semibold text-gray-900">{media.cost}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Leads</p>
                          <p className="text-sm font-semibold text-gray-900">{media.leads}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
