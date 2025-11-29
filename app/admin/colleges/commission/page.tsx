"use client"

import { useState } from "react"
import { Search, Plus, Edit, Trash2, DollarSign, Percent, Calculator } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CommissionStructurePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const serviceChargeOnly = [
    {
      id: 1,
      college: "University of Toronto",
      country: "Canada",
      logo: "/toronto.jpg",
      serviceCharge: "₹75,000",
      perStudent: true,
      totalStudents: 28,
      totalRevenue: "₹21.0L",
      status: "Active",
    },
    {
      id: 2,
      college: "IIM Ahmedabad",
      country: "India",
      logo: "/iim-ahmedabad-logo.jpg",
      serviceCharge: "₹1,50,000",
      perStudent: true,
      totalStudents: 12,
      totalRevenue: "₹18.0L",
      status: "Active",
    },
  ]

  const commissionOnly = [
    {
      id: 1,
      college: "Harvard University",
      country: "USA",
      logo: "/harvard.jpg",
      commissionRate: "15%",
      avgTuitionFee: "₹45L",
      totalStudents: 45,
      totalRevenue: "₹85.2L",
      status: "Active",
    },
    {
      id: 2,
      college: "MIT",
      country: "USA",
      logo: "/mit.jpg",
      commissionRate: "18%",
      avgTuitionFee: "₹42L",
      totalStudents: 32,
      totalRevenue: "₹68.8L",
      status: "Active",
    },
    {
      id: 3,
      college: "University of Melbourne",
      country: "Australia",
      logo: "/melbourne-skyline.png",
      commissionRate: "20%",
      avgTuitionFee: "₹35L",
      totalStudents: 25,
      totalRevenue: "₹58.5L",
      status: "Active",
    },
    {
      id: 4,
      college: "BITS Pilani",
      country: "India",
      logo: "/bits-pilani-logo.jpg",
      commissionRate: "8%",
      avgTuitionFee: "₹18L",
      totalStudents: 18,
      totalRevenue: "₹12.5L",
      status: "Active",
    },
    {
      id: 5,
      college: "Coursera",
      country: "Global",
      logo: "/coursera-logo.png",
      commissionRate: "25%",
      avgTuitionFee: "₹95K",
      totalStudents: 120,
      totalRevenue: "₹95.0L",
      status: "Active",
    },
  ]

  const hybrid = [
    {
      id: 1,
      college: "Stanford University",
      country: "USA",
      logo: "/stanford-campus.png",
      serviceCharge: "₹50,000",
      commissionRate: "12%",
      avgTuitionFee: "₹48L",
      totalStudents: 38,
      totalRevenue: "₹72.5L",
      status: "Active",
    },
    {
      id: 2,
      college: "University of British Columbia",
      country: "Canada",
      logo: "/ubc.jpg",
      serviceCharge: "₹40,000",
      commissionRate: "10%",
      avgTuitionFee: "₹32L",
      totalStudents: 22,
      totalRevenue: "₹45.2L",
      status: "Active",
    },
    {
      id: 3,
      college: "Manipal University",
      country: "India",
      logo: "/manipal-university-logo.jpg",
      serviceCharge: "₹25,000",
      commissionRate: "5%",
      avgTuitionFee: "₹15L",
      totalStudents: 35,
      totalRevenue: "₹28.5L",
      status: "Active",
    },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Commission Structure Configuration</h1>
          <p className="text-gray-600 mt-1">Manage commission models for partner colleges</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Commission Structure
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add Commission Structure</DialogTitle>
              <DialogDescription>Configure commission structure for a partner college</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Select College</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a partner college" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="harvard">Harvard University</SelectItem>
                    <SelectItem value="stanford">Stanford University</SelectItem>
                    <SelectItem value="mit">MIT</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Commission Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select commission type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="service">Service Charge Only</SelectItem>
                    <SelectItem value="commission">Commission Only</SelectItem>
                    <SelectItem value="hybrid">Service Charge + Commission</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Service Charge (₹)</Label>
                  <Input type="number" placeholder="50000" />
                </div>
                <div className="space-y-2">
                  <Label>Commission Rate (%)</Label>
                  <Input type="number" placeholder="15" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Average Tuition Fee (₹)</Label>
                <Input type="number" placeholder="4500000" />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setIsAddDialogOpen(false)}>
                  Save Structure
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Service Charge Only</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{serviceChargeOnly.length}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg transition-transform duration-300 hover:scale-110">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Commission Only</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{commissionOnly.length}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg transition-transform duration-300 hover:scale-110">
                <Percent className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Hybrid Model</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{hybrid.length}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg transition-transform duration-300 hover:scale-110">
                <Calculator className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by college name..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="service" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="service">Service Charge Only ({serviceChargeOnly.length})</TabsTrigger>
          <TabsTrigger value="commission">Commission Only ({commissionOnly.length})</TabsTrigger>
          <TabsTrigger value="hybrid">Hybrid Model ({hybrid.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="service" className="space-y-4">
          {serviceChargeOnly.map((item) => (
            <Card key={item.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <img
                    src={item.logo || "/placeholder.svg"}
                    alt={item.college}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{item.college}</h3>
                        <p className="text-sm text-gray-600 mt-1">{item.country}</p>
                      </div>
                      <Badge className="bg-green-100 text-green-700 border-green-200">{item.status}</Badge>
                    </div>
                    <div className="grid grid-cols-4 gap-4 mt-4">
                      <div>
                        <div className="text-xs text-gray-600">Service Charge</div>
                        <div className="text-sm font-semibold text-gray-900 mt-1">{item.serviceCharge}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-600">Total Students</div>
                        <div className="text-sm font-semibold text-gray-900 mt-1">{item.totalStudents}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-600">Total Revenue</div>
                        <div className="text-sm font-semibold text-green-600 mt-1">{item.totalRevenue}</div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700 bg-transparent">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="commission" className="space-y-4">
          {commissionOnly.map((item) => (
            <Card key={item.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <img
                    src={item.logo || "/placeholder.svg"}
                    alt={item.college}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{item.college}</h3>
                        <p className="text-sm text-gray-600 mt-1">{item.country}</p>
                      </div>
                      <Badge className="bg-green-100 text-green-700 border-green-200">{item.status}</Badge>
                    </div>
                    <div className="grid grid-cols-5 gap-4 mt-4">
                      <div>
                        <div className="text-xs text-gray-600">Commission Rate</div>
                        <div className="text-sm font-semibold text-gray-900 mt-1">{item.commissionRate}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-600">Avg Tuition Fee</div>
                        <div className="text-sm font-semibold text-gray-900 mt-1">{item.avgTuitionFee}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-600">Total Students</div>
                        <div className="text-sm font-semibold text-gray-900 mt-1">{item.totalStudents}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-600">Total Revenue</div>
                        <div className="text-sm font-semibold text-green-600 mt-1">{item.totalRevenue}</div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700 bg-transparent">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="hybrid" className="space-y-4">
          {hybrid.map((item) => (
            <Card key={item.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <img
                    src={item.logo || "/placeholder.svg"}
                    alt={item.college}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{item.college}</h3>
                        <p className="text-sm text-gray-600 mt-1">{item.country}</p>
                      </div>
                      <Badge className="bg-green-100 text-green-700 border-green-200">{item.status}</Badge>
                    </div>
                    <div className="grid grid-cols-6 gap-4 mt-4">
                      <div>
                        <div className="text-xs text-gray-600">Service Charge</div>
                        <div className="text-sm font-semibold text-gray-900 mt-1">{item.serviceCharge}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-600">Commission Rate</div>
                        <div className="text-sm font-semibold text-gray-900 mt-1">{item.commissionRate}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-600">Avg Tuition Fee</div>
                        <div className="text-sm font-semibold text-gray-900 mt-1">{item.avgTuitionFee}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-600">Total Students</div>
                        <div className="text-sm font-semibold text-gray-900 mt-1">{item.totalStudents}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-600">Total Revenue</div>
                        <div className="text-sm font-semibold text-green-600 mt-1">{item.totalRevenue}</div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700 bg-transparent">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
