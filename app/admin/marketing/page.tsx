"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, TrendingDown, Users, DollarSign, Target, BarChart3, Plus, Download, Eye } from "lucide-react"
import Link from "next/link"

export default function MarketingOverviewPage() {
  const overallStats = [
    {
      title: "Total Leads Generated",
      value: "1,247",
      change: "+12.5%",
      trend: "up",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Marketing Spend",
      value: "₹3.2L",
      change: "+8.3%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Cost Per Lead",
      value: "₹257",
      change: "-15.2%",
      trend: "down",
      icon: Target,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Conversion Rate",
      value: "18.5%",
      change: "+3.2%",
      trend: "up",
      icon: BarChart3,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ]

  const channelPerformance = [
    {
      channel: "Digital Marketing",
      leads: 542,
      spend: "₹1.2L",
      cpl: "₹221",
      conversions: 98,
      roi: "285%",
      status: "active",
    },
    {
      channel: "Offline Marketing",
      leads: 385,
      spend: "₹95K",
      cpl: "₹247",
      conversions: 72,
      roi: "245%",
      status: "active",
    },
    {
      channel: "Webinars",
      leads: 156,
      spend: "₹45K",
      cpl: "₹288",
      conversions: 34,
      roi: "198%",
      status: "active",
    },
    {
      channel: "Social Media",
      leads: 98,
      spend: "₹35K",
      cpl: "₹357",
      conversions: 18,
      roi: "165%",
      status: "active",
    },
    {
      channel: "Content Marketing",
      leads: 45,
      spend: "₹28K",
      cpl: "₹622",
      conversions: 12,
      roi: "142%",
      status: "active",
    },
    {
      channel: "Partner Marketing",
      leads: 21,
      spend: "₹15K",
      cpl: "₹714",
      conversions: 6,
      roi: "128%",
      status: "active",
    },
  ]

  const recentCampaigns = [
    {
      id: 1,
      name: "Study Abroad Webinar - USA Universities",
      channel: "Webinars",
      status: "active",
      startDate: "2024-01-15",
      endDate: "2024-02-15",
      budget: "₹25K",
      spent: "₹18K",
      leads: 45,
      conversions: 12,
    },
    {
      id: 2,
      name: "Facebook Lead Generation - UK Programs",
      channel: "Digital",
      status: "active",
      startDate: "2024-01-10",
      endDate: "2024-02-28",
      budget: "₹50K",
      spent: "₹42K",
      leads: 156,
      conversions: 28,
    },
    {
      id: 3,
      name: "Education Fair - Mumbai",
      channel: "Offline",
      status: "completed",
      startDate: "2024-01-05",
      endDate: "2024-01-07",
      budget: "₹35K",
      spent: "₹35K",
      leads: 89,
      conversions: 18,
    },
    {
      id: 4,
      name: "Instagram Stories - Canada Study",
      channel: "Social Media",
      status: "active",
      startDate: "2024-01-20",
      endDate: "2024-02-20",
      budget: "₹15K",
      spent: "₹8K",
      leads: 34,
      conversions: 6,
    },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Marketing Overview</h1>
          <p className="text-gray-500 mt-1">Track and manage all marketing activities</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            New Campaign
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overallStats.map((stat, index) => {
          const Icon = stat.icon
          const isPositive = stat.trend === "up"
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <Badge variant={isPositive ? "default" : "secondary"} className="flex items-center gap-1">
                    {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {stat.change}
                  </Badge>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Tabs defaultValue="channels" className="space-y-6">
        <TabsList>
          <TabsTrigger value="channels">Channel Performance</TabsTrigger>
          <TabsTrigger value="campaigns">Recent Campaigns</TabsTrigger>
        </TabsList>

        <TabsContent value="channels" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Marketing Channel Performance</CardTitle>
              <CardDescription>Compare performance across all marketing channels</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {channelPerformance.map((channel, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-gray-900">{channel.channel}</h3>
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          {channel.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-5 gap-4 mt-3">
                        <div>
                          <p className="text-xs text-gray-500">Leads</p>
                          <p className="text-sm font-semibold text-gray-900">{channel.leads}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Spend</p>
                          <p className="text-sm font-semibold text-gray-900">{channel.spend}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">CPL</p>
                          <p className="text-sm font-semibold text-gray-900">{channel.cpl}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Conversions</p>
                          <p className="text-sm font-semibold text-gray-900">{channel.conversions}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">ROI</p>
                          <p className="text-sm font-semibold text-green-600">{channel.roi}</p>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Campaigns</CardTitle>
              <CardDescription>Track performance of your latest marketing campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentCampaigns.map((campaign) => (
                  <div
                    key={campaign.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-gray-900">{campaign.name}</h3>
                        <Badge variant={campaign.status === "active" ? "default" : "secondary"}>
                          {campaign.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-6 gap-4 mt-3">
                        <div>
                          <p className="text-xs text-gray-500">Channel</p>
                          <p className="text-sm font-semibold text-gray-900">{campaign.channel}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Budget</p>
                          <p className="text-sm font-semibold text-gray-900">{campaign.budget}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Spent</p>
                          <p className="text-sm font-semibold text-gray-900">{campaign.spent}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Leads</p>
                          <p className="text-sm font-semibold text-gray-900">{campaign.leads}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Conversions</p>
                          <p className="text-sm font-semibold text-gray-900">{campaign.conversions}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Duration</p>
                          <p className="text-sm font-semibold text-gray-900">
                            {new Date(campaign.startDate).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}{" "}
                            -{" "}
                            {new Date(campaign.endDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/admin/marketing/campaigns/${campaign.id}`}>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button variant="outline" size="sm">
                        Edit
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
