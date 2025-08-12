import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Eye, MessageSquare, Plus, TrendingUp, Users, MapPin, Star } from "lucide-react"

// Mock data
const stats = [
  {
    title: "Total Trips",
    value: "24",
    change: "+3 this month",
    icon: Calendar,
    color: "text-blue-600",
  },
  {
    title: "Active Bookings",
    value: "156",
    change: "+12 this week",
    icon: Users,
    color: "text-green-600",
  },
  {
    title: "Total Views",
    value: "2,847",
    change: "+18% from last month",
    icon: Eye,
    color: "text-purple-600",
  },
  {
    title: "Pending Queries",
    value: "8",
    change: "3 urgent",
    icon: MessageSquare,
    color: "text-orange-600",
  },
]

const recentTrips = [
  {
    id: 1,
    title: "Himalayan Winter Trek",
    destination: "Himachal Pradesh",
    startDate: "2025-02-15",
    status: "Published",
    bookings: 12,
    maxCapacity: 15,
    rating: 4.8,
  },
  {
    id: 2,
    title: "Goa Beach Adventure",
    destination: "Goa",
    startDate: "2025-01-20",
    status: "Under Review",
    bookings: 8,
    maxCapacity: 20,
    rating: 4.6,
  },
  {
    id: 3,
    title: "Rajasthan Desert Safari",
    destination: "Rajasthan",
    startDate: "2025-03-10",
    status: "Published",
    bookings: 18,
    maxCapacity: 25,
    rating: 4.9,
  },
]

export function OrganizerDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your trips.</p>
        </div>
        <Button className="mt-4 sm:mt-0">
          <Plus className="mr-2 h-4 w-4" />
          Create New Trip
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-500 mt-1">{stat.change}</p>
                </div>
                <stat.icon className={cn("h-8 w-8", stat.color)} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Trips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Recent Trips
            <Button variant="outline" size="sm">
              View All
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTrips.map((trip) => (
              <div key={trip.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <h3 className="font-semibold text-gray-900">{trip.title}</h3>
                    <Badge variant={trip.status === "Published" ? "default" : "secondary"}>{trip.status}</Badge>
                  </div>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {trip.destination}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(trip.startDate).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {trip.bookings}/{trip.maxCapacity}
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-1 text-yellow-500" />
                      {trip.rating}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <TrendingUp className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">View Analytics</h3>
            <p className="text-sm text-gray-600">Check your trip performance and insights</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <MessageSquare className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Manage Queries</h3>
            <p className="text-sm text-gray-600">Respond to customer inquiries</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">View Leads</h3>
            <p className="text-sm text-gray-600">Follow up with potential customers</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
