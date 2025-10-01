"use client"

import { Bell, Menu, User, Languages } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sprout } from "lucide-react"
import { useState } from "react"
import { useLanguage } from "@/lib/language-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function AppHeader({ onMenuClick }: { onMenuClick?: () => void }) {
  const [notificationOpen, setNotificationOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="flex h-16 items-center px-4 gap-4">
        <Button variant="ghost" size="icon" className="md:hidden" onClick={onMenuClick}>
          <Menu className="h-5 w-5" />
        </Button>

        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--agri-green)]">
            <Sprout className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-semibold text-foreground hidden sm:inline">{t("agriPredict")}</span>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Languages className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Select Language</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setLanguage("en")} className={language === "en" ? "bg-accent" : ""}>
                English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("hi")} className={language === "hi" ? "bg-accent" : ""}>
                हिन्दी (Hindi)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("or")} className={language === "or" ? "bg-accent" : ""}>
                ଓଡ଼ିଆ (Odia)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu open={notificationOpen} onOpenChange={setNotificationOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>{t("notifications")}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
                <p className="font-medium text-sm">Weather Alert</p>
                <p className="text-xs text-muted-foreground">Heavy rainfall expected in Cuttack region</p>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
                <p className="font-medium text-sm">Soil Test Reminder</p>
                <p className="text-xs text-muted-foreground">Time to test soil for Green Valley Farm</p>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{t("myAccount")}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>{t("profile")}</DropdownMenuItem>
              <DropdownMenuItem>{t("settings")}</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>{t("logout")}</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
