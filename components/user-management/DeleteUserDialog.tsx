import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { UserResponseDto } from "@/lib/api/users"

interface DeleteUserDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    user: UserResponseDto | null
    onConfirm: () => void
    onCancel: () => void
}

export function DeleteUserDialog({ open, onOpenChange, user, onConfirm, onCancel }: DeleteUserDialogProps) {
    const getUserDisplayName = () => {
        if (!user) return ''
        if (user.firstName && user.lastName) {
            return `${user.firstName} ${user.lastName}`
        }
        return user.username || user.email
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete User</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this user? This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                {user && (
                    <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                        <p className="font-semibold text-red-900">
                            {getUserDisplayName()}
                        </p>
                        <p className="text-sm text-red-700">{user.email}</p>
                    </div>
                )}
                <DialogFooter>
                    <Button variant="outline" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button
                        onClick={onConfirm}
                        className="bg-red-600 hover:bg-red-700 text-white"
                    >
                        Delete User
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
