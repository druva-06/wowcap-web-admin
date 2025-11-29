// Mock API utilities for CRUD operations
import {
  type Campaign,
  type LeadAllocation,
  type CallLog,
  type Appointment,
  type AICallResult,
  type Notification,
  type DuplicateLead,
  mockCampaigns,
  mockAllocations,
  mockCallLogs,
  mockAppointments,
  mockAICallResults,
  mockNotifications,
  mockDuplicateLeads,
} from "./mock-data"

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Campaign APIs
export const campaignAPI = {
  getAll: async (): Promise<Campaign[]> => {
    await delay(500)
    return [...mockCampaigns]
  },

  getById: async (id: string): Promise<Campaign | null> => {
    await delay(300)
    return mockCampaigns.find((c) => c.id === id) || null
  },

  create: async (campaign: Omit<Campaign, "id">): Promise<Campaign> => {
    await delay(500)
    const newCampaign: Campaign = {
      ...campaign,
      id: `C${String(mockCampaigns.length + 1).padStart(3, "0")}`,
    }
    mockCampaigns.push(newCampaign)
    return newCampaign
  },

  update: async (id: string, updates: Partial<Campaign>): Promise<Campaign | null> => {
    await delay(500)
    const index = mockCampaigns.findIndex((c) => c.id === id)
    if (index === -1) return null

    mockCampaigns[index] = { ...mockCampaigns[index], ...updates }
    return mockCampaigns[index]
  },

  delete: async (id: string): Promise<boolean> => {
    await delay(500)
    const index = mockCampaigns.findIndex((c) => c.id === id)
    if (index === -1) return false

    mockCampaigns.splice(index, 1)
    return true
  },
}

// Lead Allocation APIs
export const allocationAPI = {
  getAll: async (): Promise<LeadAllocation[]> => {
    await delay(500)
    return [...mockAllocations]
  },

  getByCampaign: async (campaignId: string): Promise<LeadAllocation[]> => {
    await delay(300)
    return mockAllocations.filter((a) => a.campaignId === campaignId)
  },

  getByCounselor: async (counselorId: string): Promise<LeadAllocation[]> => {
    await delay(300)
    return mockAllocations.filter((a) => a.counselorId === counselorId)
  },

  create: async (allocation: Omit<LeadAllocation, "id">): Promise<LeadAllocation> => {
    await delay(500)
    const newAllocation: LeadAllocation = {
      ...allocation,
      id: `A${String(mockAllocations.length + 1).padStart(3, "0")}`,
    }
    mockAllocations.push(newAllocation)
    return newAllocation
  },

  update: async (id: string, updates: Partial<LeadAllocation>): Promise<LeadAllocation | null> => {
    await delay(500)
    const index = mockAllocations.findIndex((a) => a.id === id)
    if (index === -1) return null

    mockAllocations[index] = { ...mockAllocations[index], ...updates }
    return mockAllocations[index]
  },
}

// Call Log APIs
export const callLogAPI = {
  getAll: async (): Promise<CallLog[]> => {
    await delay(500)
    return [...mockCallLogs]
  },

  getByLead: async (leadId: string): Promise<CallLog[]> => {
    await delay(300)
    return mockCallLogs.filter((c) => c.leadId === leadId)
  },

  getByCounselor: async (counselorId: string): Promise<CallLog[]> => {
    await delay(300)
    return mockCallLogs.filter((c) => c.counselorId === counselorId)
  },

  create: async (callLog: Omit<CallLog, "id">): Promise<CallLog> => {
    await delay(500)
    const newCallLog: CallLog = {
      ...callLog,
      id: `CL${String(mockCallLogs.length + 1).padStart(3, "0")}`,
    }
    mockCallLogs.push(newCallLog)
    return newCallLog
  },
}

// Appointment APIs
export const appointmentAPI = {
  getAll: async (): Promise<Appointment[]> => {
    await delay(500)
    return [...mockAppointments]
  },

  getByLead: async (leadId: string): Promise<Appointment[]> => {
    await delay(300)
    return mockAppointments.filter((a) => a.leadId === leadId)
  },

  getByCounselor: async (counselorId: string): Promise<Appointment[]> => {
    await delay(300)
    return mockAppointments.filter((a) => a.counselorId === counselorId)
  },

  create: async (appointment: Omit<Appointment, "id">): Promise<Appointment> => {
    await delay(500)
    const newAppointment: Appointment = {
      ...appointment,
      id: `AP${String(mockAppointments.length + 1).padStart(3, "0")}`,
    }
    mockAppointments.push(newAppointment)
    return newAppointment
  },

  update: async (id: string, updates: Partial<Appointment>): Promise<Appointment | null> => {
    await delay(500)
    const index = mockAppointments.findIndex((a) => a.id === id)
    if (index === -1) return null

    mockAppointments[index] = { ...mockAppointments[index], ...updates }
    return mockAppointments[index]
  },

  cancel: async (id: string): Promise<boolean> => {
    await delay(500)
    const index = mockAppointments.findIndex((a) => a.id === id)
    if (index === -1) return false

    mockAppointments[index].status = "cancelled"
    return true
  },
}

// AI Call Result APIs
export const aiCallAPI = {
  getAll: async (): Promise<AICallResult[]> => {
    await delay(500)
    return [...mockAICallResults]
  },

  getByCampaign: async (campaignId: string): Promise<AICallResult[]> => {
    await delay(300)
    return mockAICallResults.filter((a) => a.campaignId === campaignId)
  },

  create: async (result: Omit<AICallResult, "id">): Promise<AICallResult> => {
    await delay(500)
    const newResult: AICallResult = {
      ...result,
      id: `AI${String(mockAICallResults.length + 1).padStart(3, "0")}`,
    }
    mockAICallResults.push(newResult)
    return newResult
  },
}

// Notification APIs
export const notificationAPI = {
  getByUser: async (userId: string): Promise<Notification[]> => {
    await delay(300)
    return mockNotifications.filter((n) => n.userId === userId)
  },

  markAsRead: async (id: string): Promise<boolean> => {
    await delay(300)
    const notification = mockNotifications.find((n) => n.id === id)
    if (!notification) return false

    notification.read = true
    return true
  },

  create: async (notification: Omit<Notification, "id">): Promise<Notification> => {
    await delay(300)
    const newNotification: Notification = {
      ...notification,
      id: `N${String(mockNotifications.length + 1).padStart(3, "0")}`,
    }
    mockNotifications.push(newNotification)
    return newNotification
  },
}

// Duplicate Lead APIs
export const duplicateLeadAPI = {
  getAll: async (): Promise<DuplicateLead[]> => {
    await delay(500)
    return [...mockDuplicateLeads]
  },

  getByCampaign: async (campaignId: string): Promise<DuplicateLead[]> => {
    await delay(300)
    return mockDuplicateLeads.filter((d) => d.campaignId === campaignId)
  },

  resolve: async (id: string, action: "merged" | "kept-separate"): Promise<boolean> => {
    await delay(500)
    const duplicate = mockDuplicateLeads.find((d) => d.id === id)
    if (!duplicate) return false

    duplicate.status = action
    return true
  },
}

// CSV Processing Utility
export interface CSVLead {
  name: string
  phone: string
  email: string
  source?: string
  notes?: string
}

export const processCSV = async (
  file: File,
): Promise<{
  leads: CSVLead[]
  duplicates: CSVLead[]
  errors: string[]
}> => {
  await delay(1000) // Simulate processing time

  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      try {
        const text = e.target?.result as string
        const lines = text.split("\n").filter((line) => line.trim())

        if (lines.length === 0) {
          reject(new Error("Empty file"))
          return
        }

        // Parse CSV
        const headers = lines[0].split(",").map((h) => h.trim().toLowerCase())
        const leads: CSVLead[] = []
        const duplicates: CSVLead[] = []
        const errors: string[] = []
        const phoneSet = new Set<string>()

        for (let i = 1; i < lines.length; i++) {
          const values = lines[i].split(",").map((v) => v.trim())

          if (values.length !== headers.length) {
            errors.push(`Line ${i + 1}: Invalid number of columns`)
            continue
          }

          const lead: CSVLead = {
            name: values[headers.indexOf("name")] || "",
            phone: values[headers.indexOf("phone")] || "",
            email: values[headers.indexOf("email")] || "",
            source: values[headers.indexOf("source")] || "",
            notes: values[headers.indexOf("notes")] || "",
          }

          // Validate required fields
          if (!lead.name || !lead.phone) {
            errors.push(`Line ${i + 1}: Missing required fields (name or phone)`)
            continue
          }

          // Check for duplicates
          if (phoneSet.has(lead.phone)) {
            duplicates.push(lead)
          } else {
            phoneSet.add(lead.phone)
            leads.push(lead)
          }
        }

        resolve({ leads, duplicates, errors })
      } catch (error) {
        reject(error)
      }
    }

    reader.onerror = () => reject(new Error("Failed to read file"))
    reader.readAsText(file)
  })
}

export const apiUtils = {
  // Campaign operations
  createCampaign: async (data: { name: string; source: string; totalLeads: number; qrCode: string }) => {
    const campaign = await campaignAPI.create({
      name: data.name,
      source: data.source,
      sourceId: `S${Date.now()}`,
      totalLeads: data.totalLeads,
      assignedLeads: 0,
      unassignedLeads: data.totalLeads,
      duplicateLeads: 0,
      createdBy: "Current User",
      createdDate: new Date().toISOString().split("T")[0],
      status: "active",
    })
    return campaign
  },

  // Lead allocation
  allocateLeads: async (data: { campaignId: string; counselorName: string; count: number }) => {
    const allocation = await allocationAPI.create({
      campaignId: data.campaignId,
      campaignName: data.campaignId,
      counselorId: `C${Date.now()}`,
      counselorName: data.counselorName,
      leadsAllocated: data.count,
      leadsContacted: 0,
      leadsConverted: 0,
      allocatedDate: new Date().toISOString().split("T")[0],
      status: "pending",
    })
    return allocation
  },

  // Lead status update
  updateLeadStatus: async (leadId: string, status: string, remarks: string) => {
    await delay(500)
    return { leadId, status, remarks, updatedAt: new Date().toISOString() }
  },

  // Create notification
  createNotification: async (data: {
    leadId: string
    type: string
    message: string
    scheduledFor: string
    notes: string
  }) => {
    const notification = await notificationAPI.create({
      userId: "U002",
      type: data.type as any,
      title: "Reminder Set",
      message: data.message,
      date: new Date().toISOString().split("T")[0],
      time: new Date().toLocaleTimeString(),
      read: false,
    })
    return notification
  },

  // Create appointment
  createAppointment: async (data: { leadId: string; date: string; time: string; type: string }) => {
    const appointment = await appointmentAPI.create({
      leadId: data.leadId,
      leadName: "Lead Name",
      counselorId: "U002",
      counselorName: "Current Counselor",
      type: data.type as any,
      date: data.date,
      time: data.time,
      duration: "30 minutes",
      status: "scheduled",
    })
    return appointment
  },

  // Process CSV file
  processCSV: async (file: File) => {
    const result = await processCSV(file)
    return {
      validLeads: result.leads,
      duplicates: result.duplicates,
      errors: result.errors,
    }
  },
}
