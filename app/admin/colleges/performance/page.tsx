"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, TrendingDown, DollarSign, FileText, Users, Award, Target, Download, Calendar } from "lucide-react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

export default function PartnershipPerformancePage() {
  const [timeRange, setTimeRange] = useState("6months")
  const [selectedPartner, setSelectedPartner] = useState("all")

  const overallMetrics = [
    {
      title: "Total Partner Revenue",
      value: "₹505.2L",
      change: "+18.5%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Total Applications",
      value: "375",
      change: "+12.3%",
      trend: "up",
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Success Rate",
      value: "68.5%",
      change: "+5.2%",
      trend: "up",
      icon: Target,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Active Partnerships",
      value: "10",
      change: "+2",
      trend: "up",
      icon: Users,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ]

  const revenueData = [
    { month: "Jan", revenue: 42.5, applications: 28 },
    { month: "Feb", revenue: 48.2, applications: 32 },
    { month: "Mar", revenue: 55.8, applications: 38 },
    { month: "Apr", revenue: 62.3, applications: 42 },
    { month: "May", revenue: 71.5, applications: 48 },
    { month: "Jun", revenue: 78.9, applications: 52 },
  ]

  const partnerComparison = [
    { name: "Harvard", applications: 45, revenue: 85.2, successRate: 72 },
    { name: "Stanford", applications: 38, revenue: 72.5, successRate: 68 },
    { name: "MIT", applications: 32, revenue: 68.8, successRate: 75 },
    { name: "Coursera", applications: 120, revenue: 95.0, successRate: 85 },
    { name: "Melbourne", applications: 25, revenue: 58.5, successRate: 64 },
  ]

  const topPerformers = [
    {
      rank: 1,
      name: "Coursera",
      country: "Global",
      applications: 120,
      revenue: "₹95.0L",
      successRate: "85%",
      growth: "+25%",
    },
    {
      rank: 2,
      name: "Harvard University",
      country: "USA",
      applications: 45,
      revenue: "₹85.2L",
      successRate: "72%",
      growth: "+18%",
    },
    {
      rank: 3,
      name: "Stanford University",
      country: "USA",
      applications: 38,
      revenue: "₹72.5L",
      successRate: "68%",
      growth: "+15%",
    },
    {
      rank: 4,
      name: "MIT",
      country: "USA",
      applications: 32,
      revenue: "₹68.8L",
      successRate: "75%",
      growth: "+20%",
    },
    {
      rank: 5,
      name: "University of Melbourne",
      country: "Australia",
      applications: 25,
      revenue: "₹58.5L",
      successRate: "64%",
      growth: "+12%",
    },
  ]

  const growthAnalytics = [
    {
      category: "Revenue Growth",
      value: "+18.5%",
      description: "Compared to last 6 months",
      trend: "up",
    },
    {
      category: "Application Volume",
      value: "+12.3%",
      description: "Month-over-month increase",
      trend: "up",
    },
    {
      category: "Partner Satisfaction",
      value: "4.7/5.0",
      description: "Average partner rating",
      trend: "up",
    },
    {
      category: "Response Time",
      value: "2.3 days",
      description: "Average application processing",
      trend: "down",
    },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Partnership Performance</h1>
          <p className="text-gray-600 mt-1">Track and analyze partnership metrics and growth</p>
        </div>
        <div className="flex gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">Last Month</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {overallMetrics.map((metric, index) => (
          <Card key={index} className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{metric.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{metric.value}</p>
                  <div className="flex items-center gap-1 mt-2">
                    {metric.trend === "up" ? (
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-600" />
                    )}
                    <span
                      className={`text-sm font-medium ${metric.trend === "up" ? "text-green-600" : "text-red-600"}`}
                    >
                      {metric.change}
                    </span>
                  </div>
                </div>
                <div className={`${metric.bgColor} p-3 rounded-lg transition-transform duration-300 hover:scale-110`}>
                  <metric.icon className={`h-6 w-6 ${metric.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} name="Revenue (₹L)" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Application Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="applications" stroke="#10b981" strokeWidth={2} name="Applications" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Partner Performance Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={partnerComparison}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="applications" fill="#3b82f6" name="Applications" />
              <Bar yAxisId="right" dataKey="revenue" fill="#10b981" name="Revenue (₹L)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-yellow-600" />
              Top Performing Partners
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPerformers.map((partner) => (
                <div key={partner.rank} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full font-bold">
                    {partner.rank}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">{partner.name}</h4>
                        <p className="text-sm text-gray-600">{partner.country}</p>
                      </div>
                      <Badge className="bg-green-100 text-green-700 border-green-200">{partner.growth}</Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-2">
                      <div>
                        <div className="text-xs text-gray-600">Applications</div>
                        <div className="text-sm font-semibold text-gray-900">{partner.applications}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-600">Revenue</div>
                        <div className="text-sm font-semibold text-green-600">{partner.revenue}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-600">Success Rate</div>
                        <div className="text-sm font-semibold text-blue-600">{partner.successRate}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Growth Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {growthAnalytics.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">{item.category}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-gray-900">{item.value}</span>
                      {item.trend === "up" ? (
                        <TrendingUp className="h-4 w-4 text-green-600" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-600" />
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-gray-600">{item.description}</p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${item.trend === "up" ? "bg-green-600" : "bg-blue-600"}`}
                      style={{ width: `${Math.random() * 40 + 60}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Partnership Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900">Best Performing Region</h4>
              </div>
              <p className="text-2xl font-bold text-blue-600">USA</p>
              <p className="text-sm text-gray-600 mt-1">45% of total applications</p>
            </div>

            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                  <Award className="h-5 w-5 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900">Highest Success Rate</h4>
              </div>
              <p className="text-2xl font-bold text-green-600">Coursera</p>
              <p className="text-sm text-gray-600 mt-1">85% application success rate</p>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900">Peak Application Period</h4>
              </div>
              <p className="text-2xl font-bold text-purple-600">May-June</p>
              <p className="text-sm text-gray-600 mt-1">52 applications in June</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
