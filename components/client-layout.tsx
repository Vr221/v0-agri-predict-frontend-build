"use client"

import type React from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { AppHeader } from "@/components/app-header"
import { useState, Suspense } from "react"
import { LanguageProvider } from "@/lib/language-context"
import { DataStoreProvider } from "@/lib/data-store"

export function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <DataStoreProvider>
      <LanguageProvider>
        <div className="min-h-screen bg-background">
          <Suspense fallback={<div>Loading...</div>}>
            <AppHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
            <AppSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <main className="md:pl-64 pt-16">{children}</main>
          </Suspense>
        </div>
      </LanguageProvider>
    </DataStoreProvider>
  )
}
