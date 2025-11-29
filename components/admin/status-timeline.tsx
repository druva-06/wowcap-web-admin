"use client"

import { Check, Clock, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface TimelineEvent {
  id: string
  title: string
  description?: string
  timestamp: string
  status: "completed" | "pending" | "failed"
  user?: string
}

interface StatusTimelineProps {
  events: TimelineEvent[]
  title?: string
}

export function StatusTimeline({ events, title = "Activity Timeline" }: StatusTimelineProps) {
  const getStatusIcon = (status: TimelineEvent["status"]) => {
    switch (status) {
      case "completed":
        return <Check className="h-4 w-4 text-green-600" />
      case "failed":
        return <AlertCircle className="h-4 w-4 text-red-600" />
      default:
        return <Clock className="h-4 w-4 text-amber-600" />
    }
  }

  const getStatusColor = (status: TimelineEvent["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-100 border-green-300"
      case "failed":
        return "bg-red-100 border-red-300"
      default:
        return "bg-amber-100 border-amber-300"
    }
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map((event, index) => (
            <div key={event.id} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className={`rounded-full p-1.5 border-2 ${getStatusColor(event.status)}`}>
                  {getStatusIcon(event.status)}
                </div>
                {index < events.length - 1 && <div className="w-0.5 h-full bg-gray-200 mt-1" />}
              </div>
              <div className="flex-1 pb-4">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-sm text-gray-900">{event.title}</p>
                  <span className="text-xs text-gray-500">{event.timestamp}</span>
                </div>
                {event.description && <p className="text-sm text-gray-600 mt-1">{event.description}</p>}
                {event.user && <p className="text-xs text-gray-500 mt-1">by {event.user}</p>}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
