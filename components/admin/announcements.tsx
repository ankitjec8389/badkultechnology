"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Edit, Trash2, Eye, Megaphone } from "lucide-react"

const mockAnnouncements = [
  {
    id: "1",
    title: "Platform Maintenance Scheduled",
    content: "We will be performing scheduled maintenance on January 20th from 2:00 AM to 4:00 AM IST.",
    type: "maintenance",
    status: "active",
    createdAt: "2024-01-15",
    expiresAt: "2024-01-21",
  },
  {
    id: "2",
    title: "New Features Released",
    content: "Check out our new trip comparison feature and enhanced search capabilities.",
    type: "feature",
    status: "active",
    createdAt: "2024-01-10",
    expiresAt: "2024-01-25",
  },
]

export function Announcements() {
  const [announcements, setAnnouncements] = useState(mockAnnouncements)
  const [isCreating, setIsCreating] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Announcements</h1>
          <p className="text-gray-600 mt-1">Manage platform-wide announcements and notifications</p>
        </div>
        <Button onClick={() => setIsCreating(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Announcement
        </Button>
      </div>

      {isCreating && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Announcement</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="Announcement title" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea id="content" placeholder="Announcement content" rows={4} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="feature">Feature</SelectItem>
                    <SelectItem value="general">General</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="expires">Expires At</Label>
                <Input id="expires" type="date" />
              </div>
            </div>
            <div className="flex space-x-2">
              <Button>Create Announcement</Button>
              <Button variant="outline" onClick={() => setIsCreating(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {announcements.map((announcement) => (
          <Card key={announcement.id}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <Megaphone className="h-5 w-5 text-blue-600" />
                    <h3 className="text-lg font-semibold">{announcement.title}</h3>
                    <Badge variant={announcement.status === "active" ? "default" : "secondary"}>
                      {announcement.status}
                    </Badge>
                    <Badge variant="outline">{announcement.type}</Badge>
                  </div>
                  <p className="text-gray-600 mb-3">{announcement.content}</p>
                  <div className="text-sm text-gray-500">
                    Created: {new Date(announcement.createdAt).toLocaleDateString()} | Expires:{" "}
                    {new Date(announcement.expiresAt).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
