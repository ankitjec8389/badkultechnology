"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  MessageSquare,
  Clock,
  User,
  Mail,
  Phone,
  AlertTriangle,
  CheckCircle,
  Send,
  Paperclip,
  MoreHorizontal,
} from "lucide-react"
import { useRouter } from "next/navigation"

// Mock ticket data
const mockTicket = {
  id: "T-001",
  title: "Unable to complete booking payment",
  description:
    "I'm trying to book a trip but the payment gateway keeps failing. I've tried multiple cards including Visa and Mastercard. The error message says 'Transaction failed - please try again later' but it's been happening for 2 days now. This is urgent as the trip is filling up fast.",
  user: {
    name: "Priya Sharma",
    email: "priya.sharma@email.com",
    phone: "+91 98765 43210",
    avatar: "/placeholder.svg?height=40&width=40",
    joinedDate: "2023-06-15",
  },
  category: "payment",
  priority: "high",
  status: "open",
  createdAt: "2024-01-20T10:30:00Z",
  updatedAt: "2024-01-20T14:20:00Z",
  assignedTo: {
    name: "Support Team",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  tripDetails: {
    id: "trip_001",
    title: "Himalayan Base Camp Trek",
    organizer: "Mountain Adventures",
    price: "₹25,000",
    dates: "Feb 15-22, 2024",
  },
  tags: ["payment-gateway", "urgent", "booking-issue"],
}

// Mock comments/conversation
const mockComments = [
  {
    id: "1",
    author: {
      name: "Priya Sharma",
      avatar: "/placeholder.svg?height=32&width=32",
      role: "user",
    },
    content:
      "I'm trying to book a trip but the payment gateway keeps failing. I've tried multiple cards including Visa and Mastercard. The error message says 'Transaction failed - please try again later' but it's been happening for 2 days now.",
    timestamp: "2024-01-20T10:30:00Z",
    type: "initial",
  },
  {
    id: "2",
    author: {
      name: "Admin John",
      avatar: "/placeholder.svg?height=32&width=32",
      role: "admin",
    },
    content:
      "Hi Priya, thank you for reaching out. I can see the payment issues you're experiencing. Let me check with our payment gateway provider and get back to you within 2 hours. In the meantime, could you try using a different browser or clearing your cache?",
    timestamp: "2024-01-20T11:15:00Z",
    type: "response",
  },
  {
    id: "3",
    author: {
      name: "Priya Sharma",
      avatar: "/placeholder.svg?height=32&width=32",
      role: "user",
    },
    content:
      "I tried using Chrome and Firefox, also cleared cache but still getting the same error. This is really urgent as I need to book today!",
    timestamp: "2024-01-20T12:45:00Z",
    type: "reply",
  },
  {
    id: "4",
    author: {
      name: "Admin John",
      avatar: "/placeholder.svg?height=32&width=32",
      role: "admin",
    },
    content:
      "I've escalated this to our technical team. There seems to be an issue with the payment gateway for certain card types. We're working on a fix. I'll personally ensure your booking is secured once we resolve this. Expected resolution time: 4-6 hours.",
    timestamp: "2024-01-20T13:30:00Z",
    type: "response",
    internal: false,
  },
]

interface TicketViewProps {
  ticketId: string
}

export function TicketView({ ticketId }: TicketViewProps) {
  const router = useRouter()
  const [newComment, setNewComment] = useState("")
  const [commentType, setCommentType] = useState("response")
  const [ticketStatus, setTicketStatus] = useState(mockTicket.status)
  const [ticketPriority, setTicketPriority] = useState(mockTicket.priority)

  const handleAddComment = () => {
    if (!newComment.trim()) return

    // Add comment logic here
    console.log("Adding comment:", {
      content: newComment,
      type: commentType,
      ticketId,
    })

    setNewComment("")
  }

  const handleStatusChange = (newStatus: string) => {
    setTicketStatus(newStatus)
    // Update status logic here
    console.log("Status changed to:", newStatus)
  }

  const handlePriorityChange = (newPriority: string) => {
    setTicketPriority(newPriority)
    // Update priority logic here
    console.log("Priority changed to:", newPriority)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "in_progress":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "resolved":
        return "bg-green-100 text-green-800 border-green-200"
      case "closed":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Ticket #{mockTicket.id}</h1>
            <p className="text-gray-600">{mockTicket.title}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={ticketPriority} onValueChange={handlePriorityChange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
          <Select value={ticketStatus} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Ticket Details */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="h-5 w-5" />
                  <span>Ticket Details</span>
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Badge className={getPriorityColor(ticketPriority)}>{ticketPriority}</Badge>
                  <Badge className={getStatusColor(ticketStatus)}>{ticketStatus.replace("_", " ")}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-700 leading-relaxed">{mockTicket.description}</p>
                </div>

                {mockTicket.tripDetails && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Related Trip</h3>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{mockTicket.tripDetails.title}</p>
                          <p className="text-sm text-gray-600">by {mockTicket.tripDetails.organizer}</p>
                          <p className="text-sm text-gray-600">{mockTicket.tripDetails.dates}</p>
                        </div>
                        <p className="font-semibold text-green-600">{mockTicket.tripDetails.price}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {mockTicket.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Conversation */}
          <Card>
            <CardHeader>
              <CardTitle>Conversation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockComments.map((comment, index) => (
                  <div key={comment.id}>
                    <div
                      className={`flex space-x-3 ${comment.author.role === "admin" ? "flex-row-reverse space-x-reverse" : ""}`}
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={comment.author.avatar || "/placeholder.svg"} alt={comment.author.name} />
                        <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className={`flex-1 ${comment.author.role === "admin" ? "text-right" : ""}`}>
                        <div
                          className={`inline-block max-w-[80%] p-3 rounded-lg ${
                            comment.author.role === "admin" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                          }`}
                        >
                          <p className="text-sm">{comment.content}</p>
                        </div>
                        <div
                          className={`flex items-center space-x-2 mt-1 text-xs text-gray-500 ${
                            comment.author.role === "admin" ? "justify-end" : ""
                          }`}
                        >
                          <span>{comment.author.name}</span>
                          <span>•</span>
                          <span>{formatDate(comment.timestamp)}</span>
                        </div>
                      </div>
                    </div>
                    {index < mockComments.length - 1 && <Separator className="my-4" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Add Comment */}
          <Card>
            <CardHeader>
              <CardTitle>Add Response</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="comment-type">Response Type</Label>
                  <Select value={commentType} onValueChange={setCommentType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="response">Public Response</SelectItem>
                      <SelectItem value="internal">Internal Note</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="comment">Message</Label>
                  <Textarea
                    id="comment"
                    placeholder="Type your response..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    rows={4}
                  />
                </div>
                <div className="flex justify-between items-center">
                  <Button variant="outline" size="sm">
                    <Paperclip className="h-4 w-4 mr-2" />
                    Attach File
                  </Button>
                  <div className="flex space-x-2">
                    <Button variant="outline" onClick={() => setNewComment("")}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddComment}>
                      <Send className="h-4 w-4 mr-2" />
                      Send Response
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* User Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Customer Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={mockTicket.user.avatar || "/placeholder.svg"} alt={mockTicket.user.name} />
                    <AvatarFallback>{mockTicket.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{mockTicket.user.name}</p>
                    <p className="text-sm text-gray-600">
                      Customer since {new Date(mockTicket.user.joinedDate).getFullYear()}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span>{mockTicket.user.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span>{mockTicket.user.phone}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ticket Metadata */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>Ticket Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Created:</span>
                  <span>{formatDate(mockTicket.createdAt)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Updated:</span>
                  <span>{formatDate(mockTicket.updatedAt)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Category:</span>
                  <span className="capitalize">{mockTicket.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Assigned To:</span>
                  <span>{mockTicket.assignedTo.name}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Mark as Resolved
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Escalate to Manager
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <User className="h-4 w-4 mr-2" />
                  Reassign Ticket
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <MoreHorizontal className="h-4 w-4 mr-2" />
                  More Actions
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
