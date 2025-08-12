"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Eye, FileText } from "lucide-react"

const mockPages = [
  {
    id: "1",
    title: "About Us",
    slug: "about",
    status: "published",
    lastModified: "2024-01-15",
    content: "Learn about our mission to connect travelers with amazing experiences...",
  },
  {
    id: "2",
    title: "Terms of Service",
    slug: "terms",
    status: "published",
    lastModified: "2024-01-10",
    content: "These terms and conditions outline the rules and regulations...",
  },
  {
    id: "3",
    title: "Privacy Policy",
    slug: "privacy",
    status: "draft",
    lastModified: "2024-01-12",
    content: "This Privacy Policy describes how we collect, use, and protect your information...",
  },
]

export function CMSPages() {
  const [pages, setPages] = useState(mockPages)
  const [isCreating, setIsCreating] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">CMS Pages</h1>
          <p className="text-gray-600 mt-1">Manage static pages and content</p>
        </div>
        <Button onClick={() => setIsCreating(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Page
        </Button>
      </div>

      {isCreating && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Page</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Page Title</Label>
                <Input id="title" placeholder="Page title" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">URL Slug</Label>
                <Input id="slug" placeholder="page-url-slug" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea id="content" placeholder="Page content" rows={8} />
            </div>
            <div className="flex space-x-2">
              <Button>Create Page</Button>
              <Button variant="outline">Save as Draft</Button>
              <Button variant="outline" onClick={() => setIsCreating(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {pages.map((page) => (
          <Card key={page.id}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <h3 className="text-lg font-semibold">{page.title}</h3>
                    <Badge variant={page.status === "published" ? "default" : "secondary"}>{page.status}</Badge>
                  </div>
                  <p className="text-gray-600 mb-2">/{page.slug}</p>
                  <p className="text-gray-600 mb-3 line-clamp-2">{page.content}</p>
                  <div className="text-sm text-gray-500">
                    Last modified: {new Date(page.lastModified).toLocaleDateString()}
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
