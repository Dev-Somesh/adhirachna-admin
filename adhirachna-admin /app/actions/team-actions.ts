"use server"

import { revalidatePath } from "next/cache"
import prisma from "@/lib/db"

export async function getTeamMembers() {
  try {
    const members = await prisma.teamMember.findMany({
      orderBy: {
        name: "asc",
      },
    })
    return { success: true, data: members }
  } catch (error) {
    console.error("Error fetching team members:", error)
    return { success: false, error: "Failed to fetch team members" }
  }
}

export async function getTeamMemberById(id: string) {
  try {
    const member = await prisma.teamMember.findUnique({
      where: { id },
    })
    return { success: true, data: member }
  } catch (error) {
    console.error("Error fetching team member:", error)
    return { success: false, error: "Failed to fetch team member" }
  }
}

export async function createTeamMember(formData: FormData) {
  try {
    const name = formData.get("name") as string
    const role = formData.get("role") as string
    const department = formData.get("department") as string
    const bio = formData.get("bio") as string
    const linkedin = formData.get("linkedin") as string
    const photo = formData.get("photo") as string

    if (!name || !role || !department) {
      return { success: false, error: "Name, role, and department are required" }
    }

    const member = await prisma.teamMember.create({
      data: {
        name,
        role,
        department,
        bio,
        linkedin,
        photo,
      },
    })

    revalidatePath("/dashboard/team")
    return { success: true, data: member, message: "Team member created successfully" }
  } catch (error) {
    console.error("Error creating team member:", error)
    return { success: false, error: "Failed to create team member" }
  }
}

export async function updateTeamMember(id: string, formData: FormData) {
  try {
    const name = formData.get("name") as string
    const role = formData.get("role") as string
    const department = formData.get("department") as string
    const bio = formData.get("bio") as string
    const linkedin = formData.get("linkedin") as string
    const photo = formData.get("photo") as string

    if (!name || !role || !department) {
      return { success: false, error: "Name, role, and department are required" }
    }

    const member = await prisma.teamMember.update({
      where: { id },
      data: {
        name,
        role,
        department,
        bio,
        linkedin,
        photo,
      },
    })

    revalidatePath("/dashboard/team")
    return { success: true, data: member, message: "Team member updated successfully" }
  } catch (error) {
    console.error("Error updating team member:", error)
    return { success: false, error: "Failed to update team member" }
  }
}

export async function deleteTeamMember(id: string) {
  try {
    await prisma.teamMember.delete({
      where: { id },
    })

    revalidatePath("/dashboard/team")
    return { success: true, message: "Team member deleted successfully" }
  } catch (error) {
    console.error("Error deleting team member:", error)
    return { success: false, error: "Failed to delete team member" }
  }
}
