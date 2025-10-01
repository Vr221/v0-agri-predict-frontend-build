"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export interface Farm {
  id: number
  name: string
  location: string
  district: string
  area: number
  soil: string
  irrigation: string
  createdAt: Date
}

export interface SoilData {
  id: number
  farmId: number
  farmName: string
  testDate: Date
  ph: number
  organicCarbon: number
  nitrogen: number
  phosphorus?: number
  potassium?: number
}

export interface WeatherData {
  id: number
  farmId: number
  farmName: string
  date: Date
  maxTemp: number
  minTemp: number
  rainfall: number
  humidity?: number
}

export interface Prediction {
  id: number
  farmId: number
  farmName: string
  crop: string
  predictedYield: number
  confidence: number
  date: Date
  factors: {
    soilHealth: number
    weatherConditions: number
    historicalData: number
  }
}

export interface Activity {
  id: number
  type: "prediction" | "soil_data" | "weather_data" | "farm_added" | "weather_alert"
  message: string
  timestamp: Date
  farmName?: string
}

interface DataStoreContextType {
  farms: Farm[]
  soilData: SoilData[]
  weatherData: WeatherData[]
  predictions: Prediction[]
  activities: Activity[]
  addFarm: (farm: Omit<Farm, "id" | "createdAt">) => void
  updateFarm: (id: number, farm: Partial<Farm>) => void
  deleteFarm: (id: number) => void
  addSoilData: (data: Omit<SoilData, "id">) => void
  addWeatherData: (data: Omit<WeatherData, "id">) => void
  addPrediction: (prediction: Omit<Prediction, "id" | "date">) => void
  getAnalytics: () => {
    totalFarms: number
    totalPredictions: number
    totalSoilRecords: number
    totalWeatherRecords: number
    avgYield: number
    avgRainfall: number
    avgTemperature: number
    topFarms: Array<{ name: string; location: string; yield: number }>
    seasonalTrends: Array<{ season: string; yield: number; percentage: number }>
    recentActivities: Activity[]
  }
}

const DataStoreContext = createContext<DataStoreContextType | undefined>(undefined)

const initialFarms: Farm[] = [
  {
    id: 1,
    name: "Sunrise Agriculture",
    location: "Cuttack",
    district: "Cuttack",
    area: 1.8,
    soil: "Alluvial",
    irrigation: "Canal",
    createdAt: new Date("2025-01-15"),
  },
  {
    id: 2,
    name: "Green Valley Farm",
    location: "Bhubaneswar",
    district: "Khordha",
    area: 2.5,
    soil: "Red Soil",
    irrigation: "Drip",
    createdAt: new Date("2025-02-20"),
  },
  {
    id: 3,
    name: "Harvest Hope Farm",
    location: "Balasore",
    district: "Balasore",
    area: 3.2,
    soil: "Laterite",
    irrigation: "Sprinkler",
    createdAt: new Date("2025-03-10"),
  },
  {
    id: 4,
    name: "Golden Fields",
    location: "Puri",
    district: "Puri",
    area: 2.0,
    soil: "Coastal Alluvial",
    irrigation: "Canal",
    createdAt: new Date("2025-04-05"),
  },
  {
    id: 5,
    name: "Prosperity Crops",
    location: "Sambalpur",
    district: "Sambalpur",
    area: 4.5,
    soil: "Red & Yellow",
    irrigation: "Rainfed",
    createdAt: new Date("2025-05-12"),
  },
  {
    id: 6,
    name: "Heritage Farms",
    location: "Ganjam",
    district: "Ganjam",
    area: 3.8,
    soil: "Mixed Red",
    irrigation: "Drip",
    createdAt: new Date("2025-06-18"),
  },
]

const initialSoilData: SoilData[] = [
  {
    id: 1,
    farmId: 1,
    farmName: "Sunrise Agriculture",
    testDate: new Date("2025-09-15"),
    ph: 6.5,
    organicCarbon: 1.25,
    nitrogen: 245,
    phosphorus: 18,
    potassium: 210,
  },
  {
    id: 2,
    farmId: 2,
    farmName: "Green Valley Farm",
    testDate: new Date("2025-09-20"),
    ph: 6.8,
    organicCarbon: 1.45,
    nitrogen: 268,
    phosphorus: 22,
    potassium: 235,
  },
  {
    id: 3,
    farmId: 3,
    farmName: "Harvest Hope Farm",
    testDate: new Date("2025-09-22"),
    ph: 6.2,
    organicCarbon: 1.15,
    nitrogen: 230,
    phosphorus: 16,
    potassium: 195,
  },
  {
    id: 4,
    farmId: 4,
    farmName: "Golden Fields",
    testDate: new Date("2025-09-25"),
    ph: 7.0,
    organicCarbon: 1.35,
    nitrogen: 255,
    phosphorus: 20,
    potassium: 220,
  },
]

const initialWeatherData: WeatherData[] = [
  {
    id: 1,
    farmId: 1,
    farmName: "Sunrise Agriculture",
    date: new Date("2025-09-28"),
    maxTemp: 32.5,
    minTemp: 24.2,
    rainfall: 12.5,
    humidity: 78,
  },
  {
    id: 2,
    farmId: 2,
    farmName: "Green Valley Farm",
    date: new Date("2025-09-28"),
    maxTemp: 31.8,
    minTemp: 23.5,
    rainfall: 8.3,
    humidity: 75,
  },
  {
    id: 3,
    farmId: 3,
    farmName: "Harvest Hope Farm",
    date: new Date("2025-09-29"),
    maxTemp: 33.2,
    minTemp: 25.0,
    rainfall: 15.2,
    humidity: 82,
  },
]

const initialPredictions: Prediction[] = [
  {
    id: 1,
    farmId: 1,
    farmName: "Sunrise Agriculture",
    crop: "Rice",
    predictedYield: 5.2,
    confidence: 92,
    date: new Date("2025-09-28"),
    factors: { soilHealth: 88, weatherConditions: 95, historicalData: 90 },
  },
  {
    id: 2,
    farmId: 2,
    farmName: "Green Valley Farm",
    crop: "Wheat",
    predictedYield: 4.8,
    confidence: 88,
    date: new Date("2025-09-25"),
    factors: { soilHealth: 90, weatherConditions: 85, historicalData: 88 },
  },
  {
    id: 3,
    farmId: 3,
    farmName: "Harvest Hope Farm",
    crop: "Maize",
    predictedYield: 4.6,
    confidence: 85,
    date: new Date("2025-09-22"),
    factors: { soilHealth: 82, weatherConditions: 88, historicalData: 85 },
  },
]

export function DataStoreProvider({ children }: { children: ReactNode }) {
  const [farms, setFarms] = useState<Farm[]>(initialFarms)
  const [soilData, setSoilData] = useState<SoilData[]>(initialSoilData)
  const [weatherData, setWeatherData] = useState<WeatherData[]>(initialWeatherData)
  const [predictions, setPredictions] = useState<Prediction[]>(initialPredictions)
  const [activities, setActivities] = useState<Activity[]>([
    {
      id: 1,
      type: "prediction",
      message: "New prediction generated",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      farmName: "Sunrise Agriculture",
    },
    {
      id: 2,
      type: "soil_data",
      message: "Soil data updated",
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      farmName: "Green Valley Farm",
    },
    {
      id: 3,
      type: "weather_alert",
      message: "Weather alert",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      farmName: "Cuttack district",
    },
  ])

  const addFarm = (farm: Omit<Farm, "id" | "createdAt">) => {
    const newFarm: Farm = {
      ...farm,
      id: Math.max(...farms.map((f) => f.id), 0) + 1,
      createdAt: new Date(),
    }
    setFarms([...farms, newFarm])
    setActivities([
      {
        id: activities.length + 1,
        type: "farm_added",
        message: "New farm added",
        timestamp: new Date(),
        farmName: newFarm.name,
      },
      ...activities,
    ])
  }

  const updateFarm = (id: number, updatedFarm: Partial<Farm>) => {
    setFarms(farms.map((farm) => (farm.id === id ? { ...farm, ...updatedFarm } : farm)))
  }

  const deleteFarm = (id: number) => {
    setFarms(farms.filter((farm) => farm.id !== id))
    setSoilData(soilData.filter((data) => data.farmId !== id))
    setWeatherData(weatherData.filter((data) => data.farmId !== id))
    setPredictions(predictions.filter((pred) => pred.farmId !== id))
  }

  const addSoilData = (data: Omit<SoilData, "id">) => {
    const newData: SoilData = {
      ...data,
      id: Math.max(...soilData.map((d) => d.id), 0) + 1,
    }
    setSoilData([...soilData, newData])
    setActivities([
      {
        id: activities.length + 1,
        type: "soil_data",
        message: "Soil data updated",
        timestamp: new Date(),
        farmName: data.farmName,
      },
      ...activities,
    ])
  }

  const addWeatherData = (data: Omit<WeatherData, "id">) => {
    const newData: WeatherData = {
      ...data,
      id: Math.max(...weatherData.map((d) => d.id), 0) + 1,
    }
    setWeatherData([...weatherData, newData])
    setActivities([
      {
        id: activities.length + 1,
        type: "weather_data",
        message: "Weather data recorded",
        timestamp: new Date(),
        farmName: data.farmName,
      },
      ...activities,
    ])
  }

  const addPrediction = (prediction: Omit<Prediction, "id" | "date">) => {
    const newPrediction: Prediction = {
      ...prediction,
      id: Math.max(...predictions.map((p) => p.id), 0) + 1,
      date: new Date(),
    }
    setPredictions([newPrediction, ...predictions])
    setActivities([
      {
        id: activities.length + 1,
        type: "prediction",
        message: "New prediction generated",
        timestamp: new Date(),
        farmName: prediction.farmName,
      },
      ...activities,
    ])
  }

  const getAnalytics = () => {
    const avgYield =
      predictions.length > 0 ? predictions.reduce((sum, p) => sum + p.predictedYield, 0) / predictions.length : 0

    const avgRainfall =
      weatherData.length > 0 ? weatherData.reduce((sum, w) => sum + w.rainfall, 0) / weatherData.length : 0

    const avgTemperature =
      weatherData.length > 0
        ? weatherData.reduce((sum, w) => sum + (w.maxTemp + w.minTemp) / 2, 0) / weatherData.length
        : 0

    const topFarms = predictions
      .sort((a, b) => b.predictedYield - a.predictedYield)
      .slice(0, 3)
      .map((p) => {
        const farm = farms.find((f) => f.id === p.farmId)
        return {
          name: p.farmName,
          location: farm ? `${farm.location}, ${farm.district}, Odisha` : "Unknown",
          yield: p.predictedYield,
        }
      })

    // Calculate seasonal trends (mock data for now, but structure is ready for real data)
    const seasonalTrends = [
      { season: "Kharif Season", yield: 4.5, percentage: 90 },
      { season: "Rabi Season", yield: 3.8, percentage: 76 },
      { season: "Summer Season", yield: 4.1, percentage: 82 },
    ]

    return {
      totalFarms: farms.length,
      totalPredictions: predictions.length,
      totalSoilRecords: soilData.length,
      totalWeatherRecords: weatherData.length,
      avgYield: Number(avgYield.toFixed(1)),
      avgRainfall: Number(avgRainfall.toFixed(0)),
      avgTemperature: Number(avgTemperature.toFixed(1)),
      topFarms,
      seasonalTrends,
      recentActivities: activities.slice(0, 5),
    }
  }

  return (
    <DataStoreContext.Provider
      value={{
        farms,
        soilData,
        weatherData,
        predictions,
        activities,
        addFarm,
        updateFarm,
        deleteFarm,
        addSoilData,
        addWeatherData,
        addPrediction,
        getAnalytics,
      }}
    >
      {children}
    </DataStoreContext.Provider>
  )
}

export function useDataStore() {
  const context = useContext(DataStoreContext)
  if (context === undefined) {
    throw new Error("useDataStore must be used within a DataStoreProvider")
  }
  return context
}
