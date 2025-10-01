"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, MapPin, Database, Brain, BarChart3, Shield, Sprout, Bell, TrendingUp, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useEffect } from "react"

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "My Farms", href: "/farms", icon: MapPin },
  { name: "Data Entry", href: "/data-entry", icon: Database },
  { name: "Predictions", href: "/predictions", icon: Brain },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Admin Panel", href: "/admin", icon: Shield },
]

export function AppSidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const pathname = usePathname()

  useEffect(() => {
    onClose()
  }, [pathname, onClose])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  return (
    <>
      {isOpen && <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={onClose} aria-hidden="true" />}

      <aside
        className={cn(
          "fixed inset-y-0 z-50 w-64 flex flex-col border-r bg-white pt-16 transition-transform duration-300 ease-in-out md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 md:hidden"
          onClick={onClose}
          aria-label="Close menu"
        >
          <X className="h-5 w-5" />
        </Button>

        <div className="flex flex-col flex-1 overflow-y-auto p-4">
          <div className="flex items-center gap-3 p-4 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--agri-green)]">
              <Sprout className="h-7 w-7 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-lg text-foreground">AgriPredict</h2>
              <p className="text-xs text-[var(--agri-green)]">AI-Powered Farming</p>
            </div>
          </div>

          <nav className="space-y-1">
            <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Navigation</p>
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-[var(--agri-light-green)] text-[var(--agri-green)]"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          <div className="mt-8 space-y-3">
            <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Quick Info</p>

            <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-accent">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-[var(--agri-green)]" />
                <span className="text-sm font-medium text-foreground">Active Crops</span>
              </div>
              <span className="text-lg font-bold text-[var(--agri-green)]">7</span>
            </div>

            <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-red-50">
              <div className="flex items-center gap-2">
                <Bell className="h-4 w-4 text-red-600" />
                <span className="text-sm font-medium text-foreground">New Alerts</span>
              </div>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                2
              </span>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
