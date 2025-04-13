"use client"

import { useState } from "react"
import { MoreHorizontal, Edit, Trash, Eye, EyeOff, ExternalLink } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

// Sample data
const banners = [
  {
    id: "1",
    headline: "Summer Internship Program 2024",
    description: "Join our team for a summer of learning and innovation in civil engineering.",
    buttonLabel: "Apply Now",
    redirectUrl: "/careers/internships",
    isActive: true,
    color: "bg-blue-500",
  },
  {
    id: "2",
    headline: "New Project Announcement: Delhi Smart Highway",
    description: "We're excited to announce our latest infrastructure project in collaboration with NHAI.",
    buttonLabel: "Learn More",
    redirectUrl: "/projects/delhi-smart-highway",
    isActive: true,
    color: "bg-green-500",
  },
  {
    id: "3",
    headline: "Webinar: Sustainable Infrastructure Solutions",
    description: "Join our expert panel discussion on sustainable approaches to modern infrastructure challenges.",
    buttonLabel: "Register",
    redirectUrl: "/events/webinar-sustainable-infrastructure",
    isActive: false,
    color: "bg-purple-500",
  },
  {
    id: "4",
    headline: "Holiday Closure Notice",
    description: "Our offices will be closed from December 24th to January 2nd for the holiday season.",
    buttonLabel: "Contact Emergency Support",
    redirectUrl: "/contact/emergency",
    isActive: false,
    color: "bg-red-500",
  },
]

export function BannerList() {
  const [activeBanners, setActiveBanners] = useState(banners.map((banner) => banner.isActive))

  const toggleBanner = (index: number) => {
    const newActiveBanners = [...activeBanners]
    newActiveBanners[index] = !newActiveBanners[index]
    setActiveBanners(newActiveBanners)
  }

  return (
    <div className="space-y-6">
      {banners.map((banner, index) => (
        <Card key={banner.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">{banner.headline}</CardTitle>
              <Badge variant={activeBanners[index] ? "default" : "secondary"}>
                {activeBanners[index] ? "Active" : "Inactive"}
              </Badge>
            </div>
            <CardDescription>{banner.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border p-4">
              <div className={`${banner.color} mb-4 rounded-md p-4 text-white`}>
                <h3 className="text-lg font-bold">{banner.headline}</h3>
                <p className="mt-1">{banner.description}</p>
                <Button variant="secondary" size="sm" className="mt-2">
                  {banner.buttonLabel}
                </Button>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <ExternalLink className="mr-1 h-4 w-4" />
                Redirect URL: {banner.redirectUrl}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t p-4">
            <div className="flex items-center space-x-2">
              <Switch
                id={`banner-active-${banner.id}`}
                checked={activeBanners[index]}
                onCheckedChange={() => toggleBanner(index)}
              />
              <Label htmlFor={`banner-active-${banner.id}`}>{activeBanners[index] ? "Active" : "Inactive"}</Label>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem>
                  <Edit className="mr-2 h-4 w-4" />
                  <span>Edit</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => toggleBanner(index)}>
                  {activeBanners[index] ? (
                    <>
                      <EyeOff className="mr-2 h-4 w-4" />
                      <span>Deactivate</span>
                    </>
                  ) : (
                    <>
                      <Eye className="mr-2 h-4 w-4" />
                      <span>Activate</span>
                    </>
                  )}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  <Trash className="mr-2 h-4 w-4" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
