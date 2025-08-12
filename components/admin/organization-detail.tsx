"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { CheckCircle, XCircle, Download, ExternalLink, MapPin, Phone, Mail, Star, FileText } from "lucide-react"

interface OrganizationDetailProps {
  organizationId: string
}

// Mock data for organization detail
const organizationData = {
  id: "1",
  name: "Mountain Adventures Co.",
  tagline: "Leading treks in the Himalayas since 2015",
  type: "Trekking & Adventure",
  location: "Manali, Himachal Pradesh",
  submittedDate: "2024-01-15",
  status: "pending",
  priority: "high",
  logo: "/placeholder.svg?height=80&width=80",
  coverImage: "/placeholder.svg?height=200&width=400",

  // Contact Information
  contactPerson: "Rajesh Kumar",
  email: "rajesh@mountainadventures.com",
  phone: "+91 98765 43210",
  website: "https://mountainadventures.com",
  address: "123 Mountain View Road, Manali, Himachal Pradesh 175131",

  // Business Information
  businessLicense: "HP/BL/2015/001234",
  gstNumber: "02ABCDE1234F1Z5",
  panNumber: "ABCDE1234F",
  experience: "8 years",
  totalTrips: 150,
  avgRating: 4.7,

  // Social Media
  instagram: "@mountainadventures",
  youtube: "Mountain Adventures Co",

  // Documents
  documents: [
    {
      name: "Business License",
      type: "PDF",
      size: "2.3 MB",
      uploadDate: "2024-01-15",
      status: "verified",
      url: "#",
    },
    {
      name: "Insurance Certificate",
      type: "PDF",
      size: "1.8 MB",
      uploadDate: "2024-01-15",
      status: "pending",
      url: "#",
    },
    {
      name: "Trek Leader Certification",
      type: "PDF",
      size: "3.1 MB",
      uploadDate: "2024-01-15",
      status: "verified",
      url: "#",
    },
    {
      name: "GST Certificate",
      type: "PDF",
      size: "1.2 MB",
      uploadDate: "2024-01-15",
      status: "pending",
      url: "#",
    },
  ],

  // Description
  description: `Mountain Adventures Co. has been organizing premium trekking experiences in the Himalayas since 2015. We specialize in high-altitude treks, mountaineering expeditions, and adventure sports. Our team of certified guides ensures safe and memorable experiences for all skill levels.

Our expertise includes:
- High-altitude trekking (up to 6000m)
- Rock climbing and mountaineering
- Adventure photography tours
- Corporate team building programs
- Customized expedition planning

We are committed to sustainable tourism and work closely with local communities to ensure responsible travel practices.`,

  // Team Leaders
  teamLeaders: [
    {
      name: "Rajesh Kumar",
      role: "Lead Guide & Founder",
      experience: "12 years",
      certifications: ["Advanced Mountaineering", "Wilderness First Aid"],
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Priya Sharma",
      role: "Senior Trek Leader",
      experience: "8 years",
      certifications: ["Basic Mountaineering", "Rock Climbing Instructor"],
      image: "/placeholder.svg?height=60&width=60",
    },
  ],
}

export function OrganizationDetail({ organizationId }: OrganizationDetailProps) {
  const [approvalNotes, setApprovalNotes] = useState("")
  const [rejectionReason, setRejectionReason] = useState("")

  const handleApprove = () => {
    console.log("Approve organization:", organizationId, "Notes:", approvalNotes)
    // Implementation for approval
  }

  const handleReject = () => {
    console.log("Reject organization:", organizationId, "Reason:", rejectionReason)
    // Implementation for rejection
  }

  const handleDocumentDownload = (docUrl: string, docName: string) => {
    console.log("Download document:", docName, docUrl)
    // Implementation for document download
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={organizationData.logo || "/placeholder.svg"} alt={organizationData.name} />
            <AvatarFallback>{organizationData.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{organizationData.name}</h1>
            <p className="text-gray-600">{organizationData.tagline}</p>
            <div className="flex items-center space-x-2 mt-2">
              <Badge variant={organizationData.priority === "high" ? "destructive" : "secondary"}>
                {organizationData.priority} priority
              </Badge>
              <Badge variant="outline">{organizationData.status}</Badge>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <Button onClick={handleApprove} className="bg-green-600 hover:bg-green-700">
            <CheckCircle className="h-4 w-4 mr-2" />
            Approve Application
          </Button>
          <Button variant="destructive" onClick={handleReject}>
            <XCircle className="h-4 w-4 mr-2" />
            Reject Application
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="review">Review</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Type</Label>
                    <p className="text-sm">{organizationData.type}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Experience</Label>
                    <p className="text-sm">{organizationData.experience}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Total Trips</Label>
                    <p className="text-sm">{organizationData.totalTrips}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Average Rating</Label>
                    <p className="text-sm flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      {organizationData.avgRating}/5.0
                    </p>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-500">Location</Label>
                  <p className="text-sm flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {organizationData.address}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">Contact Person</Label>
                  <p className="text-sm">{organizationData.contactPerson}</p>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-500">Email</Label>
                  <p className="text-sm flex items-center">
                    <Mail className="h-4 w-4 mr-1" />
                    {organizationData.email}
                  </p>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-500">Phone</Label>
                  <p className="text-sm flex items-center">
                    <Phone className="h-4 w-4 mr-1" />
                    {organizationData.phone}
                  </p>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-500">Website</Label>
                  <p className="text-sm flex items-center">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    <a
                      href={organizationData.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {organizationData.website}
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Business Details */}
          <Card>
            <CardHeader>
              <CardTitle>Business Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">Business License</Label>
                  <p className="text-sm">{organizationData.businessLicense}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">GST Number</Label>
                  <p className="text-sm">{organizationData.gstNumber}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">PAN Number</Label>
                  <p className="text-sm">{organizationData.panNumber}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>About the Organization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="whitespace-pre-line text-sm text-gray-700">{organizationData.description}</div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Submitted Documents</CardTitle>
              <CardDescription>Review all documents submitted by the organization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {organizationData.documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-8 w-8 text-blue-600" />
                      <div>
                        <h4 className="font-medium">{doc.name}</h4>
                        <p className="text-sm text-gray-600">
                          {doc.type} • {doc.size} • Uploaded {new Date(doc.uploadDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Badge variant={doc.status === "verified" ? "default" : "secondary"}>{doc.status}</Badge>
                      <Button size="sm" variant="outline" onClick={() => handleDocumentDownload(doc.url, doc.name)}>
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Team Leaders</CardTitle>
              <CardDescription>Review the organization's team and their qualifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {organizationData.teamLeaders.map((leader, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 border rounded-lg">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={leader.image || "/placeholder.svg"} alt={leader.name} />
                      <AvatarFallback>{leader.name.charAt(0)}</AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <h4 className="font-medium">{leader.name}</h4>
                      <p className="text-sm text-gray-600">{leader.role}</p>
                      <p className="text-sm text-gray-600">Experience: {leader.experience}</p>

                      <div className="mt-2">
                        <Label className="text-sm font-medium text-gray-500">Certifications</Label>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {leader.certifications.map((cert, certIndex) => (
                            <Badge key={certIndex} variant="outline" className="text-xs">
                              {cert}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="review" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Approval Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-green-700">Approve Application</CardTitle>
                <CardDescription>Add any notes for the approval</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="approval-notes">Approval Notes (Optional)</Label>
                  <Textarea
                    id="approval-notes"
                    placeholder="Add any notes or conditions for approval..."
                    value={approvalNotes}
                    onChange={(e) => setApprovalNotes(e.target.value)}
                    rows={4}
                  />
                </div>
                <Button onClick={handleApprove} className="w-full bg-green-600 hover:bg-green-700">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Approve Organization
                </Button>
              </CardContent>
            </Card>

            {/* Rejection Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-red-700">Reject Application</CardTitle>
                <CardDescription>Provide a reason for rejection</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="rejection-reason">Rejection Reason *</Label>
                  <Textarea
                    id="rejection-reason"
                    placeholder="Provide a clear reason for rejection..."
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    rows={4}
                    required
                  />
                </div>
                <Button
                  onClick={handleReject}
                  variant="destructive"
                  className="w-full"
                  disabled={!rejectionReason.trim()}
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject Application
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Review Checklist */}
          <Card>
            <CardHeader>
              <CardTitle>Review Checklist</CardTitle>
              <CardDescription>Ensure all requirements are met before making a decision</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  "Business license verified and valid",
                  "Insurance certificates provided and current",
                  "Team leader certifications verified",
                  "Contact information verified",
                  "Business registration documents complete",
                  "No red flags in background verification",
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
