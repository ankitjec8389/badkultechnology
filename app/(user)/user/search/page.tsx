"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { useSearchParams } from "next/navigation"
import { Search, Filter, MapPin, ArrowUpDown, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Link from "next/link"
import TripCard from "@/components/user/TripCard"

const durations = ["1-2 Days", "3-4 Days", "5-7 Days", "1-2 Weeks", "2+ Weeks"]
const ageGroups = ["All Ages", "18-25", "26-35", "36-45", "46-55", "55+"]
const moods = ["Adventure", "Relaxation", "Culture", "Foodie", "Sports"]
const regions = ["North India", "South India", "East India", "West India", "Islands"]
const difficulties = ["Easy", "Medium", "Difficult", "Moderate"]
const cancellationTypes = ["Flexible", "Strict", "Moderate", "Non-Refundable"]
const mockTrips = [
  {
    id: 1,
    title: "Manali Adventure Trek",
    location: "Manali, Himachal Pradesh",
    startPoint: "Delhi",
    endPoint: "Manali",
    dates: "15-20 May 2024",
    price: 15000,
    originalPrice: 18000,
    rating: 4.5,
    reviewCount: 234,
    duration: "5 Days",
    coverImage: "/manali-mountains-trek.png",
    organizer: "Mountain Adventures",
    organizerLogo: "/mountain-logo.png",
    organizerRating: 4.8,
    moodTags: ["Adventure", "Culture"],
    region: "North India",
    ageGroup: "18-35",
    difficulty: "Medium",
    cancellation: "Flexible",
    emi: true,
    onRequest: false,
    doubleOccupancy: true,
    deals: ["15% Early Bird", "Free Meals"],
    highlights: ["Rohtang Pass", "Solang Valley", "Local Culture"],
    tags: ["Mountains", "Trekking", "Photography"],
    groupSize: "8-12 people",
  },
  {
    id: 2,
    title: "Kerala Backwater Cruise",
    location: "Alleppey, Kerala",
    startPoint: "Kochi",
    endPoint: "Alleppey",
    dates: "22-25 May 2024",
    price: 12000,
    originalPrice: 15000,
    rating: 4.4,
    reviewCount: 189,
    duration: "3 Days",
    coverImage: "/kerala-backwaters.png",
    organizer: "South India Tours",
    organizerLogo: "/beach-logo.png",
    organizerRating: 4.6,
    moodTags: ["Relaxation", "Culture"],
    region: "South India",
    ageGroup: "All Ages",
    difficulty: "Easy",
    cancellation: "Flexible",
    emi: false,
    onRequest: false,
    doubleOccupancy: true,
    deals: ["20% Off"],
    highlights: ["Houseboat Stay", "Traditional Cuisine", "Village Tours"],
    tags: ["Backwaters", "Houseboat", "Peaceful"],
    groupSize: "4-8 people",
  },
  {
    id: 3,
    title: "Rajasthan Royal Heritage",
    location: "Jaipur-Udaipur-Jodhpur",
    startPoint: "Delhi",
    endPoint: "Jodhpur",
    dates: "1-7 June 2024",
    price: 25000,
    originalPrice: 30000,
    rating: 4.8,
    reviewCount: 312,
    duration: "7 Days",
    coverImage: "/rajasthan-palace.png",
    organizer: "Heritage Travels",
    organizerLogo: "/heritage-logo.png",
    organizerRating: 4.9,
    moodTags: ["Culture", "Luxury"],
    region: "North India",
    ageGroup: "26-55",
    difficulty: "Easy",
    cancellation: "Strict",
    emi: true,
    onRequest: false,
    doubleOccupancy: true,
    deals: ["Palace Stay Included"],
    highlights: ["Royal Palaces", "Desert Safari", "Cultural Shows"],
    tags: ["Heritage", "Palaces", "Desert"],
    groupSize: "10-15 people",
  },
  {
    id: 4,
    title: "Goa Beach Paradise",
    location: "North & South Goa",
    startPoint: "Mumbai",
    endPoint: "Goa",
    dates: "10-14 June 2024",
    price: 8000,
    originalPrice: 10000,
    rating: 4.3,
    reviewCount: 456,
    duration: "4 Days",
    coverImage: "/goa-beach-sunset.png",
    organizer: "Coastal Adventures",
    organizerLogo: "/beach-logo.png",
    organizerRating: 4.4,
    moodTags: ["Relaxation", "Adventure", "Nightlife"],
    region: "West India",
    ageGroup: "18-35",
    difficulty: "Easy",
    cancellation: "Flexible",
    emi: false,
    onRequest: false,
    doubleOccupancy: true,
    deals: ["Water Sports Free"],
    highlights: ["Beach Hopping", "Water Sports", "Nightlife"],
    tags: ["Beach", "Water Sports", "Party"],
    groupSize: "6-12 people",
  },
  {
    id: 5,
    title: "Ladakh Bike Expedition",
    location: "Leh-Ladakh",
    startPoint: "Delhi",
    endPoint: "Leh",
    dates: "20-30 June 2024",
    price: 35000,
    originalPrice: 40000,
    rating: 4.9,
    reviewCount: 167,
    duration: "10 Days",
    coverImage: "/ladakh-bike-adventure.png",
    organizer: "Himalayan Riders",
    organizerLogo: "/abstract-bike-logo.png",
    organizerRating: 4.8,
    moodTags: ["Adventure", "Extreme"],
    region: "North India",
    ageGroup: "21-45",
    difficulty: "Difficult",
    cancellation: "Strict",
    emi: true,
    onRequest: true,
    doubleOccupancy: false,
    deals: ["Bike Rental Included"],
    highlights: ["High Altitude Passes", "Monasteries", "Scenic Routes"],
    tags: ["Biking", "Mountains", "Adventure"],
    groupSize: "4-8 people",
  },
  {
    id: 6,
    title: "Darjeeling Tea Gardens",
    location: "Darjeeling, West Bengal",
    startPoint: "Kolkata",
    endPoint: "Darjeeling",
    dates: "5-9 July 2024",
    price: 9000,
    originalPrice: 11000,
    rating: 4.6,
    reviewCount: 203,
    duration: "4 Days",
    coverImage: "/darjeeling-tea-gardens.png",
    organizer: "Hill Station Tours",
    organizerLogo: "/elegant-tea-logo.png",
    organizerRating: 4.7,
    moodTags: ["Relaxation", "Culture"],
    region: "East India",
    ageGroup: "All Ages",
    difficulty: "Easy",
    cancellation: "Flexible",
    emi: false,
    onRequest: false,
    doubleOccupancy: true,
    deals: ["Tea Tasting Included"],
    highlights: ["Sunrise at Tiger Hill", "Tea Garden Tours", "Toy Train Ride"],
    tags: ["Hills", "Tea Gardens", "Heritage"],
    groupSize: "6-10 people",
  },
  {
    id: 7,
    title: "Andaman Island Paradise",
    location: "Port Blair, Andaman",
    startPoint: "Chennai",
    endPoint: "Port Blair",
    dates: "15-22 July 2024",
    price: 22000,
    originalPrice: 26000,
    rating: 4.7,
    reviewCount: 145,
    duration: "7 Days",
    coverImage: "/andaman-beach-scene.png",
    organizer: "Island Adventures",
    organizerLogo: "/beach-logo.png",
    organizerRating: 4.5,
    moodTags: ["Relaxation", "Adventure"],
    region: "Islands",
    ageGroup: "18-50",
    difficulty: "Easy",
    cancellation: "Moderate",
    emi: true,
    onRequest: false,
    doubleOccupancy: true,
    deals: ["Scuba Diving Package"],
    highlights: ["Radhanagar Beach", "Scuba Diving", "Cellular Jail"],
    tags: ["Islands", "Beaches", "Water Sports"],
    groupSize: "8-12 people",
  },
  {
    id: 8,
    title: "Rishikesh Yoga Retreat",
    location: "Rishikesh, Uttarakhand",
    startPoint: "Delhi",
    endPoint: "Rishikesh",
    dates: "25-30 July 2024",
    price: 7000,
    originalPrice: 9000,
    rating: 4.8,
    reviewCount: 278,
    duration: "5 Days",
    coverImage: "/rishikesh-yoga-ganges.png",
    organizer: "Spiritual Journeys",
    organizerLogo: "/yoga-logo.png",
    organizerRating: 4.9,
    moodTags: ["Relaxation", "Spiritual"],
    region: "North India",
    ageGroup: "All Ages",
    difficulty: "Easy",
    cancellation: "Flexible",
    emi: false,
    onRequest: false,
    doubleOccupancy: true,
    deals: ["Meditation Sessions Free"],
    highlights: ["Daily Yoga Classes", "Ganga Aarti", "Adventure Sports"],
    tags: ["Yoga", "Spiritual", "River"],
    groupSize: "10-15 people",
  },
  {
    id: 9,
    title: "Hampi Heritage Walk",
    location: "Hampi, Karnataka",
    startPoint: "Bangalore",
    endPoint: "Hampi",
    dates: "5-8 August 2024",
    price: 6500,
    originalPrice: 8000,
    rating: 4.5,
    reviewCount: 156,
    duration: "3 Days",
    coverImage: "/hampi-ruins-temples.png",
    organizer: "Heritage Walks",
    organizerLogo: "/heritage-logo.png",
    organizerRating: 4.6,
    moodTags: ["Culture", "History"],
    region: "South India",
    ageGroup: "25-60",
    difficulty: "Moderate",
    cancellation: "Flexible",
    emi: false,
    onRequest: false,
    doubleOccupancy: true,
    deals: ["Guide Included"],
    highlights: ["Vijayanagara Ruins", "Stone Chariot", "Sunset Point"],
    tags: ["Heritage", "Temples", "History"],
    groupSize: "8-12 people",
  },
  {
    id: 10,
    title: "Spiti Valley Expedition",
    location: "Spiti Valley, Himachal Pradesh",
    startPoint: "Delhi",
    endPoint: "Kaza",
    dates: "15-25 August 2024",
    price: 28000,
    originalPrice: 32000,
    rating: 4.9,
    reviewCount: 89,
    duration: "10 Days",
    coverImage: "/spiti-valley-mountains.png",
    organizer: "High Altitude Tours",
    organizerLogo: "/mountain-logo.png",
    organizerRating: 4.8,
    moodTags: ["Adventure", "Extreme"],
    region: "North India",
    ageGroup: "21-50",
    difficulty: "Difficult",
    cancellation: "Strict",
    emi: true,
    onRequest: true,
    doubleOccupancy: false,
    deals: ["Oxygen Support Included"],
    highlights: ["Key Monastery", "Chandratal Lake", "High Altitude Desert"],
    tags: ["Mountains", "Desert", "Monasteries"],
    groupSize: "4-8 people",
  },
  {
    id: 11,
    title: "Mumbai Street Food Tour",
    location: "Mumbai, Maharashtra",
    startPoint: "Mumbai",
    endPoint: "Mumbai",
    dates: "1-3 September 2024",
    price: 4500,
    originalPrice: 5500,
    rating: 4.4,
    reviewCount: 324,
    duration: "2 Days",
    coverImage: "/mumbai-street-food.png",
    organizer: "Food Adventures",
    organizerLogo: "/diverse-food-logo.png",
    organizerRating: 4.3,
    moodTags: ["Culture", "Food"],
    region: "West India",
    ageGroup: "All Ages",
    difficulty: "Easy",
    cancellation: "Flexible",
    emi: false,
    onRequest: false,
    doubleOccupancy: true,
    deals: ["Food Tastings Included"],
    highlights: ["Street Food Tours", "Local Markets", "Cooking Classes"],
    tags: ["Food", "Culture", "City"],
    groupSize: "6-10 people",
  },
  {
    id: 12,
    title: "Coorg Coffee Plantation",
    location: "Coorg, Karnataka",
    startPoint: "Bangalore",
    endPoint: "Coorg",
    dates: "10-13 September 2024",
    price: 8500,
    originalPrice: 10000,
    rating: 4.6,
    reviewCount: 198,
    duration: "3 Days",
    coverImage: "/coorg-coffee-plantation.png",
    organizer: "Plantation Tours",
    organizerLogo: "/coffee-plantation-logo.png",
    organizerRating: 4.7,
    moodTags: ["Relaxation", "Nature"],
    region: "South India",
    ageGroup: "All Ages",
    difficulty: "Easy",
    cancellation: "Flexible",
    emi: false,
    onRequest: false,
    doubleOccupancy: true,
    deals: ["Coffee Tasting Free"],
    highlights: ["Coffee Plantation Tours", "Waterfall Visits", "Spice Gardens"],
    tags: ["Coffee", "Nature", "Hills"],
    groupSize: "8-12 people",
  },
]

const FilterSection = ({
  budgetRange,
  setBudgetRange,
  startDate,
  setStartDate,
  selectedDuration,
  setSelectedDuration,
  selectedAgeGroup,
  setSelectedAgeGroup,
  selectedMoods,
  setSelectedMoods,
  selectedRegions,
  setSelectedRegions,
  departureCity,
  setDepartureCity,
  selectedDifficulty,
  setSelectedDifficulty,
  selectedCancellation,
  setSelectedCancellation,
  emiOnly,
  setEmiOnly,
  onRequestOnly,
  setOnRequestOnly,
  doubleOccupancyOnly,
  setDoubleOccupancyOnly,
  dealsOnly,
  setDealsOnly,
}: {
  budgetRange: number[]
  setBudgetRange: (value: number[]) => void
  startDate: string
  setStartDate: (value: string) => void
  selectedDuration: string[]
  setSelectedDuration: (value: string[]) => void
  selectedAgeGroup: string[]
  setSelectedAgeGroup: (value: string[]) => void
  selectedMoods: string[]
  setSelectedMoods: (value: string[]) => void
  selectedRegions: string[]
  setSelectedRegions: (value: string[]) => void
  departureCity: string
  setDepartureCity: (value: string) => void
  selectedDifficulty: string[]
  setSelectedDifficulty: (value: string[]) => void
  selectedCancellation: string[]
  setSelectedCancellation: (value: string[]) => void
  emiOnly: boolean
  setEmiOnly: (value: boolean) => void
  onRequestOnly: boolean
  setOnRequestOnly: (value: boolean) => void
  doubleOccupancyOnly: boolean
  setDoubleOccupancyOnly: (value: boolean) => void
  dealsOnly: boolean
  setDealsOnly: (value: boolean) => void
}) => (
  <div className="space-y-4 sm:space-y-6">
    <h3 className="text-base sm:text-lg font-semibold text-gray-900">Filters</h3>

    {/* Budget Range */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2 sm:mb-3">Budget Range</label>
      <Slider value={budgetRange} onValueChange={setBudgetRange} max={50000} step={1000} className="mb-2" />
      <div className="flex justify-between text-xs sm:text-sm text-gray-600">
        <span>₹{budgetRange[0].toLocaleString()}</span>
        <span>₹{budgetRange[1].toLocaleString()}</span>
      </div>
    </div>

    {/* Start Date */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2 sm:mb-3">Start Date</label>
      <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="text-sm" />
    </div>

    {/* Duration */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2 sm:mb-3">Duration</label>
      <div className="space-y-1.5 sm:space-y-2">
        {durations.map((duration) => (
          <div key={duration} className="flex items-center space-x-2">
            <Checkbox
              id={duration}
              checked={selectedDuration.includes(duration)}
              onCheckedChange={(checked) => {
                if (checked) {
                  setSelectedDuration([...selectedDuration, duration])
                } else {
                  setSelectedDuration(selectedDuration.filter((d) => d !== duration))
                }
              }}
            />
            <label htmlFor={duration} className="text-xs sm:text-sm text-gray-700">
              {duration}
            </label>
          </div>
        ))}
      </div>
    </div>

    {/* Age Group */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2 sm:mb-3">Age Group</label>
      <div className="space-y-1.5 sm:space-y-2">
        {ageGroups.map((age) => (
          <div key={age} className="flex items-center space-x-2">
            <Checkbox
              id={age}
              checked={selectedAgeGroup.includes(age)}
              onCheckedChange={(checked) => {
                if (checked) {
                  setSelectedAgeGroup([...selectedAgeGroup, age])
                } else {
                  setSelectedAgeGroup(selectedAgeGroup.filter((a) => a !== age))
                }
              }}
            />
            <label htmlFor={age} className="text-xs sm:text-sm text-gray-700">
              {age}
            </label>
          </div>
        ))}
      </div>
    </div>

    {/* Moods */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2 sm:mb-3">Moods</label>
      <div className="space-y-1.5 sm:space-y-2">
        {moods.map((mood) => (
          <div key={mood} className="flex items-center space-x-2">
            <Checkbox
              id={mood}
              checked={selectedMoods.includes(mood)}
              onCheckedChange={(checked) => {
                if (checked) {
                  setSelectedMoods([...selectedMoods, mood])
                } else {
                  setSelectedMoods(selectedMoods.filter((m) => m !== mood))
                }
              }}
            />
            <label htmlFor={mood} className="text-xs sm:text-sm text-gray-700">
              {mood}
            </label>
          </div>
        ))}
      </div>
    </div>

    {/* Regions */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2 sm:mb-3">Regions</label>
      <div className="space-y-1.5 sm:space-y-2">
        {regions.map((region) => (
          <div key={region} className="flex items-center space-x-2">
            <Checkbox
              id={region}
              checked={selectedRegions.includes(region)}
              onCheckedChange={(checked) => {
                if (checked) {
                  setSelectedRegions([...selectedRegions, region])
                } else {
                  setSelectedRegions(selectedRegions.filter((r) => r !== region))
                }
              }}
            />
            <label htmlFor={region} className="text-xs sm:text-sm text-gray-700">
              {region}
            </label>
          </div>
        ))}
      </div>
    </div>

    {/* Departure City */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2 sm:mb-3">Departure City</label>
      <Input
        type="text"
        placeholder="Enter your city"
        value={departureCity}
        onChange={(e) => setDepartureCity(e.target.value)}
        className="text-sm"
      />
    </div>

    {/* Difficulty */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2 sm:mb-3">Difficulty</label>
      <div className="space-y-1.5 sm:space-y-2">
        {difficulties.map((difficulty) => (
          <div key={difficulty} className="flex items-center space-x-2">
            <Checkbox
              id={difficulty}
              checked={selectedDifficulty.includes(difficulty)}
              onCheckedChange={(checked) => {
                if (checked) {
                  setSelectedDifficulty([...selectedDifficulty, difficulty])
                } else {
                  setSelectedDifficulty(selectedDifficulty.filter((d) => d !== difficulty))
                }
              }}
            />
            <label htmlFor={difficulty} className="text-xs sm:text-sm text-gray-700">
              {difficulty}
            </label>
          </div>
        ))}
      </div>
    </div>

    {/* Cancellation Policy */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2 sm:mb-3">Cancellation Policy</label>
      <div className="space-y-1.5 sm:space-y-2">
        {cancellationTypes.map((cancellation) => (
          <div key={cancellation} className="flex items-center space-x-2">
            <Checkbox
              id={cancellation}
              checked={selectedCancellation.includes(cancellation)}
              onCheckedChange={(checked) => {
                if (checked) {
                  setSelectedCancellation([...selectedCancellation, cancellation])
                } else {
                  setSelectedCancellation(selectedCancellation.filter((c) => c !== cancellation))
                }
              }}
            />
            <label htmlFor={cancellation} className="text-xs sm:text-sm text-gray-700">
              {cancellation}
            </label>
          </div>
        ))}
      </div>
    </div>

    {/* Additional Options */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2 sm:mb-3">Additional Options</label>
      <div className="space-y-1.5 sm:space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox id="emi" checked={emiOnly} onCheckedChange={setEmiOnly} />
          <label htmlFor="emi" className="text-xs sm:text-sm text-gray-700">
            EMI Available
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="onRequest" checked={onRequestOnly} onCheckedChange={setOnRequestOnly} />
          <label htmlFor="onRequest" className="text-xs sm:text-sm text-gray-700">
            On Request/Exclusive Groups
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="doubleOccupancy" checked={doubleOccupancyOnly} onCheckedChange={setDoubleOccupancyOnly} />
          <label htmlFor="doubleOccupancy" className="text-xs sm:text-sm text-gray-700">
            Double Occupancy
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="deals" checked={dealsOnly} onCheckedChange={setDealsOnly} />
          <label htmlFor="deals" className="text-xs sm:text-sm text-gray-700">
            Discounts/Deals/Offers
          </label>
        </div>
      </div>
    </div>
  </div>
)

export default function SearchPage() {
  const searchParams = useSearchParams()
  const [compareList, setCompareList] = useState<number[]>([])
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showCompareDrawer, setShowCompareDrawer] = useState(false)
  const [sortBy, setSortBy] = useState("relevance")

  const [budgetRange, setBudgetRange] = useState([0, 50000])
  const [selectedMoods, setSelectedMoods] = useState<string[]>([])
  const [selectedRegions, setSelectedRegions] = useState<string[]>([])
  const [selectedMonths, setSelectedMonths] = useState<string[]>([])
  const [selectedDuration, setSelectedDuration] = useState<string[]>([])
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string[]>([])
  const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>([])
  const [selectedCancellation, setSelectedCancellation] = useState<string[]>([])
  const [departureCity, setDepartureCity] = useState("")
  const [emiOnly, setEmiOnly] = useState(false)
  const [onRequestOnly, setOnRequestOnly] = useState(false)
  const [doubleOccupancyOnly, setDoubleOccupancyOnly] = useState(false)
  const [dealsOnly, setDealsOnly] = useState(false)
  const [startDate, setStartDate] = useState("") // Declare startDate and setStartDate

  useEffect(() => {
    // Convert searchParams to a stable string
    const moodsParam = searchParams.get("moods") || ""
    const moodsArray = moodsParam ? moodsParam.split(",") : []

    // Only update if there's an actual difference
    const isDifferent = moodsArray.length !== selectedMoods.length || moodsArray.some((m) => !selectedMoods.includes(m))

    if (isDifferent) {
      setSelectedMoods(moodsArray)
    }
  }, [searchParams.toString(), selectedMoods])

  const filteredAndSortedTrips = useMemo(() => {
    const filtered = mockTrips.filter((trip) => {
      // Budget filter
      if (trip.price < budgetRange[0] || trip.price > budgetRange[1]) return false

      // Mood filter
      if (selectedMoods.length > 0 && !selectedMoods.some((mood) => trip.moodTags.includes(mood))) return false

      // Region filter
      if (selectedRegions.length > 0 && !selectedRegions.includes(trip.region)) return false

      // Duration filter
      if (selectedDuration.length > 0) {
        const tripDays = Number.parseInt(trip.duration.split(" ")[0])
        const matchesDuration = selectedDuration.some((duration) => {
          if (duration === "1-2 Days") return tripDays <= 2
          if (duration === "3-4 Days") return tripDays >= 3 && tripDays <= 4
          if (duration === "5-7 Days") return tripDays >= 5 && tripDays <= 7
          if (duration === "1-2 Weeks") return tripDays >= 8 && tripDays <= 14
          if (duration === "2+ Weeks") return tripDays > 14
          return false
        })
        if (!matchesDuration) return false
      }

      // Age group filter
      if (selectedAgeGroup.length > 0) {
        const matchesAge = selectedAgeGroup.some((selectedAge) => {
          if (selectedAge === "All Ages") return trip.ageGroup === "All Ages"

          const parseAgeRange = (ageStr: string) => {
            if (ageStr === "All Ages") return { min: 0, max: 100 }
            const match = ageStr.match(/(\d+)[-+]?(\d+)?/)
            if (!match) return null
            const min = Number.parseInt(match[1])
            const max = match[2] ? Number.parseInt(match[2]) : ageStr.includes("+") ? 100 : min
            return { min, max }
          }

          const selectedRange = parseAgeRange(selectedAge)
          const tripRange = parseAgeRange(trip.ageGroup)

          if (!selectedRange || !tripRange) return false

          return selectedRange.min <= tripRange.max && selectedRange.max >= tripRange.min
        })
        if (!matchesAge) return false
      }

      // Difficulty filter
      if (selectedDifficulty.length > 0 && !selectedDifficulty.includes(trip.difficulty)) return false

      // Cancellation filter
      if (selectedCancellation.length > 0 && !selectedCancellation.includes(trip.cancellation)) return false

      // Departure city filter
      if (departureCity && !trip.startPoint.toLowerCase().includes(departureCity.toLowerCase())) return false

      // EMI filter
      if (emiOnly && !trip.emi) return false

      // On request filter
      if (onRequestOnly && !trip.onRequest) return false

      // Double occupancy filter
      if (doubleOccupancyOnly && !trip.doubleOccupancy) return false

      // Deals filter
      if (dealsOnly && (!trip.deals || trip.deals.length === 0)) return false

      return true
    })

    // Apply sorting
    const sorted = [...filtered]
    switch (sortBy) {
      case "price-low":
        sorted.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        sorted.sort((a, b) => b.price - a.price)
        break
      case "rating":
        sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0))
        break
      case "duration-low":
        sorted.sort((a, b) => Number.parseInt(a.duration.split(" ")[0]) - Number.parseInt(b.duration.split(" ")[0]))
        break
      case "duration-high":
        sorted.sort((a, b) => Number.parseInt(b.duration.split(" ")[0]) - Number.parseInt(a.duration.split(" ")[0]))
        break
      case "relevance":
      default:
        // Keep original order for relevance
        break
    }

    return sorted
  }, [
    budgetRange,
    selectedMoods,
    selectedRegions,
    selectedDuration,
    selectedAgeGroup,
    selectedDifficulty,
    selectedCancellation,
    departureCity,
    emiOnly,
    onRequestOnly,
    doubleOccupancyOnly,
    dealsOnly,
    sortBy,
  ])

  const handleSaveTrip = useCallback((tripId: number) => {
    setShowLoginModal(true)
  }, [])

  const handleCompareToggle = useCallback((tripId: number) => {
    setCompareList((prev) => {
      if (prev.includes(tripId)) {
        return prev.filter((id) => id !== tripId)
      } else if (prev.length < 3) {
        return [...prev, tripId]
      }
      return prev
    })
  }, [])

  const handleSort = useCallback((value: string) => {
    setSortBy(value)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <Link href="/landing" className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <span className="text-lg sm:text-xl font-bold text-gray-900">TravelPortal</span>
            </Link>

            <div className="flex-1 max-w-md sm:max-w-2xl mx-2 sm:mx-8">
              <div className="relative">
                <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search trips..."
                  className="pl-8 sm:pl-10 pr-3 sm:pr-4 py-1.5 sm:py-2 w-full text-sm"
                />
              </div>
            </div>

            <div className="flex items-center">
              <Link href="/" className="text-sm sm:text-base text-gray-600 hover:text-gray-900">
                Login
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="bg-white border-b px-3 sm:px-4 lg:px-8 py-2 sm:py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-1 sm:gap-2">
            {selectedMoods.map((mood) => (
              <Badge key={mood} variant="secondary" className="flex items-center gap-1 text-xs">
                {mood}
                <X
                  className="w-3 h-3 cursor-pointer"
                  onClick={() => setSelectedMoods(selectedMoods.filter((m) => m !== mood))}
                />
              </Badge>
            ))}
            {selectedRegions.map((region) => (
              <Badge key={region} variant="secondary" className="flex items-center gap-1 text-xs">
                {region}
                <X
                  className="w-3 h-3 cursor-pointer"
                  onClick={() => setSelectedRegions(selectedRegions.filter((r) => r !== region))}
                />
              </Badge>
            ))}
            {selectedDuration.map((duration) => (
              <Badge key={duration} variant="secondary" className="flex items-center gap-1 text-xs">
                {duration}
                <X
                  className="w-3 h-3 cursor-pointer"
                  onClick={() => setSelectedDuration(selectedDuration.filter((d) => d !== duration))}
                />
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-6">
        <div className="flex gap-4 lg:gap-8">
          {/* Filters Sidebar - Hidden on mobile */}
          <div className="hidden lg:block w-72 xl:w-80 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-4 lg:p-6 sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto">
              <FilterSection
                budgetRange={budgetRange}
                setBudgetRange={setBudgetRange}
                startDate={startDate}
                setStartDate={setStartDate}
                selectedDuration={selectedDuration}
                setSelectedDuration={setSelectedDuration}
                selectedAgeGroup={selectedAgeGroup}
                setSelectedAgeGroup={setSelectedAgeGroup}
                selectedMoods={selectedMoods}
                setSelectedMoods={setSelectedMoods}
                selectedRegions={selectedRegions}
                setSelectedRegions={setSelectedRegions}
                departureCity={departureCity}
                setDepartureCity={setDepartureCity}
                selectedDifficulty={selectedDifficulty}
                setSelectedDifficulty={setSelectedDifficulty}
                selectedCancellation={selectedCancellation}
                setSelectedCancellation={setSelectedCancellation}
                emiOnly={emiOnly}
                setEmiOnly={setEmiOnly}
                onRequestOnly={onRequestOnly}
                setOnRequestOnly={setOnRequestOnly}
                doubleOccupancyOnly={doubleOccupancyOnly}
                setDoubleOccupancyOnly={setDoubleOccupancyOnly}
                dealsOnly={dealsOnly}
                setDealsOnly={setDealsOnly}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3 sm:gap-4">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Search Results</h1>
                <p className="text-sm sm:text-base text-gray-600">{filteredAndSortedTrips.length} trips found</p>
              </div>

              <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
                {/* Mobile Filter Button */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden bg-transparent flex-1 sm:flex-none text-sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[300px] sm:w-80 overflow-y-auto p-4">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <FilterSection
                        budgetRange={budgetRange}
                        setBudgetRange={setBudgetRange}
                        startDate={startDate}
                        setStartDate={setStartDate}
                        selectedDuration={selectedDuration}
                        setSelectedDuration={setSelectedDuration}
                        selectedAgeGroup={selectedAgeGroup}
                        setSelectedAgeGroup={setSelectedAgeGroup}
                        selectedMoods={selectedMoods}
                        setSelectedMoods={setSelectedMoods}
                        selectedRegions={selectedRegions}
                        setSelectedRegions={setSelectedRegions}
                        departureCity={departureCity}
                        setDepartureCity={setDepartureCity}
                        selectedDifficulty={selectedDifficulty}
                        setSelectedDifficulty={setSelectedDifficulty}
                        selectedCancellation={selectedCancellation}
                        setSelectedCancellation={setSelectedCancellation}
                        emiOnly={emiOnly}
                        setEmiOnly={setEmiOnly}
                        onRequestOnly={onRequestOnly}
                        setOnRequestOnly={setOnRequestOnly}
                        doubleOccupancyOnly={doubleOccupancyOnly}
                        setDoubleOccupancyOnly={setDoubleOccupancyOnly}
                        dealsOnly={dealsOnly}
                        setDealsOnly={setDealsOnly}
                      />
                    </div>
                  </SheetContent>
                </Sheet>

                {/* Sort Dropdown */}
                <Select value={sortBy} onValueChange={handleSort}>
                  <SelectTrigger className="w-full sm:w-48 text-sm">
                    <ArrowUpDown className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="duration-low">Duration: Short to Long</SelectItem>
                    <SelectItem value="duration-high">Duration: Long to Short</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4 lg:space-y-6">
              {filteredAndSortedTrips.map((trip) => (
                <TripCard
                  key={trip.id}
                  trip={trip}
                  onSave={handleSaveTrip}
                  onCompare={handleCompareToggle}
                  isCompared={compareList.includes(trip.id)}
                />
              ))}
            </div>

            {/* No Trips Found Message */}
            {filteredAndSortedTrips.length === 0 && (
              <div className="text-center py-8 sm:py-12">
                <div className="max-w-md mx-auto px-4">
                  <p className="text-gray-500 text-base sm:text-lg mb-2">No trips found matching your criteria.</p>
                  <p className="text-gray-400 text-sm">Try adjusting your filters or search terms.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {compareList.length > 0 && (
        <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50">
          <Button
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg text-sm sm:text-base px-3 sm:px-4 py-2"
            onClick={() => setShowCompareDrawer(true)}
          >
            Compare ({compareList.length})
          </Button>
        </div>
      )}

      {/* Login Modal */}
      <Dialog open={showLoginModal} onOpenChange={setShowLoginModal}>
        <DialogContent className="sm:max-w-md mx-4">
          <DialogHeader>
            <DialogTitle>Login Required</DialogTitle>
          </DialogHeader>
          <div className="text-center py-4 sm:py-6">
            <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
              Please login to save trips or use compare functionality.
            </p>
            <div className="flex gap-3 justify-center">
              <Button variant="outline" onClick={() => setShowLoginModal(false)} className="text-sm">
                Cancel
              </Button>
              <Link href="/">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-sm">
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
