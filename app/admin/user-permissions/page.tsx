"use client"

import { useState, useEffect } from 'react'
import { Users, Plus, Search, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast"
import { useAuth } from "@/lib/auth-context"
import {
    getAllUsers,
    createUser,
    updateUser,
    updateUserRole,
    deleteUser,
    UserResponseDto,
    PagedUserResponseDto
} from "@/lib/api/users"
import { getActiveRoles, RoleResponseDto } from "@/lib/api/roles"
import {
    getUserPermissions,
    assignPermissionsToUser,
    revokePermissionsFromUser,
    getAllPermissions,
    UserPermissionsResponseDto,
    PermissionResponseDto
} from "@/lib/api/permissions"
import { UserListItem } from "@/components/user-management/UserListItem"
import { UserFormDialog } from "@/components/user-management/UserFormDialog"
import { EditUserRoleDialog } from "@/components/user-management/EditUserRoleDialog"
import { DeleteUserDialog } from "@/components/user-management/DeleteUserDialog"
import { ManagePermissionsDialog } from "@/components/user-management/ManagePermissionsDialog"

export default function UserManagementPage() {
    const { user } = useAuth()
    const [loading, setLoading] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [users, setUsers] = useState<UserResponseDto[]>([])
    const [pagination, setPagination] = useState({
        currentPage: 0,
        totalPages: 0,
        totalElements: 0,
        pageSize: 10
    })

    // Dialogs state
    const [addUserDialogOpen, setAddUserDialogOpen] = useState(false)
    const [editUserDialogOpen, setEditUserDialogOpen] = useState(false)
    const [deleteUserDialogOpen, setDeleteUserDialogOpen] = useState(false)
    const [managePermissionsDialogOpen, setManagePermissionsDialogOpen] = useState(false)

    // Form state
    const [selectedUser, setSelectedUser] = useState<UserResponseDto | null>(null)
    const [roles, setRoles] = useState<RoleResponseDto[]>([])
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        roleName: "",
        profilePicture: ""
    })

    // Permissions state
    const [userPermissions, setUserPermissions] = useState<UserPermissionsResponseDto | null>(null)
    const [allPermissions, setAllPermissions] = useState<PermissionResponseDto[]>([])
    const [selectedPermissions, setSelectedPermissions] = useState<number[]>([])

    useEffect(() => {
        fetchUsers()
        fetchRoles()
        fetchAllPermissions()
    }, [])

    const fetchUsers = async (page: number = 0, search?: string) => {
        setLoading(true)
        try {
            const data = await getAllUsers(page, pagination.pageSize, search)
            setUsers(data.users)
            setPagination({
                currentPage: data.currentPage,
                totalPages: data.totalPages,
                totalElements: data.totalElements,
                pageSize: data.pageSize
            })
        } catch (error) {
            console.error("Error fetching users:", error)
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to fetch users",
                variant: "destructive",
            })
        } finally {
            setLoading(false)
        }
    }

    const fetchRoles = async () => {
        try {
            const data = await getActiveRoles()
            setRoles(data)
        } catch (error) {
            console.error("Error fetching roles:", error)
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to fetch roles",
                variant: "destructive",
            })
        }
    }

    const fetchAllPermissions = async () => {
        try {
            const data = await getAllPermissions()
            setAllPermissions(data)
        } catch (error) {
            console.error("Error fetching permissions:", error)
        }
    }

    const fetchUserPermissions = async (userId: number) => {
        try {
            const data = await getUserPermissions(userId)
            setUserPermissions(data)
        } catch (error) {
            console.error("Error fetching user permissions:", error)
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to fetch user permissions",
                variant: "destructive",
            })
        }
    }

    const handleSearch = () => {
        fetchUsers(0, searchQuery || undefined)
    }

    const handlePageChange = (newPage: number) => {
        fetchUsers(newPage, searchQuery || undefined)
    }

    const handleAddUser = async () => {
        try {
            await createUser(formData)
            toast({
                title: "Success",
                description: "User created successfully",
            })
            setAddUserDialogOpen(false)
            resetForm()
            fetchUsers(pagination.currentPage)
        } catch (error) {
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to create user",
                variant: "destructive",
            })
        }
    }

    const handleUpdateUser = async () => {
        if (!selectedUser || !formData.roleName) return
        try {
            await updateUserRole(selectedUser.userId, formData.roleName)
            toast({
                title: "Success",
                description: "User role updated successfully",
            })
            setEditUserDialogOpen(false)
            resetForm()
            fetchUsers(pagination.currentPage)
        } catch (error) {
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to update user role",
                variant: "destructive",
            })
        }
    }

    const handleDeleteUser = async () => {
        if (!selectedUser) return
        try {
            await deleteUser(selectedUser.userId)
            toast({
                title: "Success",
                description: "User deleted successfully",
            })
            setDeleteUserDialogOpen(false)
            setSelectedUser(null)
            fetchUsers(pagination.currentPage)
        } catch (error) {
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to delete user",
                variant: "destructive",
            })
        }
    }

    const handleAssignPermissions = async () => {
        if (!selectedUser || selectedPermissions.length === 0) return
        try {
            await assignPermissionsToUser({
                userId: selectedUser.userId,
                permissionIds: selectedPermissions
            })
            toast({
                title: "Success",
                description: "Permissions assigned successfully",
            })
            setSelectedPermissions([])
            fetchUserPermissions(selectedUser.userId)
        } catch (error) {
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to assign permissions",
                variant: "destructive",
            })
        }
    }

    const handleRevokePermissions = async () => {
        if (!selectedUser || selectedPermissions.length === 0) return
        try {
            await revokePermissionsFromUser(selectedUser.userId, selectedPermissions)
            toast({
                title: "Success",
                description: "Permissions revoked successfully",
            })
            setSelectedPermissions([])
            fetchUserPermissions(selectedUser.userId)
        } catch (error) {
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to revoke permissions",
                variant: "destructive",
            })
        }
    }

    const openEditDialog = async (user: UserResponseDto) => {
        setSelectedUser(user)
        const fullName = user.firstName && user.lastName
            ? `${user.firstName} ${user.lastName}`.trim()
            : user.username || user.email
        setFormData({
            name: fullName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            roleName: user.role,
            profilePicture: user.profilePicture || ""
        })
        // Fetch latest roles before opening dialog
        await fetchRoles()
        setEditUserDialogOpen(true)
    }

    const openDeleteDialog = (user: UserResponseDto) => {
        setSelectedUser(user)
        setDeleteUserDialogOpen(true)
    }

    const openPermissionsDialog = async (user: UserResponseDto) => {
        setSelectedUser(user)
        await fetchUserPermissions(user.userId)
        setManagePermissionsDialogOpen(true)
    }

    const resetForm = () => {
        setFormData({
            name: "",
            email: "",
            phoneNumber: "",
            roleName: "",
            profilePicture: ""
        })
        setSelectedUser(null)
    }

    const availablePermissions = allPermissions.filter(p =>
        !userPermissions?.allPermissions.some(up => up.id === p.id)
    )

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-3 rounded-xl shadow-lg">
                            <Users className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
                            <p className="text-gray-600">Manage users, roles, and permissions</p>
                        </div>
                    </div>
                    <Button
                        onClick={() => {
                            resetForm()
                            setAddUserDialogOpen(true)
                        }}
                        className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Add User
                    </Button>
                </div>

                {/* Search */}
                <Card className="mb-6">
                    <CardContent className="p-6">
                        <div className="flex gap-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <Input
                                    placeholder="Search by name, email, or username..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                    className="pl-10"
                                />
                            </div>
                            <Button onClick={handleSearch} className="bg-indigo-600 hover:bg-indigo-700">
                                <Search className="w-4 h-4 mr-2" />
                                Search
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Users List */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Users className="w-5 h-5 text-indigo-600" />
                            All Users {pagination.totalElements > 0 && `(${pagination.totalElements})`}
                        </CardTitle>
                        <CardDescription>Manage user accounts and their access</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <div className="text-center py-12">
                                <div className="animate-spin w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto"></div>
                                <p className="text-gray-500 mt-4">Loading users...</p>
                            </div>
                        ) : !users || users.length === 0 ? (
                            <div className="text-center py-12">
                                <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                <p className="text-gray-500">No users found</p>
                            </div>
                        ) : (
                            <>
                                <div className="space-y-3">
                                    {users.map((user) => (
                                        <UserListItem
                                            key={user.userId}
                                            user={user}
                                            onEdit={openEditDialog}
                                            onDelete={openDeleteDialog}
                                            onManagePermissions={openPermissionsDialog}
                                        />
                                    ))}
                                </div>

                                {/* Pagination */}
                                {pagination.totalPages > 1 && (
                                    <div className="flex items-center justify-between mt-6 pt-6 border-t">
                                        <p className="text-sm text-gray-600">
                                            Showing {pagination.currentPage * pagination.pageSize + 1} to{' '}
                                            {Math.min((pagination.currentPage + 1) * pagination.pageSize, pagination.totalElements)} of{' '}
                                            {pagination.totalElements} users
                                        </p>
                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handlePageChange(pagination.currentPage - 1)}
                                                disabled={pagination.currentPage === 0}
                                            >
                                                <ChevronLeft className="w-4 h-4" />
                                            </Button>
                                            <span className="text-sm">
                                                Page {pagination.currentPage + 1} of {pagination.totalPages}
                                            </span>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handlePageChange(pagination.currentPage + 1)}
                                                disabled={pagination.currentPage >= pagination.totalPages - 1}
                                            >
                                                <ChevronRight className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </CardContent>
                </Card>

                {/* Dialogs */}
                <UserFormDialog
                    open={addUserDialogOpen}
                    onOpenChange={setAddUserDialogOpen}
                    formData={formData}
                    onFormDataChange={setFormData}
                    onSubmit={handleAddUser}
                    onCancel={() => { setAddUserDialogOpen(false); resetForm(); }}
                    roles={roles}
                    title="Add New User"
                    description="Create a new user account with a role"
                    submitLabel="Create User"
                />

                <EditUserRoleDialog
                    open={editUserDialogOpen}
                    onOpenChange={setEditUserDialogOpen}
                    user={selectedUser}
                    selectedRole={formData.roleName}
                    onRoleChange={(role) => setFormData({ ...formData, roleName: role })}
                    onSubmit={handleUpdateUser}
                    onCancel={() => { setEditUserDialogOpen(false); resetForm(); }}
                    roles={roles}
                />

                <DeleteUserDialog
                    open={deleteUserDialogOpen}
                    onOpenChange={setDeleteUserDialogOpen}
                    user={selectedUser}
                    onConfirm={handleDeleteUser}
                    onCancel={() => setDeleteUserDialogOpen(false)}
                />

                <ManagePermissionsDialog
                    open={managePermissionsDialogOpen}
                    onOpenChange={setManagePermissionsDialogOpen}
                    user={selectedUser}
                    userPermissions={userPermissions}
                    availablePermissions={availablePermissions}
                    selectedPermissions={selectedPermissions}
                    onSelectedPermissionsChange={setSelectedPermissions}
                    onAssign={handleAssignPermissions}
                    onRevoke={handleRevokePermissions}
                />
            </div>
        </div>
    )
}
