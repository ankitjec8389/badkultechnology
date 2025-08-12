"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Eye, Pause, Play, Settings, MapPin, Users, Star, Calendar } from "lucide-react"
import Link from "next/link"

// Mock data for active organizations
const activeOrganizations = [
  {
    id: "1",
    name: "Himalayan Treks Co.",
    tagline: "Premium trekking experiences in the Himalayas",
    type: "Trekking & Adventure",
    location: "Manali, Himachal Pradesh",
    joinedDate: "2023-06-15",
    status: "active",
    totalTrips: 45,
    activeTrips: 12,
    completedTrips: 33,
    avgRating: 4.8,
    totalBookings: 1250,
    monthlyRevenue: 450000,
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "Beach Paradise Tours",
    tagline: "Tropical getaways and beach adventures",
    type: "Beach & Water Sports",
    location: "Goa",
    joinedDate: "2023-03-20",
    status: "active",
    totalTrips: 28,
    activeTrips: 8,
    completedTrips: 20,
    avgRating: 4.6,
    totalBookings: 890,
    monthlyRevenue: 320000,
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    name: "Cultural Heritage Walks",
    tagline: "Discover India's rich cultural heritage",
    type: "Cultural Tours",
    location: "Delhi",
    joinedDate: "2022-11-10",
    status: "suspended",
    totalTrips: 67,
    activeTrips: 0,
    completedTrips: 67,
    avgRating: 4.4,
    totalBookings: 2100,
    monthlyRevenue: 0,
    logo: "/placeholder.svg?height=40&width=40",
  },
]

export function ActiveOrganizations() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const filteredOrganizations = activeOrganizations.filter((org) => {
    const matchesSearch =
      org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || org.status === statusFilter
    const matchesType = typeFilter === "all" || org.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  const handleSuspend = (id: string) => {
    console.log("Suspend organization:", id)
    // Implementation for suspending organization
  }

  const handleActivate = (id: string) => {
    console.log("Activate organization:", id)
    // Implementation for activating organization
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Active Organizations</h1>
        <p className="text-gray-600 mt-2">Manage approved and active organizations</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">247</div>
            <p className="text-sm text-gray-600">Total Active</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-orange-600">12</div>
            <p className="text-sm text-gray-600">Suspended</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-blue-600">1,245</div>
            <p className="text-sm text-gray-600">Total Trips</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-purple-600">₹12.5L</div>
            <p className="text-sm text-gray-600">Monthly Revenue</p>
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
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Trekking & Adventure">Trekking & Adventure</SelectItem>
                <SelectItem value="Beach & Water Sports">Beach & Water Sports</SelectItem>
                <SelectItem value="Cultural Tours">Cultural Tours</SelectItem>
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
                      <Badge variant={org.status === "active" ? "default" : "secondary"}>{org.status}</Badge>
                    </div>

                    <p className="text-sm text-gray-600 mb-2">{org.tagline}</p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center space-x-1 text-gray-500">
                        <MapPin className="h-4 w-4" />
                        <span>{org.location}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-gray-500">
                        <Users className="h-4 w-4" />
                        <span>{org.totalTrips} trips</span>
                      </div>
                      <div className="flex items-center space-x-1 text-gray-500">
                        <Star className="h-4 w-4" />
                        <span>{org.avgRating}/5.0</span>
                      </div>
                      <div className="flex items-center space-x-1 text-gray-500">
                        <Calendar className="h-4 w-4" />
                        <span>Since {new Date(org.joinedDate).getFullYear()}</span>
                      </div>
                    </div>

                    <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Active Trips:</span>
                        <span className="ml-1 font-medium">{org.activeTrips}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Total Bookings:</span>
                        <span className="ml-1 font-medium">{org.totalBookings}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Monthly Revenue:</span>
                        <span className="ml-1 font-medium">₹{(org.monthlyRevenue / 1000).toFixed(0)}K</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Type:</span>
                        <span className="ml-1 font-medium">{org.type}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 lg:flex-col xl:flex-row">
                  <Link href={`/admin/organizations/${org.id}`}>
                    <Button variant="outline" size="sm" className="w-full sm:w-auto bg-transparent">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm" className="w-full sm:w-auto bg-transparent">
                    <Settings className="h-4 w-4 mr-2" />
                    Manage
                  </Button>
                  {org.status === "active" ? (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleSuspend(org.id)}
                      className="w-full sm:w-auto"
                    >
                      <Pause className="h-4 w-4 mr-2" />
                      Suspend
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      onClick={() => handleActivate(org.id)}
                      className="w-full sm:w-auto bg-green-600 hover:bg-green-700"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Activate
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
