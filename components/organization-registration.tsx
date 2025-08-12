"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Upload, CheckCircle, MapPin, Users, Award, Globe } from "lucide-react"

export function OrganizationRegistration() {
  const searchParams = useSearchParams()
  const inviteToken = searchParams.get("token")
  const inviteEmail = searchParams.get("email")

  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Basic Information
    organizationName: "",
    displayName: "",
    tagline: "",
    description: "",

    // Contact Information
    email: inviteEmail || "",
    phone: "",
    website: "",
    address: "",
    city: "",
    state: "",
    country: "",

    // Business Information
    businessType: "",
    yearsInBusiness: "",
    teamSize: "",
    specializations: [] as string[],

    // Social Media & Online Presence
    instagram: "",
    youtube: "",
    facebook: "",
    googleBusiness: "",

    // Certifications & Documents
    certifications: [] as File[],
    businessLicense: null as File | null,
    insuranceDoc: null as File | null,

    // Experience & Portfolio
    totalTripsOrganized: "",
    averageGroupSize: "",
    operatingRegions: [] as string[],
    sampleItineraries: [] as File[],
  })

  const steps = [
    { id: 1, title: "Basic Information", icon: Users },
    { id: 2, title: "Contact & Location", icon: MapPin },
    { id: 3, title: "Business Details", icon: Award },
    { id: 4, title: "Online Presence", icon: Globe },
    { id: 5, title: "Documents & Verification", icon: Upload },
  ]

  const specializations = [
    "Adventure Trekking",
    "Cultural Tours",
    "Wildlife Safari",
    "Beach Holidays",
    "Mountain Expeditions",
    "Spiritual Journeys",
    "Photography Tours",
    "Food Tours",
    "Motorcycle Tours",
    "Camping & Glamping",
    "Wellness Retreats",
    "Family Trips",
  ]

  const operatingRegions = [
    "North India",
    "South India",
    "East India",
    "West India",
    "Central India",
    "Northeast India",
    "Himalayas",
    "Western Ghats",
    "Coastal Regions",
    "International - Southeast Asia",
    "International - Europe",
    "International - Other",
  ]

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleArrayToggle = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field as keyof typeof prev].includes(value)
        ? (prev[field as keyof typeof prev] as string[]).filter((item) => item !== value)
        : [...(prev[field as keyof typeof prev] as string[]), value],
    }))
  }

  const handleFileUpload = (field: string, files: FileList | null) => {
    if (files) {
      if (field === "certifications" || field === "sampleItineraries") {
        handleInputChange(field, Array.from(files))
      } else {
        handleInputChange(field, files[0])
      }
    }
  }

  const handleSubmit = async () => {
    console.log("Submitting registration:", formData)
    // Here you would typically send the data to your API
    alert("Registration submitted successfully! We will review your application and get back to you soon.")
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="organizationName">Organization Name *</Label>
                <Input
                  id="organizationName"
                  value={formData.organizationName}
                  onChange={(e) => handleInputChange("organizationName", e.target.value)}
                  placeholder="Enter your organization name"
                />
              </div>
              <div>
                <Label htmlFor="displayName">Display Name</Label>
                <Input
                  id="displayName"
                  value={formData.displayName}
                  onChange={(e) => handleInputChange("displayName", e.target.value)}
                  placeholder="How should we display your name?"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="tagline">Tagline</Label>
              <Input
                id="tagline"
                value={formData.tagline}
                onChange={(e) => handleInputChange("tagline", e.target.value)}
                placeholder="e.g., Leading treks in the Himalayas since 2015"
              />
            </div>

            <div>
              <Label htmlFor="description">About Your Organization *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Tell us about your organization, mission, team, and what makes you unique..."
                rows={4}
              />
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="contact@yourorganization.com"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="website">Website URL</Label>
              <Input
                id="website"
                value={formData.website}
                onChange={(e) => handleInputChange("website", e.target.value)}
                placeholder="https://www.yourorganization.com"
              />
            </div>

            <div>
              <Label htmlFor="address">Business Address *</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                placeholder="Enter your complete business address"
                rows={2}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  placeholder="City"
                />
              </div>
              <div>
                <Label htmlFor="state">State *</Label>
                <Input
                  id="state"
                  value={formData.state}
                  onChange={(e) => handleInputChange("state", e.target.value)}
                  placeholder="State"
                />
              </div>
              <div>
                <Label htmlFor="country">Country *</Label>
                <Input
                  id="country"
                  value={formData.country}
                  onChange={(e) => handleInputChange("country", e.target.value)}
                  placeholder="Country"
                />
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="businessType">Business Type *</Label>
                <Input
                  id="businessType"
                  value={formData.businessType}
                  onChange={(e) => handleInputChange("businessType", e.target.value)}
                  placeholder="e.g., Private Limited, Partnership"
                />
              </div>
              <div>
                <Label htmlFor="yearsInBusiness">Years in Business *</Label>
                <Input
                  id="yearsInBusiness"
                  type="number"
                  value={formData.yearsInBusiness}
                  onChange={(e) => handleInputChange("yearsInBusiness", e.target.value)}
                  placeholder="5"
                />
              </div>
              <div>
                <Label htmlFor="teamSize">Team Size *</Label>
                <Input
                  id="teamSize"
                  type="number"
                  value={formData.teamSize}
                  onChange={(e) => handleInputChange("teamSize", e.target.value)}
                  placeholder="10"
                />
              </div>
            </div>

            <div>
              <Label>Specializations *</Label>
              <p className="text-sm text-gray-600 mb-3">Select all that apply to your organization</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {specializations.map((spec) => (
                  <Badge
                    key={spec}
                    variant={formData.specializations.includes(spec) ? "default" : "outline"}
                    className="cursor-pointer justify-center p-2"
                    onClick={() => handleArrayToggle("specializations", spec)}
                  >
                    {spec}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="totalTripsOrganized">Total Trips Organized</Label>
                <Input
                  id="totalTripsOrganized"
                  type="number"
                  value={formData.totalTripsOrganized}
                  onChange={(e) => handleInputChange("totalTripsOrganized", e.target.value)}
                  placeholder="100"
                />
              </div>
              <div>
                <Label htmlFor="averageGroupSize">Average Group Size</Label>
                <Input
                  id="averageGroupSize"
                  value={formData.averageGroupSize}
                  onChange={(e) => handleInputChange("averageGroupSize", e.target.value)}
                  placeholder="8-12 people"
                />
              </div>
            </div>

            <div>
              <Label>Operating Regions *</Label>
              <p className="text-sm text-gray-600 mb-3">Select regions where you operate</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {operatingRegions.map((region) => (
                  <Badge
                    key={region}
                    variant={formData.operatingRegions.includes(region) ? "default" : "outline"}
                    className="cursor-pointer justify-center p-2"
                    onClick={() => handleArrayToggle("operatingRegions", region)}
                  >
                    {region}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="instagram">Instagram Handle</Label>
                <Input
                  id="instagram"
                  value={formData.instagram}
                  onChange={(e) => handleInputChange("instagram", e.target.value)}
                  placeholder="@yourorganization"
                />
              </div>
              <div>
                <Label htmlFor="youtube">YouTube Channel</Label>
                <Input
                  id="youtube"
                  value={formData.youtube}
                  onChange={(e) => handleInputChange("youtube", e.target.value)}
                  placeholder="https://youtube.com/@yourorganization"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="facebook">Facebook Page</Label>
                <Input
                  id="facebook"
                  value={formData.facebook}
                  onChange={(e) => handleInputChange("facebook", e.target.value)}
                  placeholder="https://facebook.com/yourorganization"
                />
              </div>
              <div>
                <Label htmlFor="googleBusiness">Google Business Profile</Label>
                <Input
                  id="googleBusiness"
                  value={formData.googleBusiness}
                  onChange={(e) => handleInputChange("googleBusiness", e.target.value)}
                  placeholder="Google Business URL"
                />
              </div>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="businessLicense">Business License *</Label>
                <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-4">
                  <input
                    type="file"
                    id="businessLicense"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload("businessLicense", e.target.files)}
                    className="hidden"
                  />
                  <label htmlFor="businessLicense" className="cursor-pointer flex flex-col items-center">
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600">Upload Business License</span>
                    <span className="text-xs text-gray-400">PDF, JPG, PNG (Max 5MB)</span>
                  </label>
                  {formData.businessLicense && (
                    <p className="text-sm text-green-600 mt-2 flex items-center">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      {formData.businessLicense.name}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="insuranceDoc">Insurance Document</Label>
                <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-4">
                  <input
                    type="file"
                    id="insuranceDoc"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload("insuranceDoc", e.target.files)}
                    className="hidden"
                  />
                  <label htmlFor="insuranceDoc" className="cursor-pointer flex flex-col items-center">
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600">Upload Insurance Document</span>
                    <span className="text-xs text-gray-400">PDF, JPG, PNG (Max 5MB)</span>
                  </label>
                  {formData.insuranceDoc && (
                    <p className="text-sm text-green-600 mt-2 flex items-center">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      {formData.insuranceDoc.name}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="certifications">Certifications & Affiliations</Label>
              <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-4">
                <input
                  type="file"
                  id="certifications"
                  accept=".pdf,.jpg,.jpeg,.png"
                  multiple
                  onChange={(e) => handleFileUpload("certifications", e.target.files)}
                  className="hidden"
                />
                <label htmlFor="certifications" className="cursor-pointer flex flex-col items-center">
                  <Upload className="h-8 w-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-600">Upload Certifications</span>
                  <span className="text-xs text-gray-400">Multiple files allowed - PDF, JPG, PNG</span>
                </label>
                {formData.certifications.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {formData.certifications.map((file, index) => (
                      <p key={index} className="text-sm text-green-600 flex items-center">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        {file.name}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="sampleItineraries">Sample Itineraries (Optional)</Label>
              <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-4">
                <input
                  type="file"
                  id="sampleItineraries"
                  accept=".pdf,.doc,.docx"
                  multiple
                  onChange={(e) => handleFileUpload("sampleItineraries", e.target.files)}
                  className="hidden"
                />
                <label htmlFor="sampleItineraries" className="cursor-pointer flex flex-col items-center">
                  <Upload className="h-8 w-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-600">Upload Sample Itineraries</span>
                  <span className="text-xs text-gray-400">PDF, DOC, DOCX files</span>
                </label>
                {formData.sampleItineraries.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {formData.sampleItineraries.map((file, index) => (
                      <p key={index} className="text-sm text-green-600 flex items-center">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        {file.name}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <Card className="bg-white shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">Organization Registration</CardTitle>
            <CardDescription>
              {inviteToken
                ? "Complete your registration using the invitation link"
                : "Register your organization to join Ragir"}
            </CardDescription>
          </div>
          {inviteToken && (
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <CheckCircle className="h-4 w-4 mr-1" />
              Invited
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between mt-6">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  currentStep >= step.id ? "bg-blue-600 border-blue-600 text-white" : "border-gray-300 text-gray-400"
                }`}
              >
                <step.icon className="h-5 w-5" />
              </div>
              <div className="ml-2 hidden md:block">
                <p className={`text-sm font-medium ${currentStep >= step.id ? "text-blue-600" : "text-gray-400"}`}>
                  {step.title}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-8 h-0.5 mx-4 ${currentStep > step.id ? "bg-blue-600" : "bg-gray-300"}`} />
              )}
            </div>
          ))}
        </div>
      </CardHeader>

      <CardContent>
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">{steps[currentStep - 1].title}</h3>
          {renderStep()}
        </div>

        <Separator className="my-6" />

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
            disabled={currentStep === 1}
          >
            Previous
          </Button>

          {currentStep < steps.length ? (
            <Button onClick={() => setCurrentStep((prev) => Math.min(steps.length, prev + 1))}>Next</Button>
          ) : (
            <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700">
              Submit Registration
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
