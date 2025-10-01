"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart3, TrendingUp, Droplets, Thermometer, ChevronLeft, Calendar, MapPin } from "lucide-react"
import Link from "next/link"
import { useDataStore } from "@/lib/data-store"
import { useLanguage } from "@/lib/language-context"

export default function AnalyticsPage() {
  const { getAnalytics } = useDataStore()
  const analytics = getAnalytics()
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <Link href="/">
          <Button variant="ghost" className="mb-4">
            <ChevronLeft className="h-4 w-4 mr-2" />
            {t.common.back}
          </Button>
        </Link>

        <div className="flex items-start gap-4">
          <BarChart3 className="h-8 w-8 sm:h-10 sm:w-10 text-[var(--agri-green)] mt-1 flex-shrink-0" />
          <div className="flex-1">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground">{t.nav.analytics}</h1>
            <p className="text-muted-foreground mt-1 text-sm sm:text-base">
              {t.analytics?.description || "View insights and trends from your farm data"}
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
              <div className="text-2xl font-bold text-[var(--agri-green)]">{analytics.avgYield} t/ha</div>
              <p className="text-xs text-muted-foreground">From {analytics.totalPredictions} predictions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Rainfall</CardTitle>
              <Droplets className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{analytics.avgRainfall} mm</div>
              <p className="text-xs text-muted-foreground">From {analytics.totalWeatherRecords} records</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Temperature</CardTitle>
              <Thermometer className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{analytics.avgTemperature}°C</div>
              <p className="text-xs text-muted-foreground">Last 30 days</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Farms</CardTitle>
              <MapPin className="h-4 w-4 text-[var(--agri-green)]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[var(--agri-green)]">{analytics.totalFarms}</div>
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
              {analytics.seasonalTrends.map((trend, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{trend.season}</span>
                    <span className="text-sm text-[var(--agri-green)] font-semibold">{trend.yield} t/ha</span>
                  </div>
                  <div className="h-2 bg-[var(--agri-light-green)] rounded-full overflow-hidden">
                    <div className="h-full bg-[var(--agri-green)]" style={{ width: `${trend.percentage}%` }} />
                  </div>
                </div>
              ))}
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
              {analytics.topFarms.map((farm, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    index === 0 ? "bg-[var(--agri-light-green)]" : "bg-accent"
                  }`}
                >
                  <div>
                    <p className="font-medium text-sm">{farm.name}</p>
                    <p className="text-xs text-muted-foreground">{farm.location}</p>
                  </div>
                  <span className="text-lg font-bold text-[var(--agri-green)]">{farm.yield} t/ha</span>
                </div>
              ))}
              {analytics.topFarms.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No predictions available yet. Generate predictions to see top performing farms.
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Soil Health Records</CardTitle>
              <CardDescription>Total soil test data collected</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-[var(--agri-green)]">{analytics.totalSoilRecords}</div>
              <p className="text-sm text-muted-foreground mt-2">
                Tracking pH, nitrogen, carbon, and other soil parameters
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Weather Data Points</CardTitle>
              <CardDescription>Total weather records collected</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-blue-600">{analytics.totalWeatherRecords}</div>
              <p className="text-sm text-muted-foreground mt-2">Temperature, rainfall, and humidity measurements</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Real-Time Data Integration</CardTitle>
            <CardDescription>All analytics update automatically as you add new data</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              This dashboard displays live data from your farms, soil tests, weather records, and AI predictions. Add
              new data through the Data Entry page or generate predictions to see the analytics update in real-time.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
