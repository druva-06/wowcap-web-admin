"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import {
  ArrowLeft,
  Search,
  Download,
  UserCheck,
  Users,
  TrendingUp,
  Target,
  Eye,
  ArrowRightLeft,
  Calendar,
  Settings,
} from "lucide-react"
import Link from "next/link"

export default function LeadTrackingPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCounselor, setSelectedCounselor] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [reassignDialogOpen, setReassignDialogOpen] = useState(false)
  const [selectedLead, setSelectedLead] = useState<any>(null)
  const [newCounselor, setNewCounselor] = useState("")
  const [reassignReason, setReassignReason] = useState("")

  // Sample assigned leads data
  const assignedLeads = [
    {
      id: "L001",
      name: "Priya Sharma",
      email: "priya.sharma@email.com",
      phone: "+91 98765 43210",
      status: "HOT",
      score: 95,
      assignedTo: "Amit Counselor",
      assignedDate: "2024-01-15",
      lastContact: "2024-01-18",
      college: "University of California",
      course: "Computer Science",
    },
    {
      id: "L002",
      name: "Rahul Patel",
      email: "rahul.patel@email.com",
      phone: "+91 87654 32109",
      status: "Warm",
      score: 82,
      assignedTo: "Priya Counselor",
      assignedDate: "2024-01-14",
      lastContact: "2024-01-17",
      college: "University of Toronto",
      course: "Engineering",
    },
    {
      id: "L003",
      name: "Sneha Reddy",
      email: "sneha.reddy@email.com",
      phone: "+91 76543 21098",
      status: "Cold",
      score: 68,
      assignedTo: "Ravi Counselor",
      assignedDate: "2024-01-13",
      lastContact: "2024-01-16",
      college: "University of Manchester",
      course: "Business Administration",
    },
    {
      id: "L004",
      name: "Arjun Singh",
      email: "arjun.singh@email.com",
      phone: "+91 65432 10987",
      status: "Immediate Hot",
      score: 98,
      assignedTo: "Amit Counselor",
      assignedDate: "2024-01-12",
      lastContact: "2024-01-18",
      college: "University of Melbourne",
      course: "Data Science",
    },
    {
      id: "L005",
      name: "Kavya Nair",
      email: "kavya.nair@email.com",
      phone: "+91 54321 09876",
      status: "Future Lead",
      score: 73,
      assignedTo: "Priya Counselor",
      assignedDate: "2024-01-11",
      lastContact: "2024-01-15",
      college: "Technical University of Munich",
      course: "Mechanical Engineering",
    },
    {
      id: "L006",
      name: "Vikram Mehta",
      email: "vikram.mehta@email.com",
      phone: "+91 98765 11111",
      status: "HOT",
      score: 91,
      assignedTo: "Sneha Counselor",
      assignedDate: "2024-01-10",
      lastContact: "2024-01-17",
      college: "Stanford University",
      course: "MBA",
    },
    {
      id: "L007",
      name: "Anita Desai",
      email: "anita.desai@email.com",
      phone: "+91 98765 22222",
      status: "Warm",
      score: 78,
      assignedTo: "Ravi Counselor",
      assignedDate: "2024-01-09",
      lastContact: "2024-01-16",
      college: "University of Oxford",
      course: "Law",
    },
    {
      id: "L008",
      name: "Suresh Patel",
      email: "suresh.patel@email.com",
      phone: "+91 98765 33333",
      status: "HOT",
      score: 88,
      assignedTo: "Amit Counselor",
      assignedDate: "2024-01-08",
      lastContact: "2024-01-18",
      college: "University of British Columbia",
      course: "Data Science",
    },
  ]

  // Counselor workload summary
  const counselorWorkload = [
    { name: "Amit Counselor", assigned: 3, hot: 2, warm: 0, cold: 0, converted: 5, capacity: 20 },
    { name: "Priya Counselor", assigned: 2, hot: 0, warm: 1, cold: 0, converted: 4, capacity: 20 },
    { name: "Ravi Counselor", assigned: 2, hot: 0, warm: 1, cold: 1, converted: 3, capacity: 20 },
    { name: "Sneha Counselor", assigned: 1, hot: 1, warm: 0, cold: 0, converted: 6, capacity: 20 },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "HOT":
        return "bg-red-100 text-red-700 border-red-300"
      case "Immediate Hot":
        return "bg-orange-100 text-orange-700 border-orange-300"
      case "Warm":
        return "bg-yellow-100 text-yellow-700 border-yellow-300"
      case "Cold":
        return "bg-blue-100 text-blue-700 border-blue-300"
      case "Future Lead":
        return "bg-purple-100 text-purple-700 border-purple-300"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const filteredLeads = assignedLeads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.assignedTo.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCounselor = selectedCounselor === "all" || lead.assignedTo === selectedCounselor
    const matchesStatus = selectedStatus === "all" || lead.status === selectedStatus

    return matchesSearch && matchesCounselor && matchesStatus
  })

  const handleReassign = () => {
    if (!newCounselor) {
      toast({
        title: "Error",
        description: "Please select a counselor",
        variant: "destructive",
      })
      return
    }

    console.log("[v0] Reassigning lead:", selectedLead?.id, "to:", newCounselor, "Reason:", reassignReason)
    toast({
      title: "Lead Reassigned",
      description: `Lead reassigned to ${newCounselor} successfully`,
    })
    setReassignDialogOpen(false)
    setNewCounselor("")
    setReassignReason("")
    setSelectedLead(null)
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header with sub-tab navigation */}
      <div>
        <div className="flex items-center gap-4 mb-4">
          <Button variant="ghost" size="sm" onClick={() => router.back()} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Lead Assignment & Tracking</h1>
            <p className="text-sm text-gray-600 mt-1">Track and manage lead assignments across your team</p>
          </div>
        </div>

        {/* Sub-tab navigation */}
        <Card>
          <CardContent className="p-0">
            <div className="bg-gray-50 border-b border-gray-200">
              <div className="flex">
                <Link
                  href="/admin/leads"
                  className="flex items-center gap-2 px-6 py-3 border-b-2 border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all"
                >
                  <Users className="w-4 h-4" />
                  <span>All Leads</span>
                </Link>
                <button className="flex items-center gap-2 px-6 py-3 border-b-2 border-blue-600 text-blue-600 bg-white font-semibold transition-all">
                  <UserCheck className="w-4 h-4" />
                  <span>Assignment & Tracking</span>
                </button>
                <Link
                  href="/admin/leads/automation"
                  className="flex items-center gap-2 px-6 py-3 border-b-2 border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all"
                >
                  <Settings className="w-4 h-4" />
                  <span>Automation Rules</span>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 mb-1">Total Assigned</p>
                <p className="text-2xl font-bold text-blue-600">{assignedLeads.length}</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <UserCheck className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 mb-1">Active Counselors</p>
                <p className="text-2xl font-bold text-green-600">{counselorWorkload.length}</p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 mb-1">Avg Workload</p>
                <p className="text-2xl font-bold text-purple-600">
                  {Math.round(assignedLeads.length / counselorWorkload.length)}
                </p>
              </div>
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 mb-1">Total Converted</p>
                <p className="text-2xl font-bold text-orange-600">
                  {counselorWorkload.reduce((acc, c) => acc + c.converted, 0)}
                </p>
              </div>
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Counselor Workload Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Counselor Workload Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {counselorWorkload.map((counselor) => {
              const capacityPercentage = (counselor.assigned / counselor.capacity) * 100
              return (
                <div key={counselor.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center text-white font-semibold">
                        {counselor.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{counselor.name}</p>
                        <p className="text-xs text-gray-600">
                          {counselor.assigned}/{counselor.capacity} leads assigned
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <p className="text-xs text-gray-600">HOT</p>
                        <p className="text-sm font-semibold text-red-600">{counselor.hot}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-600">Warm</p>
                        <p className="text-sm font-semibold text-yellow-600">{counselor.warm}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-600">Cold</p>
                        <p className="text-sm font-semibold text-blue-600">{counselor.cold}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-600">Converted</p>
                        <p className="text-sm font-semibold text-green-600">{counselor.converted}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-600">Capacity</p>
                        <p className="text-sm font-semibold text-gray-900">{Math.round(capacityPercentage)}%</p>
                      </div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        capacityPercentage >= 90
                          ? "bg-red-600"
                          : capacityPercentage >= 70
                            ? "bg-yellow-600"
                            : "bg-green-600"
                      }`}
                      style={{ width: `${capacityPercentage}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search by lead name, email, or counselor..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCounselor} onValueChange={setSelectedCounselor}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by counselor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Counselors</SelectItem>
                <SelectItem value="Amit Counselor">Amit Counselor</SelectItem>
                <SelectItem value="Priya Counselor">Priya Counselor</SelectItem>
                <SelectItem value="Ravi Counselor">Ravi Counselor</SelectItem>
                <SelectItem value="Sneha Counselor">Sneha Counselor</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="HOT">HOT</SelectItem>
                <SelectItem value="Immediate Hot">Immediate Hot</SelectItem>
                <SelectItem value="Warm">Warm</SelectItem>
                <SelectItem value="Cold">Cold</SelectItem>
                <SelectItem value="Future Lead">Future Lead</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2 bg-transparent">
              <Download className="w-4 h-4" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Assignment Tracking Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Lead Assignment Tracking</CardTitle>
            <p className="text-sm text-gray-600">
              Showing <strong>{filteredLeads.length}</strong> of <strong>{assignedLeads.length}</strong> assigned leads
            </p>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Lead Info</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Score</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Assigned To</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Assigned Date</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Last Contact</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          {lead.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-gray-900">{lead.name}</p>
                          <p className="text-xs text-gray-500">{lead.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge className={getStatusColor(lead.status)}>{lead.status}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-lg font-bold text-blue-600">{lead.score}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                          {lead.assignedTo.charAt(0)}
                        </div>
                        <span className="text-sm text-gray-900">{lead.assignedTo}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Calendar className="w-3 h-3" />
                        {lead.assignedDate}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-gray-600">{lead.lastContact}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                          onClick={() => router.push(`/admin/leads/${lead.id}`)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>

                        <Dialog
                          open={reassignDialogOpen && selectedLead?.id === lead.id}
                          onOpenChange={setReassignDialogOpen}
                        >
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 p-0 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
                              onClick={() => setSelectedLead(lead)}
                            >
                              <ArrowRightLeft className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                              <DialogTitle>Reassign Lead</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="space-y-2">
                                <Label>Current Assignment</Label>
                                <div className="p-3 bg-gray-50 rounded-lg">
                                  <p className="text-sm font-medium text-gray-900">{lead.assignedTo}</p>
                                  <p className="text-xs text-gray-600">Assigned on {lead.assignedDate}</p>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label>Reassign To</Label>
                                <Select value={newCounselor} onValueChange={setNewCounselor}>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select counselor" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Amit Counselor">Amit Counselor</SelectItem>
                                    <SelectItem value="Priya Counselor">Priya Counselor</SelectItem>
                                    <SelectItem value="Ravi Counselor">Ravi Counselor</SelectItem>
                                    <SelectItem value="Sneha Counselor">Sneha Counselor</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <Label>Reason for Reassignment</Label>
                                <Textarea
                                  placeholder="Enter reason..."
                                  value={reassignReason}
                                  onChange={(e) => setReassignReason(e.target.value)}
                                  rows={3}
                                />
                              </div>
                              <div className="flex justify-end gap-2">
                                <Button variant="outline" onClick={() => setReassignDialogOpen(false)}>
                                  Cancel
                                </Button>
                                <Button
                                  className="bg-indigo-600 hover:bg-indigo-700 text-white"
                                  onClick={handleReassign}
                                >
                                  Reassign Lead
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
