"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Sparkles, Calendar, TrendingUp, ChevronLeft } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

const farms = [
  "Sunrise Agriculture - Cuttack, Cuttack, Odisha",
  "Green Valley Farm - Bhubaneswar, Khordha, Odisha",
  "Harvest Hope Farm - Balasore, Balasore, Odisha",
  "Golden Fields - Puri, Puri, Odisha",
  "Prosperity Crops - Sambalpur, Sambalpur, Odisha",
  "mfarm1 - Sambalpur, Odisha",
]

const mockPredictions = [
  {
    id: 1,
    farm: "Sunrise Agriculture",
    crop: "Rice",
    predictedYield: "4.2 tons/ha",
    confidence: "92%",
    date: "Sep 28, 2025",
  },
  {
    id: 2,
    farm: "Green Valley Farm",
    crop: "Wheat",
    predictedYield: "3.8 tons/ha",
    confidence: "88%",
    date: "Sep 25, 2025",
  },
]

export default function PredictionsPage() {
  const [selectedFarm, setSelectedFarm] = useState("")
  const [predictions, setPredictions] = useState(mockPredictions)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGeneratePrediction = () => {
    if (!selectedFarm) {
      alert("Please select a farm first")
      return
    }

    setIsGenerating(true)
    console.log("[v0] Generating prediction for:", selectedFarm)

    // Simulate API call
    setTimeout(() => {
      const newPrediction = {
        id: predictions.length + 1,
        farm: selectedFarm.split(" - ")[0],
        crop: "Mixed Crops",
        predictedYield: "4.5 tons/ha",
        confidence: "90%",
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      }
      setPredictions([newPrediction, ...predictions])
      setIsGenerating(false)
      alert("Prediction generated successfully!")
    }, 2000)
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
          <Brain className="h-8 w-8 sm:h-10 sm:w-10 text-[var(--agri-green)] mt-1 flex-shrink-0" />
          <div className="flex-1">
            <h1 className="text-3xl sm:text-4xl font-bold text-[var(--agri-green)]">
              AI Predictions & Recommendations
            </h1>
            <p className="text-[var(--agri-green)] mt-1 text-sm sm:text-base">
              Get AI-powered insights for optimal crop yields
            </p>
          </div>
        </div>

        <Card className="border-none shadow-sm bg-[var(--agri-light-purple)]">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl text-center text-[var(--agri-purple)]">
              Generate Data-Driven AI Prediction
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-base font-medium text-[var(--agri-purple)]">Select Farm</label>
              <Select value={selectedFarm} onValueChange={setSelectedFarm}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Choose a farm for prediction" />
                </SelectTrigger>
                <SelectContent>
                  {farms.map((farm, index) => (
                    <SelectItem key={index} value={farm}>
                      {farm}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handleGeneratePrediction}
              disabled={isGenerating}
              className="w-full bg-[var(--agri-purple)] hover:bg-[var(--agri-purple)]/90 text-white py-6 text-base sm:text-lg"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              {isGenerating ? "Generating..." : "Generate Accurate Prediction"}
            </Button>

            <p className="text-center text-sm text-[var(--agri-purple)]">
              Our AI analyzes soil health, weather patterns, and farm characteristics to predict crop yields with high
              accuracy.
            </p>
          </CardContent>
        </Card>

        <div>
          <h2 className="text-2xl font-bold text-[var(--agri-green)] mb-4">Recent Predictions</h2>
          {predictions.length > 0 ? (
            <div className="space-y-4">
              {predictions.map((prediction) => (
                <Card key={prediction.id} className="border-none shadow-sm">
                  <CardContent className="pt-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <h3 className="font-semibold text-lg text-foreground">{prediction.farm}</h3>
                        <p className="text-sm text-muted-foreground">{prediction.crop}</p>
                      </div>
                      <div className="flex flex-wrap gap-4">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-[var(--agri-green)]" />
                          <div>
                            <p className="text-xs text-muted-foreground">Predicted Yield</p>
                            <p className="font-semibold text-[var(--agri-green)]">{prediction.predictedYield}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Sparkles className="h-4 w-4 text-[var(--agri-purple)]" />
                          <div>
                            <p className="text-xs text-muted-foreground">Confidence</p>
                            <p className="font-semibold text-[var(--agri-purple)]">{prediction.confidence}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-xs text-muted-foreground">Date</p>
                            <p className="font-semibold">{prediction.date}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No predictions yet. Generate your first prediction above.</p>
          )}
        </div>
      </div>
    </div>
  )
}
