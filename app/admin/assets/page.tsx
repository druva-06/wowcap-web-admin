"use client"

import { Search, Plus, Download, Laptop, Monitor, Smartphone, Wrench } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function AssetsPage() {
  const assets = [
    {
      id: "LP-045",
      name: 'MacBook Pro 16"',
      type: "Laptop",
      assignedTo: "Amit Kumar",
      purchaseDate: "Jan 2023",
      warranty: "Valid until Jan 2026",
      condition: "Good",
      value: "₹65,000",
      currentValue: "₹32,500",
    },
    {
      id: "MN-023",
      name: 'Dell Monitor 27"',
      type: "Monitor",
      assignedTo: "Priya Sharma",
      purchaseDate: "Mar 2023",
      warranty: "Valid until Mar 2026",
      condition: "Excellent",
      value: "₹25,000",
      currentValue: "₹18,750",
    },
    {
      id: "PH-089",
      name: "iPhone 14 Pro",
      type: "Phone",
      assignedTo: "Rahul Verma",
      purchaseDate: "Sep 2023",
      warranty: "Valid until Sep 2024",
      condition: "Good",
      value: "₹1,20,000",
      currentValue: "₹90,000",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Assets Management</h1>
          <p className="text-gray-600 mt-1">Track and manage company assets</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Asset
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6">
        <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Assets</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">156</p>
                <p className="text-xs text-gray-500 mt-1">Across all branches</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center transition-transform duration-300 hover:scale-110">
                <Laptop className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Value</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">₹85L</p>
                <p className="text-xs text-gray-500 mt-1">Purchase value</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center transition-transform duration-300 hover:scale-110">
                <Monitor className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Current Value</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">₹52L</p>
                <p className="text-xs text-gray-500 mt-1">After depreciation</p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center transition-transform duration-300 hover:scale-110">
                <Smartphone className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Maintenance Due</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">8</p>
                <p className="text-xs text-amber-600 mt-1">Next 30 days</p>
              </div>
              <div className="h-12 w-12 bg-amber-100 rounded-lg flex items-center justify-center transition-transform duration-300 hover:scale-110">
                <Wrench className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Maintenance Alerts */}
      <Card className="bg-amber-50 border-amber-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Wrench className="h-5 w-5 text-amber-600 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-semibold text-amber-900">Upcoming Maintenance</h3>
              <div className="mt-2 space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-amber-800">AC Service (Office 1) - Due in 5 days</p>
                  <Button size="sm" variant="outline" className="border-amber-300 bg-transparent">
                    Schedule
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-amber-800">Laptop Battery Replacement (LP-045) - Due in 10 days</p>
                  <Button size="sm" variant="outline" className="border-amber-300 bg-transparent">
                    Schedule
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="Search by asset ID, name, assigned to..." className="pl-10" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Assets Table */}
      <Card>
        <CardHeader>
          <CardTitle>Asset Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Asset ID</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Name</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Type</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Assigned To</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Purchase Date</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Warranty</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Condition</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Value</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {assets.map((asset) => (
                  <tr key={asset.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm font-mono text-gray-900">{asset.id}</td>
                    <td className="py-3 px-4 text-sm text-gray-900">{asset.name}</td>
                    <td className="py-3 px-4">
                      <Badge variant="secondary">{asset.type}</Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-900">{asset.assignedTo}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{asset.purchaseDate}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{asset.warranty}</td>
                    <td className="py-3 px-4">
                      <Badge className="bg-green-100 text-green-700">{asset.condition}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm">
                        <p className="text-gray-900 font-semibold">{asset.value}</p>
                        <p className="text-gray-500 text-xs">{asset.currentValue} current</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Asset Lifecycle */}
      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Asset Depreciation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 border rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-gray-900">Laptop #LP-045</p>
                    <p className="text-sm text-gray-600 mt-1">Purchase Value: ₹65,000</p>
                    <p className="text-sm text-gray-600">Current Value: ₹32,500</p>
                    <p className="text-sm text-amber-600">50% depreciation</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Asset Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 border rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-gray-900">Amit Kumar</p>
                    <p className="text-sm text-gray-600 mt-1">New laptop (Current one slow)</p>
                    <Badge variant="secondary" className="mt-2">
                      Pending Approval
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      Approve
                    </Button>
                    <Button size="sm" variant="ghost">
                      Reject
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
