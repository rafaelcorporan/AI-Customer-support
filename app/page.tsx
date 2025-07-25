"use client"

import { useState } from "react"
import { ChatInterface } from "@/components/chat-interface"
import { AdminDashboard } from "@/components/admin-dashboard"
import { KnowledgeBase } from "@/components/knowledge-base"
import { Analytics } from "@/components/analytics"
import { Settings } from "@/components/settings"
import { Login } from "@/components/login"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, BarChart3, Book, SettingsIcon, Users, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  const [activeTab, setActiveTab] = useState("chat")
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleLogin = () => {
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setActiveTab("chat")
  }

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-platinum to-midnight/10">
      <div className="container mx-auto p-4">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-midnight">Intelligent Customer Support Chatbot</h1>
              <p className="text-midnight/70 mt-2">AI-powered customer support solution</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1 bg-royal/10 text-royal px-3 py-1 rounded-full text-sm">
                <div className="w-2 h-2 bg-royal rounded-full"></div>
                <span>System Online</span>
              </div>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="flex items-center space-x-2 border-midnight/20 text-midnight hover:bg-midnight/10"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-6">
            <TabsTrigger value="chat" className="flex items-center space-x-2">
              <MessageSquare className="w-4 h-4" />
              <span>Chat Interface</span>
            </TabsTrigger>
            <TabsTrigger value="admin" className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Admin Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="knowledge" className="flex items-center space-x-2">
              <Book className="w-4 h-4" />
              <span>Knowledge Base</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center space-x-2">
              <SettingsIcon className="w-4 h-4" />
              <span>Settings</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chat">
            <ChatInterface />
          </TabsContent>

          <TabsContent value="admin">
            <AdminDashboard />
          </TabsContent>

          <TabsContent value="knowledge">
            <KnowledgeBase />
          </TabsContent>

          <TabsContent value="analytics">
            <Analytics />
          </TabsContent>

          <TabsContent value="settings">
            <Settings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
