"use client"

import { useState, useEffect } from "react"
import { MoreHorizontal, Edit, Trash, Eye, EyeOff, ArrowUpDown, Loader2 } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import {
  fetchBlogPosts,
  deleteBlogPostAction,
  publishBlogPostAction,
  unpublishBlogPostAction,
} from "@/app/actions/blog-actions"
import { BlogPostDialog } from "./blog-post-dialog"

export function ContentList() {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedTag, setSelectedTag] = useState<string>("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentPost, setCurrentPost] = useState<any>(null)
  const { toast } = useToast()

  const loadPosts = async () => {
    setLoading(true)
    try {
      const result = await fetchBlogPosts()
      if (result.success) {
        setPosts(result.data)
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to load blog posts",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPosts()
  }, [])

  const handleEdit = (post: any) => {
    setCurrentPost(post)
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      try {
        const result = await deleteBlogPostAction(id)
        if (result.success) {
          toast({
            title: "Success",
            description: result.message,
          })
          loadPosts()
        } else {
          toast({
            title: "Error",
            description: result.error || "Failed to delete blog post",
            variant: "destructive",
          })
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "An unexpected error occurred",
          variant: "destructive",
        })
      }
    }
  }

  const handlePublishToggle = async (id: string, isPublished: boolean) => {
    try {
      const result = isPublished ? await unpublishBlogPostAction(id) : await publishBlogPostAction(id)

      if (result.success) {
        toast({
          title: "Success",
          description: result.message,
        })
        loadPosts()
      } else {
        toast({
          title: "Error",
          description: result.error || `Failed to ${isPublished ? "unpublish" : "publish"} blog post`,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    }
  }

  // Get unique tags from all posts
  const allTags = Array.from(new Set(posts.flatMap((post) => post.tags || [])))

  const filteredPosts =
    selectedTag === "all" ? posts : posts.filter((post) => post.tags && post.tags.includes(selectedTag))

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-6">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">Loading blog posts...</span>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <Card>
        <CardContent className="p-0">
          <div className="flex items-center justify-between p-4">
            <div className="flex flex-1 items-center space-x-2">
              <Select value={selectedTag} onValueChange={setSelectedTag}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by tag" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tags</SelectItem>
                  {allTags.map((tag) => (
                    <SelectItem key={tag} value={tag}>
                      {tag}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          {posts.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <p className="mb-4 text-muted-foreground">No blog posts found</p>
              <Button
                onClick={() => {
                  setCurrentPost(null)
                  setIsDialogOpen(true)
                }}
              >
                Create your first blog post
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[400px]">
                    <Button variant="ghost" className="p-0 hover:bg-transparent">
                      <span>Title</span>
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>Tags</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>
                    <Button variant="ghost" className="p-0 hover:bg-transparent">
                      <span>Date</span>
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>
                    <Button variant="ghost" className="p-0 hover:bg-transparent">
                      <span>Views</span>
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPosts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell className="font-medium">{post.title}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {post.tags &&
                          post.tags.map((tag: string) => (
                            <Badge key={tag} variant="outline">
                              {tag}
                            </Badge>
                          ))}
                      </div>
                    </TableCell>
                    <TableCell>{post.author}</TableCell>
                    <TableCell>{format(new Date(post.createdAt), "MMM d, yyyy")}</TableCell>
                    <TableCell>
                      <Badge variant={post.published ? "default" : "secondary"}>
                        {post.published ? "Published" : "Draft"}
                      </Badge>
                    </TableCell>
                    <TableCell>{post.views}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleEdit(post)}>
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Edit</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handlePublishToggle(post.id, post.published)}>
                            {post.published ? (
                              <>
                                <EyeOff className="mr-2 h-4 w-4" />
                                <span>Unpublish</span>
                              </>
                            ) : (
                              <>
                                <Eye className="mr-2 h-4 w-4" />
                                <span>Publish</span>
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(post.id)}>
                            <Trash className="mr-2 h-4 w-4" />
                            <span>Delete</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <BlogPostDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} post={currentPost} onSuccess={loadPosts} />
    </>
  )
}
