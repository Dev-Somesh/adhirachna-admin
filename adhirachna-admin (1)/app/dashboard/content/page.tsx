import { ContentList } from "@/components/content/content-list"
import { ContentHeader } from "@/components/content/content-header"

export default function ContentPage() {
  return (
    <div className="space-y-6">
      <ContentHeader />
      <ContentList />
    </div>
  )
}
