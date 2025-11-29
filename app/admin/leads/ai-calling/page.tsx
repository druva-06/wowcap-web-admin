"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Phone,
  PhoneCall,
  PhoneOff,
  CheckCircle2,
  XCircle,
  Ban,
  Play,
  Pause,
  RotateCcw,
  TrendingUp,
  Timer,
  Target,
  FileText,
  UserPlus,
} from "lucide-react"
import { mockData } from "@/lib/mock-data"
import { toast } from "sonner"

interface CallResult {
  id: string
  leadName: string
  phone: string
  status: "calling" | "completed" | "failed" | "no-answer" | "busy"
  outcome?: "interested" | "not-interested" | "callback" | "dnd"
  duration?: number
  timestamp: Date
  transcript?: string
  aiNotes?: string
}

export default function AICallingPage() {
  const [selectedCampaign, setSelectedCampaign] = useState<string>("")
  const [isCallInProgress, setIsCallInProgress] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [callResults, setCallResults] = useState<CallResult[]>([])
  const [currentCall, setCurrentCall] = useState<CallResult | null>(null)
  const [progress, setProgress] = useState(0)
  const [selectedTranscript, setSelectedTranscript] = useState<CallResult | null>(null)
  const [showTranscriptDialog, setShowTranscriptDialog] = useState(false)

  // Stats
  const totalCalls = callResults.length
  const completedCalls = callResults.filter((c) => c.status === "completed").length
  const interestedLeads = callResults.filter((c) => c.outcome === "interested").length
  const notInterestedLeads = callResults.filter((c) => c.outcome === "not-interested").length
  const noAnswerCalls = callResults.filter((c) => c.status === "no-answer").length
  const dndLeads = callResults.filter((c) => c.outcome === "dnd").length
  const successRate = totalCalls > 0 ? ((completedCalls / totalCalls) * 100).toFixed(1) : "0"
  const conversionRate = completedCalls > 0 ? ((interestedLeads / completedCalls) * 100).toFixed(1) : "0"
  const avgDuration =
    completedCalls > 0
      ? (callResults.filter((c) => c.duration).reduce((sum, c) => sum + (c.duration || 0), 0) / completedCalls).toFixed(
          0,
        )
      : "0"

  // Get campaign details
  const campaign = mockData.campaigns.find((c) => c.id === selectedCampaign)
  const totalLeadsInCampaign = campaign?.totalLeads || 0

  // Simulate AI calling
  const simulateAICalling = async () => {
    if (!selectedCampaign) {
      toast.error("Please select a campaign first")
      return
    }

    setIsCallInProgress(true)
    setProgress(0)
    setCallResults([])

    // Mock lead data for the campaign
    const mockLeads = Array.from({ length: Math.min(50, totalLeadsInCampaign) }, (_, i) => ({
      id: `LEAD-${i + 1}`,
      name: `Lead ${i + 1}`,
      phone: `+91 ${9000000000 + i}`,
    }))

    for (let i = 0; i < mockLeads.length; i++) {
      if (isPaused) {
        await new Promise((resolve) => {
          const checkPause = setInterval(() => {
            if (!isPaused) {
              clearInterval(checkPause)
              resolve(true)
            }
          }, 100)
        })
      }

      const lead = mockLeads[i]

      // Start calling
      const newCall: CallResult = {
        id: lead.id,
        leadName: lead.name,
        phone: lead.phone,
        status: "calling",
        timestamp: new Date(),
      }
      setCurrentCall(newCall)

      // Simulate call duration (2-5 seconds)
      await new Promise((resolve) => setTimeout(resolve, 2000 + Math.random() * 3000))

      // Random outcome
      const rand = Math.random()
      let status: CallResult["status"]
      let outcome: CallResult["outcome"] | undefined
      let duration: number | undefined
      let transcript: string | undefined
      let aiNotes: string | undefined

      if (rand < 0.6) {
        // 60% completed calls
        status = "completed"
        duration = Math.floor(30 + Math.random() * 180) // 30-210 seconds

        const outcomeRand = Math.random()
        if (outcomeRand < 0.3) {
          outcome = "interested"
          transcript = `AI: Hello, this is an automated call from WOW Education. We're reaching out about study abroad opportunities.\n\nLead: Yes, I'm interested in studying in Canada.\n\nAI: Great! Can I know your preferred course?\n\nLead: I'm looking for MBA programs.\n\nAI: Excellent! Our counselor will contact you within 24 hours with detailed information about MBA programs in Canada.\n\nLead: Thank you!`
          aiNotes = "Lead is interested in MBA programs in Canada. High intent. Prefers fall 2025 intake."

          // Notify counselors about interested lead
          toast.success(`🎯 Interested Lead Found: ${lead.name}`, {
            description: "Lead is interested in MBA programs in Canada",
            action: {
              label: "Assign Now",
              onClick: () => handleSyncInterestedLead(lead.id, lead.name),
            },
          })
        } else if (outcomeRand < 0.5) {
          outcome = "callback"
          transcript = `AI: Hello, this is an automated call from WOW Education.\n\nLead: I'm busy right now. Can you call back later?\n\nAI: Of course! When would be a good time to call you back?\n\nLead: Maybe tomorrow evening.\n\nAI: Perfect! We'll call you tomorrow evening. Thank you!`
          aiNotes = "Lead requested callback tomorrow evening. Seems interested but busy."
        } else if (outcomeRand < 0.7) {
          outcome = "not-interested"
          transcript = `AI: Hello, this is an automated call from WOW Education.\n\nLead: I'm not interested in studying abroad right now.\n\nAI: I understand. Thank you for your time!`
          aiNotes = "Lead is not interested in studying abroad at this time."
        } else {
          outcome = "dnd"
          transcript = `AI: Hello, this is an automated call from WOW Education.\n\nLead: Please don't call me again. Remove my number.\n\nAI: I apologize for the inconvenience. We'll remove your number from our list immediately.`
          aiNotes = "Lead requested DND. Number should be removed from future campaigns."
        }
      } else if (rand < 0.8) {
        // 20% no answer
        status = "no-answer"
        aiNotes = "No answer. Phone rang but no one picked up."
      } else {
        // 20% failed/busy
        status = "failed"
        aiNotes = "Call failed. Number might be switched off or out of coverage."
      }

      const completedCall: CallResult = {
        ...newCall,
        status,
        outcome,
        duration,
        transcript,
        aiNotes,
      }

      setCallResults((prev) => [...prev, completedCall])
      setProgress(((i + 1) / mockLeads.length) * 100)
    }

    setIsCallInProgress(false)
    setCurrentCall(null)
    toast.success(`AI Calling Completed! ${interestedLeads} interested leads found.`)
  }

  const handleSyncInterestedLead = (leadId: string, leadName: string) => {
    toast.success(`Assigned ${leadName} to counselor`, {
      description: "Lead has been added to Vinayak's queue",
    })
  }

  const handleSyncAllInterested = () => {
    const interested = callResults.filter((c) => c.outcome === "interested")
    if (interested.length === 0) {
      toast.error("No interested leads to sync")
      return
    }

    toast.success(`Synced ${interested.length} interested leads`, {
      description: "All interested leads have been assigned to counselors",
    })
  }

  const viewTranscript = (call: CallResult) => {
    setSelectedTranscript(call)
    setShowTranscriptDialog(true)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">AI Calling System</h1>
        <p className="text-muted-foreground">Automate lead calling with AI-powered conversations</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Calls</CardTitle>
            <Phone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCalls}</div>
            <p className="text-xs text-muted-foreground">{completedCalls} completed</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{successRate}%</div>
            <p className="text-xs text-muted-foreground">Calls completed successfully</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{conversionRate}%</div>
            <p className="text-xs text-muted-foreground">{interestedLeads} interested leads</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Duration</CardTitle>
            <Timer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgDuration}s</div>
            <p className="text-xs text-muted-foreground">Per completed call</p>
          </CardContent>
        </Card>
      </div>

      {/* Campaign Selection & Controls */}
      <Card>
        <CardHeader>
          <CardTitle>AI Calling Controls</CardTitle>
          <CardDescription>Select a campaign and start automated calling</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Select value={selectedCampaign} onValueChange={setSelectedCampaign} disabled={isCallInProgress}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Campaign" />
                </SelectTrigger>
                <SelectContent>
                  {mockData.campaigns.map((campaign) => (
                    <SelectItem key={campaign.id} value={campaign.id}>
                      {campaign.name} ({campaign.totalLeads} leads)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              {!isCallInProgress ? (
                <Button onClick={simulateAICalling} disabled={!selectedCampaign}>
                  <Play className="mr-2 h-4 w-4" />
                  Start AI Calling
                </Button>
              ) : (
                <>
                  <Button onClick={() => setIsPaused(!isPaused)} variant="outline">
                    {isPaused ? <Play className="mr-2 h-4 w-4" /> : <Pause className="mr-2 h-4 w-4" />}
                    {isPaused ? "Resume" : "Pause"}
                  </Button>
                  <Button
                    onClick={() => {
                      setIsCallInProgress(false)
                      setIsPaused(false)
                      setCurrentCall(null)
                    }}
                    variant="destructive"
                  >
                    <XCircle className="mr-2 h-4 w-4" />
                    Stop
                  </Button>
                </>
              )}
              {callResults.length > 0 && (
                <Button
                  onClick={() => {
                    setCallResults([])
                    setProgress(0)
                  }}
                  variant="outline"
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reset
                </Button>
              )}
            </div>
          </div>

          {/* Progress Bar */}
          {isCallInProgress && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress: {Math.round(progress)}%</span>
                <span>
                  {callResults.length} / {Math.min(50, totalLeadsInCampaign)} calls
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}

          {/* Current Call Status */}
          {currentCall && (
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="animate-pulse">
                    <PhoneCall className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">Calling {currentCall.leadName}</p>
                    <p className="text-sm text-muted-foreground">{currentCall.phone}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {/* Call Results */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Call Results</CardTitle>
              <CardDescription>Detailed results of AI calling campaign</CardDescription>
            </div>
            {interestedLeads > 0 && (
              <Button onClick={handleSyncAllInterested}>
                <UserPlus className="mr-2 h-4 w-4" />
                Sync {interestedLeads} Interested Leads
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">All ({totalCalls})</TabsTrigger>
              <TabsTrigger value="interested">Interested ({interestedLeads})</TabsTrigger>
              <TabsTrigger value="not-interested">Not Interested ({notInterestedLeads})</TabsTrigger>
              <TabsTrigger value="no-answer">No Answer ({noAnswerCalls})</TabsTrigger>
              <TabsTrigger value="dnd">DND ({dndLeads})</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {callResults.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Phone className="h-12 w-12 mx-auto mb-4 opacity-20" />
                  <p>No call results yet. Start AI calling to see results.</p>
                </div>
              ) : (
                <ScrollArea className="h-[400px]">
                  <div className="space-y-2">
                    {callResults.map((call) => (
                      <Card key={call.id}>
                        <CardContent className="pt-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              {call.status === "completed" && <CheckCircle2 className="h-5 w-5 text-green-600" />}
                              {call.status === "calling" && (
                                <PhoneCall className="h-5 w-5 text-blue-600 animate-pulse" />
                              )}
                              {call.status === "no-answer" && <PhoneOff className="h-5 w-5 text-orange-600" />}
                              {call.status === "failed" && <XCircle className="h-5 w-5 text-red-600" />}

                              <div>
                                <p className="font-medium">{call.leadName}</p>
                                <p className="text-sm text-muted-foreground">{call.phone}</p>
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              {call.outcome && (
                                <Badge
                                  variant={
                                    call.outcome === "interested"
                                      ? "default"
                                      : call.outcome === "callback"
                                        ? "secondary"
                                        : call.outcome === "dnd"
                                          ? "destructive"
                                          : "outline"
                                  }
                                >
                                  {call.outcome === "interested" && "Interested"}
                                  {call.outcome === "not-interested" && "Not Interested"}
                                  {call.outcome === "callback" && "Callback"}
                                  {call.outcome === "dnd" && "DND"}
                                </Badge>
                              )}

                              {call.duration && <span className="text-sm text-muted-foreground">{call.duration}s</span>}

                              {call.transcript && (
                                <Button size="sm" variant="outline" onClick={() => viewTranscript(call)}>
                                  <FileText className="mr-2 h-4 w-4" />
                                  View Transcript
                                </Button>
                              )}

                              {call.outcome === "interested" && (
                                <Button size="sm" onClick={() => handleSyncInterestedLead(call.id, call.leadName)}>
                                  <UserPlus className="mr-2 h-4 w-4" />
                                  Assign
                                </Button>
                              )}
                            </div>
                          </div>

                          {call.aiNotes && (
                            <p className="text-sm text-muted-foreground mt-3 pl-8">
                              <strong>AI Notes:</strong> {call.aiNotes}
                            </p>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </TabsContent>

            <TabsContent value="interested">
              <ScrollArea className="h-[400px]">
                <div className="space-y-2">
                  {callResults
                    .filter((c) => c.outcome === "interested")
                    .map((call) => (
                      <Card key={call.id}>
                        <CardContent className="pt-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <CheckCircle2 className="h-5 w-5 text-green-600" />
                              <div>
                                <p className="font-medium">{call.leadName}</p>
                                <p className="text-sm text-muted-foreground">{call.phone}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <Badge>Interested</Badge>
                              <Button size="sm" variant="outline" onClick={() => viewTranscript(call)}>
                                <FileText className="mr-2 h-4 w-4" />
                                View Transcript
                              </Button>
                              <Button size="sm" onClick={() => handleSyncInterestedLead(call.id, call.leadName)}>
                                <UserPlus className="mr-2 h-4 w-4" />
                                Assign
                              </Button>
                            </div>
                          </div>
                          {call.aiNotes && (
                            <p className="text-sm text-muted-foreground mt-3 pl-8">
                              <strong>AI Notes:</strong> {call.aiNotes}
                            </p>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="not-interested">
              <ScrollArea className="h-[400px]">
                <div className="space-y-2">
                  {callResults
                    .filter((c) => c.outcome === "not-interested")
                    .map((call) => (
                      <Card key={call.id}>
                        <CardContent className="pt-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <XCircle className="h-5 w-5 text-gray-600" />
                              <div>
                                <p className="font-medium">{call.leadName}</p>
                                <p className="text-sm text-muted-foreground">{call.phone}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <Badge variant="outline">Not Interested</Badge>
                              {call.transcript && (
                                <Button size="sm" variant="outline" onClick={() => viewTranscript(call)}>
                                  <FileText className="mr-2 h-4 w-4" />
                                  View Transcript
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="no-answer">
              <ScrollArea className="h-[400px]">
                <div className="space-y-2">
                  {callResults
                    .filter((c) => c.status === "no-answer")
                    .map((call) => (
                      <Card key={call.id}>
                        <CardContent className="pt-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <PhoneOff className="h-5 w-5 text-orange-600" />
                              <div>
                                <p className="font-medium">{call.leadName}</p>
                                <p className="text-sm text-muted-foreground">{call.phone}</p>
                              </div>
                            </div>
                            <Badge variant="secondary">No Answer</Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="dnd">
              <ScrollArea className="h-[400px]">
                <div className="space-y-2">
                  {callResults
                    .filter((c) => c.outcome === "dnd")
                    .map((call) => (
                      <Card key={call.id}>
                        <CardContent className="pt-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Ban className="h-5 w-5 text-red-600" />
                              <div>
                                <p className="font-medium">{call.leadName}</p>
                                <p className="text-sm text-muted-foreground">{call.phone}</p>
                              </div>
                            </div>
                            <Badge variant="destructive">DND</Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Transcript Dialog */}
      <Dialog open={showTranscriptDialog} onOpenChange={setShowTranscriptDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Call Transcript - {selectedTranscript?.leadName}</DialogTitle>
            <DialogDescription>
              {selectedTranscript?.phone} • Duration: {selectedTranscript?.duration}s
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[400px] w-full rounded-md border p-4">
            <div className="space-y-4">
              {selectedTranscript?.transcript?.split("\n\n").map((line, index) => (
                <div key={index} className={line.startsWith("AI:") ? "text-blue-600" : "text-gray-900"}>
                  <p className="whitespace-pre-wrap">{line}</p>
                </div>
              ))}
            </div>
          </ScrollArea>
          {selectedTranscript?.aiNotes && (
            <div className="bg-blue-50 p-4 rounded-md">
              <p className="text-sm font-medium mb-1">AI Analysis:</p>
              <p className="text-sm text-muted-foreground">{selectedTranscript.aiNotes}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
