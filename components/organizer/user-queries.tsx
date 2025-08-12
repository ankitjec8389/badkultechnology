"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  MessageSquare,
  Clock,
  CheckCircle,
  AlertCircle,
  Search,
  Filter,
  Reply,
  Calendar,
  User,
  Phone,
  Mail,
} from "lucide-react"

// Mock data
const queries = [
  {
    id: 1,
    tripName: "Himalayan Winter Trek",
    userName: "Rahul Sharma",
    userPhone: "+91 9876543210",
    userEmail: "rahul@example.com",
    query: "What is the difficulty level of this trek? I'm a beginner and want to know if it's suitable for me.",
    status: "pending",
    priority: "medium",
    createdAt: "2024-12-08T10:30:00Z",
    responseTime: null,
    communicationPreference: "whatsapp",
  },
  {
    id: 2,
    tripName: "Goa Beach Adventure",
    userName: "Priya Patel",
    userPhone: "+91 9876543211",
    userEmail: "priya@example.com",
    query: "Are meals included in the package? I have dietary restrictions and need vegetarian options.",
    status: "responded",
    priority: "low",
    createdAt: "2024-12-07T14:15:00Z",
    responseTime: "2024-12-07T16:30:00Z",
    communicationPreference: "call",
  },
  {
    id: 3,
    tripName: "Kerala Backwaters",
    userName: "Amit Kumar",
    userPhone: "+91 9876543212",
    userEmail: "amit@example.com",
    query: "Can I join this trip solo? What is the group composition usually like?",
    status: "pending",
    priority: "high",
    createdAt: "2024-12-06T09:45:00Z",
    responseTime: null,
    communicationPreference: "whatsapp",
  },
  {
    id: 4,
    tripName: "Rajasthan Desert Safari",
    userName: "Sneha Gupta",
    userPhone: "+91 9876543213",
    userEmail: "sneha@example.com",
    query: "What should I pack for the desert trip? Any specific clothing recommendations?",
    status: "responded",
    priority: "medium",
    createdAt: "2024-12-05T11:20:00Z",
    responseTime: "2024-12-05T13:45:00Z",
    communicationPreference: "message",
  },
]

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  responded: "bg-green-100 text-green-800",
  urgent: "bg-red-100 text-red-800",
}

const priorityColors = {
  high: "bg-red-100 text-red-800",
  medium: "bg-yellow-100 text-yellow-800",
  low: "bg-green-100 text-green-800",
}

export function UserQueries() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [tripFilter, setTripFilter] = useState("all")
  const [selectedQuery, setSelectedQuery] = useState<any>(null)

  const filteredQueries = queries.filter((query) => {
    const matchesSearch =
      query.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      query.tripName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      query.query.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || query.status === statusFilter
    const matchesTrip = tripFilter === "all" || query.tripName === tripFilter
    return matchesSearch && matchesStatus && matchesTrip
  })

  const stats = [
    {
      title: "Total Queries",
      value: queries.length.toString(),
      icon: MessageSquare,
      color: "text-blue-600",
    },
    {
      title: "Pending",
      value: queries.filter((q) => q.status === "pending").length.toString(),
      icon: Clock,
      color: "text-yellow-600",
    },
    {
      title: "Responded",
      value: queries.filter((q) => q.status === "responded").length.toString(),
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      title: "Avg Response Time",
      value: "2.5h",
      icon: AlertCircle,
      color: "text-purple-600",
    },
  ]

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getTimeSinceQuery = (dateString: string) => {
    const now = new Date()
    const queryDate = new Date(dateString)
    const diffInHours = Math.floor((now.getTime() - queryDate.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 24) {
      return `${diffInHours}h ago`
    } else {
      const diffInDays = Math.floor(diffInHours / 24)
      return `${diffInDays}d ago`
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Queries</h1>
          <p className="text-gray-600 mt-1">Manage and respond to customer inquiries</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search queries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="responded">Responded</SelectItem>
              </SelectContent>
            </Select>
            <Select value={tripFilter} onValueChange={setTripFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by trip" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Trips</SelectItem>
                <SelectItem value="Himalayan Winter Trek">Himalayan Winter Trek</SelectItem>
                <SelectItem value="Goa Beach Adventure">Goa Beach Adventure</SelectItem>
                <SelectItem value="Kerala Backwaters">Kerala Backwaters</SelectItem>
                <SelectItem value="Rajasthan Desert Safari">Rajasthan Desert Safari</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Reset Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Queries List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Queries</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredQueries.map((query) => (
              <div key={query.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold text-gray-900">{query.userName}</h3>
                      <Badge className={statusColors[query.status as keyof typeof statusColors]}>{query.status}</Badge>
                      <Badge className={priorityColors[query.priority as keyof typeof priorityColors]}>
                        {query.priority} priority
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">Trip: {query.tripName}</p>
                    <p className="text-gray-800 mb-3">{query.query}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(query.createdAt)}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {getTimeSinceQuery(query.createdAt)}
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-1" />
                        {query.communicationPreference}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setSelectedQuery(query)}>
                          <Reply className="h-4 w-4 mr-2" />
                          Respond
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Respond to Query</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center space-x-2 mb-2">
                              <User className="h-4 w-4" />
                              <span className="font-medium">{query.userName}</span>
                            </div>
                            <div className="flex items-center space-x-2 mb-2">
                              <Phone className="h-4 w-4" />
                              <span>{query.userPhone}</span>
                            </div>
                            <div className="flex items-center space-x-2 mb-3">
                              <Mail className="h-4 w-4" />
                              <span>{query.userEmail}</span>
                            </div>
                            <p className="text-sm text-gray-700">
                              <strong>Query:</strong> {query.query}
                            </p>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="response">Your Response</Label>
                            <Textarea id="response" placeholder="Type your response here..." rows={4} />
                          </div>
                          <div className="flex justify-end space-x-2">
                            <Button variant="outline">Save Draft</Button>
                            <Button>Send Response</Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
