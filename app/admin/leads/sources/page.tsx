"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { QrCode, Plus, Edit, Download, Users, TrendingUp, Calendar, MapPin } from "lucide-react"
import { generateQRCode } from "@/lib/qr-code-utils"

export default function LeadSourcesPage() {
  const { toast } = useToast()
  const [sources, setSources] = useState([
    {
      id: "SRC001",
      name: "Education Fair Mumbai 2024",
      type: "Offline Event",
      qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=SRC001",
      createdDate: "2024-01-10",
      totalLeads: 145,
      status: "Active",
      location: "Mumbai, Maharashtra",
    },
    {
      id: "SRC002",
      name: "Facebook Campaign - Study Abroad",
      type: "Digital Marketing",
      qrCode: null,
      createdDate: "2024-01-05",
      totalLeads: 289,
      status: "Active",
      location: "Online",
    },
    {
      id: "SRC003",
      name: "College Seminar Bangalore",
      type: "Offline Event",
      qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=SRC003",
      createdDate: "2024-01-15",
      totalLeads: 78,
      status: "Active",
      location: "Bangalore, Karnataka",
    },
  ])

  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [sourceName, setSourceName] = useState("")
  const [sourceType, setSourceType] = useState("")
  const [sourceLocation, setSourceLocation] = useState("")
  const [qrCodePreview, setQrCodePreview] = useState("")

  const handleSourceTypeChange = async (type: string) => {
    setSourceType(type)
    if (type === "Offline Event" && sourceName) {
      const sourceId = `SRC${String(sources.length + 1).padStart(3, "0")}`
      const qrUrl = await generateQRCode(sourceId)
      setQrCodePreview(qrUrl)
    } else {
      setQrCodePreview("")
    }
  }

  const handleCreateSource = async () => {
    if (!sourceName || !sourceType) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive",
      })
      return
    }

    const sourceId = `SRC${String(sources.length + 1).padStart(3, "0")}`
    let qrCodeUrl = null
    if (sourceType === "Offline Event") {
      qrCodeUrl = await generateQRCode(sourceId)
    }

    const newSource = {
      id: sourceId,
      name: sourceName,
      type: sourceType,
      qrCode: qrCodeUrl,
      createdDate: new Date().toISOString().split("T")[0],
      totalLeads: 0,
      status: "Active",
      location: sourceLocation || "Online",
    }

    setSources([...sources, newSource])
    toast({
      title: "Source Created",
      description: `Lead source "${sourceName}" created successfully${qrCodeUrl ? " with QR code" : ""}`,
    })

    setCreateDialogOpen(false)
    setSourceName("")
    setSourceType("")
    setSourceLocation("")
    setQrCodePreview("")
  }

  const handleDownloadQR = async (source: any) => {
    if (source.qrCode) {
      try {
        const link = document.createElement("a")
        link.href = source.qrCode
        link.download = `${source.id}-qrcode.png`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        toast({
          title: "QR Code Downloaded",
          description: `QR code for ${source.name} has been downloaded`,
        })
      } catch (error) {
        toast({
          title: "Download Failed",
          description: "Failed to download QR code",
          variant: "destructive",
        })
      }
    }
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Lead Sources</h1>
          <p className="text-sm text-gray-600 mt-1">Manage and track lead generation sources</p>
        </div>
        <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Create Source
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Lead Source</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Source Name *</Label>
                <Input
                  placeholder="e.g., Education Fair Delhi 2024"
                  value={sourceName}
                  onChange={(e) => setSourceName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Source Type *</Label>
                <select
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  value={sourceType}
                  onChange={(e) => handleSourceTypeChange(e.target.value)}
                >
                  <option value="">Select type</option>
                  <option value="Offline Event">Offline Event</option>
                  <option value="Digital Marketing">Digital Marketing</option>
                  <option value="Referral">Referral</option>
                  <option value="Website">Website</option>
                  <option value="Social Media">Social Media</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Location</Label>
                <Input
                  placeholder="e.g., Delhi, India"
                  value={sourceLocation}
                  onChange={(e) => setSourceLocation(e.target.value)}
                />
              </div>
              {qrCodePreview && (
                <div className="space-y-2">
                  <Label>QR Code Preview</Label>
                  <div className="flex justify-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <img src={qrCodePreview || "/placeholder.svg"} alt="QR Code Preview" className="w-32 h-32" />
                  </div>
                  <p className="text-xs text-gray-600 text-center">
                    This QR code will be generated for your offline event
                  </p>
                </div>
              )}
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={handleCreateSource}>
                  Create Source
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600 mb-1">Total Sources</p>
                <p className="text-2xl font-bold text-gray-900">{sources.length}</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <QrCode className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600 mb-1">Total Leads</p>
                <p className="text-2xl font-bold text-gray-900">{sources.reduce((sum, s) => sum + s.totalLeads, 0)}</p>
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
                <p className="text-xs font-medium text-gray-600 mb-1">Active Sources</p>
                <p className="text-2xl font-bold text-gray-900">
                  {sources.filter((s) => s.status === "Active").length}
                </p>
              </div>
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sources.map((source) => (
          <Card key={source.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{source.name}</CardTitle>
                  <p className="text-sm text-gray-500 mt-1">{source.type}</p>
                </div>
                <Badge className="bg-green-100 text-green-700">{source.status}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {source.qrCode && (
                <div className="flex justify-center p-4 bg-gray-50 rounded-lg">
                  <img src={source.qrCode || "/placeholder.svg"} alt="QR Code" className="w-32 h-32" />
                </div>
              )}

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{source.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>Created: {source.createdDate}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>{source.totalLeads} leads generated</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                {source.qrCode && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 bg-transparent"
                    onClick={() => handleDownloadQR(source)}
                  >
                    <Download className="w-4 h-4 mr-1" />
                    QR Code
                  </Button>
                )}
                <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
