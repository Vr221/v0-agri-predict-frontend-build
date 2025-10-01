"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Brain, Database, TrendingUp } from "lucide-react"

export default function HomePage() {
  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Welcome to AgriPredict</h1>
        <p className="text-muted-foreground mt-1 text-sm sm:text-base">AI-powered insights for optimal crop yields</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Farms</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[var(--agri-green)]">6</div>
            <p className="text-xs text-muted-foreground">Across Odisha</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Crops</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[var(--agri-green)]">7</div>
            <p className="text-xs text-muted-foreground">Currently growing</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Predictions Made</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[var(--agri-purple)]">24</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Data Records</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[var(--agri-green)]">142</div>
            <p className="text-xs text-muted-foreground">Soil & weather data</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-[var(--agri-green)]" />
              Quick Access
            </CardTitle>
            <CardDescription>Manage your farms and data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link href="/farms">
              <Button
                className="w-full justify-start bg-transparent hover:bg-[var(--agri-light-green)]"
                variant="outline"
              >
                <MapPin className="mr-2 h-4 w-4" />
                My Farms
              </Button>
            </Link>
            <Link href="/data-entry">
              <Button
                className="w-full justify-start bg-transparent hover:bg-[var(--agri-light-green)]"
                variant="outline"
              >
                <Database className="mr-2 h-4 w-4" />
                Data Entry
              </Button>
            </Link>
            <Link href="/predictions">
              <Button
                className="w-full justify-start bg-transparent hover:bg-[var(--agri-light-green)]"
                variant="outline"
              >
                <Brain className="mr-2 h-4 w-4" />
                AI Predictions
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-[var(--agri-purple)]" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest updates and predictions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="h-2 w-2 rounded-full bg-[var(--agri-green)] mt-2 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium">New prediction generated</p>
                <p className="text-xs text-muted-foreground">Sunrise Agriculture - 2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-2 w-2 rounded-full bg-[var(--agri-purple)] mt-2 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium">Soil data updated</p>
                <p className="text-xs text-muted-foreground">Green Valley Farm - 5 hours ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-2 w-2 rounded-full bg-[var(--agri-orange)] mt-2 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium">Weather alert</p>
                <p className="text-xs text-muted-foreground">Cuttack district - 1 day ago</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
