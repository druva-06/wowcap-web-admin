"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { useAuth } from "@/lib/auth-context"

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [portalType, setPortalType] = useState<"admin" | "college" | "subagent">("admin")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (!formData.email || !formData.password) {
        toast({
          title: "Validation Error",
          description: "Please fill in all required fields",
          variant: "destructive",
        })
        setLoading(false)
        return
      }

      if (portalType === "admin") {
        const success = await login(formData.email, formData.password)

        if (success) {
          toast({
            title: "Login Successful",
            description: "Welcome back!",
          })
          router.push("/admin/dashboard")
        } else {
          toast({
            title: "Login Failed",
            description: "Invalid email or password. Please try again.",
            variant: "destructive",
          })
        }
      } else {
        // For college and subagent, use the old flow (they don't use AuthContext yet)
        await new Promise((resolve) => setTimeout(resolve, 1000))

        toast({
          title: "Login Successful",
          description: "Welcome back!",
        })

        if (portalType === "college") {
          router.push("/college/dashboard")
        } else {
          router.push("/subagent/dashboard")
        }
      }
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Please check your credentials and try again",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDemoLogin = async (email: string, password: string) => {
    setLoading(true)
    const success = await login(email, password)

    if (success) {
      toast({
        title: "Demo Login Successful",
        description: "Welcome back!",
      })
      router.push("/admin/dashboard")
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid credentials",
        variant: "destructive",
      })
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">W</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">WowCap</span>
          </Link>
          <p className="text-gray-600 mt-2">Sign in to your account</p>
        </div>

        <Card className="border-0 shadow-xl">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl">Select Portal</CardTitle>
            <div className="flex justify-center gap-2 mt-4">
              <Button
                type="button"
                variant={portalType === "admin" ? "default" : "outline"}
                size="sm"
                onClick={() => setPortalType("admin")}
                className="text-xs"
              >
                Super Admin
              </Button>
              <Button
                type="button"
                variant={portalType === "college" ? "default" : "outline"}
                size="sm"
                onClick={() => setPortalType("college")}
                className="text-xs"
              >
                College Partner
              </Button>
              <Button
                type="button"
                variant={portalType === "subagent" ? "default" : "outline"}
                size="sm"
                onClick={() => setPortalType("subagent")}
                className="text-xs"
              >
                Sub-Agent
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10 pr-10"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700">
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <span>Sign In</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </Button>
            </form>

            {portalType === "admin" && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-xs font-semibold text-blue-900 mb-3">Demo Credentials (Click to login):</p>
                <div className="space-y-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleDemoLogin("admin@wowcap.com", "admin123")}
                    className="w-full justify-start text-xs"
                    disabled={loading}
                  >
                    <strong className="mr-2">Admin:</strong> admin@wowcap.com / admin123
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleDemoLogin("manager@wowcap.com", "manager123")}
                    className="w-full justify-start text-xs"
                    disabled={loading}
                  >
                    <strong className="mr-2">Manager:</strong> manager@wowcap.com / manager123
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleDemoLogin("counselor@wowcap.com", "counselor123")}
                    className="w-full justify-start text-xs"
                    disabled={loading}
                  >
                    <strong className="mr-2">Counselor:</strong> counselor@wowcap.com / counselor123
                  </Button>
                </div>
              </div>
            )}

            {portalType !== "admin" && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-xs font-semibold text-blue-900 mb-2">Demo Credentials:</p>
                <div className="space-y-1 text-xs text-blue-700">
                  <p>
                    <strong>College:</strong> college@university.edu / password
                  </p>
                  <p>
                    <strong>Sub-Agent:</strong> agent@agency.com / password
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <p className="text-center text-sm text-gray-600 mt-6">© 2025 WowCap. All rights reserved.</p>
      </div>
    </div>
  )
}
