/**
 * API Client for Menu Configuration
 */

import { api } from "../api-client"

export interface MenuItemResponse {
  id: string
  label: string
  icon: string
  href: string
  color?: string
  visible: boolean
  hasSubmenu: boolean
  submenu?: MenuItemResponse[]
  features?: Record<string, boolean>
  requiredPermissions?: string[]
}

export interface MenuConfigResponse {
  menuItems: MenuItemResponse[]
  userRole: string
  dashboardView: string
}

export interface MenuPermissionMapping {
  menuId: string
  submenuId?: string
  permissionNames: string[]
}

export interface MenuPermissionRequest {
  menuId: string
  submenuId?: string
  permissionIds: number[]
}

/**
 * Get menu configuration for current user
 */
export async function getMenuConfig(): Promise<MenuConfigResponse> {
  const response = await api.get<MenuConfigResponse>("/api/menu-config")

  if (!response.success) {
    throw new Error(response.message || "Failed to fetch menu configuration")
  }

  return response.data!
}

/**
 * Get menu configuration for specific user
 */
export async function getMenuConfigForUser(userId: number): Promise<MenuConfigResponse> {
  const response = await api.get<MenuConfigResponse>(`/api/menu-config/${userId}`)

  if (!response.success) {
    throw new Error(response.message || "Failed to fetch menu configuration")
  }

  return response.data!
}

/**
 * Get menu permission mappings (menuId:submenuId -> permissionNames[])
 */
export async function getMenuPermissionMappings(): Promise<Record<string, string[]>> {
  const response = await api.get<Record<string, string[]>>("/api/menu-permissions/mappings")

  if (!response.success) {
    throw new Error(response.message || "Failed to fetch menu permission mappings")
  }

  return response.data!
}

/**
 * Get all menu structure with permissions
 */
export async function getAllMenuStructure(): Promise<MenuPermissionMapping[]> {
  const response = await api.get<MenuPermissionMapping[]>("/api/menu-permissions/structure")

  if (!response.success) {
    throw new Error(response.message || "Failed to fetch menu structure")
  }

  return response.data || []
}

/**
 * Update permissions for a menu/submenu (replaces existing)
 */
export async function updateMenuPermissions(request: MenuPermissionRequest): Promise<void> {
  const response = await api.put("/api/menu-permissions", request)

  if (!response.success) {
    throw new Error(response.message || "Failed to update menu permissions")
  }
}

/**
 * Add permissions to a menu/submenu (keeps existing)
 */
export async function addMenuPermissions(request: MenuPermissionRequest): Promise<void> {
  const response = await api.post("/api/menu-permissions/add", request)

  if (!response.success) {
    throw new Error(response.message || "Failed to add menu permissions")
  }
}

/**
 * Remove specific permission from menu/submenu
 */
export async function removeMenuPermission(
  menuId: string,
  permissionId: number,
  submenuId?: string
): Promise<void> {
  const url = `/api/menu-permissions/${menuId}/${permissionId}${submenuId ? `?submenuId=${submenuId}` : ""}`
  const response = await api.delete(url)

  if (!response.success) {
    throw new Error(response.message || "Failed to remove menu permission")
  }
}

/**
 * Remove all permissions from menu/submenu
 */
export async function removeAllMenuPermissions(menuId: string, submenuId?: string): Promise<void> {
  const url = `/api/menu-permissions/${menuId}${submenuId ? `?submenuId=${submenuId}` : ""}`
  const response = await api.delete(url)

  if (!response.success) {
    throw new Error(response.message || "Failed to remove all menu permissions")
  }
}

