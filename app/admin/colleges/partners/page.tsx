"use client"

import { useState } from "react"
import { Search, Download, MapPin, TrendingUp, DollarSign, FileText, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

export default function PartnerCollegesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterCountry, setFilterCountry] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

  const partnerColleges = [
    {
      id: 1,
      name: "Harvard University",
      country: "USA",
      city: "Cambridge, MA",
      logo: "/harvard.jpg",
      status: "Active",
      commissionType: "Commission Only",
      commissionRate: "15%",
      applications: 45,
      revenue: "₹85.2L",
      courses: 250,
      contactPerson: "Dr. Sarah Johnson",
      email: "partnerships@harvard.edu",
      phone: "+1 617-495-1000",
    },
    {
      id: 2,
      name: "Stanford University",
      country: "USA",
      city: "Stanford, CA",
      logo: "/stanford-campus.png",
      status: "Active",
      commissionType: "Service Charge + Commission",
      commissionRate: "12% + ₹50K",
      applications: 38,
      revenue: "₹72.5L",
      courses: 230,
      contactPerson: "Prof. Michael Chen",
      email: "intl@stanford.edu",
      phone: "+1 650-723-2300",
    },
    {
      id: 3,
      name: "MIT",
      country: "USA",
      city: "Cambridge, MA",
      logo: "/mit.jpg",
      status: "Active",
      commissionType: "Commission Only",
      commissionRate: "18%",
      applications: 32,
      revenue: "₹68.8L",
      courses: 180,
      contactPerson: "Dr. Emily Roberts",
      email: "admissions@mit.edu",
      phone: "+1 617-253-1000",
    },
    {
      id: 4,
      name: "University of Toronto",
      country: "Canada",
      city: "Toronto, ON",
      logo: "/toronto.jpg",
      status: "Active",
      commissionType: "Service Charge Only",
      commissionRate: "₹75K per student",
      applications: 28,
      revenue: "₹21.0L",
      courses: 200,
      contactPerson: "Ms. Jennifer Lee",
      email: "international@utoronto.ca",
      phone: "+1 416-978-2011",
    },
    {
      id: 5,
      name: "University of Melbourne",
      country: "Australia",
      city: "Melbourne, VIC",
      logo: "/melbourne-skyline.png",
      status: "Active",
      commissionType: "Commission Only",
      commissionRate: "20%",
      applications: 25,
      revenue: "₹58.5L",
      courses: 190,
      contactPerson: "Mr. David Wilson",
      email: "partners@unimelb.edu.au",
      phone: "+61 3 9035 5511",
    },
    {
      id: 6,
      name: "University of British Columbia",
      country: "Canada",
      city: "Vancouver, BC",
      logo: "/ubc.jpg",
      status: "Active",
      commissionType: "Service Charge + Commission",
      commissionRate: "10% + ₹40K",
      applications: 22,
      revenue: "₹45.2L",
      courses: 175,
      contactPerson: "Dr. Lisa Anderson",
      email: "intl.admissions@ubc.ca",
      phone: "+1 604-822-2211",
    },
    {
      id: 103,
      name: "IIM Ahmedabad",
      country: "India",
      city: "Ahmedabad, Gujarat",
      logo: "/iim-ahmedabad-logo.jpg",
      status: "Active",
      commissionType: "Service Charge Only",
      commissionRate: "₹1.5L per student",
      applications: 12,
      revenue: "₹18.0L",
      courses: 45,
      contactPerson: "Prof. Rajesh Kumar",
      email: "admissions@iima.ac.in",
      phone: "+91 79 7152 4800",
    },
    {
      id: 104,
      name: "BITS Pilani",
      country: "India",
      city: "Pilani, Rajasthan",
      logo: "/bits-pilani-logo.jpg",
      status: "Active",
      commissionType: "Commission Only",
      commissionRate: "8%",
      applications: 18,
      revenue: "₹12.5L",
      courses: 80,
      contactPerson: "Dr. Amit Sharma",
      email: "admissions@pilani.bits-pilani.ac.in",
      phone: "+91 1596 245073",
    },
    {
      id: 105,
      name: "Manipal University",
      country: "India",
      city: "Manipal, Karnataka",
      logo: "/manipal-university-logo.jpg",
      status: "Active",
      commissionType: "Service Charge + Commission",
      commissionRate: "5% + ₹25K",
      applications: 35,
      revenue: "₹28.5L",
      courses: 150,
      contactPerson: "Ms. Priya Menon",
      email: "international@manipal.edu",
      phone: "+91 820 292 3000",
    },
    {
      id: 201,
      name: "Coursera",
      country: "Global",
      city: "Online Platform",
      logo: "/coursera-logo.png",
      status: "Active",
      commissionType: "Commission Only",
      commissionRate: "25%",
      applications: 120,
      revenue: "₹95.0L",
      courses: 5000,
      contactPerson: "Mr. James Miller",
      email: "partners@coursera.org",
      phone: "+1 650-963-9884",
    },
  ]

  const stats = [
    {
      title: "Total Partner Colleges",
      value: partnerColleges.length,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Total Applications",
      value: partnerColleges.reduce((sum, college) => sum + college.applications, 0),
      icon: FileText,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Total Revenue",
      value: "₹505.2L",
      icon: DollarSign,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Active Partnerships",
      value: partnerColleges.filter((c) => c.status === "Active").length,
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ]

  const filteredColleges = partnerColleges.filter((college) => {
    const matchesSearch =
      college.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      college.city.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCountry = filterCountry === "all" || college.country === filterCountry
    const matchesStatus = filterStatus === "all" || college.status === filterStatus
    return matchesSearch && matchesCountry && matchesStatus
  })

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Partner Colleges Directory</h1>
          <p className="text-gray-600 mt-1">Manage partnerships with colleges and universities</p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
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
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
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
                placeholder="Search by college name or city..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={filterCountry} onValueChange={setFilterCountry}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Countries</SelectItem>
                <SelectItem value="USA">USA</SelectItem>
                <SelectItem value="Canada">Canada</SelectItem>
                <SelectItem value="Australia">Australia</SelectItem>
                <SelectItem value="India">India</SelectItem>
                <SelectItem value="Global">Global</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by Status" />
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
        {filteredColleges.map((college) => (
          <Card key={college.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <img
                  src={college.logo || "/placeholder.svg"}
                  alt={college.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{college.name}</h3>
                      <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                        <MapPin className="h-3 w-3" />
                        <span>
                          {college.city}, {college.country}
                        </span>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-700 border-green-200">{college.status}</Badge>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
                    <div>
                      <div className="text-xs text-gray-600">Commission Type</div>
                      <div className="text-sm font-semibold text-gray-900 mt-1">{college.commissionType}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-600">Commission Rate</div>
                      <div className="text-sm font-semibold text-gray-900 mt-1">{college.commissionRate}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-600">Applications</div>
                      <div className="text-sm font-semibold text-gray-900 mt-1">{college.applications}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-600">Revenue</div>
                      <div className="text-sm font-semibold text-green-600 mt-1">{college.revenue}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-600">Courses</div>
                      <div className="text-sm font-semibold text-gray-900 mt-1">{college.courses}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t">
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Contact:</span> {college.contactPerson} • {college.email}
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/admin/colleges/${college.id}`}>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </Link>
                      <Link href={`/admin/colleges/commission?college=${college.id}`}>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          Manage Commission
                        </Button>
                      </Link>
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
