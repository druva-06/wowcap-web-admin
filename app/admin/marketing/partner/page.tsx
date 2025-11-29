"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, TrendingUp, DollarSign, Target, Plus, Download, Eye } from "lucide-react"

export default function PartnerMarketingPage() {
  const stats = [
    {
      title: "Active Partners",
      value: "23",
      change: "+5 this month",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Leads from Partners",
      value: "156",
      change: "+22.5%",
      icon: Target,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Partner Revenue",
      value: "₹2.8L",
      change: "+18.3%",
      icon: DollarSign,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Conversion Rate",
      value: "24.5%",
      change: "+5.2%",
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ]

  const partnerCampaigns = [
    {
      id: 1,
      partnerName: "EduConnect Mumbai",
      partnerType: "Sub-Agent",
      status: "active",
      leadsGenerated: 45,
      conversions: 12,
      conversionRate: "26.7%",
      revenue: "₹85K",
      commission: "₹12K",
    },
    {
      id: 2,
      partnerName: "Global Education Delhi",
      partnerType: "Sub-Agent",
      status: "active",
      leadsGenerated: 38,
      conversions: 9,
      conversionRate: "23.7%",
      revenue: "₹68K",
      commission: "₹9.5K",
    },
    {
      id: 3,
      partnerName: "Study Abroad Bangalore",
      partnerType: "Sub-Agent",
      status: "active",
      leadsGenerated: 32,
      conversions: 8,
      conversionRate: "25.0%",
      revenue: "₹56K",
      commission: "₹8K",
    },
    {
      id: 4,
      partnerName: "Career Counselors Pune",
      partnerType: "Sub-Agent",
      status: "active",
      leadsGenerated: 28,
      conversions: 6,
      conversionRate: "21.4%",
      revenue: "₹45K",
      commission: "₹6.5K",
    },
    {
      id: 5,
      partnerName: "Education Hub Hyderabad",
      partnerType: "Sub-Agent",
      status: "active",
      leadsGenerated: 13,
      conversions: 3,
      conversionRate: "23.1%",
      revenue: "₹28K",
      commission: "₹4K",
    },
  ]

  const collegePartners = [
    {
      id: 1,
      collegeName: "Harvard University",
      country: "USA",
      applications: 12,
      accepted: 8,
      acceptanceRate: "66.7%",
      revenue: "₹45K",
    },
    {
      id: 2,
      collegeName: "University of Toronto",
      country: "Canada",
      applications: 15,
      accepted: 11,
      acceptanceRate: "73.3%",
      revenue: "₹38K",
    },
    {
      id: 3,
      collegeName: "University of Melbourne",
      country: "Australia",
      applications: 10,
      accepted: 7,
      acceptanceRate: "70.0%",
      revenue: "₹32K",
    },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Partner Marketing</h1>
          <p className="text-gray-500 mt-1">Track sub-agent and college partner performance</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Partner
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
          <CardTitle>Sub-Agent Partner Performance</CardTitle>
          <CardDescription>Track leads and conversions from sub-agent partners</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {partnerCampaigns.map((partner) => (
              <div
                key={partner.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-gray-900">{partner.partnerName}</h3>
                    <Badge variant="outline">{partner.partnerType}</Badge>
                    <Badge variant="default">{partner.status}</Badge>
                  </div>
                  <div className="grid grid-cols-6 gap-4 mt-3">
                    <div>
                      <p className="text-xs text-gray-500">Leads Generated</p>
                      <p className="text-sm font-semibold text-gray-900">{partner.leadsGenerated}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Conversions</p>
                      <p className="text-sm font-semibold text-green-600">{partner.conversions}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Conversion Rate</p>
                      <p className="text-sm font-semibold text-gray-900">{partner.conversionRate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Revenue</p>
                      <p className="text-sm font-semibold text-gray-900">{partner.revenue}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Commission</p>
                      <p className="text-sm font-semibold text-blue-600">{partner.commission}</p>
                    </div>
                    <div className="flex items-end">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
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
          <CardTitle>College Partner Performance</CardTitle>
          <CardDescription>Track applications and acceptance rates from college partners</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {collegePartners.map((college) => (
              <div
                key={college.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-gray-900">{college.collegeName}</h3>
                    <Badge variant="outline">{college.country}</Badge>
                  </div>
                  <div className="grid grid-cols-5 gap-4 mt-3">
                    <div>
                      <p className="text-xs text-gray-500">Applications</p>
                      <p className="text-sm font-semibold text-gray-900">{college.applications}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Accepted</p>
                      <p className="text-sm font-semibold text-green-600">{college.accepted}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Acceptance Rate</p>
                      <p className="text-sm font-semibold text-gray-900">{college.acceptanceRate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Revenue</p>
                      <p className="text-sm font-semibold text-gray-900">{college.revenue}</p>
                    </div>
                    <div className="flex items-end">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
