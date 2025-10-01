"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertTriangle, RefreshCw, Database, ChevronLeft } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"

export default function GovernmentDataPage() {
  const [selectedDistrict, setSelectedDistrict] = useState("Cuttack")
  const [weatherLoading, setWeatherLoading] = useState(false)
  const [soilLoading, setSoilLoading] = useState(false)

  const handleWeatherRetry = () => {
    setWeatherLoading(true)
    setTimeout(() => setWeatherLoading(false), 2000)
  }

  const handleSoilRetry = () => {
    setSoilLoading(true)
    setTimeout(() => setSoilLoading(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <Link href="/">
          <Button variant="ghost" className="mb-4">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>

        <div className="flex items-start gap-4">
          <Database className="h-8 w-8 sm:h-10 sm:w-10 text-blue-600 mt-1 flex-shrink-0" />
          <div className="flex-1">
            <h1 className="text-3xl sm:text-4xl font-bold text-blue-900">Odisha Government Data Portal</h1>
            <p className="text-blue-700 mt-1 text-sm sm:text-base">
              Access official weather and soil data from government sources
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-blue-900">Select District</CardTitle>
            <CardDescription>Choose a district to fetch government data</CardDescription>
          </CardHeader>
          <CardContent>
            <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select district" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Cuttack">Cuttack</SelectItem>
                <SelectItem value="Bhubaneswar">Bhubaneswar</SelectItem>
                <SelectItem value="Puri">Puri</SelectItem>
                <SelectItem value="Khordha">Khordha</SelectItem>
                <SelectItem value="Balasore">Balasore</SelectItem>
                <SelectItem value="Sambalpur">Sambalpur</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Alert variant="destructive" className="bg-red-50 border-red-200">
          <AlertTriangle className="h-5 w-5 text-red-600" />
          <AlertDescription className="text-red-800">
            <p className="font-semibold mb-2">Unable to fetch weather data from Government API.</p>
            <p className="text-sm mb-3">Please try again.</p>
            <Button
              variant="outline"
              size="sm"
              onClick={handleWeatherRetry}
              disabled={weatherLoading}
              className="border-red-300 text-red-700 hover:bg-red-100 bg-transparent"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${weatherLoading ? "animate-spin" : ""}`} />
              Retry
            </Button>
          </AlertDescription>
        </Alert>

        <Alert variant="destructive" className="bg-red-50 border-red-200">
          <AlertTriangle className="h-5 w-5 text-red-600" />
          <AlertDescription className="text-red-800">
            <p className="font-semibold mb-2">Unable to fetch soil data from Government API.</p>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSoilRetry}
              disabled={soilLoading}
              className="border-red-300 text-red-700 hover:bg-red-100 bg-transparent"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${soilLoading ? "animate-spin" : ""}`} />
              Retry
            </Button>
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle className="text-blue-900">About Government Data Portal</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              This portal integrates with official Odisha Government APIs to provide real-time weather and soil data for
              agricultural planning.
            </p>
            <p>Data sources include:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>India Meteorological Department (IMD)</li>
              <li>Odisha State Agriculture Department</li>
              <li>National Bureau of Soil Survey</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
