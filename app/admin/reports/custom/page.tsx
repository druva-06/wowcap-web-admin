"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Download, Plus, X, BarChart3, FileText, TrendingUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function CustomReportsPage() {
  const [reportName, setReportName] = useState("")
  const [reportType, setReportType] = useState("")
  const [dateRange, setDateRange] = useState("")
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([])
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const [savedReports, setSavedReports] = useState([
    {
      id: 1,
      name: "Monthly Revenue by Source",
      type: "Revenue",
      created: "2024-01-15",
      lastRun: "2024-01-20",
    },
    {
      id: 2,
      name: "Lead Conversion by Counselor",
      type: "Lead Performance",
      created: "2024-01-10",
      lastRun: "2024-01-19",
    },
    {
      id: 3,
      name: "College-wise Application Success",
      type: "Applications",
      created: "2024-01-05",
      lastRun: "2024-01-18",
    },
  ])

  const reportTypes = [
    "Lead Performance",
    "Revenue Analysis",
    "Applications",
    "Counselor Performance",
    "Marketing ROI",
    "Partner Performance",
    "Student Progress",
  ]

  const availableMetrics = [
    "Total Leads",
    "Conversion Rate",
    "Revenue Generated",
    "Applications Submitted",
    "Offers Received",
    "Enrollments",
    "Average Deal Value",
    "Time to Conversion",
    "Lead Source Distribution",
    "Counselor Performance",
  ]

  const availableFilters = [
    "Date Range",
    "Lead Source",
    "Counselor",
    "Branch",
    "Lead Status",
    "Country",
    "Course Level",
    "College",
  ]

  const toggleMetric = (metric: string) => {
    setSelectedMetrics((prev) => (prev.includes(metric) ? prev.filter((m) => m !== metric) : [...prev, metric]))
  }

  const toggleFilter = (filter: string) => {
    setSelectedFilters((prev) => (prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]))
  }

  const handleGenerateReport = () => {
    console.log("Generating report:", {
      reportName,
      reportType,
      dateRange,
      selectedMetrics,
      selectedFilters,
    })
    alert("Report generated successfully! Download will start shortly.")
  }

  const handleSaveReport = () => {
    if (!reportName || !reportType) {
      alert("Please enter report name and select report type")
      return
    }
    const newReport = {
      id: savedReports.length + 1,
      name: reportName,
      type: reportType,
      created: new Date().toISOString().split("T")[0],
      lastRun: new Date().toISOString().split("T")[0],
    }
    setSavedReports([newReport, ...savedReports])
    alert("Report template saved successfully!")
    setReportName("")
    setReportType("")
    setSelectedMetrics([])
    setSelectedFilters([])
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Custom Reports Builder</h1>
          <p className="text-gray-600 mt-1">Create custom reports with your preferred metrics and filters</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <FileText className="h-4 w-4 mr-2" />
          View All Reports
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Report Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="reportName">Report Name</Label>
                  <Input
                    id="reportName"
                    placeholder="e.g., Monthly Lead Performance"
                    value={reportName}
                    onChange={(e) => setReportName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reportType">Report Type</Label>
                  <Select value={reportType} onValueChange={setReportType}>
                    <SelectTrigger id="reportType">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {reportTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateRange">Date Range</Label>
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger id="dateRange">
                    <SelectValue placeholder="Select date range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="yesterday">Yesterday</SelectItem>
                    <SelectItem value="last7days">Last 7 Days</SelectItem>
                    <SelectItem value="last30days">Last 30 Days</SelectItem>
                    <SelectItem value="thismonth">This Month</SelectItem>
                    <SelectItem value="lastmonth">Last Month</SelectItem>
                    <SelectItem value="thisquarter">This Quarter</SelectItem>
                    <SelectItem value="thisyear">This Year</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label>Select Metrics</Label>
                <div className="grid grid-cols-2 gap-3">
                  {availableMetrics.map((metric) => (
                    <div key={metric} className="flex items-center space-x-2">
                      <Checkbox
                        id={metric}
                        checked={selectedMetrics.includes(metric)}
                        onCheckedChange={() => toggleMetric(metric)}
                      />
                      <label
                        htmlFor={metric}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        {metric}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Label>Apply Filters</Label>
                <div className="grid grid-cols-2 gap-3">
                  {availableFilters.map((filter) => (
                    <div key={filter} className="flex items-center space-x-2">
                      <Checkbox
                        id={filter}
                        checked={selectedFilters.includes(filter)}
                        onCheckedChange={() => toggleFilter(filter)}
                      />
                      <label
                        htmlFor={filter}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        {filter}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button onClick={handleGenerateReport} className="bg-blue-600 hover:bg-blue-700 flex-1">
                  <Download className="h-4 w-4 mr-2" />
                  Generate & Download Report
                </Button>
                <Button onClick={handleSaveReport} variant="outline" className="flex-1 bg-transparent">
                  <Plus className="h-4 w-4 mr-2" />
                  Save as Template
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Report Preview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">Report Name:</p>
                <p className="text-sm text-gray-900">{reportName || "Not set"}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">Report Type:</p>
                <p className="text-sm text-gray-900">{reportType || "Not selected"}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">Date Range:</p>
                <p className="text-sm text-gray-900">{dateRange || "Not selected"}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">Selected Metrics:</p>
                <div className="flex flex-wrap gap-2">
                  {selectedMetrics.length > 0 ? (
                    selectedMetrics.map((metric) => (
                      <Badge key={metric} variant="secondary" className="text-xs">
                        {metric}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No metrics selected</p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">Applied Filters:</p>
                <div className="flex flex-wrap gap-2">
                  {selectedFilters.length > 0 ? (
                    selectedFilters.map((filter) => (
                      <Badge key={filter} variant="outline" className="text-xs">
                        {filter}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No filters applied</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center p-2 rounded-lg transition-colors duration-200 hover:bg-gray-50">
                <span className="text-sm text-gray-600">Total Reports Created</span>
                <span className="font-semibold text-gray-900">24</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded-lg transition-colors duration-200 hover:bg-gray-50">
                <span className="text-sm text-gray-600">Reports This Month</span>
                <span className="font-semibold text-gray-900">8</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded-lg transition-colors duration-200 hover:bg-gray-50">
                <span className="text-sm text-gray-600">Saved Templates</span>
                <span className="font-semibold text-gray-900">{savedReports.length}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Saved Report Templates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {savedReports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-semibold text-gray-900">{report.name}</p>
                      <div className="flex items-center gap-4 mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {report.type}
                        </Badge>
                        <span className="text-xs text-gray-500">Created: {report.created}</span>
                        <span className="text-xs text-gray-500">Last run: {report.lastRun}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="bg-transparent">
                    <Download className="h-4 w-4 mr-2" />
                    Run
                  </Button>
                  <Button size="sm" variant="outline" className="bg-transparent">
                    Edit
                  </Button>
                  <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                    <X className="h-4 w-4" />
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
