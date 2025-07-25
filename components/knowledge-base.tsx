"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Plus, Edit, Trash2, FileText, Video, ImageIcon, ExternalLink, TrendingUp, Eye } from "lucide-react"

const knowledgeArticles = [
  {
    id: "1",
    title: "How to Reset Your Password",
    category: "Account Management",
    type: "article",
    views: 1250,
    lastUpdated: "2024-01-15",
    status: "published",
    effectiveness: 92,
    content: "Step-by-step guide to reset your password...",
  },
  {
    id: "2",
    title: "Setting Up Two-Factor Authentication",
    category: "Security",
    type: "video",
    views: 890,
    lastUpdated: "2024-01-10",
    status: "published",
    effectiveness: 88,
    content: "Complete video tutorial for 2FA setup...",
  },
  {
    id: "3",
    title: "Troubleshooting Login Issues",
    category: "Technical Support",
    type: "article",
    views: 2100,
    lastUpdated: "2024-01-20",
    status: "published",
    effectiveness: 85,
    content: "Common login problems and solutions...",
  },
  {
    id: "4",
    title: "Payment Processing Errors",
    category: "Billing",
    type: "article",
    views: 650,
    lastUpdated: "2024-01-12",
    status: "draft",
    effectiveness: 78,
    content: "How to resolve payment processing issues...",
  },
]

const categories = [
  { name: "Account Management", count: 15, color: "blue" },
  { name: "Security", count: 8, color: "green" },
  { name: "Technical Support", count: 23, color: "purple" },
  { name: "Billing", count: 12, color: "orange" },
  { name: "API Documentation", count: 18, color: "red" },
]

const recentActivity = [
  {
    action: "Article Updated",
    title: "Troubleshooting Login Issues",
    user: "Sarah Davis",
    time: "2 hours ago",
  },
  {
    action: "New Article Created",
    title: "API Rate Limiting Guide",
    user: "Mike Johnson",
    time: "5 hours ago",
  },
  {
    action: "Article Published",
    title: "Mobile App Installation",
    user: "Admin",
    time: "1 day ago",
  },
]

export function KnowledgeBase() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedArticle, setSelectedArticle] = useState(knowledgeArticles[0])

  const filteredArticles = knowledgeArticles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search knowledge base..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant={selectedCategory === "all" ? "default" : "outline"}
                onClick={() => setSelectedCategory("all")}
              >
                All Categories
              </Button>
              {categories.slice(0, 3).map((category) => (
                <Button
                  key={category.name}
                  variant={selectedCategory === category.name ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.name)}
                >
                  {category.name}
                </Button>
              ))}
            </div>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Article
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Categories Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Categories</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {categories.map((category) => (
                <div
                  key={category.name}
                  className={`flex items-center justify-between p-2 rounded cursor-pointer transition-colors ${
                    selectedCategory === category.name ? "bg-royal/10 border border-royal/20" : "hover:bg-midnight/5"
                  }`}
                  onClick={() => setSelectedCategory(category.name)}
                >
                  <span className="text-sm">{category.name}</span>
                  <Badge variant="secondary">{category.count}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="text-xs">
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-gray-600">{activity.title}</p>
                    <p className="text-gray-500">
                      {activity.user} • {activity.time}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Articles List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Knowledge Articles ({filteredArticles.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px]">
                <div className="space-y-4">
                  {filteredArticles.map((article) => (
                    <div
                      key={article.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedArticle.id === article.id
                          ? "border-royal bg-royal/10"
                          : "border-midnight/20 hover:border-midnight/30"
                      }`}
                      onClick={() => setSelectedArticle(article)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            {article.type === "video" ? (
                              <Video className="w-4 h-4 text-crimson" />
                            ) : article.type === "image" ? (
                              <ImageIcon className="w-4 h-4 text-royal" />
                            ) : (
                              <FileText className="w-4 h-4 text-royal" />
                            )}
                            <h3 className="font-medium">{article.title}</h3>
                            <Badge variant={article.status === "published" ? "default" : "secondary"}>
                              {article.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{article.category}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Eye className="w-3 h-3 text-royal" />
                              <span>{article.views} views</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <TrendingUp className="w-3 h-3 text-royal" />
                              <span>{article.effectiveness}% effective</span>
                            </div>
                            <span>Updated {article.lastUpdated}</span>
                          </div>
                        </div>
                        <div className="flex space-x-1">
                          <Button size="sm" variant="ghost">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Article Preview */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Article Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">{selectedArticle.title}</h3>
                  <div className="flex items-center space-x-2 mb-3">
                    <Badge>{selectedArticle.category}</Badge>
                    <Badge variant="outline">{selectedArticle.type}</Badge>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Views:</span>
                    <span>{selectedArticle.views}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Effectiveness:</span>
                    <span>{selectedArticle.effectiveness}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Updated:</span>
                    <span>{selectedArticle.lastUpdated}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <Badge variant={selectedArticle.status === "published" ? "default" : "secondary"}>
                      {selectedArticle.status}
                    </Badge>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Content Preview</h4>
                  <p className="text-sm text-gray-600">{selectedArticle.content}</p>
                </div>

                <div className="flex space-x-2">
                  <Button size="sm">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button size="sm" variant="outline">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Full
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
