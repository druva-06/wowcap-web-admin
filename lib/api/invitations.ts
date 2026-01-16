/**
 * API Client for Invitation Management
 */

import { api } from "../api-client"

export interface InvitationRequestDto {
  email: string
  roleName: string
  username?: string
  firstName?: string
  lastName?: string
  phoneNumber?: string
  expiryDays?: number
}

export interface InvitationResponseDto {
  id: number
  email: string
  username?: string
  firstName?: string
  lastName?: string
  phoneNumber?: string
  roleName: string
  roleDisplayName: string
  invitationToken: string
  status: "PENDING" | "ACTIVE" | "EXPIRED" | "REVOKED"
  invitedByName: string
  invitedByUserId: number
  invitedAt: string
  expiresAt: string
  activatedAt?: string
  cognitoUserId?: string
  userId?: number
  isExpired: boolean
  canResend: boolean
  canRevoke: boolean
  emailDetails?: {
    recipientEmail: string
    subject: string
    signupLink: string
    sent: boolean
  }
}

export interface PagedInvitationResponseDto {
  invitations: InvitationResponseDto[]
  currentPage: number
  totalPages: number
  totalItems: number
  pageSize: number
  hasNext: boolean
  hasPrevious: boolean
}

export interface ValidationResponseDto {
  valid: boolean
  message: string
  email?: string
  username?: string
  firstName?: string
  lastName?: string
  phoneNumber?: string
  roleName?: string
  invitationToken?: string
  invitationId?: number
}

/**
 * Create a new invitation
 */
export async function createInvitation(
  invitationData: InvitationRequestDto
): Promise<InvitationResponseDto> {
  const response = await api.post<any>("/api/invitation/create", invitationData)

  if (!response.success || !response.data) {
    throw new Error(response.message || "Failed to create invitation")
  }

  return response.data
}

/**
 * Validate an invitation token
 */
export async function validateInvitationToken(
  token: string
): Promise<ValidationResponseDto> {
  const response = await api.get<any>(`/api/invitation/validate?token=${token}`)

  if (!response.success || !response.data) {
    return {
      valid: false,
      message: response.message || "Invalid invitation token"
    }
  }

  return response.data
}

/**
 * Get all invitations with pagination
 */
export async function getAllInvitations(
  page: number = 0,
  size: number = 10,
  search?: string
): Promise<PagedInvitationResponseDto> {
  let url = `/api/invitation/all?page=${page}&size=${size}`
  if (search && search.trim()) {
    url += `&search=${encodeURIComponent(search.trim())}`
  }

  const response = await api.get<any>(url)

  if (!response.success || !response.data) {
    throw new Error(response.message || "Failed to fetch invitations")
  }

  return response.data
}

/**
 * Get invitations by status
 */
export async function getInvitationsByStatus(
  status: "PENDING" | "ACTIVE" | "EXPIRED" | "REVOKED",
  page: number = 0,
  size: number = 10
): Promise<PagedInvitationResponseDto> {
  const response = await api.get<any>(
    `/api/invitation/by-status?status=${status}&page=${page}&size=${size}`
  )

  if (!response.success || !response.data) {
    throw new Error(response.message || "Failed to fetch invitations")
  }

  return response.data
}

/**
 * Get invitation by ID
 */
export async function getInvitationById(
  invitationId: number
): Promise<InvitationResponseDto> {
  const response = await api.get<any>(`/api/invitation/${invitationId}`)

  if (!response.success || !response.data) {
    throw new Error(response.message || "Failed to fetch invitation")
  }

  return response.data
}

/**
 * Resend invitation
 */
export async function resendInvitation(
  invitationId: number
): Promise<InvitationResponseDto> {
  const response = await api.post<any>(`/api/invitation/resend/${invitationId}`, {})

  if (!response.success || !response.data) {
    throw new Error(response.message || "Failed to resend invitation")
  }

  return response.data
}

/**
 * Revoke invitation
 */
export async function revokeInvitation(invitationId: number): Promise<void> {
  const response = await api.delete<void>(`/api/invitation/revoke/${invitationId}`)

  if (!response.success) {
    throw new Error(response.message || "Failed to revoke invitation")
  }
}

/**
 * Cleanup expired invitations
 */
export async function cleanupExpiredInvitations(): Promise<{ expiredCount: number }> {
  const response = await api.post<any>("/api/invitation/cleanup-expired", {})

  if (!response.success || !response.data) {
    throw new Error(response.message || "Failed to cleanup expired invitations")
  }

  return response.data
}
