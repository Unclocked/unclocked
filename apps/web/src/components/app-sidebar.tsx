import * as React from "react"
import {
  Building2,
  Home,
  LayoutDashboard,
  Settings,
  Users,
  Clock,
  FileText,
  BarChart3,
} from "lucide-react"
import { authClient } from "@/lib/auth-client"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// Navigation data for Unclocked
const data = {
  user: {
    name: "User",
    email: "user@example.com",
    avatar: "/avatars/user.jpg",
  },
  teams: [
    {
      name: "My Organization",
      logo: Building2,
      plan: "Pro",
    },
  ],
  navMain: [
    {
      title: "Home",
      url: "/",
      icon: Home,
    },
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Time Tracking",
      url: "#",
      icon: Clock,
      items: [
        {
          title: "Track Time",
          url: "#",
        },
        {
          title: "Timesheet",
          url: "#",
        },
        {
          title: "Calendar",
          url: "#",
        },
      ],
    },
    {
      title: "Customers",
      url: "#",
      icon: Users,
      items: [
        {
          title: "All Customers",
          url: "#",
        },
        {
          title: "Add Customer",
          url: "#",
        },
      ],
    },
    {
      title: "Reports",
      url: "#",
      icon: BarChart3,
      items: [
        {
          title: "Time Reports",
          url: "#",
        },
        {
          title: "Project Reports",
          url: "#",
        },
        {
          title: "Export Data",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Organizations",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Integrations",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Active Projects",
      url: "#",
      icon: FileText,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = authClient.useSession();
  const { data: organizations } = authClient.useListOrganizations();
  
  // Update user data from session
  const userData = React.useMemo(() => {
    const currentOrg = organizations?.[0];
    return {
      ...data,
      user: {
        name: session?.user.name || "User",
        email: session?.user.email || "user@example.com",
        avatar: session?.user.image || "/avatars/user.jpg",
      },
      teams: currentOrg ? [{
        name: currentOrg.name,
        logo: Building2,
        plan: "Pro",
      }] : data.teams,
    };
  }, [session, organizations]);
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={userData.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={userData.navMain} />
        <NavProjects projects={userData.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
