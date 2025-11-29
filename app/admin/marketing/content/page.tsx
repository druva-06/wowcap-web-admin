"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Eye, Heart, MessageCircle, Plus, Download, Edit } from "lucide-react"

export default function ContentMarketingPage() {
  const stats = [
    {
      title: "Total Articles",
      value: "48",
      change: "+12 this month",
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Total Views",
      value: "28.5K",
      change: "+18.5%",
      icon: Eye,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Engagement",
      value: "2.4K",
      change: "+12.3%",
      icon: Heart,
      color: "text-pink-600",
      bgColor: "bg-pink-50",
    },
    {
      title: "Leads Generated",
      value: "45",
      change: "+8.2%",
      icon: MessageCircle,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ]

  const blogPosts = [
    {
      id: 1,
      title: "Complete Guide to Studying in USA - 2024",
      category: "Study Guides",
      status: "published",
      publishDate: "2024-01-20",
      views: "3.2K",
      likes: 245,
      comments: 34,
      shares: 89,
      leads: 12,
    },
    {
      id: 2,
      title: "Top 10 Scholarships for Indian Students",
      category: "Scholarships",
      status: "published",
      publishDate: "2024-01-15",
      views: "2.8K",
      likes: 198,
      comments: 28,
      shares: 67,
      leads: 9,
    },
    {
      id: 3,
      title: "MBA Abroad: ROI Analysis and Career Prospects",
      category: "Career Advice",
      status: "published",
      publishDate: "2024-01-10",
      views: "2.1K",
      likes: 156,
      comments: 21,
      shares: 45,
      leads: 8,
    },
    {
      id: 4,
      title: "Student Visa Process - Step by Step Guide",
      category: "Visa Guidance",
      status: "draft",
      publishDate: "2024-02-01",
      views: "-",
      likes: 0,
      comments: 0,
      shares: 0,
      leads: 0,
    },
  ]

  const videos = [
    {
      id: 1,
      title: "Study in Canada - Complete Guide",
      platform: "YouTube",
      status: "published",
      publishDate: "2024-01-18",
      views: "5.6K",
      likes: 456,
      comments: 89,
      shares: 123,
      leads: 18,
    },
    {
      id: 2,
      title: "UK Universities - Application Process",
      platform: "YouTube",
      status: "published",
      publishDate: "2024-01-12",
      views: "4.2K",
      likes: 389,
      comments: 67,
      shares: 98,
      leads: 15,
    },
  ]

  const ebooks = [
    {
      id: 1,
      title: "Ultimate Guide to Study Abroad",
      pages: 45,
      downloads: 234,
      leads: 156,
      status: "published",
    },
    {
      id: 2,
      title: "Scholarship Application Handbook",
      pages: 32,
      downloads: 189,
      leads: 98,
      status: "published",
    },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Content Marketing</h1>
          <p className="text-gray-500 mt-1">Manage blog posts, videos, and downloadable content</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            New Content
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-lg ${stat.bgColor} transition-transform duration-300 hover:scale-110`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className="text-xs text-green-600 mt-1">{stat.change}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Blog Posts & Articles</CardTitle>
          <CardDescription>Track performance of blog content</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {blogPosts.map((post) => (
              <div key={post.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-gray-900">{post.title}</h3>
                    <Badge variant={post.status === "published" ? "default" : "secondary"}>{post.status}</Badge>
                    <Badge variant="outline">{post.category}</Badge>
                  </div>
                  <div className="grid grid-cols-6 gap-4 mt-3">
                    <div>
                      <p className="text-xs text-gray-500">Published</p>
                      <p className="text-sm font-semibold text-gray-900">
                        {new Date(post.publishDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Views</p>
                      <p className="text-sm font-semibold text-gray-900">{post.views}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Likes</p>
                      <p className="text-sm font-semibold text-gray-900">{post.likes}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Comments</p>
                      <p className="text-sm font-semibold text-gray-900">{post.comments}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Shares</p>
                      <p className="text-sm font-semibold text-gray-900">{post.shares}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Leads</p>
                      <p className="text-sm font-semibold text-green-600">{post.leads}</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Video Content</CardTitle>
            <CardDescription>YouTube and video marketing performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {videos.map((video) => (
                <div key={video.id} className="p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="font-semibold text-gray-900">{video.title}</h3>
                    <Badge variant="outline">{video.platform}</Badge>
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Views</p>
                      <p className="text-sm font-semibold text-gray-900">{video.views}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Likes</p>
                      <p className="text-sm font-semibold text-gray-900">{video.likes}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Comments</p>
                      <p className="text-sm font-semibold text-gray-900">{video.comments}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Leads</p>
                      <p className="text-sm font-semibold text-green-600">{video.leads}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>E-books & Guides</CardTitle>
            <CardDescription>Downloadable content performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {ebooks.map((ebook) => (
                <div key={ebook.id} className="p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="font-semibold text-gray-900">{ebook.title}</h3>
                    <Badge variant="default">{ebook.status}</Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Pages</p>
                      <p className="text-sm font-semibold text-gray-900">{ebook.pages}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Downloads</p>
                      <p className="text-sm font-semibold text-gray-900">{ebook.downloads}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Leads</p>
                      <p className="text-sm font-semibold text-green-600">{ebook.leads}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
