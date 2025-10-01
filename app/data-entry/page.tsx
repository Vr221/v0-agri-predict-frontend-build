"use client"
import { Button } from "@/components/ui/button"
import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Database, TestTube, Cloud, Upload, Download, TrendingUp, ChevronLeft } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

export default function DataEntryPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [activeTab, setActiveTab] = useState("soil")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
      console.log("[v0] File selected:", e.target.files[0].name)
    }
  }

  const handleSoilSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Submitting soil data")
    alert("Soil data submitted successfully!")
  }

  const handleWeatherSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Submitting weather data")
    alert("Weather data submitted successfully!")
  }

  const handleBulkUpload = () => {
    if (selectedFile) {
      console.log("[v0] Uploading file:", selectedFile.name)
      alert(`Uploading ${selectedFile.name}...`)
    } else {
      alert("Please select a file first")
    }
  }

  return (
    <div className="min-h-screen bg-[var(--agri-light-green)] p-4 sm:p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <Link href="/">
          <Button variant="ghost" className="mb-4">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>

        <div className="flex items-start gap-4">
          <Database className="h-8 w-8 sm:h-10 sm:w-10 text-[var(--agri-green)] mt-1 flex-shrink-0" />
          <div className="flex-1">
            <h1 className="text-3xl sm:text-4xl font-bold text-[var(--agri-green)]">Data Entry & Management</h1>
            <p className="text-[var(--agri-green)] mt-1 text-sm sm:text-base">
              Add soil, weather, and historical data for accurate AI predictions
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Card className="border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium text-[var(--agri-green)]">Registered Farms</CardTitle>
              <TrendingUp className="h-5 w-5 text-[var(--agri-green)]" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">6</div>
              <p className="text-xs text-[var(--agri-green)] mt-1">Records available</p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium text-[var(--agri-green)]">Soil Test Records</CardTitle>
              <TestTube className="h-5 w-5 text-[var(--agri-orange)]" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">4</div>
              <p className="text-xs text-[var(--agri-green)] mt-1">Records available</p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white">
            <TabsTrigger
              value="soil"
              className="data-[state=active]:bg-[var(--agri-light-green)] data-[state=active]:text-[var(--agri-green)] text-xs sm:text-sm"
            >
              Soil Data
            </TabsTrigger>
            <TabsTrigger
              value="weather"
              className="data-[state=active]:bg-[var(--agri-light-green)] data-[state=active]:text-[var(--agri-green)] text-xs sm:text-sm"
            >
              Weather Data
            </TabsTrigger>
            <TabsTrigger
              value="bulk"
              className="data-[state=active]:bg-[var(--agri-light-green)] data-[state=active]:text-[var(--agri-green)] text-xs sm:text-sm"
            >
              Bulk Upload
            </TabsTrigger>
          </TabsList>

          <TabsContent value="soil" className="space-y-4">
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[var(--agri-green)]">
                  <TestTube className="h-5 w-5 text-[var(--agri-orange)]" />
                  Soil Health Data Entry
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSoilSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="farm" className="text-[var(--agri-green)]">
                      Select Farm *
                    </Label>
                    <Select required>
                      <SelectTrigger id="farm">
                        <SelectValue placeholder="Choose a farm" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="farm1">Sunrise Agriculture - Cuttack, Cuttack, Odisha</SelectItem>
                        <SelectItem value="farm2">Green Valley Farm - Bhubaneswar, Khordha, Odisha</SelectItem>
                        <SelectItem value="farm3">Harvest Hope Farm - Balasore, Balasore, Odisha</SelectItem>
                        <SelectItem value="farm4">Golden Fields - Puri, Puri, Odisha</SelectItem>
                        <SelectItem value="farm5">Prosperity Crops - Sambalpur, Sambalpur, Odisha</SelectItem>
                        <SelectItem value="farm6">mfarm1 - Sambalpur, Odisha</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="testDate" className="text-[var(--agri-green)]">
                      Test Date *
                    </Label>
                    <Input id="testDate" type="date" required defaultValue="2025-10-01" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ph" className="text-[var(--agri-green)]">
                      pH Level (0-14)
                    </Label>
                    <Input id="ph" type="number" step="0.1" min="0" max="14" placeholder="e.g., 6.5" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="carbon" className="text-[var(--agri-green)]">
                      Organic Carbon (%)
                    </Label>
                    <Input id="carbon" type="number" step="0.01" placeholder="e.g., 1.25" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="nitrogen" className="text-[var(--agri-green)]">
                      Available Nitrogen (kg/ha)
                    </Label>
                    <Input id="nitrogen" type="number" placeholder="e.g., 245" />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[var(--agri-green)] hover:bg-[var(--agri-green)]/90 text-white"
                  >
                    Submit Soil Data
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="weather" className="space-y-4">
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[var(--agri-green)]">
                  <Cloud className="h-5 w-5 text-blue-500" />
                  Weather Data Entry
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleWeatherSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="weatherFarm" className="text-[var(--agri-green)]">
                      Select Farm *
                    </Label>
                    <Select required>
                      <SelectTrigger id="weatherFarm">
                        <SelectValue placeholder="Choose a farm" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="farm1">Sunrise Agriculture - Cuttack, Cuttack, Odisha</SelectItem>
                        <SelectItem value="farm2">Green Valley Farm - Bhubaneswar, Khordha, Odisha</SelectItem>
                        <SelectItem value="farm3">Harvest Hope Farm - Balasore, Balasore, Odisha</SelectItem>
                        <SelectItem value="farm4">Golden Fields - Puri, Puri, Odisha</SelectItem>
                        <SelectItem value="farm5">Prosperity Crops - Sambalpur, Sambalpur, Odisha</SelectItem>
                        <SelectItem value="farm6">mfarm1 - Sambalpur, Odisha</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="weatherDate" className="text-[var(--agri-green)]">
                      Date *
                    </Label>
                    <Input id="weatherDate" type="date" required defaultValue="2025-10-01" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maxTemp" className="text-[var(--agri-green)]">
                      Maximum Temperature (°C)
                    </Label>
                    <Input id="maxTemp" type="number" step="0.1" placeholder="e.g., 35.5" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="minTemp" className="text-[var(--agri-green)]">
                      Minimum Temperature (°C)
                    </Label>
                    <Input id="minTemp" type="number" step="0.1" placeholder="e.g., 22.3" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="rainfall" className="text-[var(--agri-green)]">
                      Rainfall (mm)
                    </Label>
                    <Input id="rainfall" type="number" step="0.1" placeholder="e.g., 12.5" />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[var(--agri-green)] hover:bg-[var(--agri-green)]/90 text-white"
                  >
                    Submit Weather Data
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bulk" className="space-y-4">
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[var(--agri-green)]">
                  <Upload className="h-5 w-5 text-[var(--agri-purple)]" />
                  Historical Data Upload
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Card className="bg-[var(--agri-light-purple)] border-none">
                  <CardHeader>
                    <CardTitle className="text-xl text-center text-[var(--agri-purple)]">
                      Upload CSV/Excel Files
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-[var(--agri-purple)]">Select File</Label>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                        <Input
                          type="file"
                          accept=".csv,.xlsx,.xls"
                          onChange={handleFileChange}
                          className="flex-1 bg-white"
                        />
                        <span className="text-sm text-[var(--agri-purple)]">
                          {selectedFile ? selectedFile.name : "no file selected"}
                        </span>
                      </div>
                    </div>

                    <p className="text-sm text-[var(--agri-purple)]">Supported formats: CSV, Excel (.xlsx, .xls)</p>

                    <Button
                      onClick={handleBulkUpload}
                      className="w-full bg-[var(--agri-purple)] hover:bg-[var(--agri-purple)]/90 text-white"
                    >
                      Upload & Process Data
                    </Button>
                  </CardContent>
                </Card>

                <Button
                  variant="outline"
                  className="w-full border-[var(--agri-green)] text-[var(--agri-green)] bg-transparent hover:bg-[var(--agri-light-green)]"
                  onClick={() => {
                    console.log("[v0] Downloading template")
                    alert("Downloading CSV template...")
                  }}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Template
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
