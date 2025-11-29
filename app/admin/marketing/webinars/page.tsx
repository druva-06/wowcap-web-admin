"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Video, Users, Clock, TrendingUp, Plus, Download, Eye, Edit, Play } from "lucide-react"

export default function WebinarsPage() {
  const stats = [
    {
      title: "Total Webinars",
      value: "18",
      change: "+6 this month",
      icon: Video,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Total Attendees",
      value: "1,247",
      change: "+18.5%",
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Avg. Duration",
      value: "52 min",
      change: "+5 min",
      icon: Clock,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Lead Conversion",
      value: "21.8%",
      change: "+4.2%",
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ]

  const webinars = [
    {
      id: 1,
      title: "Study in USA - Top Universities & Scholarships",
      date: "2024-02-20",
      time: "6:00 PM IST",
      status: "upcoming",
      registrations: 156,
      expectedAttendees: 120,
      speaker: "Dr. Rajesh Kumar",
      platform: "Zoom",
    },
    {
      id: 2,
      title: "MBA Abroad - Application Strategy 2024",
      date: "2024-02-15",
      time: "7:00 PM IST",
      status: "upcoming",
      registrations: 98,
      expectedAttendees: 75,
      speaker: "Prof. Anita Sharma",
      platform: "Google Meet",
    },
    {
      id: 3,
      title: "Study in Canada - PR Pathways",
      date: "2024-01-25",
      time: "6:30 PM IST",
      status: "completed",
      registrations: 245,
      attendees: 189,
      leads: 45,
      conversions: 12,
      speaker: "Mr. Vikram Singh",
      platform: "Zoom",
      recording: "https://example.com/recording",
    },
    {
      id: 4,
      title: "UK Universities - Post-Study Work Visa",
      date: "2024-01-18",
      time: "7:00 PM IST",
      status: "completed",
      registrations: 198,
      attendees: 156,
      leads: 38,
      conversions: 9,
      speaker: "Ms. Priya Patel",
      platform: "Zoom",
      recording: "https://example.com/recording",
    },
    {
      id: 5,
      title: "Australia Study Guide - Visa Process",
      date: "2024-01-10",
      time: "6:00 PM IST",
      status: "completed",
      registrations: 167,
      attendees: 134,
      leads: 32,
      conversions: 8,
      speaker: "Dr. Amit Verma",
      platform: "Google Meet",
      recording: "https://example.com/recording",
    },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Webinars</h1>
          <p className="text-gray-500 mt-1">Manage and track online webinar sessions</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Schedule Webinar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-lg ${stat.bgColor} transition-transform duration-300 hover:scale-110`}>
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

      <Card>
        <CardHeader>
          <CardTitle>All Webinars</CardTitle>
          <CardDescription>Upcoming and past webinar sessions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {webinars.map((webinar) => (
              <div
                key={webinar.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-gray-900">{webinar.title}</h3>
                    <Badge variant={webinar.status === "upcoming" ? "default" : "secondary"}>{webinar.status}</Badge>
                  </div>
                  <div className="grid grid-cols-5 gap-4 mt-3">
                    <div>
                      <p className="text-xs text-gray-500">Date & Time</p>
                      <p className="text-sm font-semibold text-gray-900">
                        {new Date(webinar.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </p>
                      <p className="text-xs text-gray-600">{webinar.time}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Speaker</p>
                      <p className="text-sm font-semibold text-gray-900">{webinar.speaker}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Platform</p>
                      <p className="text-sm font-semibold text-gray-900">{webinar.platform}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Registrations</p>
                      <p className="text-sm font-semibold text-gray-900">{webinar.registrations}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">
                        {webinar.status === "upcoming" ? "Expected" : "Attendees"}
                      </p>
                      <p className="text-sm font-semibold text-gray-900">
                        {webinar.status === "upcoming" ? webinar.expectedAttendees : webinar.attendees}
                      </p>
                    </div>
                  </div>
                  {webinar.status === "completed" && (
                    <div className="flex gap-4 mt-2">
                      <div>
                        <p className="text-xs text-gray-500">Leads Generated</p>
                        <p className="text-sm font-semibold text-green-600">{webinar.leads}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Conversions</p>
                        <p className="text-sm font-semibold text-blue-600">{webinar.conversions}</p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  {webinar.status === "completed" && webinar.recording && (
                    <Button variant="outline" size="sm">
                      <Play className="w-4 h-4" />
                    </Button>
                  )}
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
    </div>
  )
}
