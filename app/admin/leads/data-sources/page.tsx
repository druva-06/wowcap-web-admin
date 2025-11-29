"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import {
  Plus,
  QrCode,
  Download,
  Edit,
  Trash2,
  Users,
  TrendingUp,
  AlertCircle,
  Copy,
  ExternalLink,
  Calendar,
  MapPin,
  FileText,
} from "lucide-react"

export default function DataSourcesPage() {
  const { toast } = useToast()
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [qrDialogOpen, setQrDialogOpen] = useState(false)
  const [selectedSource, setSelectedSource] = useState<any>(null)

  // Form states
  const [sourceName, setSourceName] = useState("")
  const [sourceType, setSourceType] = useState("")
  const [description, setDescription] = useState("")
  const [location, setLocation] = useState("")
  const [eventDate, setEventDate] = useState("")

  const dataSources = [
    {
      id: "DS001",
      name: "Education Fair - Mumbai 2024",
      type: "Offline Event",
      url: "https://wowcap.com/lead?source=mumbai-fair-2024",
      qrCode: "/placeholder.svg?height=200&width=200",
      leadsGenerated: 245,
      duplicates: 12,
      conversionRate: 18,
      location: "Mumbai, Maharashtra",
      eventDate: "2024-01-20",
      status: "Active",
      createdAt: "2024-01-10",
      createdBy: "Admin User",
    },
    {
      id: "DS002",
      name: "College Seminar - Delhi",
      type: "Offline Event",
      url: "https://wowcap.com/lead?source=delhi-seminar-2024",
      qrCode: "/placeholder.svg?height=200&width=200",
      leadsGenerated: 156,
      duplicates: 8,
      conversionRate: 22,
      location: "Delhi, NCR",
      eventDate: "2024-01-18",
      status: "Active",
      createdAt: "2024-01-08",
      createdBy: "Admin User",
    },
    {
      id: "DS003",
      name: "Facebook Campaign - Jan",
      type: "Digital Marketing",
      url: "https://wowcap.com/lead?source=fb-jan-2024",
      qrCode: "/placeholder.svg?height=200&width=200",
      leadsGenerated: 892,
      duplicates: 45,
      conversionRate: 12,
      location: "Online",
      eventDate: "2024-01-01",
      status: "Active",
      createdAt: "2024-01-01",
      createdBy: "Marketing Team",
    },
    {
      id: "DS004",
      name: "Partner Referral - Bangalore",
      type: "Partner Network",
      url: "https://wowcap.com/lead?source=partner-blr-2024",
      qrCode: "/placeholder.svg?height=200&width=200",
      leadsGenerated: 67,
      duplicates: 3,
      conversionRate: 28,
      location: "Bangalore, Karnataka",
      eventDate: "2024-01-15",
      status: "Active",
      createdAt: "2024-01-12",
      createdBy: "Partner Manager",
    },
  ]

  const handleCreateSource = () => {
    if (!sourceName || !sourceType) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Source Created",
      description: `Data source "${sourceName}" created successfully with QR code`,
    })
    setCreateDialogOpen(false)
    setSourceName("")
    setSourceType("")
    setDescription("")
    setLocation("")
    setEventDate("")
  }

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url)
    toast({
      title: "URL Copied",
      description: "Source URL copied to clipboard",
    })
  }

  const handleDownloadQR = (source: any) => {
    toast({
      title: "Downloading QR Code",
      description: `QR code for ${source.name} is being downloaded`,
    })
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Data Sources Management</h1>
          <p className="text-sm text-gray-600 mt-1">Create sources, generate QR codes, and track lead generation</p>
        </div>
        <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Create Source
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Create New Data Source</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Source Name *</Label>
                <Input
                  placeholder="e.g., Education Fair - Mumbai 2024"
                  value={sourceName}
                  onChange={(e) => setSourceName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Source Type *</Label>
                <Select value={sourceType} onValueChange={setSourceType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="offline-event">Offline Event</SelectItem>
                    <SelectItem value="digital-marketing">Digital Marketing</SelectItem>
                    <SelectItem value="partner-network">Partner Network</SelectItem>
                    <SelectItem value="referral">Referral Program</SelectItem>
                    <SelectItem value="webinar">Webinar</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  placeholder="Brief description of the source..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input
                    placeholder="e.g., Mumbai, Maharashtra"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Event Date</Label>
                  <Input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <QrCode className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-900">QR Code Generation</p>
                    <p className="text-xs text-blue-700 mt-1">
                      A unique QR code will be automatically generated for this source
                    </p>
                  </div>
                </div>
              </div>
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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600 mb-1">Total Sources</p>
                <p className="text-2xl font-bold text-gray-900">{dataSources.length}</p>
                <p className="text-xs text-green-600 mt-1 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +2 this month
                </p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600 mb-1">Total Leads</p>
                <p className="text-2xl font-bold text-gray-900">
                  {dataSources.reduce((sum, source) => sum + source.leadsGenerated, 0)}
                </p>
                <p className="text-xs text-green-600 mt-1 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +156 this week
                </p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600 mb-1">Duplicates</p>
                <p className="text-2xl font-bold text-gray-900">
                  {dataSources.reduce((sum, source) => sum + source.duplicates, 0)}
                </p>
                <p className="text-xs text-orange-600 mt-1 flex items-center">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  5.1% of total
                </p>
              </div>
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600 mb-1">Avg. Conversion</p>
                <p className="text-2xl font-bold text-gray-900">
                  {(dataSources.reduce((sum, source) => sum + source.conversionRate, 0) / dataSources.length).toFixed(
                    1,
                  )}
                  %
                </p>
                <p className="text-xs text-green-600 mt-1 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +3.2% vs last month
                </p>
              </div>
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data Sources List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {dataSources.map((source) => (
          <Card key={source.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{source.name}</CardTitle>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge className="bg-blue-100 text-blue-700">{source.type}</Badge>
                    <Badge className="bg-green-100 text-green-700">{source.status}</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <Edit className="w-4 h-4 text-gray-600" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Stats */}
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-2 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-600">Leads</p>
                  <p className="text-lg font-bold text-gray-900">{source.leadsGenerated}</p>
                </div>
                <div className="text-center p-2 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-600">Duplicates</p>
                  <p className="text-lg font-bold text-orange-600">{source.duplicates}</p>
                </div>
                <div className="text-center p-2 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-600">Conversion</p>
                  <p className="text-lg font-bold text-green-600">{source.conversionRate}%</p>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{source.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(source.eventDate).toLocaleDateString()}</span>
                </div>
              </div>

              {/* URL */}
              <div className="space-y-2">
                <Label className="text-xs">Source URL</Label>
                <div className="flex items-center gap-2">
                  <Input value={source.url} readOnly className="text-xs" />
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-shrink-0 bg-transparent"
                    onClick={() => handleCopyUrl(source.url)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="flex-shrink-0 bg-transparent">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* QR Code Actions */}
              <div className="flex items-center gap-2">
                <Dialog open={qrDialogOpen && selectedSource?.id === source.id} onOpenChange={setQrDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex-1 bg-transparent"
                      onClick={() => setSelectedSource(source)}
                    >
                      <QrCode className="w-4 h-4 mr-2" />
                      View QR Code
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>{source.name}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="flex justify-center">
                        <div className="p-4 bg-white border-2 border-gray-200 rounded-lg">
                          <img
                            src={`/ceholder-svg-height-300-width-300-text-qr-code-for.jpg?height=300&width=300&text=QR+Code+for+${source.name}`}
                            alt="QR Code"
                            className="w-64 h-64"
                          />
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Scan this QR code to access the lead form</p>
                        <p className="text-xs text-gray-500 mt-1">{source.url}</p>
                      </div>
                      <Button
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => handleDownloadQR(source)}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download QR Code
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button variant="outline" className="flex-1 bg-transparent" onClick={() => handleDownloadQR(source)}>
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
