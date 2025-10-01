"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Plus, Edit, Trash2, ChevronLeft } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const initialFarms = [
  {
    id: 1,
    name: "Sunrise Agriculture",
    location: "Cuttack, Cuttack, Odisha",
    area: "1.8 ha",
    soil: "Alluvial",
    irrigation: "Canal",
  },
  {
    id: 2,
    name: "Green Valley Farm",
    location: "Bhubaneswar, Khordha, Odisha",
    area: "2.5 ha",
    soil: "Red Soil",
    irrigation: "Drip",
  },
]

export default function FarmsPage() {
  const [farms, setFarms] = useState(initialFarms)
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedFarm, setSelectedFarm] = useState<number | null>(null)

  const handleDelete = (id: number) => {
    setFarms(farms.filter((farm) => farm.id !== id))
    setDeleteDialogOpen(false)
    setSelectedFarm(null)
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
          <MapPin className="h-8 w-8 sm:h-10 sm:w-10 text-[var(--agri-green)] mt-1 flex-shrink-0" />
          <div className="flex-1">
            <h1 className="text-3xl sm:text-4xl font-bold text-[var(--agri-green)]">My Farms</h1>
            <p className="text-[var(--agri-green)] mt-1 text-sm sm:text-base">Manage your farm locations and details</p>
          </div>
        </div>

        <Button
          className="bg-[var(--agri-green)] hover:bg-[var(--agri-green)]/90 text-white w-full sm:w-auto"
          onClick={() => setAddDialogOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New Farm
        </Button>

        <div className="space-y-4">
          {farms.map((farm) => (
            <Card key={farm.id} className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[var(--agri-green)] text-lg sm:text-xl">
                  <MapPin className="h-5 w-5 flex-shrink-0" />
                  <span className="break-words">{farm.name}</span>
                </CardTitle>
                <p className="text-sm text-[var(--agri-green)]">{farm.location}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-[var(--agri-green)]">Area</p>
                    <p className="text-lg font-semibold text-foreground">{farm.area}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[var(--agri-green)]">Soil</p>
                    <p className="text-lg font-semibold text-foreground">{farm.soil}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-[var(--agri-green)]">Irrigation</p>
                  <p className="text-lg font-semibold text-foreground">{farm.irrigation}</p>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    className="flex-1 border-[var(--agri-green)] text-[var(--agri-green)] hover:bg-[var(--agri-light-green)] bg-transparent"
                    onClick={() => {
                      setSelectedFarm(farm.id)
                      setEditDialogOpen(true)
                    }}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-red-200 text-red-600 hover:bg-red-50 bg-transparent"
                    onClick={() => {
                      setSelectedFarm(farm.id)
                      setDeleteDialogOpen(true)
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Farm</DialogTitle>
            <DialogDescription>Enter the details of your new farm location.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Farm Name</Label>
              <Input id="name" placeholder="e.g., Sunrise Agriculture" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" placeholder="e.g., Cuttack, Odisha" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="area">Area (hectares)</Label>
              <Input id="area" type="number" placeholder="e.g., 1.8" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="soil">Soil Type</Label>
              <Select>
                <SelectTrigger id="soil">
                  <SelectValue placeholder="Select soil type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="alluvial">Alluvial</SelectItem>
                  <SelectItem value="red">Red Soil</SelectItem>
                  <SelectItem value="black">Black Soil</SelectItem>
                  <SelectItem value="laterite">Laterite</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="irrigation">Irrigation Method</Label>
              <Select>
                <SelectTrigger id="irrigation">
                  <SelectValue placeholder="Select irrigation method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="canal">Canal</SelectItem>
                  <SelectItem value="drip">Drip</SelectItem>
                  <SelectItem value="sprinkler">Sprinkler</SelectItem>
                  <SelectItem value="rainfed">Rainfed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-[var(--agri-green)] hover:bg-[var(--agri-green)]/90"
              onClick={() => {
                console.log("[v0] Adding new farm")
                setAddDialogOpen(false)
              }}
            >
              Add Farm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Farm</DialogTitle>
            <DialogDescription>Update the details of your farm.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Farm Name</Label>
              <Input
                id="edit-name"
                defaultValue={farms.find((f) => f.id === selectedFarm)?.name}
                placeholder="e.g., Sunrise Agriculture"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-location">Location</Label>
              <Input
                id="edit-location"
                defaultValue={farms.find((f) => f.id === selectedFarm)?.location}
                placeholder="e.g., Cuttack, Odisha"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-[var(--agri-green)] hover:bg-[var(--agri-green)]/90"
              onClick={() => {
                console.log("[v0] Updating farm")
                setEditDialogOpen(false)
              }}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Farm</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this farm? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => selectedFarm && handleDelete(selectedFarm)}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
