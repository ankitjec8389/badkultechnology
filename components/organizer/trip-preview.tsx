"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { MapPin, Calendar, Users, DollarSign, Star, Clock } from "lucide-react"

interface TripPreviewProps {
  tripData: {
    title: string
    startDate: string
    endDate: string
    minGroup: number
    maxGroup: number
    minAge: number
    maxAge: number
    groupType: string
    startLocation: string
    endLocation: string
    basePrice: number
    discount: number
    groupLeader: string
  }
  selectedMoods: string[]
  itineraryItems: any[]
  pricingCategories: any[]
  faqs: { question: string; answer: string }[]
}

export function TripPreview({ tripData, selectedMoods, itineraryItems, pricingCategories, faqs }: TripPreviewProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return "TBD"
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const calculateDiscountedPrice = () => {
    if (!tripData.basePrice || !tripData.discount) return tripData.basePrice
    return tripData.basePrice - (tripData.basePrice * tripData.discount) / 100
  }

  const getDuration = () => {
    if (!tripData.startDate || !tripData.endDate) return "TBD"
    const start = new Date(tripData.startDate)
    const end = new Date(tripData.endDate)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return `${diffDays} ${diffDays === 1 ? "day" : "days"}`
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full sm:w-auto bg-transparent">
          <Star className="mr-2 h-4 w-4" />
          Preview Trip
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl lg:max-w-4xl max-h-[85vh] lg:max-h-[90vh] overflow-y-auto mx-4">
        <DialogHeader>
          <DialogTitle>Trip Preview</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 lg:space-y-6">
          {/* Hero Section */}
          <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-4 lg:p-6 text-white">
            <div className="absolute inset-0 bg-black/20 rounded-lg"></div>
            <div className="relative z-10">
              <h1 className="text-xl lg:text-2xl font-bold mb-2">{tripData.title || "Untitled Trip"}</h1>
              <div className="flex flex-wrap gap-2 lg:gap-4 text-sm">
                <div className="flex items-center">
                  <Calendar className="mr-1 h-4 w-4" />
                  <span className="hidden sm:inline">
                    {formatDate(tripData.startDate)} - {formatDate(tripData.endDate)}
                  </span>
                  <span className="sm:hidden">{formatDate(tripData.startDate)}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-1 h-4 w-4" />
                  {getDuration()}
                </div>
                <div className="flex items-center">
                  <Users className="mr-1 h-4 w-4" />
                  {tripData.minGroup || 0}-{tripData.maxGroup || 0} people
                </div>
              </div>
            </div>
          </div>

          {/* Mood Tags */}
          {selectedMoods.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-semibold">Trip Vibes</h3>
              <div className="flex flex-wrap gap-2">
                {selectedMoods.map((mood) => (
                  <Badge key={mood} variant="secondary">
                    {mood}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Trip Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Trip Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Group Type:</span>
                  <span className="font-medium">{tripData.groupType || "Not specified"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Age Range:</span>
                  <span className="font-medium">
                    {tripData.minAge || 0}-{tripData.maxAge || 0} years
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Group Leader:</span>
                  <span className="font-medium">{tripData.groupLeader || "TBD"}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Pricing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Base Price:</span>
                  <div className="text-right">
                    {tripData.discount > 0 && (
                      <span className="text-sm text-gray-500 line-through">
                        ₹{tripData.basePrice?.toLocaleString() || 0}
                      </span>
                    )}
                    <div className="font-bold text-lg">₹{calculateDiscountedPrice()?.toLocaleString() || 0}</div>
                  </div>
                </div>
                {tripData.discount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Discount:</span>
                    <span className="font-medium text-green-600">{tripData.discount}% OFF</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Locations */}
          {(tripData.startLocation || tripData.endLocation) && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Journey</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <MapPin className="mr-2 h-4 w-4 text-green-600" />
                    <span>{tripData.startLocation || "Start location TBD"}</span>
                  </div>
                  <div className="flex-1 border-t border-dashed mx-4"></div>
                  <div className="flex items-center">
                    <MapPin className="mr-2 h-4 w-4 text-red-600" />
                    <span>{tripData.endLocation || "End location TBD"}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Itinerary */}
          {itineraryItems.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Itinerary Highlights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {itineraryItems.map((item, index) => (
                    <div key={item.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Badge variant="outline" className="capitalize">
                        {item.type}
                      </Badge>
                      <span className="text-gray-600">Item {index + 1}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Pricing Categories */}
          {pricingCategories.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What's Included</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {pricingCategories.map((category, index) => (
                    <div key={category.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">Category {index + 1}</span>
                      <Badge variant="secondary">Included</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* FAQs */}
          {faqs.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="space-y-2">
                    <h4 className="font-medium">{faq.question || `Question ${index + 1}`}</h4>
                    <p className="text-gray-600 text-sm">{faq.answer || "Answer not provided yet"}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Call to Action */}
          <div className="text-center p-4 lg:p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Ready for an Adventure?</h3>
            <p className="text-gray-600 mb-4 text-sm lg:text-base">Join us for this amazing travel experience!</p>
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 w-full sm:w-auto">
              <DollarSign className="mr-2 h-4 w-4" />
              Book Now - ₹{calculateDiscountedPrice()?.toLocaleString() || 0}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
