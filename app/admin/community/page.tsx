"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, Download, UserPlus, Eye, CheckCircle, XCircle, Trash2, Flag, TrendingUp, Users, MessageSquare, ThumbsUp, BarChart3, Shield, Star, AlertTriangle, Calendar, Target, Plus } from 'lucide-react'

interface CommunityPost {
  id: string
  author: string
  authorId: string
  title: string
  content: string
  category: string
  likes: number
  comments: number
  views: number
  status: "pending" | "approved" | "rejected" | "flagged"
  createdAt: string
  flaggedReason?: string
  isFeatured?: boolean
}

interface TeamMember {
  id: string
  name: string
  email: string
  role: "admin" | "moderator" | "reviewer"
  postsModerated: number
  joinedDate: string
  status: "active" | "inactive"
  permissions: {
    canApprove: boolean
    canReject: boolean
    canDelete: boolean
    canFeature: boolean
    canManageTeam: boolean
  }
}

interface Comment {
  id: string
  authorName: string
  content: string
  status: "pending" | "approved" | "rejected"
  createdAt: string
  likes: number
}

interface Poll {
  id: string
  title: string
  description: string
  status: "active" | "inactive"
  options: { id: string, text: string, votes: number }[]
  totalVotes: number
  endsAt: string
}

interface Badge {
  id: string
  name: string
  description: string
  icon: string
  pointsRequired: number
  criteria: string
}

const mockPosts: CommunityPost[] = [
  {
    id: "POST001",
    author: "Rahul Sharma",
    authorId: "STU001",
    title: "Tips for IELTS Speaking Test",
    content: "Here are some tips that helped me score 8.5 in IELTS speaking...",
    category: "Test Preparation",
    likes: 45,
    comments: 12,
    views: 230,
    status: "approved",
    createdAt: "2024-01-15",
    isFeatured: true,
  },
  {
    id: "POST002",
    author: "Priya Patel",
    authorId: "STU002",
    title: "Scholarship opportunities in Canada",
    content: "I found these amazing scholarship opportunities...",
    category: "Scholarships",
    likes: 78,
    comments: 23,
    views: 456,
    status: "approved",
    createdAt: "2024-01-14",
  },
  {
    id: "POST003",
    author: "Unknown User",
    authorId: "STU003",
    title: "Get Cheap IELTS Certificates!!!",
    content: "Contact me for fake certificates...",
    category: "General",
    likes: 0,
    comments: 0,
    views: 12,
    status: "flagged",
    createdAt: "2024-01-15",
    flaggedReason: "Spam/Scam",
  },
  {
    id: "POST004",
    author: "Amit Kumar",
    authorId: "STU004",
    title: "My experience at University of Toronto",
    content: "Just completed my first semester at UofT...",
    category: "Student Stories",
    likes: 92,
    comments: 34,
    views: 678,
    status: "pending",
    createdAt: "2024-01-15",
  },
]

const mockTeamMembers: TeamMember[] = [
  {
    id: "TEAM001",
    name: "Sarah Johnson",
    email: "sarah.j@wowcap.com",
    role: "admin",
    postsModerated: 245,
    joinedDate: "2023-06-01",
    status: "active",
    permissions: {
      canApprove: true,
      canReject: true,
      canDelete: true,
      canFeature: true,
      canManageTeam: true,
    },
  },
  {
    id: "TEAM002",
    name: "Michael Chen",
    email: "michael.c@wowcap.com",
    role: "moderator",
    postsModerated: 187,
    joinedDate: "2023-08-15",
    status: "active",
    permissions: {
      canApprove: true,
      canReject: true,
      canDelete: false,
      canFeature: true,
      canManageTeam: false,
    },
  },
  {
    id: "TEAM003",
    name: "Emily Davis",
    email: "emily.d@wowcap.com",
    role: "reviewer",
    postsModerated: 98,
    joinedDate: "2023-11-20",
    status: "active",
    permissions: {
      canApprove: false,
      canReject: false,
      canDelete: false,
      canFeature: false,
      canManageTeam: false,
    },
  },
]

const mockComments: Comment[] = [
  {
    id: "COMMENT001",
    authorName: "John Doe",
    content: "Great post!",
    status: "approved",
    createdAt: "2024-01-16",
    likes: 5,
  },
  {
    id: "COMMENT002",
    authorName: "Jane Smith",
    content: "I disagree with this point...",
    status: "pending",
    createdAt: "2024-01-17",
    likes: 2,
  },
]

const mockPolls: Poll[] = [
  {
    id: "POLL001",
    title: "What is your favorite IELTS book?",
    description: "Choose your favorite IELTS preparation book from the list below.",
    status: "active",
    options: [
      { id: "OPT001", text: "Official Guide", votes: 120 },
      { id: "OPT002", text: "Cambridge IELTS", votes: 80 },
    ],
    totalVotes: 200,
    endsAt: "2024-02-01",
  },
]

const mockBadges: Badge[] = [
  {
    id: "BADGE001",
    name: "Discussion Master",
    description: "Awarded to users who have commented on more than 10 posts.",
    icon: "💬",
    pointsRequired: 50,
    criteria: "Comment on more than 10 posts",
  },
]

const mockData = {
  communityPosts: mockPosts,
  communityComments: mockComments,
  communityPolls: mockPolls,
  communityBadges: mockBadges,
}

export default function AdminCommunity() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [selectedPost, setSelectedPost] = useState<CommunityPost | null>(null)
  const [posts, setPosts] = useState<CommunityPost[]>(mockData.communityPosts)
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(mockTeamMembers)
  const [showAddMemberDialog, setShowAddMemberDialog] = useState(false)
  const [showBulkActionDialog, setShowBulkActionDialog] = useState(false)
  const [selectedPosts, setSelectedPosts] = useState<string[]>([])
  const [showCommentDialog, setShowCommentDialog] = useState(false)
  const [showPollDialog, setShowPollDialog] = useState(false)
  const [showBadgeDialog, setShowBadgeDialog] = useState(false)

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || post.status === statusFilter
    const matchesCategory = categoryFilter === "all" || post.category === categoryFilter
    return matchesSearch && matchesStatus && matchesCategory
  })

  const handleApprovePost = (postId: string) => {
    setPosts(posts.map((post) => (post.id === postId ? { ...post, status: "approved" as const } : post)))
  }

  const handleRejectPost = (postId: string) => {
    setPosts(posts.map((post) => (post.id === postId ? { ...post, status: "rejected" as const } : post)))
  }

  const handleDeletePost = (postId: string) => {
    setPosts(posts.filter((post) => post.id !== postId))
  }

  const handleFeaturePost = (postId: string) => {
    setPosts(posts.map((post) => (post.id === postId ? { ...post, isFeatured: !post.isFeatured } : post)))
  }

  const handleBulkAction = (action: "approve" | "reject" | "delete") => {
    selectedPosts.forEach((postId) => {
      if (action === "approve") handleApprovePost(postId)
      else if (action === "reject") handleRejectPost(postId)
      else if (action === "delete") handleDeletePost(postId)
    })
    setSelectedPosts([])
    setShowBulkActionDialog(false)
  }

  const togglePostSelection = (postId: string) => {
    setSelectedPosts((prev) =>
      prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]
    )
  }

  const getStatusBadge = (status: string) => {
    const colors = {
      pending: "bg-amber-100 text-amber-800",
      approved: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
      flagged: "bg-orange-100 text-orange-800",
    }
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  const getRoleBadge = (role: string) => {
    const colors = {
      admin: "bg-blue-100 text-blue-800",
      moderator: "bg-purple-100 text-purple-800",
      reviewer: "bg-green-100 text-green-800",
    }
    return colors[role as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Community Management</h1>
          <p className="text-gray-600">Moderate posts and manage community team</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <BarChart3 className="w-4 h-4 mr-2" />
          View Analytics
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Posts</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{posts.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Review</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {posts.filter((p) => p.status === "pending").length}
                </p>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Flagged</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {posts.filter((p) => p.status === "flagged").length}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <Flag className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Team Members</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{teamMembers.length}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="posts" className="space-y-6">
        <TabsList className="bg-white border">
          <TabsTrigger value="posts" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600">
            Posts Moderation
          </TabsTrigger>
          <TabsTrigger value="comments" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600">
            Comments
          </TabsTrigger>
          <TabsTrigger value="polls" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600">
            Polls & Surveys
          </TabsTrigger>
          <TabsTrigger value="badges" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600">
            Badges & Gamification
          </TabsTrigger>
          <TabsTrigger value="team" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600">
            Team Management
          </TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600">
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search by title or author..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full lg:w-48">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="flagged">Flagged</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-full lg:w-48">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Test Preparation">Test Preparation</SelectItem>
                    <SelectItem value="Scholarships">Scholarships</SelectItem>
                    <SelectItem value="Student Stories">Student Stories</SelectItem>
                    <SelectItem value="General">General</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
                {selectedPosts.length > 0 && (
                  <Dialog open={showBulkActionDialog} onOpenChange={setShowBulkActionDialog}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="bg-blue-50 text-blue-600">
                        Bulk Actions ({selectedPosts.length})
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Bulk Action</DialogTitle>
                      </DialogHeader>
                      <p className="text-sm text-gray-600">
                        You have selected {selectedPosts.length} post(s). Choose an action:
                      </p>
                      <div className="flex gap-2">
                        <Button
                          className="flex-1 bg-green-600 hover:bg-green-700"
                          onClick={() => handleBulkAction("approve")}
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Approve All
                        </Button>
                        <Button
                          className="flex-1 bg-red-600 hover:bg-red-700"
                          onClick={() => handleBulkAction("reject")}
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          Reject All
                        </Button>
                        <Button
                          className="flex-1"
                          variant="destructive"
                          onClick={() => handleBulkAction("delete")}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete All
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Community Posts ({filteredPosts.length})</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="p-4 text-left">
                        <input
                          type="checkbox"
                          checked={selectedPosts.length === filteredPosts.length && filteredPosts.length > 0}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedPosts(filteredPosts.map((p) => p.id))
                            } else {
                              setSelectedPosts([])
                            }
                          }}
                          className="rounded"
                        />
                      </th>
                      <th className="text-left p-4 text-sm font-semibold text-gray-700">Post Details</th>
                      <th className="text-left p-4 text-sm font-semibold text-gray-700">Author</th>
                      <th className="text-left p-4 text-sm font-semibold text-gray-700">Engagement</th>
                      <th className="text-left p-4 text-sm font-semibold text-gray-700">Status</th>
                      <th className="text-left p-4 text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPosts.map((post) => (
                      <tr key={post.id} className="border-b hover:bg-blue-50">
                        <td className="p-4">
                          <input
                            type="checkbox"
                            checked={selectedPosts.includes(post.id)}
                            onChange={() => togglePostSelection(post.id)}
                            className="rounded"
                          />
                        </td>
                        <td className="p-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-semibold text-gray-900">{post.title}</p>
                              {post.isFeatured && <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />}
                              {post.status === "flagged" && <Flag className="w-4 h-4 text-red-500" />}
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{post.category}</p>
                            <p className="text-xs text-gray-500 mt-1">{post.createdAt}</p>
                          </div>
                        </td>
                        <td className="p-4">
                          <p className="text-sm font-medium text-gray-900">{post.author}</p>
                          <p className="text-xs text-gray-500">{post.authorId}</p>
                        </td>
                        <td className="p-4">
                          <div className="flex gap-3 text-sm">
                            <div className="flex items-center text-gray-600">
                              <ThumbsUp className="w-4 h-4 mr-1" />
                              {post.likes}
                            </div>
                            <div className="flex items-center text-gray-600">
                              <MessageSquare className="w-4 h-4 mr-1" />
                              {post.comments}
                            </div>
                            <div className="flex items-center text-gray-600">
                              <Eye className="w-4 h-4 mr-1" />
                              {post.views}
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge className={`${getStatusBadge(post.status)} capitalize`}>{post.status}</Badge>
                          {post.flaggedReason && (
                            <p className="text-xs text-red-600 mt-1">{post.flaggedReason}</p>
                          )}
                        </td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            {post.status === "pending" && (
                              <>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleApprovePost(post.id)}
                                  className="text-green-600 hover:text-green-700 hover:bg-green-50"
                                >
                                  <CheckCircle className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleRejectPost(post.id)}
                                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                >
                                  <XCircle className="w-4 h-4" />
                                </Button>
                              </>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleFeaturePost(post.id)}
                              className="text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50"
                            >
                              <Star className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeletePost(post.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => setSelectedPost(post)}>
                              <Eye className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comments" className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">Moderate user comments on community posts</p>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Comments ({mockData.communityComments?.length || 0})</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                {mockData.communityComments?.map((comment) => (
                  <div key={comment.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold text-sm">{comment.authorName}</span>
                        <span className="text-xs text-gray-500">{comment.createdAt}</span>
                        <Badge className={
                          comment.status === "approved" ? "bg-green-100 text-green-800" :
                          comment.status === "pending" ? "bg-amber-100 text-amber-800" :
                          "bg-red-100 text-red-800"
                        }>
                          {comment.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-700">{comment.content}</p>
                      <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                        <ThumbsUp className="w-3 h-3" />
                        {comment.likes} likes
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {comment.status === "pending" && (
                        <>
                          <Button variant="ghost" size="sm" className="text-green-600">
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600">
                            <XCircle className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                      <Button variant="ghost" size="sm" className="text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="polls" className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">Create and manage community polls and surveys</p>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setShowPollDialog(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create Poll
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockData.communityPolls?.map((poll) => (
              <Card key={poll.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{poll.title}</CardTitle>
                      <p className="text-sm text-gray-600 mt-1">{poll.description}</p>
                    </div>
                    <Badge className={poll.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                      {poll.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {poll.options.map((opt) => (
                      <div key={opt.id}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{opt.text}</span>
                          <span className="font-medium">{opt.votes} votes ({Math.round((opt.votes / poll.totalVotes) * 100)}%)</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${(opt.votes / poll.totalVotes) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t">
                    <p className="text-xs text-gray-600">Total votes: {poll.totalVotes}</p>
                    <p className="text-xs text-gray-600">Ends: {poll.endsAt}</p>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" variant="outline" className="flex-1">Edit</Button>
                    <Button size="sm" variant="outline" className="flex-1 text-red-600">Close Poll</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="badges" className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">Manage community badges and gamification rewards</p>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setShowBadgeDialog(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create Badge
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mockData.communityBadges?.map((badge) => (
              <Card key={badge.id}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{badge.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{badge.name}</h4>
                      <p className="text-xs text-gray-600 mt-1">{badge.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Target className="w-3 h-3 text-blue-600" />
                        <p className="text-xs text-gray-600">{badge.pointsRequired} points</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-xs text-gray-600">{badge.criteria}</p>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" variant="outline" className="flex-1">Edit</Button>
                    <Button size="sm" variant="outline" className="flex-1 text-red-600">Delete</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="team" className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">Manage your community moderation team and their permissions</p>
            <Dialog open={showAddMemberDialog} onOpenChange={setShowAddMemberDialog}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add Team Member
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Team Member</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Name</Label>
                    <Input placeholder="Enter name" />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input type="email" placeholder="Enter email" />
                  </div>
                  <div>
                    <Label>Role</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="moderator">Moderator</SelectItem>
                        <SelectItem value="reviewer">Reviewer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Permissions</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="approve" />
                        <label htmlFor="approve" className="text-sm">Can approve posts</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="reject" />
                        <label htmlFor="reject" className="text-sm">Can reject posts</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="delete" />
                        <label htmlFor="delete" className="text-sm">Can delete posts</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="feature" />
                        <label htmlFor="feature" className="text-sm">Can feature posts</label>
                      </div>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowAddMemberDialog(false)}>
                    Cancel
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700">Add Member</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Team Members ({teamMembers.length})</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="text-left p-4 text-sm font-semibold text-gray-700">Member</th>
                      <th className="text-left p-4 text-sm font-semibold text-gray-700">Role</th>
                      <th className="text-left p-4 text-sm font-semibold text-gray-700">Performance</th>
                      <th className="text-left p-4 text-sm font-semibold text-gray-700">Permissions</th>
                      <th className="text-left p-4 text-sm font-semibold text-gray-700">Status</th>
                      <th className="text-left p-4 text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teamMembers.map((member) => (
                      <tr key={member.id} className="border-b hover:bg-blue-50">
                        <td className="p-4">
                          <div>
                            <p className="font-semibold text-gray-900">{member.name}</p>
                            <p className="text-sm text-gray-600">{member.email}</p>
                            <p className="text-xs text-gray-500">Joined: {member.joinedDate}</p>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge className={`${getRoleBadge(member.role)} capitalize`}>{member.role}</Badge>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Shield className="w-4 h-4 text-blue-600" />
                            <span className="text-sm font-medium">{member.postsModerated} posts</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex flex-wrap gap-1">
                            {member.permissions.canApprove && (
                              <Badge className="bg-green-100 text-green-800 text-xs">Approve</Badge>
                            )}
                            {member.permissions.canReject && (
                              <Badge className="bg-red-100 text-red-800 text-xs">Reject</Badge>
                            )}
                            {member.permissions.canDelete && (
                              <Badge className="bg-orange-100 text-orange-800 text-xs">Delete</Badge>
                            )}
                            {member.permissions.canFeature && (
                              <Badge className="bg-yellow-100 text-yellow-800 text-xs">Feature</Badge>
                            )}
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge
                            className={
                              member.status === "active"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }
                          >
                            {member.status}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                              Remove
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Top Contributors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Rahul Sharma</p>
                      <p className="text-xs text-gray-600">24 posts</p>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Top
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Priya Patel</p>
                      <p className="text-xs text-gray-600">18 posts</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Amit Kumar</p>
                      <p className="text-xs text-gray-600">15 posts</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Popular Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Test Preparation</span>
                      <span className="font-medium">45%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: "45%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Scholarships</span>
                      <span className="font-medium">30%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: "30%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Student Stories</span>
                      <span className="font-medium">25%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: "25%" }} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Moderation Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Today</span>
                    <span className="text-2xl font-bold text-blue-600">12</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">This Week</span>
                    <span className="text-2xl font-bold text-green-600">87</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">This Month</span>
                    <span className="text-2xl font-bold text-purple-600">342</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {selectedPost && (
        <Dialog open={!!selectedPost} onOpenChange={() => setSelectedPost(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{selectedPost.title}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Author: {selectedPost.author}</p>
                  <p className="text-sm text-gray-600">Posted: {selectedPost.createdAt}</p>
                </div>
                <Badge className={`${getStatusBadge(selectedPost.status)} capitalize`}>
                  {selectedPost.status}
                </Badge>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-900">{selectedPost.content}</p>
              </div>
              <div className="flex gap-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <ThumbsUp className="w-4 h-4 mr-1" />
                  {selectedPost.likes} likes
                </div>
                <div className="flex items-center">
                  <MessageSquare className="w-4 h-4 mr-1" />
                  {selectedPost.comments} comments
                </div>
                <div className="flex items-center">
                  <Eye className="w-4 h-4 mr-1" />
                  {selectedPost.views} views
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedPost(null)}>
                Close
              </Button>
              {selectedPost.status === "pending" && (
                <>
                  <Button
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => {
                      handleApprovePost(selectedPost.id)
                      setSelectedPost(null)
                    }}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Approve
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      handleRejectPost(selectedPost.id)
                      setSelectedPost(null)
                    }}
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Reject
                  </Button>
                </>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
