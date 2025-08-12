"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, MapPin, Users, Plus, X, Eye } from "lucide-react"

const mockFeaturedTrips = [
  {
    id: "1",
    title: "Himalayan Winter Trek",
    organizer: "Mountain Adventures Co.",
    organizerLogo: "/placeholder.svg?height=40&width=40",
    location: "Himachal Pradesh",
    price: 15000,
    rating: 4.8,
    reviews: 156,
    groupSize: "8-15",
    featured: true,
    featuredOrder: 1,
  },
  {
    id: "2",
    title: "Goa Beach Adventure",
    organizer: "Coastal Expeditions",
    organizerLogo: "/placeholder.svg?height=40&width=40",
    location: "Goa",
    price: 12000,
    rating: 4.2,
    reviews: 89,
    groupSize: "15-25",
    featured: true,
    featuredOrder: 2,
  },
]

export function FeaturedTrips() {
  const [trips, setTrips] = useState(mockFeaturedTrips)

  const toggleFeatured = (tripId: string) => {
    setTrips(trips.map((trip) => (trip.id === tripId ? { ...trip, featured: !trip.featured } : trip)))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Featured Trips</h1>
          <p className="text-gray-600 mt-1">Manage trips featured on the homepage</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Featured Trip
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trips.map((trip) => (
          <Card key={trip.id} className={`relative ${trip.featured ? "ring-2 ring-blue-500" : ""}`}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={trip.organizerLogo || "/placeholder.svg"} alt={trip.organizer} />
                    <AvatarFallback>{trip.organizer.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-gray-900">{trip.title}</h3>
                    <p className="text-sm text-gray-600">{trip.organizer}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => toggleFeatured(trip.id)}>
                  {trip.featured ? <X className="h-4 w-4 text-red-500" /> : <Plus className="h-4 w-4" />}
                </Button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {trip.location}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {trip.groupSize}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="font-medium">{trip.rating}</span>
                    <span className="text-gray-500">({trip.reviews})</span>
                  </div>
                  <div className="text-lg font-bold text-green-600">₹{trip.price.toLocaleString()}</div>
                </div>

                {trip.featured && <Badge className="w-full justify-center">Featured #{trip.featuredOrder}</Badge>}

                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
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
