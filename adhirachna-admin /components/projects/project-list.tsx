"use client"

import { useState } from "react"
import { MoreHorizontal, Edit, Trash, MapPin, Calendar, Building, ImageIcon } from "lucide-react"

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample data
const projects = [
  {
    id: "1",
    title: "Mumbai Metro Extension",
    status: "In Progress",
    startDate: "2023-06-15",
    client: "Mumbai Metropolitan Region Development Authority",
    type: "Urban",
    location: "Mumbai, Maharashtra",
    description: "Extension of the Mumbai Metro Line 3 to connect the western suburbs.",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "2",
    title: "Bangalore Smart Bridge",
    status: "Planning",
    startDate: "2024-03-01",
    client: "Bangalore Development Authority",
    type: "Bridge",
    location: "Bangalore, Karnataka",
    description: "Smart bridge with integrated IoT sensors for traffic management and structural health monitoring.",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "3",
    title: "Delhi-Meerut Expressway",
    status: "Completed",
    startDate: "2021-08-10",
    client: "National Highways Authority of India",
    type: "Road",
    location: "Delhi-Meerut, Uttar Pradesh",
    description: "14-lane expressway connecting Delhi to Meerut with advanced traffic management systems.",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "4",
    title: "Chennai Coastal Road",
    status: "In Progress",
    startDate: "2022-11-05",
    client: "Tamil Nadu Road Development Corporation",
    type: "Road",
    location: "Chennai, Tamil Nadu",
    description: "Coastal road project with flood mitigation measures and eco-friendly design.",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "5",
    title: "Kolkata Smart City Infrastructure",
    status: "Planning",
    startDate: "2024-05-20",
    client: "Kolkata Municipal Corporation",
    type: "Urban",
    location: "Kolkata, West Bengal",
    description: "Comprehensive smart city infrastructure development including IoT-enabled utilities and services.",
    image: "/placeholder.svg?height=200&width=400",
  },
]

const services = [
  {
    id: "1",
    title: "Smart Bridge Technology",
    description: "Integrating IoT sensors and AI for real-time monitoring and predictive maintenance of bridges.",
    image: "/placeholder.svg?height=150&width=300",
  },
  {
    id: "2",
    title: "AI in Urban Planning",
    description: "Using artificial intelligence to optimize urban development and infrastructure planning.",
    image: "/placeholder.svg?height=150&width=300",
  },
  {
    id: "3",
    title: "Sustainable Infrastructure",
    description:
      "Eco-friendly and sustainable approaches to infrastructure development with minimal environmental impact.",
    image: "/placeholder.svg?height=150&width=300",
  },
  {
    id: "4",
    title: "Disaster-Resistant Structures",
    description: "Designing and building structures that can withstand natural disasters like earthquakes and floods.",
    image: "/placeholder.svg?height=150&width=300",
  },
]

// Get unique project types
const projectTypes = Array.from(new Set(projects.map((project) => project.type)))

export function ProjectList() {
  const [selectedType, setSelectedType] = useState<string>("all")
  const [selectedTab, setSelectedTab] = useState<string>("projects")

  const filteredProjects =
    selectedType === "all" ? projects : projects.filter((project) => project.type === selectedType)

  return (
    <Tabs defaultValue="projects" className="space-y-4" onValueChange={setSelectedTab}>
      <TabsList>
        <TabsTrigger value="projects">Projects</TabsTrigger>
        <TabsTrigger value="services">Services</TabsTrigger>
      </TabsList>

      <TabsContent value="projects" className="space-y-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {projectTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          {filteredProjects.map((project) => (
            <Card key={project.id}>
              <CardHeader className="p-0">
                <div className="relative h-48 w-full">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="h-full w-full object-cover"
                  />
                  <Badge
                    className="absolute right-2 top-2"
                    variant={
                      project.status === "Completed"
                        ? "default"
                        : project.status === "In Progress"
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {project.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle>{project.title}</CardTitle>
                <CardDescription className="mt-2">{project.description}</CardDescription>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-sm">
                    <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>Started: {new Date(project.startDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Building className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>Client: {project.client}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>Location: {project.location}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t p-4">
                <Badge variant="outline">{project.type}</Badge>
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
                    <DropdownMenuItem>
                      <ImageIcon className="mr-2 h-4 w-4" />
                      <span>Manage Gallery</span>
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
      </TabsContent>

      <TabsContent value="services" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          {services.map((service) => (
            <Card key={service.id}>
              <CardHeader className="p-0">
                <div className="h-40 w-full">
                  <img
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle>{service.title}</CardTitle>
                <CardDescription className="mt-2">{service.description}</CardDescription>
              </CardContent>
              <CardFooter className="flex justify-end border-t p-4">
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
      </TabsContent>
    </Tabs>
  )
}
