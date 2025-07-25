"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bot, Users, Shield, Bell, Database, Zap, Save } from "lucide-react"

export function Settings() {
  const [aiSettings, setAiSettings] = useState({
    confidenceThreshold: [85],
    escalationThreshold: [70],
    responseDelay: [1000],
    enableLearning: true,
    enablePersonalization: true,
    multiLanguage: false,
  })

  const [notifications, setNotifications] = useState({
    escalations: true,
    lowSatisfaction: true,
    systemAlerts: true,
    dailyReports: false,
    weeklyReports: true,
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">System Settings</h2>
          <p className="text-gray-600">Configure your intelligent support chatbot</p>
        </div>
        <Button className="bg-royal hover:bg-royal/90 text-platinum">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="ai" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="ai" className="flex items-center space-x-2">
            <Bot className="w-4 h-4 text-royal" />
            <span>AI Configuration</span>
          </TabsTrigger>
          <TabsTrigger value="agents" className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-royal" />
            <span>Agent Management</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center space-x-2">
            <Shield className="w-4 h-4 text-royal" />
            <span>Security</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center space-x-2">
            <Bell className="w-4 h-4 text-royal" />
            <span>Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="integrations" className="flex items-center space-x-2">
            <Database className="w-4 h-4 text-royal" />
            <span>Integrations</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ai" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Model Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Confidence Threshold</Label>
                  <div className="px-3">
                    <Slider
                      value={aiSettings.confidenceThreshold}
                      onValueChange={(value) => setAiSettings({ ...aiSettings, confidenceThreshold: value })}
                      max={100}
                      min={50}
                      step={5}
                      className="w-full"
                    />
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>50%</span>
                    <span>Current: {aiSettings.confidenceThreshold[0]}%</span>
                    <span>100%</span>
                  </div>
                  <p className="text-xs text-gray-600">Minimum confidence level for AI responses</p>
                </div>

                <div className="space-y-2">
                  <Label>Escalation Threshold</Label>
                  <div className="px-3">
                    <Slider
                      value={aiSettings.escalationThreshold}
                      onValueChange={(value) => setAiSettings({ ...aiSettings, escalationThreshold: value })}
                      max={100}
                      min={30}
                      step={5}
                      className="w-full"
                    />
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>30%</span>
                    <span>Current: {aiSettings.escalationThreshold[0]}%</span>
                    <span>100%</span>
                  </div>
                  <p className="text-xs text-gray-600">Confidence level below which conversations are escalated</p>
                </div>

                <div className="space-y-2">
                  <Label>Response Delay (ms)</Label>
                  <div className="px-3">
                    <Slider
                      value={aiSettings.responseDelay}
                      onValueChange={(value) => setAiSettings({ ...aiSettings, responseDelay: value })}
                      max={3000}
                      min={500}
                      step={250}
                      className="w-full"
                    />
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>0.5s</span>
                    <span>Current: {aiSettings.responseDelay[0] / 1000}s</span>
                    <span>3s</span>
                  </div>
                  <p className="text-xs text-gray-600">Artificial delay to make responses feel more natural</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>AI Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Continuous Learning</Label>
                    <p className="text-xs text-gray-600">Allow AI to learn from successful interactions</p>
                  </div>
                  <Switch
                    checked={aiSettings.enableLearning}
                    onCheckedChange={(checked) => setAiSettings({ ...aiSettings, enableLearning: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Personalization</Label>
                    <p className="text-xs text-gray-600">Customize responses based on user history</p>
                  </div>
                  <Switch
                    checked={aiSettings.enablePersonalization}
                    onCheckedChange={(checked) => setAiSettings({ ...aiSettings, enablePersonalization: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Multi-Language Support</Label>
                    <p className="text-xs text-gray-600">Enable automatic language detection and translation</p>
                  </div>
                  <Switch
                    checked={aiSettings.multiLanguage}
                    onCheckedChange={(checked) => setAiSettings({ ...aiSettings, multiLanguage: checked })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Default Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                      <SelectItem value="ja">Japanese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>System Prompt</Label>
                  <Textarea
                    placeholder="Enter custom system prompt for AI behavior..."
                    className="min-h-[100px]"
                    defaultValue="You are a helpful customer support assistant. Be professional, empathetic, and solution-focused."
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="agents" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Agent Roles & Permissions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Administrator</p>
                      <p className="text-sm text-gray-600">Full system access and configuration</p>
                    </div>
                    <Badge>3 users</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Senior Agent</p>
                      <p className="text-sm text-gray-600">Handle escalated cases and mentor junior agents</p>
                    </div>
                    <Badge>8 users</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Support Agent</p>
                      <p className="text-sm text-gray-600">Handle customer conversations and basic tasks</p>
                    </div>
                    <Badge>15 users</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Observer</p>
                      <p className="text-sm text-gray-600">View-only access for training and monitoring</p>
                    </div>
                    <Badge>5 users</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Workload Distribution</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Maximum Concurrent Chats per Agent</Label>
                  <Input type="number" defaultValue="5" />
                </div>
                <div className="space-y-2">
                  <Label>Auto-Assignment Algorithm</Label>
                  <Select defaultValue="round-robin">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="round-robin">Round Robin</SelectItem>
                      <SelectItem value="least-busy">Least Busy</SelectItem>
                      <SelectItem value="skill-based">Skill-Based</SelectItem>
                      <SelectItem value="priority">Priority-Based</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable Overflow to AI</Label>
                    <p className="text-xs text-gray-600">Route to AI when all agents are busy</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="space-y-2">
                  <Label>Business Hours</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input placeholder="Start time" defaultValue="09:00" />
                    <Input placeholder="End time" defaultValue="17:00" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Data Protection</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>End-to-End Encryption</Label>
                    <p className="text-xs text-gray-600">Encrypt all conversation data</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>PII Detection</Label>
                    <p className="text-xs text-gray-600">Automatically detect and mask sensitive information</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="space-y-2">
                  <Label>Data Retention Period (days)</Label>
                  <Input type="number" defaultValue="365" />
                </div>
                <div className="space-y-2">
                  <Label>Compliance Standards</Label>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">GDPR</Badge>
                    <Badge variant="outline">CCPA</Badge>
                    <Badge variant="outline">SOC 2</Badge>
                    <Badge variant="outline">HIPAA</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Access Control</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-xs text-gray-600">Require 2FA for all admin accounts</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>IP Whitelisting</Label>
                    <p className="text-xs text-gray-600">Restrict access to specific IP addresses</p>
                  </div>
                  <Switch />
                </div>
                <div className="space-y-2">
                  <Label>Session Timeout (minutes)</Label>
                  <Input type="number" defaultValue="30" />
                </div>
                <div className="space-y-2">
                  <Label>Password Policy</Label>
                  <Select defaultValue="strong">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Basic (8+ characters)</SelectItem>
                      <SelectItem value="strong">Strong (12+ chars, mixed case, numbers)</SelectItem>
                      <SelectItem value="enterprise">Enterprise (16+ chars, symbols required)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Alert Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Escalation Alerts</Label>
                    <p className="text-xs text-gray-600">Notify when conversations are escalated to humans</p>
                  </div>
                  <Switch
                    checked={notifications.escalations}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, escalations: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Low Satisfaction Alerts</Label>
                    <p className="text-xs text-gray-600">Alert when customer satisfaction drops below threshold</p>
                  </div>
                  <Switch
                    checked={notifications.lowSatisfaction}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, lowSatisfaction: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>System Alerts</Label>
                    <p className="text-xs text-gray-600">Critical system errors and downtime notifications</p>
                  </div>
                  <Switch
                    checked={notifications.systemAlerts}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, systemAlerts: checked })}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Report Scheduling</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Daily Reports</Label>
                    <p className="text-xs text-gray-600">Daily performance and activity summary</p>
                  </div>
                  <Switch
                    checked={notifications.dailyReports}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, dailyReports: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Weekly Reports</Label>
                    <p className="text-xs text-gray-600">Comprehensive weekly analytics and insights</p>
                  </div>
                  <Switch
                    checked={notifications.weeklyReports}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, weeklyReports: checked })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Report Recipients</Label>
                  <Textarea
                    placeholder="Enter email addresses separated by commas..."
                    defaultValue="admin@company.com, support-manager@company.com"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>CRM Integration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-royal/10 rounded flex items-center justify-center">
                      <Database className="w-4 h-4 text-royal" />
                    </div>
                    <div>
                      <p className="font-medium">Salesforce</p>
                      <p className="text-sm text-gray-600">Customer data synchronization</p>
                    </div>
                  </div>
                  <Badge variant="outline">Connected</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-royal/10 rounded flex items-center justify-center">
                      <Database className="w-4 h-4 text-royal" />
                    </div>
                    <div>
                      <p className="font-medium">HubSpot</p>
                      <p className="text-sm text-gray-600">Lead management and tracking</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    Connect
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Communication Platforms</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-royal/10 rounded flex items-center justify-center">
                      <Zap className="w-4 h-4 text-royal" />
                    </div>
                    <div>
                      <p className="font-medium">Slack</p>
                      <p className="text-sm text-gray-600">Team notifications and alerts</p>
                    </div>
                  </div>
                  <Badge variant="outline">Connected</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-royal/10 rounded flex items-center justify-center">
                      <Zap className="w-4 h-4 text-royal" />
                    </div>
                    <div>
                      <p className="font-medium">Microsoft Teams</p>
                      <p className="text-sm text-gray-600">Enterprise communication</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    Connect
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>API Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>API Endpoint</Label>
                <Input defaultValue="https://api.yourcompany.com/support" />
              </div>
              <div className="space-y-2">
                <Label>API Key</Label>
                <Input type="password" defaultValue="sk-1234567890abcdef" />
              </div>
              <div className="space-y-2">
                <Label>Webhook URL</Label>
                <Input defaultValue="https://yourcompany.com/webhooks/support" />
              </div>
              <div className="flex space-x-2">
                <Button>Test Connection</Button>
                <Button variant="outline">Generate New Key</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
