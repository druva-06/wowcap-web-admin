"use client"

/**
 * Custom React hook for managing lead-related state
 * @module useLeadManagement
 * @description Centralized state management for leads, ownership, access control, and transfer history
 * Security: All state updates follow React best practices with proper setState functions
 */

import { useState } from "react"
import type { Lead, LeadOwnership, LeadAccessControl, LeadTransferHistory } from "../types"

/**
 * Hook for managing all lead-related state
 * @returns {Object} State object containing:
 * - leads: Array of all leads
 * - setLeads: Function to update leads array
 * - selectedLeads: Array of selected lead IDs
 * - setSelectedLeads: Function to update selected leads
 * - leadOwnerships: Map of lead ownership records
 * - setLeadOwnerships: Function to update ownership map
 * - leadAccessControls: Map of access control records
 * - setLeadAccessControls: Function to update access controls
 * - leadTransferHistories: Map of transfer history records
 * - setLeadTransferHistories: Function to update transfer histories
 * @example
 * const { leads, setLeads, selectedLeads } = useLeadManagement()
 */
export function useLeadManagement() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [selectedLeads, setSelectedLeads] = useState<string[]>([])
  const [leadOwnerships, setLeadOwnerships] = useState<Map<string, LeadOwnership>>(new Map())
  const [leadAccessControls, setLeadAccessControls] = useState<Map<string, LeadAccessControl[]>>(new Map())
  const [leadTransferHistories, setLeadTransferHistories] = useState<Map<string, LeadTransferHistory[]>>(new Map())

  return {
    leads,
    setLeads,
    selectedLeads,
    setSelectedLeads,
    leadOwnerships,
    setLeadOwnerships,
    leadAccessControls,
    setLeadAccessControls,
    leadTransferHistories,
    setLeadTransferHistories,
  }
}
