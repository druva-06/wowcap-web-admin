import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RoleResponseDto } from "@/lib/api/roles"

interface UserFormData {
    name: string
    email: string
    phoneNumber: string
    roleName: string
    profilePicture: string
}

interface UserFormDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    formData: UserFormData
    onFormDataChange: (data: UserFormData) => void
    onSubmit: () => void
    onCancel: () => void
    roles: RoleResponseDto[]
    title: string
    description: string
    submitLabel: string
}

export function UserFormDialog({
    open,
    onOpenChange,
    formData,
    onFormDataChange,
    onSubmit,
    onCancel,
    roles,
    title,
    description,
    submitLabel
}: UserFormDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                            id="name"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={(e) => onFormDataChange({ ...formData, name: e.target.value })}
                        />
                    </div>
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={(e) => onFormDataChange({ ...formData, email: e.target.value })}
                        />
                    </div>
                    <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                            id="phone"
                            placeholder="1234567890"
                            value={formData.phoneNumber}
                            onChange={(e) => onFormDataChange({ ...formData, phoneNumber: e.target.value })}
                        />
                    </div>
                    <div>
                        <Label htmlFor="role">Role</Label>
                        <Select
                            value={formData.roleName}
                            onValueChange={(value) => onFormDataChange({ ...formData, roleName: value })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select a role">
                                    {formData.roleName && roles.find(r => r.name === formData.roleName)?.displayName}
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
                <DialogFooter>
                    <Button variant="outline" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button
                        onClick={onSubmit}
                        className="bg-indigo-600 hover:bg-indigo-700"
                        disabled={!formData.name || !formData.email || !formData.phoneNumber || !formData.roleName}
                    >
                        {submitLabel}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
