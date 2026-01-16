import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RoleResponseDto } from "@/lib/api/roles"
import { UserResponseDto } from "@/lib/api/users"

interface EditUserRoleDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    user: UserResponseDto | null
    selectedRole: string
    onRoleChange: (role: string) => void
    onSubmit: () => void
    onCancel: () => void
    roles: RoleResponseDto[]
}

export function EditUserRoleDialog({
    open,
    onOpenChange,
    user,
    selectedRole,
    onRoleChange,
    onSubmit,
    onCancel,
    roles
}: EditUserRoleDialogProps) {
    const getUserDisplayName = () => {
        if (!user) return ''
        if (user.firstName && user.lastName) {
            return `${user.firstName} ${user.lastName}`
        }
        return user.username || user.email
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Edit User Role</DialogTitle>
                    <DialogDescription>
                        Update the role for {getUserDisplayName()}
                    </DialogDescription>
                </DialogHeader>

                {user && (
                    <div className="space-y-4">
                        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-sm font-medium text-gray-600">Name:</span>
                                    <span className="text-sm text-gray-900">{getUserDisplayName()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm font-medium text-gray-600">Email:</span>
                                    <span className="text-sm text-gray-900">{user.email}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm font-medium text-gray-600">Current Role:</span>
                                    <span className="text-sm font-semibold text-indigo-600">{user.role}</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="role">New Role</Label>
                            <Select
                                value={selectedRole}
                                onValueChange={onRoleChange}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a role">
                                        {selectedRole && roles.find(r => r.name === selectedRole)?.displayName}
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    {roles.map((role) => (
                                        <SelectItem key={role.id} value={role.name}>
                                            {role.displayName}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                )}

                <DialogFooter>
                    <Button variant="outline" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button
                        onClick={onSubmit}
                        className="bg-indigo-600 hover:bg-indigo-700"
                        disabled={!selectedRole}
                    >
                        Update Role
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
