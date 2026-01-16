"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Mail, Clock, CheckCircle, XCircle, RotateCw, Trash2 } from 'lucide-react'
import { InvitationResponseDto } from "@/lib/api/invitations"
import { formatDistanceToNow } from 'date-fns'

interface PendingInvitationsListProps {
    invitations: InvitationResponseDto[]
    onResend: (invitationId: number) => void
    onRevoke: (invitationId: number) => void
}

export function PendingInvitationsList({
    invitations,
    onResend,
    onRevoke
}: PendingInvitationsListProps) {

    const getStatusBadge = (status: string, isExpired: boolean) => {
        if (isExpired) {
            return <Badge variant="destructive">Expired</Badge>
        }

        switch (status) {
            case "PENDING":
                return <Badge variant="secondary"><Clock className="w-3 h-3 mr-1" />Pending</Badge>
            case "ACTIVE":
                return <Badge variant="default"><CheckCircle className="w-3 h-3 mr-1" />Active</Badge>
            case "EXPIRED":
                return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />Expired</Badge>
            case "REVOKED":
                return <Badge variant="outline"><XCircle className="w-3 h-3 mr-1" />Revoked</Badge>
            default:
                return <Badge variant="outline">{status}</Badge>
        }
    }

    if (invitations.length === 0) {
        return (
            <Card>
                <CardContent className="py-8 text-center text-gray-500">
                    <Mail className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>No pending invitations</p>
                </CardContent>
            </Card>
        )
    }

    return (
        <div className="space-y-3">
            {invitations.map((invitation) => (
                <Card key={invitation.id}>
                    <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                        <Mail className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">{invitation.email}</h4>
                                        <p className="text-sm text-gray-500">
                                            {invitation.firstName && invitation.lastName
                                                ? `${invitation.firstName} ${invitation.lastName}`
                                                : invitation.username || 'No name provided'}
                                        </p>
                                    </div>
                                </div>

                                <div className="ml-13 space-y-1">
                                    <div className="flex items-center gap-4 text-sm">
                                        <span className="text-gray-500">Role:</span>
                                        <Badge variant="outline">{invitation.roleDisplayName}</Badge>
                                    </div>

                                    <div className="flex items-center gap-4 text-sm">
                                        <span className="text-gray-500">Status:</span>
                                        {getStatusBadge(invitation.status, invitation.isExpired)}
                                    </div>

                                    <div className="flex items-center gap-4 text-sm text-gray-500">
                                        <span>Invited {formatDistanceToNow(new Date(invitation.invitedAt), { addSuffix: true })}</span>
                                        <span>•</span>
                                        <span>Expires {formatDistanceToNow(new Date(invitation.expiresAt), { addSuffix: true })}</span>
                                    </div>

                                    <div className="text-xs text-gray-400">
                                        Invited by: {invitation.invitedByName}
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                {invitation.canResend && (
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => onResend(invitation.id)}
                                        title="Resend invitation"
                                    >
                                        <RotateCw className="w-4 h-4" />
                                    </Button>
                                )}

                                {invitation.canRevoke && (
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => onRevoke(invitation.id)}
                                        title="Revoke invitation"
                                    >
                                        <Trash2 className="w-4 h-4 text-red-500" />
                                    </Button>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
