"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Users,
  Phone,
  MessageSquare,
  Calendar,
  MapPin,
  Clock,
  CheckCircle,
  AlertTriangle,
  Search,
  Filter,
  Bell,
} from "lucide-react"

// Mock data
const leads = [
  {
    id: 1,
    tripName: "Himalayan Winter Trek",
    userName: "Arjun Singh",
    userPhone: "+91 9876543210",
    userAge: 28,
    userGender: "Male",
    communicationPreference: "whatsapp",
    bookingRequestTime: "2024-12-08T10:30:00Z",
    status: "new",
    hasNudged: false,
    lastNudgeTime: null,
    notes: "",
    tripPrice: 15000,
    tripStartDate: "2025-02-15",
  },
  {
    id: 2,
    tripName: "Goa Beach Adventure",
    userName: "Kavya Reddy",
    userPhone: "+91 9876543211",
    userAge: 25,
    userGender: "Female",
    communicationPreference: "call",
    bookingRequestTime: "2024-12-07T14:15:00Z",
    status: "contacted",
    hasNudged: true,
    lastNudgeTime: "2024-12-08T09:00:00Z",
    notes: "Interested but needs to check dates with friends",
    tripPrice: 12000,
    tripStartDate: "2025-01-20",
  },
  {
    id: 3,
    tripName: "Kerala Backwaters",
    userName: "Rohit Sharma",
    userPhone: "+91 9876543212",
    userAge: 32,
    userGender: "Male",
    communicationPreference: "message",
    bookingRequestTime: "2024-12-06T09:45:00Z",
    status: "converted",
    hasNudged: false,
    lastNudgeTime: null,
    notes: "Booked for 2 people, paid advance",
    tripPrice: 18000,
    tripStartDate: "2025-03-10",
  },
  {
    id: 4,
    tripName: "Rajasthan Desert Safari",
    userName: "Meera Joshi",
    userPhone: "+91 9876543213",
    userAge: 29,
    userGender: "Female",
    communicationPreference: "whatsapp",
    bookingRequestTime: "2024-12-05T11:20:00Z",
    status: "new",
    hasNudged: false,
    lastNudgeTime: null,
    notes: "",
    tripPrice: 20000,
    tripStartDate: "2025-04-05",
  },
]

const statusColors = {
  new: "bg-blue-100 text-blue-800",
  contacted: "bg-yellow-100 text-yellow-800",
  converted: "bg-green-100 text-green-800",
  lost: "bg-red-100 text-red-800",
}

export function ViewLeads() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [tripFilter, setTripFilter] = useState("all")
  const [selectedLead, setSelectedLead] = useState<any>(null)

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.tripName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || lead.status === statusFilter
    const matchesTrip = tripFilter === "all" || lead.tripName === tripFilter
    return matchesSearch && matchesStatus && matchesTrip
  })

  const stats = [
    {
      title: "Total Leads",
      value: leads.length.toString(),
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "New Leads",
      value: leads.filter((l) => l.status === "new").length.toString(),
      icon: AlertTriangle,
      color: "text-orange-600",
    },
    {
      title: "Converted",
      value: leads.filter((l) => l.status === "converted").length.toString(),
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      title: "Conversion Rate",
      value: `${Math.round((leads.filter((l) => l.status === "converted").length / leads.length) * 100)}%`,
      icon: Users,
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

  const getTimeSinceRequest = (dateString: string) => {
    const now = new Date()
    const requestDate = new Date(dateString)
    const diffInHours = Math.floor((now.getTime() - requestDate.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 24) {
      return `${diffInHours}h ago`
    } else {
      const diffInDays = Math.floor(diffInHours / 24)
      return `${diffInDays}d ago`
    }
  }

  const canNudge = (lead: any) => {
    if (lead.status === "converted" || lead.status === "lost") return false
    if (!lead.hasNudged) return true

    const lastNudge = new Date(lead.lastNudgeTime || lead.bookingRequestTime)
    const now = new Date()
    const hoursSinceNudge = (now.getTime() - lastNudge.getTime()) / (1000 * 60 * 60)
    return hoursSinceNudge >= 6
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Leads</h1>
          <p className="text-gray-600 mt-1">Manage and follow up with potential customers</p>
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
                placeholder="Search leads..."
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
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="converted">Converted</SelectItem>
                <SelectItem value="lost">Lost</SelectItem>
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

      {/* Leads List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Leads</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredLeads.map((lead) => (
              <div key={lead.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold text-gray-900">{lead.userName}</h3>
                      <Badge className={statusColors[lead.status as keyof typeof statusColors]}>{lead.status}</Badge>
                      {lead.hasNudged && (
                        <Badge variant="outline" className="text-orange-600">
                          Nudged
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">Trip: {lead.tripName}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-1" />
                        {lead.userPhone}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {lead.userAge}y, {lead.userGender}
                      </div>
                      <div className="flex items-center">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        {lead.communicationPreference}
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(lead.bookingRequestTime)}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {getTimeSinceRequest(lead.bookingRequestTime)}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />₹{lead.tripPrice.toLocaleString()}
                      </div>
                    </div>
                    {lead.notes && (
                      <p className="text-sm text-gray-700 mt-2 bg-gray-100 p-2 rounded">
                        <strong>Notes:</strong> {lead.notes}
                      </p>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    {canNudge(lead) && (
                      <Button variant="outline" size="sm">
                        <Bell className="h-4 w-4 mr-2" />
                        Nudge
                      </Button>
                    )}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setSelectedLead(lead)}>
                          Manage
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Manage Lead</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="font-medium mb-2">{lead.userName}</h3>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <p>
                                  <strong>Phone:</strong> {lead.userPhone}
                                </p>
                                <p>
                                  <strong>Age:</strong> {lead.userAge}
                                </p>
                                <p>
                                  <strong>Gender:</strong> {lead.userGender}
                                </p>
                              </div>
                              <div>
                                <p>
                                  <strong>Trip:</strong> {lead.tripName}
                                </p>
                                <p>
                                  <strong>Price:</strong> ₹{lead.tripPrice.toLocaleString()}
                                </p>
                                <p>
                                  <strong>Preference:</strong> {lead.communicationPreference}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="status">Update Status</Label>
                            <Select defaultValue={lead.status}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="new">New</SelectItem>
                                <SelectItem value="contacted">Contacted</SelectItem>
                                <SelectItem value="converted">Converted</SelectItem>
                                <SelectItem value="lost">Lost</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="notes">Notes</Label>
                            <Textarea
                              id="notes"
                              placeholder="Add notes about this lead..."
                              defaultValue={lead.notes}
                              rows={3}
                            />
                          </div>
                          <div className="flex justify-end space-x-2">
                            <Button variant="outline">Cancel</Button>
                            <Button>Update Lead</Button>
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
