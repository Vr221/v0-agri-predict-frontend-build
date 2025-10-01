"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Cloud,
  CloudRain,
  Sun,
  Wind,
  Droplets,
  Thermometer,
  Gauge,
  ChevronLeft,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  Tractor,
  Wheat,
  Sprout,
} from "lucide-react"
import Link from "next/link"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useLanguage } from "@/lib/language-context"
import { odishaDistricts, type District } from "@/lib/odisha-districts"

interface WeatherData {
  current: {
    temperature: number
    humidity: number
    windSpeed: number
    weatherCode: number
    precipitation: number
    pressure: number
    visibility: number
  }
  hourly: {
    time: string[]
    temperature: number[]
    precipitation: number[]
    humidity: number[]
  }
  daily: {
    time: string[]
    temperatureMax: number[]
    temperatureMin: number[]
    precipitation: number[]
    weatherCode: number[]
  }
}

const getWeatherIcon = (code: number) => {
  if (code === 0) return <Sun className="h-8 w-8 text-yellow-500" />
  if (code <= 3) return <Cloud className="h-8 w-8 text-gray-500" />
  if (code <= 67) return <CloudRain className="h-8 w-8 text-blue-500" />
  return <Cloud className="h-8 w-8 text-gray-500" />
}

export default function WeatherForecastPage() {
  const { language, t } = useLanguage()
  const [selectedDistrict, setSelectedDistrict] = useState<District>(odishaDistricts[0])
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getDistrictName = (district: District) => {
    if (language === "hi") return district.nameHindi
    if (language === "or") return district.nameOdia
    return district.name
  }

  const getWeatherDescription = (code: number) => {
    if (code === 0) return t("clearSky")
    if (code <= 3) return t("partlyCloudy")
    if (code <= 67) return t("rainy")
    if (code <= 77) return t("snow")
    return t("thunderstorm")
  }

  const fetchWeatherData = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${selectedDistrict.lat}&longitude=${selectedDistrict.lon}&current=temperature_2m,relative_humidity_2m,precipitation,weather_code,surface_pressure,wind_speed_10m,visibility&hourly=temperature_2m,precipitation,relative_humidity_2m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=Asia/Kolkata&forecast_days=7`,
      )

      if (!response.ok) throw new Error("Failed to fetch weather data")

      const data = await response.json()

      setWeatherData({
        current: {
          temperature: data.current.temperature_2m,
          humidity: data.current.relative_humidity_2m,
          windSpeed: data.current.wind_speed_10m,
          weatherCode: data.current.weather_code,
          precipitation: data.current.precipitation,
          pressure: data.current.surface_pressure,
          visibility: data.current.visibility / 1000,
        },
        hourly: {
          time: data.hourly.time.slice(0, 24),
          temperature: data.hourly.temperature_2m.slice(0, 24),
          precipitation: data.hourly.precipitation.slice(0, 24),
          humidity: data.hourly.relative_humidity_2m.slice(0, 24),
        },
        daily: {
          time: data.daily.time,
          temperatureMax: data.daily.temperature_2m_max,
          temperatureMin: data.daily.temperature_2m_min,
          precipitation: data.daily.precipitation_sum,
          weatherCode: data.daily.weather_code,
        },
      })
    } catch (err) {
      setError("Unable to fetch weather data. Please try again.")
      console.error("[v0] Weather fetch error:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWeatherData()
  }, [selectedDistrict])

  const getAgriculturalSuggestions = () => {
    if (!weatherData) return []

    const suggestions = []
    const temp = weatherData.current.temperature
    const humidity = weatherData.current.humidity
    const precipitation = weatherData.current.precipitation
    const nextDayRain = weatherData.daily.precipitation[1] || 0

    if (temp > 35) {
      suggestions.push({
        type: "warning",
        icon: <AlertTriangle className="h-5 w-5" />,
        title: t("highTempAlert"),
        message: t("highTempMessage"),
      })
    } else if (temp < 15) {
      suggestions.push({
        type: "warning",
        icon: <AlertTriangle className="h-5 w-5" />,
        title: t("lowTempAlert"),
        message: t("lowTempMessage"),
      })
    } else {
      suggestions.push({
        type: "success",
        icon: <CheckCircle2 className="h-5 w-5" />,
        title: t("optimalTemp"),
        message: t("optimalTempMessage"),
      })
    }

    if (precipitation > 10) {
      suggestions.push({
        type: "warning",
        icon: <CloudRain className="h-5 w-5" />,
        title: t("heavyRainfall"),
        message: t("heavyRainfallMessage"),
      })
    } else if (nextDayRain > 5) {
      suggestions.push({
        type: "info",
        icon: <Droplets className="h-5 w-5" />,
        title: t("rainExpected"),
        message: t("rainExpectedMessage"),
      })
    } else if (precipitation === 0 && nextDayRain === 0) {
      suggestions.push({
        type: "info",
        icon: <Sun className="h-5 w-5" />,
        title: t("dryWeather"),
        message: t("dryWeatherMessage"),
      })
    }

    if (humidity > 80) {
      suggestions.push({
        type: "warning",
        icon: <Droplets className="h-5 w-5" />,
        title: t("highHumidity"),
        message: t("highHumidityMessage"),
      })
    }

    if (weatherData.current.windSpeed > 30) {
      suggestions.push({
        type: "warning",
        icon: <Wind className="h-5 w-5" />,
        title: t("strongWinds"),
        message: t("strongWindsMessage"),
      })
    }

    if (temp >= 20 && temp <= 30 && humidity >= 50 && humidity <= 70 && precipitation === 0) {
      suggestions.push({
        type: "success",
        icon: <Tractor className="h-5 w-5" />,
        title: t("idealConditions"),
        message: t("idealConditionsMessage"),
      })
    }

    return suggestions
  }

  const getSoilDataByLanguage = () => {
    const soil = selectedDistrict.soilData
    if (language === "hi") {
      return {
        type: soil.typeHindi,
        crops: soil.suitableCropsHindi,
        recommendations: soil.recommendationsHindi,
      }
    } else if (language === "or") {
      return {
        type: soil.typeOdia,
        crops: soil.suitableCropsOdia,
        recommendations: soil.recommendationsOdia,
      }
    }
    return {
      type: soil.type,
      crops: soil.suitableCrops,
      recommendations: soil.recommendations,
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <Link href="/">
          <Button variant="ghost" className="mb-4">
            <ChevronLeft className="h-4 w-4 mr-2" />
            {t("backToDashboard")}
          </Button>
        </Link>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <Cloud className="h-10 w-10 text-blue-600 mt-1 flex-shrink-0" />
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-blue-900">{t("weatherForecastTitle")}</h1>
              <p className="text-blue-700 mt-1">{t("realTimeWeather")}</p>
            </div>
          </div>
          <Button onClick={fetchWeatherData} disabled={loading} className="bg-blue-600 hover:bg-blue-700">
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            {t("refresh")}
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t("selectDistrict")}</CardTitle>
            <CardDescription>{t("chooseDistrict")}</CardDescription>
          </CardHeader>
          <CardContent>
            <Select
              value={selectedDistrict.name}
              onValueChange={(value) => {
                const district = odishaDistricts.find((d) => d.name === value)
                if (district) setSelectedDistrict(district)
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {odishaDistricts.map((district) => (
                  <SelectItem key={district.name} value={district.name}>
                    {getDistrictName(district)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {error && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {loading && (
          <Card>
            <CardContent className="flex items-center justify-center py-12">
              <RefreshCw className="h-8 w-8 animate-spin text-blue-600" />
            </CardContent>
          </Card>
        )}

        {weatherData && !loading && (
          <>
            {/* Current Weather */}
            <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
              <CardHeader>
                <CardTitle className="text-white">{t("currentWeatherTitle")}</CardTitle>
                <CardDescription className="text-blue-100">
                  {getDistrictName(selectedDistrict)} -{" "}
                  {new Date().toLocaleDateString(language === "hi" ? "hi-IN" : language === "or" ? "or-IN" : "en-IN", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    {getWeatherIcon(weatherData.current.weatherCode)}
                    <div>
                      <div className="text-5xl font-bold">{Math.round(weatherData.current.temperature)}°C</div>
                      <div className="text-blue-100 text-lg">
                        {getWeatherDescription(weatherData.current.weatherCode)}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 w-full sm:w-auto">
                    <div className="flex items-center gap-2">
                      <Droplets className="h-5 w-5" />
                      <div>
                        <div className="text-sm text-blue-100">{t("humidity")}</div>
                        <div className="font-semibold">{weatherData.current.humidity}%</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Wind className="h-5 w-5" />
                      <div>
                        <div className="text-sm text-blue-100">{t("windSpeed")}</div>
                        <div className="font-semibold">{Math.round(weatherData.current.windSpeed)} km/h</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <CloudRain className="h-5 w-5" />
                      <div>
                        <div className="text-sm text-blue-100">{t("precipitation")}</div>
                        <div className="font-semibold">{weatherData.current.precipitation} mm</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Gauge className="h-5 w-5" />
                      <div>
                        <div className="text-sm text-blue-100">{t("pressure")}</div>
                        <div className="font-semibold">{Math.round(weatherData.current.pressure)} hPa</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Soil Data */}
            <Card className="border-amber-200 bg-amber-50">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Sprout className="h-6 w-6 text-amber-700" />
                  <CardTitle className="text-amber-900">{t("soilData")}</CardTitle>
                </div>
                <CardDescription>
                  {t("soilInformation")} {getDistrictName(selectedDistrict)}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-white rounded-lg border border-amber-200">
                    <p className="text-sm font-semibold text-amber-900 mb-1">{t("soilType")}</p>
                    <p className="text-amber-800">{getSoilDataByLanguage().type}</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg border border-amber-200">
                    <p className="text-sm font-semibold text-amber-900 mb-1">{t("soilPH")}</p>
                    <p className="text-amber-800">{selectedDistrict.soilData.ph}</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg border border-amber-200">
                    <p className="text-sm font-semibold text-amber-900 mb-1">{t("organicCarbon")}</p>
                    <p className="text-amber-800">{selectedDistrict.soilData.organicCarbon}</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg border border-amber-200">
                    <p className="text-sm font-semibold text-amber-900 mb-1">{t("nitrogen")}</p>
                    <p className="text-amber-800">{selectedDistrict.soilData.nitrogen}</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg border border-amber-200">
                    <p className="text-sm font-semibold text-amber-900 mb-1">{t("phosphorus")}</p>
                    <p className="text-amber-800">{selectedDistrict.soilData.phosphorus}</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg border border-amber-200">
                    <p className="text-sm font-semibold text-amber-900 mb-1">{t("potassium")}</p>
                    <p className="text-amber-800">{selectedDistrict.soilData.potassium}</p>
                  </div>
                </div>
                <div className="p-4 bg-white rounded-lg border border-amber-200">
                  <p className="text-sm font-semibold text-amber-900 mb-2">{t("suitableCrops")}</p>
                  <div className="flex flex-wrap gap-2">
                    {getSoilDataByLanguage().crops.map((crop, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium"
                      >
                        {crop}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-4 bg-white rounded-lg border border-amber-200">
                  <p className="text-sm font-semibold text-amber-900 mb-2">{t("recommendations")}</p>
                  <p className="text-amber-800">{getSoilDataByLanguage().recommendations}</p>
                </div>
              </CardContent>
            </Card>

            {/* Agricultural Suggestions */}
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Wheat className="h-6 w-6 text-green-700" />
                  <CardTitle className="text-green-900">{t("agriculturalRecommendations")}</CardTitle>
                </div>
                <CardDescription>{t("aiPoweredSuggestions")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {getAgriculturalSuggestions().map((suggestion, index) => (
                  <Alert
                    key={index}
                    className={
                      suggestion.type === "warning"
                        ? "border-orange-300 bg-orange-50"
                        : suggestion.type === "success"
                          ? "border-green-300 bg-green-50"
                          : "border-blue-300 bg-blue-50"
                    }
                  >
                    <div
                      className={
                        suggestion.type === "warning"
                          ? "text-orange-600"
                          : suggestion.type === "success"
                            ? "text-green-600"
                            : "text-blue-600"
                      }
                    >
                      {suggestion.icon}
                    </div>
                    <AlertTitle
                      className={
                        suggestion.type === "warning"
                          ? "text-orange-900"
                          : suggestion.type === "success"
                            ? "text-green-900"
                            : "text-blue-900"
                      }
                    >
                      {suggestion.title}
                    </AlertTitle>
                    <AlertDescription
                      className={
                        suggestion.type === "warning"
                          ? "text-orange-800"
                          : suggestion.type === "success"
                            ? "text-green-800"
                            : "text-blue-800"
                      }
                    >
                      {suggestion.message}
                    </AlertDescription>
                  </Alert>
                ))}
              </CardContent>
            </Card>

            {/* 7-Day Forecast */}
            <Card>
              <CardHeader>
                <CardTitle>{t("sevenDayForecast")}</CardTitle>
                <CardDescription>{t("extendedOutlook")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
                  {weatherData.daily.time.map((date, index) => (
                    <div
                      key={date}
                      className="flex flex-col items-center p-4 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200"
                    >
                      <div className="text-sm font-medium text-blue-900">
                        {new Date(date).toLocaleDateString(
                          language === "hi" ? "hi-IN" : language === "or" ? "or-IN" : "en-IN",
                          { weekday: "short" },
                        )}
                      </div>
                      <div className="text-xs text-blue-700 mb-2">
                        {new Date(date).toLocaleDateString(
                          language === "hi" ? "hi-IN" : language === "or" ? "or-IN" : "en-IN",
                          { month: "short", day: "numeric" },
                        )}
                      </div>
                      {getWeatherIcon(weatherData.daily.weatherCode[index])}
                      <div className="mt-2 text-center">
                        <div className="text-lg font-bold text-blue-900">
                          {Math.round(weatherData.daily.temperatureMax[index])}°
                        </div>
                        <div className="text-sm text-blue-600">
                          {Math.round(weatherData.daily.temperatureMin[index])}°
                        </div>
                      </div>
                      <div className="flex items-center gap-1 mt-2 text-xs text-blue-700">
                        <CloudRain className="h-3 w-3" />
                        {Math.round(weatherData.daily.precipitation[index])} mm
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Hourly Forecast */}
            <Card>
              <CardHeader>
                <CardTitle>{t("hourlyForecast")}</CardTitle>
                <CardDescription>{t("hourlyBreakdown")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <div className="flex gap-2 min-w-max pb-2">
                    {weatherData.hourly.time.map((time, index) => {
                      const hour = new Date(time).getHours()
                      return (
                        <div
                          key={time}
                          className="flex flex-col items-center p-3 rounded-lg bg-blue-50 border border-blue-200 min-w-[80px]"
                        >
                          <div className="text-xs font-medium text-blue-900">
                            {hour === 0
                              ? "12 AM"
                              : hour < 12
                                ? `${hour} AM`
                                : hour === 12
                                  ? "12 PM"
                                  : `${hour - 12} PM`}
                          </div>
                          <Thermometer className="h-5 w-5 text-blue-600 my-2" />
                          <div className="text-sm font-bold text-blue-900">
                            {Math.round(weatherData.hourly.temperature[index])}°C
                          </div>
                          <div className="flex items-center gap-1 mt-2 text-xs text-blue-700">
                            <CloudRain className="h-3 w-3" />
                            {weatherData.hourly.precipitation[index]} mm
                          </div>
                          <div className="flex items-center gap-1 mt-1 text-xs text-blue-600">
                            <Droplets className="h-3 w-3" />
                            {weatherData.hourly.humidity[index]}%
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Data Source Info */}
            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-blue-900">
                    <p className="font-semibold mb-1">{t("dataSource")}</p>
                    <p className="text-blue-700">{t("dataSourceInfo")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  )
}
