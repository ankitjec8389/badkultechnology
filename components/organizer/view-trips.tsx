"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Calendar,
  MapPin,
  Users,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  Star,
  MessageSquare,
  TrendingUp,
  Archive,
  Copy,
  Share,
} from "lucide-react"

// Mock data
const mockTrips = {
  upcoming: [
    {
      id: 1,
      title: "Himalayan Winter Trek",
      destination: "Himachal Pradesh",
      startDate: "2025-02-15",
      endDate: "2025-02-20",
      status: "Published",
      bookings: 12,
      maxCapacity: 15,
      rating: 4.8,
      views: 245,
      queries: 8,
      price: 15000,
      type: "Trek",
    },
    {
      id: 2,
      title: "Goa Beach Adventure",
      destination: "Goa",
      startDate: "2025-01-20",
      endDate: "2025-01-25",
      status: "Under Review",
      bookings: 8,
      maxCapacity: 20,
      rating: 4.6,
      views: 189,
      queries: 5,
      price: 12000,
      type: "Beach",
    },
  ],
  past: [
    {
      id: 3,
      title: "Kerala Backwaters",
      destination: "Kerala",
      startDate: "2024-12-10",
      endDate: "2024-12-15",
      status: "Completed",
      bookings: 18,
      maxCapacity: 20,
      rating: 4.9,
      views: 456,
      queries: 12,
      price: 18000,
      type: "Nature",
    },
  ],
  draft: [
    {
      id: 4,
      title: "Rajasthan Desert Safari",
      destination: "Rajasthan",
      startDate: "2025-03-10",
      endDate: "2025-03-15",
      status: "Draft",
      bookings: 0,
      maxCapacity: 25,
      rating: 0,
      views: 0,
      queries: 0,
      price: 20000,
      type: "Desert",
    },
  ],
}

const statusColors = {
  Published: "bg-green-100 text-green-800",
  "Under Review": "bg-yellow-100 text-yellow-800",
  "Requires Modification": "bg-red-100 text-red-800",
  Draft: "bg-gray-100 text-gray-800",
  Completed: "bg-blue-100 text-blue-800",
  Paused: "bg-orange-100 text-orange-800",
  Archived: "bg-purple-100 text-purple-800",
}

export function ViewTrips() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterDestination, setFilterDestination] = useState("all")

  const TripCard = ({ trip }: { trip: any }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{trip.title}</h3>
            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                {trip.destination}
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                {trip.bookings}/{trip.maxCapacity}
              </div>
            </div>
            <Badge className={statusColors[trip.status as keyof typeof statusColors]}>{trip.status}</Badge>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Eye className="h-4 w-4 mr-2" />
                View
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem>
                <TrendingUp className="h-4 w-4 mr-2" />
                Analytics
              </DropdownMenuItem>
              <DropdownMenuItem>
                <MessageSquare className="h-4 w-4 mr-2" />
                View Queries
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Users className="h-4 w-4 mr-2" />
                View Leads
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Copy className="h-4 w-4 mr-2" />
                Use to Create
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Share className="h-4 w-4 mr-2" />
                Share
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Archive className="h-4 w-4 mr-2" />
                Archive
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Views</p>
            <p className="font-semibold">{trip.views}</p>
          </div>
          <div>
            <p className="text-gray-500">Queries</p>
            <p className="font-semibold">{trip.queries}</p>
          </div>
          <div>
            <p className="text-gray-500">Rating</p>
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-500 mr-1" />
              <span className="font-semibold">{trip.rating || "N/A"}</span>
            </div>
          </div>
          <div>
            <p className="text-gray-500">Price</p>
            <p className="font-semibold">₹{trip.price.toLocaleString()}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">View Trips</h1>
          <p className="text-gray-600 mt-1">Manage all your trips and track their performance</p>
        </div>
        <Button>Create New Trip</Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input placeholder="Search trips..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger>
                <SelectValue placeholder="Trip Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="trek">Trek</SelectItem>
                <SelectItem value="beach">Beach</SelectItem>
                <SelectItem value="nature">Nature</SelectItem>
                <SelectItem value="desert">Desert</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterDestination} onValueChange={setFilterDestination}>
              <SelectTrigger>
                <SelectValue placeholder="Destination" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Destinations</SelectItem>
                <SelectItem value="himachal">Himachal Pradesh</SelectItem>
                <SelectItem value="goa">Goa</SelectItem>
                <SelectItem value="kerala">Kerala</SelectItem>
                <SelectItem value="rajasthan">Rajasthan</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">Reset Filters</Button>
          </div>
        </CardContent>
      </Card>

      {/* Trips Tabs */}
      <Tabs defaultValue="upcoming" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="upcoming">Upcoming ({mockTrips.upcoming.length})</TabsTrigger>
          <TabsTrigger value="past">Past ({mockTrips.past.length})</TabsTrigger>
          <TabsTrigger value="draft">Draft ({mockTrips.draft.length})</TabsTrigger>
          <TabsTrigger value="archived">Archived (0)</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          {mockTrips.upcoming.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          {mockTrips.past.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </TabsContent>

        <TabsContent value="draft" className="space-y-4">
          {mockTrips.draft.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </TabsContent>

        <TabsContent value="archived" className="space-y-4">
          <div className="text-center py-12">
            <Archive className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No archived trips</h3>
            <p className="text-gray-600">Archived trips will appear here</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
