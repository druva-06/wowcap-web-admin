"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Building2, DollarSign, Activity, CheckCircle2, XCircle } from "lucide-react"
import Link from "next/link"

export default function PartnersOverviewPage() {
  const [timeRange, setTimeRange] = useState("month")

  const stats = [
    {
      label: "Total Partners",
      value: "30",
      change: "+3 this month",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      label: "College Partners",
      value: "15",
      change: "12 active",
      icon: Building2,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      label: "Sub-Agent Partners",
      value: "15",
      change: "13 active",
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      label: "Total Revenue",
      value: "₹85.5L",
      change: "+18% from last month",
      icon: DollarSign,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ]

  const recentActivities = [
    {
      id: 1,
      partner: "Harvard University",
      type: "College Partner",
      action: "Logged in",
      time: "5 minutes ago",
      status: "success",
    },
    {
      id: 2,
      partner: "Mumbai Education Consultants",
      type: "Sub-Agent",
      action: "Added 3 new leads",
      time: "15 minutes ago",
      status: "success",
    },
    {
      id: 3,
      partner: "Stanford University",
      type: "College Partner",
      action: "Updated application status",
      time: "1 hour ago",
      status: "success",
    },
    {
      id: 4,
      partner: "Delhi Study Abroad",
      type: "Sub-Agent",
      action: "Failed login attempt",
      time: "2 hours ago",
      status: "error",
    },
    {
      id: 5,
      partner: "MIT",
      type: "College Partner",
      action: "Logged in",
      time: "3 hours ago",
      status: "success",
    },
  ]

  const topPerformers = [
    {
      id: 1,
      name: "Harvard University",
      type: "College Partner",
      applications: 45,
      revenue: "₹12.5L",
      status: "active",
    },
    {
      id: 2,
      name: "Mumbai Education Consultants",
      type: "Sub-Agent",
      leads: 89,
      revenue: "₹8.2L",
      status: "active",
    },
    {
      id: 3,
      name: "Stanford University",
      type: "College Partner",
      applications: 38,
      revenue: "₹10.8L",
      status: "active",
    },
    {
      id: 4,
      name: "Delhi Study Abroad",
      type: "Sub-Agent",
      leads: 67,
      revenue: "₹6.5L",
      status: "active",
    },
    {
      id: 5,
      name: "MIT",
      type: "College Partner",
      applications: 32,
      revenue: "₹9.2L",
      status: "active",
    },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Partner Management</h1>
          <p className="text-gray-500 mt-1">Manage college partners and sub-agents</p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/partners/colleges/new">
            <Button className="bg-blue-600 hover:bg-blue-700">Add College Partner</Button>
          </Link>
          <Link href="/admin/partners/subagents/new">
            <Button variant="outline">Add Sub-Agent</Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Partner Activities</h2>
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  {activity.status === "success" ? (
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600" />
                  )}
                  <div>
                    <p className="font-medium text-gray-900">{activity.partner}</p>
                    <p className="text-sm text-gray-500">
                      {activity.type} • {activity.action}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Top Performers</h2>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="text-sm border border-gray-200 rounded-lg px-3 py-1.5"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
          </div>
          <div className="space-y-4">
            {topPerformers.map((performer, index) => (
              <div key={performer.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{performer.name}</p>
                    <p className="text-sm text-gray-500">
                      {performer.type} •{" "}
                      {performer.type === "College Partner"
                        ? `${performer.applications} applications`
                        : `${performer.leads} leads`}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">{performer.revenue}</p>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    Active
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/admin/partners/colleges">
            <Button variant="outline" className="w-full justify-start h-auto py-4 bg-transparent">
              <Building2 className="w-5 h-5 mr-3" />
              <div className="text-left">
                <p className="font-medium">Manage College Partners</p>
                <p className="text-xs text-gray-500">View and manage all college partnerships</p>
              </div>
            </Button>
          </Link>
          <Link href="/admin/partners/subagents">
            <Button variant="outline" className="w-full justify-start h-auto py-4 bg-transparent">
              <Users className="w-5 h-5 mr-3" />
              <div className="text-left">
                <p className="font-medium">Manage Sub-Agents</p>
                <p className="text-xs text-gray-500">View and manage all sub-agent partners</p>
              </div>
            </Button>
          </Link>
          <Link href="/admin/partners/users">
            <Button variant="outline" className="w-full justify-start h-auto py-4 bg-transparent">
              <Activity className="w-5 h-5 mr-3" />
              <div className="text-left">
                <p className="font-medium">Partner User Management</p>
                <p className="text-xs text-gray-500">Manage partner users and permissions</p>
              </div>
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  )
}
