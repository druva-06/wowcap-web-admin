"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar, Clock, ArrowRight, TrendingUp, Users, BookOpen, Search, Eye, Heart, MessageCircle, Share2, Bookmark, ChevronLeft, ChevronRight, Award, Briefcase, GraduationCap, Sparkles, Target, Filter } from 'lucide-react'
import Image from "next/image"
import { useState, useEffect, useRef } from "react"

export default function StoriesPage() {
  const [activeHeroIndex, setActiveHeroIndex] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [bookmarkedStories, setBookmarkedStories] = useState<number[]>([])
  const [studentFilter, setStudentFilter] = useState("all")
  const [personalityFilter, setPersonalityFilter] = useState("all")
  const [industryFilter, setIndustryFilter] = useState("tech")
  const [showFilterDialog, setShowFilterDialog] = useState(false)
  
  const authorScrollRef = useRef<HTMLDivElement>(null)
  const collectionsScrollRef = useRef<HTMLDivElement>(null)
  const trendingScrollRef = useRef<HTMLDivElement>(null)
  const studentScrollRef = useRef<HTMLDivElement>(null)
  const personalityScrollRef = useRef<HTMLDivElement>(null)
  const industryScrollRef = useRef<HTMLDivElement>(null)

  const featuredStories = [
    {
      id: 1,
      title: "From Small Town Dreams to MIT: A Complete Journey",
      excerpt: "How determination and proper guidance helped me secure admission to MIT with full scholarship",
      author: "Priya Sharma",
      authorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      university: "MIT",
      date: "Dec 15, 2024",
      readTime: "12 min read",
      category: "Success Story",
      image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=1200&h=600&fit=crop",
      views: "52.5K",
      likes: "4.2K",
      comments: "567",
      shares: "1.2K",
    },
    {
      id: 2,
      title: "Failed Twice, Succeeded Third Time: My IIT Journey",
      excerpt: "The real story of perseverance, failure, and ultimate success that nobody tells you about",
      author: "Arjun Mehta",
      authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      university: "IIT Delhi",
      date: "Dec 12, 2024",
      readTime: "15 min read",
      category: "Struggle Story",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&h=600&fit=crop",
      views: "78.3K",
      likes: "8.1K",
      comments: "1.2K",
      shares: "2.8K",
    },
    {
      id: 3,
      title: "Single Mother to PhD Scholar: Against All Odds",
      excerpt: "How I balanced parenting, work, and studies to achieve my dream of becoming a researcher",
      author: "Dr. Meera Krishnan",
      authorImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop",
      university: "Oxford University",
      date: "Dec 10, 2024",
      readTime: "18 min read",
      category: "Inspiring Story",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&h=600&fit=crop",
      views: "95.7K",
      likes: "12.4K",
      comments: "2.1K",
      shares: "4.5K",
    },
  ]

  const storyAuthors = [
    {
      id: 'latest',
      name: 'Latest',
      image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=80&h=80&fit=crop',
      type: 'category',
      count: '250+',
      gradient: 'from-blue-500 to-blue-600',
      icon: Sparkles
    },
    {
      id: 'featured',
      name: 'Featured',
      image: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=80&h=80&fit=crop',
      type: 'category',
      count: '100+',
      gradient: 'from-purple-500 to-purple-600',
      icon: Award
    },
    {
      id: 'trending',
      name: 'Hot',
      image: 'https://images.unsplash.com/photo-1525183995014-bd94c0750cd5?w=80&h=80&fit=crop',
      type: 'category',
      count: '50+',
      gradient: 'from-orange-500 to-red-600',
      icon: TrendingUp
    },
    {
      id: 1,
      name: 'Priya Sharma',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop',
      type: 'author',
      university: 'MIT',
      stories: 8,
      hasNew: true
    },
    {
      id: 2,
      name: 'Arjun Mehta',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop',
      type: 'author',
      university: 'IIT Delhi',
      stories: 5,
      hasNew: true
    },
    {
      id: 3,
      name: 'Meera K.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop',
      type: 'author',
      university: 'Oxford',
      stories: 12,
      hasNew: false
    },
    {
      id: 4,
      name: 'Rahul Verma',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop',
      type: 'author',
      university: 'Stanford',
      stories: 6,
      hasNew: true
    },
    {
      id: 5,
      name: 'Sneha Gupta',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop',
      type: 'author',
      university: 'Harvard',
      stories: 9,
      hasNew: false
    },
    {
      id: 6,
      name: 'Karthik Reddy',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop',
      type: 'author',
      university: 'Cambridge',
      stories: 7,
      hasNew: true
    },
    {
      id: 7,
      name: 'Ananya Roy',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop',
      type: 'author',
      university: 'Yale',
      stories: 4,
      hasNew: false
    },
    {
      id: 8,
      name: 'Vikram Singh',
      image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=80&h=80&fit=crop',
      type: 'author',
      university: 'Berkeley',
      stories: 11,
      hasNew: true
    },
  ]

  const curatedCollections = [
    {
      id: 1,
      title: 'From Failure to Top Universities',
      description: '15 inspiring comeback stories',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=500&h=300&fit=crop',
      count: 15,
      gradient: 'from-orange-500 to-red-500'
    },
    {
      id: 2,
      title: 'Scholarship Success Secrets',
      description: 'How students secured full funding',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=500&h=300&fit=crop',
      count: 23,
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      id: 3,
      title: 'First Generation Abroad',
      description: 'Pioneering students share journeys',
      image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=500&h=300&fit=crop',
      count: 18,
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      id: 4,
      title: 'Career Pivot Success',
      description: 'Mid-career switches that worked',
      image: 'https://images.unsplash.com/photo-1522202176988-6627375f55f?w=500&h=300&fit=crop',
      count: 12,
      gradient: 'from-purple-500 to-pink-500'
    },
  ]

  const trendingStories = [
    { id: 1, title: "Failed 3 Times Before IIT: Worth Every Struggle", views: "78K", category: "Real Struggle", badge: "struggle" },
    { id: 2, title: "From Village School to Stanford PhD", views: "65K", category: "Success Story", badge: "success" },
    { id: 3, title: "Rejected by 10 Universities, Accepted by MIT", views: "52K", category: "Comeback", badge: "comeback" },
    { id: 4, title: "Working 2 Jobs While Studying Abroad", views: "48K", category: "Student Life", badge: "learning" },
    { id: 5, title: "Parent's Sacrifice for Child's Education", views: "42K", category: "Parent Story", badge: "inspiring" },
  ]

  const studentStories = [
    {
      id: 4,
      title: "Stanford MBA Journey: From Corporate to Business School",
      excerpt: "My transition from 5 years at Infosys to Stanford's prestigious MBA program and the lessons learned",
      author: "Rahul Verma",
      authorImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop",
      date: "Dec 8, 2024",
      readTime: "9 min read",
      category: "MBA Journey",
      badge: "success",
      image: "https://images.unsplash.com/photo-1562774053-701939374585?w=450&h=300&fit=crop",
      views: "28.2K",
      likes: "3.4K",
      comments: "456",
      shares: "892",
    },
    {
      id: 5,
      title: "Rejected 7 Times: How I Finally Got into Oxford",
      excerpt: "The brutal reality of university applications and how persistence and strategy finally paid off",
      author: "Sneha Patel",
      authorImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop",
      date: "Dec 6, 2024",
      readTime: "11 min read",
      category: "Real Struggle",
      badge: "struggle",
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=450&h=300&fit=crop",
      views: "45.6K",
      likes: "6.2K",
      comments: "892",
      shares: "1.8K",
    },
    {
      id: 6,
      title: "Zero to Hero: Failed JEE, Now at MIT for PhD",
      excerpt: "How I turned my biggest failure into fuel for success and made it to one of the world's best universities",
      author: "Karthik Reddy",
      authorImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=40&h=40&fit=crop",
      date: "Dec 4, 2024",
      readTime: "14 min read",
      category: "Comeback Story",
      badge: "comeback",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=450&h=300&fit=crop",
      views: "62.8K",
      likes: "8.9K",
      comments: "1.2K",
      shares: "2.4K",
    },
    {
      id: 7,
      title: "Learning German While Working: My Experience in Berlin",
      excerpt: "Balancing part-time work, studies, and learning a new language as an international student",
      author: "Ananya Sharma",
      authorImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop",
      date: "Dec 2, 2024",
      readTime: "8 min read",
      category: "Student Life",
      badge: "learning",
      image: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=450&h=300&fit=crop",
      views: "19.4K",
      likes: "2.1K",
      comments: "234",
      shares: "567",
    },
  ]

  const inspiringPersonalities = [
    {
      id: 8,
      title: "From High School Dropout to MIT Professor",
      excerpt: "Dr. Sarah Johnson shares her unconventional journey to becoming one of the most respected AI researchers",
      author: "Dr. Sarah Johnson",
      authorImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop",
      role: "Professor of AI, MIT",
      date: "Nov 30, 2024",
      readTime: "20 min read",
      category: "Faculty",
      type: "faculty",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=450&h=300&fit=crop",
      views: "34.5K",
      likes: "4.8K",
      comments: "678",
      achievement: "Published 150+ research papers",
    },
    {
      id: 9,
      title: "Sold Everything to Fund Daughter's Harvard Dream",
      excerpt: "A parent's unwavering commitment and the sacrifices that made a dream education possible",
      author: "Rajesh & Kavitha Kumar",
      authorImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
      role: "Parents",
      date: "Nov 28, 2024",
      readTime: "12 min read",
      category: "Parents",
      type: "parent",
      image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=450&h=300&fit=crop",
      views: "56.2K",
      likes: "9.4K",
      comments: "1.5K",
      achievement: "Daughter now at Harvard Medical School",
    },
    {
      id: 10,
      title: "Building a Billion Dollar Company from Dorm Room",
      excerpt: "Tech entrepreneur shares lessons from starting a unicorn while still in university",
      author: "Vikram Malhotra",
      authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
      role: "CEO, TechVentures",
      date: "Nov 26, 2024",
      readTime: "15 min read",
      category: "Industry Leader",
      type: "industry",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=450&h=300&fit=crop",
      views: "42.8K",
      likes: "5.9K",
      comments: "892",
      achievement: "Founded $1.2B company",
    },
    {
      id: 11,
      title: "Teaching Innovation: Transforming Education in Rural India",
      excerpt: "How one teacher's innovative methods are changing lives and inspiring a generation",
      author: "Prof. Anand Deshmukh",
      authorImage: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=100&h=100&fit=crop",
      role: "Education Innovator",
      date: "Nov 24, 2024",
      readTime: "10 min read",
      category: "Faculty",
      type: "faculty",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da00a0b?w=450&h=300&fit=crop",
      views: "28.6K",
      likes: "3.7K",
      comments: "456",
      achievement: "Impacted 50,000+ students",
    },
  ]

  const industryInsights = [
    {
      id: 12,
      title: "AI Revolution: From Garage Startup to Global Phenomenon",
      excerpt: "How artificial intelligence started as a research project and became the most transformative technology of our time",
      author: "Tech Analysts",
      authorImage: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop",
      date: "Nov 25, 2024",
      readTime: "18 min read",
      category: "Tech Evolution",
      topic: "tech",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=450&h=300&fit=crop",
      views: "68.9K",
      likes: "8.8K",
      comments: "1.2K",
      shares: "2.5K",
      stats: { growth: "400%", jobs: "5M+", companies: "15K+" },
    },
    {
      id: 13,
      title: "The Rise of Remote Work: Future of Global Careers",
      excerpt: "How the pandemic accelerated a decade of change and created unprecedented opportunities for global talent",
      author: "Career Experts",
      authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop",
      date: "Nov 23, 2024",
      readTime: "14 min read",
      category: "Career Paths",
      topic: "career",
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=450&h=300&fit=crop",
      views: "52.4K",
      likes: "6.2K",
      comments: "892",
      shares: "1.8K",
      stats: { growth: "300%", workers: "35M", savings: "$4K/yr" },
    },
    {
      id: 14,
      title: "EdTech Boom: How Online Learning Became Mainstream",
      excerpt: "The transformation of education through technology and what it means for students worldwide",
      author: "Education Analysts",
      authorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop",
      date: "Nov 21, 2024",
      readTime: "12 min read",
      category: "Education Revolution",
      topic: "education",
      image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=450&h=300&fit=crop",
      views: "39.6K",
      likes: "4.9K",
      comments: "678",
      shares: "1.2K",
      stats: { growth: "250%", learners: "200M", market: "$350B" },
    },
    {
      id: 15,
      title: "Green Technology: Careers Saving the Planet",
      excerpt: "Why sustainability careers are the fastest growing and highest paying fields for the next generation",
      author: "Sustainability Experts",
      authorImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop",
      date: "Nov 19, 2024",
      readTime: "16 min read",
      category: "Global Opportunities",
      topic: "sustainability",
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=450&h=300&fit=crop",
      views: "44.2K",
      likes: "5.7K",
      comments: "745",
      shares: "1.6K",
      stats: { growth: "350%", jobs: "10M", investment: "$500B" },
    },
  ]

  // Auto-rotate hero banner
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveHeroIndex((prev) => (prev + 1) % featuredStories.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [featuredStories.length])

  const toggleBookmark = (storyId: number) => {
    setBookmarkedStories(prev => 
      prev.includes(storyId) 
        ? prev.filter(id => id !== storyId)
        : [...prev, storyId]
    )
  }

  const scroll = (ref: React.RefObject<HTMLDivElement>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = direction === 'left' ? -400 : 400
      ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  const activeHero = featuredStories[activeHeroIndex]

  // Helper to get badge colors
  const getBadgeColor = (badge: string) => {
    switch(badge) {
      case 'success': return 'bg-green-600'
      case 'struggle': return 'bg-orange-600'
      case 'comeback': return 'bg-blue-600'
      case 'learning': return 'bg-purple-600'
      case 'inspiring': return 'bg-pink-600'
      default: return 'bg-gray-600'
    }
  }

  const getBadgeLabel = (badge: string) => {
    switch(badge) {
      case 'success': return 'Success Story'
      case 'struggle': return 'Real Struggle'
      case 'comeback': return 'Comeback'
      case 'learning': return 'Learning Journey'
      case 'inspiring': return 'Inspiring'
      default: return badge
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 border-b py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-blue-900">
            WOW STORIES
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-4 font-medium">
            Real Journey | Real Struggles | Real Success
          </p>
          <p className="text-base md:text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            Inspiring Stories from Students, Parents, Industry Leaders and Many More
          </p>

          <div className="max-w-2xl mx-auto mb-6">
            <div className="relative flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search inspiring stories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-6 h-14 border-gray-300 rounded-xl shadow-sm text-base"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-44 h-14 border-gray-300 rounded-xl shadow-sm">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Stories</SelectItem>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="parent">Parent</SelectItem>
                  <SelectItem value="industry">Industry</SelectItem>
                  <SelectItem value="trending">Trending</SelectItem>
                  <SelectItem value="inspiring">Inspiring</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-center gap-6 md:gap-12 text-sm md:text-base">
            <div className="flex items-center gap-2 text-gray-700">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-blue-600" />
              </div>
              <span className="font-semibold">5000+ Stories</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <span className="font-semibold">100K+ Readers</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Award className="w-5 h-5 text-green-600" />
              </div>
              <span className="font-semibold">50+ Authors</span>
            </div>
          </div>
        </div>
      </section>

      <section className="relative h-[500px] md:h-[600px] overflow-hidden bg-gray-900">
        <div className="absolute inset-0 transition-opacity duration-1000">
          <Image
            src={activeHero.image || "/placeholder.svg"}
            alt={activeHero.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        </div>

        <div className="relative h-full container mx-auto px-4 flex items-center">
          <div className="max-w-2xl text-white space-y-4">
            <Badge className={`${getBadgeColor(activeHero.category === 'Struggle Story' ? 'struggle' : activeHero.category === 'Success Story' ? 'success' : 'inspiring')} text-white text-sm px-3 py-1`}>
              {activeHero.category}
            </Badge>
            
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
              {activeHero.title}
            </h2>
            
            <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
              {activeHero.excerpt}
            </p>

            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                <span>{activeHero.views}</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4" />
                <span>{activeHero.likes}</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                <span>{activeHero.comments}</span>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-2">
              <Avatar className="w-12 h-12 border-2 border-white">
                <AvatarImage src={activeHero.authorImage || "/placeholder.svg"} />
                <AvatarFallback>
                  {activeHero.author.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{activeHero.author}</p>
                <p className="text-sm text-gray-300">{activeHero.university} • {activeHero.readTime}</p>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                Read Full Story
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white text-white hover:bg-white hover:text-gray-900 bg-transparent"
                onClick={() => toggleBookmark(activeHero.id)}
              >
                <Bookmark className={`w-4 h-4 mr-2 ${bookmarkedStories.includes(activeHero.id) ? 'fill-current' : ''}`} />
                Save
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {featuredStories.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveHeroIndex(index)}
              className={`h-1.5 rounded-full transition-all ${
                index === activeHeroIndex ? 'w-8 bg-white' : 'w-4 bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      <section className="py-10 px-4 bg-white border-b">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Featured Authors</h3>
            <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 font-semibold">
              View All
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="relative group">
            <button
              onClick={() => scroll(authorScrollRef, 'left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-50 p-2 rounded-full shadow-lg border opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>

            <div 
              ref={authorScrollRef}
              className="flex gap-8 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {storyAuthors.map((item) => (
                <div
                  key={item.id}
                  className="flex-shrink-0 flex flex-col items-center gap-3 cursor-pointer group/author"
                >
                  <div className={`relative ${
                    item.type === 'category' 
                      ? `bg-gradient-to-br ${item.gradient} p-1 rounded-full`
                      : item.hasNew 
                        ? 'bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 p-1 rounded-full'
                        : 'bg-gray-200 p-1 rounded-full'
                  }`}>
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center overflow-hidden">
                      {item.type === 'category' && item.icon ? (
                        <item.icon className="w-10 h-10 text-gray-700" />
                      ) : (
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="object-cover group-hover/author:scale-110 transition-transform"
                        />
                      )}
                    </div>
                    {item.hasNew && (
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
                        <Sparkles className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold text-gray-900 max-w-[90px] truncate">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {item.type === 'category' 
                        ? item.count 
                        : item.type === 'author' 
                          ? `${item.stories} stories`
                          : ''
                      }
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => scroll(authorScrollRef, 'right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-50 p-2 rounded-full shadow-lg border opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-gradient-to-br from-orange-50 to-white">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                Trending Now
              </h2>
              <p className="text-gray-600">Most viewed stories this week</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingStories.map((story) => (
              <Card
                key={story.id}
                className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group/card hover:-translate-y-1 bg-white"
              >
                <CardContent className="p-6">
                  <Badge className={`${getBadgeColor(story.badge)} text-white mb-4 text-xs`}>
                    {getBadgeLabel(story.badge)}
                  </Badge>
                  <h3 className="text-lg font-bold mb-4 group-hover/card:text-orange-600 transition-colors line-clamp-3 leading-snug">
                    {story.title}
                  </h3>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span className="flex items-center gap-1 font-semibold">
                      <Eye className="w-4 h-4" />
                      {story.views} views
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      {story.category}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Real Student Experiences: The Whole Story</h2>
              <p className="text-gray-600">Success, struggles, and everything in between</p>
            </div>
            <div className="flex items-center gap-2 text-blue-600">
              <GraduationCap className="w-6 h-6" />
            </div>
          </div>

          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {[
              { label: 'All Stories', value: 'all' },
              { label: 'Success', value: 'success', color: 'green' },
              { label: 'Struggles', value: 'struggle', color: 'orange' },
              { label: 'Comebacks', value: 'comeback', color: 'blue' },
              { label: 'Learning', value: 'learning', color: 'purple' }
            ].map((tab) => (
              <Button
                key={tab.value}
                size="sm"
                variant={studentFilter === tab.value ? 'default' : 'outline'}
                onClick={() => setStudentFilter(tab.value)}
                className="whitespace-nowrap font-semibold"
              >
                {tab.label}
              </Button>
            ))}
          </div>

          <div className="relative group">
            <button
              onClick={() => scroll(studentScrollRef, 'left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <div 
              ref={studentScrollRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {studentStories.map((story) => (
                <Card
                  key={story.id}
                  className="flex-shrink-0 w-80 overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 group/card cursor-pointer"
                >
                  <CardContent className="p-0">
                    <div className="relative h-48">
                      <Image
                        src={story.image || "/placeholder.svg"}
                        alt={story.title}
                        fill
                        className="object-cover group-hover/card:scale-110 transition-transform duration-500"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${
                        story.badge === 'success' ? 'from-green-900/50 to-transparent' :
                        story.badge === 'struggle' ? 'from-orange-900/50 to-transparent' :
                        story.badge === 'comeback' ? 'from-blue-900/50 to-transparent' :
                        'from-purple-900/50 to-transparent'
                      }`} />
                      <Badge className={`absolute top-4 left-4 ${getBadgeColor(story.badge)} text-white`}>
                        {getBadgeLabel(story.badge)}
                      </Badge>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleBookmark(story.id)
                        }}
                        className="absolute top-4 right-4 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                      >
                        <Bookmark 
                          className={`w-4 h-4 ${bookmarkedStories.includes(story.id) ? 'fill-purple-600 text-purple-600' : 'text-gray-700'}`} 
                        />
                      </button>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-3 group-hover/card:text-purple-600 transition-colors line-clamp-2">
                        {story.title}
                      </h3>
                      <p className="text-gray-600 mb-4 text-sm line-clamp-2 text-pretty">
                        {story.excerpt}
                      </p>

                      <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" /> {story.views}
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart className="w-4 h-4" /> {story.likes}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={story.authorImage || "/placeholder.svg"} />
                          <AvatarFallback className="text-xs">
                            {story.author.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{story.author}</p>
                          <p className="text-xs text-gray-500">{story.readTime}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <button
              onClick={() => scroll(studentScrollRef, 'right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-gradient-to-br from-purple-50 to-white">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Inspiring Personalities</h2>
              <p className="text-gray-600">Stories from educators, parents, and industry leaders</p>
            </div>
          </div>

          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {[
              { label: 'All', icon: Sparkles },
              { label: 'Faculty', icon: GraduationCap },
              { label: 'Parents', icon: Users },
              { label: 'Industry Leaders', icon: Briefcase },
            ].map((tab) => (
              <Button
                key={tab.label}
                size="sm"
                variant={personalityFilter === tab.label.toLowerCase() ? 'default' : 'outline'}
                onClick={() => setPersonalityFilter(tab.label.toLowerCase())}
                className="whitespace-nowrap font-semibold gap-2"
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </Button>
            ))}
          </div>

          <div className="relative group">
            <button
              onClick={() => scroll(personalityScrollRef, 'left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <div 
              ref={personalityScrollRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {inspiringPersonalities.map((story) => (
                <Card
                  key={story.id}
                  className="flex-shrink-0 w-96 overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group/card"
                >
                  <CardContent className="p-0">
                    <div className="p-6 text-center border-b bg-gradient-to-br from-purple-50 to-blue-50">
                      <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-purple-200">
                        <AvatarImage src={story.authorImage || "/placeholder.svg"} />
                        <AvatarFallback className="text-2xl">
                          {story.author.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <h3 className="text-xl font-bold mb-1">{story.author}</h3>
                      <p className="text-sm text-gray-600 mb-2">{story.role}</p>
                      <Badge className="bg-purple-100 text-purple-700 mb-4">
                        {story.category}
                      </Badge>
                      <div className="flex items-center justify-center gap-2 text-sm text-green-600 font-semibold">
                        <Award className="w-4 h-4" />
                        {story.achievement}
                      </div>
                    </div>

                    <div className="relative h-40">
                      <Image
                        src={story.image || "/placeholder.svg"}
                        alt={story.title}
                        fill
                        className="object-cover group-hover/card:scale-110 transition-transform duration-500"
                      />
                    </div>
                    
                    <div className="p-6">
                      <h4 className="text-lg font-bold mb-2 group-hover/card:text-purple-600 transition-colors line-clamp-2">
                        {story.title}
                      </h4>
                      <p className="text-gray-600 mb-4 text-sm line-clamp-3 text-pretty">
                        {story.excerpt}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" /> {story.views}
                          </span>
                          <span className="flex items-center gap-1">
                            <Heart className="w-3 h-3" /> {story.likes}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">{story.readTime}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <button
              onClick={() => scroll(personalityScrollRef, 'right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Industry Insights & Thought Leadership</h2>
              <p className="text-gray-600">Deep dives into trends, careers, and the future</p>
            </div>
          </div>

          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {[
              { label: 'Tech Evolution', icon: Target },
              { label: 'Career Paths', icon: Briefcase },
              { label: 'Education', icon: BookOpen },
              { label: 'Global Trends', icon: TrendingUp }
            ].map((tab) => (
              <Button
                key={tab.label}
                size="sm"
                variant="outline"
                className="whitespace-nowrap font-semibold gap-2"
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </Button>
            ))}
          </div>

          <div className="relative group">
            <button
              onClick={() => scroll(industryScrollRef, 'left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <div 
              ref={industryScrollRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {industryInsights.map((story) => (
                <Card
                  key={story.id}
                  className="flex-shrink-0 w-96 overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 group/card cursor-pointer"
                >
                  <CardContent className="p-0">
                    <div className="relative h-52">
                      <Image
                        src={story.image || "/placeholder.svg"}
                        alt={story.title}
                        fill
                        className="object-cover group-hover/card:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                      <Badge className="absolute top-4 left-4 bg-indigo-600 text-white">
                        {story.category}
                      </Badge>
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <h3 className="text-2xl font-bold mb-2 text-balance">
                          {story.title}
                        </h3>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <p className="text-gray-600 mb-4 text-sm line-clamp-2 text-pretty">
                        {story.excerpt}
                      </p>

                      {story.stats && (
                        <div className="grid grid-cols-3 gap-3 mb-4 p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl">
                          <div className="text-center">
                            <div className="text-xl font-bold text-green-600">{story.stats.growth}</div>
                            <div className="text-xs text-gray-600 font-medium">Growth</div>
                          </div>
                          <div className="text-center">
                            <div className="text-xl font-bold text-blue-600">{story.stats.jobs || story.stats.workers || story.stats.learners}</div>
                            <div className="text-xs text-gray-600 font-medium">{story.stats.jobs ? 'Jobs' : story.stats.workers ? 'Workers' : 'Learners'}</div>
                          </div>
                          <div className="text-center">
                            <div className="text-xl font-bold text-purple-600">{story.stats.companies || story.stats.market || story.stats.investment || story.stats.savings}</div>
                            <div className="text-xs text-gray-600 font-medium">
                              {story.stats.companies ? 'Companies' : story.stats.market ? 'Market' : story.stats.investment ? 'Investment' : 'Savings'}
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" /> {story.views}
                          </span>
                          <span className="flex items-center gap-1">
                            <Heart className="w-3 h-3" /> {story.likes}
                          </span>
                        </div>
                        <Button size="sm" variant="ghost" className="text-indigo-600 font-semibold">
                          Read More
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <button
              onClick={() => scroll(industryScrollRef, 'right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">All Stories</h2>
            <Button variant="outline" className="font-semibold">
              Load More Stories
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[...studentStories, ...inspiringPersonalities.slice(0, 2)].map((story) => (
              <Card
                key={story.id}
                className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 group/card cursor-pointer hover:-translate-y-1"
              >
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-5">
                    <div className="relative h-48 md:h-full md:col-span-2">
                      <Image
                        src={story.image || "/placeholder.svg"}
                        alt={story.title}
                        fill
                        className="object-cover group-hover/card:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6 md:col-span-3 flex flex-col justify-between">
                      <div>
                        <Badge className={`mb-3 ${story.badge ? getBadgeColor(story.badge) : 'bg-purple-600'} text-white`}>
                          {story.badge ? getBadgeLabel(story.badge) : story.category}
                        </Badge>
                        <h3 className="text-lg font-bold mb-2 group-hover/card:text-purple-600 transition-colors line-clamp-2">
                          {story.title}
                        </h3>
                        <p className="text-gray-600 mb-3 text-sm line-clamp-2 text-pretty">
                          {story.excerpt}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={story.authorImage || "/placeholder.svg"} />
                            <AvatarFallback className="text-xs">
                              {story.author.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{story.author}</p>
                            <p className="text-xs text-gray-500">{story.readTime}</p>
                          </div>
                        </div>
                        <Button size="sm" variant="ghost" className="text-purple-600 font-semibold">
                          Read
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-br from-purple-600 to-blue-600">
        <div className="container mx-auto">
          <Card className="border-0 bg-white/10 backdrop-blur-sm text-white shadow-2xl">
            <CardContent className="p-8 md:p-12 text-center">
              <BookOpen className="w-16 h-16 mx-auto mb-6 opacity-90" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Never Miss an Inspiring Story</h2>
              <p className="text-xl mb-8 text-purple-100 text-pretty max-w-2xl mx-auto">
                Subscribe to get the latest success stories, struggles, and career insights delivered weekly
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900 border-0 focus:ring-2 focus:ring-yellow-400"
                />
                <Button size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-purple-900 font-bold whitespace-nowrap">
                  Subscribe
                </Button>
              </div>
              <p className="text-sm text-purple-200 mt-4">Join 100,000+ students, parents, and professionals</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
