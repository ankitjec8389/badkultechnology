"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd"
import {
  X,
  Star,
  MapPin,
  Users,
  DollarSign,
  Mountain,
  Utensils,
  Car,
  Bed,
  Shield,
  Award,
  GripVertical,
  Eye,
  Heart,
  Share2,
  Settings,
  ChevronDown,
  ChevronUp,
} from "lucide-react"

// Mock data for trips being compared
const mockTrips = [
  {
    id: "1",
    title: "Himalayan Winter Trek",
    organizer: "Mountain Adventures Co.",
    organizerLogo: "/placeholder.svg?height=40&width=40",
    organizerExperience: "5+ years, 100+ trips",
    destination: "Himachal Pradesh",
    region: "Northern India",
    tripType: "Trek",
    startDate: "2025-02-15",
    endDate: "2025-02-20",
    duration: "5 days, 4 nights",
    startPoint: "Delhi",
    endPoint: "Delhi",
    pickupDrop: true,
    price: 15000,
    discount: "10% off",
    difficulty: "Moderate",
    altitude: "4,200m",
    activities: ["Trekking", "Stargazing", "Photography"],
    groupType: "Mixed",
    groupSize: "8-15",
    ageGroup: "18-45",
    mealsIncluded: "All meals (B+L+D)",
    mealTypes: "Vegetarian & Non-vegetarian",
    transport: "Bus + Trek",
    accommodation: "Twin sharing",
    cancellation: "Free till 7 days",
    highlights: ["Scenic mountain views", "Professional guide", "Safety equipment included"],
    rating: 4.8,
    totalReviews: 156,
    fitnessLevel: "Moderate fitness required",
    coverImage: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "2",
    title: "Goa Beach Adventure",
    organizer: "Coastal Expeditions",
    organizerLogo: "/placeholder.svg?height=40&width=40",
    organizerExperience: "3+ years, 50+ trips",
    destination: "Goa",
    region: "Western India",
    tripType: "Beach Holiday",
    startDate: "2025-01-20",
    endDate: "2025-01-25",
    duration: "5 days, 4 nights",
    startPoint: "Goa Airport",
    endPoint: "Goa Airport",
    pickupDrop: true,
    price: 12000,
    discount: "Early bird 15% off",
    difficulty: "Easy",
    altitude: "Sea level",
    activities: ["Water Sports", "Beach Volleyball", "Nightlife"],
    groupType: "Mixed",
    groupSize: "15-25",
    ageGroup: "21-35",
    mealsIncluded: "Breakfast only",
    mealTypes: "Continental & Indian",
    transport: "Private cab",
    accommodation: "Double occupancy",
    cancellation: "50% refund till 3 days",
    highlights: ["Beach resort stay", "Water sports included", "Nightlife access"],
    rating: 4.2,
    totalReviews: 89,
    fitnessLevel: "No specific fitness required",
    coverImage: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "3",
    title: "Rajasthan Desert Safari",
    organizer: "Desert Wanderers",
    organizerLogo: "/placeholder.svg?height=40&width=40",
    organizerExperience: "7+ years, 200+ trips",
    destination: "Rajasthan",
    region: "Western India",
    tripType: "Desert Safari",
    startDate: "2025-03-10",
    endDate: "2025-03-15",
    duration: "5 days, 4 nights",
    startPoint: "Jaipur",
    endPoint: "Jaipur",
    pickupDrop: true,
    price: 18000,
    discount: "Group discount available",
    difficulty: "Easy to Moderate",
    altitude: "300m",
    activities: ["Camel Safari", "Cultural Shows", "Desert Camping"],
    groupType: "Family friendly",
    groupSize: "10-20",
    ageGroup: "All ages",
    mealsIncluded: "All meals (B+L+D)",
    mealTypes: "Traditional Rajasthani",
    transport: "AC Bus + Camel",
    accommodation: "Desert camps",
    cancellation: "Free till 10 days",
    highlights: ["Authentic desert experience", "Cultural immersion", "Luxury desert camps"],
    rating: 4.6,
    totalReviews: 234,
    fitnessLevel: "Basic fitness required",
    coverImage: "/placeholder.svg?height=200&width=300",
  },
]

// Comparison categories that can be reordered
const defaultCategories = [
  { id: "basic", label: "Basic Info", icon: MapPin },
  { id: "pricing", label: "Pricing", icon: DollarSign },
  { id: "difficulty", label: "Difficulty & Fitness", icon: Mountain },
  { id: "group", label: "Group Details", icon: Users },
  { id: "accommodation", label: "Accommodation", icon: Bed },
  { id: "meals", label: "Meals", icon: Utensils },
  { id: "transport", label: "Transport", icon: Car },
  { id: "activities", label: "Activities", icon: Award },
  { id: "policies", label: "Policies", icon: Shield },
  { id: "organizer", label: "Organizer Info", icon: Star },
]

export function CompareTrips() {
  const [trips, setTrips] = useState(mockTrips)
  const [categories, setCategories] = useState(defaultCategories)
  const [selectedCategories, setSelectedCategories] = useState<string[]>(defaultCategories.map((cat) => cat.id))
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  const removeTrip = (tripId: string) => {
    setTrips(trips.filter((trip) => trip.id !== tripId))
  }

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const items = Array.from(categories)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setCategories(items)
  }

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    )
  }

  const renderComparisonRow = (label: string, values: (string | React.ReactElement)[], highlight = false) => (
    <div className={`${highlight ? "bg-blue-50" : ""} border-b border-gray-100`}>
      {/* Mobile Layout */}
      <div className="block md:hidden">
        <div className="font-medium text-gray-700 text-sm p-3 bg-gray-50 border-b">{label}</div>
        <div className="divide-y divide-gray-100">
          {values.map((value, index) => (
            <div key={index} className="p-3 flex items-start justify-between">
              <div className="flex items-center space-x-2 flex-shrink-0">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={trips[index]?.organizerLogo || "/placeholder.svg"} alt={trips[index]?.organizer} />
                  <AvatarFallback className="text-xs">{trips[index]?.organizer?.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-xs text-gray-600 font-medium">{trips[index]?.title}</span>
              </div>
              <div className="text-sm text-gray-900 text-right flex-shrink-0 ml-2">{value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block">
        <div className="overflow-x-auto">
          <div className="flex min-w-max py-3">
            <div className="font-medium text-gray-700 text-sm w-48 flex-shrink-0 px-4">{label}</div>
            {values.map((value, index) => (
              <div key={index} className="text-sm text-gray-900 w-64 flex-shrink-0 px-4">
                {value}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const renderCategorySection = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId)
    if (!category || !selectedCategories.includes(categoryId)) return null

    const CategoryIcon = category.icon

    switch (categoryId) {
      case "basic":
        return (
          <div className="space-y-0">
            <div className="flex items-center space-x-2 py-4 border-b-2 border-gray-200 bg-gray-50 px-4">
              <CategoryIcon className="h-5 w-5 text-blue-600" />
              <h3 className="font-semibold text-gray-900">{category.label}</h3>
            </div>
            <div className="px-4">
              {renderComparisonRow(
                "Destination",
                trips.map((trip, index) => <span key={index}>{trip.destination}</span>),
              )}
              {renderComparisonRow(
                "Region",
                trips.map((trip, index) => <span key={index}>{trip.region}</span>),
              )}
              {renderComparisonRow(
                "Trip Type",
                trips.map((trip, index) => (
                  <Badge key={index} variant="outline">
                    {trip.tripType}
                  </Badge>
                )),
              )}
              {renderComparisonRow(
                "Start Date",
                trips.map((trip, index) => new Date(trip.startDate).toLocaleDateString()),
              )}
              {renderComparisonRow(
                "End Date",
                trips.map((trip, index) => new Date(trip.endDate).toLocaleDateString()),
              )}
              {renderComparisonRow(
                "Duration",
                trips.map((trip, index) => <span key={index}>{trip.duration}</span>),
              )}
              {renderComparisonRow(
                "Start Point",
                trips.map((trip, index) => <span key={index}>{trip.startPoint}</span>),
              )}
              {renderComparisonRow(
                "End Point",
                trips.map((trip, index) => <span key={index}>{trip.endPoint}</span>),
              )}
              {renderComparisonRow(
                "Pickup/Drop",
                trips.map((trip, index) => (
                  <Badge key={index} variant={trip.pickupDrop ? "default" : "secondary"}>
                    {trip.pickupDrop ? "Available" : "Not Available"}
                  </Badge>
                )),
              )}
            </div>
          </div>
        )

      case "pricing":
        return (
          <div className="space-y-0">
            <div className="flex items-center space-x-2 py-4 border-b-2 border-gray-200 bg-gray-50 px-4">
              <CategoryIcon className="h-5 w-5 text-green-600" />
              <h3 className="font-semibold text-gray-900">{category.label}</h3>
            </div>
            <div className="px-4">
              {renderComparisonRow(
                "Price (per person)",
                trips.map((trip, index) => (
                  <div key={index} className="font-semibold text-green-600">
                    ₹{trip.price.toLocaleString()}
                  </div>
                )),
                true,
              )}
              {renderComparisonRow(
                "Discount/Offer",
                trips.map((trip, index) => (
                  <Badge key={index} variant="outline" className="text-orange-600">
                    {trip.discount}
                  </Badge>
                )),
              )}
            </div>
          </div>
        )

      case "difficulty":
        return (
          <div className="space-y-0">
            <div className="flex items-center space-x-2 py-4 border-b-2 border-gray-200 bg-gray-50 px-4">
              <CategoryIcon className="h-5 w-5 text-orange-600" />
              <h3 className="font-semibold text-gray-900">{category.label}</h3>
            </div>
            <div className="px-4">
              {renderComparisonRow(
                "Difficulty Level",
                trips.map((trip, index) => (
                  <Badge
                    key={index}
                    variant={
                      trip.difficulty === "Easy"
                        ? "default"
                        : trip.difficulty === "Moderate"
                          ? "secondary"
                          : "destructive"
                    }
                  >
                    {trip.difficulty}
                  </Badge>
                )),
              )}
              {renderComparisonRow(
                "Altitude/Elevation",
                trips.map((trip, index) => <span key={index}>{trip.altitude}</span>),
              )}
              {renderComparisonRow(
                "Fitness Level",
                trips.map((trip, index) => <span key={index}>{trip.fitnessLevel}</span>),
              )}
            </div>
          </div>
        )

      case "group":
        return (
          <div className="space-y-0">
            <div className="flex items-center space-x-2 py-4 border-b-2 border-gray-200 bg-gray-50 px-4">
              <CategoryIcon className="h-5 w-5 text-purple-600" />
              <h3 className="font-semibold text-gray-900">{category.label}</h3>
            </div>
            <div className="px-4">
              {renderComparisonRow(
                "Group Type",
                trips.map((trip, index) => <span key={index}>{trip.groupType}</span>),
              )}
              {renderComparisonRow(
                "Group Size",
                trips.map((trip, index) => `${trip.groupSize} people`),
              )}
              {renderComparisonRow(
                "Age Group",
                trips.map((trip, index) => <span key={index}>{trip.ageGroup}</span>),
              )}
            </div>
          </div>
        )

      case "accommodation":
        return (
          <div className="space-y-0">
            <div className="flex items-center space-x-2 py-4 border-b-2 border-gray-200 bg-gray-50 px-4">
              <CategoryIcon className="h-5 w-5 text-indigo-600" />
              <h3 className="font-semibold text-gray-900">{category.label}</h3>
            </div>
            <div className="px-4">
              {renderComparisonRow(
                "Sharing Basis",
                trips.map((trip, index) => <span key={index}>{trip.accommodation}</span>),
              )}
            </div>
          </div>
        )

      case "meals":
        return (
          <div className="space-y-0">
            <div className="flex items-center space-x-2 py-4 border-b-2 border-gray-200 bg-gray-50 px-4">
              <CategoryIcon className="h-5 w-5 text-red-600" />
              <h3 className="font-semibold text-gray-900">{category.label}</h3>
            </div>
            <div className="px-4">
              {renderComparisonRow(
                "Meals Included",
                trips.map((trip, index) => <span key={index}>{trip.mealsIncluded}</span>),
              )}
              {renderComparisonRow(
                "Meal Types",
                trips.map((trip, index) => <span key={index}>{trip.mealTypes}</span>),
              )}
            </div>
          </div>
        )

      case "transport":
        return (
          <div className="space-y-0">
            <div className="flex items-center space-x-2 py-4 border-b-2 border-gray-200 bg-gray-50 px-4">
              <CategoryIcon className="h-5 w-5 text-blue-600" />
              <h3 className="font-semibold text-gray-900">{category.label}</h3>
            </div>
            <div className="px-4">
              {renderComparisonRow(
                "Transport Type",
                trips.map((trip, index) => <span key={index}>{trip.transport}</span>),
              )}
            </div>
          </div>
        )

      case "activities":
        return (
          <div className="space-y-0">
            <div className="flex items-center space-x-2 py-4 border-b-2 border-gray-200 bg-gray-50 px-4">
              <CategoryIcon className="h-5 w-5 text-yellow-600" />
              <h3 className="font-semibold text-gray-900">{category.label}</h3>
            </div>
            <div className="px-4">
              {renderComparisonRow(
                "Activities Included",
                trips.map((trip, index) => (
                  <div key={index} className="space-y-1">
                    {trip.activities.map((activity, idx) => (
                      <Badge key={idx} variant="outline" className="mr-1 mb-1 text-xs">
                        {activity}
                      </Badge>
                    ))}
                  </div>
                )),
              )}
              {renderComparisonRow(
                "Trip Highlights",
                trips.map((trip, index) => (
                  <ul key={index} className="text-xs space-y-1">
                    {trip.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-green-500 mr-1">•</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                )),
              )}
            </div>
          </div>
        )

      case "policies":
        return (
          <div className="space-y-0">
            <div className="flex items-center space-x-2 py-4 border-b-2 border-gray-200 bg-gray-50 px-4">
              <CategoryIcon className="h-5 w-5 text-gray-600" />
              <h3 className="font-semibold text-gray-900">{category.label}</h3>
            </div>
            <div className="px-4">
              {renderComparisonRow(
                "Cancellation Policy",
                trips.map((trip, index) => <span key={index}>{trip.cancellation}</span>),
              )}
            </div>
          </div>
        )

      case "organizer":
        return (
          <div className="space-y-0">
            <div className="flex items-center space-x-2 py-4 border-b-2 border-gray-200 bg-gray-50 px-4">
              <CategoryIcon className="h-5 w-5 text-pink-600" />
              <h3 className="font-semibold text-gray-900">{category.label}</h3>
            </div>
            <div className="px-4">
              {renderComparisonRow(
                "User/Google Ratings",
                trips.map((trip, index) => (
                  <div key={index} className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="font-medium">{trip.rating}</span>
                    <span className="text-gray-500">({trip.totalReviews})</span>
                  </div>
                )),
              )}
              {renderComparisonRow(
                "Organizer Experience",
                trips.map((trip, index) => <span key={index}>{trip.organizerExperience}</span>),
              )}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  if (trips.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-4 md:py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">No trips to compare</h2>
            <p className="text-gray-600 mb-6">Add some trips to your comparison to get started</p>
            <Button>Browse Trips</Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 md:py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Compare Trips</h1>
          <p className="text-gray-600 text-sm md:text-base">
            Compare multiple trips side by side to make the best choice
          </p>
        </div>

        <div className="block md:hidden mb-6">
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {trips.map((trip) => (
              <Card key={trip.id} className="relative flex-shrink-0 w-72">
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 z-10"
                  onClick={() => removeTrip(trip.id)}
                >
                  <X className="h-4 w-4" />
                </Button>

                <div className="aspect-video bg-gray-200 rounded-t-lg overflow-hidden">
                  <img
                    src={trip.coverImage || "/placeholder.svg"}
                    alt={trip.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <CardContent className="p-4">
                  <div className="flex items-start space-x-3 mb-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={trip.organizerLogo || "/placeholder.svg"} alt={trip.organizer} />
                      <AvatarFallback>{trip.organizer.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-1">{trip.title}</h3>
                      <p className="text-xs text-gray-600">{trip.organizer}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-lg font-bold text-green-600">₹{trip.price.toLocaleString()}</div>
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="hidden md:block mb-6">
          <div className="overflow-x-auto">
            <div className="flex min-w-max space-x-4">
              <div className="w-48 flex-shrink-0 space-y-4">
                <div className="h-48"></div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900">Customize Comparison</h3>
                  <p className="text-sm text-gray-600">Drag to reorder categories</p>
                </div>
              </div>

              {trips.map((trip) => (
                <Card key={trip.id} className="relative w-64 flex-shrink-0">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 z-10"
                    onClick={() => removeTrip(trip.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>

                  <div className="aspect-video bg-gray-200 rounded-t-lg overflow-hidden">
                    <img
                      src={trip.coverImage || "/placeholder.svg"}
                      alt={trip.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3 mb-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={trip.organizerLogo || "/placeholder.svg"} alt={trip.organizer} />
                        <AvatarFallback>{trip.organizer.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-1">{trip.title}</h3>
                        <p className="text-xs text-gray-600">{trip.organizer}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-lg font-bold text-green-600">₹{trip.price.toLocaleString()}</div>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Heart className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <div className="block md:hidden mb-4">
          <Button
            variant="outline"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="w-full justify-between"
          >
            <div className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>Customize Comparison</span>
            </div>
            {showMobileFilters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className={`lg:block ${showMobileFilters ? "block" : "hidden"} w-full lg:w-80 flex-shrink-0`}>
            <Card className="lg:sticky lg:top-4">
              <CardHeader>
                <CardTitle className="text-lg">Comparison Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <DragDropContext onDragEnd={handleDragEnd}>
                  <Droppable droppableId="categories">
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                        {categories.map((category, index) => (
                          <Draggable key={category.id} draggableId={category.id} index={index}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                className="flex items-center space-x-3 p-2 bg-white border rounded-lg"
                              >
                                <div {...provided.dragHandleProps}>
                                  <GripVertical className="h-4 w-4 text-gray-400" />
                                </div>
                                <Checkbox
                                  checked={selectedCategories.includes(category.id)}
                                  onCheckedChange={() => toggleCategory(category.id)}
                                />
                                {category.icon && <category.icon className="h-4 w-4 text-gray-600" />}
                                <span className="text-sm font-medium">{category.label}</span>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </CardContent>
            </Card>
          </div>

          <div className="flex-1 min-w-0">
            <Card>
              <div className="divide-y divide-gray-200">
                {categories.map((category) => renderCategorySection(category.id))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
