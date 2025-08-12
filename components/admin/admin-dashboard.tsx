import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Building2, Users, AlertTriangle, CheckCircle, Clock, MessageSquare, Flag } from "lucide-react"

export function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage organizations, users, and platform operations</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">12</div>
            <p className="text-xs text-gray-600">Organizations awaiting review</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Organizations</CardTitle>
            <Building2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">247</div>
            <p className="text-xs text-gray-600">+12 this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">15,432</div>
            <p className="text-xs text-gray-600">+1,234 this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
            <MessageSquare className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">8</div>
            <p className="text-xs text-gray-600">2 high priority</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Organization Applications</CardTitle>
            <CardDescription>Organizations waiting for approval</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                name: "Mountain Adventures Co.",
                type: "Trekking & Adventure",
                submitted: "2 hours ago",
                status: "pending",
              },
              {
                name: "Coastal Expeditions",
                type: "Beach & Water Sports",
                submitted: "5 hours ago",
                status: "under_review",
              },
              {
                name: "Heritage Walks India",
                type: "Cultural Tours",
                submitted: "1 day ago",
                status: "pending",
              },
            ].map((org, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">{org.name}</h4>
                  <p className="text-sm text-gray-600">{org.type}</p>
                  <p className="text-xs text-gray-500">Submitted {org.submitted}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={org.status === "pending" ? "secondary" : "outline"}>
                    {org.status === "pending" ? "Pending" : "Under Review"}
                  </Badge>
                  <Button size="sm">Review</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Content Moderation Queue</CardTitle>
            <CardDescription>Items requiring attention</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                type: "Trip Report",
                title: "Inappropriate content in trip description",
                reporter: "User #1234",
                priority: "high",
              },
              {
                type: "Review",
                title: "Spam review detected",
                reporter: "System",
                priority: "medium",
              },
              {
                type: "Organization",
                title: "Fake certification documents",
                reporter: "User #5678",
                priority: "high",
              },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="flex items-center space-x-2">
                    <Flag className="h-4 w-4 text-red-500" />
                    <h4 className="font-medium">{item.type}</h4>
                  </div>
                  <p className="text-sm text-gray-600">{item.title}</p>
                  <p className="text-xs text-gray-500">Reported by {item.reporter}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={item.priority === "high" ? "destructive" : "secondary"}>{item.priority}</Badge>
                  <Button size="sm" variant="outline">
                    Review
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle>System Status</CardTitle>
          <CardDescription>Current platform health and performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <p className="font-medium">API Status</p>
                <p className="text-sm text-gray-600">All systems operational</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <p className="font-medium">Database</p>
                <p className="text-sm text-gray-600">Response time: 45ms</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="font-medium">Email Service</p>
                <p className="text-sm text-gray-600">Minor delays detected</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
