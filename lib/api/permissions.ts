/**
 * API Client for Permission Management
 */

import { api } from "../api-client"

export interface PermissionRequestDto {
  name: string
  displayName: string
  description?: string
  category?: string
  isActive: boolean
}

export interface PermissionResponseDto {
  id: number
  name: string
  displayName: string
  description?: string
  category?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface AssignPermissionsRequestDto {
  userId: number
  permissionIds: number[]
}

export interface UserPermissionsResponseDto {
  userId: number
  username: string
  email: string
  roleName: string
  rolePermissions: PermissionResponseDto[]
  additionalPermissions: PermissionResponseDto[]
  allPermissions: PermissionResponseDto[]
}

/**
 * Fetch all permissions
 */
export async function getAllPermissions(): Promise<PermissionResponseDto[]> {
  const response = await api.get<PermissionResponseDto[]>("/api/permissions")
  
  if (!response.success) {
    throw new Error(response.message || "Failed to fetch permissions")
  }

  return response.data || []
}

/**
 * Fetch active permissions only
 */
export async function getActivePermissions(): Promise<PermissionResponseDto[]> {
  const response = await api.get<PermissionResponseDto[]>("/api/permissions/active")
  
  if (!response.success) {
    throw new Error(response.message || "Failed to fetch active permissions")
  }

  return response.data || []
}

/**
 * Fetch permissions by category
 */
export async function getPermissionsByCategory(category: string): Promise<PermissionResponseDto[]> {
  const response = await api.get<PermissionResponseDto[]>(`/api/permissions/category/${category}`)
  
  if (!response.success) {
    throw new Error(response.message || "Failed to fetch permissions")
  }

  return response.data || []
}

/**
 * Fetch permissions by role ID
 */
export async function getPermissionsByRoleId(roleId: number): Promise<PermissionResponseDto[]> {
  const response = await api.get<PermissionResponseDto[]>(`/api/permissions/role/${roleId}`)
  
  if (!response.success) {
    throw new Error(response.message || "Failed to fetch role permissions")
  }

  return response.data || []
}

/**
 * Fetch a single permission by ID
 */
export async function getPermissionById(id: number): Promise<PermissionResponseDto> {
  const response = await api.get<PermissionResponseDto>(`/api/permissions/${id}`)

  if (!response.success) {
    throw new Error(response.message || "Failed to fetch permission")
  }

  return response.data!
}

/**
 * Create a new permission
 */
export async function createPermission(permissionData: PermissionRequestDto): Promise<PermissionResponseDto> {
  const response = await api.post<PermissionResponseDto>("/api/permissions", permissionData)

  if (!response.success) {
    throw new Error(response.message || "Failed to create permission")
  }

  return response.data!
}

/**
 * Update an existing permission
 */
export async function updatePermission(id: number, permissionData: PermissionRequestDto): Promise<PermissionResponseDto> {
  const response = await api.put<PermissionResponseDto>(`/api/permissions/${id}`, permissionData)

  if (!response.success) {
    throw new Error(response.message || "Failed to update permission")
  }

  return response.data!
}

/**
 * Delete a permission
 */
export async function deletePermission(id: number): Promise<void> {
  const response = await api.delete(`/api/permissions/${id}`)

  if (!response.success) {
    throw new Error(response.message || "Failed to delete permission")
  }
}

/**
 * Get user permissions (role + additional)
 */
export async function getUserPermissions(userId: number): Promise<UserPermissionsResponseDto> {
  const response = await api.get<UserPermissionsResponseDto>(`/api/user-permissions/${userId}`)

  if (!response.success) {
    throw new Error(response.message || "Failed to fetch user permissions")
  }

  return response.data!
}

/**
 * Assign additional permissions to user
 */
export async function assignPermissionsToUser(data: AssignPermissionsRequestDto): Promise<void> {
  const response = await api.post("/api/user-permissions/assign", data)

  if (!response.success) {
    throw new Error(response.message || "Failed to assign permissions")
  }
}

/**
 * Revoke additional permissions from user
 */
export async function revokePermissionsFromUser(userId: number, permissionIds: number[]): Promise<void> {
  const response = await api.delete(`/api/user-permissions/${userId}/revoke`, { 
    body: permissionIds 
  })

  if (!response.success) {
    throw new Error(response.message || "Failed to revoke permissions")
  }
}

/**
 * Assign permissions to role
 */
export async function assignPermissionsToRole(roleId: number, permissionIds: number[]): Promise<void> {
  const response = await api.post(`/api/user-permissions/role/${roleId}/assign`, permissionIds)

  if (!response.success) {
    throw new Error(response.message || "Failed to assign permissions to role")
  }
}

/**
 * Revoke permissions from role
 */
export async function revokePermissionsFromRole(roleId: number, permissionIds: number[]): Promise<void> {
  const response = await api.delete(`/api/user-permissions/role/${roleId}/revoke`, { 
    body: permissionIds 
  })

  if (!response.success) {
    throw new Error(response.message || "Failed to revoke permissions from role")
  }
}
