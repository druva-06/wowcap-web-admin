"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Building2, Search, Filter, Eye, Edit, Power, DollarSign, FileText, TrendingUp, MapPin } from "lucide-react"
import Link from "next/link"

export default function CollegePartnersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const collegePartners = [
    {
      id: 1,
      name: "Harvard University",
      country: "USA",
      city: "Cambridge, MA",
      logo: "/harvard.jpg",
      status: "active",
      applications: 45,
      revenue: "₹12.5L",
      commission: "15%",
      lastLogin: "2 hours ago",
      contactPerson: "Dr. John Smith",
      email: "john.smith@harvard.edu",
      phone: "+1 617-495-1000",
    },
    {
      id: 2,
      name: "Stanford University",
      country: "USA",
      city: "Stanford, CA",
      logo: "/stanford-campus.png",
      status: "active",
      applications: 38,
      revenue: "₹10.8L",
      commission: "15%",
      lastLogin: "5 hours ago",
      contactPerson: "Dr. Sarah Johnson",
      email: "sarah.j@stanford.edu",
      phone: "+1 650-723-2300",
    },
    {
      id: 3,
      name: "MIT",
      country: "USA",
      city: "Cambridge, MA",
      logo: "/mit.jpg",
      status: "active",
      applications: 32,
      revenue: "₹9.2L",
      commission: "14%",
      lastLogin: "1 day ago",
      contactPerson: "Prof. Michael Brown",
      email: "m.brown@mit.edu",
      phone: "+1 617-253-1000",
    },
    {
      id: 4,
      name: "University of Toronto",
      country: "Canada",
      city: "Toronto, ON",
      logo: "/toronto.jpg",
      status: "active",
      applications: 28,
      revenue: "₹8.5L",
      commission: "13%",
      lastLogin: "3 hours ago",
      contactPerson: "Dr. Emily Chen",
      email: "e.chen@utoronto.ca",
      phone: "+1 416-978-2011",
    },
    {
      id: 5,
      name: "University of Melbourne",
      country: "Australia",
      city: "Melbourne, VIC",
      logo: "/melbourne-skyline.png",
      status: "active",
      applications: 25,
      revenue: "₹7.8L",
      commission: "12%",
      lastLogin: "6 hours ago",
      contactPerson: "Dr. James Wilson",
      email: "j.wilson@unimelb.edu.au",
      phone: "+61 3 9035 5511",
    },
    {
      id: 6,
      name: "Oxford University",
      country: "UK",
      city: "Oxford",
      logo: "/oxford.jpg",
      status: "active",
      applications: 22,
      revenue: "₹6.9L",
      commission: "14%",
      lastLogin: "4 hours ago",
      contactPerson: "Prof. David Taylor",
      email: "d.taylor@ox.ac.uk",
      phone: "+44 1865 270000",
    },
    {
      id: 7,
      name: "Cambridge University",
      country: "UK",
      city: "Cambridge",
      logo: "/cambridge.jpg",
      status: "active",
      applications: 20,
      revenue: "₹6.2L",
      commission: "14%",
      lastLogin: "8 hours ago",
      contactPerson: "Dr. Robert Anderson",
      email: "r.anderson@cam.ac.uk",
      phone: "+44 1223 337733",
    },
    {
      id: 8,
      name: "University of British Columbia",
      country: "Canada",
      city: "Vancouver, BC",
      logo: "/ubc.jpg",
      status: "active",
      applications: 18,
      revenue: "₹5.8L",
      commission: "12%",
      lastLogin: "12 hours ago",
      contactPerson: "Dr. Lisa Martinez",
      email: "l.martinez@ubc.ca",
      phone: "+1 604-822-2211",
    },
    {
      id: 9,
      name: "University of Sydney",
      country: "Australia",
      city: "Sydney, NSW",
      logo: "/sydney-opera-house-harbour.png",
      status: "active",
      applications: 16,
      revenue: "₹5.2L",
      commission: "12%",
      lastLogin: "1 day ago",
      contactPerson: "Dr. Amanda White",
      email: "a.white@sydney.edu.au",
      phone: "+61 2 9351 2222",
    },
    {
      id: 10,
      name: "Imperial College London",
      country: "UK",
      city: "London",
      logo: "/imperial.jpg",
      status: "active",
      applications: 15,
      revenue: "₹4.8L",
      commission: "13%",
      lastLogin: "2 days ago",
      contactPerson: "Prof. Thomas Green",
      email: "t.green@imperial.ac.uk",
      phone: "+44 20 7589 5111",
    },
    {
      id: 11,
      name: "ETH Zurich",
      country: "Switzerland",
      city: "Zurich",
      logo: "/eth.jpg",
      status: "inactive",
      applications: 12,
      revenue: "₹3.9L",
      commission: "13%",
      lastLogin: "1 week ago",
      contactPerson: "Dr. Hans Mueller",
      email: "h.mueller@ethz.ch",
      phone: "+41 44 632 11 11",
    },
    {
      id: 12,
      name: "National University of Singapore",
      country: "Singapore",
      city: "Singapore",
      logo: "/nus.jpg",
      status: "active",
      applications: 14,
      revenue: "₹4.5L",
      commission: "12%",
      lastLogin: "5 hours ago",
      contactPerson: "Dr. Wei Zhang",
      email: "w.zhang@nus.edu.sg",
      phone: "+65 6516 6666",
    },
    {
      id: 13,
      name: "McGill University",
      country: "Canada",
      city: "Montreal, QC",
      logo: "/mcgill.jpg",
      status: "active",
      applications: 13,
      revenue: "₹4.2L",
      commission: "12%",
      lastLogin: "7 hours ago",
      contactPerson: "Dr. Marie Dubois",
      email: "m.dubois@mcgill.ca",
      phone: "+1 514-398-4455",
    },
    {
      id: 14,
      name: "University of Auckland",
      country: "New Zealand",
      city: "Auckland",
      logo: "/auckland.jpg",
      status: "active",
      applications: 11,
      revenue: "₹3.5L",
      commission: "11%",
      lastLogin: "10 hours ago",
      contactPerson: "Dr. Peter Thompson",
      email: "p.thompson@auckland.ac.nz",
      phone: "+64 9 373 7999",
    },
    {
      id: 15,
      name: "Technical University of Munich",
      country: "Germany",
      city: "Munich",
      logo: "/tum.jpg",
      status: "inactive",
      applications: 9,
      revenue: "₹2.8L",
      commission: "11%",
      lastLogin: "2 weeks ago",
      contactPerson: "Prof. Klaus Schmidt",
      email: "k.schmidt@tum.de",
      phone: "+49 89 289 01",
    },
  ]

  const filteredPartners = collegePartners.filter((partner) => {
    const matchesSearch =
      partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.city.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || partner.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const stats = {
    total: collegePartners.length,
    active: collegePartners.filter((p) => p.status === "active").length,
    inactive: collegePartners.filter((p) => p.status === "inactive").length,
    totalRevenue: "₹85.5L",
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">College Partners</h1>
          <p className="text-gray-500 mt-1">Manage your college partnerships and track performance</p>
        </div>
        <Link href="/admin/partners/colleges/new">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Building2 className="w-4 h-4 mr-2" />
            Add College Partner
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Total Partners</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.total}</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <Building2 className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Active Partners</p>
              <p className="text-3xl font-bold text-green-600 mt-2">{stats.active}</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Inactive Partners</p>
              <p className="text-3xl font-bold text-red-600 mt-2">{stats.inactive}</p>
            </div>
            <div className="bg-red-50 p-3 rounded-lg">
              <Power className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Total Revenue</p>
              <p className="text-3xl font-bold text-orange-600 mt-2">{stats.totalRevenue}</p>
            </div>
            <div className="bg-orange-50 p-3 rounded-lg">
              <DollarSign className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search by college name, country, or city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-200 rounded-lg px-4 py-2 text-sm"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {filteredPartners.map((partner) => (
            <Card key={partner.id} className="p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <img
                    src={partner.logo || "/placeholder.svg"}
                    alt={partner.name}
                    className="w-16 h-16 rounded-lg object-cover border border-gray-200"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{partner.name}</h3>
                      <Badge variant={partner.status === "active" ? "default" : "secondary"}>
                        {partner.status === "active" ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {partner.city}, {partner.country}
                      </div>
                      <div className="flex items-center gap-1">
                        <FileText className="w-4 h-4" />
                        {partner.applications} Applications
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        {partner.revenue} Revenue
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Contact Person</p>
                        <p className="font-medium text-gray-900">{partner.contactPerson}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Commission Rate</p>
                        <p className="font-medium text-gray-900">{partner.commission}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Last Login</p>
                        <p className="font-medium text-gray-900">{partner.lastLogin}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link href={`/admin/partners/colleges/${partner.id}`}>
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                  </Link>
                  <Link href={`/admin/partners/colleges/${partner.id}/edit`}>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    className={partner.status === "active" ? "text-red-600" : "text-green-600"}
                  >
                    <Power className="w-4 h-4 mr-2" />
                    {partner.status === "active" ? "Disable" : "Enable"}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredPartners.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No college partners found</p>
          </div>
        )}
      </Card>
    </div>
  )
}
