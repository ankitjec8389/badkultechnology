"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Edit, Trash2, Eye, BookOpen, Search } from "lucide-react"

const mockArticles = [
  {
    id: "1",
    title: "How to Create Your First Trip",
    category: "Getting Started",
    status: "published",
    views: 1250,
    lastModified: "2024-01-15",
    content: "Step-by-step guide to creating your first trip listing...",
  },
  {
    id: "2",
    title: "Understanding Trip Analytics",
    category: "Analytics",
    status: "published",
    views: 890,
    lastModified: "2024-01-12",
    content: "Learn how to interpret your trip performance metrics...",
  },
  {
    id: "3",
    title: "Payment Processing Guide",
    category: "Payments",
    status: "draft",
    views: 0,
    lastModified: "2024-01-10",
    content: "Everything you need to know about payment processing...",
  },
]

export function KnowledgeBase() {
  const [articles, setArticles] = useState(mockArticles)
  const [isCreating, setIsCreating] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Knowledge Base</h1>
          <p className="text-gray-600 mt-1">Manage help articles and documentation</p>
        </div>
        <Button onClick={() => setIsCreating(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Article
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {isCreating && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Article</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Article Title</Label>
                <Input id="title" placeholder="Article title" />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="getting-started">Getting Started</SelectItem>
                    <SelectItem value="analytics">Analytics</SelectItem>
                    <SelectItem value="payments">Payments</SelectItem>
                    <SelectItem value="troubleshooting">Troubleshooting</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea id="content" placeholder="Article content" rows={8} />
            </div>
            <div className="flex space-x-2">
              <Button>Publish Article</Button>
              <Button variant="outline">Save as Draft</Button>
              <Button variant="outline" onClick={() => setIsCreating(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {filteredArticles.map((article) => (
          <Card key={article.id}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <BookOpen className="h-5 w-5 text-blue-600" />
                    <h3 className="text-lg font-semibold">{article.title}</h3>
                    <Badge variant={article.status === "published" ? "default" : "secondary"}>{article.status}</Badge>
                    <Badge variant="outline">{article.category}</Badge>
                  </div>
                  <p className="text-gray-600 mb-3 line-clamp-2">{article.content}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>Views: {article.views}</span>
                    <span>Last modified: {new Date(article.lastModified).toLocaleDateString()}</span>
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
