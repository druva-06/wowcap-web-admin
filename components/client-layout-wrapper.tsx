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

  return (
    <AuthProvider>
      {isAdminRoute ? (
        // Admin routes: no header, footer, or chatbot
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
