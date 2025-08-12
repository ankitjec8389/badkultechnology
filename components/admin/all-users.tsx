"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Eye, UserCheck, UserX, Calendar, MapPin, Phone, Mail } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Mock data for all users
const allUsers = [
  {
    id: "1",
    name: "Priya Sharma",
    email: "priya.sharma@email.com",
    phone: "+91 98765 43210",
    type: "traveler",
    status: "active",
    joinDate: "2024-01-15",
    location: "Mumbai, Maharashtra",
    totalBookings: 5,
    totalSpent: 125000,
    lastActivity: "2024-01-20",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "Rajesh Kumar",
    email: "rajesh@mountainadventures.com",
    phone: "+91 98765 43211",
    type: "organizer",
    status: "active",
    joinDate: "2023-06-10",
    location: "Manali, Himachal Pradesh",
    totalBookings: 150,
    totalSpent: 0,
    lastActivity: "2024-01-21",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    name: "Amit Gupta",
    email: "amit.gupta@email.com",
    phone: "+91 98765 43212",
    type: "trip_leader",
    status: "active",
    joinDate: "2023-08-20",
    location: "Delhi",
    totalBookings: 25,
    totalSpent: 0,
    lastActivity: "2024-01-19",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "4",
    name: "Sneha Patel",
    email: "sneha.patel@email.com",
    phone: "+91 98765 43213",
    type: "traveler",
    status: "suspended",
    joinDate: "2023-12-05",
    location: "Ahmedabad, Gujarat",
    totalBookings: 2,
    totalSpent: 45000,
    lastActivity: "2024-01-10",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export function AllUsers() {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedUser, setSelectedUser] = useState<any>(null)

  const filteredUsers = allUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || user.type === typeFilter
    const matchesStatus = statusFilter === "all" || user.status === statusFilter

    return matchesSearch && matchesType && matchesStatus
  })

  const handleActivateUser = (userId: string) => {
    console.log("Activate user:", userId)
    // Implementation for activating user
  }

  const handleSuspendUser = (userId: string) => {
    console.log("Suspend user:", userId)
    // Implementation for suspending user
  }

  const getUserTypeColor = (type: string) => {
    switch (type) {
      case "traveler":
        return "bg-blue-100 text-blue-800"
      case "organizer":
        return "bg-green-100 text-green-800"
      case "trip_leader":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">All Users</h1>
        <p className="text-gray-600 mt-2">Manage all platform users - travelers, organizers, and trip leaders</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-blue-600">12,845</div>
            <p className="text-sm text-gray-600">Total Users</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">11,200</div>
            <p className="text-sm text-gray-600">Active Users</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-orange-600">1,645</div>
            <p className="text-sm text-gray-600">New This Month</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-red-600">125</div>
            <p className="text-sm text-gray-600">Suspended</p>
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
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="traveler">Travelers</SelectItem>
                <SelectItem value="organizer">Organizers</SelectItem>
                <SelectItem value="trip_leader">Trip Leaders</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users List */}
      <div className="space-y-4">
        {filteredUsers.map((user) => (
          <Card key={user.id} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-lg font-semibold text-gray-900 truncate">{user.name}</h3>
                      <Badge className={getUserTypeColor(user.type)}>{user.type.replace("_", " ")}</Badge>
                      <Badge variant={user.status === "active" ? "default" : "secondary"}>{user.status}</Badge>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-2">
                      <div className="flex items-center space-x-1">
                        <Mail className="h-4 w-4" />
                        <span>{user.email}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Phone className="h-4 w-4" />
                        <span>{user.phone}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{user.location}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>Joined {new Date(user.joinDate).toLocaleDateString()}</span>
                      </div>
                      <span>•</span>
                      <span>
                        {user.type === "traveler"
                          ? `${user.totalBookings} bookings • ₹${user.totalSpent.toLocaleString()} spent`
                          : user.type === "organizer"
                            ? `${user.totalBookings} trips organized`
                            : `${user.totalBookings} trips led`}
                      </span>
                      <span>•</span>
                      <span>Last active {new Date(user.lastActivity).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 lg:flex-col xl:flex-row">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => setSelectedUser(user)}>
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>{user.name}</DialogTitle>
                        <DialogDescription>User profile and activity details</DialogDescription>
                      </DialogHeader>
                      {selectedUser && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm font-medium text-gray-500">Email</p>
                              <p className="text-sm">{selectedUser.email}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">Phone</p>
                              <p className="text-sm">{selectedUser.phone}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">Location</p>
                              <p className="text-sm">{selectedUser.location}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">User Type</p>
                              <p className="text-sm capitalize">{selectedUser.type.replace("_", " ")}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">Join Date</p>
                              <p className="text-sm">{new Date(selectedUser.joinDate).toLocaleDateString()}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">Status</p>
                              <Badge variant={selectedUser.status === "active" ? "default" : "secondary"}>
                                {selectedUser.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>

                  {user.status === "active" ? (
                    <Button variant="destructive" size="sm" onClick={() => handleSuspendUser(user.id)}>
                      <UserX className="h-4 w-4 mr-2" />
                      Suspend
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      onClick={() => handleActivateUser(user.id)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <UserCheck className="h-4 w-4 mr-2" />
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
