import {
	BarChart3,
	Building2,
	Clock,
	FileText,
	Home,
	LayoutDashboard,
	Settings,
	Users,
} from "lucide-react";
import * as React from "react";
import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";

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
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const { data: session } = authClient.useSession();

	// Update user data from session
	const userData = React.useMemo(() => {
		return {
			...data,
			user: {
				name: session?.user.name || "User",
				email: session?.user.email || "user@example.com",
				avatar: session?.user.image || "/avatars/user.jpg",
			},
		};
	}, [session]);
	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<TeamSwitcher />
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
	);
}
