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
import { Search, Eye, CheckCircle, XCircle, Flag, AlertTriangle, MessageSquare, User, Calendar } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Mock data for reported content
const reportedContent = [
  {
    id: "1",
    type: "trip",
    title: "Inappropriate trip description",
    contentTitle: "Himalayan Base Camp Trek",
    reportedBy: "User #1234",
    reporterName: "Priya Sharma",
    reportedDate: "2024-01-15",
    category: "inappropriate_content",
    priority: "high",
    status: "pending",
    description:
      "The trip description contains misleading information about safety measures and includes inappropriate language.",
    reportedContent: "This trek is totally safe, no need for any safety gear or experience. Just come and enjoy!",
    contentOwner: "Mountain Adventures Co.",
    contentOwnerLogo: "/placeholder.svg?height=40&width=40",
    reportCount: 3,
  },
  {
    id: "2",
    type: "review",
    title: "Spam review detected",
    contentTitle: "Review for Beach Paradise Tours",
    reportedBy: "System",
    reporterName: "Auto-moderation",
    reportedDate: "2024-01-14",
    category: "spam",
    priority: "medium",
    status: "under_review",
    description: "Multiple identical reviews posted from different accounts.",
    reportedContent: "Best trip ever! Amazing experience! 5 stars! Highly recommended! Book now!",
    contentOwner: "Beach Paradise Tours",
    contentOwnerLogo: "/placeholder.svg?height=40&width=40",
    reportCount: 1,
  },
  {
    id: "3",
    type: "organization",
    title: "Fake certification documents",
    contentTitle: "Heritage Walks India Profile",
    reportedBy: "User #5678",
    reporterName: "Rajesh Kumar",
    reportedDate: "2024-01-13",
    category: "fraud",
    priority: "high",
    status: "investigating",
    description: "The organization has uploaded fake tourism certification documents.",
    reportedContent: "Tourism License: TL/2023/FAKE001 - This license number does not exist in government records.",
    contentOwner: "Heritage Walks India",
    contentOwnerLogo: "/placeholder.svg?height=40&width=40",
    reportCount: 2,
  },
]

export function ReportedContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [selectedReport, setSelectedReport] = useState<any>(null)
  const [actionNotes, setActionNotes] = useState("")

  const filteredReports = reportedContent.filter((report) => {
    const matchesSearch =
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.contentTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.contentOwner.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || report.type === typeFilter
    const matchesStatus = statusFilter === "all" || report.status === statusFilter
    const matchesPriority = priorityFilter === "all" || report.priority === priorityFilter

    return matchesSearch && matchesType && matchesStatus && matchesPriority
  })

  const handleResolve = (reportId: string, action: string) => {
    console.log("Resolve report:", reportId, "Action:", action, "Notes:", actionNotes)
    // Implementation for resolving report
  }

  const handleDismiss = (reportId: string) => {
    console.log("Dismiss report:", reportId, "Notes:", actionNotes)
    // Implementation for dismissing report
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Reported Content</h1>
        <p className="text-gray-600 mt-2">Review and handle user-reported content</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-red-600">15</div>
            <p className="text-sm text-gray-600">High Priority</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-orange-600">23</div>
            <p className="text-sm text-gray-600">Under Review</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-blue-600">45</div>
            <p className="text-sm text-gray-600">Total Reports</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">89</div>
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
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="trip">Trips</SelectItem>
                <SelectItem value="review">Reviews</SelectItem>
                <SelectItem value="organization">Organizations</SelectItem>
              </SelectContent>
            </Select>
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
          </div>
        </CardContent>
      </Card>

      {/* Reports List */}
      <div className="space-y-4">
        {filteredReports.map((report) => (
          <Card key={report.id} className="hover:shadow-md transition-shadow border-l-4 border-l-orange-500">
            <CardContent className="pt-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    {report.type === "trip" && <Flag className="h-8 w-8 text-red-600" />}
                    {report.type === "review" && <MessageSquare className="h-8 w-8 text-blue-600" />}
                    {report.type === "organization" && <User className="h-8 w-8 text-purple-600" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-lg font-semibold text-gray-900 truncate">{report.title}</h3>
                      <Badge
                        variant={
                          report.type === "trip" ? "destructive" : report.type === "review" ? "default" : "secondary"
                        }
                      >
                        {report.type}
                      </Badge>
                      <Badge
                        variant={
                          report.priority === "high"
                            ? "destructive"
                            : report.priority === "medium"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {report.priority}
                      </Badge>
                      <Badge variant="outline">{report.status}</Badge>
                    </div>

                    <p className="text-sm text-gray-600 mb-2">Content: {report.contentTitle}</p>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-2">
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>Reported by {report.reporterName}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(report.reportedDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Flag className="h-4 w-4" />
                        <span>{report.reportCount} report(s)</span>
                      </div>
                    </div>

                    <p className="text-sm text-gray-700 mb-2">{report.description}</p>

                    <div className="flex items-center space-x-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={report.contentOwnerLogo || "/placeholder.svg"} alt={report.contentOwner} />
                        <AvatarFallback>{report.contentOwner.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-gray-600">Content by {report.contentOwner}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 lg:flex-col xl:flex-row">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => setSelectedReport(report)}>
                        <Eye className="h-4 w-4 mr-2" />
                        Investigate
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>{report.title}</DialogTitle>
                        <DialogDescription>Review reported content and take appropriate action</DialogDescription>
                      </DialogHeader>

                      <div className="space-y-6">
                        {/* Report Details */}
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-sm font-medium text-gray-500">Report Type</Label>
                            <p className="text-sm capitalize">{report.type}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-500">Category</Label>
                            <p className="text-sm capitalize">{report.category.replace("_", " ")}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-500">Reported By</Label>
                            <p className="text-sm">{report.reporterName}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-500">Report Count</Label>
                            <p className="text-sm">{report.reportCount} report(s)</p>
                          </div>
                        </div>

                        {/* Reported Content */}
                        <div>
                          <h4 className="font-medium mb-2 text-red-700">Reported Content</h4>
                          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                            <p className="text-sm text-red-700">"{report.reportedContent}"</p>
                          </div>
                        </div>

                        {/* Report Description */}
                        <div>
                          <h4 className="font-medium mb-2">Report Description</h4>
                          <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">{report.description}</p>
                        </div>

                        {/* Action Notes */}
                        <div>
                          <Label htmlFor="action-notes">Action Notes</Label>
                          <Textarea
                            id="action-notes"
                            placeholder="Add notes about your decision..."
                            value={actionNotes}
                            onChange={(e) => setActionNotes(e.target.value)}
                            rows={3}
                          />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-2">
                          <Button onClick={() => handleResolve(report.id, "remove_content")} variant="destructive">
                            <XCircle className="h-4 w-4 mr-2" />
                            Remove Content
                          </Button>
                          <Button onClick={() => handleResolve(report.id, "warn_user")} variant="outline">
                            <AlertTriangle className="h-4 w-4 mr-2" />
                            Warn Content Owner
                          </Button>
                          <Button onClick={() => handleDismiss(report.id)} className="bg-green-600 hover:bg-green-700">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Dismiss Report
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Button
                    size="sm"
                    onClick={() => handleDismiss(report.id)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Dismiss
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleResolve(report.id, "remove")}>
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
