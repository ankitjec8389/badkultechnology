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
import { Search, Eye, CheckCircle, XCircle, Star, Flag, Calendar, MessageSquare } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Mock data for flagged reviews
const flaggedReviews = [
  {
    id: "1",
    tripTitle: "Himalayan Base Camp Trek",
    organizer: "Mountain Adventures Co.",
    organizerLogo: "/placeholder.svg?height=40&width=40",
    reviewer: "Priya Sharma",
    reviewerAvatar: "/placeholder.svg?height=40&width=40",
    rating: 1,
    reviewDate: "2024-01-15",
    flagReason: "Inappropriate language",
    flaggedBy: "User #5678",
    flagDate: "2024-01-16",
    status: "pending",
    priority: "high",
    reviewText:
      "This trip was absolutely terrible! The guide was completely incompetent and the food was disgusting. I want my money back immediately! This company is a total scam and should be shut down!",
    flaggedContent: "Contains harsh language and potentially defamatory statements",
    tripId: "trip_001",
  },
  {
    id: "2",
    tripTitle: "Goa Beach Party Weekend",
    organizer: "Coastal Expeditions",
    organizerLogo: "/placeholder.svg?height=40&width=40",
    reviewer: "Anonymous User",
    reviewerAvatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    reviewDate: "2024-01-14",
    flagReason: "Spam/Fake review",
    flaggedBy: "System",
    flagDate: "2024-01-14",
    status: "under_review",
    priority: "medium",
    reviewText:
      "Best trip ever! Amazing experience! 5 stars! Highly recommended! Book now! Contact me for discount codes! WhatsApp: +91 99999 99999",
    flaggedContent: "Contains promotional content and contact information, likely spam",
    tripId: "trip_002",
  },
  {
    id: "3",
    tripTitle: "Delhi Heritage Walk",
    organizer: "Heritage Walks India",
    organizerLogo: "/placeholder.svg?height=40&width=40",
    reviewer: "Rajesh Kumar",
    reviewerAvatar: "/placeholder.svg?height=40&width=40",
    rating: 2,
    reviewDate: "2024-01-13",
    flagReason: "Off-topic content",
    flaggedBy: "User #1234",
    flagDate: "2024-01-13",
    status: "investigating",
    priority: "low",
    reviewText:
      "The weather was bad during my trip. Also, I had personal issues at home which affected my mood. The guide was okay but I was distracted by family problems. My cousin's wedding is next month and I'm stressed about the arrangements.",
    flaggedContent: "Review focuses on personal issues rather than trip experience",
    tripId: "trip_003",
  },
]

export function FlaggedReviews() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [ratingFilter, setRatingFilter] = useState("all")
  const [selectedReview, setSelectedReview] = useState<any>(null)
  const [moderationNotes, setModerationNotes] = useState("")

  const filteredReviews = flaggedReviews.filter((review) => {
    const matchesSearch =
      review.tripTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.organizer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.reviewer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || review.status === statusFilter
    const matchesPriority = priorityFilter === "all" || review.priority === priorityFilter
    const matchesRating = ratingFilter === "all" || review.rating.toString() === ratingFilter

    return matchesSearch && matchesStatus && matchesPriority && matchesRating
  })

  const handleApprove = (reviewId: string) => {
    console.log("Approve review:", reviewId, "Notes:", moderationNotes)
    // Implementation for approving review
  }

  const handleRemove = (reviewId: string) => {
    console.log("Remove review:", reviewId, "Notes:", moderationNotes)
    // Implementation for removing review
  }

  const handleEdit = (reviewId: string) => {
    console.log("Request edit for review:", reviewId, "Notes:", moderationNotes)
    // Implementation for requesting review edit
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
    ))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Flagged Reviews</h1>
        <p className="text-gray-600 mt-2">Review and moderate flagged user reviews</p>
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
            <p className="text-sm text-gray-600">Under Review</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-blue-600">32</div>
            <p className="text-sm text-gray-600">Total Flagged</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">127</div>
            <p className="text-sm text-gray-600">Resolved This Week</p>
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
                placeholder="Search reviews..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="under_review">Under Review</SelectItem>
                <SelectItem value="investigating">Investigating</SelectItem>
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
            <Select value={ratingFilter} onValueChange={setRatingFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ratings</SelectItem>
                <SelectItem value="1">1 Star</SelectItem>
                <SelectItem value="2">2 Stars</SelectItem>
                <SelectItem value="3">3 Stars</SelectItem>
                <SelectItem value="4">4 Stars</SelectItem>
                <SelectItem value="5">5 Stars</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.map((review) => (
          <Card key={review.id} className="hover:shadow-md transition-shadow border-l-4 border-l-yellow-500">
            <CardContent className="pt-6">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                <div className="flex items-start space-x-4 flex-1">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={review.reviewerAvatar || "/placeholder.svg"} alt={review.reviewer} />
                    <AvatarFallback>{review.reviewer.charAt(0)}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium text-gray-900">{review.reviewer}</h4>
                      <div className="flex items-center space-x-1">{renderStars(review.rating)}</div>
                      <Badge
                        variant={
                          review.priority === "high"
                            ? "destructive"
                            : review.priority === "medium"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {review.priority}
                      </Badge>
                      <Badge variant="outline">{review.status}</Badge>
                    </div>

                    <p className="text-sm text-gray-600 mb-2">
                      Review for: <span className="font-medium">{review.tripTitle}</span> by {review.organizer}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>Reviewed {new Date(review.reviewDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Flag className="h-4 w-4" />
                        <span>Flagged {new Date(review.flagDate).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="bg-gray-50 border rounded-lg p-3 mb-3">
                      <p className="text-sm text-gray-700 line-clamp-3">{review.reviewText}</p>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                      <div className="flex items-start space-x-2">
                        <Flag className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-yellow-800">Flag Reason: {review.flagReason}</p>
                          <p className="text-sm text-yellow-700">{review.flaggedContent}</p>
                          <p className="text-xs text-yellow-600 mt-1">Flagged by {review.flaggedBy}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 lg:flex-col xl:flex-row">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => setSelectedReview(review)}>
                        <Eye className="h-4 w-4 mr-2" />
                        Review Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Review Moderation</DialogTitle>
                        <DialogDescription>Review flagged content and make moderation decision</DialogDescription>
                      </DialogHeader>

                      <div className="space-y-6">
                        {/* Review Details */}
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-sm font-medium text-gray-500">Reviewer</Label>
                            <p className="text-sm">{review.reviewer}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-500">Rating</Label>
                            <div className="flex items-center space-x-1">{renderStars(review.rating)}</div>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-500">Trip</Label>
                            <p className="text-sm">{review.tripTitle}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-500">Organizer</Label>
                            <p className="text-sm">{review.organizer}</p>
                          </div>
                        </div>

                        {/* Full Review Text */}
                        <div>
                          <h4 className="font-medium mb-2">Full Review</h4>
                          <div className="bg-gray-50 border rounded-lg p-3">
                            <p className="text-sm text-gray-700">{review.reviewText}</p>
                          </div>
                        </div>

                        {/* Flag Information */}
                        <div>
                          <h4 className="font-medium mb-2 text-yellow-700">Flag Information</h4>
                          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                            <p className="text-sm text-yellow-800 font-medium">Reason: {review.flagReason}</p>
                            <p className="text-sm text-yellow-700 mt-1">{review.flaggedContent}</p>
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
                          <Button onClick={() => handleApprove(review.id)} className="bg-green-600 hover:bg-green-700">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Approve Review
                          </Button>
                          <Button variant="outline" onClick={() => handleEdit(review.id)}>
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Request Edit
                          </Button>
                          <Button variant="destructive" onClick={() => handleRemove(review.id)}>
                            <XCircle className="h-4 w-4 mr-2" />
                            Remove Review
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Button
                    size="sm"
                    onClick={() => handleApprove(review.id)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approve
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleRemove(review.id)}>
                    <XCircle className="h-4 w-4 mr-2" />
                    Remove
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
