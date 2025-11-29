"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowLeft,
  Upload,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  AlertCircle,
  User,
} from "lucide-react"

export default function DocumentVerificationPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)
  const [verifyDialogOpen, setVerifyDialogOpen] = useState(false)
  const [selectedDoc, setSelectedDoc] = useState<any>(null)

  // Document categories
  const documentCategories = [
    {
      category: "Identity Documents",
      documents: [
        {
          id: 1,
          name: "Passport",
          required: true,
          status: "Verified",
          uploadedDate: "2024-01-16",
          verifiedDate: "2024-01-17",
          verifiedBy: "Amit Kumar",
          expiryDate: "2030-05-15",
          fileSize: "2.5 MB",
          comments: "Valid passport with 10 years validity",
        },
        {
          id: 2,
          name: "Aadhaar Card",
          required: false,
          status: "Verified",
          uploadedDate: "2024-01-16",
          verifiedDate: "2024-01-17",
          verifiedBy: "Amit Kumar",
          fileSize: "1.2 MB",
        },
      ],
    },
    {
      category: "Academic Documents",
      documents: [
        {
          id: 3,
          name: "10th Marksheet",
          required: true,
          status: "Verified",
          uploadedDate: "2024-01-16",
          verifiedDate: "2024-01-17",
          verifiedBy: "Amit Kumar",
          marks: "85%",
          fileSize: "1.8 MB",
        },
        {
          id: 4,
          name: "12th Marksheet",
          required: true,
          status: "Verified",
          uploadedDate: "2024-01-16",
          verifiedDate: "2024-01-17",
          verifiedBy: "Amit Kumar",
          marks: "88%",
          fileSize: "1.9 MB",
        },
        {
          id: 5,
          name: "Degree Certificate",
          required: true,
          status: "Verified",
          uploadedDate: "2024-01-16",
          verifiedDate: "2024-01-17",
          verifiedBy: "Amit Kumar",
          cgpa: "8.5/10",
          fileSize: "2.1 MB",
        },
        {
          id: 6,
          name: "Transcripts",
          required: true,
          status: "Pending",
          uploadedDate: "2024-01-20",
          fileSize: "3.2 MB",
        },
      ],
    },
    {
      category: "Test Scores",
      documents: [
        {
          id: 7,
          name: "IELTS Score Card",
          required: true,
          status: "Verified",
          uploadedDate: "2024-01-17",
          verifiedDate: "2024-01-18",
          verifiedBy: "Amit Kumar",
          score: "7.5",
          expiryDate: "2025-12-10",
          fileSize: "1.5 MB",
        },
        {
          id: 8,
          name: "GRE Score Report",
          required: true,
          status: "Verified",
          uploadedDate: "2024-01-17",
          verifiedDate: "2024-01-18",
          verifiedBy: "Amit Kumar",
          score: "320",
          expiryDate: "2028-11-15",
          fileSize: "1.3 MB",
        },
      ],
    },
    {
      category: "Financial Documents",
      documents: [
        {
          id: 9,
          name: "Bank Statement",
          required: true,
          status: "Verified",
          uploadedDate: "2024-01-18",
          verifiedDate: "2024-01-19",
          verifiedBy: "Amit Kumar",
          fileSize: "2.8 MB",
          comments: "6 months bank statement showing sufficient funds",
        },
        {
          id: 10,
          name: "Sponsor Letter",
          required: false,
          status: "Pending",
          uploadedDate: "2024-01-20",
          fileSize: "1.1 MB",
        },
        {
          id: 11,
          name: "Income Tax Returns",
          required: false,
          status: "Rejected",
          uploadedDate: "2024-01-19",
          rejectedDate: "2024-01-20",
          rejectedBy: "Amit Kumar",
          fileSize: "1.7 MB",
          comments: "Document is not clear. Please upload a clearer version",
        },
      ],
    },
    {
      category: "Application Documents",
      documents: [
        {
          id: 12,
          name: "Statement of Purpose",
          required: true,
          status: "Verified",
          uploadedDate: "2024-01-19",
          verifiedDate: "2024-01-20",
          verifiedBy: "Amit Kumar",
          fileSize: "800 KB",
        },
        {
          id: 13,
          name: "Letter of Recommendation 1",
          required: true,
          status: "Verified",
          uploadedDate: "2024-01-19",
          verifiedDate: "2024-01-20",
          verifiedBy: "Amit Kumar",
          fileSize: "750 KB",
        },
        {
          id: 14,
          name: "Letter of Recommendation 2",
          required: true,
          status: "Verified",
          uploadedDate: "2024-01-19",
          verifiedDate: "2024-01-20",
          verifiedBy: "Amit Kumar",
          fileSize: "820 KB",
        },
        {
          id: 15,
          name: "Resume/CV",
          required: true,
          status: "Pending",
          uploadedDate: "2024-01-20",
          fileSize: "650 KB",
        },
      ],
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Verified":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case "Pending":
        return <Clock className="w-5 h-5 text-yellow-600" />
      case "Rejected":
        return <XCircle className="w-5 h-5 text-red-600" />
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Verified":
        return "bg-green-100 text-green-700"
      case "Pending":
        return "bg-yellow-100 text-yellow-700"
      case "Rejected":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
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
  const rejectedDocuments = documentCategories.reduce(
    (acc, cat) => acc + cat.documents.filter((d) => d.status === "Rejected").length,
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
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Document Verification</h1>
            <p className="text-sm text-gray-600 mt-1">Student ID: {params.id}</p>
          </div>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2" onClick={() => setUploadDialogOpen(true)}>
          <Upload className="w-4 h-4" />
          Upload Document
        </Button>
      </div>

      {/* Summary Cards */}
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
                <p className="text-xs text-gray-600 mb-1">Pending</p>
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
                <p className="text-xs text-gray-600 mb-1">Rejected</p>
                <p className="text-2xl font-bold text-red-600">{rejectedDocuments}</p>
              </div>
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <XCircle className="w-5 h-5 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Document Categories */}
      <div className="space-y-6">
        {documentCategories.map((category) => (
          <Card key={category.category}>
            <CardHeader>
              <CardTitle className="text-lg">{category.category}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {category.documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          {getStatusIcon(doc.status)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold text-sm text-gray-900">{doc.name}</p>
                            {doc.required && (
                              <Badge variant="outline" className="text-xs text-red-600 border-red-300">
                                Required
                              </Badge>
                            )}
                            <Badge className={getStatusColor(doc.status)}>{doc.status}</Badge>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs text-gray-600 mt-2">
                            <div>
                              <p className="text-gray-500">Uploaded</p>
                              <p className="font-medium">{doc.uploadedDate}</p>
                            </div>
                            {doc.verifiedDate && (
                              <div>
                                <p className="text-gray-500">Verified</p>
                                <p className="font-medium">{doc.verifiedDate}</p>
                              </div>
                            )}
                            {doc.rejectedDate && (
                              <div>
                                <p className="text-gray-500">Rejected</p>
                                <p className="font-medium">{doc.rejectedDate}</p>
                              </div>
                            )}
                            <div>
                              <p className="text-gray-500">File Size</p>
                              <p className="font-medium">{doc.fileSize}</p>
                            </div>
                            {doc.expiryDate && (
                              <div>
                                <p className="text-gray-500">Expiry</p>
                                <p className="font-medium">{doc.expiryDate}</p>
                              </div>
                            )}
                            {doc.marks && (
                              <div>
                                <p className="text-gray-500">Marks</p>
                                <p className="font-medium">{doc.marks}</p>
                              </div>
                            )}
                            {doc.cgpa && (
                              <div>
                                <p className="text-gray-500">CGPA</p>
                                <p className="font-medium">{doc.cgpa}</p>
                              </div>
                            )}
                            {doc.score && (
                              <div>
                                <p className="text-gray-500">Score</p>
                                <p className="font-medium">{doc.score}</p>
                              </div>
                            )}
                          </div>

                          {doc.verifiedBy && (
                            <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                              <User className="w-3 h-3" />
                              Verified by {doc.verifiedBy}
                            </p>
                          )}

                          {doc.rejectedBy && (
                            <p className="text-xs text-red-600 mt-2 flex items-center gap-1">
                              <User className="w-3 h-3" />
                              Rejected by {doc.rejectedBy}
                            </p>
                          )}

                          {doc.comments && (
                            <div className="mt-2 p-2 bg-blue-50 rounded text-xs text-blue-700">
                              <p className="font-medium mb-1">Comments:</p>
                              <p>{doc.comments}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 ml-4">
                        <Button size="sm" variant="outline" className="gap-2 bg-transparent">
                          <Eye className="w-4 h-4" />
                          View
                        </Button>
                        <Button size="sm" variant="outline" className="gap-2 bg-transparent">
                          <Download className="w-4 h-4" />
                        </Button>
                        {doc.status === "Pending" && (
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 text-white gap-2"
                            onClick={() => {
                              setSelectedDoc(doc)
                              setVerifyDialogOpen(true)
                            }}
                          >
                            <CheckCircle className="w-4 h-4" />
                            Verify
                          </Button>
                        )}
                        {doc.status === "Rejected" && (
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
                            <Upload className="w-4 h-4" />
                            Re-upload
                          </Button>
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

      {/* Upload Dialog */}
      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Document</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Document Category</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="identity">Identity Documents</SelectItem>
                  <SelectItem value="academic">Academic Documents</SelectItem>
                  <SelectItem value="test">Test Scores</SelectItem>
                  <SelectItem value="financial">Financial Documents</SelectItem>
                  <SelectItem value="application">Application Documents</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Document Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="passport">Passport</SelectItem>
                  <SelectItem value="marksheet">Marksheet</SelectItem>
                  <SelectItem value="degree">Degree Certificate</SelectItem>
                  <SelectItem value="test-score">Test Score</SelectItem>
                  <SelectItem value="bank">Bank Statement</SelectItem>
                  <SelectItem value="sop">Statement of Purpose</SelectItem>
                  <SelectItem value="lor">Letter of Recommendation</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>File</Label>
              <Input type="file" accept=".pdf,.jpg,.jpeg,.png" />
              <p className="text-xs text-gray-500">Accepted formats: PDF, JPG, PNG (Max 5MB)</p>
            </div>
            <div className="space-y-2">
              <Label>Comments (Optional)</Label>
              <Textarea placeholder="Add any comments about this document..." rows={3} />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setUploadDialogOpen(false)}>
                Cancel
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
                <Upload className="w-4 h-4" />
                Upload
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Verify Dialog */}
      <Dialog open={verifyDialogOpen} onOpenChange={setVerifyDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Verify Document</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {selectedDoc && (
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="font-semibold text-sm text-gray-900">{selectedDoc.name}</p>
                <p className="text-xs text-gray-500 mt-1">Uploaded on {selectedDoc.uploadedDate}</p>
              </div>
            )}
            <div className="space-y-2">
              <Label>Verification Status</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Comments</Label>
              <Textarea placeholder="Add verification comments..." rows={4} />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setVerifyDialogOpen(false)}>
                Cancel
              </Button>
              <Button className="bg-green-600 hover:bg-green-700 text-white gap-2">
                <CheckCircle className="w-4 h-4" />
                Submit Verification
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
