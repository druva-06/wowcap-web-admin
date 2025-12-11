/**
 * Utility functions for Lead Management System
 * @module LeadUtils
 * @description Pure utility functions for lead status, scoring, and UI rendering
 * Security: All functions are pure and do not modify external state
 */

/**
 * Determines the color class for a given lead status
 * @function getStatusColor
 * @param {string} status - The status of the lead
 * @returns {string} Tailwind CSS color class
 * @example
 * getStatusColor("HOT") // returns "bg-red-100 text-red-700 border-red-300"
 */
export function getStatusColor(status: string): string {
  switch (status) {
    case "HOT":
      return "bg-red-100 text-red-700 border-red-300"
    case "IMMEDIATE_HOT":
      return "bg-orange-100 text-orange-700 border-orange-300"
    case "WARM":
      return "bg-yellow-100 text-yellow-700 border-yellow-300"
    case "COLD":
      return "bg-blue-100 text-blue-700 border-blue-300"
    case "FEATURE_LEAD":
      return "bg-purple-100 text-purple-700 border-purple-300"
    case "CONTACTED":
      return "bg-green-100 text-green-700 border-green-200"
    // Legacy statuses for backward compatibility
    case "Immediate Hot":
      return "bg-orange-100 text-orange-700 border-orange-300"
    case "Warm":
      return "bg-yellow-100 text-yellow-700 border-yellow-300"
    case "Cold":
      return "bg-blue-100 text-blue-700 border-blue-300"
    case "Future Lead":
      return "bg-purple-100 text-purple-700 border-purple-300"
    case "New":
      return "bg-cyan-100 text-cyan-700 border-cyan-200"
    case "Contacted":
      return "bg-green-100 text-green-700 border-green-200"
    case "Qualified":
      return "bg-emerald-100 text-emerald-700 border-emerald-200"
    case "Converted":
      return "bg-green-100 text-green-700 border-green-200"
    case "Lost":
      return "bg-gray-100 text-gray-700 border-gray-200"
    // Call status colors
    case "Active":
      return "bg-green-600 text-white"
    case "Completed":
      return "bg-gray-600 text-white"
    case "In Progress":
      return "bg-blue-600 text-white"
    case "Connected":
      return "bg-green-600 text-white"
    case "Not Connected":
      return "bg-red-600 text-white"
    case "Interested":
      return "bg-green-100 text-green-700"
    case "Not Interested":
      return "bg-red-100 text-red-700"
    case "Callback":
      return "bg-orange-100 text-orange-700"
    case "DND":
      return "bg-gray-100 text-gray-700"
    default:
      return "bg-gray-100 text-gray-700 border-gray-200"
  }
}

/**
 * Determines the color class based on lead score
 * @function getScoreColor
 * @param {number} score - The lead score (0-100)
 * @returns {string} Tailwind CSS text color class
 * @example
 * getScoreColor(95) // returns "text-green-600"
 */
export function getScoreColor(score: number): string {
  if (score >= 90) return "text-green-600"
  if (score >= 80) return "text-cyan-600"
  if (score >= 70) return "text-yellow-600"
  return "text-orange-600"
}

/**
 * Calculates a comprehensive lead score based on multiple factors
 * @function calculateLeadScore
 * @param {any} lead - The lead object containing all lead data
 * @returns {number} Calculated score between 0 and 100
 * @description Scoring factors include:
 * - Status (HOT: +30, Immediate Hot: +25, Warm: +15, Cold: +5)
 * - Budget range (higher budget = higher score)
 * - Timeline (September intake: +10)
 * - Engagement (email/phone: +5 each)
 * - Recent activity (last 7 days: +10)
 */
export function calculateLeadScore(lead: any): number {
  let score = 50 // Base score

  // Engagement level
  score += lead.engagementLevel * 0.3

  // Emails/SMS interaction
  score += (lead.emailsSent || 0) * 2
  score += (lead.smsSent || 0) * 3

  // Urgency
  if (lead.urgency === "high") score += 15
  else if (lead.urgency === "medium") score += 10
  else score += 5

  // Timeline
  if (lead.timeline === "Immediate") score += 10
  else if (lead.timeline === "1-2 weeks") score += 7
  else score += 3

  return Math.min(Math.round(score), 100)
}

/**
 * Returns an emoji icon for a given lead status
 * @function getLeadStatusIcon
 * @param {string} status - The status of the lead
 * @returns {string} Emoji icon representing the status
 * @example
 * getLeadStatusIcon("HOT") // returns "🔥"
 */
export function getLeadStatusIcon(status: string) {
  const icons = {
    HOT: "🔥",
    Warm: "☀️",
    Cold: "❄️",
    Converted: "✅",
    Closed: "❌"
  }
  return icons[status as keyof typeof icons] || "☀️"
}
