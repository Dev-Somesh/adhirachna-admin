import { ProjectList } from "@/components/projects/project-list"
import { ProjectHeader } from "@/components/projects/project-header"

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <ProjectHeader />
      <ProjectList />
    </div>
  )
}
