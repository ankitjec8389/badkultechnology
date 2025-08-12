"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Eye, RotateCcw, MapPin, Calendar, AlertCircle } from "lucide-react"
import Link from "next/link"

// Mock data for rejected organizations
const rejectedOrganizations = [
  {
    id: "1",
    name: "Adventure Seekers Ltd.",
    type: "Adventure Sports",
    location: "Mumbai, Maharashtra",
    rejectedDate: "2024-01-10",
    rejectedBy: "Admin John",
    reason: "Incomplete documentation - Missing insurance certificates",
    contactPerson: "Priya Patel",
    email: "priya@adventureseekers.com",
    canReapply: true,
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "Quick Tours",
    type: "City Tours",
    location: "Bangalore, Karnataka",
    rejectedDate: "2024-01-08",
    rejectedBy: "Admin Sarah",
    reason: "Failed background verification - Fraudulent business license",
    contactPerson: "Ravi Kumar",
    email: "ravi@quicktours.in",
    canReapply: false,
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    name: "Mountain Escape",
    type: "Trekking",
    location: "Shimla, Himachal Pradesh",
    rejectedDate: "2024-01-05",
    rejectedBy: "Admin Mike",
    reason: "Insufficient experience - Less than required 2 years in business",
    contactPerson: "Neha Sharma",
    email: "neha@mountainescape.com",
    canReapply: true,
    logo: "/placeholder.svg?height=40&width=40",
  },
]

export function RejectedOrganizations() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredOrganizations = rejectedOrganizations.filter(
    (org) =>
      org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.reason.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAllowReapply = (id: string) => {
    console.log("Allow reapply for organization:", id)
    // Implementation for allowing reapplication
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Rejected Organizations</h1>
        <p className="text-gray-600 mt-2">View previously rejected organization applications</p>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search rejected organizations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Organizations List */}
      <div className="space-y-4">
        {filteredOrganizations.map((org) => (
          <Card key={org.id} className="hover:shadow-md transition-shadow border-red-200">
            <CardContent className="pt-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={org.logo || "/placeholder.svg"} alt={org.name} />
                    <AvatarFallback>{org.name.charAt(0)}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-lg font-semibold text-gray-900 truncate">{org.name}</h3>
                      <Badge variant="destructive">Rejected</Badge>
                      {org.canReapply && (
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          Can Reapply
                        </Badge>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-2">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{org.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>Rejected {new Date(org.rejectedDate).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-2">
                      <div className="flex items-start space-x-2">
                        <AlertCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-red-800">Rejection Reason:</p>
                          <p className="text-sm text-red-700">{org.reason}</p>
                          <p className="text-xs text-red-600 mt-1">Rejected by {org.rejectedBy}</p>
                        </div>
                      </div>
                    </div>

                    <div className="text-sm text-gray-600">
                      <p>
                        <strong>Contact:</strong> {org.contactPerson} • {org.email}
                      </p>
                      <p>
                        <strong>Type:</strong> {org.type}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 lg:flex-col xl:flex-row">
                  <Link href={`/admin/organizations/${org.id}`}>
                    <Button variant="outline" size="sm" className="w-full sm:w-auto bg-transparent">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </Link>
                  {org.canReapply && (
                    <Button
                      size="sm"
                      onClick={() => handleAllowReapply(org.id)}
                      className="w-full sm:w-auto bg-green-600 hover:bg-green-700"
                    >
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Allow Reapply
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredOrganizations.length === 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No rejected organizations found</h3>
              <p className="text-gray-600">Try adjusting your search criteria.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
