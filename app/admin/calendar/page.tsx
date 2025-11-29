"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { CalendarIcon, ChevronLeft, ChevronRight, Clock, MapPin, Video, User, Plus, Settings, Calendar, CheckCircle, XCircle, Edit, Trash2, MessageSquare, Bell, Link2 } from 'lucide-react'
import { mockData } from "@/lib/mock-data"
import { toast } from "@/components/ui/use-toast"

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState<"month" | "week" | "day">("month")
  const [showBookDialog, setShowBookDialog] = useState(false)
  const [showAvailabilityDialog, setShowAvailabilityDialog] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null)
  const [filterCounselor, setFilterCounselor] = useState("all")
  const [filterType, setFilterType] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [appointments, setAppointments] = useState<any[]>([])
  const [bookingData, setBookingData] = useState({
    type: "",
    counselorId: "",
    studentName: "",
    date: "",
    time: "",
    duration: "45",
    location: "",
    agenda: "",
    sendReminder: true,
  })
  
  const counselors = mockData.users.filter(u => u.role === "counselor")

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  const getAppointmentColor = (type: string) => {
    switch (type) {
      case "online-counseling":
        return "bg-blue-100 text-blue-700 border-blue-300"
      case "offline-meeting":
        return "bg-green-100 text-green-700 border-green-300"
      case "phone-call":
        return "bg-purple-100 text-purple-700 border-purple-300"
      default:
        return "bg-gray-100 text-gray-700 border-gray-300"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      case "rescheduled":
        return "bg-amber-100 text-amber-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredAppointments = appointments.filter((apt) => {
    const matchesCounselor = filterCounselor === "all" || apt.counselorId === filterCounselor
    const matchesType = filterType === "all" || apt.type === filterType
    const matchesStatus = filterStatus === "all" || apt.status === filterStatus
    return matchesCounselor && matchesType && matchesStatus
  })

  const checkAppointmentConflict = (counselorId: string, date: string, time: string, duration: string) => {
    const bookingDateTime = new Date(`${date}T${time}`)
    const bookingEndTime = new Date(bookingDateTime.getTime() + parseInt(duration) * 60000)

    // Check existing appointments for conflicts
    const conflicts = appointments.filter(apt => {
      if (apt.counselor !== counselorId || apt.date !== date) return false
      
      const aptStartTime = new Date(`${apt.date}T${apt.time}`)
      const aptEndTime = new Date(aptStartTime.getTime() + parseInt(apt.duration || "45") * 60000)

      // Check if times overlap
      return (bookingDateTime < aptEndTime && bookingEndTime > aptStartTime)
    })

    return conflicts.length > 0 ? conflicts[0] : null
  }

  const handleBookAppointment = () => {
    if (!bookingData.type || !bookingData.counselorId || !bookingData.studentName || !bookingData.date || !bookingData.time) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive",
      })
      return
    }

    const conflict = checkAppointmentConflict(bookingData.counselorId, bookingData.date, bookingData.time, bookingData.duration)
    
    if (conflict) {
      toast({
        title: "Booking Conflict",
        description: `This counselor already has an appointment with ${conflict.student} at ${conflict.time}. Please choose a different time.`,
        variant: "destructive",
      })
      return
    }

    const newAppointment = {
      id: `apt-${Date.now()}`,
      student: bookingData.studentName,
      counselor: counselors.find(c => c.id === bookingData.counselorId)?.name || "",
      date: bookingData.date,
      time: bookingData.time,
      duration: bookingData.duration,
      type: bookingData.type,
      status: "Scheduled",
      location: bookingData.location || (bookingData.type === "online-counseling" ? "Virtual" : "Office"),
      agenda: bookingData.agenda,
      meetingLink: bookingData.type === "online-counseling" ? `https://meet.google.com/${Math.random().toString(36).substr(2, 9)}` : undefined,
    }

    const updatedAppointments = [...appointments, newAppointment]
    setAppointments(updatedAppointments)
    
    localStorage.setItem('admin_appointments', JSON.stringify(updatedAppointments))

    toast({
      title: "Success",
      description: "Appointment booked successfully!",
    })

    // Reset form
    setBookingData({
      type: "",
      counselorId: "",
      studentName: "",
      date: "",
      time: "",
      duration: "45",
      location: "",
      agenda: "",
      sendReminder: true,
    })
    setShowBookDialog(false)
  }

  useEffect(() => {
    const savedAppointments = localStorage.getItem('admin_appointments')
    if (savedAppointments) {
      try {
        setAppointments(JSON.parse(savedAppointments))
      } catch (error) {
        console.error('[v0] Error loading appointments:', error)
      }
    }
  }, [])

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Appointments & Calendar</h1>
          <p className="text-sm text-gray-600 mt-1">Manage counselor appointments and availability</p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={showAvailabilityDialog} onOpenChange={setShowAvailabilityDialog}>
            <DialogTrigger asChild>
              <Button variant="outline" className="bg-white">
                <Settings className="w-4 h-4 mr-2" />
                Manage Availability
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Counselor Availability Settings</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                <div>
                  <Label>Select Counselor</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select counselor" />
                    </SelectTrigger>
                    <SelectContent>
                      {counselors.map((c) => (
                        <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Day of Week</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select day" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Monday">Monday</SelectItem>
                        <SelectItem value="Tuesday">Tuesday</SelectItem>
                        <SelectItem value="Wednesday">Wednesday</SelectItem>
                        <SelectItem value="Thursday">Thursday</SelectItem>
                        <SelectItem value="Friday">Friday</SelectItem>
                        <SelectItem value="Saturday">Saturday</SelectItem>
                        <SelectItem value="Sunday">Sunday</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Status</Label>
                    <Select defaultValue="active">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Start Time</Label>
                    <Input type="time" defaultValue="09:00" />
                  </div>
                  <div>
                    <Label>End Time</Label>
                    <Input type="time" defaultValue="18:00" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Max Appointments/Day</Label>
                    <Input type="number" defaultValue="8" min="1" max="20" />
                  </div>
                  <div>
                    <Label>Buffer Time (minutes)</Label>
                    <Input type="number" defaultValue="15" min="0" max="60" />
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-2">Current Availability Schedule</h4>
                  <div className="space-y-2">
                    {mockData.counselorAvailability.slice(0, 3).map((avl) => (
                      <div key={avl.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                        <div>
                          <p className="text-sm font-medium">{avl.dayOfWeek}</p>
                          <p className="text-xs text-gray-600">{avl.startTime} - {avl.endTime} • Max: {avl.maxAppointmentsPerDay} appointments</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm"><Edit className="w-4 h-4" /></Button>
                          <Button variant="ghost" size="sm" className="text-red-600"><Trash2 className="w-4 h-4" /></Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowAvailabilityDialog(false)}>Cancel</Button>
                <Button className="bg-blue-600 hover:bg-blue-700">Save Availability</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Dialog open={showBookDialog} onOpenChange={setShowBookDialog}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Book Appointment
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Book New Appointment</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Appointment Type *</Label>
                    <Select value={bookingData.type} onValueChange={(value) => setBookingData({...bookingData, type: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="online-counseling">
                          <div className="flex items-center">
                            <Video className="w-4 h-4 mr-2" />
                            Virtual Counseling
                          </div>
                        </SelectItem>
                        <SelectItem value="offline-meeting">
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2" />
                            Offline Meeting
                          </div>
                        </SelectItem>
                        <SelectItem value="phone-call">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2" />
                            Phone Call
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Select Counselor *</Label>
                    <Select value={bookingData.counselorId} onValueChange={(value) => setBookingData({...bookingData, counselorId: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select counselor" />
                      </SelectTrigger>
                      <SelectContent>
                        {counselors.map((c) => (
                          <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label>Student/Lead Name *</Label>
                  <Input 
                    placeholder="Enter student or lead name" 
                    value={bookingData.studentName}
                    onChange={(e) => setBookingData({...bookingData, studentName: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Date *</Label>
                    <Input 
                      type="date" 
                      value={bookingData.date}
                      onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label>Time *</Label>
                    <Input 
                      type="time" 
                      value={bookingData.time}
                      onChange={(e) => setBookingData({...bookingData, time: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <Label>Duration</Label>
                  <Select value={bookingData.duration} onValueChange={(value) => setBookingData({...bookingData, duration: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="45">45 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="90">1.5 hours</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Meeting Link / Location</Label>
                  <Input 
                    placeholder="Enter Zoom/Google Meet link or office location" 
                    value={bookingData.location}
                    onChange={(e) => setBookingData({...bookingData, location: e.target.value})}
                  />
                </div>
                <div>
                  <Label>Agenda / Notes</Label>
                  <Textarea 
                    placeholder="Add meeting agenda or notes..." 
                    rows={3} 
                    value={bookingData.agenda}
                    onChange={(e) => setBookingData({...bookingData, agenda: e.target.value})}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    id="reminder" 
                    className="rounded" 
                    checked={bookingData.sendReminder}
                    onChange={(e) => setBookingData({...bookingData, sendReminder: e.target.checked})}
                  />
                  <label htmlFor="reminder" className="text-sm">Send reminder notifications (30 minutes before)</label>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowBookDialog(false)}>Cancel</Button>
                <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleBookAppointment}>
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Appointment
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Today's Appointments</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">8</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Upcoming</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">24</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed This Week</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">42</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Cancelled</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">3</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="calendar" className="space-y-6">
        <TabsList className="bg-white border">
          <TabsTrigger value="calendar" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600">
            Calendar View
          </TabsTrigger>
          <TabsTrigger value="list" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600">
            List View
          </TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h2>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <Button
                      variant={view === "month" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setView("month")}
                      className={view === "month" ? "bg-blue-600 hover:bg-blue-700" : ""}
                    >
                      Month
                    </Button>
                    <Button
                      variant={view === "week" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setView("week")}
                      className={view === "week" ? "bg-blue-600 hover:bg-blue-700" : ""}
                    >
                      Week
                    </Button>
                    <Button
                      variant={view === "day" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setView("day")}
                      className={view === "day" ? "bg-blue-600 hover:bg-blue-700" : ""}
                    >
                      Day
                    </Button>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <Button variant="outline" size="icon" onClick={previousMonth}>
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
                      Today
                    </Button>
                    <Button variant="outline" size="icon" onClick={nextMonth}>
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-2 mb-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="text-center text-sm font-semibold text-gray-700 py-2">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 35 }, (_, i) => {
                  const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()
                  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
                  const dayNumber = i - firstDay + 1
                  const isCurrentMonth = dayNumber > 0 && dayNumber <= daysInMonth
                  const isToday =
                    isCurrentMonth &&
                    dayNumber === new Date().getDate() &&
                    currentDate.getMonth() === new Date().getMonth() &&
                    currentDate.getFullYear() === new Date().getFullYear()

                  return (
                    <div
                      key={i}
                      className={`min-h-24 p-2 border rounded-lg ${
                        isCurrentMonth ? "bg-white" : "bg-gray-50"
                      } ${isToday ? "border-blue-600 border-2" : "border-gray-200"}`}
                    >
                      {isCurrentMonth && (
                        <>
                          <div className={`text-sm font-semibold mb-1 ${isToday ? "text-blue-600" : "text-gray-900"}`}>
                            {dayNumber}
                          </div>
                          <div className="space-y-1">
                            {filteredAppointments
                              .filter((apt) => {
                                const aptDate = new Date(apt.date)
                                return (
                                  aptDate.getDate() === dayNumber &&
                                  aptDate.getMonth() === currentDate.getMonth() &&
                                  aptDate.getFullYear() === currentDate.getFullYear()
                                )
                              })
                              .slice(0, 2)
                              .map((apt) => (
                                <div 
                                  key={apt.id} 
                                  className={`text-xs p-1 rounded border cursor-pointer hover:opacity-80 ${getAppointmentColor(apt.type)}`}
                                  onClick={() => setSelectedAppointment(apt)}
                                >
                                  <div className="font-semibold truncate">{apt.time}</div>
                                  <div className="truncate">{apt.student}</div>
                                </div>
                              ))}
                          </div>
                        </>
                      )}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="list" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Filter by Counselor</Label>
                  <Select value={filterCounselor} onValueChange={setFilterCounselor}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Counselors</SelectItem>
                      {counselors.map((c) => (
                        <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Filter by Type</Label>
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="online-counseling">Virtual Counseling</SelectItem>
                      <SelectItem value="offline-meeting">Offline Meeting</SelectItem>
                      <SelectItem value="phone-call">Phone Call</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Filter by Status</Label>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                      <SelectItem value="rescheduled">Rescheduled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Appointments List ({filteredAppointments.length})</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                {filteredAppointments.map((apt) => (
                  <div 
                    key={apt.id} 
                    className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 cursor-pointer transition-colors"
                    onClick={() => setSelectedAppointment(apt)}
                  >
                    <div className="flex-shrink-0">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        apt.type === "online-counseling" ? "bg-blue-100" :
                        apt.type === "offline-meeting" ? "bg-green-100" : "bg-purple-100"
                      }`}>
                        {apt.type === "online-counseling" && <Video className="w-6 h-6 text-blue-600" />}
                        {apt.type === "offline-meeting" && <MapPin className="w-6 h-6 text-green-600" />}
                        {apt.type === "phone-call" && <Clock className="w-6 h-6 text-purple-600" />}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-gray-900">{apt.student}</h4>
                        <Badge className={getStatusColor(apt.status)}>
                          {apt.status}
                        </Badge>
                        <Badge className={getAppointmentColor(apt.type)}>
                          {apt.type === "online-counseling" ? "Virtual" : apt.type === "offline-meeting" ? "Offline" : "Phone"}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <CalendarIcon className="w-4 h-4" />
                          <span>{apt.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{apt.time} ({apt.duration})</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          <span>{apt.counselor}</span>
                        </div>
                      </div>
                      {apt.agenda && (
                        <p className="text-sm text-gray-600 mt-1 flex items-start gap-1">
                          <MessageSquare className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          <span className="line-clamp-1">{apt.agenda}</span>
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {apt.type === "online-counseling" && apt.meetingLink && apt.status === "scheduled" && (
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          <Link2 className="w-4 h-4 mr-1" />
                          Join
                        </Button>
                      )}
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {selectedAppointment && (
        <Dialog open={!!selectedAppointment} onOpenChange={() => setSelectedAppointment(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Appointment Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{selectedAppointment.student}</h3>
                  <p className="text-sm text-gray-600">with {selectedAppointment.counselor}</p>
                </div>
                <Badge className={getStatusColor(selectedAppointment.status)}>
                  {selectedAppointment.status}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-xs text-gray-600">Date & Time</p>
                  <p className="text-sm font-medium">{selectedAppointment.date} at {selectedAppointment.time}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Duration</p>
                  <p className="text-sm font-medium">{selectedAppointment.duration}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Type</p>
                  <p className="text-sm font-medium capitalize">{selectedAppointment.type.replace('-', ' ')}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Location/Link</p>
                  {selectedAppointment.meetingLink && (
                    <a href={selectedAppointment.meetingLink} className="text-sm font-medium text-blue-600 hover:underline flex items-center gap-1">
                      <Link2 className="w-3 h-3" />
                      Join Meeting
                    </a>
                  )}
                  {selectedAppointment.location && (
                    <p className="text-sm font-medium">{selectedAppointment.location}</p>
                  )}
                </div>
              </div>
              {selectedAppointment.agenda && (
                <div>
                  <p className="text-xs text-gray-600 mb-1">Notes</p>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm">{selectedAppointment.agenda}</p>
                  </div>
                </div>
              )}
              {selectedAppointment.sendReminder && (
                <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <Bell className="w-4 h-4 text-blue-600" />
                  <p className="text-sm text-blue-800">Reminder set for {selectedAppointment.time}</p>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedAppointment(null)}>Close</Button>
              {selectedAppointment.status === "scheduled" && (
                <>
                  <Button variant="outline" className="text-amber-600 hover:bg-amber-50">
                    <Edit className="w-4 h-4 mr-2" />
                    Reschedule
                  </Button>
                  <Button className="bg-green-600 hover:bg-green-700">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Mark Complete
                  </Button>
                  <Button variant="destructive">
                    <XCircle className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
