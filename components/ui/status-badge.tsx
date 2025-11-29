import type React from "react"
import { cn } from "@/lib/utils"

interface StatusBadgeProps {
  status: "active" | "inactive" | "pending" | "hot" | "warm" | "cold"
  children: React.ReactNode
  className?: string
}

export function StatusBadge({ status, children, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium",
        {
          "badge-active": status === "active",
          "badge-inactive": status === "inactive",
          "badge-pending": status === "pending",
          "badge-hot": status === "hot",
          "badge-warm": status === "warm",
          "badge-cold": status === "cold",
        },
        className,
      )}
    >
      {children}
    </span>
  )
}
