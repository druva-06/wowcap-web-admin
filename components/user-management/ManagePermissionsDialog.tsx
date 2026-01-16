import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Shield, Key } from "lucide-react"
import { UserResponseDto } from "@/lib/api/users"
import { UserPermissionsResponseDto, PermissionResponseDto } from "@/lib/api/permissions"

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

interface ManagePermissionsDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    user: UserResponseDto | null
    userPermissions: UserPermissionsResponseDto | null
    availablePermissions: PermissionResponseDto[]
    selectedPermissions: number[]
    onSelectedPermissionsChange: (permissions: number[]) => void
    onAssign: () => void
    onRevoke: () => void
}

export function ManagePermissionsDialog({
    open,
    onOpenChange,
    user,
    userPermissions,
    availablePermissions,
    selectedPermissions,
    onSelectedPermissionsChange,
    onAssign,
    onRevoke
}: ManagePermissionsDialogProps) {
    const [activeTab, setActiveTab] = useState("assign")
    const [searchQuery, setSearchQuery] = useState("")
    const [filterCategory, setFilterCategory] = useState("all")

    const filteredAvailablePermissions = availablePermissions.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.displayName.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesCategory = filterCategory === "all" || p.category === filterCategory
        return matchesSearch && matchesCategory
    })

    const handleClose = (open: boolean) => {
        onOpenChange(open)
        if (!open) {
            onSelectedPermissionsChange([])
            setActiveTab("assign")
            setSearchQuery("")
            setFilterCategory("all")
        }
    }

    const getUserDisplayName = () => {
        if (!user) return ''
        if (user.firstName && user.lastName) {
            return `${user.firstName} ${user.lastName}`
        }
        return user.username || user.email
    }

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="max-w-4xl max-h-[90vh]">
                <DialogHeader>
                    <DialogTitle>Manage User Permissions</DialogTitle>
                    <DialogDescription>
                        {user && `Managing permissions for ${getUserDisplayName()}`}
                    </DialogDescription>
                </DialogHeader>

                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="assign">Assign</TabsTrigger>
                        <TabsTrigger value="revoke">Revoke</TabsTrigger>
                        <TabsTrigger value="view">View All</TabsTrigger>
                    </TabsList>

                    {/* Assign Tab */}
                    <TabsContent value="assign" className="space-y-4">
                        <div className="flex gap-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <Input
                                    placeholder="Search permissions..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                            <Select value={filterCategory} onValueChange={setFilterCategory}>
                                <SelectTrigger className="w-[180px]">
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
                        <ScrollArea className="h-[400px] border rounded-lg p-4">
                            <div className="space-y-3">
                                {filteredAvailablePermissions.map((permission) => (
                                    <div key={permission.id} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                                        <Checkbox
                                            checked={selectedPermissions.includes(permission.id)}
                                            onCheckedChange={(checked) => {
                                                if (checked) {
                                                    onSelectedPermissionsChange([...selectedPermissions, permission.id])
                                                } else {
                                                    onSelectedPermissionsChange(selectedPermissions.filter(id => id !== permission.id))
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
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-600">Selected: {selectedPermissions.length} permissions</p>
                            <Button
                                onClick={onAssign}
                                className="bg-green-600 hover:bg-green-700"
                                disabled={selectedPermissions.length === 0}
                            >
                                Assign Selected
                            </Button>
                        </div>
                    </TabsContent>

                    {/* Revoke Tab */}
                    <TabsContent value="revoke" className="space-y-4">
                        <ScrollArea className="h-[400px] border rounded-lg p-4">
                            <div className="space-y-3">
                                {userPermissions?.additionalPermissions.map((permission) => (
                                    <div key={permission.id} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                                        <Checkbox
                                            checked={selectedPermissions.includes(permission.id)}
                                            onCheckedChange={(checked) => {
                                                if (checked) {
                                                    onSelectedPermissionsChange([...selectedPermissions, permission.id])
                                                } else {
                                                    onSelectedPermissionsChange(selectedPermissions.filter(id => id !== permission.id))
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
                                            <p className="text-xs text-gray-500 font-mono">{permission.name}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-600">Selected: {selectedPermissions.length} permissions</p>
                            <Button
                                onClick={onRevoke}
                                className="bg-red-600 hover:bg-red-700 text-white"
                                disabled={selectedPermissions.length === 0}
                            >
                                Revoke Selected
                            </Button>
                        </div>
                    </TabsContent>

                    {/* View All Tab */}
                    <TabsContent value="view" className="space-y-4">
                        <div className="grid gap-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-sm flex items-center gap-2">
                                        <Shield className="w-4 h-4 text-blue-600" />
                                        Role Permissions ({userPermissions?.rolePermissions.length || 0})
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ScrollArea className="h-[150px]">
                                        <div className="space-y-2">
                                            {userPermissions?.rolePermissions.map((permission) => (
                                                <div key={permission.id} className="p-2 border rounded-lg bg-blue-50 text-xs">
                                                    <div className="flex items-center justify-between">
                                                        <p className="font-medium">{permission.displayName}</p>
                                                        <Badge className={`${categoryColors[permission.category || 'SETTINGS']} text-white text-xs`}>
                                                            {permission.category}
                                                        </Badge>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </ScrollArea>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-sm flex items-center gap-2">
                                        <Key className="w-4 h-4 text-green-600" />
                                        Additional Permissions ({userPermissions?.additionalPermissions.length || 0})
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ScrollArea className="h-[150px]">
                                        <div className="space-y-2">
                                            {userPermissions?.additionalPermissions.map((permission) => (
                                                <div key={permission.id} className="p-2 border rounded-lg bg-green-50 text-xs">
                                                    <div className="flex items-center justify-between">
                                                        <p className="font-medium">{permission.displayName}</p>
                                                        <Badge className={`${categoryColors[permission.category || 'SETTINGS']} text-white text-xs`}>
                                                            {permission.category}
                                                        </Badge>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </ScrollArea>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    )
}
