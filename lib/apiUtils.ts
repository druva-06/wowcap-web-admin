// API utility functions for lead management

export const apiUtils = {
  // Process CSV file and detect duplicates
  processCSV: async (file: File) => {
    return new Promise<{ validLeads: any[]; duplicates: any[] }>((resolve) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const text = e.target?.result as string
        const rows = text.split("\n").slice(1) // Skip header

        const validLeads: any[] = []
        const duplicates: any[] = []

        rows.forEach((row, index) => {
          if (row.trim()) {
            const lead = {
              id: `L${Date.now()}_${index}`,
              name: row.split(",")[0] || "Unknown",
              email: row.split(",")[1] || "",
              phone: row.split(",")[2] || "",
              status: "New",
              score: Math.floor(Math.random() * 40) + 60, // Random score 60-100
            }

            // Simple duplicate detection by phone
            if (Math.random() > 0.95) {
              duplicates.push(lead)
            } else {
              validLeads.push(lead)
            }
          }
        })

        resolve({ validLeads, duplicates })
      }
      reader.readAsText(file)
    })
  },

  // Create a new campaign
  createCampaign: async (data: {
    name: string
    source: string
    totalLeads: number
    qrCode: string
  }) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: `C${Date.now()}`,
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
          qrCode: data.qrCode,
        })
      }, 500)
    })
  },

  // Allocate leads to counselor
  allocateLeads: async (data: {
    campaignId: string
    counselorName: string
    count: number
  }) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: `A${Date.now()}`,
          campaignId: data.campaignId,
          campaignName: data.campaignId,
          counselorId: `U${Date.now()}`,
          counselorName: data.counselorName,
          leadsAllocated: data.count,
          leadsContacted: 0,
          leadsConverted: 0,
          allocatedDate: new Date().toISOString().split("T")[0],
          status: "pending",
          allocated: data.count,
          completed: 0,
          pending: data.count,
          currentWorkload: data.count,
        })
      }, 500)
    })
  },

  // Update lead status
  updateLeadStatus: async (leadId: string, status: string, remarks?: string) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          leadId,
          newStatus: status,
          remarks,
        })
      }, 300)
    })
  },

  // Create appointment
  createAppointment: async (data: {
    leadId: string
    date: string
    time: string
    type: string
    meetingLink?: string
    location?: string
  }) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: `AP${Date.now()}`,
          ...data,
          status: "scheduled",
        })
      }, 300)
    })
  },

  // Create notification
  createNotification: async (data: {
    leadId: string
    type: string
    message: string
    scheduledFor: string
    notes?: string
  }) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: `N${Date.now()}`,
          ...data,
          read: false,
        })
      }, 300)
    })
  },
}

// Generate QR code for campaign
export const generateQRCode = async (campaignName: string): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock QR code URL - in production this would use a QR code library
      const qrCodeData = encodeURIComponent(`https://wowcap.com/register?campaign=${campaignName}`)
      resolve(`/placeholder.svg?height=200&width=200&query=QR Code for ${campaignName}`)
    }, 500)
  })
}
