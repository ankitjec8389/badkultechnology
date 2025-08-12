"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Search, TrendingUp, MapPin, DollarSign, Users, Star } from "lucide-react"

// Mock data for market insights
const trendingDestinations = [
  { destination: "Ladakh", searches: 2500, bookings: 450, growth: 25.3, type: "Adventure" },
  { destination: "Goa", searches: 2200, bookings: 680, growth: 18.7, type: "Beach" },
  { destination: "Manali", searches: 1800, bookings: 320, growth: 32.1, type: "Hill Station" },
  { destination: "Kerala", searches: 1600, bookings: 290, growth: 15.2, type: "Backwaters" },
  { destination: "Rajasthan", searches: 1400, bookings: 380, growth: 22.8, type: "Heritage" },
]

const budgetAnalysis = [
  { range: "₹5K-10K", users: 3200, bookings: 1200, percentage: 28.5 },
  { range: "₹10K-20K", users: 4100, bookings: 1800, percentage: 36.5 },
  { range: "₹20K-35K", users: 2800, bookings: 1100, percentage: 24.9 },
  { range: "₹35K-50K", users: 800, bookings: 320, percentage: 7.1 },
  { range: "₹50K+", users: 332, bookings: 180, percentage: 3.0 },
]

const seasonalTrends = [
  { month: "Jan", domestic: 1200, international: 200, total: 1400 },
  { month: "Feb", domestic: 1500, international: 280, total: 1780 },
  { month: "Mar", domestic: 1800, international: 350, total: 2150 },
  { month: "Apr", domestic: 2200, international: 420, total: 2620 },
  { month: "May", domestic: 2800, international: 380, total: 3180 },
  { month: "Jun", domestic: 2100, international: 180, total: 2280 },
]

const tripTypes = [
  { name: "Adventure", value: 35, bookings: 1750, color: "#3B82F6" },
  { name: "Beach", value: 25, bookings: 1250, color: "#10B981" },
  { name: "Heritage", value: 20, bookings: 1000, color: "#F59E0B" },
  { name: "Hill Station", value: 15, bookings: 750, color: "#8B5CF6" },
  { name: "Wildlife", value: 5, bookings: 250, color: "#EF4444" },
]

const trendingKeywords = [
  { keyword: "solo travel", searches: 1500, growth: 45.2, category: "Travel Style" },
  { keyword: "weekend getaway", searches: 1200, growth: 32.1, category: "Duration" },
  { keyword: "trekking", searches: 1100, growth: 28.7, category: "Activity" },
  { keyword: "beach vacation", searches: 950, growth: 22.3, category: "Destination Type" },
  { keyword: "family trip", searches: 800, growth: 18.9, category: "Travel Style" },
  { keyword: "adventure sports", searches: 750, growth: 35.6, category: "Activity" },
  { keyword: "cultural tour", searches: 680, growth: 15.4, category: "Experience" },
  { keyword: "photography tour", searches: 520, growth: 42.1, category: "Interest" },
]

const organizerRankings = [
  { name: "Mountain Adventures Co.", trips: 45, bookings: 1250, rating: 4.8, revenue: 2500000 },
  { name: "Coastal Expeditions", trips: 32, bookings: 890, rating: 4.6, revenue: 1800000 },
  { name: "Heritage Walks India", trips: 28, bookings: 780, rating: 4.7, revenue: 1600000 },
  { name: "Wildlife Safaris Ltd.", trips: 25, bookings: 650, rating: 4.5, revenue: 1400000 },
  { name: "Adventure Seekers", trips: 22, bookings: 580, rating: 4.4, revenue: 1200000 },
]

export function AdminMarketInsights() {
  const [timeRange, setTimeRange] = useState("6months")
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const filteredKeywords = trendingKeywords.filter(
    (keyword) =>
      keyword.keyword.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (categoryFilter === "all" || keyword.category === categoryFilter),
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Market Insights</h1>
          <p className="text-gray-600 mt-2">Comprehensive market trends and business intelligence</p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="30days">Last 30 days</SelectItem>
            <SelectItem value="3months">Last 3 months</SelectItem>
            <SelectItem value="6months">Last 6 months</SelectItem>
            <SelectItem value="1year">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Market Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Searches</CardTitle>
            <Search className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">125,432</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +15.2% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Popular Destinations</CardTitle>
            <MapPin className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">247</div>
            <div className="text-xs text-gray-600">Active destinations</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Booking Value</CardTitle>
            <DollarSign className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹18,500</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +8.3% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <Users className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.8%</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +0.5% from last month
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Seasonal Booking Trends</CardTitle>
            <CardDescription>Monthly booking patterns for domestic and international trips</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={seasonalTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="domestic"
                  stackId="1"
                  stroke="#3B82F6"
                  fill="#3B82F6"
                  fillOpacity={0.6}
                  name="Domestic"
                />
                <Area
                  type="monotone"
                  dataKey="international"
                  stackId="1"
                  stroke="#10B981"
                  fill="#10B981"
                  fillOpacity={0.6}
                  name="International"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Trip Type Distribution</CardTitle>
            <CardDescription>Popular trip categories and their booking share</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <ResponsiveContainer width="60%" height={200}>
                <PieChart>
                  <Pie
                    data={tripTypes}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {tripTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, "Share"]} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2">
                {tripTypes.map((type, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: type.color }}></div>
                    <div>
                      <span className="text-sm font-medium">{type.name}</span>
                      <p className="text-xs text-gray-500">{type.bookings} bookings</p>
                    </div>
                    <Badge variant="outline">{type.value}%</Badge>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Budget Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Budget Range Analysis</CardTitle>
          <CardDescription>User preferences by budget segments</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={budgetAnalysis}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="users" fill="#3B82F6" name="Users" />
              <Bar dataKey="bookings" fill="#10B981" name="Bookings" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Trending Destinations */}
      <Card>
        <CardHeader>
          <CardTitle>Trending Destinations</CardTitle>
          <CardDescription>Most searched and booked destinations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {trendingDestinations.map((destination, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                    <span className="text-sm font-bold text-blue-600">#{index + 1}</span>
                  </div>
                  <div>
                    <h4 className="font-medium">{destination.destination}</h4>
                    <p className="text-sm text-gray-600">{destination.type}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6 text-sm">
                  <div className="text-center">
                    <p className="font-medium">{destination.searches.toLocaleString()}</p>
                    <p className="text-gray-600">Searches</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium">{destination.bookings}</p>
                    <p className="text-gray-600">Bookings</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center text-green-600">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      <span className="font-medium">+{destination.growth}%</span>
                    </div>
                    <p className="text-gray-600">Growth</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Trending Keywords */}
      <Card>
        <CardHeader>
          <CardTitle>Trending Search Keywords</CardTitle>
          <CardDescription>Most popular search terms and their growth</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Travel Style">Travel Style</SelectItem>
                <SelectItem value="Activity">Activity</SelectItem>
                <SelectItem value="Duration">Duration</SelectItem>
                <SelectItem value="Destination Type">Destination Type</SelectItem>
                <SelectItem value="Experience">Experience</SelectItem>
                <SelectItem value="Interest">Interest</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredKeywords.map((keyword, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">{keyword.keyword}</h4>
                  <p className="text-sm text-gray-600">{keyword.category}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{keyword.searches.toLocaleString()}</p>
                  <div className="flex items-center text-xs text-green-600">
                    <TrendingUp className="h-3 w-3 mr-1" />+{keyword.growth}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Organizers */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Organizers</CardTitle>
          <CardDescription>Leading organizers by performance metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {organizerRankings.map((organizer, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-8 h-8 bg-yellow-100 rounded-full">
                    <span className="text-sm font-bold text-yellow-600">#{index + 1}</span>
                  </div>
                  <div>
                    <h4 className="font-medium">{organizer.name}</h4>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <span>{organizer.trips} trips</span>
                      <span>•</span>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 text-yellow-400 mr-1" />
                        <span>{organizer.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">₹{(organizer.revenue / 100000).toFixed(1)}L</p>
                  <p className="text-sm text-gray-600">{organizer.bookings} bookings</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
