import { Head, Link, usePage } from "@inertiajs/react";
import {
	BuildingIcon,
	EditIcon,
	FolderIcon,
	MailIcon,
	MapPinIcon,
	PhoneIcon,
	PlusIcon,
	StickyNoteIcon,
	TrashIcon,
	UserIcon,
} from "lucide-react";
import { useState } from "react";
import { DeletionDialog } from "@/components/deletion-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useDeleteCustomer } from "@/features/customers/customers.hooks";
import AppLayout from "@/layouts/app-layout";
import type { BreadcrumbItem, SharedData } from "@/types";

interface Props {
	customer: App.Data.Resources.CustomerResource;
}

function getStatusVariant(status: App.Enums.CustomerStatus) {
	switch (status) {
		case "active":
			return "default";
		case "inactive":
			return "secondary";
		case "archived":
			return "outline";
		default:
			return "default";
	}
}

function getStatusLabel(status: App.Enums.CustomerStatus) {
	switch (status) {
		case "active":
			return "Active";
		case "inactive":
			return "Inactive";
		case "archived":
			return "Archived";
		default:
			return "Unknown";
	}
}

export default function ShowCustomerPage({ customer }: Props) {
	const { auth } = usePage<SharedData>().props;
	const [showDeleteDialog, setShowDeleteDialog] = useState(false);
	const { mutate: deleteCustomer, isPending: isDeleting } = useDeleteCustomer();

	const breadcrumbs: BreadcrumbItem[] = [
		{
			title: "Customers",
			href: "/customers",
		},
		{
			title: customer.name,
			href: route("customers.show", customer.id),
		},
	];

	const handleDelete = () => {
		setShowDeleteDialog(true);
	};

	const handleConfirmDelete = () => {
		deleteCustomer(customer.id);
		setShowDeleteDialog(false);
	};

	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<Head title={customer.name} />

			<div className="flex h-full flex-1 flex-col gap-6 p-6">
				{/* Header Section */}
				<div className="flex items-start justify-between">
					<div className="flex items-center gap-4">
						<div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
							<BuildingIcon className="h-6 w-6 text-primary" />
						</div>
						<div>
							<h1 className="text-3xl font-bold tracking-tight">
								{customer.name}
							</h1>
							<div className="flex items-center gap-2 mt-1">
								<Badge variant={getStatusVariant(customer.status)}>
									{getStatusLabel(customer.status)}
								</Badge>
								<span className="text-sm text-muted-foreground">Customer</span>
							</div>
						</div>
					</div>
					{auth.canManageCompany && (
						<div className="flex gap-2">
							<Button variant="outline" asChild>
								<Link href={route("customers.edit", customer.id)}>
									<EditIcon className="h-4 w-4 mr-2" />
									Edit Customer
								</Link>
							</Button>
							<Button variant="destructive" onClick={handleDelete}>
								<TrashIcon className="h-4 w-4 mr-2" />
								Delete
							</Button>
						</div>
					)}
				</div>

				<div className="grid gap-6 lg:grid-cols-3">
					{/* Contact Information */}
					<div className="lg:col-span-2 space-y-6">
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<UserIcon className="h-5 w-5" />
									Contact Information
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="grid gap-4 sm:grid-cols-2">
									{customer.email && (
										<div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
											<div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-100 dark:bg-blue-900/20">
												<MailIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
											</div>
											<div>
												<p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
													Email
												</p>
												<p className="font-medium">{customer.email}</p>
											</div>
										</div>
									)}

									{customer.phone && (
										<div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
											<div className="flex h-8 w-8 items-center justify-center rounded-md bg-green-100 dark:bg-green-900/20">
												<PhoneIcon className="h-4 w-4 text-green-600 dark:text-green-400" />
											</div>
											<div>
												<p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
													Phone
												</p>
												<p className="font-medium">{customer.phone}</p>
											</div>
										</div>
									)}

									{customer.address && (
										<div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 sm:col-span-2">
											<div className="flex h-8 w-8 items-center justify-center rounded-md bg-orange-100 dark:bg-orange-900/20 mt-0.5">
												<MapPinIcon className="h-4 w-4 text-orange-600 dark:text-orange-400" />
											</div>
											<div>
												<p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
													Address
												</p>
												<p className="font-medium whitespace-pre-wrap">
													{customer.address}
												</p>
											</div>
										</div>
									)}
								</div>
							</CardContent>
						</Card>

						{customer.notes && (
							<Card>
								<CardHeader>
									<CardTitle className="flex items-center gap-2">
										<StickyNoteIcon className="h-5 w-5" />
										Notes
									</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="p-4 rounded-lg bg-muted/50">
										<p className="whitespace-pre-wrap">{customer.notes}</p>
									</div>
								</CardContent>
							</Card>
						)}
					</div>

					{/* Projects Sidebar */}
					<div className="space-y-6">
						<Card>
							<CardHeader>
								<div className="flex items-center justify-between">
									<CardTitle className="flex items-center gap-2">
										<FolderIcon className="h-5 w-5" />
										Projects
									</CardTitle>
									{auth.canManageCompany && (
										<Button size="sm" asChild>
											<Link
												href={route("customers.projects.create", customer.id)}
											>
												<PlusIcon className="h-4 w-4 mr-2" />
												New
											</Link>
										</Button>
									)}
								</div>
								<CardDescription>Projects for this customer</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-3">
									<Button
										variant="outline"
										className="w-full justify-start"
										asChild
									>
										<Link href={route("customers.projects.index", customer.id)}>
											<FolderIcon className="h-4 w-4 mr-2" />
											View All Projects
										</Link>
									</Button>
									<p className="text-sm text-muted-foreground">
										Manage and track all projects for {customer.name}.
									</p>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>

				<DeletionDialog
					open={showDeleteDialog}
					onOpenChange={setShowDeleteDialog}
					onConfirm={handleConfirmDelete}
					title="Delete Customer"
					description="This action cannot be undone. This will permanently delete the customer and remove all associated data."
					itemName={customer.name}
					isLoading={isDeleting}
				/>
			</div>
		</AppLayout>
	);
}
