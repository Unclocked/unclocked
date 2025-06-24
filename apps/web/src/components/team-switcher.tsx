import { Building2, Check, ChevronsUpDown, Plus } from "lucide-react";
import * as React from "react";
import { CreateOrganizationModal } from "@/components/create-organization-modal";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

export function TeamSwitcher() {
	const { isMobile } = useSidebar();
	const { data: organizations, refetch: refetchOrganizations } =
		authClient.useListOrganizations();
	const { data: activeOrganization } = authClient.useActiveOrganization();
	const [showCreateModal, setShowCreateModal] = React.useState(false);

	// Set initial active organization only if user has exactly one organization
	React.useEffect(() => {
		if (organizations && organizations.length === 1 && !activeOrganization) {
			authClient.organization.setActive({
				organizationId: organizations[0].id,
			});
		}
	}, [organizations, activeOrganization]);

	const handleOrganizationCreated = React.useCallback(
		async (org: NonNullable<Awaited<ReturnType<typeof authClient.organization.create>>["data"]>) => {
			// Refetch organizations after creating a new one
			await refetchOrganizations();
			// Set the newly created organization as active
			await authClient.organization.setActive({
				organizationId: org.id,
			});
		},
		[refetchOrganizations],
	);

	const handleOrganizationSwitch = async (organizationId: string) => {
		await authClient.organization.setActive({
			organizationId,
		});
	};

	if (!organizations || organizations.length === 0) {
		return (
			<>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							size="lg"
							onClick={() => setShowCreateModal(true)}
							className="justify-start"
						>
							<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
								<Plus className="size-4" />
							</div>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-medium">
									Create Organization
								</span>
								<span className="truncate text-muted-foreground text-xs">
									Get started
								</span>
							</div>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
				<CreateOrganizationModal
					open={showCreateModal}
					onOpenChange={setShowCreateModal}
					onSuccess={handleOrganizationCreated}
				/>
			</>
		);
	}

	return (
		<>
			<SidebarMenu>
				<SidebarMenuItem>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<SidebarMenuButton
								size="lg"
								className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
							>
								<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
									<Building2 className="size-4" />
								</div>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-medium">
										{activeOrganization?.name || "Select Organization"}
									</span>
									<span className="truncate text-muted-foreground text-xs">
										{activeOrganization?.slug || "No organization"}
									</span>
								</div>
								<ChevronsUpDown className="ml-auto" />
							</SidebarMenuButton>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
							align="start"
							side={isMobile ? "bottom" : "right"}
							sideOffset={4}
						>
							<DropdownMenuLabel className="text-muted-foreground text-xs">
								Organizations
							</DropdownMenuLabel>
							{organizations.map((org, index) => (
								<DropdownMenuItem
									key={org.id}
									onClick={() => handleOrganizationSwitch(org.id)}
									className={cn(
										"gap-2 p-2",
										activeOrganization?.id === org.id && "bg-accent",
									)}
								>
									<div className="flex size-6 items-center justify-center rounded-md border">
										<Building2 className="size-3.5 shrink-0" />
									</div>
									<div className="flex-1">
										<div className="font-medium">{org.name}</div>
										<div className="text-muted-foreground text-xs">
											{org.slug}
										</div>
									</div>
									{activeOrganization?.id === org.id && (
										<Check className="h-4 w-4" />
									)}
									{index < 9 && (
										<DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
									)}
								</DropdownMenuItem>
							))}
							<DropdownMenuSeparator />
							<DropdownMenuItem
								className="gap-2 p-2"
								onSelect={(e) => {
									e.preventDefault();
									setShowCreateModal(true);
								}}
							>
								<div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
									<Plus className="size-4" />
								</div>
								<div className="font-medium text-muted-foreground">
									Add organization
								</div>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</SidebarMenuItem>
			</SidebarMenu>
			<CreateOrganizationModal
				open={showCreateModal}
				onOpenChange={setShowCreateModal}
				onSuccess={handleOrganizationCreated}
			/>
		</>
	);
}
