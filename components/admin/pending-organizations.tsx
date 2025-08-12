"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Filter, Eye, CheckCircle, XCircle, Clock, MapPin, Users } from "lucide-react"
import Link from "next/link"

// Mock data for pending organizations
const pendingOrganizations = [
  {
    id: "1",
    name: "Mountain Adventures Co.",
    tagline: "Leading treks in the Himalayas since 2015",
    type: "Trekking & Adventure",
    location: "Manali, Himachal Pradesh",
    submittedDate: "2024-01-15",
    contactPerson: "Rajesh Kumar",
    email: "rajesh@mountainadventures.com",
    phone: "+91 98765 43210",
    experience: "8 years",
    totalTrips: 150,
    avgRating: 4.7,
    documents: ["Business License", "Insurance Certificate", "Trek Leader Certification"],
    status: "pending",
    priority: "high",
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "Coastal Expeditions",
    tagline: "Beach adventures and water sports specialists",
    type: "Beach & Water Sports",
    location: "Goa",
    submittedDate: "2024-01-14",
    contactPerson: "Maria Fernandes",
    email: "maria@coastalexp.com",
    phone: "+91 98765 43211",
    experience: "5 years",
    totalTrips: 89,
    avgRating: 4.5,
    documents: ["Business License", "Water Sports Certification"],
    status: "under_review",
    priority: "medium",
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    name: "Heritage Walks India",
    tagline: "Discover India's rich cultural heritage",
    type: "Cultural Tours",
    location: "Delhi",
    submittedDate: "2024-01-13",
    contactPerson: "Amit Sharma",
    email: "amit@heritagewalks.in",
    phone: "+91 98765 43212",
    experience: "12 years",
    totalTrips: 300,
    avgRating: 4.8,
    documents: ["Business License", "Tourism License", "Guide Certification"],
    status: "pending",
    priority: "low",
    logo: "/placeholder.svg?height=40&width=40",
  },
]

export function PendingOrganizations() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")

  const filteredOrganizations = pendingOrganizations.filter((org) => {
    const matchesSearch =
      org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || org.status === statusFilter
    const matchesPriority = priorityFilter === "all" || org.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  const handleQuickApprove = (id: string) => {
    console.log("Quick approve organization:", id)
    // Implementation for quick approval
  }

  const handleQuickReject = (id: string) => {
    console.log("Quick reject organization:", id)
    // Implementation for quick rejection
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Pending Organizations</h1>
        <p className="text-gray-600 mt-2">Review and approve organization applications</p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search organizations..."
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
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="under_review">Under Review</SelectItem>
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

      {/* Organizations List */}
      <div className="space-y-4">
        {filteredOrganizations.map((org) => (
          <Card key={org.id} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={org.logo || "/placeholder.svg"} alt={org.name} />
                    <AvatarFallback>{org.name.charAt(0)}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-lg font-semibold text-gray-900 truncate">{org.name}</h3>
                      <Badge
                        variant={
                          org.priority === "high" ? "destructive" : org.priority === "medium" ? "default" : "secondary"
                        }
                      >
                        {org.priority}
                      </Badge>
                      <Badge variant={org.status === "pending" ? "secondary" : "outline"}>
                        {org.status === "pending" ? "Pending" : "Under Review"}
                      </Badge>
                    </div>

                    <p className="text-sm text-gray-600 mb-2">{org.tagline}</p>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{org.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{org.totalTrips} trips</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>Submitted {new Date(org.submittedDate).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="mt-2">
                      <p className="text-sm text-gray-600">
                        <strong>Contact:</strong> {org.contactPerson} • {org.email} • {org.phone}
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Experience:</strong> {org.experience} • <strong>Rating:</strong> {org.avgRating}/5.0
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 lg:flex-col xl:flex-row">
                  <Link href={`/admin/organizations/${org.id}`}>
                    <Button variant="outline" size="sm" className="w-full sm:w-auto bg-transparent">
                      <Eye className="h-4 w-4 mr-2" />
                      Review Details
                    </Button>
                  </Link>
                  <Button
                    size="sm"
                    onClick={() => handleQuickApprove(org.id)}
                    className="w-full sm:w-auto bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Quick Approve
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleQuickReject(org.id)}
                    className="w-full sm:w-auto"
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Reject
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredOrganizations.length === 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <Filter className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No organizations found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
