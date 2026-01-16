"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import {
    Users,
    Calendar,
    CheckSquare,
    MessageCircle,
    FileText,
    Phone,
    Video,
    Clock,
} from "lucide-react"

export function CounselorDashboardView() {
    const { user } = useAuth()

    return (
        <div className="space-y-6">
            {/* Welcome Card */}
            <Card className="border-0 shadow-lg bg-gradient-to-r from-green-600 to-teal-600 text-white">
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold mb-2">Welcome back, {user?.name}! 👋</h2>
                            <p className="text-green-100">Student Counselor Dashboard</p>
                        </div>
                        <div className="text-6xl opacity-20">👩‍🏫</div>
                    </div>
                </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <Users className="w-6 h-6 text-blue-600" />
                            </div>
                            <div className="ml-4">
                                <div className="text-2xl font-bold">42</div>
                                <div className="text-sm text-gray-600">Assigned Students</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-purple-100 rounded-lg">
                                <CheckSquare className="w-6 h-6 text-purple-600" />
                            </div>
                            <div className="ml-4">
                                <div className="text-2xl font-bold">12</div>
                                <div className="text-sm text-gray-600">Pending Tasks</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-orange-100 rounded-lg">
                                <Calendar className="w-6 h-6 text-orange-600" />
                            </div>
                            <div className="ml-4">
                                <div className="text-2xl font-bold">8</div>
                                <div className="text-sm text-gray-600">Today's Appointments</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <FileText className="w-6 h-6 text-green-600" />
                            </div>
                            <div className="ml-4">
                                <div className="text-2xl font-bold">45</div>
                                <div className="text-sm text-gray-600">Applications</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Today's Schedule & Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-orange-600" />
                            Today's Schedule
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[
                                { time: "10:00 AM", student: "John Doe", type: "University Selection", duration: "30 min" },
                                { time: "11:30 AM", student: "Jane Smith", type: "Application Review", duration: "45 min" },
                                { time: "2:00 PM", student: "Bob Wilson", type: "Visa Guidance", duration: "60 min" },
                                { time: "4:00 PM", student: "Alice Brown", type: "Test Preparation", duration: "30 min" },
                            ].map((appointment, index) => (
                                <div key={index} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg">
                                    <div className="w-16 text-sm font-medium text-gray-600">{appointment.time}</div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">{appointment.student}</p>
                                        <p className="text-xs text-gray-500">
                                            {appointment.type} • {appointment.duration}
                                        </p>
                                    </div>
                                    <div className="flex space-x-2">
                                        <Button variant="outline" size="sm">
                                            <Video className="w-4 h-4" />
                                        </Button>
                                        <Button variant="outline" size="sm">
                                            <Phone className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Clock className="w-5 h-5 text-blue-600" />
                            Recent Activity
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg">
                                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                    <CheckSquare className="w-5 h-5 text-green-600" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium">Task completed for John Doe</p>
                                    <p className="text-xs text-gray-500">IELTS registration - 2 hours ago</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg">
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                    <MessageCircle className="w-5 h-5 text-blue-600" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium">Message sent to Jane Smith</p>
                                    <p className="text-xs text-gray-500">Application status update - 4 hours ago</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg">
                                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                    <Calendar className="w-5 h-5 text-purple-600" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium">Appointment scheduled</p>
                                    <p className="text-xs text-gray-500">Bob Wilson - Tomorrow 2:00 PM</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Student Progress Overview */}
            <Card>
                <CardHeader>
                    <CardTitle>Student Progress Overview</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {[
                            { name: "John Doe", program: "Computer Science", progress: 75, status: "On Track" },
                            { name: "Jane Smith", program: "MBA", progress: 90, status: "Excellent" },
                            { name: "Bob Wilson", program: "Engineering", progress: 60, status: "Needs Attention" },
                            { name: "Alice Brown", program: "Medicine", progress: 85, status: "Good" },
                        ].map((student, index) => (
                            <div key={index} className="p-4 border rounded-lg hover:bg-gray-50">
                                <div className="flex items-center justify-between mb-2">
                                    <div>
                                        <h4 className="font-medium text-gray-900">{student.name}</h4>
                                        <p className="text-sm text-gray-600">{student.program}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-bold text-gray-900">{student.progress}%</p>
                                        <p className="text-sm text-gray-600">{student.status}</p>
                                    </div>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className={`h-2 rounded-full ${student.progress >= 80
                                                ? "bg-green-500"
                                                : student.progress >= 60
                                                    ? "bg-yellow-500"
                                                    : "bg-red-500"
                                            }`}
                                        style={{ width: `${student.progress}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
