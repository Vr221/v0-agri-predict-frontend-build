"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Brain, Database, TrendingUp, CloudSun, Droplets, Wind, ArrowRight, RefreshCw } from "lucide-react"
import { useDataStore } from "@/lib/data-store"
import { useLanguage } from "@/lib/language-context"

interface CurrentWeather {
  temperature: number
  humidity: number
  windSpeed: number
  location: string
}

export default function HomePage() {
  const [weather, setWeather] = useState<CurrentWeather | null>(null)
  const [weatherLoading, setWeatherLoading] = useState(true)
  const { farms, predictions, soilData, weatherData, activities } = useDataStore()
  const { t } = useLanguage()

  useEffect(() => {
    fetchWeather()
  }, [])

  const fetchWeather = async () => {
    setWeatherLoading(true)
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=20.5&longitude=85.88&current=temperature_2m,relative_humidity_2m,wind_speed_10m&timezone=Asia/Kolkata`,
      )
      const data = await response.json()
      setWeather({
        temperature: Math.round(data.current.temperature_2m),
        humidity: data.current.relative_humidity_2m,
        windSpeed: Math.round(data.current.wind_speed_10m),
        location: "Cuttack, Odisha",
      })
    } catch (error) {
      console.error("[v0] Weather fetch error:", error)
    } finally {
      setWeatherLoading(false)
    }
  }

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">{t.dashboard.welcome}</h1>
        <p className="text-muted-foreground mt-1 text-sm sm:text-base">{t.dashboard.subtitle}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t.dashboard.totalFarms}</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[var(--agri-green)]">{farms.length}</div>
            <p className="text-xs text-muted-foreground">Across Odisha</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Crops</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[var(--agri-green)]">
              {new Set(predictions.map((p) => p.crop)).size || 7}
            </div>
            <p className="text-xs text-muted-foreground">Currently growing</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t.dashboard.predictions}</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[var(--agri-purple)]">{predictions.length}</div>
            <p className="text-xs text-muted-foreground">Total generated</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t.dashboard.dataRecords}</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[var(--agri-green)]">{soilData.length + weatherData.length}</div>
            <p className="text-xs text-muted-foreground">Soil & weather data</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CloudSun className="h-6 w-6" />
              <CardTitle className="text-white">Current Weather</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={fetchWeather}
              disabled={weatherLoading}
              className="text-white hover:bg-blue-700"
            >
              <RefreshCw className={`h-4 w-4 ${weatherLoading ? "animate-spin" : ""}`} />
            </Button>
          </div>
          <CardDescription className="text-blue-100">{weather?.location || "Loading..."}</CardDescription>
        </CardHeader>
        <CardContent>
          {weatherLoading ? (
            <div className="flex items-center justify-center py-8">
              <RefreshCw className="h-8 w-8 animate-spin" />
            </div>
          ) : weather ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-5xl font-bold">{weather.temperature}°C</div>
                  <div className="text-blue-100 text-sm mt-1">Real-time temperature</div>
                </div>
                <CloudSun className="h-16 w-16 opacity-80" />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-blue-400">
                <div className="flex items-center gap-2">
                  <Droplets className="h-5 w-5" />
                  <div>
                    <div className="text-sm text-blue-100">Humidity</div>
                    <div className="font-semibold">{weather.humidity}%</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Wind className="h-5 w-5" />
                  <div>
                    <div className="text-sm text-blue-100">Wind Speed</div>
                    <div className="font-semibold">{weather.windSpeed} km/h</div>
                  </div>
                </div>
              </div>

              <Link href="/weather-forecast" className="block">
                <Button className="w-full bg-white text-blue-600 hover:bg-blue-50 mt-4">
                  View Full Forecast
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-blue-100">Unable to load weather data</p>
              <Button variant="ghost" onClick={fetchWeather} className="mt-2 text-white hover:bg-blue-700">
                Try Again
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

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
                {t.nav.farms}
              </Button>
            </Link>
            <Link href="/data-entry">
              <Button
                className="w-full justify-start bg-transparent hover:bg-[var(--agri-light-green)]"
                variant="outline"
              >
                <Database className="mr-2 h-4 w-4" />
                {t.nav.dataEntry}
              </Button>
            </Link>
            <Link href="/weather-forecast">
              <Button
                className="w-full justify-start bg-transparent hover:bg-[var(--agri-light-green)]"
                variant="outline"
              >
                <CloudSun className="mr-2 h-4 w-4" />
                {t.nav.weather}
              </Button>
            </Link>
            <Link href="/predictions">
              <Button
                className="w-full justify-start bg-transparent hover:bg-[var(--agri-light-green)]"
                variant="outline"
              >
                <Brain className="mr-2 h-4 w-4" />
                {t.nav.predictions}
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
            {activities.slice(0, 3).map((activity) => (
              <div key={activity.id} className="flex items-start gap-3">
                <div
                  className={`h-2 w-2 rounded-full mt-2 flex-shrink-0 ${
                    activity.type === "prediction"
                      ? "bg-[var(--agri-green)]"
                      : activity.type === "soil_data"
                        ? "bg-[var(--agri-purple)]"
                        : "bg-[var(--agri-orange)]"
                  }`}
                />
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.message}</p>
                  <p className="text-xs text-muted-foreground">
                    {activity.farmName} - {new Date(activity.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
            {activities.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">No recent activity</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
