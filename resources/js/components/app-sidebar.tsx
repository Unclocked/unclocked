import { Link, usePage } from "@inertiajs/react";
import { LayoutGrid } from "lucide-react";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import type { NavItem, SharedData } from "@/types";
import AppLogo from "./app-logo";
import { NavManagement } from "./layout/nav-management";

const mainNavItems: NavItem[] = [
	{
		title: "Dashboard",
		href: "/dashboard",
		icon: LayoutGrid,
	},
];

export function AppSidebar() {
	const { activeCompany } = usePage<SharedData>().props;

	return (
		<Sidebar collapsible="icon" variant="inset">
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size="lg" asChild>
							<Link href="/dashboard" prefetch>
								<AppLogo />
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>

			<SidebarContent>
				<NavMain items={mainNavItems} />
				{activeCompany && (
					<div className="h-full flex flex-col justify-end">
						<NavManagement companySlug={activeCompany.slug} />
					</div>
				)}
			</SidebarContent>

			<SidebarFooter>
				<NavUser />
			</SidebarFooter>
		</Sidebar>
	);
}
