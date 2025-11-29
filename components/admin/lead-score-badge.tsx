"use client"

import { Badge } from "@/components/ui/badge"
import { Flame, Sun, Snowflake } from "lucide-react"

interface LeadScoreBadgeProps {
  score: number
  showIcon?: boolean
  size?: "sm" | "md" | "lg"
}

export function LeadScoreBadge({ score, showIcon = true, size = "md" }: LeadScoreBadgeProps) {
  const getTemperature = (score: number) => {
    if (score >= 80) return { label: "Hot", color: "bg-red-100 text-red-700 border-red-300", icon: Flame }
    if (score >= 60) return { label: "Warm", color: "bg-amber-100 text-amber-700 border-amber-300", icon: Sun }
    return { label: "Cold", color: "bg-blue-100 text-blue-700 border-blue-300", icon: Snowflake }
  }

  const temp = getTemperature(score)
  const Icon = temp.icon

  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-2.5 py-1",
    lg: "text-base px-3 py-1.5",
  }

  return (
    <Badge variant="outline" className={`${temp.color} ${sizeClasses[size]} font-semibold`}>
      {showIcon && <Icon className="h-3 w-3 mr-1" />}
      {score}/100 {temp.label}
    </Badge>
  )
}
