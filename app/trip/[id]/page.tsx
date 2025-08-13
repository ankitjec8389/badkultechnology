"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  MapPin,
  Users,
  Star,
  Clock,
  Shield,
  Heart,
  Share2,
  ChevronLeft,
  Phone,
  Mail,
  CheckCircle,
  XCircle,
  Camera,
  Mountain,
  Utensils,
  Bed,
} from "lucide-react"

// Mock trip data - in real app, this would come from API
const mockTripData = {
  1: {
    id: 1,
    title: "Manali Adventure Trek",
    coverImage: "/manali-mountains-trek.png",
    gallery: [
      "/manali-mountains-trek.png",
      "/mountain-valley.png",
      "/placeholder-uh6qk.png",
      "/mountain-camp.png",
    ],
    location: "Manali, Himachal Pradesh",
    duration: "5 Days 4 Nights",
    price: 12999,
    originalPrice: 15999,
    discount: 19,
    rating: 4.8,
    reviewCount: 156,
    organizer: "Mountain Adventures",
    organizerLogo: "/mountain-logo.png",
    organizerRating: 4.8,
    organizerTrips: 45,
    groupSize: "8-15 people",
    ageGroup: "18-45 years",
    difficulty: "Moderate",
    startPoint: "Delhi",
    endPoint: "Delhi",
    dates: ["2024-03-15", "2024-03-22", "2024-04-05", "2024-04-12"],
    highlights: [
      "Rohtang Pass adventure",
      "Solang Valley activities",
      "Local Himachali cuisine",
      "Professional guide included",
    ],
    inclusions: [
      "Accommodation in hotels/camps",
      "All meals (breakfast, lunch, dinner)",
      "Transportation (Delhi to Delhi)",
      "Professional trek guide",
      "All permits and entry fees",
      "First aid kit and safety equipment",
    ],
    exclusions: [
      "Personal expenses",
      "Travel insurance",
      "Tips for guide and driver",
      "Any additional activities not mentioned",
    ],
    itinerary: [
      {
        day: 1,
        title: "Delhi to Manali",
        description: "Departure from Delhi in the evening. Overnight journey to Manali.",
        activities: ["Departure from Delhi", "Overnight bus journey"],
        meals: ["Dinner"],
        accommodation: "Overnight bus",
      },
      {
        day: 2,
        title: "Arrival in Manali - Local Sightseeing",
        description: "Arrive in Manali, check-in to hotel, and explore local attractions.",
        activities: ["Hotel check-in", "Hadimba Temple visit", "Mall Road exploration", "Local market shopping"],
        meals: ["Breakfast", "Lunch", "Dinner"],
        accommodation: "Hotel in Manali",
      },
      {
        day: 3,
        title: "Solang Valley Adventure",
        description: "Full day adventure activities at Solang Valley.",
        activities: ["Paragliding", "Zorbing", "ATV rides", "Cable car ride"],
        meals: ["Breakfast", "Lunch", "Dinner"],
        accommodation: "Hotel in Manali",
      },
      {
        day: 4,
        title: "Rohtang Pass Excursion",
        description: "Visit the famous Rohtang Pass and enjoy snow activities.",
        activities: ["Rohtang Pass visit", "Snow activities", "Photography", "Local cuisine tasting"],
        meals: ["Breakfast", "Lunch", "Dinner"],
        accommodation: "Hotel in Manali",
      },
      {
        day: 5,
        title: "Departure to Delhi",
        description: "Check-out from hotel and departure to Delhi.",
        activities: ["Hotel check-out", "Shopping for souvenirs", "Departure to Delhi"],
        meals: ["Breakfast"],
        accommodation: "Overnight bus",
      },
    ],
    reviews: [
      {
        id: 1,
        name: "Priya Sharma",
        rating: 5,
        date: "2024-02-15",
        comment:
          "Amazing experience! The trek was well organized and the guide was very knowledgeable. Highly recommend!",
        avatar: "/serene-woman.png",
      },
      {
        id: 2,
        name: "Rahul Kumar",
        rating: 4,
        date: "2024-02-10",
        comment:
          "Great trip overall. The accommodation was good and food was delicious. Only issue was the weather but that's not controllable.",
        avatar: "/man-face.png",
      },
      {
        id: 3,
        name: "Sneha Patel",
        rating: 5,
        date: "2024-02-05",
        comment:
          "Perfect for adventure lovers! The activities at Solang Valley were thrilling. Will definitely book again.",
        avatar: "/serene-woman.png",
      },
    ],
    cancellationPolicy:
      "Free cancellation up to 7 days before departure. 50% refund for cancellations 3-7 days before. No refund for cancellations within 3 days.",
    tags: ["Adventure", "Mountains", "Trekking", "Photography"],
  },
}

export default function TripDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const [trip, setTrip] = useState(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isWishlisted, setIsWishlisted] = useState(false)

  useEffect(() => {
    const tripId = params.id
    const tripData = mockTripData[tripId]
    if (tripData) {
      setTrip(tripData)
    }
  }, [params.id])

  if (!trip) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Trip not found</h2>
          <p className="text-gray-600 mb-4">The trip you're looking for doesn't exist.</p>
          <Button onClick={() => router.push("/search")}>Back to Search</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => router.back()} className="flex items-center space-x-2">
                <ChevronLeft className="h-4 w-4" />
                <span>Back</span>
              </Button>
              <div>
                <h1 className="text-lg font-semibold truncate max-w-md">{trip.title}</h1>
                <p className="text-sm text-gray-600 flex items-center">
                  <MapPin className="h-3 w-3 mr-1" />
                  {trip.location}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="flex items-center space-x-2"
              >
                <Heart className={`h-4 w-4 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
                <span className="hidden sm:inline">Save</span>
              </Button>
              <Button variant="outline" size="sm" className="flex items-center space-x-2 bg-transparent">
                <Share2 className="h-4 w-4" />
                <span className="hidden sm:inline">Share</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card>
              <CardContent className="p-0">
                <div className="relative">
                  <Image
                    src={trip.gallery[selectedImage] || "/placeholder.svg"}
                    alt={trip.title}
                    width={800}
                    height={400}
                    className="w-full h-64 sm:h-80 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-black/50 text-white">
                      <Camera className="h-3 w-3 mr-1" />
                      {selectedImage + 1}/{trip.gallery.length}
                    </Badge>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex space-x-2 overflow-x-auto">
                    {trip.gallery.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${
                          selectedImage === index ? "border-blue-500" : "border-gray-200"
                        }`}
                      >
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`Gallery ${index + 1}`}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Trip Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Trip Overview</span>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{trip.rating}</span>
                    <span className="text-gray-600">({trip.reviewCount} reviews)</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Clock className="h-5 w-5 mx-auto mb-1 text-blue-600" />
                    <p className="text-sm font-medium">{trip.duration}</p>
                    <p className="text-xs text-gray-600">Duration</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Users className="h-5 w-5 mx-auto mb-1 text-green-600" />
                    <p className="text-sm font-medium">{trip.groupSize}</p>
                    <p className="text-xs text-gray-600">Group Size</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Mountain className="h-5 w-5 mx-auto mb-1 text-orange-600" />
                    <p className="text-sm font-medium">{trip.difficulty}</p>
                    <p className="text-xs text-gray-600">Difficulty</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Shield className="h-5 w-5 mx-auto mb-1 text-purple-600" />
                    <p className="text-sm font-medium">{trip.ageGroup}</p>
                    <p className="text-xs text-gray-600">Age Group</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Highlights</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {trip.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {trip.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Detailed Information Tabs */}
            <Card>
              <CardContent className="p-0">
                <Tabs defaultValue="itinerary" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                    <TabsTrigger value="inclusions">Inclusions</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                    <TabsTrigger value="policy">Policy</TabsTrigger>
                  </TabsList>

                  <TabsContent value="itinerary" className="p-6">
                    <div className="space-y-6">
                      {trip.itinerary.map((day, index) => (
                        <div key={index} className="border-l-2 border-blue-200 pl-6 relative">
                          <div className="absolute -left-2 top-0 w-4 h-4 bg-blue-500 rounded-full"></div>
                          <div className="bg-gray-50 rounded-lg p-4">
                            <h4 className="font-semibold text-lg mb-2">
                              Day {day.day}: {day.title}
                            </h4>
                            <p className="text-gray-700 mb-3">{day.description}</p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                              <div>
                                <h5 className="font-medium mb-1 flex items-center">
                                  <Mountain className="h-4 w-4 mr-1" />
                                  Activities
                                </h5>
                                <ul className="space-y-1">
                                  {day.activities.map((activity, i) => (
                                    <li key={i} className="text-gray-600">
                                      • {activity}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h5 className="font-medium mb-1 flex items-center">
                                  <Utensils className="h-4 w-4 mr-1" />
                                  Meals
                                </h5>
                                <ul className="space-y-1">
                                  {day.meals.map((meal, i) => (
                                    <li key={i} className="text-gray-600">
                                      • {meal}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h5 className="font-medium mb-1 flex items-center">
                                  <Bed className="h-4 w-4 mr-1" />
                                  Stay
                                </h5>
                                <p className="text-gray-600">{day.accommodation}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="inclusions" className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-lg mb-4 text-green-700">What's Included</h4>
                        <div className="space-y-2">
                          {trip.inclusions.map((item, index) => (
                            <div key={index} className="flex items-start space-x-2">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg mb-4 text-red-700">What's Not Included</h4>
                        <div className="space-y-2">
                          {trip.exclusions.map((item, index) => (
                            <div key={index} className="flex items-start space-x-2">
                              <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="reviews" className="p-6">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-lg">Customer Reviews</h4>
                        <div className="flex items-center space-x-2">
                          <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold">{trip.rating}</span>
                          <span className="text-gray-600">({trip.reviewCount} reviews)</span>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {trip.reviews.map((review) => (
                          <div key={review.id} className="border-b pb-4 last:border-b-0">
                            <div className="flex items-start space-x-3">
                              <Avatar className="w-10 h-10">
                                <AvatarImage src={review.avatar || "/placeholder.svg"} />
                                <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                  <h5 className="font-medium">{review.name}</h5>
                                  <span className="text-sm text-gray-500">{review.date}</span>
                                </div>
                                <div className="flex items-center mb-2">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${
                                        i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                </div>
                                <p className="text-gray-700 text-sm">{review.comment}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="policy" className="p-6">
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-lg mb-3">Cancellation Policy</h4>
                        <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{trip.cancellationPolicy}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-lg mb-3">Important Notes</h4>
                        <ul className="space-y-2 text-sm text-gray-700">
                          <li>• Valid government ID required for all participants</li>
                          <li>• Medical fitness certificate may be required for adventure activities</li>
                          <li>• Weather conditions may affect itinerary</li>
                          <li>• Minimum group size required for trip confirmation</li>
                          <li>• Travel insurance is highly recommended</li>
                        </ul>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pricing Card */}
            <Card className="sticky top-24">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold">₹{trip.price.toLocaleString()}</span>
                      {trip.originalPrice > trip.price && (
                        <span className="text-lg text-gray-500 line-through">
                          ₹{trip.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                    {trip.discount > 0 && (
                      <Badge variant="destructive" className="mt-1">
                        {trip.discount}% OFF
                      </Badge>
                    )}
                  </div>
                </div>
                <p className="text-sm text-gray-600">Per person (all inclusive)</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Select Date</label>
                  <select className="w-full p-2 border rounded-lg">
                    <option value="">Choose departure date</option>
                    {trip.dates.map((date, index) => (
                      <option key={index} value={date}>
                        {new Date(date).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Number of Travelers</label>
                  <select className="w-full p-2 border rounded-lg">
                    <option value="1">1 Person</option>
                    <option value="2">2 People</option>
                    <option value="3">3 People</option>
                    <option value="4">4 People</option>
                    <option value="5">5+ People</option>
                  </select>
                </div>

                <Button className="w-full" size="lg">
                  Book Now
                </Button>

                <Button variant="outline" className="w-full bg-transparent">
                  Add to Compare
                </Button>

                <div className="text-center text-sm text-gray-600">
                  <p>Free cancellation up to 7 days</p>
                  <p>Instant confirmation</p>
                </div>
              </CardContent>
            </Card>

            {/* Organizer Info */}
            <Card>
              <CardHeader>
                <CardTitle>Trip Organizer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3 mb-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={trip.organizerLogo || "/placeholder.svg"} />
                    <AvatarFallback>{trip.organizer.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">{trip.organizer}</h4>
                    <div className="flex items-center space-x-1 text-sm text-gray-600">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span>{trip.organizerRating}</span>
                      <span>•</span>
                      <span>{trip.organizerTrips} trips</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                    <Phone className="h-4 w-4 mr-2" />
                    Contact Organizer
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                    <Mail className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Info */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Start Point:</span>
                  <span className="font-medium">{trip.startPoint}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">End Point:</span>
                  <span className="font-medium">{trip.endPoint}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">{trip.duration}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Group Size:</span>
                  <span className="font-medium">{trip.groupSize}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Difficulty:</span>
                  <Badge variant="secondary" className="text-xs">
                    {trip.difficulty}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
