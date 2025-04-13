import { TeamList } from "@/components/team/team-list"
import { TeamHeader } from "@/components/team/team-header"

export default function TeamPage() {
  return (
    <div className="space-y-6">
      <TeamHeader />
      <TeamList />
    </div>
  )
}
