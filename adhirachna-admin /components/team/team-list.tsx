"use client"

import { useState, useEffect } from "react"
import { MoreHorizontal, Edit, Trash, Linkedin, Loader2 } from "lucide-react"

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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { getTeamMembers, deleteTeamMember } from "@/app/actions/team-actions"
import { TeamMemberDialog } from "./team-member-dialog"

export function TeamList() {
  const [teamMembers, setTeamMembers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentMember, setCurrentMember] = useState<any>(null)
  const { toast } = useToast()

  const loadTeamMembers = async () => {
    setLoading(true)
    try {
      const result = await getTeamMembers()
      if (result.success) {
        setTeamMembers(result.data)
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to load team members",
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
    loadTeamMembers()
  }, [])

  const handleEdit = (member: any) => {
    setCurrentMember(member)
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this team member?")) {
      try {
        const result = await deleteTeamMember(id)
        if (result.success) {
          toast({
            title: "Success",
            description: result.message,
          })
          loadTeamMembers()
        } else {
          toast({
            title: "Error",
            description: result.error || "Failed to delete team member",
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

  // Get unique departments
  const departments = Array.from(new Set(teamMembers.map((member) => member.department)))

  const filteredMembers =
    selectedDepartment === "all"
      ? teamMembers
      : teamMembers.filter((member) => member.department === selectedDepartment)

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-6">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">Loading team members...</span>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="flex items-center justify-between p-4">
            <div className="flex flex-1 items-center space-x-2">
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {teamMembers.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <p className="mb-4 text-muted-foreground">No team members found</p>
              <Button
                onClick={() => {
                  setCurrentMember(null)
                  setIsDialogOpen(true)
                }}
              >
                Add your first team member
              </Button>
            </div>
          ) : (
            <div className="grid gap-4 p-4 sm:grid-cols-2 md:grid-cols-3">
              {filteredMembers.map((member) => (
                <Card key={member.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col items-center p-6">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src={member.photo || "/placeholder.svg?height=100&width=100"} alt={member.name} />
                        <AvatarFallback>
                          {member.name
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <h3 className="mt-4 text-xl font-bold">{member.name}</h3>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                      <Badge className="mt-2">{member.department}</Badge>
                      <p className="mt-4 text-center text-sm">{member.bio}</p>
                      {member.linkedin && (
                        <div className="mt-4 flex items-center">
                          <a
                            href={member.linkedin.startsWith("http") ? member.linkedin : `https://${member.linkedin}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-sm text-blue-600 hover:underline"
                          >
                            <Linkedin className="mr-1 h-4 w-4" />
                            LinkedIn Profile
                          </a>
                        </div>
                      )}
                    </div>
                    <div className="flex justify-end border-t p-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleEdit(member)}>
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Edit</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(member.id)}>
                            <Trash className="mr-2 h-4 w-4" />
                            <span>Delete</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <TeamMemberDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        member={currentMember}
        onSuccess={loadTeamMembers}
      />
    </div>
  )
}
