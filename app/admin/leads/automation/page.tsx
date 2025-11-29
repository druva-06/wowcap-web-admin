"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Plus, Edit, Trash2, Zap, Mail, MessageSquare, Phone, TrendingUp, Clock, Target } from "lucide-react"

export default function LeadNurtureAutomationPage() {
  const router = useRouter()
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [selectedRule, setSelectedRule] = useState<any>(null)

  // Sample automation rules
  const [automationRules, setAutomationRules] = useState([
    {
      id: "1",
      name: "HOT Lead Follow-up",
      description: "Automatically send follow-up email to HOT leads after 2 hours of no response",
      trigger: "Lead Status = HOT",
      condition: "No response for 2 hours",
      action: "Send Email Template: HOT Lead Follow-up",
      enabled: true,
      executionCount: 45,
      successRate: 92,
      lastExecuted: "2024-01-20 10:30 AM",
      createdBy: "Admin",
      createdAt: "2024-01-01",
    },
    {
      id: "2",
      name: "Warm Lead Nurture",
      description: "Send weekly educational content to Warm leads",
      trigger: "Lead Status = Warm",
      condition: "Every 7 days",
      action: "Send Email Template: Weekly Newsletter",
      enabled: true,
      executionCount: 120,
      successRate: 85,
      lastExecuted: "2024-01-19 09:00 AM",
      createdBy: "Admin",
      createdAt: "2024-01-01",
    },
    {
      id: "3",
      name: "Cold Lead Re-engagement",
      description: "Re-engage cold leads with special offers after 30 days",
      trigger: "Lead Status = Cold",
      condition: "No activity for 30 days",
      action: "Send Email Template: Special Offer",
      enabled: false,
      executionCount: 28,
      successRate: 65,
      lastExecuted: "2024-01-15 02:00 PM",
      createdBy: "Admin",
      createdAt: "2024-01-01",
    },
    {
      id: "4",
      name: "New Lead Welcome",
      description: "Send welcome email immediately when new lead is created",
      trigger: "New Lead Created",
      condition: "Immediately",
      action: "Send Email Template: Welcome Email",
      enabled: true,
      executionCount: 230,
      successRate: 98,
      lastExecuted: "2024-01-20 11:45 AM",
      createdBy: "Admin",
      createdAt: "2024-01-01",
    },
    {
      id: "5",
      name: "Appointment Reminder",
      description: "Send SMS reminder 1 day before scheduled appointment",
      trigger: "Appointment Scheduled",
      condition: "1 day before appointment",
      action: "Send SMS: Appointment Reminder",
      enabled: true,
      executionCount: 78,
      successRate: 95,
      lastExecuted: "2024-01-19 08:00 AM",
      createdBy: "Admin",
      createdAt: "2024-01-01",
    },
    {
      id: "6",
      name: "Missed Call Follow-up",
      description: "Send SMS when lead's call is missed",
      trigger: "Missed Call",
      condition: "Immediately",
      action: "Send SMS: Missed Call Follow-up",
      enabled: true,
      executionCount: 56,
      successRate: 88,
      lastExecuted: "2024-01-20 03:15 PM",
      createdBy: "Admin",
      createdAt: "2024-01-01",
    },
    {
      id: "7",
      name: "Document Upload Reminder",
      description: "Remind leads to upload pending documents after 3 days",
      trigger: "Documents Pending",
      condition: "3 days after request",
      action: "Send Email Template: Document Reminder",
      enabled: true,
      executionCount: 34,
      successRate: 75,
      lastExecuted: "2024-01-18 10:00 AM",
      createdBy: "Admin",
      createdAt: "2024-01-01",
    },
    {
      id: "8",
      name: "Birthday Wishes",
      description: "Send birthday wishes to leads on their birthday",
      trigger: "Lead Birthday",
      condition: "On birthday",
      action: "Send Email Template: Birthday Wishes",
      enabled: true,
      executionCount: 12,
      successRate: 100,
      lastExecuted: "2024-01-16 09:00 AM",
      createdBy: "Admin",
      createdAt: "2024-01-01",
    },
    {
      id: "9",
      name: "Inactive Lead Alert",
      description: "Alert counselor when lead is inactive for 14 days",
      trigger: "No Activity",
      condition: "14 days of inactivity",
      action: "Send Alert to Counselor",
      enabled: true,
      executionCount: 42,
      successRate: 90,
      lastExecuted: "2024-01-17 11:00 AM",
      createdBy: "Admin",
      createdAt: "2024-01-01",
    },
    {
      id: "10",
      name: "Application Deadline Reminder",
      description: "Remind leads about upcoming application deadlines",
      trigger: "Application Deadline",
      condition: "7 days before deadline",
      action: "Send Email Template: Deadline Reminder",
      enabled: true,
      executionCount: 67,
      successRate: 93,
      lastExecuted: "2024-01-19 02:30 PM",
      createdBy: "Admin",
      createdAt: "2024-01-01",
    },
  ])

  const toggleRule = (ruleId: string) => {
    setAutomationRules((prev) => prev.map((rule) => (rule.id === ruleId ? { ...rule, enabled: !rule.enabled } : rule)))
  }

  const handleEdit = (rule: any) => {
    setSelectedRule(rule)
    setEditDialogOpen(true)
  }

  const handleDelete = (ruleId: string) => {
    if (confirm("Are you sure you want to delete this automation rule?")) {
      setAutomationRules((prev) => prev.filter((rule) => rule.id !== ruleId))
    }
  }

  const getActionIcon = (action: string) => {
    if (action.includes("Email")) return <Mail className="w-4 h-4" />
    if (action.includes("SMS")) return <MessageSquare className="w-4 h-4" />
    if (action.includes("Call")) return <Phone className="w-4 h-4" />
    if (action.includes("Alert")) return <Zap className="w-4 h-4" />
    return <Target className="w-4 h-4" />
  }

  const getActionColor = (action: string) => {
    if (action.includes("Email")) return "bg-blue-100 text-blue-700"
    if (action.includes("SMS")) return "bg-green-100 text-green-700"
    if (action.includes("Call")) return "bg-purple-100 text-purple-700"
    if (action.includes("Alert")) return "bg-orange-100 text-orange-700"
    return "bg-gray-100 text-gray-700"
  }

  const totalExecutions = automationRules.reduce((acc, rule) => acc + rule.executionCount, 0)
  const avgSuccessRate = automationRules.reduce((acc, rule) => acc + rule.successRate, 0) / automationRules.length
  const activeRules = automationRules.filter((rule) => rule.enabled).length

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
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Lead Nurture Automation</h1>
            <p className="text-sm text-gray-600 mt-1">Create and manage automated workflows for lead nurturing</p>
          </div>
        </div>
        <Button onClick={() => setCreateDialogOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
          <Plus className="w-4 h-4" />
          Create Rule
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 mb-1">Total Rules</p>
                <p className="text-2xl font-bold text-blue-600">{automationRules.length}</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 mb-1">Active Rules</p>
                <p className="text-2xl font-bold text-green-600">{activeRules}</p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 mb-1">Total Executions</p>
                <p className="text-2xl font-bold text-purple-600">{totalExecutions}</p>
              </div>
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 mb-1">Avg Success Rate</p>
                <p className="text-2xl font-bold text-orange-600">{Math.round(avgSuccessRate)}%</p>
              </div>
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Automation Rules List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Automation Rules</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {automationRules.map((rule) => (
            <div key={rule.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-gray-900">{rule.name}</h3>
                    <Badge className={rule.enabled ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}>
                      {rule.enabled ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{rule.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                    <div className="flex items-start gap-2">
                      <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Zap className="w-3 h-3 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Trigger</p>
                        <p className="text-sm font-medium text-gray-900">{rule.trigger}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-6 h-6 bg-purple-100 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Clock className="w-3 h-3 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Condition</p>
                        <p className="text-sm font-medium text-gray-900">{rule.condition}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div
                        className={`w-6 h-6 rounded flex items-center justify-center flex-shrink-0 mt-0.5 ${getActionColor(rule.action)}`}
                      >
                        {getActionIcon(rule.action)}
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Action</p>
                        <p className="text-sm font-medium text-gray-900">{rule.action}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-xs text-gray-500">
                    <span>Executed: {rule.executionCount} times</span>
                    <span>Success Rate: {rule.successRate}%</span>
                    <span>Last Executed: {rule.lastExecuted}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-4">
                  <Switch checked={rule.enabled} onCheckedChange={() => toggleRule(rule.id)} />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-blue-600"
                    onClick={() => handleEdit(rule)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-red-600"
                    onClick={() => handleDelete(rule.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Create Rule Dialog */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create Automation Rule</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Rule Name</Label>
              <Input placeholder="e.g., HOT Lead Follow-up" />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea placeholder="Describe what this rule does..." rows={3} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Trigger</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select trigger" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new_lead">New Lead Created</SelectItem>
                    <SelectItem value="status_change">Lead Status Changed</SelectItem>
                    <SelectItem value="no_activity">No Activity</SelectItem>
                    <SelectItem value="appointment">Appointment Scheduled</SelectItem>
                    <SelectItem value="missed_call">Missed Call</SelectItem>
                    <SelectItem value="document_pending">Documents Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Condition</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediately">Immediately</SelectItem>
                    <SelectItem value="1hour">After 1 hour</SelectItem>
                    <SelectItem value="2hours">After 2 hours</SelectItem>
                    <SelectItem value="1day">After 1 day</SelectItem>
                    <SelectItem value="7days">After 7 days</SelectItem>
                    <SelectItem value="30days">After 30 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Action</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select action" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="send_email">Send Email</SelectItem>
                  <SelectItem value="send_sms">Send SMS</SelectItem>
                  <SelectItem value="send_whatsapp">Send WhatsApp Message</SelectItem>
                  <SelectItem value="assign_counselor">Assign to Counselor</SelectItem>
                  <SelectItem value="update_status">Update Lead Status</SelectItem>
                  <SelectItem value="create_task">Create Task</SelectItem>
                  <SelectItem value="send_alert">Send Alert</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Switch id="enable-rule" defaultChecked />
              <Label htmlFor="enable-rule">Enable this rule immediately</Label>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
                <Plus className="w-4 h-4" />
                Create Rule
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Rule Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Automation Rule</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Rule Name</Label>
              <Input placeholder="e.g., HOT Lead Follow-up" defaultValue={selectedRule?.name} />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                placeholder="Describe what this rule does..."
                rows={3}
                defaultValue={selectedRule?.description}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Trigger</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select trigger" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new_lead">New Lead Created</SelectItem>
                    <SelectItem value="status_change">Lead Status Changed</SelectItem>
                    <SelectItem value="no_activity">No Activity</SelectItem>
                    <SelectItem value="appointment">Appointment Scheduled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Condition</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediately">Immediately</SelectItem>
                    <SelectItem value="1hour">After 1 hour</SelectItem>
                    <SelectItem value="2hours">After 2 hours</SelectItem>
                    <SelectItem value="1day">After 1 day</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Action</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select action" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="send_email">Send Email</SelectItem>
                  <SelectItem value="send_sms">Send SMS</SelectItem>
                  <SelectItem value="send_whatsapp">Send WhatsApp Message</SelectItem>
                  <SelectItem value="assign_counselor">Assign to Counselor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
                <Edit className="w-4 h-4" />
                Update Rule
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
