"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Facebook, Instagram, Linkedin, Users, Heart, MessageCircle, Share2, Plus, Download } from "lucide-react"

export default function SocialMediaPage() {
  const stats = [
    {
      title: "Total Followers",
      value: "45.2K",
      change: "+2.5K this month",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Engagement Rate",
      value: "8.5%",
      change: "+1.2%",
      icon: Heart,
      color: "text-pink-600",
      bgColor: "bg-pink-50",
    },
    {
      title: "Leads Generated",
      value: "98",
      change: "+15.3%",
      icon: MessageCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Total Reach",
      value: "156K",
      change: "+18.7%",
      icon: Share2,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ]

  const facebookCampaigns = [
    {
      id: 1,
      name: "Study in USA - Lead Generation",
      status: "active",
      budget: "₹25K",
      spent: "₹18K",
      reach: "45K",
      engagement: "3.2K",
      leads: 34,
      cpl: "₹529",
    },
    {
      id: 2,
      name: "UK Universities - Brand Awareness",
      status: "active",
      budget: "₹15K",
      spent: "₹12K",
      reach: "32K",
      engagement: "2.1K",
      leads: 21,
      cpl: "₹571",
    },
  ]

  const instagramCampaigns = [
    {
      id: 1,
      name: "Student Success Stories",
      status: "active",
      posts: 12,
      reach: "28K",
      likes: "2.4K",
      comments: 156,
      shares: 89,
      leads: 18,
    },
    {
      id: 2,
      name: "Campus Life Reels",
      status: "active",
      posts: 8,
      reach: "35K",
      likes: "3.1K",
      comments: 234,
      shares: 145,
      leads: 25,
    },
  ]

  const linkedinCampaigns = [
    {
      id: 1,
      name: "MBA Programs - Professional Network",
      status: "active",
      impressions: "15K",
      clicks: 456,
      engagement: "5.2%",
      leads: 12,
    },
    {
      id: 2,
      name: "Career Opportunities Abroad",
      status: "active",
      impressions: "12K",
      clicks: 389,
      engagement: "4.8%",
      leads: 9,
    },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Social Media Campaigns</h1>
          <p className="text-gray-500 mt-1">Manage campaigns across Facebook, Instagram, LinkedIn, and Twitter</p>
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

      <Tabs defaultValue="facebook" className="space-y-6">
        <TabsList>
          <TabsTrigger value="facebook">
            <Facebook className="w-4 h-4 mr-2" />
            Facebook
          </TabsTrigger>
          <TabsTrigger value="instagram">
            <Instagram className="w-4 h-4 mr-2" />
            Instagram
          </TabsTrigger>
          <TabsTrigger value="linkedin">
            <Linkedin className="w-4 h-4 mr-2" />
            LinkedIn
          </TabsTrigger>
        </TabsList>

        <TabsContent value="facebook" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Facebook Campaigns</CardTitle>
              <CardDescription>Track Facebook ad campaigns and lead generation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {facebookCampaigns.map((campaign) => (
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
                          <p className="text-xs text-gray-500">Budget</p>
                          <p className="text-sm font-semibold text-gray-900">{campaign.budget}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Spent</p>
                          <p className="text-sm font-semibold text-gray-900">{campaign.spent}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Reach</p>
                          <p className="text-sm font-semibold text-gray-900">{campaign.reach}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Engagement</p>
                          <p className="text-sm font-semibold text-gray-900">{campaign.engagement}</p>
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

        <TabsContent value="instagram" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Instagram Campaigns</CardTitle>
              <CardDescription>Track Instagram posts, stories, and reels performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {instagramCampaigns.map((campaign) => (
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
                          <p className="text-xs text-gray-500">Posts</p>
                          <p className="text-sm font-semibold text-gray-900">{campaign.posts}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Reach</p>
                          <p className="text-sm font-semibold text-gray-900">{campaign.reach}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Likes</p>
                          <p className="text-sm font-semibold text-gray-900">{campaign.likes}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Comments</p>
                          <p className="text-sm font-semibold text-gray-900">{campaign.comments}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Shares</p>
                          <p className="text-sm font-semibold text-gray-900">{campaign.shares}</p>
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

        <TabsContent value="linkedin" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>LinkedIn Campaigns</CardTitle>
              <CardDescription>Track LinkedIn professional network campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {linkedinCampaigns.map((campaign) => (
                  <div
                    key={campaign.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-gray-900">{campaign.name}</h3>
                        <Badge variant="default">{campaign.status}</Badge>
                      </div>
                      <div className="grid grid-cols-4 gap-4 mt-3">
                        <div>
                          <p className="text-xs text-gray-500">Impressions</p>
                          <p className="text-sm font-semibold text-gray-900">{campaign.impressions}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Clicks</p>
                          <p className="text-sm font-semibold text-gray-900">{campaign.clicks}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Engagement</p>
                          <p className="text-sm font-semibold text-gray-900">{campaign.engagement}</p>
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
