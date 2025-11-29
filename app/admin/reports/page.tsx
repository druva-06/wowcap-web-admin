"use client"

import { Download, BarChart3, TrendingUp, Users, DollarSign, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600 mt-1">Generate insights and export reports</p>
        </div>
        <div className="flex gap-3">
          <Select defaultValue="month">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Time Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Download className="h-4 w-4 mr-2" />
            Export All Reports
          </Button>
        </div>
      </div>

      {/* Quick Reports */}
      <div className="grid grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">Lead Performance Report</h3>
                <p className="text-sm text-gray-600 mt-1">Conversion rates and lead quality</p>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4 bg-transparent">
              <Download className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">Revenue Report</h3>
                <p className="text-sm text-gray-600 mt-1">Income, expenses, and profit margins</p>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4 bg-transparent">
              <Download className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">Counselor Performance</h3>
                <p className="text-sm text-gray-600 mt-1">Individual and team metrics</p>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4 bg-transparent">
              <Download className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Predictive Analytics */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-900">
            <BarChart3 className="h-5 w-5" />
            Predictive Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Based on current trends:</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-700">Expected conversions this month</span>
                  <span className="font-semibold text-blue-900">45-52</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-700">Expected revenue</span>
                  <span className="font-semibold text-blue-900">₹12-15L</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-700">Confidence level</span>
                  <span className="font-semibold text-green-600">85%</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Funnel Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Funnel Drop-off Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-700">Lead → Contacted</span>
                <span className="font-semibold text-green-600">95% (Good)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: "95%" }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-700">Contacted → Interested</span>
                <span className="font-semibold text-blue-600">70% (Average)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: "70%" }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-700">Interested → Applied</span>
                <span className="font-semibold text-amber-600">45% (Needs improvement)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-amber-600 h-2 rounded-full" style={{ width: "45%" }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-700">Applied → Enrolled</span>
                <span className="font-semibold text-green-600">80% (Good)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: "80%" }} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Scheduled Reports */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Scheduled Reports
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 border rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-gray-900">Weekly Performance Summary</p>
                  <p className="text-sm text-gray-600 mt-1">Sent every Monday 9 AM to CEO</p>
                </div>
                <Button size="sm" variant="outline">
                  Edit
                </Button>
              </div>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-gray-900">Individual Counselor Reports</p>
                  <p className="text-sm text-gray-600 mt-1">Sent every Monday 9 AM to managers</p>
                </div>
                <Button size="sm" variant="outline">
                  Edit
                </Button>
              </div>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-gray-900">Branch Comparison</p>
                  <p className="text-sm text-gray-600 mt-1">Sent every Monday 9 AM to regional heads</p>
                </div>
                <Button size="sm" variant="outline">
                  Edit
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
