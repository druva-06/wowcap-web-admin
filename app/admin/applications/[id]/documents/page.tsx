"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  ArrowLeft,
  Upload,
  Download,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  AlertCircle,
  Mail,
  Eye,
} from "lucide-react"
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

export default function ApplicationDocumentsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)
  const [verifyDialogOpen, setVerifyDialogOpen] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState<any>(null)
  const [verificationNotes, setVerificationNotes] = useState("")
  const [verificationStatus, setVerificationStatus] = useState("")

  // Application info
  const application = {
    id: params.id,
    applicationNumber: "APP-2024-001",
    student: {
      name: "Priya Sharma",
      id: "STU-1247",
    },
    college: {
      name: "Harvard University",
    },
  }

  // Document categories and required documents
  const documentCategories = [
    {
      id: 1,
      name: "Personal Documents",
      documents: [
        {
          id: 1,
          name: "Passport Copy",
          status: "Verified",
          uploadedDate: "2024-01-12",
          uploadedBy: "Priya Sharma",
          size: "2.3 MB",
          verifiedBy: "Amit Kumar",
          verifiedDate: "2024-01-13",
          notes: "Valid passport. Expiry date: 2030-05-15",
        },
        {
          id: 2,
          name: "Passport Size Photos",
          status: "Verified",
          uploadedDate: "2024-01-12",
          uploadedBy: "Priya Sharma",
          size: "0.2 MB",
          verifiedBy: "Amit Kumar",
          verifiedDate: "2024-01-13",
          notes: "Photos meet requirements",
        },
        {
          id: 3,
          name: "Birth Certificate",
          status: "Pending",
          uploadedDate: "2024-01-12",
          uploadedBy: "Priya Sharma",
          size: "1.1 MB",
          verifiedBy: null,
          verifiedDate: null,
          notes: null,
        },
      ],
    },
    {
      id: 2,
      name: "Academic Documents",
      documents: [
        {
          id: 4,
          name: "10th Grade Marksheet",
          status: "Verified",
          uploadedDate: "2024-01-12",
          uploadedBy: "Priya Sharma",
          size: "1.5 MB",
          verifiedBy: "Amit Kumar",
          verifiedDate: "2024-01-13",
          notes: "CBSE board. 92% aggregate",
        },
        {
          id: 5,
          name: "12th Grade Marksheet",
          status: "Verified",
          uploadedDate: "2024-01-12",
          uploadedBy: "Priya Sharma",
          size: "1.6 MB",
          verifiedBy: "Amit Kumar",
          verifiedDate: "2024-01-13",
          notes: "CBSE board. 94% aggregate",
        },
        {
          id: 6,
          name: "Bachelor's Degree Certificate",
          status: "Verified",
          uploadedDate: "2024-01-12",
          uploadedBy: "Priya Sharma",
          size: "1.2 MB",
          verifiedBy: "Amit Kumar",
          verifiedDate: "2024-01-13",
          notes: "BBA from Delhi University. 8.5 CGPA",
        },
        {
          id: 7,
          name: "Bachelor's Transcripts",
          status: "Verified",
          uploadedDate: "2024-01-12",
          uploadedBy: "Priya Sharma",
          size: "1.8 MB",
          verifiedBy: "Amit Kumar",
          verifiedDate: "2024-01-13",
          notes: "All semester marksheets included",
        },
      ],
    },
    {
      id: 3,
      name: "Test Scores",
      documents: [
        {
          id: 8,
          name: "IELTS Score Report",
          status: "Verified",
          uploadedDate: "2024-01-12",
          uploadedBy: "Priya Sharma",
          size: "0.8 MB",
          verifiedBy: "Amit Kumar",
          verifiedDate: "2024-01-13",
          notes: "Overall: 7.5 (L:8.0, R:7.5, W:7.0, S:7.5)",
        },
        {
          id: 9,
          name: "GRE Score Report",
          status: "Verified",
          uploadedDate: "2024-01-12",
          uploadedBy: "Priya Sharma",
          size: "0.6 MB",
          verifiedBy: "Amit Kumar",
          verifiedDate: "2024-01-13",
          notes: "Total: 325 (Q:165, V:160, AWA:4.5)",
        },
      ],
    },
    {
      id: 4,
      name: "Application Documents",
      documents: [
        {
          id: 10,
          name: "Statement of Purpose",
          status: "Verified",
          uploadedDate: "2024-01-12",
          uploadedBy: "Priya Sharma",
          size: "0.5 MB",
          verifiedBy: "Amit Kumar",
          verifiedDate: "2024-01-13",
          notes: "Well-written SOP. Meets requirements",
        },
        {
          id: 11,
          name: "Letter of Recommendation 1",
          status: "Verified",
          uploadedDate: "2024-01-12",
          uploadedBy: "Priya Sharma",
          size: "0.4 MB",
          verifiedBy: "Amit Kumar",
          verifiedDate: "2024-01-13",
          notes: "From Prof. Rajesh Kumar, Delhi University",
        },
        {
          id: 12,
          name: "Letter of Recommendation 2",
          status: "Verified",
          uploadedDate: "2024-01-12",
          uploadedBy: "Priya Sharma",
          size: "0.4 MB",
          verifiedBy: "Amit Kumar",
          verifiedDate: "2024-01-13",
          notes: "From Dr. Sneha Patel, Delhi University",
        },
        {
          id: 13,
          name: "Resume/CV",
          status: "Verified",
          uploadedDate: "2024-01-12",
          uploadedBy: "Priya Sharma",
          size: "0.3 MB",
          verifiedBy: "Amit Kumar",
          verifiedDate: "2024-01-13",
          notes: "Professional resume. 3 years work experience",
        },
      ],
    },
    {
      id: 5,
      name: "Financial Documents",
      documents: [
        {
          id: 14,
          name: "Bank Statement",
          status: "Verified",
          uploadedDate: "2024-02-10",
          uploadedBy: "Priya Sharma",
          size: "1.5 MB",
          verifiedBy: "Amit Kumar",
          verifiedDate: "2024-02-11",
          notes: "6 months statement. Sufficient funds shown",
        },
        {
          id: 15,
          name: "Financial Affidavit",
          status: "Missing",
          uploadedDate: null,
          uploadedBy: null,
          size: null,
          verifiedBy: null,
          verifiedDate: null,
          notes: null,
        },
      ],
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Verified":
        return "bg-green-100 text-green-700"
      case "Pending":
        return "bg-yellow-100 text-yellow-700"
      case "Rejected":
        return "bg-red-100 text-red-700"
      case "Missing":
        return "bg-gray-100 text-gray-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Verified":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case "Pending":
        return <Clock className="w-5 h-5 text-yellow-600" />
      case "Rejected":
        return <XCircle className="w-5 h-5 text-red-600" />
      case "Missing":
        return <AlertCircle className="w-5 h-5 text-gray-600" />
      default:
        return <FileText className="w-5 h-5 text-gray-600" />
    }
  }

  const handleVerify = () => {
    console.log(
      "[v0] Verifying document:",
      selectedDocument?.name,
      "Status:",
      verificationStatus,
      "Notes:",
      verificationNotes,
    )
    setVerifyDialogOpen(false)
    setSelectedDocument(null)
    setVerificationNotes("")
    setVerificationStatus("")
  }

  const handleRequestDocument = (docName: string) => {
    console.log("[v0] Requesting document:", docName)
  }

  const totalDocuments = documentCategories.reduce((acc, cat) => acc + cat.documents.length, 0)
  const verifiedDocuments = documentCategories.reduce(
    (acc, cat) => acc + cat.documents.filter((d) => d.status === "Verified").length,
    0,
  )
  const pendingDocuments = documentCategories.reduce(
    (acc, cat) => acc + cat.documents.filter((d) => d.status === "Pending").length,
    0,
  )
  const missingDocuments = documentCategories.reduce(
    (acc, cat) => acc + cat.documents.filter((d) => d.status === "Missing").length,
    0,
  )

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
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Document Management</h1>
            <p className="text-sm text-gray-600 mt-1">
              {application.applicationNumber} • {application.student.name}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Download className="w-4 h-4" />
            Download All
          </Button>
          <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-2 bg-blue-600 hover:bg-blue-700">
                <Upload className="w-4 h-4" />
                Upload Document
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload Document</DialogTitle>
                <DialogDescription>Upload a new document for this application</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Document Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select document type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="passport">Passport Copy</SelectItem>
                      <SelectItem value="transcript">Academic Transcript</SelectItem>
                      <SelectItem value="ielts">IELTS Score Report</SelectItem>
                      <SelectItem value="bank">Bank Statement</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Upload File</Label>
                  <Input type="file" />
                </div>
                <div className="space-y-2">
                  <Label>Notes (Optional)</Label>
                  <Textarea placeholder="Add any notes about this document..." rows={3} />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setUploadDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setUploadDialogOpen(false)} className="bg-blue-600 hover:bg-blue-700">
                  Upload
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 mb-1">Total Documents</p>
                <p className="text-2xl font-bold text-gray-900">{totalDocuments}</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 mb-1">Verified</p>
                <p className="text-2xl font-bold text-green-600">{verifiedDocuments}</p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 mb-1">Pending Review</p>
                <p className="text-2xl font-bold text-yellow-600">{pendingDocuments}</p>
              </div>
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 mb-1">Missing</p>
                <p className="text-2xl font-bold text-red-600">{missingDocuments}</p>
              </div>
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Document Categories */}
      <div className="space-y-6">
        {documentCategories.map((category) => (
          <Card key={category.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{category.name}</CardTitle>
                <Badge className="bg-blue-100 text-blue-700">
                  {category.documents.filter((d) => d.status === "Verified").length}/{category.documents.length}{" "}
                  Verified
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {category.documents.map((doc) => (
                  <div key={doc.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          {getStatusIcon(doc.status)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold text-gray-900">{doc.name}</p>
                            <Badge className={getStatusColor(doc.status)}>{doc.status}</Badge>
                          </div>
                          {doc.uploadedDate && (
                            <p className="text-xs text-gray-600">
                              Uploaded: {doc.uploadedDate} by {doc.uploadedBy} • {doc.size}
                            </p>
                          )}
                          {doc.verifiedDate && (
                            <p className="text-xs text-gray-600">
                              Verified: {doc.verifiedDate} by {doc.verifiedBy}
                            </p>
                          )}
                          {doc.notes && <p className="text-xs text-gray-700 mt-1 italic">Note: {doc.notes}</p>}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        {doc.status === "Missing" ? (
                          <Button
                            size="sm"
                            variant="outline"
                            className="gap-2 bg-transparent"
                            onClick={() => handleRequestDocument(doc.name)}
                          >
                            <Mail className="w-4 h-4" />
                            Request
                          </Button>
                        ) : (
                          <>
                            <Button size="sm" variant="outline" className="gap-2 bg-transparent">
                              <Eye className="w-4 h-4" />
                              View
                            </Button>
                            <Button size="sm" variant="outline" className="gap-2 bg-transparent">
                              <Download className="w-4 h-4" />
                            </Button>
                            {doc.status === "Pending" && (
                              <Dialog open={verifyDialogOpen} onOpenChange={setVerifyDialogOpen}>
                                <DialogTrigger asChild>
                                  <Button
                                    size="sm"
                                    className="gap-2 bg-green-600 hover:bg-green-700"
                                    onClick={() => setSelectedDocument(doc)}
                                  >
                                    <CheckCircle className="w-4 h-4" />
                                    Verify
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Verify Document</DialogTitle>
                                    <DialogDescription>Review and verify {selectedDocument?.name}</DialogDescription>
                                  </DialogHeader>
                                  <div className="space-y-4 py-4">
                                    <div className="space-y-2">
                                      <Label>Verification Status</Label>
                                      <Select value={verificationStatus} onValueChange={setVerificationStatus}>
                                        <SelectTrigger>
                                          <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="Verified">Verified - Approved</SelectItem>
                                          <SelectItem value="Rejected">Rejected - Needs Resubmission</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                    <div className="space-y-2">
                                      <Label>Verification Notes</Label>
                                      <Textarea
                                        placeholder="Add notes about this verification..."
                                        value={verificationNotes}
                                        onChange={(e) => setVerificationNotes(e.target.value)}
                                        rows={4}
                                      />
                                    </div>
                                  </div>
                                  <div className="flex justify-end gap-2">
                                    <Button variant="outline" onClick={() => setVerifyDialogOpen(false)}>
                                      Cancel
                                    </Button>
                                    <Button
                                      onClick={handleVerify}
                                      disabled={!verificationStatus}
                                      className="bg-green-600 hover:bg-green-700"
                                    >
                                      Submit Verification
                                    </Button>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
