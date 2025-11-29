"use client"

import { Sparkles, TrendingUp, AlertCircle, Target, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface Insight {
  id: string
  type: "success" | "warning" | "info" | "action"
  title: string
  description: string
  action?: {
    label: string
    onClick: () => void
  }
  priority: "high" | "medium" | "low"
}

interface AIInsightsCardProps {
  insights: Insight[]
  title?: string
  className?: string
}

export function AIInsightsCard({ insights, title = "AI-Powered Insights", className }: AIInsightsCardProps) {
  const getIcon = (type: Insight["type"]) => {
    switch (type) {
      case "success":
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case "warning":
        return <AlertCircle className="h-4 w-4 text-amber-600" />
      case "action":
        return <Zap className="h-4 w-4 text-blue-600" />
      default:
        return <Target className="h-4 w-4 text-blue-600" />
    }
  }

  const getBadgeColor = (priority: Insight["priority"]) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700 border-red-200"
      case "medium":
        return "bg-amber-100 text-amber-700 border-amber-200"
      default:
        return "bg-blue-100 text-blue-700 border-blue-200"
    }
  }

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Sparkles className="h-5 w-5 text-blue-600" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {insights.map((insight) => (
          <div
            key={insight.id}
            className="flex items-start gap-3 p-3 rounded-lg border bg-gradient-to-r from-blue-50 to-white hover:shadow-sm transition-shadow"
          >
            <div className="mt-0.5">{getIcon(insight.type)}</div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <p className="font-medium text-sm text-gray-900">{insight.title}</p>
                {insight.priority === "high" && (
                  <Badge variant="outline" className={getBadgeColor(insight.priority)}>
                    High Priority
                  </Badge>
                )}
              </div>
              <p className="text-sm text-gray-600">{insight.description}</p>
              {insight.action && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={insight.action.onClick}
                  className="mt-2 h-7 text-xs bg-blue-600 text-white hover:bg-blue-700 border-blue-600"
                >
                  {insight.action.label}
                </Button>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
