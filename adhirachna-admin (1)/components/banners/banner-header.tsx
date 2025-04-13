"use client"

import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

export function BannerHeader() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Banner Management</h1>
        <p className="text-muted-foreground">Manage your homepage banners and announcements.</p>
      </div>
      <Button>
        <PlusCircle className="mr-2 h-4 w-4" />
        Add Banner
      </Button>
    </div>
  )
}
