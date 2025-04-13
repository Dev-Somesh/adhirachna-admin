import { BannerList } from "@/components/banners/banner-list"
import { BannerHeader } from "@/components/banners/banner-header"

export default function BannersPage() {
  return (
    <div className="space-y-6">
      <BannerHeader />
      <BannerList />
    </div>
  )
}
