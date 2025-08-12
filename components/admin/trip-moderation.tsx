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
import { Search, Eye, CheckCircle, XCircle, Flag, MapPin, Calendar, Users, Star, AlertTriangle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Mock data for trips requiring moderation
const tripsForModeration = [
  {
    id: "1",
    title: "Himalayan Base Camp Trek",
    organizer: "Mountain Adventures Co.",
    organizerLogo: "/placeholder.svg?height=40&width=40",
    location: "Himachal Pradesh",
    status: "flagged",
    flagReason: "Inappropriate content in description",
    reportedBy: "User #1234",
    reportedDate: "2024-01-15",
    priority: "high",
    price: 25000,
    duration: "7 days",
    groupSize: "8-12",
    rating: 4.2,
    totalReviews: 15,
    flaggedContent: "This trek includes some extreme activities that may not be suitable for beginners...",
    description:
      "Experience the breathtaking beauty of the Himalayas with our expertly guided base camp trek. This challenging 7-day adventure takes you through pristine mountain landscapes...",
  },
  {
    id: "2",
    title: "Goa Beach Party Weekend",
    organizer: "Coastal Expeditions",
    organizerLogo: "/placeholder.svg?height=40&width=40",
    location: "Goa",
    status: "under_review",
    flagReason: "Misleading pricing information",
    reportedBy: "System",
    reportedDate: "2024-01-14",
    priority: "medium",
    price: 15000,
    duration: "3 days",
    groupSize: "15-20",
    rating: 3.8,
    totalReviews: 8,
    flaggedContent: "All-inclusive package starting from ₹8,000 (actual price ₹15,000)",
    description:
      "Join us for an unforgettable beach party weekend in Goa with water sports, beach activities, and nightlife...",
  },
  {
    id: "3",
    title: "Delhi Heritage Walk",
    organizer: "Heritage Walks India",
    organizerLogo: "/placeholder.svg?height=40&width=40",
    location: "Delhi",
    status: "pending",
    flagReason: "Spam-like content detected",
    reportedBy: "Auto-moderation",
    reportedDate: "2024-01-13",
    priority: "low",
    price: 2500,
    duration: "1 day",
    groupSize: "10-15",
    rating: 4.6,
    totalReviews: 22,
    flaggedContent: "BEST DEAL!!! LIMITED TIME OFFER!!! BOOK NOW!!!",
    description:
      "Discover the rich history and culture of Delhi with our expert guides. Visit iconic monuments and hidden gems...",
  },
]

export function TripModeration() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [selectedTrip, setSelectedTrip] = useState<any>(null)
  const [moderationNotes, setModerationNotes] = useState("")

  const filteredTrips = tripsForModeration.filter((trip) => {
    const matchesSearch =
      trip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.organizer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || trip.status === statusFilter
    const matchesPriority = priorityFilter === "all" || trip.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  const handleApprove = (tripId: string) => {
    console.log("Approve trip:", tripId, "Notes:", moderationNotes)
    // Implementation for approving trip
  }

  const handleReject = (tripId: string) => {
    console.log("Reject trip:", tripId, "Notes:", moderationNotes)
    // Implementation for rejecting trip
  }

  const handleRequestChanges = (tripId: string) => {
    console.log("Request changes for trip:", tripId, "Notes:", moderationNotes)
    // Implementation for requesting changes
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Trip Moderation</h1>
        <p className="text-gray-600 mt-2">Review and moderate flagged trip content</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-red-600">12</div>
            <p className="text-sm text-gray-600">High Priority</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-orange-600">8</div>
            <p className="text-sm text-gray-600">Under Review</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-blue-600">25</div>
            <p className="text-sm text-gray-600">Total Flagged</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">156</div>
            <p className="text-sm text-gray-600">Resolved Today</p>
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
                placeholder="Search trips..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="flagged">Flagged</SelectItem>
                <SelectItem value="under_review">Under Review</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="high">High Priority</SelectItem>
                <SelectItem value="medium">Medium Priority</SelectItem>
                <SelectItem value="low">Low Priority</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Trips List */}
      <div className="space-y-4">
        {filteredTrips.map((trip) => (
          <Card key={trip.id} className="hover:shadow-md transition-shadow border-l-4 border-l-red-500">
            <CardContent className="pt-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={trip.organizerLogo || "/placeholder.svg"} alt={trip.organizer} />
                    <AvatarFallback>{trip.organizer.charAt(0)}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-lg font-semibold text-gray-900 truncate">{trip.title}</h3>
                      <Badge
                        variant={
                          trip.priority === "high"
                            ? "destructive"
                            : trip.priority === "medium"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {trip.priority}
                      </Badge>
                      <Badge variant="outline">{trip.status}</Badge>
                    </div>

                    <p className="text-sm text-gray-600 mb-2">by {trip.organizer}</p>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-2">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{trip.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{trip.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{trip.groupSize} people</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4" />
                        <span>
                          {trip.rating}/5.0 ({trip.totalReviews} reviews)
                        </span>
                      </div>
                    </div>

                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-2">
                      <div className="flex items-start space-x-2">
                        <Flag className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-red-800">Flag Reason: {trip.flagReason}</p>
                          <p className="text-sm text-red-700">"{trip.flaggedContent}"</p>
                          <p className="text-xs text-red-600 mt-1">
                            Reported by {trip.reportedBy} on {new Date(trip.reportedDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600">Price: ₹{trip.price.toLocaleString()}</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 lg:flex-col xl:flex-row">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => setSelectedTrip(trip)}>
                        <Eye className="h-4 w-4 mr-2" />
                        Review Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>{trip.title}</DialogTitle>
                        <DialogDescription>Review trip content and make moderation decision</DialogDescription>
                      </DialogHeader>

                      <div className="space-y-6">
                        {/* Trip Details */}
                        <div>
                          <h4 className="font-medium mb-2">Trip Description</h4>
                          <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">{trip.description}</p>
                        </div>

                        {/* Flagged Content */}
                        <div>
                          <h4 className="font-medium mb-2 text-red-700">Flagged Content</h4>
                          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                            <p className="text-sm text-red-800 font-medium">Reason: {trip.flagReason}</p>
                            <p className="text-sm text-red-700 mt-1">"{trip.flaggedContent}"</p>
                          </div>
                        </div>

                        {/* Moderation Notes */}
                        <div>
                          <Label htmlFor="moderation-notes">Moderation Notes</Label>
                          <Textarea
                            id="moderation-notes"
                            placeholder="Add notes about your decision..."
                            value={moderationNotes}
                            onChange={(e) => setModerationNotes(e.target.value)}
                            rows={3}
                          />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-2">
                          <Button onClick={() => handleApprove(trip.id)} className="bg-green-600 hover:bg-green-700">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Approve Trip
                          </Button>
                          <Button variant="outline" onClick={() => handleRequestChanges(trip.id)}>
                            <AlertTriangle className="h-4 w-4 mr-2" />
                            Request Changes
                          </Button>
                          <Button variant="destructive" onClick={() => handleReject(trip.id)}>
                            <XCircle className="h-4 w-4 mr-2" />
                            Reject Trip
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Button size="sm" onClick={() => handleApprove(trip.id)} className="bg-green-600 hover:bg-green-700">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Quick Approve
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleReject(trip.id)}>
                    <XCircle className="h-4 w-4 mr-2" />
                    Reject
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
