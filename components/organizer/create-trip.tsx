"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Plus, X, MapPin, DollarSign, Camera, Eye, Upload, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { TripPreview } from "./trip-preview"

const moodTags = [
  "Mountains",
  "Beach",
  "Forest and Wildlife",
  "Sky and Stargazing",
  "Heritage and Culture",
  "Camping",
  "Productivity and Creativity",
  "Women Only",
  "Spiritual and Wellness",
  "Party and Music",
  "Trekking",
  "Adventure",
  "Motorsports",
  "Weekender",
  "Solo Escape",
]

interface TripData {
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
  coverImages: string[]
  galleryImages: string[]
  exclusions: string[]
}

export function CreateTrip() {
  const router = useRouter()
  const [selectedMoods, setSelectedMoods] = useState<string[]>([])
  const [currentTab, setCurrentTab] = useState("basic")
  const [isLoading, setIsLoading] = useState(false)
  const [tripData, setTripData] = useState<TripData>({
    title: "",
    startDate: "",
    endDate: "",
    minGroup: 0,
    maxGroup: 0,
    minAge: 0,
    maxAge: 0,
    groupType: "",
    startLocation: "",
    endLocation: "",
    basePrice: 0,
    discount: 0,
    groupLeader: "",
    coverImages: [],
    galleryImages: [],
    exclusions: [],
  })
  const [itineraryItems, setItineraryItems] = useState<any[]>([])
  const [pricingCategories, setPricingCategories] = useState<any[]>([])
  const [faqs, setFaqs] = useState<{ question: string; answer: string }[]>([])
  const [exclusions, setExclusions] = useState<string[]>([])

  const toggleMood = (mood: string) => {
    if (selectedMoods.length >= 5 && !selectedMoods.includes(mood)) {
      alert("You can select maximum 5 mood tags")
      return
    }
    setSelectedMoods((prev) => (prev.includes(mood) ? prev.filter((m) => m !== mood) : [...prev, mood]))
  }

  const handleInputChange = (field: keyof TripData, value: string | number) => {
    setTripData((prev) => ({ ...prev, [field]: value }))
  }

  const addItineraryItem = (type: string) => {
    const newItem = {
      id: Date.now(),
      type,
      title: "",
      description: "",
      time: "",
      location: "",
    }
    setItineraryItems((prev) => [...prev, newItem])
  }

  const addPricingCategory = () => {
    const newCategory = {
      id: Date.now(),
      category: "",
      subType: "",
      price: 0,
    }
    setPricingCategories((prev) => [...prev, newCategory])
  }

  const addFaq = () => {
    setFaqs((prev) => [...prev, { question: "", answer: "" }])
  }

  const handlePreview = () => {
    console.log("Preview trip:", { tripData, selectedMoods, itineraryItems, pricingCategories, faqs })
  }

  const handleSaveDraft = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("Saving draft:", { tripData, selectedMoods, itineraryItems, pricingCategories, faqs })
      alert("Trip saved as draft successfully!")
    } catch (error) {
      alert("Error saving draft")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmitForReview = async () => {
    if (!tripData.title || !tripData.startDate || !tripData.endDate) {
      alert("Please fill in required fields: Title, Start Date, and End Date")
      return
    }

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log("Submitting for review:", { tripData, selectedMoods, itineraryItems, pricingCategories, faqs })
      alert("Trip submitted for review successfully!")
      router.push("/") // Redirect to dashboard or trips list
    } catch (error) {
      alert("Error submitting trip for review")
    } finally {
      setIsLoading(false)
    }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, type: "cover" | "gallery") => {
    const files = event.target.files
    if (!files) return

    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const imageUrl = e.target?.result as string
          setTripData((prev) => ({
            ...prev,
            [type === "cover" ? "coverImages" : "galleryImages"]: [
              ...prev[type === "cover" ? "coverImages" : "galleryImages"],
              imageUrl,
            ],
          }))
        }
        reader.readAsDataURL(file)
      }
    })
  }

  const removeImage = (index: number, type: "cover" | "gallery") => {
    setTripData((prev) => ({
      ...prev,
      [type === "cover" ? "coverImages" : "galleryImages"]: prev[
        type === "cover" ? "coverImages" : "galleryImages"
      ].filter((_, i) => i !== index),
    }))
  }

  const addExclusion = (value: string) => {
    if (!exclusions.includes(value)) {
      setExclusions([...exclusions, value])
    }
  }

  return (
    <div className="space-y-4 sm:space-y-6 p-3 sm:p-4 lg:p-6">
      <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Create Trip</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">Create a new trip experience for travelers</p>
        </div>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <TripPreview
            tripData={tripData}
            selectedMoods={selectedMoods}
            itineraryItems={itineraryItems}
            pricingCategories={pricingCategories}
            faqs={faqs}
            exclusions={exclusions}
          />
          <Button onClick={handleSaveDraft} disabled={isLoading} className="w-full sm:w-auto">
            {isLoading ? "Saving..." : "Save Trip"}
          </Button>
        </div>
      </div>

      <Tabs value={currentTab} onValueChange={setCurrentTab} className="space-y-4 sm:space-y-6">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 h-auto p-1">
          <TabsTrigger value="basic" className="text-xs sm:text-sm py-2 px-1 sm:px-3">
            Basic
          </TabsTrigger>
          <TabsTrigger value="itinerary" className="text-xs sm:text-sm py-2 px-1 sm:px-3">
            Itinerary
          </TabsTrigger>
          <TabsTrigger value="pricing" className="text-xs sm:text-sm py-2 px-1 sm:px-3">
            Pricing
          </TabsTrigger>
          <TabsTrigger value="media" className="text-xs sm:text-sm py-2 px-1 sm:px-3">
            Media
          </TabsTrigger>
          <TabsTrigger value="exclusions" className="text-xs sm:text-sm py-2 px-1 sm:px-3">
            Exclusions
          </TabsTrigger>
          <TabsTrigger value="faqs" className="text-xs sm:text-sm py-2 px-1 sm:px-3">
            FAQs
          </TabsTrigger>
          <TabsTrigger value="review" className="text-xs sm:text-sm py-2 px-1 sm:px-3">
            Review
          </TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Trip Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Trip Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Himalayan Winter Trek 2025"
                  value={tripData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date *</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={tripData.startDate}
                    onChange={(e) => handleInputChange("startDate", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date *</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={tripData.endDate}
                    onChange={(e) => handleInputChange("endDate", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <Label htmlFor="minGroup">Minimum Group Size</Label>
                  <Input
                    id="minGroup"
                    type="number"
                    placeholder="8"
                    value={tripData.minGroup || ""}
                    onChange={(e) => handleInputChange("minGroup", Number.parseInt(e.target.value) || 0)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxGroup">Maximum Group Size</Label>
                  <Input
                    id="maxGroup"
                    type="number"
                    placeholder="15"
                    value={tripData.maxGroup || ""}
                    onChange={(e) => handleInputChange("maxGroup", Number.parseInt(e.target.value) || 0)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <Label htmlFor="minAge">Minimum Age</Label>
                  <Input
                    id="minAge"
                    type="number"
                    placeholder="18"
                    value={tripData.minAge || ""}
                    onChange={(e) => handleInputChange("minAge", Number.parseInt(e.target.value) || 0)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxAge">Maximum Age</Label>
                  <Input
                    id="maxAge"
                    type="number"
                    placeholder="45"
                    value={tripData.maxAge || ""}
                    onChange={(e) => handleInputChange("maxAge", Number.parseInt(e.target.value) || 0)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Group Type</Label>
                <Select value={tripData.groupType} onValueChange={(value) => handleInputChange("groupType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select group type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mixed">Mixed Group</SelectItem>
                    <SelectItem value="women-only">Women Only</SelectItem>
                    <SelectItem value="family">Family Friendly</SelectItem>
                    <SelectItem value="adventure">Adventure Seekers</SelectItem>
                    <SelectItem value="on-request">On Request</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label>Mood Tags (Select up to 5)</Label>
                <div className="flex flex-wrap gap-2">
                  {moodTags.map((mood) => (
                    <Badge
                      key={mood}
                      variant={selectedMoods.includes(mood) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleMood(mood)}
                    >
                      {mood}
                      {selectedMoods.includes(mood) && <X className="ml-1 h-3 w-3" />}
                    </Badge>
                  ))}
                </div>
                <p className="text-sm text-gray-500">Selected: {selectedMoods.length}/5</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Group Leader</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select value={tripData.groupLeader} onValueChange={(value) => handleInputChange("groupLeader", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select existing leader or add new" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="leader1">Rahul Sharma - Mountain Guide</SelectItem>
                  <SelectItem value="leader2">Priya Patel - Adventure Expert</SelectItem>
                  <SelectItem value="new">+ Add New Leader</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                className="w-full bg-transparent"
                onClick={() => alert("Add new leader functionality")}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add New Group Leader
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="itinerary" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Trip Itinerary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <Label htmlFor="startLocation">Start Location</Label>
                  <Input
                    id="startLocation"
                    placeholder="e.g., Delhi Railway Station"
                    value={tripData.startLocation}
                    onChange={(e) => handleInputChange("startLocation", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endLocation">End Location</Label>
                  <Input
                    id="endLocation"
                    placeholder="e.g., Delhi Railway Station"
                    value={tripData.endLocation}
                    onChange={(e) => handleInputChange("endLocation", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Itinerary Items</h3>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => addItineraryItem("transit")}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Transit
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => addItineraryItem("stay")}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Stay
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => addItineraryItem("activity")}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Activity
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => addItineraryItem("meal")}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Meal
                    </Button>
                  </div>
                </div>

                {itineraryItems.length === 0 ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Build Your Itinerary</h3>
                    <p className="text-gray-600 mb-4">
                      Add transit, stays, activities, and meals to create your trip itinerary
                    </p>
                    <Button onClick={() => addItineraryItem("activity")}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add First Item
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {itineraryItems.map((item, index) => (
                      <div key={item.id} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <Badge variant="outline">{item.type}</Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setItineraryItems((prev) => prev.filter((i) => i.id !== item.id))}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                          <Input placeholder="Title" />
                          <Input placeholder="Location" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pricing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Trip Pricing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <Label htmlFor="basePrice">Base Price (per person)</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="basePrice"
                      type="number"
                      placeholder="15000"
                      className="pl-10"
                      value={tripData.basePrice || ""}
                      onChange={(e) => handleInputChange("basePrice", Number.parseInt(e.target.value) || 0)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="discount">Discount (%)</Label>
                  <Input
                    id="discount"
                    type="number"
                    placeholder="10"
                    value={tripData.discount || ""}
                    onChange={(e) => handleInputChange("discount", Number.parseInt(e.target.value) || 0)}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Pricing Categories</h3>
                {pricingCategories.map((category, index) => (
                  <div
                    key={category.id}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 p-3 sm:p-4 border rounded-lg"
                  >
                    <div className="space-y-2">
                      <Label>Category</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="accommodation">Accommodation</SelectItem>
                          <SelectItem value="transport">Transport</SelectItem>
                          <SelectItem value="meals">Meals</SelectItem>
                          <SelectItem value="activities">Activities</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Sub-type</Label>
                      <Input placeholder="e.g., Double sharing room" />
                    </div>
                    <div className="space-y-2">
                      <Label>Price</Label>
                      <Input type="number" placeholder="5000" />
                    </div>
                  </div>
                ))}
                <Button variant="outline" onClick={addPricingCategory}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Pricing Category
                </Button>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Payment Options</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="solo-friendly" />
                    <Label htmlFor="solo-friendly">Solo Traveler Friendly</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="couple-friendly" />
                    <Label htmlFor="couple-friendly">Couple Friendly (Private rooms)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="emi-available" />
                    <Label htmlFor="emi-available">EMI Available</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="media" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Trip Media</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Cover Images</h3>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Cover Images</h3>
                  <p className="text-gray-600 mb-4">Add high-quality images that showcase your trip experience</p>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleImageUpload(e, "cover")}
                    className="hidden"
                    id="cover-upload"
                  />
                  <Button onClick={() => document.getElementById("cover-upload")?.click()}>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Images
                  </Button>
                </div>
                {tripData.coverImages.length > 0 && (
                  <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                    {tripData.coverImages.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`Cover ${index + 1}`}
                          className="w-full h-24 sm:h-32 object-cover rounded-lg"
                        />
                        <Button
                          size="sm"
                          variant="destructive"
                          className="absolute top-1 right-1 sm:top-2 sm:right-2 opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 sm:h-8 sm:w-8"
                          onClick={() => removeImage(index, "cover")}
                        >
                          <Trash2 className="h-2 w-2 sm:h-3 sm:w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <h3 className="text-base sm:text-lg font-semibold">Gallery Images</h3>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-8 text-center">
                  <Camera className="h-8 w-8 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-2 sm:mb-4" />
                  <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">Upload Gallery Images</h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
                    Add additional images to showcase different aspects of your trip
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleImageUpload(e, "gallery")}
                    className="hidden"
                    id="gallery-upload"
                  />
                  <Button
                    variant="outline"
                    onClick={() => document.getElementById("gallery-upload")?.click()}
                    className="w-full sm:w-auto text-sm"
                  >
                    <Upload className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                    Upload Gallery Images
                  </Button>
                </div>
                {tripData.galleryImages.length > 0 && (
                  <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                    {tripData.galleryImages.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`Gallery ${index + 1}`}
                          className="w-full h-24 sm:h-32 object-cover rounded-lg"
                        />
                        <Button
                          size="sm"
                          variant="destructive"
                          className="absolute top-1 right-1 sm:top-2 sm:right-2 opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 sm:h-8 sm:w-8"
                          onClick={() => removeImage(index, "gallery")}
                        >
                          <Trash2 className="h-2 w-2 sm:h-3 sm:w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="exclusions" className="space-y-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-4">Trip Exclusions</h3>
              <p className="text-sm text-gray-600 mb-4">
                Specify what is not included in your trip package to set clear expectations for travelers.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="exclusions-input">Add Exclusion</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    id="exclusions-input"
                    placeholder="e.g., International flights, Travel insurance, Personal expenses"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        const input = e.target as HTMLInputElement
                        const value = input.value.trim()
                        if (value && !exclusions.includes(value)) {
                          setExclusions([...exclusions, value])
                          input.value = ""
                        }
                      }
                    }}
                  />
                  <Button
                    type="button"
                    onClick={() => {
                      const input = document.getElementById("exclusions-input") as HTMLInputElement
                      const value = input.value.trim()
                      if (value && !exclusions.includes(value)) {
                        setExclusions([...exclusions, value])
                        input.value = ""
                      }
                    }}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {exclusions.length > 0 && (
                <div className="space-y-2">
                  <Label>Current Exclusions</Label>
                  <div className="space-y-2">
                    {exclusions.map((exclusion, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg"
                      >
                        <div className="flex items-center gap-2">
                          <X className="h-4 w-4 text-red-500" />
                          <span className="text-sm">{exclusion}</span>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setExclusions(exclusions.filter((_, i) => i !== index))
                          }}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
                <h4 className="font-medium text-blue-900 mb-2 text-sm sm:text-base">Common Exclusions</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    "International flights",
                    "Travel insurance",
                    "Personal expenses",
                    "Visa fees",
                    "Airport transfers",
                    "Optional activities",
                    "Alcoholic beverages",
                    "Laundry services",
                    "Tips and gratuities",
                    "Medical expenses",
                  ].map((commonExclusion) => (
                    <Button
                      key={commonExclusion}
                      type="button"
                      variant="outline"
                      size="sm"
                      className="justify-start text-xs bg-transparent"
                      onClick={() => {
                        if (!exclusions.includes(commonExclusion)) {
                          setExclusions([...exclusions, commonExclusion])
                        }
                      }}
                      disabled={exclusions.includes(commonExclusion)}
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      {commonExclusion}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="faqs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Question</Label>
                        <Input
                          placeholder="What's included in the trip?"
                          value={faq.question}
                          onChange={(e) => {
                            const newFaqs = [...faqs]
                            newFaqs[index].question = e.target.value
                            setFaqs(newFaqs)
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Answer</Label>
                        <Textarea
                          placeholder="Provide a detailed answer..."
                          value={faq.answer}
                          onChange={(e) => {
                            const newFaqs = [...faqs]
                            newFaqs[index].answer = e.target.value
                            setFaqs(newFaqs)
                          }}
                        />
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setFaqs((prev) => prev.filter((_, i) => i !== index))}
                      >
                        <X className="h-4 w-4 mr-2" />
                        Remove FAQ
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" onClick={addFaq}>
                <Plus className="mr-2 h-4 w-4" />
                Add FAQ
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="review" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Review & Submit</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center py-12">
                <Eye className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Review Your Trip</h3>
                <p className="text-gray-600 mb-6">Review all the details before submitting for approval</p>
                <div className="flex justify-center space-x-4">
                  <Button variant="outline" onClick={handleSaveDraft} disabled={isLoading}>
                    {isLoading ? "Saving..." : "Save as Draft"}
                  </Button>
                  <Button onClick={handleSubmitForReview} disabled={isLoading}>
                    {isLoading ? "Submitting..." : "Submit for Review"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
