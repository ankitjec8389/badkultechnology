"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Users, Calendar, TrendingUp, UserCheck, UserX } from "lucide-react"

// Mock data for user demographics
const userStats = {
  totalUsers: 15432,
  registeredUsers: 12845,
  guestUsers: 2587,
  activeUsers: 8765,
  newUsersThisMonth: 1234,
  returningUsers: 7531,
}

const ageGroupData = [
  { ageGroup: "18-24", users: 3500, percentage: 22.7, bookings: 1200 },
  { ageGroup: "25-34", users: 5200, percentage: 33.7, bookings: 2100 },
  { ageGroup: "35-44", users: 4100, percentage: 26.6, bookings: 1800 },
  { ageGroup: "45-54", users: 1800, percentage: 11.7, bookings: 650 },
  { ageGroup: "55+", users: 832, percentage: 5.4, bookings: 280 },
]

const genderData = [
  { name: "Male", value: 58, users: 8950, color: "#3B82F6" },
  { name: "Female", value: 39, users: 6018, color: "#EC4899" },
  { name: "Other", value: 3, users: 464, color: "#10B981" },
]

const geographicData = [
  { state: "Maharashtra", users: 2500, percentage: 16.2, cities: ["Mumbai", "Pune", "Nagpur"] },
  { state: "Karnataka", users: 2200, percentage: 14.3, cities: ["Bangalore", "Mysore", "Mangalore"] },
  { state: "Delhi", users: 1800, percentage: 11.7, cities: ["New Delhi", "Gurgaon", "Noida"] },
  { state: "Tamil Nadu", users: 1600, percentage: 10.4, cities: ["Chennai", "Coimbatore", "Madurai"] },
  { state: "Gujarat", users: 1400, percentage: 9.1, cities: ["Ahmedabad", "Surat", "Vadodara"] },
  { state: "West Bengal", users: 1200, percentage: 7.8, cities: ["Kolkata", "Siliguri", "Durgapur"] },
  { state: "Rajasthan", users: 1000, percentage: 6.5, cities: ["Jaipur", "Jodhpur", "Udaipur"] },
  { state: "Others", users: 3732, percentage: 24.2, cities: [] },
]

const userActivityData = [
  { month: "Jan", active: 6500, new: 800, returning: 5700 },
  { month: "Feb", active: 7200, new: 950, returning: 6250 },
  { month: "Mar", active: 7800, new: 1100, returning: 6700 },
  { month: "Apr", active: 8200, new: 1200, returning: 7000 },
  { month: "May", active: 8500, new: 1150, returning: 7350 },
  { month: "Jun", active: 8765, new: 1234, returning: 7531 },
]

const topCities = [
  { city: "Mumbai", state: "Maharashtra", users: 1200, bookings: 450 },
  { city: "Bangalore", state: "Karnataka", users: 1100, bookings: 420 },
  { city: "Delhi", state: "Delhi", users: 950, bookings: 380 },
  { city: "Pune", state: "Maharashtra", users: 800, bookings: 320 },
  { city: "Chennai", state: "Tamil Nadu", users: 750, bookings: 290 },
  { city: "Hyderabad", state: "Telangana", users: 680, bookings: 260 },
  { city: "Kolkata", state: "West Bengal", users: 620, bookings: 240 },
  { city: "Ahmedabad", state: "Gujarat", users: 580, bookings: 220 },
]

export function UserDemographics() {
  const [timeRange, setTimeRange] = useState("6months")
  const [viewType, setViewType] = useState("overview")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Demographics</h1>
          <p className="text-gray-600 mt-2">Detailed user analytics and demographic insights</p>
        </div>
        <div className="flex gap-2">
          <Select value={viewType} onValueChange={setViewType}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="View type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="overview">Overview</SelectItem>
              <SelectItem value="detailed">Detailed</SelectItem>
              <SelectItem value="trends">Trends</SelectItem>
            </SelectContent>
          </Select>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="3months">Last 3 months</SelectItem>
              <SelectItem value="6months">Last 6 months</SelectItem>
              <SelectItem value="1year">Last year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* User Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.totalUsers.toLocaleString()}</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />+{userStats.newUsersThisMonth} this month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Registered Users</CardTitle>
            <UserCheck className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.registeredUsers.toLocaleString()}</div>
            <div className="text-xs text-gray-600">
              {((userStats.registeredUsers / userStats.totalUsers) * 100).toFixed(1)}% of total
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Calendar className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.activeUsers.toLocaleString()}</div>
            <div className="text-xs text-gray-600">
              {((userStats.activeUsers / userStats.totalUsers) * 100).toFixed(1)}% engagement rate
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Guest Users</CardTitle>
            <UserX className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.guestUsers.toLocaleString()}</div>
            <div className="text-xs text-gray-600">
              {((userStats.guestUsers / userStats.totalUsers) * 100).toFixed(1)}% unregistered
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Demographics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Age Distribution</CardTitle>
            <CardDescription>User distribution by age groups</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ageGroupData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="ageGroup" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="users" fill="#3B82F6" name="Users" />
                <Bar dataKey="bookings" fill="#10B981" name="Bookings" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Gender Distribution</CardTitle>
            <CardDescription>User distribution by gender</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <ResponsiveContainer width="60%" height={200}>
                <PieChart>
                  <Pie
                    data={genderData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {genderData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-3">
                {genderData.map((gender, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: gender.color }}></div>
                    <div>
                      <p className="font-medium text-sm">{gender.name}</p>
                      <p className="text-xs text-gray-500">{gender.users.toLocaleString()} users</p>
                    </div>
                    <Badge variant="outline">{gender.value}%</Badge>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User Activity Trends */}
      <Card>
        <CardHeader>
          <CardTitle>User Activity Trends</CardTitle>
          <CardDescription>Monthly active, new, and returning users</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={userActivityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="active"
                stackId="1"
                stroke="#3B82F6"
                fill="#3B82F6"
                fillOpacity={0.6}
                name="Active Users"
              />
              <Area
                type="monotone"
                dataKey="new"
                stackId="2"
                stroke="#10B981"
                fill="#10B981"
                fillOpacity={0.6}
                name="New Users"
              />
              <Area
                type="monotone"
                dataKey="returning"
                stackId="3"
                stroke="#F59E0B"
                fill="#F59E0B"
                fillOpacity={0.6}
                name="Returning Users"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Geographic Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Geographic Distribution by State</CardTitle>
            <CardDescription>User distribution across Indian states</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {geographicData.slice(0, 7).map((state, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                      <span className="text-sm font-bold text-blue-600">#{index + 1}</span>
                    </div>
                    <div>
                      <h4 className="font-medium">{state.state}</h4>
                      <p className="text-sm text-gray-600">{state.users.toLocaleString()} users</p>
                    </div>
                  </div>
                  <Badge variant="outline">{state.percentage}%</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Cities</CardTitle>
            <CardDescription>Most active cities by user count</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topCities.map((city, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full">
                      <span className="text-sm font-bold text-green-600">#{index + 1}</span>
                    </div>
                    <div>
                      <h4 className="font-medium">{city.city}</h4>
                      <p className="text-sm text-gray-600">
                        {city.state} • {city.users.toLocaleString()} users
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{city.bookings}</p>
                    <p className="text-xs text-gray-600">bookings</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Age Group Details */}
      <Card>
        <CardHeader>
          <CardTitle>Age Group Analysis</CardTitle>
          <CardDescription>Detailed breakdown of user age groups and their booking behavior</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {ageGroupData.map((group, index) => (
              <div key={index} className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{group.users.toLocaleString()}</div>
                <div className="text-sm font-medium">{group.ageGroup} years</div>
                <div className="text-xs text-gray-600 mt-1">{group.percentage}% of users</div>
                <div className="text-xs text-green-600 mt-1">{group.bookings} bookings</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
