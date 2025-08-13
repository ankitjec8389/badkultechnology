"use client"

import { Heart, Share2, MapPin, Calendar, Users, Star, Clock, Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

interface Trip {
  id: number
  title: string
  organizer: string
  organizerLogo: string
  organizerRating: number
  location: string
  region: string
  startPoint: string
  endPoint: string
  dates: string
  duration: string
  price: number
  originalPrice: number
  rating: number
  reviewCount: number
  groupSize: string
  coverImage: string
  tags: string[]
  moodTags: string[]
  highlights: string[]
  difficulty: string
  ageGroup: string
  cancellation: string
  emi: boolean
  onRequest: boolean
  doubleOccupancy: boolean
  deals: string[]
}

interface TripCardProps {
  trip: Trip
  onSave: (tripId: number) => void
  onCompare: (tripId: number) => void
  isCompared: boolean
}

export default function TripCard({ trip, onSave, onCompare, isCompared }: TripCardProps) {
  const discountPercentage = Math.round(((trip.originalPrice - trip.price) / trip.originalPrice) * 100)

  return (
    <Card className="overflow-hidden hover:shadow-md transition-all duration-200 border border-gray-200">
      <div className="flex flex-col lg:flex-row">
        {/* Image Section */}
        <div className="relative lg:w-72 h-48 lg:h-56 flex-shrink-0">
          <Image src={trip.coverImage || "/placeholder.svg"} alt={trip.title} fill className="object-cover" />
          {trip.deals && trip.deals.length > 0 && (
            <div className="absolute top-2 left-2">
              <Badge className="bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1">
                {discountPercentage}% OFF
              </Badge>
            </div>
          )}
          <div className="absolute top-2 right-2 flex gap-1">
            <Button
              size="sm"
              variant="secondary"
              className="bg-white/90 hover:bg-white p-1.5 h-8 w-8"
              onClick={() => onSave(trip.id)}
            >
              <Heart className="w-3.5 h-3.5" />
            </Button>
            <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white p-1.5 h-8 w-8">
              <Share2 className="w-3.5 h-3.5" />
            </Button>
          </div>
          {trip.onRequest && (
            <div className="absolute bottom-2 left-2">
              <Badge variant="secondary" className="bg-orange-100 text-orange-800 text-xs">
                On Request
              </Badge>
            </div>
          )}
        </div>

        {/* Content Section */}
        <CardContent className="flex-1 p-4 lg:p-5">
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{trip.title}</h3>

              {/* Organizer Info */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 relative flex-shrink-0">
                    <Image
                      src={trip.organizerLogo || "/placeholder.svg"}
                      alt={trip.organizer}
                      fill
                      className="object-cover rounded-full"
                    />
                  </div>
                  <span className="text-sm text-gray-600 truncate">{trip.organizer}</span>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{trip.organizerRating}</span>
                </div>
              </div>

              {/* Location and Route */}
              <div className="flex items-center gap-3 mb-3 text-sm text-gray-600">
                <div className="flex items-center gap-1 min-w-0">
                  <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="truncate">{trip.location}</span>
                </div>
                <Badge variant="outline" className="text-xs flex-shrink-0">
                  {trip.region}
                </Badge>
              </div>

              <div className="text-sm text-gray-600 mb-3 truncate">
                {trip.startPoint} → {trip.endPoint}
              </div>

              {/* Trip Details */}
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-3 text-sm">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                  <div className="min-w-0">
                    <div className="text-xs text-gray-500">Dates</div>
                    <div className="font-medium text-xs truncate">{trip.dates}</div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                  <div className="min-w-0">
                    <div className="text-xs text-gray-500">Duration</div>
                    <div className="font-medium text-xs">{trip.duration}</div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                  <div className="min-w-0">
                    <div className="text-xs text-gray-500">Group</div>
                    <div className="font-medium text-xs truncate">{trip.groupSize}</div>
                  </div>
                </div>
              </div>

              {/* Highlights */}
              <div className="mb-3">
                <div className="flex flex-wrap gap-1">
                  {(trip.highlights || []).slice(0, 2).map((highlight, index) => (
                    <Badge key={index} variant="secondary" className="text-xs px-2 py-0.5">
                      {highlight}
                    </Badge>
                  ))}
                  {trip.highlights && trip.highlights.length > 2 && (
                    <Badge variant="secondary" className="text-xs px-2 py-0.5">
                      +{trip.highlights.length - 2}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Difficulty and Key Info */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-gray-600">
                <Badge
                  variant="outline"
                  className={`text-xs px-2 py-0.5 ${
                    trip.difficulty === "Easy"
                      ? "text-green-700 border-green-300 bg-green-50"
                      : trip.difficulty === "Moderate"
                        ? "text-yellow-700 border-yellow-300 bg-yellow-50"
                        : trip.difficulty === "Challenging"
                          ? "text-orange-700 border-orange-300 bg-orange-50"
                          : "text-red-700 border-red-300 bg-red-50"
                  }`}
                >
                  {trip.difficulty}
                </Badge>
                <span>Age: {trip.ageGroup}</span>
                {trip.emi && <span className="text-green-600">EMI</span>}
              </div>
            </div>

            {/* Price and Actions */}
            <div className="text-right flex-shrink-0">
              <div className="flex items-center justify-end gap-1 mb-2">
                <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                <span className="font-medium text-sm">{trip.rating}</span>
                <span className="text-xs text-gray-500">({trip.reviewCount})</span>
              </div>

              <div className="mb-3">
                {trip.originalPrice > trip.price && (
                  <div className="text-xs text-gray-500 line-through">₹{trip.originalPrice.toLocaleString()}</div>
                )}
                <div className="text-xl font-bold text-gray-900">₹{trip.price.toLocaleString()}</div>
                <div className="text-xs text-gray-600">per person</div>
              </div>

              <div className="space-y-2">
                <Link href={`/trip/${trip.id}`}>
                  <Button
                    size="sm"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-sm py-2"
                  >
                    View Details
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  className={`w-full text-sm py-2 ${isCompared ? "bg-blue-50 border-blue-300 text-blue-700" : ""}`}
                  onClick={() => onCompare(trip.id)}
                >
                  <Bookmark className="w-3.5 h-3.5 mr-1" />
                  {isCompared ? "Added" : "Compare"}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  )
}
