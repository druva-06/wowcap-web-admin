"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { AIInsightsCard } from "@/components/admin/ai-insights-card"
import { QuickStatsCard } from "@/components/admin/quick-stats-card"
import { PerformanceChart } from "@/components/admin/performance-chart"
import { StatusTimeline } from "@/components/admin/status-timeline"
import Link from "next/link"
import {
  Users,
  FileText,
  Award,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  DollarSign,
  ArrowRight,
  Building2,
  UserCheck,
  UserPlus,
  FilePlus,
  Calendar,
  BarChart3,
  Settings,
  Download,
} from "lucide-react"

export default function AdminDashboard() {
  const aiInsights = [
    {
      id: "1",
      type: "action" as const,
      title: "High Conversion Lead Detected",
      description: "Priya Sharma (Lead #1247) has 92% conversion probability",
      action: {
        label: "Follow Up Now",
        onClick: () => console.log("[v0] Following up with Priya"),
      },
      priority: "high" as const,
    },
    {
      id: "2",
      type: "warning" as const,
      title: "Urgent Lead Assignment Needed",
      description: "15 leads haven't been contacted in 48+ hours",
      action: {
        label: "Assign Now",
        onClick: () => console.log("[v0] Assigning leads"),
      },
      priority: "high" as const,
    },
    {
      id: "3",
      type: "success" as const,
      title: "Regional Performance Insight",
      description: "Your USA applications have 23% higher success rate than UK",
      priority: "medium" as const,
    },
    {
      id: "4",
      type: "info" as const,
      title: "Top Performer Recognition",
      description: "Amit is your top performer this month with 15 conversions",
      priority: "low" as const,
    },
  ]

  const performanceData = [
    { name: "Jan", leads: 400, conversions: 150, revenue: 35 },
    { name: "Feb", leads: 450, conversions: 180, revenue: 42 },
    { name: "Mar", leads: 520, conversions: 210, revenue: 48 },
    { name: "Apr", leads: 580, conversions: 240, revenue: 55 },
    { name: "May", leads: 650, conversions: 280, revenue: 62 },
    { name: "Jun", leads: 720, conversions: 320, revenue: 70 },
  ]

  const timelineEvents = [
    {
      id: "1",
      title: "Amit called Priya Sharma",
      description: "Discussed MBA program options",
      timestamp: "2 mins ago",
      status: "completed" as const,
      user: "Amit Kumar",
    },
    {
      id: "2",
      title: "New lead from Facebook Ad",
      description: "Interested in UK universities",
      timestamp: "5 mins ago",
      status: "pending" as const,
    },
    {
      id: "3",
      title: "Harvard sent offer for Rahul",
      description: "MBA program acceptance",
      timestamp: "10 mins ago",
      status: "completed" as const,
      user: "System",
    },
    {
      id: "4",
      title: "Document verification pending",
      description: "Waiting for passport copy",
      timestamp: "15 mins ago",
      status: "pending" as const,
      user: "Priya Sharma",
    },
  ]

  const stats = [
    {
      title: "Total Leads",
      value: "1,247",
      change: "+12%",
      changeType: "positive",
      icon: Users,
      color: "blue",
    },
    {
      title: "Applications",
      value: "456",
      change: "+8%",
      changeType: "positive",
      icon: FileText,
      color: "green",
    },
    {
      title: "Offers Received",
      value: "189",
      change: "+15%",
      changeType: "positive",
      icon: Award,
      color: "purple",
    },
    {
      title: "Revenue",
      value: "₹45.2L",
      change: "+23%",
      changeType: "positive",
      icon: DollarSign,
      color: "orange",
    },
  ]

  const conversionFunnel = [
    { stage: "Leads", count: 1247, percentage: 100 },
    { stage: "Contacted", count: 1120, percentage: 90 },
    { stage: "Interested", count: 892, percentage: 71 },
    { stage: "Applied", count: 456, percentage: 37 },
    { stage: "Enrolled", count: 189, percentage: 15 },
  ]

  const counselorLeaderboard = [
    { name: "Amit Kumar", conversions: 15, revenue: "₹12L", target: 150, rank: 1 },
    { name: "Priya Sharma", conversions: 12, revenue: "₹9.5L", target: 120, rank: 2 },
    { name: "Rahul Patel", conversions: 10, revenue: "₹8L", target: 100, rank: 3 },
  ]

  const pendingTasks = [
    {
      task: "Submit documents for Rahul Patel",
      overdue: true,
      time: "Overdue by 1 day",
      priority: "high",
    },
    {
      task: "Follow up with Neha Singh",
      overdue: true,
      time: "Overdue by 3 hours",
      priority: "high",
    },
    {
      task: "Follow up with Priya Sharma",
      overdue: false,
      time: "Due in 2 hours",
      priority: "medium",
    },
    {
      task: "Send offer letter to Amit Kumar",
      overdue: false,
      time: "Due in 4 hours",
      priority: "medium",
    },
  ]

  const branchComparison = [
    { branch: "Mumbai", leads: 450, convRate: 38, revenue: "₹18L", best: true },
    { branch: "Delhi", leads: 380, convRate: 35, revenue: "₹15L", best: false },
    { branch: "Bangalore", leads: 320, convRate: 32, revenue: "₹12L", best: false },
    { branch: "Pune", leads: 280, convRate: 30, revenue: "₹10L", best: false },
  ]

  const partnerStats = [
    { label: "Active College Partners", value: "45", icon: Building2, color: "blue" },
    { label: "Active Sub-Agents", value: "23", icon: UserCheck, color: "green" },
    { label: "Total Partner Revenue", value: "₹12.5L", icon: DollarSign, color: "purple" },
    { label: "Partner Applications", value: "156", icon: FileText, color: "orange" },
  ]

  const topPartners = [
    { name: "Harvard University", type: "College", applications: 45, revenue: "₹3.2L", status: "active" },
    { name: "Stanford University", type: "College", applications: 38, revenue: "₹2.8L", status: "active" },
    { name: "Global Edu Consultants", type: "Sub-Agent", leads: 67, revenue: "₹1.5L", status: "active" },
    { name: "MIT", type: "College", applications: 32, revenue: "₹2.1L", status: "active" },
    { name: "Study Abroad Partners", type: "Sub-Agent", leads: 54, revenue: "₹1.2L", status: "active" },
  ]

  const digitalMarketing = [
    { channel: "Facebook Ads", leads: 245, cost: "₹45K", roi: "340%", conversions: 32 },
    { channel: "Google Ads", leads: 198, cost: "₹38K", roi: "310%", conversions: 28 },
    { channel: "Instagram", leads: 167, cost: "₹28K", roi: "280%", conversions: 24 },
    { channel: "LinkedIn", leads: 134, cost: "₹32K", roi: "250%", conversions: 19 },
  ]

  const offlineMarketing = [
    { channel: "Education Fairs", leads: 156, cost: "₹65K", roi: "180%", conversions: 28 },
    { channel: "Seminars", leads: 123, cost: "₹42K", roi: "220%", conversions: 22 },
    { channel: "Print Media", leads: 89, cost: "₹35K", roi: "150%", conversions: 15 },
    { channel: "Radio Ads", leads: 67, cost: "₹28K", roi: "140%", conversions: 12 },
  ]

  return (
    <div className="p-6">
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-600 mt-1">Welcome back, Super Admin</p>
      </div>

      <div className="space-y-4 md:space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {stats.map((stat, index) => (
            <QuickStatsCard
              key={index}
              title={stat.title}
              value={stat.value}
              change={{ value: 12, label: "from last month" }}
              icon={stat.icon}
              trend="up"
            />
          ))}
        </div>

        <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-base md:text-lg flex items-center text-green-900">
              <Settings className="w-5 h-5 mr-2" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              <Button
                asChild
                className="h-auto flex-col py-4 bg-white hover:bg-green-50 text-gray-900 border border-green-200 hover:border-green-300"
              >
                <Link href="/admin/leads?action=new">
                  <UserPlus className="w-6 h-6 mb-2 text-green-600" />
                  <span className="text-xs font-semibold">Add Lead</span>
                </Link>
              </Button>

              <Button
                asChild
                className="h-auto flex-col py-4 bg-white hover:bg-blue-50 text-gray-900 border border-green-200 hover:border-blue-300"
              >
                <Link href="/admin/applications?action=new">
                  <FilePlus className="w-6 h-6 mb-2 text-blue-600" />
                  <span className="text-xs font-semibold">New Application</span>
                </Link>
              </Button>

              <Button
                asChild
                className="h-auto flex-col py-4 bg-white hover:bg-purple-50 text-gray-900 border border-green-200 hover:border-purple-300"
              >
                <Link href="/admin/calendar">
                  <Calendar className="w-6 h-6 mb-2 text-purple-600" />
                  <span className="text-xs font-semibold">Schedule Meeting</span>
                </Link>
              </Button>

              <Button
                asChild
                className="h-auto flex-col py-4 bg-white hover:bg-orange-50 text-gray-900 border border-green-200 hover:border-orange-300"
              >
                <Link href="/admin/reports">
                  <BarChart3 className="w-6 h-6 mb-2 text-orange-600" />
                  <span className="text-xs font-semibold">View Reports</span>
                </Link>
              </Button>

              <Button
                asChild
                className="h-auto flex-col py-4 bg-white hover:bg-indigo-50 text-gray-900 border border-green-200 hover:border-indigo-300"
              >
                <Link href="/admin/settings">
                  <Settings className="w-6 h-6 mb-2 text-indigo-600" />
                  <span className="text-xs font-semibold">Manage Users</span>
                </Link>
              </Button>

              <Button
                className="h-auto flex-col py-4 bg-white hover:bg-teal-50 text-gray-900 border border-green-200 hover:border-teal-300"
                onClick={() => console.log("[v0] Generating report...")}
              >
                <Download className="w-6 h-6 mb-2 text-teal-600" />
                <span className="text-xs font-semibold">Export Data</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-base md:text-lg flex items-center text-blue-900">
              <Building2 className="w-5 h-5 mr-2" />
              Partner Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
              {partnerStats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white p-3 md:p-4 rounded-lg border border-blue-100 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-2">
                    <stat.icon className={`w-5 h-5 text-${stat.color}-600`} />
                    <Badge
                      className={
                        stat.color === "blue"
                          ? "bg-blue-600 text-white text-xs"
                          : stat.color === "green"
                            ? "bg-green-600 text-white text-xs"
                            : stat.color === "purple"
                              ? "bg-purple-600 text-white text-xs"
                              : "bg-orange-600 text-white text-xs"
                      }
                    >
                      Active
                    </Badge>
                  </div>
                  <p className="text-xl md:text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-600 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-lg border border-blue-100 p-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Top 5 Partners</h4>
              <div className="space-y-2">
                {topPartners.map((partner, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <Link
                      href={`/admin/partners/${partner.type === "College" ? "colleges" : "subagents"}`}
                      className="flex items-center space-x-3 flex-1 min-w-0"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          {partner.type === "College" ? (
                            <Building2 className="w-4 h-4 text-blue-600" />
                          ) : (
                            <UserCheck className="w-4 h-4 text-green-600" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 truncate">{partner.name}</p>
                          <p className="text-xs text-gray-600">
                            {partner.type === "College"
                              ? `${partner.applications} applications`
                              : `${partner.leads} leads`}
                          </p>
                        </div>
                      </div>
                    </Link>
                    <div className="text-right flex-shrink-0 ml-2">
                      <p className="text-sm font-bold text-gray-900">{partner.revenue}</p>
                      <Badge className="bg-green-600 text-white text-xs mt-1">Active</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <AIInsightsCard insights={aiInsights} />

        <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-base md:text-lg flex items-center text-purple-900">
              <TrendingUp className="w-5 h-5 mr-2" />
              Marketing Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Digital Marketing */}
              <div className="bg-white rounded-lg border border-purple-100 p-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  Digital Marketing
                </h4>
                <div className="space-y-3">
                  {digitalMarketing.map((channel, index) => (
                    <div key={index} className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-gray-700">{channel.channel}</span>
                        <Badge className="bg-green-100 text-green-800 text-xs">ROI: {channel.roi}</Badge>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-600">
                        <span>{channel.leads} leads</span>
                        <span>{channel.conversions} conversions</span>
                        <span className="font-semibold text-gray-900">{channel.cost}</span>
                      </div>
                      <Progress value={(channel.conversions / channel.leads) * 100} className="h-1.5 bg-blue-100" />
                    </div>
                  ))}
                  <div className="pt-2 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold text-gray-900">Total Digital</span>
                      <div className="text-right">
                        <p className="text-sm font-bold text-blue-600">744 leads</p>
                        <p className="text-xs text-gray-600">₹143K spent</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Offline Marketing */}
              <div className="bg-white rounded-lg border border-purple-100 p-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                  Offline Marketing
                </h4>
                <div className="space-y-3">
                  {offlineMarketing.map((channel, index) => (
                    <div key={index} className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-gray-700">{channel.channel}</span>
                        <Badge className="bg-green-100 text-green-800 text-xs">ROI: {channel.roi}</Badge>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-600">
                        <span>{channel.leads} leads</span>
                        <span>{channel.conversions} conversions</span>
                        <span className="font-semibold text-gray-900">{channel.cost}</span>
                      </div>
                      <Progress value={(channel.conversions / channel.leads) * 100} className="h-1.5 bg-orange-100" />
                    </div>
                  ))}
                  <div className="pt-2 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold text-gray-900">Total Offline</span>
                      <div className="text-right">
                        <p className="text-sm font-bold text-orange-600">435 leads</p>
                        <p className="text-xs text-gray-600">₹170K spent</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Overall Marketing Summary */}
            <div className="mt-4 p-4 bg-white rounded-lg border border-purple-100">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-gray-600">Total Leads</p>
                  <p className="text-xl font-bold text-gray-900">1,179</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Total Conversions</p>
                  <p className="text-xl font-bold text-green-600">180</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Total Spent</p>
                  <p className="text-xl font-bold text-gray-900">₹313K</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Avg ROI</p>
                  <p className="text-xl font-bold text-purple-600">235%</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <PerformanceChart
          title="6-Month Performance Trends"
          data={performanceData}
          type="line"
          dataKeys={[
            { key: "leads", color: "#3b82f6", label: "Leads" },
            { key: "conversions", color: "#10b981", label: "Conversions" },
            { key: "revenue", color: "#f59e0b", label: "Revenue (₹L)" },
          ]}
          height={250}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base md:text-lg">Conversion Funnel</CardTitle>
            </CardHeader>
            <CardContent className="pb-4">
              <div className="space-y-3">
                {conversionFunnel.map((item, index) => (
                  <div key={index} className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="text-xs md:text-sm font-medium text-gray-700">{item.stage}</span>
                      <span className="text-xs md:text-sm font-bold text-gray-900">
                        {item.count} ({item.percentage}%)
                      </span>
                    </div>
                    <Progress value={item.percentage} className="h-2 bg-blue-100" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base md:text-lg">Revenue Forecasting</CardTitle>
            </CardHeader>
            <CardContent className="pb-4">
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-600">Projected Revenue This Month</p>
                  <p className="text-2xl md:text-3xl font-bold text-blue-600 mt-1">₹12.5L</p>
                  <p className="text-xs text-gray-600 mt-1">Based on 45 applications in pipeline</p>
                </div>
                <div className="h-20 md:h-24 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-10 h-10 md:w-12 md:h-12 text-blue-400" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">Confidence Level</span>
                  <Badge className="bg-green-100 text-green-800 text-xs">85% High</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base md:text-lg">Counselor Leaderboard</CardTitle>
            </CardHeader>
            <CardContent className="pb-4">
              <div className="space-y-3">
                {counselorLeaderboard.map((counselor, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-7 h-7">
                        {counselor.rank === 1 && <span className="text-xl">🏆</span>}
                        {counselor.rank === 2 && <span className="text-xl">🥈</span>}
                        {counselor.rank === 3 && <span className="text-xl">🥉</span>}
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-gray-900">{counselor.name}</p>
                        <p className="text-xs text-gray-600">
                          {counselor.conversions} conversions | {counselor.revenue}
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800 text-xs">Target: {counselor.target}%</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base md:text-lg">Counselor Workload</CardTitle>
            </CardHeader>
            <CardContent className="pb-4">
              <div className="space-y-3">
                {["Amit", "Priya", "Rahul"].map((name, index) => (
                  <div key={index} className="space-y-2">
                    <p className="text-xs md:text-sm font-medium text-gray-700">{name}</p>
                    <div className="flex space-x-1">
                      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, dayIndex) => {
                        const intensity = Math.floor(Math.random() * 4)
                        return (
                          <div
                            key={dayIndex}
                            className={`flex-1 h-6 md:h-8 rounded ${
                              intensity === 3
                                ? "bg-red-500"
                                : intensity === 2
                                  ? "bg-yellow-500"
                                  : intensity === 1
                                    ? "bg-blue-500"
                                    : "bg-gray-200"
                            }`}
                            title={`${day}: ${intensity === 3 ? "Overloaded" : intensity === 2 ? "High" : intensity === 1 ? "Normal" : "Low"}`}
                          />
                        )
                      })}
                    </div>
                  </div>
                ))}
                <div className="flex items-center flex-wrap gap-3 text-xs text-gray-600 mt-4">
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-red-500 rounded"></div>
                    <span>Overloaded</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                    <span>High</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-blue-500 rounded"></div>
                    <span>Normal</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-gray-200 rounded"></div>
                    <span>Low</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          <Card className="border-amber-200 bg-amber-50">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-amber-900 text-base md:text-lg">
                <AlertCircle className="w-4 h-4 md:w-5 md:h-5 mr-2 text-amber-600" />
                Pending Tasks
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-4">
              <div className="space-y-3">
                <div className="space-y-2">
                  <p className="text-xs md:text-sm font-semibold text-red-700 flex items-center">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                    OVERDUE ({pendingTasks.filter((t) => t.overdue).length})
                  </p>
                  {pendingTasks
                    .filter((t) => t.overdue)
                    .map((task, index) => (
                      <div key={index} className="flex items-center justify-between p-2.5 md:p-3 bg-white rounded-lg">
                        <div className="flex-1 min-w-0">
                          <p className="text-xs md:text-sm font-medium text-gray-900 truncate">{task.task}</p>
                          <p className="text-xs text-red-600">{task.time}</p>
                        </div>
                        <div className="flex gap-1 ml-2">
                          <Button size="sm" className="h-7 text-xs bg-blue-600 hover:bg-blue-700 text-white px-2">
                            Assign
                          </Button>
                          <Button size="sm" className="h-7 text-xs bg-green-600 hover:bg-green-700 text-white px-2">
                            Call
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="space-y-2">
                  <p className="text-xs md:text-sm font-semibold text-yellow-700 flex items-center">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                    DUE SOON ({pendingTasks.filter((t) => !t.overdue).length})
                  </p>
                  {pendingTasks
                    .filter((t) => !t.overdue)
                    .map((task, index) => (
                      <div key={index} className="flex items-center justify-between p-2.5 md:p-3 bg-white rounded-lg">
                        <div className="flex-1 min-w-0">
                          <p className="text-xs md:text-sm font-medium text-gray-900 truncate">{task.task}</p>
                          <p className="text-xs text-yellow-600">{task.time}</p>
                        </div>
                        <div className="flex gap-1 ml-2">
                          <Button size="sm" className="h-7 text-xs bg-green-600 hover:bg-green-700 text-white px-2">
                            Call
                          </Button>
                          <Button size="sm" className="h-7 text-xs bg-gray-600 hover:bg-gray-700 text-white px-2">
                            Snooze
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              <Button variant="link" className="mt-3 text-amber-700 p-0 h-auto text-xs md:text-sm" asChild>
                <Link href="/admin/leads">
                  View All Tasks <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-1" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <StatusTimeline events={timelineEvents} title="Real-Time Activity Feed" />
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base md:text-lg">Branch Comparison</CardTitle>
          </CardHeader>
          <CardContent className="pb-4">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-2 md:p-3 text-xs md:text-sm font-semibold text-gray-700">Branch</th>
                    <th className="text-left p-2 md:p-3 text-xs md:text-sm font-semibold text-gray-700">Leads</th>
                    <th className="text-left p-2 md:p-3 text-xs md:text-sm font-semibold text-gray-700">Conv %</th>
                    <th className="text-left p-2 md:p-3 text-xs md:text-sm font-semibold text-gray-700">Revenue</th>
                    <th className="text-left p-2 md:p-3 text-xs md:text-sm font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {branchComparison.map((branch, index) => (
                    <tr key={index} className="border-t hover:bg-gray-50">
                      <td className="p-2 md:p-3 text-xs md:text-sm font-medium text-gray-900">{branch.branch}</td>
                      <td className="p-2 md:p-3 text-xs md:text-sm text-gray-700">{branch.leads}</td>
                      <td className="p-2 md:p-3 text-xs md:text-sm text-gray-700">{branch.convRate}%</td>
                      <td className="p-2 md:p-3 text-xs md:text-sm font-semibold text-gray-900">{branch.revenue}</td>
                      <td className="p-2 md:p-3">
                        {branch.best && (
                          <Badge className="bg-green-100 text-green-800 text-xs">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Best
                          </Badge>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-3 md:mt-4 p-3 md:p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-xs md:text-sm font-semibold text-blue-900">Best Practice from Mumbai:</p>
              <p className="text-xs md:text-sm text-blue-700 mt-1">"Quick response time (less than 1 hour)"</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
