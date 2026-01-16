import { UserResponseDto } from "@/lib/api/users"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Edit2, Trash2, Key, MoreVertical, Mail, Phone, UserCog } from "lucide-react"

interface UserListItemProps {
    user: UserResponseDto
    onEdit: (user: UserResponseDto) => void
    onDelete: (user: UserResponseDto) => void
    onManagePermissions: (user: UserResponseDto) => void
}

export function UserListItem({ user, onEdit, onDelete, onManagePermissions }: UserListItemProps) {
    const getInitials = () => {
        const firstInitial = user.firstName?.charAt(0) || user.email.charAt(0)
        const lastInitial = user.lastName?.charAt(0) || user.email.charAt(1) || ''
        return `${firstInitial}${lastInitial}`.toUpperCase()
    }

    const getFullName = () => {
        if (user.firstName && user.lastName) {
            return `${user.firstName} ${user.lastName}`
        }
        return user.username || user.email
    }

    return (
        <div className="p-4 border rounded-lg hover:shadow-md transition-shadow bg-white">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">
                        {getInitials()}
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-gray-900">
                                {getFullName()}
                            </h3>
                            <Badge className="bg-indigo-100 text-indigo-700">
                                {user.role}
                            </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                                <Mail className="w-3 h-3" />
                                {user.email}
                            </div>
                            <div className="flex items-center gap-1">
                                <Phone className="w-3 h-3" />
                                {user.phoneNumber}
                            </div>
                            <div className="flex items-center gap-1">
                                <UserCog className="w-3 h-3" />
                                @{user.username}
                            </div>
                        </div>
                    </div>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                            <MoreVertical className="w-4 h-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onEdit(user)}>
                            <Edit2 className="w-4 h-4 mr-2" />
                            Edit User
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onManagePermissions(user)}>
                            <Key className="w-4 h-4 mr-2" />
                            Manage Permissions
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={() => onDelete(user)}
                            className="text-red-600"
                        >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete User
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}
