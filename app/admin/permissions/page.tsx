"use client"

import { useState, useEffect } from 'react'
import {
    Shield,
    Plus,
    Edit2,
    Trash2,
    Search,
    Key,
    Filter,
    Grid3x3,
    List,
    CheckCircle2,
    XCircle,
    Tag
} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/hooks/use-toast"
import { useAuth } from "@/lib/auth-context"
import {
    getAllPermissions,
    createPermission,
    updatePermission,
    deletePermission,
    PermissionResponseDto,
    PermissionRequestDto
} from "@/lib/api/permissions"
import { Textarea } from "@/components/ui/textarea"

const categories = [
    "LEADS", "USERS", "STUDENTS", "APPLICATIONS", "COLLEGES", "COURSES",
    "REPORTS", "COMMUNICATION", "DOCUMENTS", "SETTINGS", "ROLES", "PERMISSIONS"
]

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

export default function PermissionsManagementPage() {
    const { user } = useAuth()
    const [permissions, setPermissions] = useState<PermissionResponseDto[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")
    const [filterCategory, setFilterCategory] = useState("all")
    const [filterStatus, setFilterStatus] = useState("all")
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
    const [addPermissionOpen, setAddPermissionOpen] = useState(false)
    const [editPermissionOpen, setEditPermissionOpen] = useState(false)
    const [deletePermissionOpen, setDeletePermissionOpen] = useState(false)
    const [selectedPermission, setSelectedPermission] = useState<PermissionResponseDto | null>(null)

    const [formData, setFormData] = useState({
        name: "",
        displayName: "",
        description: "",
        category: "",
        isActive: true,
    })

    useEffect(() => {
        fetchPermissions()
    }, [])

    const fetchPermissions = async () => {
        setLoading(true)
        try {
            const data = await getAllPermissions()
            setPermissions(data)
        } catch (error) {
            console.error("Error fetching permissions:", error)
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to fetch permissions",
                variant: "destructive",
            })
        } finally {
            setLoading(false)
        }
    }

    const handleAddPermission = async () => {
        try {
            const permissionData: PermissionRequestDto = {
                name: formData.name.toUpperCase().replace(/\s+/g, '_'),
                displayName: formData.displayName,
                description: formData.description,
                category: formData.category,
                isActive: formData.isActive,
            }
            await createPermission(permissionData)
            toast({
                title: "Success",
                description: "Permission created successfully",
            })
            setAddPermissionOpen(false)
            resetForm()
            fetchPermissions()
        } catch (error) {
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to create permission",
                variant: "destructive",
            })
        }
    }

    const handleEditPermission = async () => {
        if (!selectedPermission) return
        try {
            const permissionData: PermissionRequestDto = {
                name: formData.name.toUpperCase().replace(/\s+/g, '_'),
                displayName: formData.displayName,
                description: formData.description,
                category: formData.category,
                isActive: formData.isActive,
            }
            await updatePermission(selectedPermission.id, permissionData)
            toast({
                title: "Success",
                description: "Permission updated successfully",
            })
            setEditPermissionOpen(false)
            resetForm()
            fetchPermissions()
        } catch (error) {
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to update permission",
                variant: "destructive",
            })
        }
    }

    const handleDeletePermission = async () => {
        if (!selectedPermission) return
        try {
            await deletePermission(selectedPermission.id)
            toast({
                title: "Success",
                description: "Permission deleted successfully",
            })
            setDeletePermissionOpen(false)
            setSelectedPermission(null)
            fetchPermissions()
        } catch (error) {
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to delete permission",
                variant: "destructive",
            })
        }
    }

    const resetForm = () => {
        setFormData({
            name: "",
            displayName: "",
            description: "",
            category: "",
            isActive: true,
        })
        setSelectedPermission(null)
    }

    const openEditDialog = (permission: PermissionResponseDto) => {
        setSelectedPermission(permission)
        setFormData({
            name: permission.name,
            displayName: permission.displayName,
            description: permission.description || "",
            category: permission.category || "",
            isActive: permission.isActive,
        })
        setEditPermissionOpen(true)
    }

    const openDeleteDialog = (permission: PermissionResponseDto) => {
        setSelectedPermission(permission)
        setDeletePermissionOpen(true)
    }

    const filteredPermissions = permissions.filter(permission => {
        const matchesSearch = permission.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            permission.displayName.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesCategory = filterCategory === "all" || permission.category === filterCategory
        const matchesStatus = filterStatus === "all" ||
            (filterStatus === "active" && permission.isActive) ||
            (filterStatus === "inactive" && !permission.isActive)
        return matchesSearch && matchesCategory && matchesStatus
    })

    const permissionsByCategory = categories.map(category => ({
        category,
        count: permissions.filter(p => p.category === category).length,
        active: permissions.filter(p => p.category === category && p.isActive).length
    }))

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-3 rounded-xl shadow-lg">
                            <Key className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Permissions Management</h1>
                            <p className="text-gray-600">Manage system permissions and access control</p>
                        </div>
                    </div>
                    <Button
                        onClick={() => setAddPermissionOpen(true)}
                        className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Permission
                    </Button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-purple-100 text-sm font-medium">Total Permissions</p>
                                    <p className="text-3xl font-bold mt-2">{permissions.length}</p>
                                </div>
                                <Key className="w-12 h-12 text-purple-200" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-green-100 text-sm font-medium">Active</p>
                                    <p className="text-3xl font-bold mt-2">
                                        {permissions.filter(p => p.isActive).length}
                                    </p>
                                </div>
                                <CheckCircle2 className="w-12 h-12 text-green-200" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-orange-100 text-sm font-medium">Inactive</p>
                                    <p className="text-3xl font-bold mt-2">
                                        {permissions.filter(p => !p.isActive).length}
                                    </p>
                                </div>
                                <XCircle className="w-12 h-12 text-orange-200" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-blue-100 text-sm font-medium">Categories</p>
                                    <p className="text-3xl font-bold mt-2">{categories.length}</p>
                                </div>
                                <Tag className="w-12 h-12 text-blue-200" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters and Search */}
                <Card className="mb-8">
                    <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <Input
                                    placeholder="Search permissions..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                            <Select value={filterCategory} onValueChange={setFilterCategory}>
                                <SelectTrigger className="w-[200px]">
                                    <SelectValue placeholder="All Categories" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Categories</SelectItem>
                                    {categories.map(cat => (
                                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Select value={filterStatus} onValueChange={setFilterStatus}>
                                <SelectTrigger className="w-[150px]">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="inactive">Inactive</SelectItem>
                                </SelectContent>
                            </Select>
                            <div className="flex gap-2">
                                <Button
                                    variant={viewMode === "grid" ? "default" : "outline"}
                                    size="icon"
                                    onClick={() => setViewMode("grid")}
                                >
                                    <Grid3x3 className="w-4 h-4" />
                                </Button>
                                <Button
                                    variant={viewMode === "list" ? "default" : "outline"}
                                    size="icon"
                                    onClick={() => setViewMode("list")}
                                >
                                    <List className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Permissions List/Grid */}
                {loading ? (
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Loading permissions...</p>
                    </div>
                ) : viewMode === "grid" ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredPermissions.map((permission) => (
                            <Card key={permission.id} className="hover:shadow-lg transition-shadow">
                                <CardHeader className="pb-3">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Badge className={`${categoryColors[permission.category || 'SETTINGS']} text-white`}>
                                                    {permission.category}
                                                </Badge>
                                                {permission.isActive ? (
                                                    <Badge variant="outline" className="text-green-600 border-green-600">
                                                        <CheckCircle2 className="w-3 h-3 mr-1" />
                                                        Active
                                                    </Badge>
                                                ) : (
                                                    <Badge variant="outline" className="text-gray-600">
                                                        <XCircle className="w-3 h-3 mr-1" />
                                                        Inactive
                                                    </Badge>
                                                )}
                                            </div>
                                            <CardTitle className="text-lg">{permission.displayName}</CardTitle>
                                            <p className="text-sm text-gray-500 font-mono mt-1">{permission.name}</p>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                                        {permission.description || "No description"}
                                    </p>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="flex-1"
                                            onClick={() => openEditDialog(permission)}
                                        >
                                            <Edit2 className="w-4 h-4 mr-1" />
                                            Edit
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                            onClick={() => openDeleteDialog(permission)}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <Card>
                        <CardContent className="p-0">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50 border-b">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Permission</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Category</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Description</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                                            <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        {filteredPermissions.map((permission) => (
                                            <tr key={permission.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4">
                                                    <div>
                                                        <p className="font-medium text-gray-900">{permission.displayName}</p>
                                                        <p className="text-sm text-gray-500 font-mono">{permission.name}</p>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <Badge className={`${categoryColors[permission.category || 'SETTINGS']} text-white`}>
                                                        {permission.category}
                                                    </Badge>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-600">
                                                    {permission.description || "No description"}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {permission.isActive ? (
                                                        <Badge variant="outline" className="text-green-600 border-green-600">
                                                            <CheckCircle2 className="w-3 h-3 mr-1" />
                                                            Active
                                                        </Badge>
                                                    ) : (
                                                        <Badge variant="outline" className="text-gray-600">
                                                            <XCircle className="w-3 h-3 mr-1" />
                                                            Inactive
                                                        </Badge>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => openEditDialog(permission)}
                                                        >
                                                            <Edit2 className="w-4 h-4" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="text-red-600 hover:text-red-700"
                                                            onClick={() => openDeleteDialog(permission)}
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Add Permission Dialog */}
                <Dialog open={addPermissionOpen} onOpenChange={setAddPermissionOpen}>
                    <DialogContent className="max-w-md">
                        <DialogHeader>
                            <DialogTitle>Add New Permission</DialogTitle>
                            <DialogDescription>
                                Create a new permission for system access control
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div>
                                <Label htmlFor="name">Permission Name *</Label>
                                <Input
                                    id="name"
                                    placeholder="e.g., LEAD_VIEW_ALL"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                                <p className="text-xs text-gray-500 mt-1">Use UPPERCASE_WITH_UNDERSCORES format</p>
                            </div>
                            <div>
                                <Label htmlFor="displayName">Display Name *</Label>
                                <Input
                                    id="displayName"
                                    placeholder="e.g., View All Leads"
                                    value={formData.displayName}
                                    onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                                />
                            </div>
                            <div>
                                <Label htmlFor="category">Category</Label>
                                <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map(cat => (
                                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    placeholder="Describe what this permission allows..."
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    rows={3}
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
                            <Button variant="outline" onClick={() => setAddPermissionOpen(false)}>
                                Cancel
                            </Button>
                            <Button onClick={handleAddPermission} className="bg-purple-600 hover:bg-purple-700">
                                Create Permission
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* Edit Permission Dialog */}
                <Dialog open={editPermissionOpen} onOpenChange={setEditPermissionOpen}>
                    <DialogContent className="max-w-md">
                        <DialogHeader>
                            <DialogTitle>Edit Permission</DialogTitle>
                            <DialogDescription>
                                Update permission details
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div>
                                <Label htmlFor="edit-name">Permission Name *</Label>
                                <Input
                                    id="edit-name"
                                    placeholder="e.g., LEAD_VIEW_ALL"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <Label htmlFor="edit-displayName">Display Name *</Label>
                                <Input
                                    id="edit-displayName"
                                    placeholder="e.g., View All Leads"
                                    value={formData.displayName}
                                    onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                                />
                            </div>
                            <div>
                                <Label htmlFor="edit-category">Category</Label>
                                <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map(cat => (
                                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="edit-description">Description</Label>
                                <Textarea
                                    id="edit-description"
                                    placeholder="Describe what this permission allows..."
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    rows={3}
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
                            <Button variant="outline" onClick={() => setEditPermissionOpen(false)}>
                                Cancel
                            </Button>
                            <Button onClick={handleEditPermission} className="bg-purple-600 hover:bg-purple-700">
                                Update Permission
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* Delete Confirmation Dialog */}
                <Dialog open={deletePermissionOpen} onOpenChange={setDeletePermissionOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Delete Permission</DialogTitle>
                            <DialogDescription>
                                Are you sure you want to delete this permission? This action cannot be undone.
                            </DialogDescription>
                        </DialogHeader>
                        {selectedPermission && (
                            <div className="py-4">
                                <Card>
                                    <CardContent className="p-4">
                                        <p className="font-medium">{selectedPermission.displayName}</p>
                                        <p className="text-sm text-gray-500">{selectedPermission.name}</p>
                                    </CardContent>
                                </Card>
                            </div>
                        )}
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setDeletePermissionOpen(false)}>
                                Cancel
                            </Button>
                            <Button
                                onClick={handleDeletePermission}
                                className="bg-red-600 hover:bg-red-700 text-white"
                            >
                                Delete Permission
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}
