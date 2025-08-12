"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Eye, Edit, Trash2, Star, MapPin, Award } from "lucide-react"

const mockTripLeaders = [
  {
    id: "1",
    name: "Rahul Sharma",
    email: "rahul@example.com",
    phone: "+91 9876543210",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "active",
    experience: "5+ years",
    specialization: "Mountain Trekking",
    location: "Himachal Pradesh",
    rating: 4.8,
    totalTrips: 45,
    joinedDate: "2019-03-15",
    certifications: ["Wilderness First Aid", "Mountain Guide Level 2"],
  },
  {
    id: "2",
    name: "Priya Patel",
    email: "priya@example.com",
    phone: "+91 9876543211",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "active",
    experience: "3+ years",
    specialization: "Adventure Sports",
    location: "Goa",
    rating: 4.6,
    totalTrips: 28,
    joinedDate: "2021-07-20",
    certifications: ["Water Sports Instructor", "First Aid Certified"],
  },
  {
    id: "3",
    name: "Amit Kumar",
    email: "amit@example.com",
    phone: "+91 9876543212",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "inactive",
    experience: "7+ years",
    specialization: "Desert Safari",
    location: "Rajasthan",
    rating: 4.9,
    totalTrips: 67,
    joinedDate: "2017-01-10",
    certifications: ["Desert Guide", "Cultural Heritage Expert"],
  },
]

export function TripLeaders() {
  const [leaders, setLeaders] = useState(mockTripLeaders)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredLeaders = leaders.filter((leader) => {
    const matchesSearch =
      leader.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      leader.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      leader.specialization.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || leader.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Trip Leaders</h1>
        <p className="text-gray-600 mt-1">Manage trip leaders and guides</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search trip leaders..."
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
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {filteredLeaders.map((leader) => (
          <Card key={leader.id}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div className="flex items-start space-x-4 flex-1">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={leader.avatar || "/placeholder.svg"} alt={leader.name} />
                    <AvatarFallback>{leader.name.charAt(0)}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{leader.name}</h3>
                      <Badge variant={leader.status === "active" ? "default" : "secondary"}>{leader.status}</Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      <div className="space-y-1">
                        <p className="text-sm text-gray-600">{leader.email}</p>
                        <p className="text-sm text-gray-600">{leader.phone}</p>
                        <div className="flex items-center space-x-1 text-sm text-gray-600">
                          <MapPin className="h-4 w-4" />
                          <span>{leader.location}</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="font-medium">{leader.rating}</span>
                          <span className="text-gray-500">({leader.totalTrips} trips)</span>
                        </div>
                        <p className="text-sm text-gray-600">Experience: {leader.experience}</p>
                        <p className="text-sm text-gray-600">Specialization: {leader.specialization}</p>
                      </div>
                    </div>

                    <div className="mb-3">
                      <p className="text-sm font-medium text-gray-700 mb-1">Certifications:</p>
                      <div className="flex flex-wrap gap-1">
                        {leader.certifications.map((cert, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            <Award className="h-3 w-3 mr-1" />
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="text-sm text-gray-500">
                      Joined: {new Date(leader.joinedDate).toLocaleDateString()}
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
                    <Trash2 className="h-4 w-4 mr-2" />
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
