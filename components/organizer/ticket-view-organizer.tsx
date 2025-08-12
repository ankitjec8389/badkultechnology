"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  Calendar,
  Clock,
  MessageSquare,
  Send,
  User,
  Building2,
  AlertCircle,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"

interface TicketViewOrganizerProps {
  ticketId: string
}

// Mock data - in real app this would come from API
const mockTicket = {
  id: 1,
  title: "Trip approval taking too long",
  description: "My trip has been under review for 5 days. When will it be approved?",
  status: "open",
  priority: "medium",
  category: "Trip Management",
  createdAt: "2024-12-08T10:30:00Z",
  updatedAt: "2024-12-08T14:20:00Z",
  organizationId: "org-123",
  organizationName: "Adventure Seekers",
  createdBy: {
    name: "John Doe",
    email: "john@adventureseekers.com",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  conversation: [
    {
      id: 1,
      message: "My trip has been under review for 5 days. When will it be approved?",
      sender: "organizer",
      senderName: "John Doe",
      timestamp: "2024-12-08T10:30:00Z",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 2,
      message:
        "Thank you for contacting support. I'm looking into your trip approval status and will get back to you shortly.",
      sender: "admin",
      senderName: "Sarah Admin",
      timestamp: "2024-12-08T11:15:00Z",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 3,
      message:
        "I've reviewed your trip and it looks great! The delay was due to a backlog in our review queue. Your trip has now been approved and is live on the platform.",
      sender: "admin",
      senderName: "Sarah Admin",
      timestamp: "2024-12-08T14:20:00Z",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  ],
}

const statusColors = {
  open: "bg-blue-100 text-blue-800",
  "in-progress": "bg-yellow-100 text-yellow-800",
  resolved: "bg-green-100 text-green-800",
  closed: "bg-gray-100 text-gray-800",
}

const priorityColors = {
  high: "bg-red-100 text-red-800",
  medium: "bg-yellow-100 text-yellow-800",
  low: "bg-green-100 text-green-800",
}

export function TicketViewOrganizer({ ticketId }: TicketViewOrganizerProps) {
  const [newMessage, setNewMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const ticket = mockTicket // In real app, fetch by ticketId

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const handleSubmitMessage = async () => {
    if (!newMessage.trim()) return

    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // In real app, this would make an API call to add the message
    console.log("Adding message:", newMessage)

    setNewMessage("")
    setIsSubmitting(false)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "resolved":
        return <CheckCircle className="h-4 w-4" />
      case "in-progress":
        return <Clock className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link href="/organizer/support">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Support
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">
            Ticket #{ticket.id}: {ticket.title}
          </h1>
          <p className="text-gray-600">Category: {ticket.category}</p>
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
                  {getStatusIcon(ticket.status)}
                  <span>Ticket Details</span>
                </CardTitle>
                <div className="flex space-x-2">
                  <Badge className={statusColors[ticket.status as keyof typeof statusColors]}>{ticket.status}</Badge>
                  <Badge className={priorityColors[ticket.priority as keyof typeof priorityColors]}>
                    {ticket.priority} priority
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-700">{ticket.description}</p>
                </div>
                <div className="flex items-center space-x-6 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Created {formatDate(ticket.createdAt)}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    Updated {formatDate(ticket.updatedAt)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Conversation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5" />
                <span>Conversation</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {ticket.conversation.map((message, index) => (
                  <div key={message.id}>
                    <div
                      className={`flex space-x-3 ${message.sender === "organizer" ? "flex-row-reverse space-x-reverse" : ""}`}
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={message.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {message.senderName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`flex-1 ${message.sender === "organizer" ? "text-right" : ""}`}>
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-sm font-medium text-gray-900">{message.senderName}</span>
                          <Badge variant="outline" className="text-xs">
                            {message.sender === "organizer" ? "You" : "Support"}
                          </Badge>
                          <span className="text-xs text-gray-500">{formatDate(message.timestamp)}</span>
                        </div>
                        <div
                          className={`p-3 rounded-lg ${
                            message.sender === "organizer"
                              ? "bg-blue-50 border border-blue-200"
                              : "bg-gray-50 border border-gray-200"
                          }`}
                        >
                          <p className="text-sm text-gray-800">{message.message}</p>
                        </div>
                      </div>
                    </div>
                    {index < ticket.conversation.length - 1 && <Separator className="my-4" />}
                  </div>
                ))}
              </div>

              {/* Reply Form */}
              {ticket.status !== "closed" && (
                <div className="mt-6 pt-6 border-t">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Add a response</label>
                      <Textarea
                        placeholder="Type your message here..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        rows={4}
                        className="resize-none"
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button onClick={handleSubmitMessage} disabled={!newMessage.trim() || isSubmitting}>
                        <Send className="h-4 w-4 mr-2" />
                        {isSubmitting ? "Sending..." : "Send Response"}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Organization Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Building2 className="h-5 w-5" />
                <span>Organization</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-600">Organization</p>
                  <p className="text-gray-900">{ticket.organizationName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Created by</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={ticket.createdBy.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {ticket.createdBy.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm text-gray-900">{ticket.createdBy.name}</p>
                      <p className="text-xs text-gray-500">{ticket.createdBy.email}</p>
                    </div>
                  </div>
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
                  <MessageSquare className="h-4 w-4 mr-2" />
                  View All My Tickets
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <User className="h-4 w-4 mr-2" />
                  Contact Support
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
