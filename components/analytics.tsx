"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, TrendingDown, Users, MessageSquare, Clock, ThumbsUp, AlertTriangle } from "lucide-react"

const performanceMetrics = [
  {
    title: "Total Conversations",
    value: "2,847",
    change: "+12.5%",
    trend: "up",
    icon: MessageSquare,
  },
  {
    title: "AI Resolution Rate",
    value: "78.3%",
    change: "+5.2%",
    trend: "up",
    icon: TrendingUp,
  },
  {
    title: "Avg Response Time",
    value: "1.8s",
    change: "-0.3s",
    trend: "up",
    icon: Clock,
  },
  {
    title: "Customer Satisfaction",
    value: "4.7/5",
    change: "+0.2",
    trend: "up",
    icon: ThumbsUp,
  },
]

const topIssues = [
  { issue: "Login Problems", count: 342, percentage: 28, trend: "up" },
  { issue: "Password Reset", count: 298, percentage: 24, trend: "down" },
  { issue: "Payment Issues", count: 187, percentage: 15, trend: "up" },
  { issue: "Account Settings", count: 156, percentage: 13, trend: "stable" },
  { issue: "Technical Errors", count: 134, percentage: 11, trend: "down" },
]

const resolutionTimes = [
  { timeRange: "< 1 minute", count: 1247, percentage: 68 },
  { timeRange: "1-5 minutes", count: 398, percentage: 22 },
  { timeRange: "5-15 minutes", count: 142, percentage: 8 },
  { timeRange: "> 15 minutes", count: 36, percentage: 2 },
]

const satisfactionBreakdown = [
  { rating: "5 Stars", count: 1456, percentage: 62 },
  { rating: "4 Stars", count: 567, percentage: 24 },
  { rating: "3 Stars", count: 234, percentage: 10 },
  { rating: "2 Stars", count: 67, percentage: 3 },
  { rating: "1 Star", count: 23, percentage: 1 },
]

export function Analytics() {
  return (
    <div className="space-y-6">
      {/* Key Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {performanceMetrics.map((metric, index) => {
          const Icon = metric.icon
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Icon className="h-8 w-8 text-royal" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                    <p className="text-2xl font-bold">{metric.value}</p>
                    <div className="flex items-center">
                      {metric.trend === "up" ? (
                        <TrendingUp className="w-4 h-4 text-royal mr-1" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-crimson mr-1" />
                      )}
                      <p className={`text-xs ${metric.trend === "up" ? "text-royal" : "text-crimson"}`}>
                        {metric.change}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Issues */}
        <Card>
          <CardHeader>
            <CardTitle>Top Support Issues</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topIssues.map((issue, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{issue.issue}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">{issue.count}</span>
                        <Badge
                          variant={
                            issue.trend === "up" ? "destructive" : issue.trend === "down" ? "default" : "secondary"
                          }
                        >
                          {issue.trend === "up" ? "↑" : issue.trend === "down" ? "↓" : "→"}
                        </Badge>
                      </div>
                    </div>
                    <Progress value={issue.percentage} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Resolution Times */}
        <Card>
          <CardHeader>
            <CardTitle>Resolution Time Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {resolutionTimes.map((time, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{time.timeRange}</span>
                      <span className="text-sm text-gray-600">{time.count} tickets</span>
                    </div>
                    <Progress value={time.percentage} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="satisfaction" className="w-full">
        <TabsList>
          <TabsTrigger value="satisfaction">Customer Satisfaction</TabsTrigger>
          <TabsTrigger value="performance">AI Performance</TabsTrigger>
          <TabsTrigger value="trends">Trends & Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="satisfaction" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Satisfaction Ratings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {satisfactionBreakdown.map((rating, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">{rating.rating}</span>
                          <span className="text-sm text-gray-600">{rating.count} responses</span>
                        </div>
                        <Progress value={rating.percentage} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Satisfaction Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-royal">4.7</div>
                    <div className="text-sm text-gray-600">Average Rating</div>
                    <div className="flex items-center justify-center mt-2">
                      <TrendingUp className="w-4 h-4 text-royal mr-1" />
                      <span className="text-sm text-royal">+0.2 this month</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold">92%</div>
                      <div className="text-xs text-gray-600">Positive Ratings</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">4%</div>
                      <div className="text-xs text-gray-600">Negative Ratings</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Accuracy</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600">94.2%</div>
                  <div className="text-sm text-gray-600">Intent Recognition</div>
                  <Progress value={94.2} className="mt-4" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Escalation Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-orange-600">21.7%</div>
                  <div className="text-sm text-gray-600">Conversations Escalated</div>
                  <div className="flex items-center justify-center mt-2">
                    <TrendingDown className="w-4 h-4 text-green-600 mr-1" />
                    <span className="text-sm text-green-600">-3.2% improvement</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Knowledge Coverage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-600">87%</div>
                  <div className="text-sm text-gray-600">Issues Covered</div>
                  <Progress value={87} className="mt-4" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Key Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <TrendingUp className="w-5 h-5 text-royal mt-0.5" />
                    <div>
                      <p className="font-medium">Resolution Rate Improving</p>
                      <p className="text-sm text-gray-600">
                        AI resolution rate increased by 5.2% this month, reducing human agent workload.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-crimson mt-0.5" />
                    <div>
                      <p className="font-medium">Login Issues Trending Up</p>
                      <p className="text-sm text-gray-600">
                        28% increase in login-related queries. Consider updating authentication documentation.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Users className="w-5 h-5 text-royal mt-0.5" />
                    <div>
                      <p className="font-medium">Peak Hours Identified</p>
                      <p className="text-sm text-gray-600">
                        Highest activity between 2-4 PM EST. Consider scaling resources during these hours.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-royal/10 border border-royal/20 rounded-lg">
                    <p className="font-medium text-royal">Expand Knowledge Base</p>
                    <p className="text-sm text-royal/80">
                      Add more articles about login troubleshooting to improve AI resolution rate.
                    </p>
                  </div>
                  <div className="p-3 bg-royal/10 border border-royal/20 rounded-lg">
                    <p className="font-medium text-royal">Optimize Response Templates</p>
                    <p className="text-sm text-royal/80">
                      Update AI responses for payment issues based on recent successful resolutions.
                    </p>
                  </div>
                  <div className="p-3 bg-midnight/10 border border-midnight/20 rounded-lg">
                    <p className="font-medium text-midnight">Agent Training Focus</p>
                    <p className="text-sm text-midnight/80">
                      Focus training on technical errors as they have the lowest satisfaction scores.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
