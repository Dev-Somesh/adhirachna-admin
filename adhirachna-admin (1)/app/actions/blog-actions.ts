"use server"

import { revalidatePath } from "next/cache"
import {
  getBlogPosts,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  publishBlogPost,
  unpublishBlogPost,
} from "@/lib/contentful"

export async function fetchBlogPosts() {
  try {
    const posts = await getBlogPosts()
    return { success: true, data: posts }
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return { success: false, error: "Failed to fetch blog posts" }
  }
}

export async function createBlogPostAction(formData: FormData) {
  try {
    const title = formData.get("title") as string
    const slug = formData.get("slug") as string
    const excerpt = formData.get("excerpt") as string
    const author = formData.get("author") as string
    const tagsString = formData.get("tags") as string
    const tags = tagsString.split(",").map((tag) => tag.trim())
    const published = formData.get("published") === "true"

    if (!title || !slug) {
      return { success: false, error: "Title and slug are required" }
    }

    await createBlogPost({
      title,
      slug,
      excerpt,
      author,
      tags,
      published,
    })

    revalidatePath("/dashboard/content")
    return { success: true, message: "Blog post created successfully" }
  } catch (error) {
    console.error("Error creating blog post:", error)
    return { success: false, error: "Failed to create blog post" }
  }
}

export async function updateBlogPostAction(id: string, formData: FormData) {
  try {
    const title = formData.get("title") as string
    const slug = formData.get("slug") as string
    const excerpt = formData.get("excerpt") as string
    const author = formData.get("author") as string
    const tagsString = formData.get("tags") as string
    const tags = tagsString.split(",").map((tag) => tag.trim())
    const published = formData.get("published") === "true"

    if (!title || !slug) {
      return { success: false, error: "Title and slug are required" }
    }

    await updateBlogPost(id, {
      title,
      slug,
      excerpt,
      author,
      tags,
      published,
    })

    revalidatePath("/dashboard/content")
    return { success: true, message: "Blog post updated successfully" }
  } catch (error) {
    console.error("Error updating blog post:", error)
    return { success: false, error: "Failed to update blog post" }
  }
}

export async function deleteBlogPostAction(id: string) {
  try {
    await deleteBlogPost(id)
    revalidatePath("/dashboard/content")
    return { success: true, message: "Blog post deleted successfully" }
  } catch (error) {
    console.error("Error deleting blog post:", error)
    return { success: false, error: "Failed to delete blog post" }
  }
}

export async function publishBlogPostAction(id: string) {
  try {
    await publishBlogPost(id)
    await updateBlogPost(id, { published: true })
    revalidatePath("/dashboard/content")
    return { success: true, message: "Blog post published successfully" }
  } catch (error) {
    console.error("Error publishing blog post:", error)
    return { success: false, error: "Failed to publish blog post" }
  }
}

export async function unpublishBlogPostAction(id: string) {
  try {
    await unpublishBlogPost(id)
    await updateBlogPost(id, { published: false })
    revalidatePath("/dashboard/content")
    return { success: true, message: "Blog post unpublished successfully" }
  } catch (error) {
    console.error("Error unpublishing blog post:", error)
    return { success: false, error: "Failed to unpublish blog post" }
  }
}
