"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  LineChart,
  Line,
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
import { TrendingUp, Users, Building2, Calendar, DollarSign } from "lucide-react"

// Mock data for platform analytics
const platformMetrics = {
  totalUsers: 15432,
  activeUsers: 8765,
  totalOrganizations: 247,
  totalTrips: 1245,
  totalBookings: 5678,
  totalRevenue: 12500000,
  conversionRate: 3.2,
  avgSessionDuration: 8.5,
}

const userGrowthData = [
  { month: "Jan", users: 1200, organizations: 15, bookings: 450 },
  { month: "Feb", users: 1800, organizations: 22, bookings: 680 },
  { month: "Mar", users: 2400, organizations: 28, bookings: 920 },
  { month: "Apr", users: 3200, organizations: 35, bookings: 1250 },
  { month: "May", users: 4100, organizations: 42, bookings: 1580 },
  { month: "Jun", users: 5200, organizations: 48, bookings: 1920 },
]

const revenueData = [
  { month: "Jan", revenue: 850000, bookings: 450, avgValue: 1889 },
  { month: "Feb", revenue: 1200000, bookings: 680, avgValue: 1765 },
  { month: "Mar", revenue: 1650000, bookings: 920, avgValue: 1793 },
  { month: "Apr", revenue: 2100000, bookings: 1250, avgValue: 1680 },
  { month: "May", revenue: 2800000, bookings: 1580, avgValue: 1772 },
  { month: "Jun", revenue: 3200000, bookings: 1920, avgValue: 1667 },
]

const deviceData = [
  { name: "Mobile", value: 65, color: "#3B82F6" },
  { name: "Desktop", value: 28, color: "#10B981" },
  { name: "Tablet", value: 7, color: "#F59E0B" },
]

const trafficSources = [
  { source: "Organic Search", users: 4500, percentage: 45 },
  { source: "Social Media", users: 2800, percentage: 28 },
  { source: "Direct", users: 1500, percentage: 15 },
  { source: "Referral", users: 800, percentage: 8 },
  { source: "Paid Ads", users: 400, percentage: 4 },
]

const topRegions = [
  { region: "Maharashtra", users: 2500, bookings: 890, revenue: 1800000 },
  { region: "Karnataka", users: 2200, bookings: 780, revenue: 1600000 },
  { region: "Delhi", users: 1800, bookings: 650, revenue: 1400000 },
  { region: "Tamil Nadu", users: 1600, bookings: 580, revenue: 1200000 },
  { region: "Gujarat", users: 1400, bookings: 520, revenue: 1100000 },
]

export function PlatformAnalytics() {
  const [timeRange, setTimeRange] = useState("6months")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Platform Analytics</h1>
          <p className="text-gray-600 mt-2">Comprehensive platform performance and insights</p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">Last 7 days</SelectItem>
            <SelectItem value="30days">Last 30 days</SelectItem>
            <SelectItem value="3months">Last 3 months</SelectItem>
            <SelectItem value="6months">Last 6 months</SelectItem>
            <SelectItem value="1year">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{platformMetrics.totalUsers.toLocaleString()}</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12.5% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Organizations</CardTitle>
            <Building2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{platformMetrics.totalOrganizations}</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +8.2% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{platformMetrics.totalBookings.toLocaleString()}</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +15.3% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{(platformMetrics.totalRevenue / 1000000).toFixed(1)}M</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +18.7% from last month
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>User Growth Trends</CardTitle>
            <CardDescription>Monthly user acquisition and organization onboarding</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="users" stroke="#3B82F6" strokeWidth={2} name="Users" />
                <Line type="monotone" dataKey="organizations" stroke="#10B981" strokeWidth={2} name="Organizations" />
                <Line type="monotone" dataKey="bookings" stroke="#F59E0B" strokeWidth={2} name="Bookings" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue Analytics</CardTitle>
            <CardDescription>Monthly revenue and booking value trends</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value, name) => [name === "revenue" ? `₹${value}` : value, name]} />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stackId="1"
                  stroke="#8B5CF6"
                  fill="#8B5CF6"
                  fillOpacity={0.6}
                  name="Revenue (₹)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Device Usage</CardTitle>
            <CardDescription>User device preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <ResponsiveContainer width="60%" height={200}>
                <PieChart>
                  <Pie
                    data={deviceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {deviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, "Usage"]} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2">
                {deviceData.map((device, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: device.color }}></div>
                    <span className="text-sm">{device.name}</span>
                    <Badge variant="outline">{device.value}%</Badge>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
            <CardDescription>User acquisition channels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trafficSources.map((source, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-8 bg-blue-600 rounded"></div>
                    <div>
                      <p className="font-medium text-sm">{source.source}</p>
                      <p className="text-xs text-gray-500">{source.users.toLocaleString()} users</p>
                    </div>
                  </div>
                  <Badge variant="outline">{source.percentage}%</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Regions */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Regions</CardTitle>
          <CardDescription>Regional performance metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topRegions.map((region, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                    <span className="text-sm font-bold text-blue-600">#{index + 1}</span>
                  </div>
                  <div>
                    <h4 className="font-medium">{region.region}</h4>
                    <p className="text-sm text-gray-600">{region.users.toLocaleString()} users</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">₹{(region.revenue / 100000).toFixed(1)}L</p>
                  <p className="text-sm text-gray-600">{region.bookings} bookings</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Health */}
      <Card>
        <CardHeader>
          <CardTitle>System Performance</CardTitle>
          <CardDescription>Platform health and performance metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">99.9%</div>
              <p className="text-sm text-gray-600">Uptime</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">1.2s</div>
              <p className="text-sm text-gray-600">Avg Response Time</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{platformMetrics.conversionRate}%</div>
              <p className="text-sm text-gray-600">Conversion Rate</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{platformMetrics.avgSessionDuration}m</div>
              <p className="text-sm text-gray-600">Avg Session Duration</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
