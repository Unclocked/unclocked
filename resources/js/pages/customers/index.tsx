import { Head, Link, router, usePage } from "@inertiajs/react";
import {
	BuildingIcon,
	EditIcon,
	EyeIcon,
	FolderIcon,
	MailIcon,
	MapPinIcon,
	MoreHorizontalIcon,
	PhoneIcon,
	PlusIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import AppLayout from "@/layouts/app-layout";
import type { BreadcrumbItem, SharedData } from "@/types";

interface Props {
	customers: App.Data.Resources.CustomerResource[];
}

const breadcrumbs: BreadcrumbItem[] = [
	{
		title: "Customers",
		href: "/customers",
	},
];

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

export default function CustomersIndexPage({ customers }: Props) {
	const { auth } = usePage<SharedData>().props;

	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<Head title="Customers" />

			<div className="flex h-full flex-1 flex-col gap-6 p-6">
				{/* Header */}
				<div className="flex items-start justify-between">
					<div className="flex items-center gap-4">
						<div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
							<BuildingIcon className="h-6 w-6 text-primary" />
						</div>
						<div>
							<h1 className="text-3xl font-bold tracking-tight">Customers</h1>
							<p className="text-muted-foreground">
								{customers.length}{" "}
								{customers.length === 1 ? "customer" : "customers"} in your
								organization
							</p>
						</div>
					</div>
					{auth.canManageCompany && (
						<Button asChild>
							<Link href={route("customers.create")}>
								<PlusIcon className="h-4 w-4 mr-2" />
								New Customer
							</Link>
						</Button>
					)}
				</div>

				{/* Customers Content */}
				{customers.length === 0 ? (
					<Card>
						<CardContent className="flex flex-col items-center justify-center py-16">
							<div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
								<BuildingIcon className="h-10 w-10 text-muted-foreground" />
							</div>
							<h3 className="mt-4 text-lg font-semibold">No customers yet</h3>
							<p className="mt-2 text-center text-sm text-muted-foreground max-w-sm">
								Get started by adding your first customer. Customers help you
								organize projects and track time.
							</p>
							{auth.canManageCompany && (
								<Button className="mt-6" asChild>
									<Link href={route("customers.create")}>
										<PlusIcon className="h-4 w-4 mr-2" />
										Add First Customer
									</Link>
								</Button>
							)}
						</CardContent>
					</Card>
				) : (
					<Card>
						<CardHeader>
							<CardTitle>Customer Directory</CardTitle>
							<CardDescription>
								Manage your customer relationships and contact information
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Customer</TableHead>
										<TableHead>Contact Information</TableHead>
										<TableHead>Status</TableHead>
										<TableHead>Projects</TableHead>
										<TableHead className="w-[50px]"></TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{customers.map((customer) => (
										<TableRow
											key={customer.id}
											className="group cursor-pointer hover:bg-muted/50"
											onClick={() =>
												router.visit(route("customers.show", customer.id))
											}
										>
											<TableCell>
												<div>
													<Link
														href={route("customers.show", customer.id)}
														className="font-medium hover:underline"
														onClick={(e) => e.stopPropagation()}
													>
														{customer.name}
													</Link>
													{customer.address && (
														<div className="flex items-center gap-1 mt-1">
															<MapPinIcon className="h-3 w-3 text-muted-foreground" />
															<p className="text-sm text-muted-foreground line-clamp-1">
																{customer.address}
															</p>
														</div>
													)}
												</div>
											</TableCell>
											<TableCell>
												<div className="space-y-1">
													{customer.email && (
														<div className="flex items-center gap-1 text-sm">
															<MailIcon className="h-3 w-3 text-muted-foreground" />
															<span>{customer.email}</span>
														</div>
													)}
													{customer.phone && (
														<div className="flex items-center gap-1 text-sm text-muted-foreground">
															<PhoneIcon className="h-3 w-3" />
															<span>{customer.phone}</span>
														</div>
													)}
													{!customer.email && !customer.phone && (
														<span className="text-sm text-muted-foreground">
															No contact info
														</span>
													)}
												</div>
											</TableCell>
											<TableCell>
												<Badge variant={getStatusVariant(customer.status)}>
													{getStatusLabel(customer.status)}
												</Badge>
											</TableCell>
											<TableCell>
												<Button variant="outline" size="sm" asChild>
													<Link
														href={route(
															"customers.projects.index",
															customer.id,
														)}
														onClick={(e) => e.stopPropagation()}
													>
														<FolderIcon className="h-3 w-3 mr-1" />
														View Projects
													</Link>
												</Button>
											</TableCell>
											<TableCell>
												<DropdownMenu>
													<DropdownMenuTrigger asChild>
														<Button
															variant="ghost"
															size="sm"
															className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
															onClick={(e) => e.stopPropagation()}
														>
															<MoreHorizontalIcon className="h-4 w-4" />
														</Button>
													</DropdownMenuTrigger>
													<DropdownMenuContent align="end">
														<DropdownMenuItem asChild>
															<Link href={route("customers.show", customer.id)}>
																<EyeIcon className="h-4 w-4 mr-2" />
																View Details
															</Link>
														</DropdownMenuItem>
														{auth.canManageCompany && (
															<DropdownMenuItem asChild>
																<Link
																	href={route("customers.edit", customer.id)}
																>
																	<EditIcon className="h-4 w-4 mr-2" />
																	Edit Customer
																</Link>
															</DropdownMenuItem>
														)}
													</DropdownMenuContent>
												</DropdownMenu>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</CardContent>
					</Card>
				)}
			</div>
		</AppLayout>
	);
}
