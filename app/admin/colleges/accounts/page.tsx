"use client"

import { useState } from "react"
import { Search, Plus, Download, Mail, Phone, Lock, Unlock, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

export default function CollegeAccountsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterCountry, setFilterCountry] = useState("all")

  const accounts = [
    {
      id: 1,
      college: "Harvard University",
      country: "USA",
      logo: "/harvard.jpg",
      userName: "Dr. Sarah Johnson",
      email: "partnerships@harvard.edu",
      phone: "+1 617-495-1000",
      role: "Partnership Manager",
      loginEnabled: true,
      lastLogin: "2 hours ago",
      status: "Active",
    },
    {
      id: 2,
      college: "Stanford University",
      country: "USA",
      logo: "/stanford-campus.png",
      userName: "Prof. Michael Chen",
      email: "intl@stanford.edu",
      phone: "+1 650-723-2300",
      role: "International Admissions",
      loginEnabled: true,
      lastLogin: "1 day ago",
      status: "Active",
    },
    {
      id: 3,
      college: "MIT",
      country: "USA",
      logo: "/mit.jpg",
      userName: "Dr. Emily Roberts",
      email: "admissions@mit.edu",
      phone: "+1 617-253-1000",
      role: "Admissions Director",
      loginEnabled: true,
      lastLogin: "3 days ago",
      status: "Active",
    },
    {
      id: 4,
      college: "University of Toronto",
      country: "Canada",
      logo: "/toronto.jpg",
      userName: "Ms. Jennifer Lee",
      email: "international@utoronto.ca",
      phone: "+1 416-978-2011",
      role: "International Relations",
      loginEnabled: false,
      lastLogin: "Never",
      status: "Inactive",
    },
    {
      id: 5,
      college: "University of Melbourne",
      country: "Australia",
      logo: "/melbourne-skyline.png",
      userName: "Mr. David Wilson",
      email: "partners@unimelb.edu.au",
      phone: "+61 3 9035 5511",
      role: "Partnership Coordinator",
      loginEnabled: true,
      lastLogin: "5 hours ago",
      status: "Active",
    },
    {
      id: 6,
      college: "University of British Columbia",
      country: "Canada",
      logo: "/ubc.jpg",
      userName: "Dr. Lisa Anderson",
      email: "intl.admissions@ubc.ca",
      phone: "+1 604-822-2211",
      role: "Admissions Manager",
      loginEnabled: true,
      lastLogin: "1 week ago",
      status: "Active",
    },
    {
      id: 7,
      college: "IIM Ahmedabad",
      country: "India",
      logo: "/iim-ahmedabad-logo.jpg",
      userName: "Prof. Rajesh Kumar",
      email: "admissions@iima.ac.in",
      phone: "+91 79 7152 4800",
      role: "Admissions Head",
      loginEnabled: true,
      lastLogin: "2 days ago",
      status: "Active",
    },
    {
      id: 8,
      college: "BITS Pilani",
      country: "India",
      logo: "/bits-pilani-logo.jpg",
      userName: "Dr. Amit Sharma",
      email: "admissions@pilani.bits-pilani.ac.in",
      phone: "+91 1596 245073",
      role: "International Office",
      loginEnabled: false,
      lastLogin: "Never",
      status: "Inactive",
    },
  ]

  const stats = [
    { title: "Total Accounts", value: accounts.length, color: "text-blue-600", bgColor: "bg-blue-100" },
    {
      title: "Active Accounts",
      value: accounts.filter((a) => a.status === "Active").length,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Login Enabled",
      value: accounts.filter((a) => a.loginEnabled).length,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Inactive Accounts",
      value: accounts.filter((a) => a.status === "Inactive").length,
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
  ]

  const filteredAccounts = accounts.filter((account) => {
    const matchesSearch =
      account.college.toLowerCase().includes(searchQuery.toLowerCase()) ||
      account.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      account.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === "all" || account.status === filterStatus
    const matchesCountry = filterCountry === "all" || account.country === filterCountry
    return matchesSearch && matchesStatus && matchesCountry
  })

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">College Partner Accounts</h1>
          <p className="text-gray-600 mt-1">Manage login access for college partners</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Account
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-lg transition-transform duration-300 hover:scale-110`}>
                  <Lock className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by college, name, or email..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={filterCountry} onValueChange={setFilterCountry}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Countries</SelectItem>
                <SelectItem value="USA">USA</SelectItem>
                <SelectItem value="Canada">Canada</SelectItem>
                <SelectItem value="Australia">Australia</SelectItem>
                <SelectItem value="India">India</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {filteredAccounts.map((account) => (
          <Card key={account.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <img
                  src={account.logo || "/placeholder.svg"}
                  alt={account.college}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{account.college}</h3>
                      <p className="text-sm text-gray-600">{account.country}</p>
                    </div>
                    <Badge
                      className={
                        account.status === "Active"
                          ? "bg-green-100 text-green-700 border-green-200"
                          : "bg-red-100 text-red-700 border-red-200"
                      }
                    >
                      {account.status}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div>
                      <div className="text-xs text-gray-600">User Name</div>
                      <div className="text-sm font-semibold text-gray-900 mt-1">{account.userName}</div>
                      <div className="text-xs text-gray-600 mt-1">{account.role}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-600">Contact Information</div>
                      <div className="text-sm text-gray-900 mt-1 flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {account.email}
                      </div>
                      <div className="text-sm text-gray-900 mt-1 flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {account.phone}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-600">Last Login</div>
                      <div className="text-sm font-semibold text-gray-900 mt-1">{account.lastLogin}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        {account.loginEnabled ? (
                          <Unlock className="h-4 w-4 text-green-600" />
                        ) : (
                          <Lock className="h-4 w-4 text-red-600" />
                        )}
                        <span className="text-sm text-gray-600">Login Access</span>
                      </div>
                      <Switch checked={account.loginEnabled} />
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        View Activity
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
