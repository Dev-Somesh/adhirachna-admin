"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PlusCircle, Search, ExternalLink } from "lucide-react"
import { BlogPostDialog } from "./blog-post-dialog"

export function ContentHeader() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const handleOpenContentful = () => {
    window.open("https://app.contentful.com/", "_blank")
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Content Management</h1>
        <p className="text-muted-foreground">Manage your blog posts and content via Contentful CMS.</p>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search posts..."
            className="w-full pl-8 sm:w-[300px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setIsDialogOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Blog Post
          </Button>
          <Button variant="outline" onClick={handleOpenContentful}>
            <ExternalLink className="mr-2 h-4 w-4" />
            Open Contentful
          </Button>
        </div>
      </div>

      <BlogPostDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} onSuccess={() => {}} />
    </div>
  )
}
