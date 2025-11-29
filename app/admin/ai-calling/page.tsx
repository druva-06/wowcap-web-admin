"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import {
  Phone,
  Play,
  Pause,
  Square,
  Upload,
  Download,
  TrendingUp,
  Users,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  PhoneCall,
  PhoneOff,
  UserCheck,
  BarChart3,
  FileText,
  Bell,
  Zap,
} from "lucide-react"
import { toast } from "sonner"

export default function AICallingPage() {
  const [activeTab, setActiveTab] = useState("campaigns")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null)

  // Sample data for campaigns
  const campaigns = [
    {
      id: "1",
      name: "UG Admissions 2025 - Batch 1",
      source: "Website Form",
      totalLeads: 50000,
      called: 35000,
      remaining: 15000,
      interested: 2500,
      notInterested: 28000,
      callback: 3500,
      noAnswer: 1000,
      status: "running",
      startDate: "2025-01-15",
      assignedTo: ["Vinayak", "Priya", "Rahul"],
      callsPerDay: 25000,
      avgCallDuration: "2:45",
      successRate: "7.1%",
    },
    {
      id: "2",
      name: "PG Programs - Engineering",
      source: "Education Fair Delhi",
      totalLeads: 25000,
      called: 25000,
      remaining: 0,
      interested: 1800,
      notInterested: 20000,
      callback: 2500,
      noAnswer: 700,
      status: "completed",
      startDate: "2025-01-10",
      assignedTo: ["Amit", "Sneha"],
      callsPerDay: 12500,
      avgCallDuration: "3:10",
      successRate: "7.2%",
    },
    {
      id: "3",
      name: "MBA Admissions - Premium",
      source: "LinkedIn Campaign",
      totalLeads: 10000,
      called: 0,
      remaining: 10000,
      interested: 0,
      notInterested: 0,
      callback: 0,
      noAnswer: 0,
      status: "scheduled",
      startDate: "2025-01-25",
      assignedTo: ["Vinayak", "Karthik"],
      callsPerDay: 5000,
      avgCallDuration: "0:00",
      successRate: "0%",
    },
  ]

  // Sample data for interested leads assigned to team members
  const interestedLeadsForTeam = [
    {
      id: "1",
      campaignName: "UG Admissions 2025 - Batch 1",
      assignedTo: "Vinayak",
      totalAssigned: 2000,
      aiCalledFromAssigned: 1500,
      interestedFromAssigned: 120,
      pendingFollowup: 85,
      lastUpdated: "2 hours ago",
    },
    {
      id: "2",
      campaignName: "UG Admissions 2025 - Batch 1",
      assignedTo: "Priya",
      totalAssigned: 1500,
      aiCalledFromAssigned: 1200,
      interestedFromAssigned: 95,
      pendingFollowup: 60,
      lastUpdated: "1 hour ago",
    },
  ]

  const handleCreateCampaign = () => {
    toast.success("AI Calling Campaign Created Successfully")
    setIsCreateDialogOpen(false)
  }

  const handleStartCampaign = (campaignId: string) => {
    toast.success("AI Calling Campaign Started")
  }

  const handlePauseCampaign = (campaignId: string) => {
    toast.info("AI Calling Campaign Paused")
  }

  const handleStopCampaign = (campaignId: string) => {
    toast.warning("AI Calling Campaign Stopped")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">AI Calling System</h1>
          <p className="text-muted-foreground">Automated calling campaigns with intelligent lead qualification</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Zap className="h-4 w-4" />
              Create Campaign
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create AI Calling Campaign</DialogTitle>
              <DialogDescription>
                Set up a new automated calling campaign with AI-powered lead qualification
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="campaign-name">Campaign Name</Label>
                <Input id="campaign-name" placeholder="e.g., UG Admissions 2025" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="source">Lead Source</Label>
                <Select>
                  <SelectTrigger id="source">
                    <SelectValue placeholder="Select source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="website">Website Form</SelectItem>
                    <SelectItem value="fair">Education Fair</SelectItem>
                    <SelectItem value="linkedin">LinkedIn Campaign</SelectItem>
                    <SelectItem value="facebook">Facebook Ads</SelectItem>
                    <SelectItem value="referral">Referral Program</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="data-upload">Upload Lead Data (CSV/Excel)</Label>
                <div className="flex gap-2">
                  <Input id="data-upload" type="file" accept=".csv,.xlsx" />
                  <Button variant="outline" size="icon">
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">Required columns: Name, Phone, Email, Course Interest</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="calls-per-day">Calls Per Day</Label>
                  <Input id="calls-per-day" type="number" placeholder="25000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="start-date">Start Date</Label>
                  <Input id="start-date" type="date" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="script">AI Call Script</Label>
                <Textarea id="script" placeholder="Enter the conversation script for AI to follow..." rows={4} />
              </div>
              <div className="space-y-2">
                <Label>Assign Team Members (for interested leads)</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select team members" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vinayak">Vinayak</SelectItem>
                    <SelectItem value="priya">Priya</SelectItem>
                    <SelectItem value="rahul">Rahul</SelectItem>
                    <SelectItem value="amit">Amit</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Interested leads will be automatically assigned to these team members
                </p>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateCampaign}>Create Campaign</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Campaigns</CardTitle>
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
              <Phone className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">1 running, 1 scheduled</p>
          </CardContent>
        </Card>
        <Card className="transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Calls Made</CardTitle>
            <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
              <PhoneCall className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">60,000</div>
            <p className="text-xs text-muted-foreground">25,000 remaining</p>
          </CardContent>
        </Card>
        <Card className="transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interested Leads</CardTitle>
            <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
              <UserCheck className="h-4 w-4 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4,300</div>
            <p className="text-xs text-muted-foreground">7.2% success rate</p>
          </CardContent>
        </Card>
        <Card className="transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Call Duration</CardTitle>
            <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center">
              <Clock className="h-4 w-4 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2:58</div>
            <p className="text-xs text-muted-foreground">Minutes per call</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="campaigns" className="gap-2">
            <Phone className="h-4 w-4" />
            Campaigns
          </TabsTrigger>
          <TabsTrigger value="monitoring" className="gap-2">
            <BarChart3 className="h-4 w-4" />
            Live Monitoring
          </TabsTrigger>
          <TabsTrigger value="team-assignments" className="gap-2">
            <Users className="h-4 w-4" />
            Team Assignments
          </TabsTrigger>
          <TabsTrigger value="analytics" className="gap-2">
            <TrendingUp className="h-4 w-4" />
            Analytics
          </TabsTrigger>
        </TabsList>

        {/* Campaigns Tab */}
        <TabsContent value="campaigns" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Campaigns</CardTitle>
              <CardDescription>Manage your AI calling campaigns</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {campaigns.map((campaign) => (
                <Card key={campaign.id} className="border-2">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      {/* Campaign Header */}
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-semibold">{campaign.name}</h3>
                            <Badge
                              variant={
                                campaign.status === "running"
                                  ? "default"
                                  : campaign.status === "completed"
                                    ? "secondary"
                                    : "outline"
                              }
                              className={
                                campaign.status === "running"
                                  ? "bg-green-600 text-white"
                                  : campaign.status === "completed"
                                    ? "bg-blue-600 text-white"
                                    : "bg-orange-600 text-white"
                              }
                            >
                              {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Source: {campaign.source} • Started: {campaign.startDate}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          {campaign.status === "scheduled" && (
                            <Button size="sm" onClick={() => handleStartCampaign(campaign.id)} className="gap-2">
                              <Play className="h-4 w-4" />
                              Start
                            </Button>
                          )}
                          {campaign.status === "running" && (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handlePauseCampaign(campaign.id)}
                                className="gap-2"
                              >
                                <Pause className="h-4 w-4" />
                                Pause
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleStopCampaign(campaign.id)}
                                className="gap-2"
                              >
                                <Square className="h-4 w-4" />
                                Stop
                              </Button>
                            </>
                          )}
                          {campaign.status === "completed" && (
                            <Button size="sm" variant="outline" className="gap-2 bg-transparent">
                              <Download className="h-4 w-4" />
                              Export Results
                            </Button>
                          )}
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span className="font-medium">
                            {campaign.called.toLocaleString()} / {campaign.totalLeads.toLocaleString()} calls
                          </span>
                        </div>
                        <Progress value={(campaign.called / campaign.totalLeads) * 100} />
                      </div>

                      {/* Campaign Stats */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                            Interested
                          </div>
                          <p className="text-2xl font-bold">{campaign.interested.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">{campaign.successRate} success rate</p>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <AlertCircle className="h-4 w-4 text-orange-600" />
                            Callback
                          </div>
                          <p className="text-2xl font-bold">{campaign.callback.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">Requested callback</p>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <XCircle className="h-4 w-4 text-red-600" />
                            Not Interested
                          </div>
                          <p className="text-2xl font-bold">{campaign.notInterested.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">Declined offer</p>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <PhoneOff className="h-4 w-4 text-gray-600" />
                            No Answer
                          </div>
                          <p className="text-2xl font-bold">{campaign.noAnswer.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">Unreachable</p>
                        </div>
                      </div>

                      {/* Assigned Team */}
                      <div className="flex items-center gap-2 pt-2 border-t">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Assigned to:</span>
                        <div className="flex gap-1">
                          {campaign.assignedTo.map((member) => (
                            <Badge key={member} variant="outline">
                              {member}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Live Monitoring Tab */}
        <TabsContent value="monitoring" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Live Call Monitoring</CardTitle>
              <CardDescription>Real-time monitoring of active AI calls</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Real-time stats */}
                <div className="grid grid-cols-3 gap-4">
                  <Card className="bg-green-50 border-green-200">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Active Calls</p>
                          <p className="text-3xl font-bold text-green-600">247</p>
                        </div>
                        <Phone className="h-8 w-8 text-green-600 animate-pulse" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-blue-50 border-blue-200">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Calls/Minute</p>
                          <p className="text-3xl font-bold text-blue-600">18</p>
                        </div>
                        <TrendingUp className="h-8 w-8 text-blue-600" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-purple-50 border-purple-200">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Avg Duration</p>
                          <p className="text-3xl font-bold text-purple-600">2:45</p>
                        </div>
                        <Clock className="h-8 w-8 text-purple-600" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent calls */}
                <div className="space-y-2">
                  <h3 className="font-semibold">Recent Calls</h3>
                  <div className="space-y-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="flex items-center justify-between p-3 border rounded-lg bg-card">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <Phone className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">+91 98765 43210</p>
                            <p className="text-sm text-muted-foreground">UG Admissions 2025 - Batch 1</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-sm font-medium">2:34</p>
                            <p className="text-xs text-muted-foreground">In progress</p>
                          </div>
                          <Badge className="bg-green-600 text-white">Active</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Team Assignments Tab */}
        <TabsContent value="team-assignments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Member Assignments</CardTitle>
              <CardDescription>
                Track interested leads assigned to team members from AI calling campaigns
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {interestedLeadsForTeam.map((assignment) => (
                <Card key={assignment.id} className="border-2">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-lg">{assignment.assignedTo}</h3>
                          <p className="text-sm text-muted-foreground">{assignment.campaignName}</p>
                        </div>
                        <Badge variant="outline" className="gap-1">
                          <Bell className="h-3 w-3" />
                          {assignment.pendingFollowup} pending
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Total Assigned</p>
                          <p className="text-2xl font-bold">{assignment.totalAssigned.toLocaleString()}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">AI Called</p>
                          <p className="text-2xl font-bold">{assignment.aiCalledFromAssigned.toLocaleString()}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Interested</p>
                          <p className="text-2xl font-bold text-green-600">{assignment.interestedFromAssigned}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Pending Followup</p>
                          <p className="text-2xl font-bold text-orange-600">{assignment.pendingFollowup}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t">
                        <p className="text-sm text-muted-foreground">Last updated: {assignment.lastUpdated}</p>
                        <Button size="sm" variant="outline" className="gap-2 bg-transparent">
                          <FileText className="h-4 w-4" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div className="space-y-1">
                      <p className="font-medium text-blue-900">How Team Assignments Work</p>
                      <p className="text-sm text-blue-800">
                        When AI identifies interested leads from a team member's assigned data, they are automatically
                        notified and the lead is marked for followup. Team members can see these leads in their regular
                        leads dashboard with a special "AI Interested" tag.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Analytics</CardTitle>
              <CardDescription>Detailed performance metrics and insights</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Performance metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">Overall Success Rate</p>
                        <p className="text-3xl font-bold">7.2%</p>
                        <p className="text-xs text-green-600">↑ 0.5% from last week</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">Callback Rate</p>
                        <p className="text-3xl font-bold">10.3%</p>
                        <p className="text-xs text-green-600">↑ 1.2% from last week</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">Answer Rate</p>
                        <p className="text-3xl font-bold">85.5%</p>
                        <p className="text-xs text-red-600">↓ 2.1% from last week</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">Cost Per Lead</p>
                        <p className="text-3xl font-bold">₹12</p>
                        <p className="text-xs text-green-600">↓ ₹3 from last week</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Best performing times */}
                <div>
                  <h3 className="font-semibold mb-3">Best Performing Time Slots</h3>
                  <div className="space-y-2">
                    {[
                      { time: "10:00 AM - 12:00 PM", rate: "9.2%", calls: 12500 },
                      { time: "2:00 PM - 4:00 PM", rate: "8.5%", calls: 11200 },
                      { time: "4:00 PM - 6:00 PM", rate: "7.8%", calls: 10800 },
                    ].map((slot, i) => (
                      <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Clock className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">{slot.time}</p>
                            <p className="text-sm text-muted-foreground">{slot.calls.toLocaleString()} calls</p>
                          </div>
                        </div>
                        <Badge className="bg-green-600 text-white">{slot.rate} success</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
