"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Users, UserCheck, Clock, ChevronLeft, Database, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import Link from "next/link"

export default function AdminPage() {
  const [stats, setStats] = useState({
    totalFarmers: 5,
    verifiedFarmers: 5,
    pendingVerifications: 0,
  })

  return (
    <div className="min-h-screen bg-[var(--agri-light-purple)] p-4 sm:p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <Link href="/">
          <Button variant="ghost" className="mb-4">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>

        <div className="flex items-start gap-4">
          <Shield className="h-8 w-8 sm:h-10 sm:w-10 text-[var(--agri-purple)] mt-1 flex-shrink-0" />
          <div className="flex-1">
            <h1 className="text-3xl sm:text-4xl font-bold text-[var(--agri-purple)]">Admin Dashboard</h1>
            <p className="text-[var(--agri-purple)] mt-1 text-sm sm:text-base">
              Manage farmers, data, and system operations
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium text-[var(--agri-purple)]">Total Farmers</CardTitle>
              <Users className="h-5 w-5 text-[var(--agri-purple)]" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-[var(--agri-purple)]">{stats.totalFarmers}</div>
              <p className="text-xs text-muted-foreground mt-1">Registered users</p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium text-[var(--agri-purple)]">Verified Farmers</CardTitle>
              <UserCheck className="h-5 w-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-[var(--agri-purple)]">{stats.verifiedFarmers}</div>
              <p className="text-xs text-muted-foreground mt-1">Active accounts</p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium text-[var(--agri-purple)]">Pending Verifications</CardTitle>
              <Clock className="h-5 w-5 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-[var(--agri-purple)]">{stats.pendingVerifications}</div>
              <p className="text-xs text-muted-foreground mt-1">Awaiting review</p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium text-[var(--agri-purple)]">System Status</CardTitle>
              <Activity className="h-5 w-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">Healthy</div>
              <p className="text-xs text-muted-foreground mt-1">All systems operational</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-[var(--agri-purple)]">Quick Actions</CardTitle>
              <CardDescription>Manage system operations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                className="w-full justify-start bg-[var(--agri-purple)] hover:bg-[var(--agri-purple)]/90 text-white"
                onClick={() => alert("View all farmers functionality")}
              >
                <Users className="mr-2 h-4 w-4" />
                View All Farmers
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start border-[var(--agri-purple)] text-[var(--agri-purple)] bg-transparent"
                onClick={() => alert("Manage verifications functionality")}
              >
                <UserCheck className="mr-2 h-4 w-4" />
                Manage Verifications
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start border-[var(--agri-purple)] text-[var(--agri-purple)] bg-transparent"
                onClick={() => alert("System settings functionality")}
              >
                <Shield className="mr-2 h-4 w-4" />
                System Settings
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start border-[var(--agri-purple)] text-[var(--agri-purple)] bg-transparent"
                onClick={() => alert("Database management functionality")}
              >
                <Database className="mr-2 h-4 w-4" />
                Database Management
              </Button>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-[var(--agri-purple)]">Recent Activity</CardTitle>
              <CardDescription>Latest system events</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium">New farmer registered</p>
                  <p className="text-xs text-muted-foreground">Ramesh Kumar - 2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Farmer verified</p>
                  <p className="text-xs text-muted-foreground">Priya Patel - 5 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-[var(--agri-purple)] mt-2 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium">System backup completed</p>
                  <p className="text-xs text-muted-foreground">Automated - 1 day ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Data export requested</p>
                  <p className="text-xs text-muted-foreground">Admin User - 2 days ago</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-[var(--agri-purple)]">System Overview</CardTitle>
            <CardDescription>Platform statistics and performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Total Farms</p>
                <p className="text-2xl font-bold text-[var(--agri-purple)]">6</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Total Predictions</p>
                <p className="text-2xl font-bold text-[var(--agri-purple)]">24</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Data Records</p>
                <p className="text-2xl font-bold text-[var(--agri-purple)]">142</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
