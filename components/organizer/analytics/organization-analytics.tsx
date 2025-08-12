"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Area,
  AreaChart,
} from "recharts"
import { Trophy, Calendar, Users, Star, Award, Target } from "lucide-react"

// Mock data
const popularityTrendData = [
  { month: "Jan", score: 650, rank: 15 },
  { month: "Feb", score: 720, rank: 12 },
  { month: "Mar", score: 680, rank: 14 },
  { month: "Apr", score: 850, rank: 8 },
  { month: "May", score: 920, rank: 6 },
  { month: "Jun", score: 1050, rank: 4 },
  { month: "Jul", score: 1180, rank: 3 },
]

const tripRankingData = [
  { name: "Himalayan Winter Trek", score: 1250, bookings: 23, rank: 1 },
  { name: "Goa Beach Adventure", score: 980, bookings: 18, rank: 2 },
  { name: "Kerala Backwaters", score: 850, bookings: 15, rank: 3 },
  { name: "Rajasthan Desert Safari", score: 720, bookings: 12, rank: 4 },
  { name: "Manali Adventure", score: 650, bookings: 10, rank: 5 },
]

const monthlyPerformanceData = [
  { month: "Jan", bookings: 45, revenue: 675000, trips: 8 },
  { month: "Feb", bookings: 52, revenue: 780000, trips: 9 },
  { month: "Mar", bookings: 38, revenue: 570000, trips: 7 },
  { month: "Apr", bookings: 67, revenue: 1005000, trips: 12 },
  { month: "May", bookings: 71, revenue: 1065000, trips: 13 },
  { month: "Jun", bookings: 89, revenue: 1335000, trips: 15 },
]

const regionPopularity = [
  { region: "North India", percentage: 35, color: "#3B82F6" },
  { region: "South India", percentage: 28, color: "#10B981" },
  { region: "West India", percentage: 22, color: "#F59E0B" },
  { region: "East India", percentage: 15, color: "#EF4444" },
]

export function OrganizationAnalytics() {
  const [timeRange, setTimeRange] = useState("1y")
  const [category, setCategory] = useState("overall")

  const stats = [
    {
      title: "Popularity Rank",
      value: "#3",
      change: "↑ +2 ranks",
      trend: "up",
      icon: Trophy,
      color: "text-yellow-600",
    },
    {
      title: "Total Trips",
      value: "47",
      change: "+8 this month",
      trend: "up",
      icon: Calendar,
      color: "text-blue-600",
    },
    {
      title: "Total Bookings",
      value: "362",
      change: "+23 this month",
      trend: "up",
      icon: Users,
      color: "text-green-600",
    },
    {
      title: "Average Rating",
      value: "4.8",
      change: "+0.2 this month",
      trend: "up",
      icon: Star,
      color: "text-purple-600",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Organization Analytics</h1>
          <p className="text-gray-600 mt-1">Track your overall performance and market position</p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Time Range</label>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                  <SelectItem value="1y">Last year</SelectItem>
                  <SelectItem value="all">All time</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="overall">Overall</SelectItem>
                  <SelectItem value="age-18-25">Age 18-25</SelectItem>
                  <SelectItem value="age-25-35">Age 25-35</SelectItem>
                  <SelectItem value="age-35+">Age 35+</SelectItem>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
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
                  <p className="text-sm text-green-600 mt-1">{stat.change}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Popularity Trend and Ranking */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Popularity Score & Ranking</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={popularityTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Bar yAxisId="left" dataKey="score" fill="#3B82F6" name="Popularity Score" />
                  <Line yAxisId="right" type="monotone" dataKey="rank" stroke="#EF4444" strokeWidth={2} name="Rank" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Performing Trips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tripRankingData.map((trip, index) => (
                <div key={trip.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold">
                      {trip.rank}
                    </div>
                    <div>
                      <p className="font-medium">{trip.name}</p>
                      <p className="text-sm text-gray-600">{trip.bookings} bookings</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">{trip.score}</p>
                    <p className="text-xs text-gray-500">score</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="bookings" stackId="1" stroke="#3B82F6" fill="#3B82F6" name="Bookings" />
                <Area type="monotone" dataKey="trips" stackId="1" stroke="#10B981" fill="#10B981" name="Trips" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Demographics and Regional Popularity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Regional Popularity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {regionPopularity.map((region) => (
                <div key={region.region} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">{region.region}</span>
                    <span className="text-sm text-gray-600">{region.percentage}%</span>
                  </div>
                  <Progress value={region.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Key Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                <Award className="h-8 w-8 text-yellow-600" />
                <div>
                  <p className="font-medium">Top 3 Organizer</p>
                  <p className="text-sm text-gray-600">Ranked #3 in North India region</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <Target className="h-8 w-8 text-green-600" />
                <div>
                  <p className="font-medium">High Conversion Rate</p>
                  <p className="text-sm text-gray-600">15% above industry average</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <Star className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="font-medium">Excellent Ratings</p>
                  <p className="text-sm text-gray-600">4.8/5 average customer rating</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
