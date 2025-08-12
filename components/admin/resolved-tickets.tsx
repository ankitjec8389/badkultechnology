"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Eye, CheckCircle, Clock } from "lucide-react"

const mockResolvedTickets = [
  {
    id: "T-001",
    subject: "Unable to create trip listing",
    user: "John Doe",
    userEmail: "john@example.com",
    userAvatar: "/placeholder.svg?height=32&width=32",
    category: "Technical",
    priority: "high",
    status: "resolved",
    createdAt: "2024-01-10",
    resolvedAt: "2024-01-12",
    resolutionTime: "2 days",
    assignedTo: "Support Team",
  },
  {
    id: "T-002",
    subject: "Payment processing issue",
    user: "Jane Smith",
    userEmail: "jane@example.com",
    userAvatar: "/placeholder.svg?height=32&width=32",
    category: "Billing",
    priority: "medium",
    status: "resolved",
    createdAt: "2024-01-08",
    resolvedAt: "2024-01-09",
    resolutionTime: "1 day",
    assignedTo: "Finance Team",
  },
]

export function ResolvedTickets() {
  const [tickets, setTickets] = useState(mockResolvedTickets)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || ticket.category.toLowerCase() === categoryFilter
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Resolved Tickets</h1>
        <p className="text-gray-600 mt-1">View and manage resolved support tickets</p>
      </div>

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
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="technical">Technical</SelectItem>
                <SelectItem value="billing">Billing</SelectItem>
                <SelectItem value="general">General</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {filteredTickets.map((ticket) => (
          <Card key={ticket.id}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div className="flex items-start space-x-4 flex-1">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={ticket.userAvatar || "/placeholder.svg"} alt={ticket.user} />
                    <AvatarFallback>{ticket.user.charAt(0)}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-medium text-gray-900">{ticket.id}</span>
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Resolved
                      </Badge>
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
                      <Badge variant="outline">{ticket.category}</Badge>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{ticket.subject}</h3>

                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                      <span>By: {ticket.user}</span>
                      <span>•</span>
                      <span>{ticket.userEmail}</span>
                      <span>•</span>
                      <span>Assigned to: {ticket.assignedTo}</span>
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>Created: {new Date(ticket.createdAt).toLocaleDateString()}</span>
                      </div>
                      <span>•</span>
                      <span>Resolved: {new Date(ticket.resolvedAt).toLocaleDateString()}</span>
                      <span>•</span>
                      <span className="text-green-600 font-medium">Resolution time: {ticket.resolutionTime}</span>
                    </div>
                  </div>
                </div>

                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
