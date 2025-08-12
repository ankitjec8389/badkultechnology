"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Eye, Edit, Ban, MapPin, Calendar, Heart } from "lucide-react"

const mockTravelers = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "+91 9876543210",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "active",
    location: "Mumbai",
    joinedDate: "2023-05-15",
    totalBookings: 8,
    savedTrips: 15,
    lastActivity: "2024-01-15",
    ageGroup: "25-30",
    preferences: ["Adventure", "Mountains", "Trekking"],
  },
  {
    id: "2",
    name: "Raj Patel",
    email: "raj@example.com",
    phone: "+91 9876543211",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "active",
    location: "Delhi",
    joinedDate: "2023-08-20",
    totalBookings: 12,
    savedTrips: 23,
    lastActivity: "2024-01-14",
    ageGroup: "31-36",
    preferences: ["Beach", "Relaxation", "Family"],
  },
  {
    id: "3",
    name: "Anita Sharma",
    email: "anita@example.com",
    phone: "+91 9876543212",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "suspended",
    location: "Bangalore",
    joinedDate: "2023-02-10",
    totalBookings: 3,
    savedTrips: 7,
    lastActivity: "2024-01-10",
    ageGroup: "18-24",
    preferences: ["Solo Travel", "Culture", "Heritage"],
  },
]

export function TravelerUsers() {
  const [travelers, setTravelers] = useState(mockTravelers)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredTravelers = travelers.filter((traveler) => {
    const matchesSearch =
      traveler.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      traveler.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      traveler.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || traveler.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Traveler Users</h1>
        <p className="text-gray-600 mt-1">Manage traveler accounts and profiles</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search travelers..."
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
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {filteredTravelers.map((traveler) => (
          <Card key={traveler.id}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div className="flex items-start space-x-4 flex-1">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={traveler.avatar || "/placeholder.svg"} alt={traveler.name} />
                    <AvatarFallback>{traveler.name.charAt(0)}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{traveler.name}</h3>
                      <Badge variant={traveler.status === "active" ? "default" : "destructive"}>
                        {traveler.status}
                      </Badge>
                      <Badge variant="outline">{traveler.ageGroup}</Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      <div className="space-y-1">
                        <p className="text-sm text-gray-600">{traveler.email}</p>
                        <p className="text-sm text-gray-600">{traveler.phone}</p>
                        <div className="flex items-center space-x-1 text-sm text-gray-600">
                          <MapPin className="h-4 w-4" />
                          <span>{traveler.location}</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-gray-600">Bookings: {traveler.totalBookings}</p>
                        <div className="flex items-center space-x-1 text-sm text-gray-600">
                          <Heart className="h-4 w-4" />
                          <span>Saved trips: {traveler.savedTrips}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-sm text-gray-600">
                          <Calendar className="h-4 w-4" />
                          <span>Last active: {new Date(traveler.lastActivity).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mb-3">
                      <p className="text-sm font-medium text-gray-700 mb-1">Travel Preferences:</p>
                      <div className="flex flex-wrap gap-1">
                        {traveler.preferences.map((pref, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {pref}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="text-sm text-gray-500">
                      Joined: {new Date(traveler.joinedDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View Profile
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    <Ban className="h-4 w-4 mr-2" />
                    {traveler.status === "active" ? "Suspend" : "Activate"}
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
