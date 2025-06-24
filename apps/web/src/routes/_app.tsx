import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppSidebar } from "@/components/app-sidebar";
import Header from "@/components/header";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export const Route = createFileRoute("/_app")({
	component: AppLayout,
});

function AppLayout() {
	return (
		<SidebarProvider>
			<div className="flex h-svh w-full">
				<AppSidebar />
				<div className="flex flex-1 flex-col">
					<header className="flex h-14 items-center border-b px-4">
						<SidebarTrigger className="mr-4" />
						<div className="flex-1">
							<Header />
						</div>
					</header>
					<main className="flex-1 overflow-auto p-4">
						<Outlet />
					</main>
				</div>
			</div>
		</SidebarProvider>
	);
}