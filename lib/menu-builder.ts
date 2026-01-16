/**
 * Menu Builder Utility
 * Filters menu items based on user permissions and role
 */

import { MENU_CONFIG, type MenuItem, type SubMenuItem } from "./permissions-config"

export interface FilteredMenuItem extends MenuItem {
  submenu?: SubMenuItem[]
}

/**
 * Build menu for user based on their permissions and role
 * @param permissions Set of permission names the user has
 * @param role User's role (for role-specific configurations)
 * @returns Filtered array of menu items
 */
export function buildMenuForUser(permissions: Set<string>, role: string): FilteredMenuItem[] {
  const normalizedRole = role?.toUpperCase()
  const isAdmin = normalizedRole === "ADMIN" || normalizedRole === "SUPER_ADMIN"

  // Admins see everything
  if (isAdmin) {
    return MENU_CONFIG.map(item => ({
      ...item,
      submenu: item.submenu || [],
    }))
  }

  const filteredMenu: FilteredMenuItem[] = []

  for (const menuItem of MENU_CONFIG) {
    // Check if user has required permissions for this menu item
    const hasAccess = hasAnyPermission(menuItem.permissions, permissions)

    if (hasAccess) {
      // Filter submenu items if present
      let filteredSubmenu: SubMenuItem[] | undefined = undefined

      if (menuItem.submenu && menuItem.submenu.length > 0) {
        filteredSubmenu = menuItem.submenu.filter(subItem =>
          hasAnyPermission(subItem.permissions, permissions)
        )
      }

      // Apply role-specific configurations
      let customizedMenuItem = { ...menuItem }
      if (menuItem.roleSpecific && menuItem.roleSpecific[normalizedRole]) {
        const roleConfig = menuItem.roleSpecific[normalizedRole]
        customizedMenuItem = {
          ...customizedMenuItem,
          href: roleConfig.href || customizedMenuItem.href,
          label: roleConfig.label || customizedMenuItem.label,
        }
      }

      filteredMenu.push({
        ...customizedMenuItem,
        submenu: filteredSubmenu,
      })
    }
  }

  return filteredMenu
}

/**
 * Check if user has any of the required permissions
 * @param requiredPermissions Array of permissions (OR logic)
 * @param userPermissions Set of user's permissions
 * @returns true if user has at least one of the required permissions
 */
function hasAnyPermission(requiredPermissions: string[], userPermissions: Set<string>): boolean {
  // If no permissions required, allow access
  if (!requiredPermissions || requiredPermissions.length === 0) {
    return true
  }

  // Check if user has any of the required permissions
  return requiredPermissions.some(permission => userPermissions.has(permission))
}

/**
 * Get role-specific view name for dashboard
 * @param role User's role
 * @returns View name to render
 */
export function getDashboardView(role: string): string {
  const normalizedRole = role?.toUpperCase()

  switch (normalizedRole) {
    case "ADMIN":
    case "SUPER_ADMIN":
      return "admin"
    case "COLLEGE":
      return "college"
    case "COUNSELOR":
    case "COUNSELLOR":
      return "counselor"
    case "SUB_AGENT":
    case "SUBAGENT":
      return "subagent"
    case "STUDENT":
      return "student"
    default:
      return "admin"
  }
}

/**
 * Check if user should see a specific feature
 * @param featureName Feature identifier from FEATURE_PERMISSIONS
 * @param userPermissions User's permission set
 * @returns true if user can access the feature
 */
export function canAccessFeature(
  requiredPermissions: string[],
  userPermissions: Set<string>
): boolean {
  return hasAnyPermission(requiredPermissions, userPermissions)
}
