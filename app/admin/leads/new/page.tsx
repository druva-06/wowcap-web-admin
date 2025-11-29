"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, Check, User, GraduationCap, Target } from "lucide-react"

export default function AddNewLeadPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 3

  // Form state
  const [formData, setFormData] = useState({
    // Step 1: Personal Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    alternatePhone: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    country: "India",
    pincode: "",

    // Step 2: Academic Background
    currentEducation: "",
    degree: "",
    university: "",
    percentage: "",
    yearOfPassing: "",
    workExperience: "",
    ielts: "",
    toefl: "",
    gre: "",
    gmat: "",

    // Step 3: Preferences & Budget
    preferredCountries: [] as string[],
    preferredCourses: [] as string[],
    preferredCollege: "",
    intake: "",
    budget: "",
    source: "",
    assignedTo: "",
    notes: "",
  })

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    console.log("[v0] Submitting lead:", formData)
    router.push("/admin/leads")
  }

  const handleSaveDraft = () => {
    console.log("[v0] Saving draft:", formData)
    router.push("/admin/leads")
  }

  const progressPercentage = (currentStep / totalSteps) * 100

  const steps = [
    { number: 1, title: "Personal Information", icon: User },
    { number: 2, title: "Academic Background", icon: GraduationCap },
    { number: 3, title: "Preferences & Budget", icon: Target },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => router.back()} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Add New Lead</h1>
            <p className="text-sm text-gray-600 mt-1">Fill in the lead information to add to the system</p>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={handleSaveDraft}>
          Save as Draft
        </Button>
      </div>

      {/* Progress Bar */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-700">
                Step {currentStep} of {totalSteps}
              </p>
              <p className="text-sm text-gray-600">{Math.round(progressPercentage)}% Complete</p>
            </div>
            <Progress value={progressPercentage} className="h-2" />
            <div className="flex items-center justify-between">
              {steps.map((step, index) => {
                const Icon = step.icon
                const isCompleted = currentStep > step.number
                const isCurrent = currentStep === step.number
                return (
                  <div key={step.number} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          isCompleted
                            ? "bg-green-600 text-white"
                            : isCurrent
                              ? "bg-blue-600 text-white"
                              : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {isCompleted ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                      </div>
                      <p
                        className={`text-xs mt-2 text-center ${
                          isCurrent ? "font-semibold text-blue-600" : "text-gray-600"
                        }`}
                      >
                        {step.title}
                      </p>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`w-24 h-0.5 mx-2 ${isCompleted ? "bg-green-600" : "bg-gray-200"}`} />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Step 1: Personal Information */}
      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>
                  First Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  placeholder="Enter first name"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>
                  Last Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  placeholder="Enter last name"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>
                  Phone Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Alternate Phone</Label>
                <Input
                  type="tel"
                  placeholder="+91 98765 43211"
                  value={formData.alternatePhone}
                  onChange={(e) => handleInputChange("alternatePhone", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Date of Birth</Label>
                <Input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Gender</Label>
                <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Country</Label>
                <Select value={formData.country} onValueChange={(value) => handleInputChange("country", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="India">India</SelectItem>
                    <SelectItem value="USA">USA</SelectItem>
                    <SelectItem value="UK">UK</SelectItem>
                    <SelectItem value="Canada">Canada</SelectItem>
                    <SelectItem value="Australia">Australia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Address</Label>
              <Textarea
                placeholder="Enter full address"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                rows={3}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>City</Label>
                <Input
                  placeholder="Enter city"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>State</Label>
                <Input
                  placeholder="Enter state"
                  value={formData.state}
                  onChange={(e) => handleInputChange("state", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Pincode</Label>
                <Input
                  placeholder="Enter pincode"
                  value={formData.pincode}
                  onChange={(e) => handleInputChange("pincode", e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Academic Background */}
      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-purple-600" />
              Academic Background
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>
                  Current Education Level <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.currentEducation}
                  onValueChange={(value) => handleInputChange("currentEducation", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select education level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12th">12th Grade</SelectItem>
                    <SelectItem value="diploma">Diploma</SelectItem>
                    <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                    <SelectItem value="masters">Master's Degree</SelectItem>
                    <SelectItem value="phd">PhD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Degree/Course</Label>
                <Input
                  placeholder="e.g., B.Tech in Computer Science"
                  value={formData.degree}
                  onChange={(e) => handleInputChange("degree", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>University/College</Label>
                <Input
                  placeholder="Enter university name"
                  value={formData.university}
                  onChange={(e) => handleInputChange("university", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Percentage/CGPA</Label>
                <Input
                  placeholder="e.g., 85% or 8.5 CGPA"
                  value={formData.percentage}
                  onChange={(e) => handleInputChange("percentage", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Year of Passing</Label>
                <Input
                  placeholder="e.g., 2020"
                  value={formData.yearOfPassing}
                  onChange={(e) => handleInputChange("yearOfPassing", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Work Experience (if any)</Label>
                <Input
                  placeholder="e.g., 3 years at TCS"
                  value={formData.workExperience}
                  onChange={(e) => handleInputChange("workExperience", e.target.value)}
                />
              </div>
            </div>

            <div className="pt-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Test Scores</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label>IELTS Score</Label>
                  <Input
                    placeholder="e.g., 7.5"
                    value={formData.ielts}
                    onChange={(e) => handleInputChange("ielts", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>TOEFL Score</Label>
                  <Input
                    placeholder="e.g., 100"
                    value={formData.toefl}
                    onChange={(e) => handleInputChange("toefl", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>GRE Score</Label>
                  <Input
                    placeholder="e.g., 320"
                    value={formData.gre}
                    onChange={(e) => handleInputChange("gre", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>GMAT Score</Label>
                  <Input
                    placeholder="e.g., 700"
                    value={formData.gmat}
                    onChange={(e) => handleInputChange("gmat", e.target.value)}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Preferences & Budget */}
      {currentStep === 3 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-orange-600" />
              Preferences & Budget
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>
                  Preferred Countries <span className="text-red-500">*</span>
                </Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select countries" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usa">USA</SelectItem>
                    <SelectItem value="uk">UK</SelectItem>
                    <SelectItem value="canada">Canada</SelectItem>
                    <SelectItem value="australia">Australia</SelectItem>
                    <SelectItem value="germany">Germany</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>
                  Preferred Courses <span className="text-red-500">*</span>
                </Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select courses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cs">Computer Science</SelectItem>
                    <SelectItem value="ds">Data Science</SelectItem>
                    <SelectItem value="ai">AI/ML</SelectItem>
                    <SelectItem value="mba">MBA</SelectItem>
                    <SelectItem value="engineering">Engineering</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Preferred College (if any)</Label>
                <Input
                  placeholder="e.g., Harvard University"
                  value={formData.preferredCollege}
                  onChange={(e) => handleInputChange("preferredCollege", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>
                  Intake <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.intake} onValueChange={(value) => handleInputChange("intake", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select intake" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fall2024">Fall 2024</SelectItem>
                    <SelectItem value="spring2025">Spring 2025</SelectItem>
                    <SelectItem value="fall2025">Fall 2025</SelectItem>
                    <SelectItem value="spring2026">Spring 2026</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>
                  Budget <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.budget} onValueChange={(value) => handleInputChange("budget", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10-15">₹10-15 Lakhs</SelectItem>
                    <SelectItem value="15-20">₹15-20 Lakhs</SelectItem>
                    <SelectItem value="20-25">₹20-25 Lakhs</SelectItem>
                    <SelectItem value="25-30">₹25-30 Lakhs</SelectItem>
                    <SelectItem value="30+">₹30+ Lakhs</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>
                  Lead Source <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.source} onValueChange={(value) => handleInputChange("source", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="website">Website</SelectItem>
                    <SelectItem value="facebook">Facebook Ads</SelectItem>
                    <SelectItem value="google">Google Ads</SelectItem>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="referral">Referral</SelectItem>
                    <SelectItem value="walkin">Walk-in</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>
                  Assign To <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.assignedTo} onValueChange={(value) => handleInputChange("assignedTo", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select counselor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="amit">Amit Counselor</SelectItem>
                    <SelectItem value="priya">Priya Counselor</SelectItem>
                    <SelectItem value="ravi">Ravi Counselor</SelectItem>
                    <SelectItem value="sneha">Sneha Counselor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Additional Notes</Label>
              <Textarea
                placeholder="Add any additional notes or comments..."
                value={formData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                rows={4}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation Buttons */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="gap-2 bg-transparent"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </Button>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={handleSaveDraft}>
                Save as Draft
              </Button>
              {currentStep < totalSteps ? (
                <Button onClick={handleNext} className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
                  Next
                  <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700 text-white gap-2">
                  <Check className="w-4 h-4" />
                  Submit Lead
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
