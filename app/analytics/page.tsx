"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart3, TrendingUp, Droplets, Thermometer, ChevronLeft, Calendar, MapPin } from "lucide-react"
import Link from "next/link"

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-background p-4 sm:p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <Link href="/">
          <Button variant="ghost" className="mb-4">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>

        <div className="flex items-start gap-4">
          <BarChart3 className="h-8 w-8 sm:h-10 sm:w-10 text-[var(--agri-green)] mt-1 flex-shrink-0" />
          <div className="flex-1">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Analytics Dashboard</h1>
            <p className="text-muted-foreground mt-1 text-sm sm:text-base">
              View insights and trends from your farm data
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Crop Yield</CardTitle>
              <TrendingUp className="h-4 w-4 text-[var(--agri-green)]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[var(--agri-green)]">4.2 t/ha</div>
              <p className="text-xs text-muted-foreground">+12% from last season</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Rainfall</CardTitle>
              <Droplets className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">850 mm</div>
              <p className="text-xs text-muted-foreground">This season</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Temperature</CardTitle>
              <Thermometer className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">28°C</div>
              <p className="text-xs text-muted-foreground">Last 30 days</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Farms</CardTitle>
              <MapPin className="h-4 w-4 text-[var(--agri-green)]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[var(--agri-green)]">6</div>
              <p className="text-xs text-muted-foreground">Active locations</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-[var(--agri-green)]" />
                Seasonal Trends
              </CardTitle>
              <CardDescription>Performance across different seasons</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Kharif Season</span>
                  <span className="text-sm text-[var(--agri-green)] font-semibold">4.5 t/ha</span>
                </div>
                <div className="h-2 bg-[var(--agri-light-green)] rounded-full overflow-hidden">
                  <div className="h-full bg-[var(--agri-green)] w-[90%]" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Rabi Season</span>
                  <span className="text-sm text-[var(--agri-green)] font-semibold">3.8 t/ha</span>
                </div>
                <div className="h-2 bg-[var(--agri-light-green)] rounded-full overflow-hidden">
                  <div className="h-full bg-[var(--agri-green)] w-[76%]" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Summer Season</span>
                  <span className="text-sm text-[var(--agri-green)] font-semibold">4.1 t/ha</span>
                </div>
                <div className="h-2 bg-[var(--agri-light-green)] rounded-full overflow-hidden">
                  <div className="h-full bg-[var(--agri-green)] w-[82%]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-[var(--agri-green)]" />
                Top Performing Farms
              </CardTitle>
              <CardDescription>Highest yield farms this season</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-[var(--agri-light-green)] rounded-lg">
                <div>
                  <p className="font-medium text-sm">Sunrise Agriculture</p>
                  <p className="text-xs text-muted-foreground">Cuttack, Odisha</p>
                </div>
                <span className="text-lg font-bold text-[var(--agri-green)]">5.2 t/ha</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-accent rounded-lg">
                <div>
                  <p className="font-medium text-sm">Green Valley Farm</p>
                  <p className="text-xs text-muted-foreground">Bhubaneswar, Odisha</p>
                </div>
                <span className="text-lg font-bold text-[var(--agri-green)]">4.8 t/ha</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-accent rounded-lg">
                <div>
                  <p className="font-medium text-sm">Harvest Hope Farm</p>
                  <p className="text-xs text-muted-foreground">Balasore, Odisha</p>
                </div>
                <span className="text-lg font-bold text-[var(--agri-green)]">4.6 t/ha</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Advanced Analytics Coming Soon</CardTitle>
            <CardDescription>Interactive charts and detailed reports will be available here</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Track crop performance, weather patterns, and soil health trends over time with interactive charts,
              predictive models, and detailed reports to optimize your farming operations.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
