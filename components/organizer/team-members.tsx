"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Users, UserPlus, Mail, Calendar, Shield, Edit, Trash2, MoreHorizontal, Crown, User } from "lucide-react"

// Mock data
const teamMembers = [
  {
    id: 1,
    name: "Rajesh Kumar",
    email: "rajesh@adventuretours.com",
    role: "admin",
    status: "active",
    joinedAt: "2024-01-15T00:00:00Z",
    lastActive: "2024-12-08T10:30:00Z",
    permissions: ["create_trips", "edit_trips", "view_analytics", "manage_queries"],
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Priya Sharma",
    email: "priya@adventuretours.com",
    role: "editor",
    status: "active",
    joinedAt: "2024-03-20T00:00:00Z",
    lastActive: "2024-12-07T16:45:00Z",
    permissions: ["create_trips", "edit_trips", "view_analytics"],
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Amit Patel",
    email: "amit@adventuretours.com",
    role: "viewer",
    status: "pending",
    joinedAt: "2024-12-05T00:00:00Z",
    lastActive: null,
    permissions: ["view_analytics"],
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

const roleColors = {
  admin: "bg-purple-100 text-purple-800",
  editor: "bg-blue-100 text-blue-800",
  viewer: "bg-green-100 text-green-800",
}

const statusColors = {
  active: "bg-green-100 text-green-800",
  pending: "bg-yellow-100 text-yellow-800",
  inactive: "bg-red-100 text-red-800",
}

export function TeamMembers() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false)

  const filteredMembers = teamMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const stats = [
    {
      title: "Total Members",
      value: teamMembers.length.toString(),
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Active Members",
      value: teamMembers.filter((m) => m.status === "active").length.toString(),
      icon: Shield,
      color: "text-green-600",
    },
    {
      title: "Pending Invites",
      value: teamMembers.filter((m) => m.status === "pending").length.toString(),
      icon: Mail,
      color: "text-yellow-600",
    },
    {
      title: "Admins",
      value: teamMembers.filter((m) => m.role === "admin").length.toString(),
      icon: Crown,
      color: "text-purple-600",
    },
  ]

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Team Members</h1>
          <p className="text-gray-600 mt-1">Manage your team and their permissions</p>
        </div>
        <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Invite Member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite Team Member</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="member@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin - Full access</SelectItem>
                    <SelectItem value="editor">Editor - Create and edit trips</SelectItem>
                    <SelectItem value="viewer">Viewer - View only access</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsInviteDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsInviteDialogOpen(false)}>Send Invite</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
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
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Input
              placeholder="Search team members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Team Members List */}
      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredMembers.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                    <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center space-x-3 mb-1">
                      <h3 className="font-semibold text-gray-900">{member.name}</h3>
                      <Badge className={roleColors[member.role as keyof typeof roleColors]}>{member.role}</Badge>
                      <Badge className={statusColors[member.status as keyof typeof statusColors]}>
                        {member.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{member.email}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        Joined {formatDate(member.joinedAt)}
                      </div>
                      {member.lastActive && (
                        <div className="flex items-center">
                          <User className="h-3 w-3 mr-1" />
                          Last active {formatDate(member.lastActive)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-right mr-4">
                    <p className="text-xs text-gray-500 mb-1">Permissions</p>
                    <div className="flex flex-wrap gap-1">
                      {member.permissions.slice(0, 2).map((permission) => (
                        <Badge key={permission} variant="outline" className="text-xs">
                          {permission.replace("_", " ")}
                        </Badge>
                      ))}
                      {member.permissions.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{member.permissions.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Permissions
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Mail className="h-4 w-4 mr-2" />
                        Resend Invite
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove Member
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
