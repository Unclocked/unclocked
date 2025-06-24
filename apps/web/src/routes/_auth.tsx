import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
	component: AuthLayout,
});

function AuthLayout() {
	return (
		<div className="flex min-h-screen items-center justify-center">
			<div className="w-full max-w-[400px] space-y-6 px-4">
				<Outlet />
			</div>
		</div>
	);
}
