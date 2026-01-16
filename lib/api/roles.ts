/**
 * API Client for Role Management
 */

import { api } from "../api-client"

export interface RoleRequestDto {
  name: string
  displayName: string
  description: string
  isActive: boolean
}

export interface RoleResponseDto {
  id: number
  name: string
  displayName: string
  description: string
  isActive: boolean
  isSystemRole: boolean
  createdAt: string
  updatedAt: string
}

/**
 * Fetch all roles
 */
export async function getAllRoles(): Promise<RoleResponseDto[]> {
  const response = await api.get<RoleResponseDto[]>("/api/roles")
  
  if (!response.success) {
    throw new Error(response.message || "Failed to fetch roles")
  }

  return response.data || []
}

/**
 * Fetch active roles only
 */
export async function getActiveRoles(): Promise<RoleResponseDto[]> {
  const response = await api.get<RoleResponseDto[]>("/api/roles/active")
  
  if (!response.success) {
    throw new Error(response.message || "Failed to fetch active roles")
  }

  return response.data || []
}

/**
 * Fetch a single role by ID
 */
export async function getRoleById(id: number): Promise<RoleResponseDto> {
  const response = await api.get<RoleResponseDto>(`/api/roles/${id}`)

  if (!response.success) {
    throw new Error(response.message || "Failed to fetch role")
  }

  return response.data!
}

/**
 * Fetch a role by name
 */
export async function getRoleByName(name: string): Promise<RoleResponseDto> {
  const response = await api.get<RoleResponseDto>(`/api/roles/name/${name}`)

  if (!response.success) {
    throw new Error(response.message || "Failed to fetch role")
  }

  return response.data!
}

/**
 * Create a new role
 */
export async function createRole(roleData: RoleRequestDto): Promise<RoleResponseDto> {
  const response = await api.post<RoleResponseDto>("/api/roles", roleData)

  if (!response.success) {
    throw new Error(response.message || "Failed to create role")
  }

  return response.data!
}

/**
 * Update an existing role
 */
export async function updateRole(id: number, roleData: RoleRequestDto): Promise<RoleResponseDto> {
  const response = await api.put<RoleResponseDto>(`/api/roles/${id}`, roleData)

  if (!response.success) {
    throw new Error(response.message || "Failed to update role")
  }

  return response.data!
}

/**
 * Delete a role
 */
export async function deleteRole(id: number): Promise<void> {
  const response = await api.delete(`/api/roles/${id}`)

  if (!response.success) {
    throw new Error(response.message || "Failed to delete role")
  }
}

/**
 * Get users by role name
 */
export async function getUsersByRoleName(roleName: string): Promise<any[]> {
  const response = await api.get<any[]>(`/api/users/role/${roleName}`)

  if (!response.success) {
    throw new Error(response.message || "Failed to fetch users")
  }

  return response.data || []
}
