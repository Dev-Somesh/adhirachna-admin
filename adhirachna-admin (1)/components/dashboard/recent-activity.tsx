import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const activities = [
  {
    user: {
      name: "Rahul Sharma",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "RS",
    },
    action: "published a new blog post",
    target: "Smart Bridge Technology",
    time: "2 hours ago",
  },
  {
    user: {
      name: "Priya Patel",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "PP",
    },
    action: "updated project status",
    target: "Mumbai Metro Extension",
    time: "5 hours ago",
  },
  {
    user: {
      name: "Vikram Singh",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "VS",
    },
    action: "added a new team member",
    target: "Ananya Desai",
    time: "1 day ago",
  },
  {
    user: {
      name: "Neha Gupta",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "NG",
    },
    action: "created a new banner",
    target: "Summer Internship Program",
    time: "2 days ago",
  },
]

export function RecentActivity() {
  return (
    <div className="space-y-8">
      {activities.map((activity, index) => (
        <div className="flex items-start" key={index}>
          <Avatar className="h-9 w-9">
            <AvatarImage src={activity.user.avatar || "/placeholder.svg"} alt={activity.user.name} />
            <AvatarFallback>{activity.user.initials}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium">
              <span className="font-semibold">{activity.user.name}</span> {activity.action}{" "}
              <span className="font-semibold">{activity.target}</span>
            </p>
            <p className="text-sm text-muted-foreground">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
