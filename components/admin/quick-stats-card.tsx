"use client"

import type { LucideIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"

interface QuickStatsCardProps {
  title: string
  value: string | number
  change?: {
    value: number
    label: string
  }
  icon: LucideIcon
  trend?: "up" | "down"
}

export function QuickStatsCard({ title, value, change, icon: Icon, trend }: QuickStatsCardProps) {
  return (
    <Card className="border border-gray-200 hover:shadow-md transition-shadow">
      <CardContent className="p-3 md:p-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-gray-600 text-xs font-medium">{title}</p>
            <p className="text-xl md:text-2xl font-bold text-gray-900">{value}</p>
            {change && (
              <div className="flex items-center gap-1 text-xs">
                {trend === "up" ? (
                  <TrendingUp className="h-3 w-3 text-green-600" />
                ) : trend === "down" ? (
                  <TrendingDown className="h-3 w-3 text-red-600" />
                ) : null}
                <span
                  className={trend === "up" ? "text-green-600" : trend === "down" ? "text-red-600" : "text-gray-600"}
                >
                  {change.value > 0 ? "+" : ""}
                  {change.value}%
                </span>
              </div>
            )}
          </div>
          <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Icon className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
