"use client"

import { useState, useEffect } from 'react'
import Link from "next/link"
import {
    Shield,
    Plus,
    Edit2,
    Trash2,
    Search,
    Users,
    Key,
    Check,
    X,
    MoreVertical,
    UserCog,
    AlertCircle,
    CheckCircle2,
    Lock,
    Unlock
} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { toast } from "@/hooks/use-toast"
import { useAuth } from "@/lib/auth-context"
import { getAllRoles, createRole, updateRole, deleteRole, RoleResponseDto, RoleRequestDto } from "@/lib/api/roles"
import { 
    getAllPermissions, 
    getPermissionsByRoleId, 
    assignPermissionsToRole, 
    revokePermissionsFromRole,
    PermissionResponseDto 
} from "@/lib/api/permissions"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Role {
    id: number
    name: string
    displayName: string
    description: string
    isActive: boolean
    isSystemRole: boolean
    userCount?: number
    createdAt: string
    updatedAt: string
}

const categoryColors: Record<string, string> = {
    LEADS: "bg-blue-500",
    USERS: "bg-purple-500",
    STUDENTS: "bg-green-500",
    APPLICATIONS: "bg-orange-500",
    COLLEGES: "bg-pink-500",
    COURSES: "bg-indigo-500",
    REPORTS: "bg-yellow-500",
    COMMUNICATION: "bg-cyan-500",
    DOCUMENTS: "bg-teal-500",
    SETTINGS: "bg-gray-500",
    ROLES: "bg-red-500",
    PERMISSIONS: "bg-violet-500"
}

export default function RolesManagementPage() {
    const { user } = useAuth()
    const [roles, setRoles] = useState<Role[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")
    const [filterStatus, setFilterStatus] = useState("all") // all, active, inactive
    const [addRoleOpen, setAddRoleOpen] = useState(false)
    const [editRoleOpen, setEditRoleOpen] = useState(false)
    const [deleteRoleOpen, setDeleteRoleOpen] = useState(false)
    const [managePermissionsOpen, setManagePermissionsOpen] = useState(false)
    const [selectedRole, setSelectedRole] = useState<Role | null>(null)

    // Permission management state
    const [allPermissions, setAllPermissions] = useState<PermissionResponseDto[]>([])
    const [rolePermissions, setRolePermissions] = useState<PermissionResponseDto[]>([])
    const [selectedPermissions, setSelectedPermissions] = useState<number[]>([])
    const [permissionsLoading, setPermissionsLoading] = useState(false)
    const [permissionSearchQuery, setPermissionSearchQuery] = useState("")
    const [permissionFilterCategory, setPermissionFilterCategory] = useState("all")

    // Form state
    const [formData, setFormData] = useState({
        name: "",
        displayName: "",
        description: "",
        isActive: true,
    })

    // Fetch roles from API
    useEffect(() => {
        fetchRoles()
    }, [])

    const fetchRoles = async () => {
        setLoading(true)
        try {
            const rolesData = await getAllRoles()
            setRoles(rolesData)
        } catch (error) {
            console.error("Error fetching roles:", error)
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to fetch roles",
                variant: "destructive",
            })
        } finally {
            setLoading(false)
        }
    }

    const handleAddRole = async () => {
        try {
            const roleData: RoleRequestDto = {
                name: formData.name,
                displayName: formData.displayName,
                description: formData.description,
                isActive: formData.isActive,
            }

            await createRole(roleData)

            toast({
                title: "Success",
                description: "Role created successfully",
            })
            setAddRoleOpen(false)
            resetForm()
            fetchRoles()
        } catch (error) {
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to create role",
                variant: "destructive",
            })
        }
    }

    const handleEditRole = async () => {
        if (!selectedRole) return

        try {
            const roleData: RoleRequestDto = {
                name: formData.name,
                displayName: formData.displayName,
                description: formData.description,
                isActive: formData.isActive,
            }

            await updateRole(selectedRole.id, roleData)

            toast({
                title: "Success",
                description: "Role updated successfully",
            })
            setEditRoleOpen(false)
            resetForm()
            fetchRoles()
        } catch (error) {
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to update role",
                variant: "destructive",
            })
        }
    }

    const handleDeleteRole = async () => {
        if (!selectedRole) return

        try {
            await deleteRole(selectedRole.id)

            toast({
                title: "Success",
                description: "Role deleted successfully",
            })
            setDeleteRoleOpen(false)
            setSelectedRole(null)
            fetchRoles()
        } catch (error) {
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to delete role",
                variant: "destructive",
            })
        }
    }

    const handleToggleRoleStatus = async (role: Role) => {
        try {
            const updatedData: RoleRequestDto = {
                name: role.name,
                displayName: role.displayName,
                description: role.description,
                isActive: !role.isActive,
            }

            await updateRole(role.id, updatedData)

            toast({
                title: "Success",
                description: `Role ${role.isActive ? 'deactivated' : 'activated'} successfully`,
            })
            fetchRoles()
        } catch (error) {
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to update role status",
                variant: "destructive",
            })
        }
    }

    const resetForm = () => {
        setFormData({
            name: "",
            displayName: "",
            description: "",
            isActive: true,
        })
        setSelectedRole(null)
    }

    const openEditDialog = (role: Role) => {
        setSelectedRole(role)
        setFormData({
            name: role.name,
            displayName: role.displayName,
            description: role.description,
            isActive: role.isActive,
        })
        setEditRoleOpen(true)
    }

    const openDeleteDialog = (role: Role) => {
        setSelectedRole(role)
        setDeleteRoleOpen(true)
    }

    const openManagePermissionsDialog = async (role: Role) => {
        setSelectedRole(role)
        setPermissionsLoading(true)
        setManagePermissionsOpen(true)
        
        try {
            // Fetch all permissions and role's current permissions in parallel
            const [allPerms, rolePerms] = await Promise.all([
                getAllPermissions(),
                getPermissionsByRoleId(role.id)
            ])
            
            setAllPermissions(allPerms)
            setRolePermissions(rolePerms)
        } catch (error) {
            console.error("Error fetching permissions:", error)
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to fetch permissions",
                variant: "destructive",
            })
        } finally {
            setPermissionsLoading(false)
        }
    }

    const handleAssignPermissions = async () => {
        if (!selectedRole || selectedPermissions.length === 0) return
        
        try {
            await assignPermissionsToRole(selectedRole.id, selectedPermissions)
            toast({
                title: "Success",
                description: "Permissions assigned successfully",
            })
            setSelectedPermissions([])
            // Refresh role permissions
            const rolePerms = await getPermissionsByRoleId(selectedRole.id)
            setRolePermissions(rolePerms)
        } catch (error) {
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to assign permissions",
                variant: "destructive",
            })
        }
    }

    const handleRevokePermissions = async () => {
        if (!selectedRole || selectedPermissions.length === 0) return
        
        try {
            await revokePermissionsFromRole(selectedRole.id, selectedPermissions)
            toast({
                title: "Success",
                description: "Permissions revoked successfully",
            })
            setSelectedPermissions([])
            // Refresh role permissions
            const rolePerms = await getPermissionsByRoleId(selectedRole.id)
            setRolePermissions(rolePerms)
        } catch (error) {
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to revoke permissions",
                variant: "destructive",
            })
        }
    }

    const closeManagePermissionsDialog = () => {
        setManagePermissionsOpen(false)
        setSelectedRole(null)
        setSelectedPermissions([])
        setPermissionSearchQuery("")
        setPermissionFilterCategory("all")
    }

    // Filter permissions
    const availablePermissions = allPermissions.filter(p => 
        !rolePermissions.some(rp => rp.id === p.id)
    )

    const filteredAvailablePermissions = availablePermissions.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(permissionSearchQuery.toLowerCase()) ||
            p.displayName.toLowerCase().includes(permissionSearchQuery.toLowerCase())
        const matchesCategory = permissionFilterCategory === "all" || p.category === permissionFilterCategory
        return matchesSearch && matchesCategory
    })

    const filteredRolePermissions = rolePermissions.filter(p =>
        p.name.toLowerCase().includes(permissionSearchQuery.toLowerCase()) ||
        p.displayName.toLowerCase().includes(permissionSearchQuery.toLowerCase())
    )

    // Filter roles based on search and status
    const filteredRoles = roles.filter(role => {
        const matchesSearch = role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            role.displayName.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesStatus = filterStatus === "all" ||
            (filterStatus === "active" && role.isActive) ||
            (filterStatus === "inactive" && !role.isActive)
        return matchesSearch && matchesStatus
    })

    const stats = {
        total: roles.length,
        active: roles.filter(r => r.isActive).length,
        inactive: roles.filter(r => !r.isActive).length,
        system: roles.filter(r => r.isSystemRole).length,
        custom: roles.filter(r => !r.isSystemRole).length,
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                            <Shield className="w-8 h-8 text-blue-600" />
                            Role Management
                        </h1>
                        <p className="text-gray-500 mt-1">Manage user roles and their access levels</p>
                    </div>
                    <Button
                        onClick={() => setAddRoleOpen(true)}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Create Role
                    </Button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-gray-500 font-medium">Total Roles</p>
                                    <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
                                </div>
                                <div className="bg-blue-50 p-2 rounded-lg">
                                    <Shield className="w-5 h-5 text-blue-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-shadow">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-gray-500 font-medium">Active</p>
                                    <p className="text-2xl font-bold text-gray-900 mt-1">{stats.active}</p>
                                </div>
                                <div className="bg-green-50 p-2 rounded-lg">
                                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-l-4 border-l-red-500 hover:shadow-lg transition-shadow">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-gray-500 font-medium">Inactive</p>
                                    <p className="text-2xl font-bold text-gray-900 mt-1">{stats.inactive}</p>
                                </div>
                                <div className="bg-red-50 p-2 rounded-lg">
                                    <AlertCircle className="w-5 h-5 text-red-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-l-4 border-l-purple-500 hover:shadow-lg transition-shadow">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-gray-500 font-medium">System Roles</p>
                                    <p className="text-2xl font-bold text-gray-900 mt-1">{stats.system}</p>
                                </div>
                                <div className="bg-purple-50 p-2 rounded-lg">
                                    <Lock className="w-5 h-5 text-purple-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-l-4 border-l-orange-500 hover:shadow-lg transition-shadow">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-gray-500 font-medium">Custom Roles</p>
                                    <p className="text-2xl font-bold text-gray-900 mt-1">{stats.custom}</p>
                                </div>
                                <div className="bg-orange-50 p-2 rounded-lg">
                                    <Unlock className="w-5 h-5 text-orange-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters and Search */}
                <Card>
                    <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <Input
                                    placeholder="Search roles by name..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    variant={filterStatus === "all" ? "default" : "outline"}
                                    onClick={() => setFilterStatus("all")}
                                    size="sm"
                                >
                                    All
                                </Button>
                                <Button
                                    variant={filterStatus === "active" ? "default" : "outline"}
                                    onClick={() => setFilterStatus("active")}
                                    size="sm"
                                >
                                    Active
                                </Button>
                                <Button
                                    variant={filterStatus === "inactive" ? "default" : "outline"}
                                    onClick={() => setFilterStatus("inactive")}
                                    size="sm"
                                >
                                    Inactive
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Roles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredRoles.map((role) => (
                        <Card key={role.id} className="hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-200">
                            <CardHeader className="pb-3">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className={`p-2 rounded-lg ${role.isSystemRole ? 'bg-purple-100' : 'bg-blue-100'
                                            }`}>
                                            {role.isSystemRole ? (
                                                <Lock className={`w-5 h-5 ${role.isSystemRole ? 'text-purple-600' : 'text-blue-600'}`} />
                                            ) : (
                                                <UserCog className="w-5 h-5 text-blue-600" />
                                            )}
                                        </div>
                                        <div>
                                            <CardTitle className="text-lg">{role.displayName}</CardTitle>
                                            <p className="text-xs text-gray-500 font-mono mt-1">{role.name}</p>
                                        </div>
                                    </div>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="sm">
                                                <MoreVertical className="w-4 h-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem onClick={() => openEditDialog(role)}>
                                                <Edit2 className="w-4 h-4 mr-2" />
                                                Edit Role
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleToggleRoleStatus(role)}>
                                                {role.isActive ? (
                                                    <>
                                                        <X className="w-4 h-4 mr-2" />
                                                        Deactivate
                                                    </>
                                                ) : (
                                                    <>
                                                        <Check className="w-4 h-4 mr-2" />
                                                        Activate
                                                    </>
                                                )}
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem
                                                onClick={() => openDeleteDialog(role)}
                                                disabled={role.isSystemRole}
                                                className="text-red-600"
                                            >
                                                <Trash2 className="w-4 h-4 mr-2" />
                                                Delete Role
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-sm text-gray-600">{role.description}</p>

                                <div className="flex items-center gap-2 flex-wrap">
                                    {role.isActive ? (
                                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                                            <CheckCircle2 className="w-3 h-3 mr-1" />
                                            Active
                                        </Badge>
                                    ) : (
                                        <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                                            <AlertCircle className="w-3 h-3 mr-1" />
                                            Inactive
                                        </Badge>
                                    )}
                                    {role.isSystemRole && (
                                        <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100">
                                            <Lock className="w-3 h-3 mr-1" />
                                            System
                                        </Badge>
                                    )}
                                </div>

                                <div className="pt-3 border-t">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-500 flex items-center gap-1">
                                            <Users className="w-4 h-4" />
                                            Users
                                        </span>
                                        <span className="font-semibold text-gray-900">{role.userCount || 0}</span>
                                    </div>
                                </div>

                                <Link href="/admin/permissions" className="block w-full">
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            openManagePermissionsDialog(role)
                                        }}
                                    >
                                        <Key className="w-4 h-4 mr-2" />
                                        Manage Permissions
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {filteredRoles.length === 0 && (
                    <Card>
                        <CardContent className="p-12 text-center">
                            <Shield className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">No roles found</h3>
                            <p className="text-gray-500 mb-4">
                                {searchQuery ? "Try adjusting your search" : "Get started by creating your first role"}
                            </p>
                            {!searchQuery && (
                                <Button onClick={() => setAddRoleOpen(true)}>
                                    <Plus className="w-4 h-4 mr-2" />
                                    Create Role
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                )}

                {/* Add Role Dialog */}
                <Dialog open={addRoleOpen} onOpenChange={setAddRoleOpen}>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>Create New Role</DialogTitle>
                            <DialogDescription>
                                Add a new role to the system with custom permissions
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Role Name (Internal)</Label>
                                <Input
                                    id="name"
                                    placeholder="MARKETING_MANAGER"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value.toUpperCase().replace(/\s/g, '_') })}
                                />
                                <p className="text-xs text-gray-500">Use uppercase with underscores (e.g., MARKETING_MANAGER)</p>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="displayName">Display Name</Label>
                                <Input
                                    id="displayName"
                                    placeholder="Marketing Manager"
                                    value={formData.displayName}
                                    onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Input
                                    id="description"
                                    placeholder="Manages marketing campaigns and content"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <Label htmlFor="isActive">Active Status</Label>
                                <Switch
                                    id="isActive"
                                    checked={formData.isActive}
                                    onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => { setAddRoleOpen(false); resetForm() }}>
                                Cancel
                            </Button>
                            <Button onClick={handleAddRole}>Create Role</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* Edit Role Dialog */}
                <Dialog open={editRoleOpen} onOpenChange={setEditRoleOpen}>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>Edit Role</DialogTitle>
                            <DialogDescription>
                                Update role details {selectedRole?.isSystemRole && "(System roles have limited editing)"}
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="edit-name">Role Name (Internal)</Label>
                                <Input
                                    id="edit-name"
                                    placeholder="MARKETING_MANAGER"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value.toUpperCase().replace(/\s/g, '_') })}
                                    disabled={selectedRole?.isSystemRole}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="edit-displayName">Display Name</Label>
                                <Input
                                    id="edit-displayName"
                                    placeholder="Marketing Manager"
                                    value={formData.displayName}
                                    onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="edit-description">Description</Label>
                                <Input
                                    id="edit-description"
                                    placeholder="Manages marketing campaigns and content"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <Label htmlFor="edit-isActive">Active Status</Label>
                                <Switch
                                    id="edit-isActive"
                                    checked={formData.isActive}
                                    onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => { setEditRoleOpen(false); resetForm() }}>
                                Cancel
                            </Button>
                            <Button onClick={handleEditRole}>Update Role</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* Delete Role Dialog */}
                <Dialog open={deleteRoleOpen} onOpenChange={setDeleteRoleOpen}>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>Delete Role</DialogTitle>
                            <DialogDescription>
                                Are you sure you want to delete this role? This action cannot be undone.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="py-4">
                            {selectedRole && (
                                <Card className="border-red-200 bg-red-50">
                                    <CardContent className="p-4">
                                        <div className="flex items-center gap-3">
                                            <AlertCircle className="w-8 h-8 text-red-600" />
                                            <div>
                                                <h4 className="font-semibold text-gray-900">{selectedRole.displayName}</h4>
                                                <p className="text-sm text-gray-600">{selectedRole.userCount} users currently assigned</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                            <p className="text-sm text-gray-500 mt-4">
                                Users with this role will need to be reassigned to a different role before deletion.
                            </p>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => { setDeleteRoleOpen(false); setSelectedRole(null) }}>
                                Cancel
                            </Button>
                            <Button variant="destructive" onClick={handleDeleteRole}>
                                Delete Role
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* Manage Role Permissions Dialog */}
                <Dialog open={managePermissionsOpen} onOpenChange={(open) => !open && closeManagePermissionsDialog()}>
                    <DialogContent className="max-w-6xl max-h-[90vh]">
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                                <Key className="w-5 h-5 text-indigo-600" />
                                Manage Permissions - {selectedRole?.displayName}
                            </DialogTitle>
                            <DialogDescription>
                                Assign or revoke permissions for this role
                            </DialogDescription>
                        </DialogHeader>

                        {permissionsLoading ? (
                            <div className="flex items-center justify-center py-12">
                                <div className="text-center">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                                    <p className="text-gray-500 mt-4">Loading permissions...</p>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {/* Stats */}
                                <div className="grid grid-cols-2 gap-4">
                                    <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
                                        <CardContent className="p-4">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-green-100 text-sm">Assigned Permissions</p>
                                                    <p className="text-2xl font-bold mt-1">{rolePermissions.length}</p>
                                                </div>
                                                <CheckCircle2 className="w-10 h-10 text-green-200" />
                                            </div>
                                        </CardContent>
                                    </Card>
                                    <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                                        <CardContent className="p-4">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-blue-100 text-sm">Available Permissions</p>
                                                    <p className="text-2xl font-bold mt-1">{availablePermissions.length}</p>
                                                </div>
                                                <Key className="w-10 h-10 text-blue-200" />
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-2 justify-end">
                                    <Button
                                        onClick={handleAssignPermissions}
                                        disabled={selectedPermissions.length === 0}
                                        className="bg-green-600 hover:bg-green-700"
                                    >
                                        <Plus className="w-4 h-4 mr-2" />
                                        Assign Selected ({selectedPermissions.length})
                                    </Button>
                                    <Button
                                        onClick={handleRevokePermissions}
                                        disabled={selectedPermissions.length === 0}
                                        variant="outline"
                                        className="text-red-600 border-red-600 hover:bg-red-50"
                                    >
                                        <Trash2 className="w-4 h-4 mr-2" />
                                        Revoke Selected ({selectedPermissions.length})
                                    </Button>
                                </div>

                                <Tabs defaultValue="available" className="w-full">
                                    <TabsList className="grid w-full grid-cols-2">
                                        <TabsTrigger value="available">
                                            Available Permissions ({availablePermissions.length})
                                        </TabsTrigger>
                                        <TabsTrigger value="assigned">
                                            Assigned Permissions ({rolePermissions.length})
                                        </TabsTrigger>
                                    </TabsList>

                                    <TabsContent value="available" className="space-y-4">
                                        {/* Search and Filter */}
                                        <div className="flex gap-4">
                                            <div className="flex-1 relative">
                                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                                <Input
                                                    placeholder="Search available permissions..."
                                                    value={permissionSearchQuery}
                                                    onChange={(e) => setPermissionSearchQuery(e.target.value)}
                                                    className="pl-10"
                                                />
                                            </div>
                                            <Select value={permissionFilterCategory} onValueChange={setPermissionFilterCategory}>
                                                <SelectTrigger className="w-[200px]">
                                                    <SelectValue placeholder="Category" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="all">All Categories</SelectItem>
                                                    {Object.keys(categoryColors).map(cat => (
                                                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        {/* Available Permissions List */}
                                        {filteredAvailablePermissions.length === 0 ? (
                                            <Card>
                                                <CardContent className="p-12 text-center">
                                                    <Key className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No available permissions</h3>
                                                    <p className="text-gray-500">
                                                        {permissionSearchQuery ? "Try adjusting your search" : "All permissions are already assigned"}
                                                    </p>
                                                </CardContent>
                                            </Card>
                                        ) : (
                                            <ScrollArea className="h-[400px] border rounded-lg p-4">
                                                <div className="space-y-2">
                                                    {filteredAvailablePermissions.map((permission) => (
                                                        <div key={permission.id} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                                                            <Checkbox
                                                                checked={selectedPermissions.includes(permission.id)}
                                                                onCheckedChange={(checked) => {
                                                                    if (checked) {
                                                                        setSelectedPermissions([...selectedPermissions, permission.id])
                                                                    } else {
                                                                        setSelectedPermissions(selectedPermissions.filter(id => id !== permission.id))
                                                                    }
                                                                }}
                                                            />
                                                            <div className="flex-1">
                                                                <div className="flex items-center gap-2 mb-1">
                                                                    <p className="font-medium text-sm">{permission.displayName}</p>
                                                                    <Badge className={`${categoryColors[permission.category || 'SETTINGS']} text-white text-xs`}>
                                                                        {permission.category}
                                                                    </Badge>
                                                                </div>
                                                                <p className="text-xs text-gray-500">{permission.description}</p>
                                                                <p className="text-xs text-gray-400 font-mono mt-1">{permission.name}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </ScrollArea>
                                        )}
                                    </TabsContent>

                                    <TabsContent value="assigned" className="space-y-4">
                                        {/* Search */}
                                        <div className="relative">
                                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                            <Input
                                                placeholder="Search assigned permissions..."
                                                value={permissionSearchQuery}
                                                onChange={(e) => setPermissionSearchQuery(e.target.value)}
                                                className="pl-10"
                                            />
                                        </div>

                                        {/* Assigned Permissions List */}
                                        {filteredRolePermissions.length === 0 ? (
                                            <Card>
                                                <CardContent className="p-12 text-center">
                                                    <Shield className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No permissions assigned</h3>
                                                    <p className="text-gray-500">
                                                        {permissionSearchQuery ? "Try adjusting your search" : "This role has no permissions yet"}
                                                    </p>
                                                </CardContent>
                                            </Card>
                                        ) : (
                                            <ScrollArea className="h-[400px] border rounded-lg p-4">
                                                <div className="space-y-2">
                                                    {filteredRolePermissions.map((permission) => (
                                                        <div key={permission.id} className="flex items-start space-x-3 p-3 border rounded-lg bg-green-50 hover:bg-green-100 transition-colors">
                                                            <Checkbox
                                                                checked={selectedPermissions.includes(permission.id)}
                                                                onCheckedChange={(checked) => {
                                                                    if (checked) {
                                                                        setSelectedPermissions([...selectedPermissions, permission.id])
                                                                    } else {
                                                                        setSelectedPermissions(selectedPermissions.filter(id => id !== permission.id))
                                                                    }
                                                                }}
                                                            />
                                                            <div className="flex-1">
                                                                <div className="flex items-center gap-2 mb-1">
                                                                    <p className="font-medium text-sm">{permission.displayName}</p>
                                                                    <Badge className={`${categoryColors[permission.category || 'SETTINGS']} text-white text-xs`}>
                                                                        {permission.category}
                                                                    </Badge>
                                                                    <Badge className="bg-green-600 text-white text-xs">
                                                                        <CheckCircle2 className="w-3 h-3 mr-1" />
                                                                        Assigned
                                                                    </Badge>
                                                                </div>
                                                                <p className="text-xs text-gray-600">{permission.description}</p>
                                                                <p className="text-xs text-gray-500 font-mono mt-1">{permission.name}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </ScrollArea>
                                        )}
                                    </TabsContent>
                                </Tabs>
                            </div>
                        )}

                        <DialogFooter>
                            <Button variant="outline" onClick={closeManagePermissionsDialog}>
                                Close
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}
