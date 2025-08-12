import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Building2, Clock, CheckCircle, XCircle, Users, TrendingUp } from "lucide-react"
import Link from "next/link"

// Mock data for organization overview
const organizationStats = {
  pending: 12,
  active: 156,
  rejected: 8,
  totalApplications: 176,
  monthlyGrowth: 15.2,
  averageApprovalTime: 3.2,
}

const recentApplications = [
  {
    id: 1,
    name: "Mountain Adventures Co.",
    submittedDate: "2024-01-15",
    status: "pending",
    location: "Himachal Pradesh",
  },
  {
    id: 2,
    name: "Coastal Expeditions",
    submittedDate: "2024-01-14",
    status: "pending",
    location: "Goa",
  },
  {
    id: 3,
    name: "Desert Wanderers",
    submittedDate: "2024-01-13",
    status: "approved",
    location: "Rajasthan",
  },
]

export default function OrganizationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Organizations Management</h1>
        <p className="text-muted-foreground">Manage tour organizer applications and active partners</p>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Applications</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{organizationStats.pending}</div>
            <p className="text-xs text-muted-foreground">Awaiting review</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Organizations</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{organizationStats.active}</div>
            <p className="text-xs text-muted-foreground">Currently operating</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Growth</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">+{organizationStats.monthlyGrowth}%</div>
            <p className="text-xs text-muted-foreground">New applications</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Approval Time</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{organizationStats.averageApprovalTime} days</div>
            <p className="text-xs text-muted-foreground">Processing time</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="hover:shadow-md transition-shadow border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              Invite Organization
            </CardTitle>
            <CardDescription>Manually onboard new tour organizers to the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/admin/organizations/invite">Send Invitation</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-orange-600" />
              Pending Applications
            </CardTitle>
            <CardDescription>Review and approve new organization applications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                {organizationStats.pending} pending
              </Badge>
              <Button asChild>
                <Link href="/admin/organizations/pending">Review Applications</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-green-600" />
              Active Organizations
            </CardTitle>
            <CardDescription>Manage existing tour organizer partners</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                {organizationStats.active} active
              </Badge>
              <Button asChild variant="outline">
                <Link href="/admin/organizations/active">Manage Partners</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <XCircle className="h-5 w-5 text-red-600" />
              Rejected Applications
            </CardTitle>
            <CardDescription>View previously rejected applications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="bg-red-100 text-red-800">
                {organizationStats.rejected} rejected
              </Badge>
              <Button asChild variant="outline">
                <Link href="/admin/organizations/rejected">View Rejected</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Applications */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Applications</CardTitle>
          <CardDescription>Latest organization applications submitted for review</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentApplications.map((application) => (
              <div key={application.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">{application.name}</p>
                    <p className="text-sm text-muted-foreground">{application.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Submitted</p>
                    <p className="text-sm font-medium">{application.submittedDate}</p>
                  </div>
                  <Badge
                    variant={application.status === "pending" ? "secondary" : "default"}
                    className={
                      application.status === "pending" ? "bg-orange-100 text-orange-800" : "bg-green-100 text-green-800"
                    }
                  >
                    {application.status}
                  </Badge>
                  <Button size="sm" variant="outline" asChild>
                    <Link href={`/admin/organizations/${application.id}`}>View Details</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Button variant="outline" asChild>
              <Link href="/admin/organizations/pending">View All Applications</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
