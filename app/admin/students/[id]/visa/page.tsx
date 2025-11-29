"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ArrowLeft, CheckCircle, Clock, FileText, Calendar, Plane, AlertCircle, Edit, Download } from "lucide-react"

export default function VisaTrackingPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false)
  const [selectedStage, setSelectedStage] = useState<any>(null)

  // Visa timeline stages
  const visaStages = [
    {
      id: 1,
      stage: "Application Started",
      status: "Completed",
      date: "2024-02-01",
      description: "Visa application process initiated",
      completedBy: "Amit Kumar",
    },
    {
      id: 2,
      stage: "Document Submission",
      status: "Completed",
      date: "2024-02-05",
      description: "All required documents submitted to embassy",
      completedBy: "Amit Kumar",
    },
    {
      id: 3,
      stage: "Biometrics Appointment",
      status: "Completed",
      date: "2024-02-15",
      description: "Biometrics collected at VFS Global",
      location: "VFS Global, Mumbai",
      completedBy: "Student",
    },
    {
      id: 4,
      stage: "Interview Scheduled",
      status: "Completed",
      date: "2024-03-10",
      description: "Visa interview completed successfully",
      location: "US Embassy, Mumbai",
      completedBy: "Student",
    },
    {
      id: 5,
      stage: "Processing",
      status: "Completed",
      date: "2024-03-11",
      description: "Application under administrative processing",
      estimatedDays: "7-10 days",
    },
    {
      id: 6,
      stage: "Decision Made",
      status: "Completed",
      date: "2024-03-15",
      description: "Visa approved by consular officer",
      decision: "Approved",
    },
    {
      id: 7,
      stage: "Visa Issued",
      status: "Completed",
      date: "2024-03-20",
      description: "Passport with visa stamp received",
      visaNumber: "US-F1-2024-12345",
      validUntil: "2029-03-20",
    },
    {
      id: 8,
      stage: "Travel Booked",
      status: "In Progress",
      date: "2024-08-15",
      description: "Flight and accommodation booking in progress",
      estimatedCompletion: "2024-07-01",
    },
  ]

  // Visa documents checklist
  const visaDocuments = [
    { id: 1, name: "DS-160 Form", status: "Submitted", required: true, submittedDate: "2024-02-01" },
    { id: 2, name: "Passport", status: "Submitted", required: true, submittedDate: "2024-02-01" },
    { id: 3, name: "I-20 Form", status: "Submitted", required: true, submittedDate: "2024-02-01" },
    { id: 4, name: "SEVIS Fee Receipt", status: "Submitted", required: true, submittedDate: "2024-02-02" },
    { id: 5, name: "Visa Fee Receipt", status: "Submitted", required: true, submittedDate: "2024-02-02" },
    { id: 6, name: "Financial Documents", status: "Submitted", required: true, submittedDate: "2024-02-03" },
    { id: 7, name: "Academic Transcripts", status: "Submitted", required: true, submittedDate: "2024-02-03" },
    { id: 8, name: "Test Scores (IELTS/GRE)", status: "Submitted", required: true, submittedDate: "2024-02-03" },
    { id: 9, name: "Sponsor Letter", status: "Submitted", required: false, submittedDate: "2024-02-04" },
    { id: 10, name: "Property Documents", status: "Submitted", required: false, submittedDate: "2024-02-04" },
  ]

  // Interview preparation
  const interviewPrep = {
    date: "2024-03-10",
    time: "10:00 AM",
    location: "US Embassy, Mumbai",
    address: "C-49, G Block, Bandra Kurla Complex, Mumbai - 400051",
    officer: "Consular Officer",
    result: "Approved",
    notes: "Interview went well. Student answered all questions confidently.",
    commonQuestions: [
      "Why do you want to study in the USA?",
      "Why did you choose this university?",
      "How will you finance your education?",
      "What are your plans after graduation?",
      "Do you have any relatives in the USA?",
      "What is your academic background?",
      "Why this particular course?",
      "How did you hear about this university?",
    ],
  }

  // Travel information
  const travelInfo = {
    flightBooking: {
      status: "Pending",
      airline: "To be decided",
      flightNumber: "-",
      departureDate: "2024-08-15",
      departureTime: "-",
      departureAirport: "Mumbai (BOM)",
      arrivalDate: "-",
      arrivalTime: "-",
      arrivalAirport: "Boston (BOS)",
      bookingReference: "-",
    },
    accommodation: {
      status: "Confirmed",
      type: "University Dormitory",
      name: "Harvard Yard Dormitory",
      address: "Cambridge, MA 02138, USA",
      checkInDate: "2024-08-16",
      duration: "1 Year",
      rent: "$1,200/month",
    },
    airportPickup: {
      status: "Arranged",
      service: "University Shuttle",
      contactPerson: "International Student Office",
      contactNumber: "+1-617-495-1000",
      pickupTime: "As per flight arrival",
    },
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
      case "Approved":
      case "Confirmed":
      case "Arranged":
      case "Submitted":
        return "bg-green-100 text-green-700"
      case "In Progress":
      case "Pending":
        return "bg-yellow-100 text-yellow-700"
      case "Rejected":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const completedStages = visaStages.filter((s) => s.status === "Completed").length
  const progressPercentage = (completedStages / visaStages.length) * 100

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
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Visa Tracking</h1>
            <p className="text-sm text-gray-600 mt-1">Student ID: {params.id} • Priya Sharma</p>
          </div>
        </div>
        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
          <Download className="w-4 h-4" />
          Export Report
        </Button>
      </div>

      {/* Progress Overview */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Visa Application Progress</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {completedStages} of {visaStages.length} stages completed
                </p>
              </div>
              <Badge className="bg-green-100 text-green-700 text-lg px-4 py-2">{Math.round(progressPercentage)}%</Badge>
            </div>
            <Progress value={progressPercentage} className="h-3" />
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Started: 2024-02-01</span>
              <span>Current Stage: Travel Booking</span>
              <span>Expected Completion: 2024-07-01</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Visa Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Visa Application Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {visaStages.map((stage, index) => (
              <div key={stage.id} className="flex gap-4">
                {/* Timeline Line */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      stage.status === "Completed"
                        ? "bg-green-100"
                        : stage.status === "In Progress"
                          ? "bg-yellow-100"
                          : "bg-gray-100"
                    }`}
                  >
                    {stage.status === "Completed" ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : stage.status === "In Progress" ? (
                      <Clock className="w-5 h-5 text-yellow-600" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                  {index < visaStages.length - 1 && (
                    <div className={`w-0.5 h-16 ${stage.status === "Completed" ? "bg-green-300" : "bg-gray-200"}`} />
                  )}
                </div>

                {/* Stage Content */}
                <div className="flex-1 pb-8">
                  <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-sm text-gray-900">{stage.stage}</h4>
                          <Badge className={getStatusColor(stage.status)}>{stage.status}</Badge>
                        </div>
                        <p className="text-sm text-gray-600">{stage.description}</p>
                      </div>
                      {stage.status === "In Progress" && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-2 bg-transparent"
                          onClick={() => {
                            setSelectedStage(stage)
                            setUpdateDialogOpen(true)
                          }}
                        >
                          <Edit className="w-4 h-4" />
                          Update
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3 text-xs text-gray-600">
                      {stage.date && (
                        <div>
                          <p className="text-gray-500">Date</p>
                          <p className="font-medium">{stage.date}</p>
                        </div>
                      )}
                      {stage.location && (
                        <div>
                          <p className="text-gray-500">Location</p>
                          <p className="font-medium">{stage.location}</p>
                        </div>
                      )}
                      {stage.completedBy && (
                        <div>
                          <p className="text-gray-500">Completed By</p>
                          <p className="font-medium">{stage.completedBy}</p>
                        </div>
                      )}
                      {stage.estimatedDays && (
                        <div>
                          <p className="text-gray-500">Duration</p>
                          <p className="font-medium">{stage.estimatedDays}</p>
                        </div>
                      )}
                      {stage.decision && (
                        <div>
                          <p className="text-gray-500">Decision</p>
                          <p className="font-medium text-green-600">{stage.decision}</p>
                        </div>
                      )}
                      {stage.visaNumber && (
                        <div>
                          <p className="text-gray-500">Visa Number</p>
                          <p className="font-medium">{stage.visaNumber}</p>
                        </div>
                      )}
                      {stage.validUntil && (
                        <div>
                          <p className="text-gray-500">Valid Until</p>
                          <p className="font-medium">{stage.validUntil}</p>
                        </div>
                      )}
                      {stage.estimatedCompletion && (
                        <div>
                          <p className="text-gray-500">Est. Completion</p>
                          <p className="font-medium">{stage.estimatedCompletion}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Visa Documents Checklist */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              Visa Documents Checklist
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {visaDocuments.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                      <p className="text-xs text-gray-500">Submitted: {doc.submittedDate}</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(doc.status)}>{doc.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Interview Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-600" />
              Interview Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="font-semibold text-sm text-gray-900">Interview Result</p>
                <Badge className="bg-green-600 text-white">{interviewPrep.result}</Badge>
              </div>
              <p className="text-xs text-gray-600">{interviewPrep.notes}</p>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-500">Date & Time</p>
                <p className="text-sm font-medium">
                  {interviewPrep.date} at {interviewPrep.time}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Location</p>
                <p className="text-sm font-medium">{interviewPrep.location}</p>
                <p className="text-xs text-gray-600 mt-1">{interviewPrep.address}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Officer</p>
                <p className="text-sm font-medium">{interviewPrep.officer}</p>
              </div>
            </div>

            <div className="pt-3 border-t">
              <p className="text-xs font-semibold text-gray-700 mb-2">Common Interview Questions:</p>
              <ul className="space-y-1">
                {interviewPrep.commonQuestions.slice(0, 5).map((q, i) => (
                  <li key={i} className="text-xs text-gray-600 flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Travel Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Plane className="w-5 h-5 text-blue-600" />
            Travel Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Flight Booking */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-sm text-gray-900">Flight Booking</h4>
                <Badge className={getStatusColor(travelInfo.flightBooking.status)}>
                  {travelInfo.flightBooking.status}
                </Badge>
              </div>
              <div className="space-y-2 text-sm">
                <div>
                  <p className="text-xs text-gray-500">Departure</p>
                  <p className="font-medium">{travelInfo.flightBooking.departureAirport}</p>
                  <p className="text-xs text-gray-600">{travelInfo.flightBooking.departureDate}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Arrival</p>
                  <p className="font-medium">{travelInfo.flightBooking.arrivalAirport}</p>
                  <p className="text-xs text-gray-600">{travelInfo.flightBooking.arrivalDate || "TBD"}</p>
                </div>
                {travelInfo.flightBooking.status === "Pending" && (
                  <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-2">
                    Book Flight
                  </Button>
                )}
              </div>
            </div>

            {/* Accommodation */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-sm text-gray-900">Accommodation</h4>
                <Badge className={getStatusColor(travelInfo.accommodation.status)}>
                  {travelInfo.accommodation.status}
                </Badge>
              </div>
              <div className="space-y-2 text-sm">
                <div>
                  <p className="text-xs text-gray-500">Type</p>
                  <p className="font-medium">{travelInfo.accommodation.type}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Name</p>
                  <p className="font-medium">{travelInfo.accommodation.name}</p>
                  <p className="text-xs text-gray-600">{travelInfo.accommodation.address}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Check-in</p>
                  <p className="font-medium">{travelInfo.accommodation.checkInDate}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Rent</p>
                  <p className="font-medium">{travelInfo.accommodation.rent}</p>
                </div>
              </div>
            </div>

            {/* Airport Pickup */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-sm text-gray-900">Airport Pickup</h4>
                <Badge className={getStatusColor(travelInfo.airportPickup.status)}>
                  {travelInfo.airportPickup.status}
                </Badge>
              </div>
              <div className="space-y-2 text-sm">
                <div>
                  <p className="text-xs text-gray-500">Service</p>
                  <p className="font-medium">{travelInfo.airportPickup.service}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Contact Person</p>
                  <p className="font-medium">{travelInfo.airportPickup.contactPerson}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Contact Number</p>
                  <p className="font-medium">{travelInfo.airportPickup.contactNumber}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Pickup Time</p>
                  <p className="font-medium">{travelInfo.airportPickup.pickupTime}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
              onClick={() => router.push(`/admin/students/${params.id}/pre-departure`)}
            >
              <Plane className="w-4 h-4" />
              Pre-Departure Briefing
            </Button>
            <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white gap-2">
              <FileText className="w-4 h-4" />
              Download Visa Copy
            </Button>
            <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white gap-2">
              <Calendar className="w-4 h-4" />
              Schedule Call
            </Button>
            <Button size="sm" variant="outline" className="gap-2 bg-transparent">
              <Download className="w-4 h-4" />
              Export Timeline
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Update Stage Dialog */}
      <Dialog open={updateDialogOpen} onOpenChange={setUpdateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Stage: {selectedStage?.stage}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Status</Label>
              <select className="w-full p-2 border border-gray-300 rounded-md">
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>Notes</Label>
              <Textarea placeholder="Add notes about this stage..." rows={4} />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setUpdateDialogOpen(false)}>
                Cancel
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">Update Stage</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
