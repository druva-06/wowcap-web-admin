"use client"
import { Plus, Download, TrendingUp, Target, DollarSign, Users, BarChart3, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function CampaignsPage() {
  const campaigns = [
    {
      id: 1,
      name: "USA Study 2025",
      type: "Facebook Ads",
      status: "Active",
      spend: "₹50,000",
      leads: 450,
      conversions: 45,
      conversionRate: 10,
      roi: 320,
      revenue: "₹1.8L",
    },
    {
      id: 2,
      name: "Canada PR Program",
      type: "Google Ads",
      status: "Active",
      spend: "₹40,000",
      leads: 320,
      conversions: 38,
      conversionRate: 12,
      roi: 280,
      revenue: "₹1.5L",
    },
    {
      id: 3,
      name: "UK Masters 2025",
      type: "Instagram",
      status: "Active",
      spend: "₹25,000",
      leads: 180,
      conversions: 14,
      conversionRate: 8,
      roi: 250,
      revenue: "₹0.72L",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Marketing Campaigns</h1>
          <p className="text-gray-600 mt-1">Track and optimize your marketing performance</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            New Campaign
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Spend</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">₹1,45,000</p>
                <p className="text-xs text-gray-500 mt-1">This month</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Leads Generated</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">1,040</p>
                <p className="text-xs text-green-600 mt-1">+15% vs last month</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Conversions</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">129</p>
                <p className="text-xs text-gray-500 mt-1">12.4% conv rate</p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Target className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Overall ROI</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">298%</p>
                <p className="text-xs text-gray-500 mt-1">₹4.32L revenue</p>
              </div>
              <div className="h-12 w-12 bg-amber-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Optimizer */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-900">
            <Lightbulb className="h-5 w-5" />
            AI Campaign Optimizer
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="h-2 w-2 bg-blue-600 rounded-full mt-2" />
              <div>
                <p className="text-sm text-gray-900 font-medium">Shift ₹10K from Instagram to Google Ads</p>
                <p className="text-xs text-gray-600">Expected: +15 high-quality leads (12% conv rate)</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-2 w-2 bg-blue-600 rounded-full mt-2" />
              <div>
                <p className="text-sm text-gray-900 font-medium">Facebook "USA Dream" variant performing 37% better</p>
                <p className="text-xs text-gray-600">Action: Increase budget by 20%</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-2 w-2 bg-blue-600 rounded-full mt-2" />
              <div>
                <p className="text-sm text-gray-900 font-medium">Best posting time: 8-10 PM (45% higher engagement)</p>
                <p className="text-xs text-gray-600">Schedule posts during peak hours</p>
              </div>
            </div>
          </div>
          <Button className="mt-4 bg-blue-600 hover:bg-blue-700">Apply Recommendations</Button>
        </CardContent>
      </Card>

      {/* Multi-Channel Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Multi-Channel Campaign Tracking</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Channel</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Spend</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Leads</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Cost/Lead</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Conv Rate</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Revenue</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">ROI</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-900">Facebook Ads</td>
                  <td className="py-3 px-4 text-sm text-gray-900">₹50,000</td>
                  <td className="py-3 px-4 text-sm text-gray-900">450</td>
                  <td className="py-3 px-4 text-sm text-gray-900">₹111</td>
                  <td className="py-3 px-4 text-sm text-gray-900">10%</td>
                  <td className="py-3 px-4 text-sm text-gray-900">₹1.8L</td>
                  <td className="py-3 px-4">
                    <Badge className="bg-green-100 text-green-700">320%</Badge>
                  </td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-900">Google Ads</td>
                  <td className="py-3 px-4 text-sm text-gray-900">₹40,000</td>
                  <td className="py-3 px-4 text-sm text-gray-900">320</td>
                  <td className="py-3 px-4 text-sm text-gray-900">₹125</td>
                  <td className="py-3 px-4 text-sm text-gray-900">12%</td>
                  <td className="py-3 px-4 text-sm text-gray-900">₹1.5L</td>
                  <td className="py-3 px-4">
                    <Badge className="bg-green-100 text-green-700">280%</Badge>
                  </td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-900">Instagram</td>
                  <td className="py-3 px-4 text-sm text-gray-900">₹25,000</td>
                  <td className="py-3 px-4 text-sm text-gray-900">180</td>
                  <td className="py-3 px-4 text-sm text-gray-900">₹139</td>
                  <td className="py-3 px-4 text-sm text-gray-900">8%</td>
                  <td className="py-3 px-4 text-sm text-gray-900">₹0.72L</td>
                  <td className="py-3 px-4">
                    <Badge className="bg-blue-100 text-blue-700">250%</Badge>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-900">Offline Events</td>
                  <td className="py-3 px-4 text-sm text-gray-900">₹30,000</td>
                  <td className="py-3 px-4 text-sm text-gray-900">90</td>
                  <td className="py-3 px-4 text-sm text-gray-900">₹333</td>
                  <td className="py-3 px-4 text-sm text-gray-900">15%</td>
                  <td className="py-3 px-4 text-sm text-gray-900">₹0.54L</td>
                  <td className="py-3 px-4">
                    <Badge className="bg-amber-100 text-amber-700">180%</Badge>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Campaign List */}
      <Card>
        <CardHeader>
          <CardTitle>Active Campaigns</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {campaigns.map((campaign) => (
              <div key={campaign.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-gray-900">{campaign.name}</h3>
                      <Badge variant="secondary">{campaign.type}</Badge>
                      <Badge className="bg-green-100 text-green-700">{campaign.status}</Badge>
                    </div>
                    <div className="grid grid-cols-6 gap-4 mt-3">
                      <div>
                        <p className="text-xs text-gray-600">Spend</p>
                        <p className="text-sm font-semibold text-gray-900">{campaign.spend}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Leads</p>
                        <p className="text-sm font-semibold text-gray-900">{campaign.leads}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Conversions</p>
                        <p className="text-sm font-semibold text-gray-900">{campaign.conversions}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Conv Rate</p>
                        <p className="text-sm font-semibold text-gray-900">{campaign.conversionRate}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Revenue</p>
                        <p className="text-sm font-semibold text-green-600">{campaign.revenue}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">ROI</p>
                        <p className="text-sm font-semibold text-blue-600">{campaign.roi}%</p>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Lead Quality by Source */}
      <Card>
        <CardHeader>
          <CardTitle>Lead Quality Score by Source</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="text-2xl">⭐⭐⭐⭐⭐</div>
                <div>
                  <p className="font-semibold text-gray-900">Referrals</p>
                  <p className="text-sm text-gray-600">Avg Score: 85/100 | Conv Rate: 45%</p>
                </div>
              </div>
              <p className="text-sm font-semibold text-gray-900">₹4.2L avg revenue</p>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="text-2xl">⭐⭐⭐⭐</div>
                <div>
                  <p className="font-semibold text-gray-900">Google Ads</p>
                  <p className="text-sm text-gray-600">Avg Score: 78/100 | Conv Rate: 38%</p>
                </div>
              </div>
              <p className="text-sm font-semibold text-gray-900">₹3.8L avg revenue</p>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="text-2xl">⭐⭐⭐</div>
                <div>
                  <p className="font-semibold text-gray-900">Facebook Ads</p>
                  <p className="text-sm text-gray-600">Avg Score: 65/100 | Conv Rate: 25%</p>
                </div>
              </div>
              <p className="text-sm font-semibold text-gray-900">₹2.5L avg revenue</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
