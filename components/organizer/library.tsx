"use client"

import React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Copy,
  Trash2,
  FolderPlus,
  MapPin,
  Bed,
  Car,
  Utensils,
  Activity,
  Users,
} from "lucide-react"

// Mock data
const libraryItems = {
  stays: [
    {
      id: 1,
      title: "Mountain View Resort",
      location: "Manali, Himachal Pradesh",
      type: "Hotel",
      sharing: "Double Occupancy",
      description: "Luxury resort with mountain views and spa facilities",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      title: "Riverside Camping",
      location: "Rishikesh, Uttarakhand",
      type: "Camp",
      sharing: "Shared Tents",
      description: "Adventure camping by the Ganges river",
      image: "/placeholder.svg?height=200&width=300",
    },
  ],
  activities: [
    {
      id: 1,
      title: "River Rafting",
      location: "Rishikesh",
      difficulty: "Moderate",
      duration: "3 hours",
      description: "Thrilling white water rafting experience",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      title: "Paragliding",
      location: "Bir Billing",
      difficulty: "Easy",
      duration: "30 minutes",
      description: "Tandem paragliding with certified instructors",
      image: "/placeholder.svg?height=200&width=300",
    },
  ],
  transit: [
    {
      id: 1,
      title: "Delhi to Manali Bus",
      from: "Delhi",
      to: "Manali",
      mode: "AC Bus",
      duration: "12 hours",
      description: "Comfortable overnight journey in AC sleeper bus",
      image: "/placeholder.svg?height=200&width=300",
    },
  ],
  meals: [
    {
      id: 1,
      title: "Himachali Thali",
      cuisine: "Local Himachali",
      type: "Lunch",
      description: "Traditional Himachali cuisine with local specialties",
      image: "/placeholder.svg?height=200&width=300",
    },
  ],
  leaders: [
    {
      id: 1,
      name: "Rahul Sharma",
      experience: "5+ years",
      specialization: "Mountain Trekking",
      description: "Certified mountain guide with extensive Himalayan experience",
      image: "/placeholder.svg?height=200&width=300",
    },
  ],
}

const tabIcons = {
  stays: Bed,
  activities: Activity,
  transit: Car,
  meals: Utensils,
  leaders: Users,
}

export function Library() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("stays")

  const LibraryCard = ({ item, type }: { item: any; type: string }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-semibold text-gray-900 line-clamp-2">{item.title || item.name}</h3>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Copy className="h-4 w-4 mr-2" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="aspect-video bg-gray-100 rounded-lg mb-3 overflow-hidden">
          <img
            src={item.image || "/placeholder.svg"}
            alt={item.title || item.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="space-y-2 text-sm text-gray-600">
          {item.location && (
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              {item.location}
            </div>
          )}
          {item.type && (
            <p>
              <span className="font-medium">Type:</span> {item.type}
            </p>
          )}
          {item.sharing && (
            <p>
              <span className="font-medium">Sharing:</span> {item.sharing}
            </p>
          )}
          {item.difficulty && (
            <p>
              <span className="font-medium">Difficulty:</span> {item.difficulty}
            </p>
          )}
          {item.duration && (
            <p>
              <span className="font-medium">Duration:</span> {item.duration}
            </p>
          )}
          {item.mode && (
            <p>
              <span className="font-medium">Mode:</span> {item.mode}
            </p>
          )}
          {item.cuisine && (
            <p>
              <span className="font-medium">Cuisine:</span> {item.cuisine}
            </p>
          )}
          {item.experience && (
            <p>
              <span className="font-medium">Experience:</span> {item.experience}
            </p>
          )}
          {item.specialization && (
            <p>
              <span className="font-medium">Specialization:</span> {item.specialization}
            </p>
          )}
        </div>

        <p className="text-sm text-gray-600 mt-2 line-clamp-2">{item.description}</p>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Library</h1>
          <p className="text-gray-600 mt-1">Manage your reusable trip components</p>
        </div>
        <div className="flex space-x-2 mt-4 sm:mt-0">
          <Button variant="outline">
            <FolderPlus className="mr-2 h-4 w-4" />
            New Folder
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Item
          </Button>
        </div>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search library items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Library Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          {Object.entries(tabIcons).map(([key, Icon]) => (
            <TabsTrigger key={key} value={key} className="flex items-center space-x-2">
              <Icon className="h-4 w-4" />
              <span className="capitalize">{key}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(libraryItems).map(([category, items]) => (
          <TabsContent key={category} value={category}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <LibraryCard key={item.id} item={item} type={category} />
              ))}
            </div>
            {items.length === 0 && (
              <div className="text-center py-12">
                <div className="h-12 w-12 text-gray-400 mx-auto mb-4">
                  {React.createElement(tabIcons[category as keyof typeof tabIcons])}
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No {category} found</h3>
                <p className="text-gray-600 mb-4">Start building your library by adding {category}</p>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add {category.slice(0, -1)}
                </Button>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
