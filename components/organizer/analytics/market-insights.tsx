"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, TrendingUp, MapPin, DollarSign, Hash } from "lucide-react"

// Mock data
const seasonalityData = [
  { date: "2025-01-15", demand: "high", events: ["Republic Day Weekend"] },
  { date: "2025-01-26", demand: "high", events: ["Republic Day"] },
  { date: "2025-02-14", demand: "medium", events: ["Valentine's Day"] },
  { date: "2025-02-28", demand: "low", events: [] },
  { date: "2025-03-08", demand: "medium", events: ["Women's Day"] },
  { date: "2025-03-13", demand: "high", events: ["Holi"] },
  { date: "2025-03-21", demand: "medium", events: ["Spring Equinox"] },
  { date: "2025-04-10", demand: "high", events: ["Good Friday"] },
  { date: "2025-04-14", demand: "high", events: ["Baisakhi"] },
]

const trendingKeywords = [
  { keyword: "himalayan trek", searches: 2847, change: "+23%" },
  { keyword: "goa beach", searches: 2156, change: "+18%" },
  { keyword: "weekend getaway", searches: 1923, change: "+15%" },
  { keyword: "adventure sports", searches: 1654, change: "+12%" },
  { keyword: "solo travel", searches: 1432, change: "+8%" },
]

const trendingDestinations = {
  cities: [
    { name: "Manali", score: 1250, change: "+15%" },
    { name: "Goa", score: 1180, change: "+12%" },
    { name: "Rishikesh", score: 980, change: "+8%" },
    { name: "Udaipur", score: 850, change: "+5%" },
    { name: "Munnar", score: 720, change: "+3%" },
  ],
  states: [
    { name: "Himachal Pradesh", score: 2340, change: "+18%" },
    { name: "Goa", score: 1890, change: "+14%" },
    { name: "Rajasthan", score: 1650, change: "+10%" },
  ],
  international: [
    { name: "Nepal", score: 890, change: "+25%" },
    { name: "Bhutan", score: 650, change: "+20%" },
    { name: "Thailand", score: 540, change: "+15%" },
  ],
}

const trendingMoods = [
  { mood: "Adventure", score: 1850, change: "+20%" },
  { mood: "Mountains", score: 1650, change: "+18%" },
  { mood: "Trekking", score: 1420, change: "+15%" },
  { mood: "Beach", score: 1280, change: "+12%" },
  { mood: "Spiritual", score: 980, change: "+8%" },
]

const budgetTrends = [
  { range: "₹5,000 - ₹10,000", percentage: 35, trend: "+5%" },
  { range: "₹10,000 - ₹15,000", percentage: 28, trend: "+8%" },
  { range: "₹15,000 - ₹20,000", percentage: 22, trend: "+3%" },
  { range: "₹20,000 - ₹25,000", percentage: 10, trend: "-2%" },
  { range: "₹25,000+", percentage: 5, trend: "-1%" },
]

const getDemandColor = (demand: string) => {
  switch (demand) {
    case "high":
      return "bg-green-500"
    case "medium":
      return "bg-yellow-500"
    case "low":
      return "bg-red-500"
    default:
      return "bg-gray-300"
  }
}

export function MarketInsights() {
  const [selectedMonth, setSelectedMonth] = useState("2025-01")

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Market Insights</h1>
          <p className="text-gray-600 mt-1">Discover market trends and opportunities</p>
        </div>
      </div>

      {/* Trending Keywords */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Hash className="h-5 w-5" />
            <span>Trending Keywords (Last 7 Days)</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {trendingKeywords.map((item, index) => (
              <div key={item.keyword} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium">{item.keyword}</p>
                    <p className="text-sm text-gray-600">{item.searches.toLocaleString()} searches</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-green-600">
                  {item.change}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Seasonality Calendar */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CalendarIcon className="h-5 w-5" />
              <span>Seasonality Calendar</span>
            </div>
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2025-01">January 2025</SelectItem>
                <SelectItem value="2025-02">February 2025</SelectItem>
                <SelectItem value="2025-03">March 2025</SelectItem>
                <SelectItem value="2025-04">April 2025</SelectItem>
                <SelectItem value="2025-05">May 2025</SelectItem>
                <SelectItem value="2025-06">June 2025</SelectItem>
              </SelectContent>
            </Select>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2 mb-4">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="text-center text-sm font-medium text-gray-600 p-2">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 31 }, (_, i) => {
              const date = i + 1
              const dateStr = `2025-01-${date.toString().padStart(2, "0")}`
              const dayData = seasonalityData.find((d) => d.date === dateStr)
              return (
                <div
                  key={date}
                  className={`relative p-2 text-center text-sm border rounded cursor-pointer hover:bg-gray-50 ${
                    dayData ? getDemandColor(dayData.demand) + " text-white" : "bg-white"
                  }`}
                >
                  {date}
                  {dayData?.events.length > 0 && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-orange-500 rounded-full"></div>
                  )}
                </div>
              )
            })}
          </div>
          <div className="flex items-center justify-center space-x-6 mt-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span>High Demand</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded"></div>
              <span>Medium Demand</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span>Low Demand</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trending Destinations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="h-5 w-5" />
            <span>Trending Destinations</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="cities" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="cities">Top Cities</TabsTrigger>
              <TabsTrigger value="states">Top States</TabsTrigger>
              <TabsTrigger value="international">International</TabsTrigger>
            </TabsList>
            <TabsContent value="cities" className="space-y-3">
              {trendingDestinations.cities.map((city, index) => (
                <div key={city.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold">
                      {index + 1}
                    </div>
                    <span className="font-medium">{city.name}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-600">Score: {city.score}</span>
                    <Badge variant="outline" className="text-green-600">
                      {city.change}
                    </Badge>
                  </div>
                </div>
              ))}
            </TabsContent>
            <TabsContent value="states" className="space-y-3">
              {trendingDestinations.states.map((state, index) => (
                <div key={state.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold">
                      {index + 1}
                    </div>
                    <span className="font-medium">{state.name}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-600">Score: {state.score}</span>
                    <Badge variant="outline" className="text-green-600">
                      {state.change}
                    </Badge>
                  </div>
                </div>
              ))}
            </TabsContent>
            <TabsContent value="international" className="space-y-3">
              {trendingDestinations.international.map((country, index) => (
                <div key={country.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold">
                      {index + 1}
                    </div>
                    <span className="font-medium">{country.name}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-600">Score: {country.score}</span>
                    <Badge variant="outline" className="text-green-600">
                      {country.change}
                    </Badge>
                  </div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Trending Moods and Budget Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Trending Moods</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {trendingMoods.map((mood, index) => (
                <div key={mood.mood} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-purple-100 text-purple-600 rounded-full text-sm font-semibold">
                      {index + 1}
                    </div>
                    <span className="font-medium">{mood.mood}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-600">Score: {mood.score}</span>
                    <Badge variant="outline" className="text-green-600">
                      {mood.change}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5" />
              <span>Budget Trends</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {budgetTrends.map((budget) => (
                <div key={budget.range} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{budget.range}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">{budget.percentage}%</span>
                      <Badge
                        variant="outline"
                        className={budget.trend.startsWith("+") ? "text-green-600" : "text-red-600"}
                      >
                        {budget.trend}
                      </Badge>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${budget.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
