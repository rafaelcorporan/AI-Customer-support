"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Send, Bot, User, ThumbsUp, ThumbsDown, AlertTriangle, Phone } from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant" | "system"
  content: string
  timestamp: Date
  type?: "troubleshooting" | "knowledge" | "escalation"
  metadata?: {
    confidence?: number
    source?: string
    escalated?: boolean
    feedback?: "positive" | "negative"
  }
}

const troubleshootingSteps = [
  "Let's start by checking your internet connection. Can you try opening another website?",
  "Please try clearing your browser cache and cookies. Go to Settings > Privacy > Clear browsing data.",
  "Try disabling any browser extensions temporarily. Go to Settings > Extensions and toggle them off.",
  "Let's check if this happens in an incognito/private browsing window.",
  "Please try restarting your browser completely and test again.",
]

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hello! I'm your AI support assistant. I'm here to help you resolve technical issues quickly and efficiently. What can I help you with today?",
      timestamp: new Date(),
      metadata: { confidence: 1.0 },
    },
  ])
  const [currentStep, setCurrentStep] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [troubleshootingMode, setTroubleshootingMode] = useState(false)
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)
    setIsTyping(true)

    try {
      // Send message to API
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content
          }))
        }),
      })

      if (response.ok) {
        const reader = response.body?.getReader()
        const decoder = new TextDecoder()
        let assistantContent = ""

        if (reader) {
          while (true) {
            const { done, value } = await reader.read()
            if (done) break
            
            const chunk = decoder.decode(value)
            assistantContent += chunk
          }
        }

        setIsTyping(false)
        
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: assistantContent.trim(),
          timestamp: new Date(),
          metadata: { confidence: 0.95, source: "AI Assistant" },
        }
        
        setMessages((prev) => [...prev, assistantMessage])
      }
    } catch (error) {
      console.error("Chat error:", error)
      setIsTyping(false)
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I apologize, but I'm having trouble connecting right now. Please try again or contact our support team directly.",
        timestamp: new Date(),
        metadata: { confidence: 0.5, source: "Error Handler" },
      }
      
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleTroubleshootingResponse = (response: "yes" | "no") => {
    const userResponse: Message = {
      id: Date.now().toString(),
      role: "user",
      content: response === "yes" ? "Yes, that worked!" : "No, that didn't help.",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userResponse])

    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)

      if (response === "yes") {
        const successMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "Great! I'm glad that resolved your issue. Is there anything else I can help you with today?",
          timestamp: new Date(),
          metadata: { confidence: 1.0 },
        }
        setMessages((prev) => [...prev, successMessage])
        setTroubleshootingMode(false)
        setCurrentStep(0)
      } else {
        if (currentStep < troubleshootingSteps.length - 1) {
          const nextStep = currentStep + 1
          setCurrentStep(nextStep)
          const nextMessage: Message = {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content: "Let's try the next step: " + troubleshootingSteps[nextStep],
            timestamp: new Date(),
            type: "troubleshooting",
            metadata: { confidence: 0.8 - nextStep * 0.1 },
          }
          setMessages((prev) => [...prev, nextMessage])
        } else {
          handleEscalation()
        }
      }
    }, 1000)
  }

  const handleEscalation = () => {
    const escalationMessage: Message = {
      id: Date.now().toString(),
      role: "assistant",
      content:
        "I understand this issue requires more specialized assistance. I'm connecting you with one of our human support agents who can provide more detailed help. Your conversation history will be shared with them.",
      timestamp: new Date(),
      type: "escalation",
      metadata: { escalated: true, confidence: 1.0 },
    }
    setMessages((prev) => [...prev, escalationMessage])
    setTroubleshootingMode(false)
    setCurrentStep(0)
  }

  const handleFeedback = (messageId: string, feedback: "positive" | "negative") => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === messageId ? { ...msg, metadata: { ...msg.metadata, feedback } } : msg)),
    )
  }

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages, isTyping])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-3">
        <Card className="h-[600px] flex flex-col">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2">
              <Bot className="w-5 h-5 text-royal" />
              <span>Customer Support Chat</span>
              <Badge variant="secondary" className="ml-auto">
                AI Powered
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col p-0">
            <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`flex items-start space-x-2 max-w-[80%] ${message.role === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
                    >
                      <Avatar className="w-8 h-8">
                        <AvatarFallback>
                          {message.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className={`rounded-lg p-3 ${
                          message.role === "user"
                            ? "bg-royal text-platinum"
                            : message.type === "escalation"
                              ? "bg-crimson/10 border border-crimson/20"
                              : "bg-platinum border border-midnight/20"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs opacity-70">{message.timestamp.toLocaleTimeString()}</span>
                          {message.role === "assistant" && (
                            <div className="flex items-center space-x-1">
                              {message.metadata?.confidence && (
                                <Badge variant="outline" className="text-xs">
                                  {Math.round(message.metadata.confidence * 100)}% confident
                                </Badge>
                              )}
                              {message.type === "escalation" && (
                                <Badge variant="destructive" className="text-xs">
                                  <AlertTriangle className="w-3 h-3 mr-1" />
                                  Escalated
                                </Badge>
                              )}
                            </div>
                          )}
                        </div>
                        {message.role === "assistant" && !message.metadata?.feedback && (
                          <div className="flex items-center space-x-2 mt-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleFeedback(message.id, "positive")}
                              className="h-6 px-2 hover:bg-blue-800 hover:text-white active:bg-blue-800 active:text-white focus:bg-blue-800 focus:text-white transition-colors duration-300"
                            >
                              <ThumbsUp className="w-3 h-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleFeedback(message.id, "negative")}
                              className="h-6 px-2 hover:bg-blue-800 hover:text-white active:bg-blue-800 active:text-white focus:bg-blue-800 focus:text-white transition-colors duration-300"
                            >
                              <ThumbsDown className="w-3 h-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-start space-x-2">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback>
                          <Bot className="w-4 h-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="bg-gray-100 rounded-lg p-3">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
            <Separator />
            <div className="p-4">
              {troubleshootingMode && (
                <div className="mb-4 p-3 bg-royal/10 border border-royal/20 rounded-lg">
                  <p className="text-sm text-royal mb-2">Did this step help resolve your issue?</p>
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      onClick={() => handleTroubleshootingResponse("yes")}
                      className="hover:bg-blue-800 hover:text-white active:bg-blue-800 active:text-white focus:bg-blue-800 focus:text-white transition-colors duration-300"
                    >
                      Yes, it worked!
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleTroubleshootingResponse("no")}
                      className="hover:bg-blue-800 hover:text-white active:bg-blue-800 active:text-white focus:bg-blue-800 focus:text-white transition-colors duration-300"
                    >
                      No, still having issues
                    </Button>
                  </div>
                </div>
              )}
              <form onSubmit={handleSendMessage} className="flex space-x-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="hover:bg-blue-800 hover:text-white active:bg-blue-800 active:text-white focus:bg-blue-800 focus:text-white transition-colors duration-300"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full justify-start bg-transparent hover:bg-blue-800 hover:text-white active:bg-blue-800 active:text-white focus:bg-blue-800 focus:text-white transition-colors duration-300"
            >
              <Phone className="w-4 h-4 mr-2 text-royal" />
              Request Callback
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start bg-transparent hover:bg-blue-800 hover:text-white active:bg-blue-800 active:text-white focus:bg-blue-800 focus:text-white transition-colors duration-300"
              onClick={handleEscalation}
            >
              <AlertTriangle className="w-4 h-4 mr-2 text-crimson" />
              Escalate to Human
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Session Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Messages:</span>
              <span>{messages.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Response Time:</span>
              <span>{"<2s"}</span>
            </div>
            <div className="flex justify-between">
              <span>Satisfaction:</span>
              <span className="text-royal">High</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Common Issues</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full justify-start text-xs hover:bg-blue-800 hover:text-white active:bg-blue-800 active:text-white focus:bg-blue-800 focus:text-white transition-colors duration-300"
              onClick={() => setInput("I have login problems")}
            >
              Login Problems
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full justify-start text-xs hover:bg-blue-800 hover:text-white active:bg-blue-800 active:text-white focus:bg-blue-800 focus:text-white transition-colors duration-300"
              onClick={() => setInput("I have payment issues")}
            >
              Payment Issues
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full justify-start text-xs hover:bg-blue-800 hover:text-white active:bg-blue-800 active:text-white focus:bg-blue-800 focus:text-white transition-colors duration-300"
              onClick={() => setInput("I'm experiencing technical errors")}
            >
              Technical Errors
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full justify-start text-xs hover:bg-blue-800 hover:text-white active:bg-blue-800 active:text-white focus:bg-blue-800 focus:text-white transition-colors duration-300"
              onClick={() => setInput("I need help with account settings")}
            >
              Account Settings
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
