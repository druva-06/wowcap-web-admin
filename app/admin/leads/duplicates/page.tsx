"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ArrowLeft, Search, AlertTriangle, Merge, Trash2, Eye, Phone, Mail, Calendar, User } from "lucide-react"
import { toast } from "sonner"

export default function DuplicateLeadsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedDuplicate, setSelectedDuplicate] = useState<any>(null)

  // Sample duplicate leads data
  const duplicateGroups = [
    {
      id: "DUP001",
      phone: "+91 98765 43210",
      email: "rahul.sharma@email.com",
      count: 3,
      status: "Unresolved",
      firstSeen: "2025-01-15",
      lastSeen: "2025-01-20",
      leads: [
        {
          id: "L001",
          name: "Rahul Sharma",
          source: "Website Form",
          assignedTo: "Amit Counselor",
          status: "HOT",
          createdAt: "2025-01-15 10:30 AM",
          country: "USA",
          course: "Computer Science - MS",
          notes: "Interested in Fall 2025 intake",
        },
        {
          id: "L045",
          name: "Rahul Kumar Sharma",
          source: "Facebook Ads",
          assignedTo: "Priya Counselor",
          status: "Warm",
          createdAt: "2025-01-18 02:15 PM",
          country: "USA",
          course: "Data Science - MS",
          notes: "Wants scholarship information",
        },
        {
          id: "L089",
          name: "R. Sharma",
          source: "Education Fair - Mumbai",
          assignedTo: "Unassigned",
          status: "New",
          createdAt: "2025-01-20 11:45 AM",
          country: "Canada",
          course: "MBA",
          notes: "Met at education fair",
        },
      ],
    },
    {
      id: "DUP002",
      phone: "+91 98765 11111",
      email: "priya.patel@email.com",
      count: 2,
      status: "Unresolved",
      firstSeen: "2025-01-12",
      lastSeen: "2025-01-19",
      leads: [
        {
          id: "L023",
          name: "Priya Patel",
          source: "Google Ads",
          assignedTo: "Ravi Counselor",
          status: "HOT",
          createdAt: "2025-01-12 09:20 AM",
          country: "UK",
          course: "MBA",
          notes: "High budget, urgent",
        },
        {
          id: "L067",
          name: "Priya P.",
          source: "Webinar Registration",
          assignedTo: "Sneha Counselor",
          status: "Warm",
          createdAt: "2025-01-19 04:30 PM",
          country: "UK",
          course: "Finance - MS",
          notes: "Attended webinar on UK universities",
        },
      ],
    },
    {
      id: "DUP003",
      phone: "+91 98765 22222",
      email: "amit.verma@email.com",
      count: 4,
      status: "Unresolved",
      firstSeen: "2025-01-10",
      lastSeen: "2025-01-21",
      leads: [
        {
          id: "L012",
          name: "Amit Verma",
          source: "Website Form",
          assignedTo: "Amit Counselor",
          status: "Cold",
          createdAt: "2025-01-10 11:00 AM",
          country: "Australia",
          course: "Engineering - MS",
          notes: "Not responding to calls",
        },
        {
          id: "L034",
          name: "Amit Kumar Verma",
          source: "Instagram Ads",
          assignedTo: "Priya Counselor",
          status: "Warm",
          createdAt: "2025-01-14 03:45 PM",
          country: "Australia",
          course: "Computer Science - MS",
          notes: "Interested in scholarships",
        },
        {
          id: "L056",
          name: "A. Verma",
          source: "Referral",
          assignedTo: "Ravi Counselor",
          status: "HOT",
          createdAt: "2025-01-17 10:15 AM",
          country: "Canada",
          course: "MBA",
          notes: "Referred by existing student",
        },
        {
          id: "L078",
          name: "Amit V.",
          source: "Education Fair - Delhi",
          assignedTo: "Unassigned",
          status: "New",
          createdAt: "2025-01-21 02:30 PM",
          country: "USA",
          course: "Data Science - MS",
          notes: "Met at education fair",
        },
      ],
    },
  ]

  const filteredDuplicates = duplicateGroups.filter((group) => {
    const matchesSearch =
      group.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.leads.some((lead) => lead.name.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesStatus = filterStatus === "all" || group.status.toLowerCase() === filterStatus.toLowerCase()

    return matchesSearch && matchesStatus
  })

  const handleMerge = (groupId: string, primaryLeadId: string) => {
    console.log("[v0] Merging duplicate group:", groupId, "Primary lead:", primaryLeadId)
    toast.success("Duplicate leads merged successfully")
  }

  const handleDelete = (groupId: string, leadId: string) => {
    console.log("[v0] Deleting lead:", leadId, "from group:", groupId)
    toast.success("Lead deleted successfully")
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "hot":
        return "bg-red-600 text-white"
      case "warm":
        return "bg-orange-600 text-white"
      case "cold":
        return "bg-blue-600 text-white"
      case "new":
        return "bg-green-600 text-white"
      default:
        return "bg-gray-600 text-white"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => router.back()} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Duplicate Leads Management</h1>
            <p className="text-sm text-gray-600 mt-1">Identify and manage duplicate lead entries</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 mb-1">Total Duplicate Groups</p>
                <p className="text-2xl font-bold text-orange-600">{duplicateGroups.length}</p>
              </div>
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 mb-1">Total Duplicate Leads</p>
                <p className="text-2xl font-bold text-red-600">
                  {duplicateGroups.reduce((acc, group) => acc + group.count, 0)}
                </p>
              </div>
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <User className="w-5 h-5 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 mb-1">Unresolved</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {duplicateGroups.filter((g) => g.status === "Unresolved").length}
                </p>
              </div>
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 mb-1">Avg Duplicates/Group</p>
                <p className="text-2xl font-bold text-purple-600">
                  {(duplicateGroups.reduce((acc, group) => acc + group.count, 0) / duplicateGroups.length).toFixed(1)}
                </p>
              </div>
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Merge className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by phone, email, or name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="unresolved">Unresolved</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Duplicate Groups */}
      <div className="space-y-4">
        {filteredDuplicates.map((group) => (
          <Card key={group.id} className="border-l-4 border-l-orange-500">
            <CardHeader className="bg-orange-50">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-orange-600" />
                    Duplicate Group - {group.id}
                  </CardTitle>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Phone className="w-4 h-4" />
                      {group.phone}
                    </span>
                    <span className="flex items-center gap-1">
                      <Mail className="w-4 h-4" />
                      {group.email}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      First: {group.firstSeen}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Last: {group.lastSeen}
                    </span>
                  </div>
                </div>
                <Badge className="bg-orange-600 text-white">{group.count} Duplicates</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3">
                {group.leads.map((lead, index) => (
                  <div
                    key={lead.id}
                    className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-300 transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{lead.name}</p>
                          <p className="text-xs text-gray-600">Lead ID: {lead.id}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(lead.status)}>{lead.status}</Badge>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedDuplicate(lead)}
                              className="gap-2"
                            >
                              <Eye className="w-4 h-4" />
                              View
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Lead Details - {lead.name}</DialogTitle>
                              <DialogDescription>Complete information about this lead</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm font-medium text-gray-600">Lead ID</p>
                                  <p className="text-sm text-gray-900">{lead.id}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-600">Status</p>
                                  <Badge className={getStatusColor(lead.status)}>{lead.status}</Badge>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-600">Source</p>
                                  <p className="text-sm text-gray-900">{lead.source}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-600">Assigned To</p>
                                  <p className="text-sm text-gray-900">{lead.assignedTo}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-600">Country</p>
                                  <p className="text-sm text-gray-900">{lead.country}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-600">Course</p>
                                  <p className="text-sm text-gray-900">{lead.course}</p>
                                </div>
                                <div className="col-span-2">
                                  <p className="text-sm font-medium text-gray-600">Created At</p>
                                  <p className="text-sm text-gray-900">{lead.createdAt}</p>
                                </div>
                                <div className="col-span-2">
                                  <p className="text-sm font-medium text-gray-600">Notes</p>
                                  <p className="text-sm text-gray-900">{lead.notes}</p>
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                      <div>
                        <p className="text-xs text-gray-500">Source</p>
                        <p className="text-sm font-medium text-gray-900">{lead.source}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Assigned To</p>
                        <p className="text-sm font-medium text-gray-900">{lead.assignedTo}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Country</p>
                        <p className="text-sm font-medium text-gray-900">{lead.country}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Created</p>
                        <p className="text-sm font-medium text-gray-900">{lead.createdAt}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleMerge(group.id, lead.id)}
                        className="gap-2"
                      >
                        <Merge className="w-4 h-4" />
                        Set as Primary
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(group.id, lead.id)}
                        className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    Select a primary lead and merge duplicates to resolve this group
                  </p>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
                    <Merge className="w-4 h-4" />
                    Merge All
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDuplicates.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No duplicate leads found</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
