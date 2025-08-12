"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Settings, User, Bell, Shield } from "lucide-react"

export function AdminSettings() {
  const [profileData, setProfileData] = useState({
    name: "Admin User",
    email: "admin@ragir.com",
    phone: "+91 98765 43210",
    role: "Super Admin",
    avatar: "/placeholder.svg?height=80&width=80",
  })

  const [platformSettings, setPlatformSettings] = useState({
    siteName: "Ragir",
    siteDescription: "Find Groups and Solo escapes based on your moods",
    maintenanceMode: false,
    userRegistration: true,
    organizerRegistration: true,
    autoApproveTrips: false,
    emailNotifications: true,
    smsNotifications: false,
  })

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    sessionTimeout: "24",
    passwordPolicy: "strong",
    loginAttempts: "5",
  })

  const handleSaveProfile = () => {
    console.log("Save profile:", profileData)
    // Implementation for saving profile
  }

  const handleSavePlatformSettings = () => {
    console.log("Save platform settings:", platformSettings)
    // Implementation for saving platform settings
  }

  const handleSaveSecuritySettings = () => {
    console.log("Save security settings:", securitySettings)
    // Implementation for saving security settings
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Settings</h1>
        <p className="text-gray-600 mt-2">Manage platform configuration and admin preferences</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="platform">Platform</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Admin Profile</span>
              </CardTitle>
              <CardDescription>Manage your admin account information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-6">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={profileData.avatar || "/placeholder.svg"} alt={profileData.name} />
                  <AvatarFallback>{profileData.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline">Change Avatar</Button>
                  <p className="text-sm text-gray-600 mt-1">JPG, PNG or GIF. Max size 2MB.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="role">Role</Label>
                  <Select
                    value={profileData.role}
                    onValueChange={(value) => setProfileData({ ...profileData, role: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Super Admin">Super Admin</SelectItem>
                      <SelectItem value="Admin">Admin</SelectItem>
                      <SelectItem value="Moderator">Moderator</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={handleSaveProfile}>Save Profile Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="platform" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <span>Platform Settings</span>
              </CardTitle>
              <CardDescription>Configure platform-wide settings and features</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    value={platformSettings.siteName}
                    onChange={(e) => setPlatformSettings({ ...platformSettings, siteName: e.target.value })}
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="siteDescription">Site Description</Label>
                  <Textarea
                    id="siteDescription"
                    value={platformSettings.siteDescription}
                    onChange={(e) => setPlatformSettings({ ...platformSettings, siteDescription: e.target.value })}
                    rows={2}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Maintenance Mode</Label>
                    <p className="text-sm text-gray-600">Temporarily disable the platform for maintenance</p>
                  </div>
                  <Switch
                    checked={platformSettings.maintenanceMode}
                    onCheckedChange={(checked) =>
                      setPlatformSettings({ ...platformSettings, maintenanceMode: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>User Registration</Label>
                    <p className="text-sm text-gray-600">Allow new users to register on the platform</p>
                  </div>
                  <Switch
                    checked={platformSettings.userRegistration}
                    onCheckedChange={(checked) =>
                      setPlatformSettings({ ...platformSettings, userRegistration: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Organizer Registration</Label>
                    <p className="text-sm text-gray-600">Allow new organizers to apply for registration</p>
                  </div>
                  <Switch
                    checked={platformSettings.organizerRegistration}
                    onCheckedChange={(checked) =>
                      setPlatformSettings({ ...platformSettings, organizerRegistration: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto-approve Trips</Label>
                    <p className="text-sm text-gray-600">Automatically approve new trip submissions</p>
                  </div>
                  <Switch
                    checked={platformSettings.autoApproveTrips}
                    onCheckedChange={(checked) =>
                      setPlatformSettings({ ...platformSettings, autoApproveTrips: checked })
                    }
                  />
                </div>
              </div>

              <Button onClick={handleSavePlatformSettings}>Save Platform Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Security Settings</span>
              </CardTitle>
              <CardDescription>Configure security and access control settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-sm text-gray-600">Require 2FA for admin accounts</p>
                </div>
                <Switch
                  checked={securitySettings.twoFactorAuth}
                  onCheckedChange={(checked) => setSecuritySettings({ ...securitySettings, twoFactorAuth: checked })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="sessionTimeout">Session Timeout (hours)</Label>
                  <Select
                    value={securitySettings.sessionTimeout}
                    onValueChange={(value) => setSecuritySettings({ ...securitySettings, sessionTimeout: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 hour</SelectItem>
                      <SelectItem value="8">8 hours</SelectItem>
                      <SelectItem value="24">24 hours</SelectItem>
                      <SelectItem value="168">1 week</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="passwordPolicy">Password Policy</Label>
                  <Select
                    value={securitySettings.passwordPolicy}
                    onValueChange={(value) => setSecuritySettings({ ...securitySettings, passwordPolicy: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Basic (8+ characters)</SelectItem>
                      <SelectItem value="strong">Strong (8+ chars, mixed case, numbers)</SelectItem>
                      <SelectItem value="very_strong">Very Strong (12+ chars, symbols)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="loginAttempts">Max Login Attempts</Label>
                  <Select
                    value={securitySettings.loginAttempts}
                    onValueChange={(value) => setSecuritySettings({ ...securitySettings, loginAttempts: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 attempts</SelectItem>
                      <SelectItem value="5">5 attempts</SelectItem>
                      <SelectItem value="10">10 attempts</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={handleSaveSecuritySettings}>Save Security Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Notification Settings</span>
              </CardTitle>
              <CardDescription>Configure notification preferences and channels</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-gray-600">Receive notifications via email</p>
                  </div>
                  <Switch
                    checked={platformSettings.emailNotifications}
                    onCheckedChange={(checked) =>
                      setPlatformSettings({ ...platformSettings, emailNotifications: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>SMS Notifications</Label>
                    <p className="text-sm text-gray-600">Receive notifications via SMS</p>
                  </div>
                  <Switch
                    checked={platformSettings.smsNotifications}
                    onCheckedChange={(checked) =>
                      setPlatformSettings({ ...platformSettings, smsNotifications: checked })
                    }
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Notification Types</h4>
                <div className="space-y-3">
                  {[
                    "New user registrations",
                    "New organizer applications",
                    "Trip submissions",
                    "Support tickets",
                    "Payment issues",
                    "System alerts",
                  ].map((type, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input type="checkbox" id={`notif-${index}`} defaultChecked className="rounded" />
                      <Label htmlFor={`notif-${index}`} className="text-sm">
                        {type}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <Button>Save Notification Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
