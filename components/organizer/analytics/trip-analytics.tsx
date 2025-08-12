"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Eye, MousePointer, MessageSquare, Users, TrendingUp, TrendingDown, MapPin } from "lucide-react"

// Mock data
const tripPerformanceData = [
  { date: "2024-12-01", views: 45, clicks: 12, queries: 3, bookings: 1 },
  { date: "2024-12-02", views: 52, clicks: 15, queries: 4, bookings: 2 },
  { date: "2024-12-03", views: 38, clicks: 10, queries: 2, bookings: 0 },
  { date: "2024-12-04", views: 67, clicks: 18, queries: 5, bookings: 3 },
  { date: "2024-12-05", views: 71, clicks: 22, queries: 6, bookings: 2 },
  { date: "2024-12-06", views: 59, clicks: 16, queries: 4, bookings: 1 },
  { date: "2024-12-07", views: 84, clicks: 25, queries: 7, bookings: 4 },
]

const demographicsData = [
  { name: "18-24", value: 25, color: "#3B82F6" },
  { name: "25-30", value: 35, color: "#10B981" },
  { name: "31-36", value: 25, color: "#F59E0B" },
  { name: "36+", value: 15, color: "#EF4444" },
]

const genderData = [
  { name: "Male", value: 60, color: "#3B82F6" },
  { name: "Female", value: 35, color: "#EC4899" },
  { name: "Others", value: 5, color: "#8B5CF6" },
]

const locationData = [
  { city: "Delhi", views: 156, bookings: 12 },
  { city: "Mumbai", views: 134, bookings: 8 },
  { city: "Bangalore", views: 98, bookings: 6 },
  { city: "Pune", views: 87, bookings: 5 },
  { city: "Chennai", views: 76, bookings: 4 },
]

const trips = [
  { id: 1, name: "Himalayan Winter Trek", status: "Published" },
  { id: 2, name: "Goa Beach Adventure", status: "Under Review" },
  { id: 3, name: "Kerala Backwaters", status: "Published" },
  { id: 4, name: "Rajasthan Desert Safari", status: "Draft" },
]

export function TripAnalytics() {
  const [selectedTrip, setSelectedTrip] = useState("1")
  const [timeRange, setTimeRange] = useState("7d")

  const stats = [
    {
      title: "Total Views",
      value: "2,847",
      change: "+18%",
      trend: "up",
      icon: Eye,
      color: "text-blue-600",
    },
    {
      title: "Click Rate",
      value: "8.2%",
      change: "+2.1%",
      trend: "up",
      icon: MousePointer,
      color: "text-green-600",
    },
    {
      title: "Queries",
      value: "47",
      change: "-5%",
      trend: "down",
      icon: MessageSquare,
      color: "text-orange-600",
    },
    {
      title: "Bookings",
      value: "23",
      change: "+12%",
      trend: "up",
      icon: Users,
      color: "text-purple-600",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Trip Analytics</h1>
          <p className="text-gray-600 mt-1">Analyze individual trip performance and insights</p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Trip</label>
              <Select value={selectedTrip} onValueChange={setSelectedTrip}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {trips.map((trip) => (
                    <SelectItem key={trip.id} value={trip.id.toString()}>
                      <div className="flex items-center space-x-2">
                        <span>{trip.name}</span>
                        <Badge variant={trip.status === "Published" ? "default" : "secondary"}>{trip.status}</Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Time Range</label>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                  <SelectItem value="1y">Last year</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button variant="outline" className="w-full bg-transparent">
                Export Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <div className="flex items-center mt-1">
                    {stat.trend === "up" ? (
                      <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
                    )}
                    <span className={`text-sm ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Performance Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={tripPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="views" stroke="#3B82F6" strokeWidth={2} name="Views" />
                <Line type="monotone" dataKey="clicks" stroke="#10B981" strokeWidth={2} name="Clicks" />
                <Line type="monotone" dataKey="queries" stroke="#F59E0B" strokeWidth={2} name="Queries" />
                <Line type="monotone" dataKey="bookings" stroke="#EF4444" strokeWidth={2} name="Bookings" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Demographics and Location */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>User Demographics</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="age" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="age">Age Groups</TabsTrigger>
                <TabsTrigger value="gender">Gender</TabsTrigger>
              </TabsList>
              <TabsContent value="age">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={demographicsData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {demographicsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-wrap gap-4 mt-4">
                  {demographicsData.map((item) => (
                    <div key={item.name} className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm">
                        {item.name}: {item.value}%
                      </span>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="gender">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={genderData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {genderData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-wrap gap-4 mt-4">
                  {genderData.map((item) => (
                    <div key={item.name} className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm">
                        {item.name}: {item.value}%
                      </span>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Locations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {locationData.map((location, index) => (
                <div key={location.city} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold">
                      {index + 1}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span className="font-medium">{location.city}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">{location.views} views</p>
                    <p className="text-sm font-semibold text-green-600">{location.bookings} bookings</p>
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
