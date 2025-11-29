"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, MousePointer, Mail, MessageSquare, Users, DollarSign, TrendingUp, Plus, Download } from "lucide-react"

export default function DigitalCampaignsPage() {
  const stats = [
    {
      title: "Total Campaigns",
      value: "32",
      change: "+8 this month",
      icon: MousePointer,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Leads Generated",
      value: "542",
      change: "+22.5%",
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Total Spend",
      value: "₹1.2L",
      change: "+12.3%",
      icon: DollarSign,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Avg. ROI",
      value: "285%",
      change: "+15.2%",
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ]

  const googleAdsCampaigns = [
    {
      id: 1,
      name: "Study Abroad - Search Ads",
      status: "active",
      budget: "₹45K",
      spent: "₹38K",
      impressions: "125K",
      clicks: "3.2K",
      ctr: "2.56%",
      leads: 156,
      cpl: "₹244",
    },
    {
      id: 2,
      name: "MBA Programs - Display Network",
      status: "active",
      budget: "₹35K",
      spent: "₹28K",
      impressions: "98K",
      clicks: "2.1K",
      ctr: "2.14%",
      leads: 98,
      cpl: "₹286",
    },
  ]

  const emailCampaigns = [
    {
      id: 1,
      name: "UK Universities Newsletter",
      status: "sent",
      sent: "5,234",
      opened: "2,156",
      openRate: "41.2%",
      clicked: 456,
      clickRate: "8.7%",
      leads: 34,
    },
    {
      id: 2,
      name: "Application Deadline Reminder",
      status: "sent",
      sent: "3,890",
      opened: "1,789",
      openRate: "46.0%",
      clicked: 389,
      clickRate: "10.0%",
      leads: 28,
    },
  ]

  const whatsappCampaigns = [
    {
      id: 1,
      name: "Study Visa Updates",
      status: "active",
      sent: "2,456",
      delivered: "2,398",
      read: "2,145",
      readRate: "89.4%",
      responses: 456,
      leads: 45,
    },
    {
      id: 2,
      name: "Scholarship Opportunities",
      status: "active",
      sent: "1,890",
      delivered: "1,856",
      read: "1,678",
      readRate: "90.4%",
      responses: 389,
      leads: 38,
    },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Digital Campaigns</h1>
          <p className="text-gray-500 mt-1">Manage Google Ads, Email, and WhatsApp campaigns</p>
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

      <Tabs defaultValue="google" className="space-y-6">
        <TabsList>
          <TabsTrigger value="google">
            <Search className="w-4 h-4 mr-2" />
            Google Ads
          </TabsTrigger>
          <TabsTrigger value="email">
            <Mail className="w-4 h-4 mr-2" />
            Email Marketing
          </TabsTrigger>
          <TabsTrigger value="whatsapp">
            <MessageSquare className="w-4 h-4 mr-2" />
            WhatsApp
          </TabsTrigger>
        </TabsList>

        <TabsContent value="google" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Google Ads Campaigns</CardTitle>
              <CardDescription>Track Google Search and Display Network campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {googleAdsCampaigns.map((campaign) => (
                  <div
                    key={campaign.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-gray-900">{campaign.name}</h3>
                        <Badge variant="default">{campaign.status}</Badge>
                      </div>
                      <div className="grid grid-cols-7 gap-4 mt-3">
                        <div>
                          <p className="text-xs text-gray-500">Budget</p>
                          <p className="text-sm font-semibold text-gray-900">{campaign.budget}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Spent</p>
                          <p className="text-sm font-semibold text-gray-900">{campaign.spent}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Impressions</p>
                          <p className="text-sm font-semibold text-gray-900">{campaign.impressions}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Clicks</p>
                          <p className="text-sm font-semibold text-gray-900">{campaign.clicks}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">CTR</p>
                          <p className="text-sm font-semibold text-gray-900">{campaign.ctr}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Leads</p>
                          <p className="text-sm font-semibold text-green-600">{campaign.leads}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">CPL</p>
                          <p className="text-sm font-semibold text-gray-900">{campaign.cpl}</p>
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

        <TabsContent value="email" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Email Marketing Campaigns</CardTitle>
              <CardDescription>Track email newsletter and promotional campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {emailCampaigns.map((campaign) => (
                  <div
                    key={campaign.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-gray-900">{campaign.name}</h3>
                        <Badge variant="secondary">{campaign.status}</Badge>
                      </div>
                      <div className="grid grid-cols-6 gap-4 mt-3">
                        <div>
                          <p className="text-xs text-gray-500">Sent</p>
                          <p className="text-sm font-semibold text-gray-900">{campaign.sent}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Opened</p>
                          <p className="text-sm font-semibold text-gray-900">{campaign.opened}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Open Rate</p>
                          <p className="text-sm font-semibold text-green-600">{campaign.openRate}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Clicked</p>
                          <p className="text-sm font-semibold text-gray-900">{campaign.clicked}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Click Rate</p>
                          <p className="text-sm font-semibold text-blue-600">{campaign.clickRate}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Leads</p>
                          <p className="text-sm font-semibold text-green-600">{campaign.leads}</p>
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

        <TabsContent value="whatsapp" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>WhatsApp Campaigns</CardTitle>
              <CardDescription>Track WhatsApp broadcast and messaging campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {whatsappCampaigns.map((campaign) => (
                  <div
                    key={campaign.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-gray-900">{campaign.name}</h3>
                        <Badge variant="default">{campaign.status}</Badge>
                      </div>
                      <div className="grid grid-cols-6 gap-4 mt-3">
                        <div>
                          <p className="text-xs text-gray-500">Sent</p>
                          <p className="text-sm font-semibold text-gray-900">{campaign.sent}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Delivered</p>
                          <p className="text-sm font-semibold text-gray-900">{campaign.delivered}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Read</p>
                          <p className="text-sm font-semibold text-gray-900">{campaign.read}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Read Rate</p>
                          <p className="text-sm font-semibold text-green-600">{campaign.readRate}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Responses</p>
                          <p className="text-sm font-semibold text-gray-900">{campaign.responses}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Leads</p>
                          <p className="text-sm font-semibold text-green-600">{campaign.leads}</p>
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
      </Tabs>
    </div>
  )
}
