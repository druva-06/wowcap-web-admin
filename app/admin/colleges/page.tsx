"use client"

import { useState } from "react"
import { Search, Plus, Download, Globe, MapPin, Star, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

export default function CollegesPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const abroadColleges = [
    {
      id: 1,
      name: "Harvard University",
      country: "USA",
      city: "Cambridge, MA",
      type: "University",
      rank: "#1 Global",
      isPartner: true,
      courses: 250,
      students: 45,
      logo: "/harvard.jpg",
    },
    {
      id: 2,
      name: "Stanford University",
      country: "USA",
      city: "Stanford, CA",
      type: "University",
      rank: "#2 Global",
      isPartner: true,
      courses: 230,
      students: 38,
      logo: "/stanford-campus.png",
    },
    {
      id: 3,
      name: "MIT",
      country: "USA",
      city: "Cambridge, MA",
      type: "University",
      rank: "#3 Global",
      isPartner: true,
      courses: 180,
      students: 32,
      logo: "/mit.jpg",
    },
    {
      id: 4,
      name: "University of Toronto",
      country: "Canada",
      city: "Toronto, ON",
      type: "University",
      rank: "#18 Global",
      isPartner: true,
      courses: 200,
      students: 28,
      logo: "/toronto.jpg",
    },
    {
      id: 5,
      name: "University of Melbourne",
      country: "Australia",
      city: "Melbourne, VIC",
      type: "University",
      rank: "#14 Global",
      isPartner: true,
      courses: 190,
      students: 25,
      logo: "/melbourne-skyline.png",
    },
    {
      id: 6,
      name: "University of Oxford",
      country: "UK",
      city: "Oxford",
      type: "University",
      rank: "#4 Global",
      isPartner: false,
      courses: 220,
      students: 0,
      logo: "/oxford.jpg",
    },
    {
      id: 7,
      name: "University of Cambridge",
      country: "UK",
      city: "Cambridge",
      type: "University",
      rank: "#5 Global",
      isPartner: false,
      courses: 210,
      students: 0,
      logo: "/cambridge.jpg",
    },
  ]

  const indiaColleges = [
    {
      id: 101,
      name: "IIT Bombay",
      country: "India",
      city: "Mumbai, Maharashtra",
      type: "Institute",
      rank: "#1 India",
      isPartner: false,
      courses: 120,
      students: 0,
      logo: "/iit-bombay-logo.jpg",
    },
    {
      id: 102,
      name: "IIT Delhi",
      country: "India",
      city: "New Delhi",
      type: "Institute",
      rank: "#2 India",
      isPartner: false,
      courses: 115,
      students: 0,
      logo: "/iit-delhi-logo.png",
    },
    {
      id: 103,
      name: "IIM Ahmedabad",
      country: "India",
      city: "Ahmedabad, Gujarat",
      type: "Institute",
      rank: "#1 MBA India",
      isPartner: true,
      courses: 45,
      students: 12,
      logo: "/iim-ahmedabad-logo.jpg",
    },
    {
      id: 104,
      name: "BITS Pilani",
      country: "India",
      city: "Pilani, Rajasthan",
      type: "University",
      rank: "#3 India",
      isPartner: true,
      courses: 80,
      students: 18,
      logo: "/bits-pilani-logo.jpg",
    },
    {
      id: 105,
      name: "Manipal University",
      country: "India",
      city: "Manipal, Karnataka",
      type: "University",
      rank: "#8 India",
      isPartner: true,
      courses: 150,
      students: 35,
      logo: "/manipal-university-logo.jpg",
    },
  ]

  const onlineColleges = [
    {
      id: 201,
      name: "Coursera",
      country: "Global",
      city: "Online Platform",
      type: "Platform",
      rank: "Top Online",
      isPartner: true,
      courses: 5000,
      students: 120,
      logo: "/coursera-logo.png",
    },
    {
      id: 202,
      name: "edX",
      country: "Global",
      city: "Online Platform",
      type: "Platform",
      rank: "Top Online",
      isPartner: true,
      courses: 3500,
      students: 85,
      logo: "/edx-logo.png",
    },
    {
      id: 203,
      name: "University of Phoenix Online",
      country: "USA",
      city: "Online",
      type: "University",
      rank: "Top Online University",
      isPartner: true,
      courses: 200,
      students: 45,
      logo: "/university-of-phoenix-logo.jpg",
    },
    {
      id: 204,
      name: "IGNOU",
      country: "India",
      city: "New Delhi (Online)",
      type: "University",
      rank: "#1 Distance Learning India",
      isPartner: true,
      courses: 180,
      students: 65,
      logo: "/ignou-logo.jpg",
    },
  ]

  const renderCollegeCard = (college: any) => (
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
                  <span>{college.city}</span>
                  <span className="text-gray-400">•</span>
                  <Globe className="h-3 w-3" />
                  <span>{college.country}</span>
                </div>
              </div>
              <div className="flex gap-2">
                {college.isPartner ? (
                  <Badge className="bg-green-100 text-green-700 border-green-200">Partner</Badge>
                ) : (
                  <Badge variant="outline" className="bg-gray-100 text-gray-700">
                    Non-Partner
                  </Badge>
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-4">
              <div>
                <div className="text-xs text-gray-600">Type</div>
                <div className="text-sm font-semibold text-gray-900 mt-1">{college.type}</div>
              </div>
              <div>
                <div className="text-xs text-gray-600">Ranking</div>
                <div className="text-sm font-semibold text-gray-900 mt-1 flex items-center gap-1">
                  <Star className="h-3 w-3 text-yellow-500" />
                  {college.rank}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-600">Courses</div>
                <div className="text-sm font-semibold text-gray-900 mt-1">{college.courses}</div>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-4 pt-4 border-t">
              {college.isPartner ? (
                <>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span>{college.students} students enrolled</span>
                  </div>
                  <Link href={`/admin/colleges/${college.id}`}>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </Link>
                </>
              ) : (
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add as Partner
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">College Database</h1>
          <p className="text-gray-600 mt-1">Comprehensive directory of colleges and universities worldwide</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Link href="/admin/colleges/new">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Add College
            </Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by college name, country, city..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="abroad" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="abroad">Abroad Colleges ({abroadColleges.length})</TabsTrigger>
          <TabsTrigger value="india">India Colleges ({indiaColleges.length})</TabsTrigger>
          <TabsTrigger value="online">Online Colleges ({onlineColleges.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="abroad" className="space-y-4">
          <div className="grid gap-4">{abroadColleges.map(renderCollegeCard)}</div>
        </TabsContent>

        <TabsContent value="india" className="space-y-4">
          <div className="grid gap-4">{indiaColleges.map(renderCollegeCard)}</div>
        </TabsContent>

        <TabsContent value="online" className="space-y-4">
          <div className="grid gap-4">{onlineColleges.map(renderCollegeCard)}</div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
