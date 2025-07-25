"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Users, MessageSquare, Clock, TrendingUp, AlertTriangle, CheckCircle, Phone, Mail } from "lucide-react"

const activeConversations = [
  {
    id: "1",
    customer: "John Doe",
    issue: "Login problems with 2FA",
    priority: "high",
    duration: "15 min",
    agent: "AI Bot",
    status: "active",
    satisfaction: 4.5,
  },
  {
    id: "2",
    customer: "Sarah Wilson",
    issue: "Payment processing error",
    priority: "medium",
    duration: "8 min",
    agent: "Mike Johnson",
    status: "escalated",
    satisfaction: null,
  },
  {
    id: "3",
    customer: "David Chen",
    issue: "Account settings help",
    priority: "low",
    duration: "3 min",
    agent: "AI Bot",
    status: "active",
    satisfaction: 5.0,
  },
]

const agents = [
  {
    id: "1",
    name: "AI Bot",
    status: "online",
    activeChats: 25,
    avgResponseTime: "2s",
    satisfaction: 4.6,
    resolutionRate: 78,
  },
  {
    id: "2",
    name: "Mike Johnson",
    status: "online",
    activeChats: 3,
    avgResponseTime: "45s",
    satisfaction: 4.8,
    resolutionRate: 95,
  },
  {
    id: "3",
    name: "Sarah Davis",
    status: "away",
    activeChats: 0,
    avgResponseTime: "1m 20s",
    satisfaction: 4.7,
    resolutionRate: 92,
  },
]

export function AdminDashboard() {
  const [selectedConversation, setSelectedConversation] = useState(activeConversations[0])

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <MessageSquare className="h-8 w-8 text-royal" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Chats</p>
                <p className="text-2xl font-bold">28</p>
                <p className="text-xs text-green-600">+12% from yesterday</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-royal" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg Response Time</p>
                <p className="text-2xl font-bold">1.8s</p>
                <p className="text-xs text-green-600">-0.3s improvement</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-royal" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Resolution Rate</p>
                <p className="text-2xl font-bold">82%</p>
                <div className="flex items-center">
                  <TrendingUp className="w-4 h-4 text-royal mr-1" />
                  <p className={`text-xs text-royal`}>+5% this week</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-royal" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Customer Satisfaction</p>
                <p className="text-2xl font-bold">4.7</p>
                <p className="text-xs text-green-600">+0.2 this month</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Conversations */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Active Conversations</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-4">
                  {activeConversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedConversation.id === conversation.id
                          ? "border-royal bg-royal/10"
                          : "border-midnight/20 hover:border-midnight/30"
                      }`}
                      onClick={() => setSelectedConversation(conversation)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-medium">{conversation.customer}</h4>
                            <Badge
                              variant={
                                conversation.priority === "high"
                                  ? "destructive"
                                  : conversation.priority === "medium"
                                    ? "default"
                                    : "secondary"
                              }
                            >
                              {conversation.priority}
                            </Badge>
                            <Badge variant={conversation.status === "escalated" ? "destructive" : "default"}>
                              {conversation.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{conversation.issue}</p>
                          <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                            <span>Agent: {conversation.agent}</span>
                            <span>Duration: {conversation.duration}</span>
                            {conversation.satisfaction && <span>Rating: {conversation.satisfaction}/5</span>}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Phone className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Mail className="w-4 h-4" />
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

        {/* Agent Status */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Agent Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {agents.map((agent) => (
                  <div key={agent.id} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback>
                            {agent.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{agent.name}</p>
                          <div className="flex items-center space-x-1">
                            <div
                              className={`w-2 h-2 rounded-full ${
                                agent.status === "online"
                                  ? "bg-royal"
                                  : agent.status === "away"
                                    ? "bg-crimson"
                                    : "bg-midnight/50"
                              }`}
                            />
                            <span className="text-xs text-gray-500 capitalize">{agent.status}</span>
                          </div>
                        </div>
                      </div>
                      <Badge variant="outline">{agent.activeChats} chats</Badge>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span>Response Time:</span>
                        <span>{agent.avgResponseTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Satisfaction:</span>
                        <span>{agent.satisfaction}/5</span>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span>Resolution Rate:</span>
                          <span>{agent.resolutionRate}%</span>
                        </div>
                        <Progress value={agent.resolutionRate} className="h-1" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Conversation Details */}
      <Card>
        <CardHeader>
          <CardTitle>Conversation Details - {selectedConversation.customer}</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="messages">
            <TabsList>
              <TabsTrigger value="messages">Messages</TabsTrigger>
              <TabsTrigger value="customer">Customer Info</TabsTrigger>
              <TabsTrigger value="actions">Actions</TabsTrigger>
            </TabsList>

            <TabsContent value="messages" className="mt-4">
              <div className="space-y-3 max-h-60 overflow-y-auto">
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                    <p className="text-sm">Hi, I'm having trouble logging in with my 2FA setup.</p>
                    <span className="text-xs text-gray-500">2:30 PM</span>
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-blue-600 text-white rounded-lg p-3 max-w-xs">
                    <p className="text-sm">
                      I can help you with that. Let me guide you through some troubleshooting steps.
                    </p>
                    <span className="text-xs opacity-70">2:31 PM</span>
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                    <p className="text-sm">I've tried the authenticator app but it says the code is invalid.</p>
                    <span className="text-xs text-gray-500">2:32 PM</span>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="customer" className="mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Customer Information</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <strong>Name:</strong> {selectedConversation.customer}
                    </div>
                    <div>
                      <strong>Email:</strong> john.doe@example.com
                    </div>
                    <div>
                      <strong>Account Type:</strong> Premium
                    </div>
                    <div>
                      <strong>Join Date:</strong> March 2023
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Support History</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <strong>Previous Tickets:</strong> 3
                    </div>
                    <div>
                      <strong>Last Contact:</strong> 2 weeks ago
                    </div>
                    <div>
                      <strong>Avg Satisfaction:</strong> 4.8/5
                    </div>
                    <div>
                      <strong>Preferred Contact:</strong> Chat
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="actions" className="mt-4">
              <div className="flex space-x-2">
                <Button size="sm">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Mark Resolved
                </Button>
                <Button size="sm" variant="outline">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Escalate
                </Button>
                <Button size="sm" variant="outline">
                  <Phone className="w-4 h-4 mr-2" />
                  Schedule Call
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
