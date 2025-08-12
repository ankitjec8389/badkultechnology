"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Search, MessageSquare, Clock, AlertTriangle, CheckCircle, User } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Mock data for open tickets
const openTickets = [
  {
    id: "1",
    title: "Unable to complete booking payment",
    description: "I'm trying to book a trip but the payment gateway keeps failing. I've tried multiple cards.",
    user: "Priya Sharma",
    userEmail: "priya.sharma@email.com",
    userAvatar: "/placeholder.svg?height=40&width=40",
    category: "payment",
    priority: "high",
    status: "open",
    createdDate: "2024-01-20",
    lastUpdated: "2024-01-20",
    assignedTo: "Support Team",
    tripId: "trip_001",
    tripTitle: "Himalayan Base Camp Trek",
  },
  {
    id: "2",
    title: "Trip organizer not responding",
    description: "I booked a trip 2 weeks ago but the organizer hasn't responded to my messages or calls.",
    user: "Rajesh Kumar",
    userEmail: "rajesh.kumar@email.com",
    userAvatar: "/placeholder.svg?height=40&width=40",
    category: "organizer_issue",
    priority: "high",
    status: "in_progress",
    createdDate: "2024-01-18",
    lastUpdated: "2024-01-19",
    assignedTo: "Admin John",
    tripId: "trip_002",
    tripTitle: "Goa Beach Party Weekend",
  },
  {
    id: "3",
    title: "Refund request for cancelled trip",
    description: "My trip was cancelled by the organizer but I haven't received my refund yet. It's been 10 days.",
    user: "Sneha Patel",
    userEmail: "sneha.patel@email.com",
    userAvatar: "/placeholder.svg?height=40&width=40",
    category: "refund",
    priority: "medium",
    status: "open",
    createdDate: "2024-01-17",
    lastUpdated: "2024-01-17",
    assignedTo: "Finance Team",
    tripId: "trip_003",
    tripTitle: "Delhi Heritage Walk",
  },
  {
    id: "4",
    title: "Account login issues",
    description: "I can't log into my account. The password reset email is not coming to my inbox.",
    user: "Amit Gupta",
    userEmail: "amit.gupta@email.com",
    userAvatar: "/placeholder.svg?height=40&width=40",
    category: "technical",
    priority: "low",
    status: "open",
    createdDate: "2024-01-16",
    lastUpdated: "2024-01-16",
    assignedTo: "Tech Support",
    tripId: null,
    tripTitle: null,
  },
]

export function OpenTickets() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedTicket, setSelectedTicket] = useState<any>(null)
  const [response, setResponse] = useState("")

  const filteredTickets = openTickets.filter((ticket) => {
    const matchesSearch =
      ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || ticket.category === categoryFilter
    const matchesPriority = priorityFilter === "all" || ticket.priority === priorityFilter
    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter

    return matchesSearch && matchesCategory && matchesPriority && matchesStatus
  })

  const handleResolveTicket = (ticketId: string) => {
    console.log("Resolve ticket:", ticketId, "Response:", response)
    // Implementation for resolving ticket
  }

  const handleAssignTicket = (ticketId: string, assignee: string) => {
    console.log("Assign ticket:", ticketId, "to:", assignee)
    // Implementation for assigning ticket
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-red-500"
      case "medium":
        return "border-l-yellow-500"
      case "low":
        return "border-l-green-500"
      default:
        return "border-l-gray-500"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "payment":
        return <AlertTriangle className="h-5 w-5 text-red-600" />
      case "organizer_issue":
        return <User className="h-5 w-5 text-orange-600" />
      case "refund":
        return <Clock className="h-5 w-5 text-blue-600" />
      case "technical":
        return <MessageSquare className="h-5 w-5 text-purple-600" />
      default:
        return <MessageSquare className="h-5 w-5 text-gray-600" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Open Support Tickets</h1>
        <p className="text-gray-600 mt-2">Manage and resolve customer support requests</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-red-600">8</div>
            <p className="text-sm text-gray-600">High Priority</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-orange-600">15</div>
            <p className="text-sm text-gray-600">In Progress</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-blue-600">32</div>
            <p className="text-sm text-gray-600">Total Open</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">2.5h</div>
            <p className="text-sm text-gray-600">Avg Response Time</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search tickets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="payment">Payment</SelectItem>
                <SelectItem value="organizer_issue">Organizer Issue</SelectItem>
                <SelectItem value="refund">Refund</SelectItem>
                <SelectItem value="technical">Technical</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tickets List */}
      <div className="space-y-4">
        {filteredTickets.map((ticket) => (
          <Card
            key={ticket.id}
            className={`hover:shadow-md transition-shadow border-l-4 ${getPriorityColor(ticket.priority)}`}
          >
            <CardContent className="pt-6">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="flex-shrink-0">{getCategoryIcon(ticket.category)}</div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-lg font-semibold text-gray-900 truncate">{ticket.title}</h3>
                      <Badge
                        variant={
                          ticket.priority === "high"
                            ? "destructive"
                            : ticket.priority === "medium"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {ticket.priority}
                      </Badge>
                      <Badge variant={ticket.status === "open" ? "outline" : "default"}>
                        {ticket.status.replace("_", " ")}
                      </Badge>
                    </div>

                    <p className="text-sm text-gray-700 mb-3 line-clamp-2">{ticket.description}</p>

                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={ticket.userAvatar || "/placeholder.svg"} alt={ticket.user} />
                          <AvatarFallback>{ticket.user.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span>{ticket.user}</span>
                      </div>
                      <span>•</span>
                      <span>Created {new Date(ticket.createdDate).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>Assigned to {ticket.assignedTo}</span>
                    </div>

                    {ticket.tripTitle && (
                      <div className="text-sm text-blue-600">
                        Related trip: <span className="font-medium">{ticket.tripTitle}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 lg:flex-col xl:flex-row">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => setSelectedTicket(ticket)}>
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Respond
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>{ticket.title}</DialogTitle>
                        <DialogDescription>Respond to support ticket</DialogDescription>
                      </DialogHeader>
                      {selectedTicket && (
                        <div className="space-y-4">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-700">{selectedTicket.description}</p>
                            <div className="flex items-center space-x-2 mt-2 text-xs text-gray-500">
                              <span>From: {selectedTicket.user}</span>
                              <span>•</span>
                              <span>{new Date(selectedTicket.createdDate).toLocaleDateString()}</span>
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="response">Your Response</Label>
                            <Textarea
                              id="response"
                              placeholder="Type your response to the customer..."
                              value={response}
                              onChange={(e) => setResponse(e.target.value)}
                              rows={4}
                            />
                          </div>

                          <div className="flex gap-2">
                            <Button onClick={() => handleResolveTicket(selectedTicket.id)} className="flex-1">
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Send & Resolve
                            </Button>
                            <Button variant="outline" className="flex-1 bg-transparent">
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Send Response
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => window.open(`/admin/support/tickets/${selectedTicket.id}`, "_blank")}
                            >
                              View Details
                            </Button>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>

                  <Button
                    size="sm"
                    onClick={() => handleResolveTicket(ticket.id)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Resolve
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
