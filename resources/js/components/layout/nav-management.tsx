import { Link, usePage } from "@inertiajs/react";
import { UserIcon } from "lucide-react";
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import type { NavItem } from "@/types";

export function NavManagement({ companySlug: _ }: { companySlug: string }) {
	const items: NavItem[] = [
		{
			title: "Customers",
			href: "/customers",
			icon: UserIcon,
		},
	];

	const page = usePage();
	return (
		<SidebarGroup className="px-2 py-0">
			<SidebarGroupLabel>Management</SidebarGroupLabel>
			<SidebarMenu>
				{items.map((item) => (
					<SidebarMenuItem key={item.title}>
						<SidebarMenuButton
							asChild
							isActive={page.url.startsWith(item.href)}
							tooltip={{ children: item.title }}
						>
							<Link href={item.href} prefetch>
								{item.icon && <item.icon />}
								<span>{item.title}</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				))}
			</SidebarMenu>
		</SidebarGroup>
	);
}
