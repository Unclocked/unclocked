import { Head } from "@inertiajs/react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { CreateCustomerForm } from "@/features/customers/components/create-customer-form";
import AppLayout from "@/layouts/app-layout";
import type { BreadcrumbItem } from "@/types";

const breadcrumbs: BreadcrumbItem[] = [
	{
		title: "Customers",
		href: "/customers",
	},
	{
		title: "Create Customer",
		href: "/customers/create",
	},
];

export default function CreateCustomerPage() {
	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<Head title="Create Customer" />

			<div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
				<div className="max-w-2xl mx-auto w-full">
					<Card>
						<CardHeader>
							<CardTitle>Create Customer</CardTitle>
							<CardDescription>
								Add a new customer to your organization.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<CreateCustomerForm />
						</CardContent>
					</Card>
				</div>
			</div>
		</AppLayout>
	);
}
