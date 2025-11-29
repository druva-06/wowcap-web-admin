"use client"

import { useState } from "react"
import { Plus, Download, BookOpen, Award, Calendar, Filter, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"

export default function TrainingRecordsPage() {
  const { toast } = useToast()
  const [statusFilter, setStatusFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)

  const trainingRecords = [
    {
      id: 1,
      employeeName: "Amit Kumar",
      employeeId: "EMP001",
      role: "Senior Counselor",
      trainingName: "Advanced Sales Techniques",
      category: "Sales",
      startDate: "2024-01-15",
      endDate: "2024-01-20",
      duration: "5 days",
      status: "completed",
      score: 92,
      certificate: true,
      trainer: "John Smith",
    },
    {
      id: 2,
      employeeName: "Priya Sharma",
      employeeId: "EMP002",
      role: "Counselor",
      trainingName: "Customer Relationship Management",
      category: "Customer Service",
      startDate: "2024-02-01",
      endDate: "2024-02-05",
      duration: "5 days",
      status: "in-progress",
      score: null,
      certificate: false,
      trainer: "Sarah Johnson",
    },
    {
      id: 3,
      employeeName: "Rahul Verma",
      employeeId: "EMP003",
      role: "Counselor",
      trainingName: "Digital Marketing Fundamentals",
      category: "Marketing",
      startDate: "2024-01-10",
      endDate: "2024-01-15",
      duration: "5 days",
      status: "completed",
      score: 88,
      certificate: true,
      trainer: "Mike Brown",
    },
    {
      id: 4,
      employeeName: "Sneha Patel",
      employeeId: "EMP004",
      role: "Junior Counselor",
      trainingName: "Communication Skills Workshop",
      category: "Soft Skills",
      startDate: "2024-02-10",
      endDate: "2024-02-12",
      duration: "3 days",
      status: "scheduled",
      score: null,
      certificate: false,
      trainer: "Emily Davis",
    },
    {
      id: 5,
      employeeName: "Vikram Singh",
      employeeId: "EMP005",
      role: "Senior Counselor",
      trainingName: "Leadership Development Program",
      category: "Leadership",
      startDate: "2024-01-20",
      endDate: "2024-01-30",
      duration: "10 days",
      status: "completed",
      score: 95,
      certificate: true,
      trainer: "Robert Wilson",
    },
  ]

  const stats = {
    totalTrainings: trainingRecords.length,
    completed: trainingRecords.filter((r) => r.status === "completed").length,
    inProgress: trainingRecords.filter((r) => r.status === "in-progress").length,
    scheduled: trainingRecords.filter((r) => r.status === "scheduled").length,
  }

  const filteredRecords =
    statusFilter === "all"
      ? trainingRecords.filter((r) => r.employeeName.toLowerCase().includes(searchQuery.toLowerCase()))
      : trainingRecords.filter(
          (r) => r.status === statusFilter && r.employeeName.toLowerCase().includes(searchQuery.toLowerCase()),
        )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700"
      case "in-progress":
        return "bg-blue-100 text-blue-700"
      case "scheduled":
        return "bg-yellow-100 text-yellow-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Sales":
        return "bg-purple-100 text-purple-700"
      case "Customer Service":
        return "bg-blue-100 text-blue-700"
      case "Marketing":
        return "bg-pink-100 text-pink-700"
      case "Soft Skills":
        return "bg-green-100 text-green-700"
      case "Leadership":
        return "bg-amber-100 text-amber-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Training Records</h1>
          <p className="text-gray-600 mt-1">Track employee training and development programs</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Schedule Training
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Schedule New Training</DialogTitle>
                <DialogDescription>Add a new training program for employees</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Training Name</Label>
                  <Input placeholder="Enter training name" />
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sales">Sales</SelectItem>
                      <SelectItem value="customer">Customer Service</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="soft">Soft Skills</SelectItem>
                      <SelectItem value="leadership">Leadership</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Input type="date" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Trainer Name</Label>
                  <Input placeholder="Enter trainer name" />
                </div>
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={() => {
                    toast({
                      title: "Training Scheduled",
                      description: "New training program has been scheduled successfully.",
                    })
                    setDialogOpen(false)
                  }}
                >
                  Schedule Training
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Trainings</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.totalTrainings}</p>
                <p className="text-xs text-gray-500 mt-1">All time</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center transition-transform duration-300 hover:scale-110">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-green-600 mt-1">{stats.completed}</p>
                <p className="text-xs text-gray-500 mt-1">With certificates</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center transition-transform duration-300 hover:scale-110">
                <Award className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-blue-600 mt-1">{stats.inProgress}</p>
                <p className="text-xs text-gray-500 mt-1">Ongoing</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center transition-transform duration-300 hover:scale-110">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Scheduled</p>
                <p className="text-2xl font-bold text-yellow-600 mt-1">{stats.scheduled}</p>
                <p className="text-xs text-gray-500 mt-1">Upcoming</p>
              </div>
              <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center transition-transform duration-300 hover:scale-110">
                <Calendar className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Training Records</CardTitle>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search employees..."
                  className="pl-10 w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Filter className="h-4 w-4 text-gray-500" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredRecords.map((record) => (
              <div key={record.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-900">{record.employeeName}</h3>
                      <Badge variant="secondary">{record.employeeId}</Badge>
                      <Badge variant="outline">{record.role}</Badge>
                      <Badge className={getCategoryColor(record.category)}>{record.category}</Badge>
                      <Badge className={getStatusColor(record.status)}>{record.status.toUpperCase()}</Badge>
                      {record.certificate && (
                        <Badge className="bg-amber-100 text-amber-700">
                          <Award className="h-3 w-3 mr-1" />
                          Certified
                        </Badge>
                      )}
                    </div>
                    <h4 className="font-medium text-gray-900 mb-2">{record.trainingName}</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Duration:</span> {record.startDate} to {record.endDate} (
                        {record.duration})
                      </div>
                      <div>
                        <span className="font-medium">Trainer:</span> {record.trainer}
                      </div>
                      {record.score && (
                        <div>
                          <span className="font-medium">Score:</span>{" "}
                          <span className="text-green-600 font-semibold">{record.score}%</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                    {record.certificate && (
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        <Download className="h-4 w-4 mr-1" />
                        Certificate
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
