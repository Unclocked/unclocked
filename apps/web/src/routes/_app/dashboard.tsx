import { useMutation, useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useId, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { trpc } from "@/utils/trpc";

export const Route = createFileRoute("/_app/dashboard")({
	component: RouteComponent,
});

function RouteComponent() {
	const { data: session, isPending } = authClient.useSession();
	const { data: organizations } = authClient.useListOrganizations();

	const navigate = Route.useNavigate();

	const privateData = useQuery(trpc.privateData.queryOptions());

	// Organization form state
	const [orgName, setOrgName] = useState("");
	const [orgSlug, setOrgSlug] = useState("");

	// Customer form state
	const [customerName, setCustomerName] = useState("");
	const [selectedOrgId, setSelectedOrgId] = useState("");

	// Current organization selector
	const [currentOrgId, setCurrentOrgId] = useState("");

	// Generate unique IDs for form fields
	const orgNameId = useId();
	const orgSlugId = useId();
	const customerNameId = useId();
	const orgSelectId = useId();
	const currentOrgSelectId = useId();

	// Mutations using new tRPC integration
	const createCustomerMutation = useMutation(
		trpc.customers.create.mutationOptions(),
	)

	const handleCreateOrganization = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!orgName || !orgSlug) return;

		try {
			const { data } = await authClient.organization.create({
				name: orgName,
				slug: orgSlug,
			})
			console.log("Organization created:", data);
			setOrgName("");
			setOrgSlug("");
		} catch (error) {
			console.error("Failed to create organization:", error);
		}
	}

	const handleCreateCustomer = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!customerName || !selectedOrgId) return;

		try {
			await createCustomerMutation.mutateAsync({
				name: customerName,
				organizationId: selectedOrgId,
			})
			console.log("Customer created successfully");
			setCustomerName("");
			setSelectedOrgId("");
		} catch (error) {
			console.error("Failed to create customer:", error);
		}
	}

	// Set default organization when organizations load
	useEffect(() => {
		if (organizations && organizations.length > 0 && !currentOrgId) {
			setCurrentOrgId(organizations[0].id);
		}
	}, [organizations, currentOrgId]);

	useEffect(() => {
		if (!session && !isPending) {
			navigate({
				to: "/sign-in",
			})
		}
	}, [session, isPending, navigate]);

	if (isPending) {
		return <div>Loading...</div>;
	}

	const currentOrg = organizations?.find((org) => org.id === currentOrgId);

	return (
		<div className="mx-auto max-w-6xl">
			<h1 className="mb-6 font-bold text-3xl">Dashboard</h1>
			<p className="mb-4">Welcome {session?.user.name}</p>
			<p className="mb-4">privateData: {privateData.data?.message}</p>

			{/* Organization Selector */}
			<div className="mb-6 rounded-lg bg-blue-50 p-4">
				<label
					htmlFor={currentOrgSelectId}
					className="mb-2 block font-medium text-gray-700 text-sm"
				>
					Current Organization
				</label>
				<select
					id={currentOrgSelectId}
					value={currentOrgId}
					onChange={(e) => setCurrentOrgId(e.target.value)}
					className="w-full max-w-xs rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
				>
					<option value="">Select an organization</option>
					{organizations?.map((org) => (
						<option key={org.id} value={org.id}>
							{org.name} ({org.slug})
						</option>
					))}
				</select>
				{currentOrg && (
					<p className="mt-2 text-gray-600 text-sm">
						Working in: <strong>{currentOrg.name}</strong>
					</p>
				)}
			</div>

			<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
				{/* Create Organization Form */}
				<div className="rounded-lg bg-gray-50 p-4">
					<h2 className="mb-4 font-semibold text-xl">Create Organization</h2>
					<form onSubmit={handleCreateOrganization} className="space-y-4">
						<div>
							<label
								htmlFor={orgNameId}
								className="mb-1 block font-medium text-gray-700 text-sm"
							>
								Organization Name
							</label>
							<input
								id={orgNameId}
								type="text"
								value={orgName}
								onChange={(e) => setOrgName(e.target.value)}
								className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
								placeholder="Enter organization name"
								required
							/>
						</div>
						<div>
							<label
								htmlFor={orgSlugId}
								className="mb-1 block font-medium text-gray-700 text-sm"
							>
								Organization Slug
							</label>
							<input
								id={orgSlugId}
								type="text"
								value={orgSlug}
								onChange={(e) => setOrgSlug(e.target.value)}
								className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
								placeholder="Enter organization slug"
								required
							/>
						</div>
						<button
							type="submit"
							className="w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
						>
							Create Organization
						</button>
					</form>
				</div>

				{/* Create Customer Form */}
				<div className="rounded-lg bg-gray-50 p-4">
					<h2 className="mb-4 font-semibold text-xl">Create Customer</h2>
					<form onSubmit={handleCreateCustomer} className="space-y-4">
						<div>
							<label
								htmlFor={customerNameId}
								className="mb-1 block font-medium text-gray-700 text-sm"
							>
								Customer Name
							</label>
							<input
								id={customerNameId}
								type="text"
								value={customerName}
								onChange={(e) => setCustomerName(e.target.value)}
								className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
								placeholder="Enter customer name"
								required
							/>
						</div>
						<div>
							<label
								htmlFor={orgSelectId}
								className="mb-1 block font-medium text-gray-700 text-sm"
							>
								Organization
							</label>
							<select
								id={orgSelectId}
								value={selectedOrgId}
								onChange={(e) => setSelectedOrgId(e.target.value)}
								className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
								required
							>
								<option value="">Select an organization</option>
								{organizations?.map((org) => (
									<option key={org.id} value={org.id}>
										{org.name}
									</option>
								))}
							</select>
						</div>
						<button
							type="submit"
							disabled={createCustomerMutation.isPending}
							className="w-full rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
						>
							{createCustomerMutation.isPending
								? "Creating..."
								: "Create Customer"}
						</button>
					</form>
				</div>
			</div>

			{/* Display mutation status */}
			{createCustomerMutation.error && (
				<div className="mt-4 rounded border border-red-400 bg-red-100 p-4 text-red-700">
					Error creating customer: {createCustomerMutation.error.message}
				</div>
			)}
			{createCustomerMutation.isSuccess && (
				<div className="mt-4 rounded border border-green-400 bg-green-100 p-4 text-green-700">
					Customer created successfully!
				</div>
			)}
		</div>
	)
}
