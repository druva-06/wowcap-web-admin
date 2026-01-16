# Role & Permission Management System

## Overview

A comprehensive role-based access control (RBAC) system with dynamic role management and granular permissions. This system provides a beautiful and intuitive UI for managing user roles, permissions, and access levels in the admin portal.

## Features

### 🎯 Role Management

- **Dynamic Roles**: Create, edit, and delete custom roles beyond system defaults
- **System Roles Protection**: Prevent modification/deletion of critical system roles (ADMIN, COUNSELOR, STUDENT, COLLEGE, SUB_AGENT)
- **Active/Inactive Status**: Enable or disable roles without deletion
- **User Count Tracking**: See how many users are assigned to each role
- **Beautiful Card-Based UI**: Modern, responsive design with gradient colors and smooth animations

### 🔐 Permission Management

- **Granular Permissions**: 40+ pre-defined permissions across 10 categories
- **Category Organization**: Permissions grouped by functional areas (Leads, Students, Applications, etc.)
- **Bulk Assignment**: Assign multiple permissions to roles at once
- **Select All by Category**: Quick selection of all permissions in a category
- **Permission Search**: Find permissions quickly with search and filters

### 📊 Permission Categories

1. **Lead Management** - View, create, edit, delete, and assign leads
2. **Student Management** - Manage student profiles and documents
3. **Applications** - Handle application lifecycle and approvals
4. **College Management** - Manage colleges, courses, and programs
5. **Partner Management** - Handle partner relationships and commissions
6. **Marketing** - Create and manage marketing campaigns
7. **Finance** - Invoice generation, expense management, reports
8. **Human Resources** - Leave management, attendance, training
9. **Reports & Analytics** - View, create, and export reports
10. **System Settings** - Configure system settings and manage users

## UI Components

### Role Management Page (`/admin/roles`)

**Features:**

- Grid layout with role cards showing:
  - Role display name and internal name
  - Description
  - Active/Inactive status
  - System role badge
  - User count
  - Quick actions menu
- Statistics dashboard showing:
  - Total roles
  - Active roles
  - Inactive roles
  - System roles
  - Custom roles
- Search and filter functionality
- Create/Edit/Delete dialogs with validation
- Empty state handling

**Actions:**

- Create new role
- Edit existing role
- Toggle active/inactive status
- Delete custom roles (system roles protected)
- Navigate to permission management

### Permission Management Page (`/admin/permissions`)

**Features:**

- Category-based organization with collapsible sections
- Permission cards showing:
  - Display name and internal name
  - Description
  - Category
  - Active status
- Statistics dashboard
- Bulk permission assignment to roles
- Category-level select all/deselect all

**Actions:**

- Create new permission
- Edit existing permission
- Assign permissions to roles
- Toggle permission status
- Search and filter permissions

## API Integration

### Backend Endpoints

**Role Management:**

```typescript
GET / api / v1 / roles; // Get all roles
GET / api / v1 / roles / active; // Get active roles only
GET / api / v1 / roles / { id }; // Get role by ID
GET / api / v1 / roles / name / { name }; // Get role by name
POST / api / v1 / roles; // Create new role
PUT / api / v1 / roles / { id }; // Update role
DELETE / api / v1 / roles / { id }; // Delete role
GET / api / v1 / users / role / { name }; // Get users by role name
```

### API Client Usage

```typescript
import {
  getAllRoles,
  createRole,
  updateRole,
  deleteRole,
  getRoleById,
  getRoleByName,
  getActiveRoles,
  getUsersByRoleName,
} from "@/lib/api/roles";

// Fetch all roles
const roles = await getAllRoles();

// Create a new role
const newRole = await createRole({
  name: "MARKETING_MANAGER",
  displayName: "Marketing Manager",
  description: "Manages marketing campaigns and content",
  isActive: true,
});

// Update a role
const updatedRole = await updateRole(roleId, {
  name: "MARKETING_MANAGER",
  displayName: "Marketing Manager",
  description: "Updated description",
  isActive: true,
});

// Delete a role
await deleteRole(roleId);

// Get users with specific role
const users = await getUsersByRoleName("COUNSELOR");
```

## Data Models

### Role Entity

```typescript
interface Role {
  id: number;
  name: string; // Internal name (e.g., "MARKETING_MANAGER")
  displayName: string; // User-friendly name (e.g., "Marketing Manager")
  description: string; // Role description
  isActive: boolean; // Active/Inactive status
  isSystemRole: boolean; // Protection flag for system roles
  userCount?: number; // Number of users with this role
  createdAt: string; // Creation timestamp
  updatedAt: string; // Last update timestamp
}
```

### Permission Entity

```typescript
interface Permission {
  id: number;
  name: string; // Internal name (e.g., "LEADS_VIEW")
  displayName: string; // User-friendly name (e.g., "View Leads")
  description: string; // Permission description
  category: string; // Category (leads, students, etc.)
  isActive: boolean; // Active/Inactive status
}
```

## Security & Validation

### Role Creation

- **Name Validation**: Must be uppercase with underscores
- **Uniqueness Check**: Role names must be unique
- **Required Fields**: Name, display name, description
- **System Role Protection**: Cannot modify/delete system roles

### Permission Assignment

- **Role Selection Required**: Must select a role before assigning
- **Bulk Operations**: Support for multiple permission assignment
- **Category Grouping**: Organized assignment by functional category

## Edge Cases Handled

1. **Empty States**:

   - No roles exist yet
   - Search returns no results
   - No permissions in category

2. **System Role Protection**:

   - Disable name editing for system roles
   - Prevent deletion of system roles
   - Show warning badges

3. **User Count Validation**:

   - Show warning when deleting role with assigned users
   - Display current user count
   - Suggest reassignment before deletion

4. **Form Validation**:

   - Auto-format role names to uppercase with underscores
   - Trim whitespace
   - Prevent duplicate names
   - Required field validation

5. **Loading States**:

   - Skeleton loaders during data fetch
   - Disabled buttons during API calls
   - Loading indicators on actions

6. **Error Handling**:
   - API error messages displayed via toast notifications
   - Graceful fallback for failed requests
   - User-friendly error messages

## Styling & Design

### Color Scheme

- **Primary**: Blue gradient (#3B82F6 → #6366F1)
- **Success**: Green (#10B981)
- **Warning**: Orange (#F59E0B)
- **Error**: Red (#EF4444)
- **Purple**: System roles (#A855F7)

### Design Patterns

- **Card-Based Layout**: Modern card design with hover effects
- **Gradient Backgrounds**: Subtle blue-purple gradients
- **Shadow Effects**: Elevation on hover for depth
- **Badge Indicators**: Status badges with icons
- **Icon Library**: Lucide React icons throughout
- **Responsive Design**: Mobile-first, adapts to all screen sizes

### Components Used

- shadcn/ui components (Button, Card, Dialog, Badge, etc.)
- Tailwind CSS for styling
- Custom gradient backgrounds
- Smooth transitions and animations

## Navigation

The role management system is accessible from the admin sidebar:

**Location**: Admin Portal → Roles & Permissions

**Icon**: Shield icon

**Access Control**: Admin role required

## Future Enhancements

1. **Permission System Backend Integration**

   - API endpoints for permission CRUD
   - Role-permission mapping table
   - Permission checking middleware

2. **Advanced Features**

   - Role hierarchy/inheritance
   - Time-based permissions
   - Conditional permissions
   - Audit logs for role changes

3. **User Assignment**

   - Bulk user role assignment
   - Role change history
   - User-specific permission overrides

4. **Import/Export**
   - Export roles as JSON/CSV
   - Import role templates
   - Role cloning/duplication

## Testing

To test the UI:

1. Navigate to `/admin/roles`
2. Create a new role with custom name
3. Try to edit a system role (editing restricted)
4. Toggle role active/inactive status
5. Navigate to permissions page
6. Assign permissions to a role
7. Search and filter permissions by category

## Environment Variables

```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1
```

## Dependencies

```json
{
  "@radix-ui/react-dialog": "^1.0.x",
  "@radix-ui/react-dropdown-menu": "^2.0.x",
  "@radix-ui/react-switch": "^1.0.x",
  "@radix-ui/react-tabs": "^1.0.x",
  "lucide-react": "^0.x.x",
  "tailwindcss": "^3.x.x"
}
```

## Support

For issues or questions, please contact the development team or create an issue in the project repository.

---

**Last Updated**: January 2025
**Version**: 1.0.0
