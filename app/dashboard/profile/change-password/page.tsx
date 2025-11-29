"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Lock, ArrowLeft, Eye, EyeOff, Shield, CheckCircle } from "lucide-react"

export default function ChangePasswordPage() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  })

  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const validatePassword = (password: string) => {
    const minLength = password.length >= 8
    const hasUpper = /[A-Z]/.test(password)
    const hasLower = /[a-z]/.test(password)
    const hasNumber = /\d/.test(password)
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password)

    return {
      minLength,
      hasUpper,
      hasLower,
      hasNumber,
      hasSpecial,
      isValid: minLength && hasUpper && hasLower && hasNumber && hasSpecial,
    }
  }

  const passwordValidation = validatePassword(formData.newPassword)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Clear errors when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }))
    }
  }

  const handleSubmit = async () => {
    const newErrors: { [key: string]: string } = {}

    if (!formData.currentPassword) {
      newErrors.currentPassword = "Current password is required"
    }

    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required"
    } else if (!passwordValidation.isValid) {
      newErrors.newPassword = "Password does not meet requirements"
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your new password"
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)

    // Show success message and redirect
    alert("Password changed successfully!")
    router.push("/dashboard/profile")
  }

  const togglePasswordVisibility = (field: "current" | "new" | "confirm") => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <Button variant="ghost" onClick={() => router.back()} className="mb-4 text-blue-600 hover:bg-blue-50">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Profile
          </Button>

          <div>
            <h1 className="text-3xl font-bold text-gray-900">Change Password</h1>
            <p className="text-gray-600">Update your account password</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Change Password Form */}
          <Card className="border-0 shadow-lg border-l-4 border-l-blue-500">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lock className="w-5 h-5 text-blue-600" />
                <span>Password Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Current Password */}
              <div>
                <label className="text-sm font-medium text-gray-600 mb-2 block">Current Password *</label>
                <div className="relative">
                  <Input
                    type={showPasswords.current ? "text" : "password"}
                    value={formData.currentPassword}
                    onChange={(e) => handleInputChange("currentPassword", e.target.value)}
                    className={`border-gray-300 focus:border-blue-500 focus:ring-blue-500 pr-10 ${errors.currentPassword ? "border-red-500" : ""}`}
                    placeholder="Enter your current password"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("current")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.currentPassword && <p className="text-red-500 text-xs mt-1">{errors.currentPassword}</p>}
              </div>

              {/* New Password */}
              <div>
                <label className="text-sm font-medium text-gray-600 mb-2 block">New Password *</label>
                <div className="relative">
                  <Input
                    type={showPasswords.new ? "text" : "password"}
                    value={formData.newPassword}
                    onChange={(e) => handleInputChange("newPassword", e.target.value)}
                    className={`border-gray-300 focus:border-blue-500 focus:ring-blue-500 pr-10 ${errors.newPassword ? "border-red-500" : ""}`}
                    placeholder="Enter your new password"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("new")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.newPassword && <p className="text-red-500 text-xs mt-1">{errors.newPassword}</p>}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="text-sm font-medium text-gray-600 mb-2 block">Confirm New Password *</label>
                <div className="relative">
                  <Input
                    type={showPasswords.confirm ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    className={`border-gray-300 focus:border-blue-500 focus:ring-blue-500 pr-10 ${errors.confirmPassword ? "border-red-500" : ""}`}
                    placeholder="Confirm your new password"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("confirm")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
              </div>
            </CardContent>
          </Card>

          {/* Password Requirements */}
          <Card className="border-0 shadow-lg border-l-4 border-l-green-500">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-green-600" />
                <span>Password Requirements</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div
                  className={`flex items-center space-x-2 ${passwordValidation.minLength ? "text-green-600" : "text-gray-400"}`}
                >
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm">At least 8 characters long</span>
                </div>
                <div
                  className={`flex items-center space-x-2 ${passwordValidation.hasUpper ? "text-green-600" : "text-gray-400"}`}
                >
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm">Contains uppercase letter</span>
                </div>
                <div
                  className={`flex items-center space-x-2 ${passwordValidation.hasLower ? "text-green-600" : "text-gray-400"}`}
                >
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm">Contains lowercase letter</span>
                </div>
                <div
                  className={`flex items-center space-x-2 ${passwordValidation.hasNumber ? "text-green-600" : "text-gray-400"}`}
                >
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm">Contains number</span>
                </div>
                <div
                  className={`flex items-center space-x-2 ${passwordValidation.hasSpecial ? "text-green-600" : "text-gray-400"}`}
                >
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm">Contains special character</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isLoading || !passwordValidation.isValid}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Lock className="w-4 h-4 mr-2" />
              {isLoading ? "Updating..." : "Update Password"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
