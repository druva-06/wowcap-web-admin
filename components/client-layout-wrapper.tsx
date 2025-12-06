"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import AIChatbot from "@/components/ai-chatbot"
import { AuthProvider } from "@/lib/auth-context"

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdminRoute = pathname?.startsWith("/admin")
  const isCollegeRoute = pathname?.startsWith("/college")
  const isSubagentRoute = pathname?.startsWith("/subagent")
  const isDashboardRoute = isAdminRoute || isCollegeRoute || isSubagentRoute

  return (
    <AuthProvider>
      {isDashboardRoute ? (
        // Dashboard routes (admin, college, subagent): no header, footer, or chatbot
        <>{children}</>
      ) : (
        // Regular routes: include header, footer, and chatbot
        <>
          <Header />
          <main>{children}</main>
          <Footer />
          <AIChatbot />
        </>
      )}
    </AuthProvider>
  )
}
