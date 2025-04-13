import { createClient } from "contentful-management"

// This should be stored in environment variables in production
let contentfulClient: any = null

export function getContentfulClient() {
  if (!contentfulClient) {
    const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_CMA_TOKEN

    if (!accessToken) {
      throw new Error("Contentful CMA token is not defined")
    }

    contentfulClient = createClient({
      accessToken,
    })
  }

  return contentfulClient
}

export async function getSpace() {
  const client = getContentfulClient()
  const spaceId = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID

  if (!spaceId) {
    throw new Error("Contentful Space ID is not defined")
  }

  return client.getSpace(spaceId)
}

export async function getEnvironment() {
  const space = await getSpace()
  const environmentId = process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT || "master"
  return space.getEnvironment(environmentId)
}

export async function getBlogPosts() {
  try {
    const environment = await getEnvironment()
    const entries = await environment.getEntries({
      content_type: "blogPost",
      order: "-sys.createdAt",
    })

    return entries.items.map((entry) => ({
      id: entry.sys.id,
      title: entry.fields.title?.["en-US"] || "",
      slug: entry.fields.slug?.["en-US"] || "",
      excerpt: entry.fields.excerpt?.["en-US"] || "",
      author: entry.fields.author?.["en-US"] || "",
      tags: entry.fields.tags?.["en-US"] || [],
      published: entry.fields.published?.["en-US"] || false,
      views: entry.fields.views?.["en-US"] || 0,
      createdAt: new Date(entry.sys.createdAt),
      coverImage: entry.fields.coverImage?.["en-US"]?.fields?.file?.["en-US"]?.url || "",
    }))
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return []
  }
}

export async function createBlogPost(data: any) {
  try {
    const environment = await getEnvironment()

    const entry = await environment.createEntry("blogPost", {
      fields: {
        title: { "en-US": data.title },
        slug: { "en-US": data.slug },
        excerpt: { "en-US": data.excerpt },
        author: { "en-US": data.author },
        tags: { "en-US": data.tags },
        published: { "en-US": data.published },
        views: { "en-US": 0 },
      },
    })

    return entry
  } catch (error) {
    console.error("Error creating blog post:", error)
    throw error
  }
}

export async function updateBlogPost(id: string, data: any) {
  try {
    const environment = await getEnvironment()
    const entry = await environment.getEntry(id)

    if (data.title) entry.fields.title = { "en-US": data.title }
    if (data.slug) entry.fields.slug = { "en-US": data.slug }
    if (data.excerpt) entry.fields.excerpt = { "en-US": data.excerpt }
    if (data.author) entry.fields.author = { "en-US": data.author }
    if (data.tags) entry.fields.tags = { "en-US": data.tags }
    if (data.published !== undefined) entry.fields.published = { "en-US": data.published }
    if (data.views !== undefined) entry.fields.views = { "en-US": data.views }

    const updatedEntry = await entry.update()
    return updatedEntry
  } catch (error) {
    console.error("Error updating blog post:", error)
    throw error
  }
}

export async function deleteBlogPost(id: string) {
  try {
    const environment = await getEnvironment()
    const entry = await environment.getEntry(id)
    await entry.delete()
    return true
  } catch (error) {
    console.error("Error deleting blog post:", error)
    throw error
  }
}

export async function publishBlogPost(id: string) {
  try {
    const environment = await getEnvironment()
    const entry = await environment.getEntry(id)
    await entry.publish()
    return true
  } catch (error) {
    console.error("Error publishing blog post:", error)
    throw error
  }
}

export async function unpublishBlogPost(id: string) {
  try {
    const environment = await getEnvironment()
    const entry = await environment.getEntry(id)
    await entry.unpublish()
    return true
  } catch (error) {
    console.error("Error unpublishing blog post:", error)
    throw error
  }
}
