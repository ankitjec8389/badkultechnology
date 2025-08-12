"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, Building2, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"

export function InviteOrganization() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [invitationSent, setInvitationSent] = useState(false)
  const [formData, setFormData] = useState({
    organizationName: "",
    contactPersonName: "",
    email: "",
    phone: "",
    website: "",
    location: "",
    businessType: "",
    specialization: "",
    experience: "",
    personalMessage: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setInvitationSent(true)
  }

  if (invitationSent) {
    return (
      <div className="text-center space-y-4 py-8">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">Invitation Sent Successfully!</h3>
          <p className="text-muted-foreground">
            An invitation email has been sent to {formData.email} with registration instructions.
          </p>
        </div>
        <div className="flex gap-2 justify-center">
          <Button onClick={() => setInvitationSent(false)} variant="outline">
            Send Another Invitation
          </Button>
          <Button onClick={() => router.push("/admin/organizations")}>Back to Organizations</Button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Organization Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Organization Information
          </CardTitle>
          <CardDescription>Basic details about the tour organizer</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="organizationName">Organization Name *</Label>
              <Input
                id="organizationName"
                value={formData.organizationName}
                onChange={(e) => handleInputChange("organizationName", e.target.value)}
                placeholder="e.g., Mountain Adventures Co."
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="businessType">Business Type</Label>
              <Select value={formData.businessType} onValueChange={(value) => handleInputChange("businessType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select business type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="travel-agency">Travel Agency</SelectItem>
                  <SelectItem value="tour-operator">Tour Operator</SelectItem>
                  <SelectItem value="adventure-company">Adventure Company</SelectItem>
                  <SelectItem value="individual-guide">Individual Guide</SelectItem>
                  <SelectItem value="hospitality">Hospitality Provider</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                placeholder="e.g., Manali, Himachal Pradesh"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="experience">Years of Experience</Label>
              <Select value={formData.experience} onValueChange={(value) => handleInputChange("experience", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select experience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-2">0-2 years</SelectItem>
                  <SelectItem value="3-5">3-5 years</SelectItem>
                  <SelectItem value="6-10">6-10 years</SelectItem>
                  <SelectItem value="10+">10+ years</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="specialization">Specialization</Label>
            <Input
              id="specialization"
              value={formData.specialization}
              onChange={(e) => handleInputChange("specialization", e.target.value)}
              placeholder="e.g., Himalayan Treks, Adventure Sports, Cultural Tours"
            />
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Contact Information
          </CardTitle>
          <CardDescription>Primary contact details for the organization</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="contactPersonName">Contact Person Name *</Label>
            <Input
              id="contactPersonName"
              value={formData.contactPersonName}
              onChange={(e) => handleInputChange("contactPersonName", e.target.value)}
              placeholder="e.g., Rajesh Kumar"
              required
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="contact@mountainadventures.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="+91 98765 43210"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">Website (Optional)</Label>
            <Input
              id="website"
              value={formData.website}
              onChange={(e) => handleInputChange("website", e.target.value)}
              placeholder="https://www.mountainadventures.com"
            />
          </div>
        </CardContent>
      </Card>

      {/* Personal Message */}
      <Card>
        <CardHeader>
          <CardTitle>Invitation Message</CardTitle>
          <CardDescription>Customize the invitation message (optional)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="personalMessage">Personal Message</Label>
            <Textarea
              id="personalMessage"
              value={formData.personalMessage}
              onChange={(e) => handleInputChange("personalMessage", e.target.value)}
              placeholder="Add a personal message to include in the invitation email..."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      {/* Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Invitation Preview</CardTitle>
          <CardDescription>This is how the invitation will appear</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-muted p-4 rounded-lg space-y-3">
            <div className="flex items-center gap-2">
              <Badge variant="secondary">Invitation Email</Badge>
            </div>
            <div>
              <p className="font-medium">Subject: Invitation to Join Ragir Platform</p>
              <p className="text-sm text-muted-foreground mt-2">
                Dear {formData.contactPersonName || "[Contact Person]"},
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                You have been invited to join Ragir as a tour organizer partner. We believe{" "}
                {formData.organizationName || "[Organization Name]"} would be a great addition to our platform.
              </p>
              {formData.personalMessage && (
                <p className="text-sm text-muted-foreground mt-2 italic">"{formData.personalMessage}"</p>
              )}
              <p className="text-sm text-muted-foreground mt-2">
                Click the link below to complete your registration...
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Submit */}
      <div className="flex gap-4">
        <Button type="submit" disabled={isSubmitting} className="flex-1">
          {isSubmitting ? "Sending Invitation..." : "Send Invitation"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin/organizations")}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
