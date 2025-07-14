import { Head, Link, router, usePage } from "@inertiajs/react";
import {
	CalendarIcon,
	DollarSignIcon,
	EditIcon,
	EyeIcon,
	FolderIcon,
	MoreHorizontalIcon,
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
	customer: App.Data.Resources.CustomerResource;
	projects: App.Data.Resources.ProjectResource[];
}

function getStatusVariant(status: App.Enums.ProjectStatus) {
	switch (status) {
		case "active":
			return "default";
		case "on_hold":
			return "secondary";
		case "completed":
			return "outline";
		case "cancelled":
			return "destructive";
		default:
			return "default";
	}
}

function getStatusLabel(status: App.Enums.ProjectStatus) {
	switch (status) {
		case "active":
			return "Active";
		case "on_hold":
			return "On Hold";
		case "completed":
			return "Completed";
		case "cancelled":
			return "Cancelled";
		default:
			return "Unknown";
	}
}

export default function CustomerProjectsIndexPage({
	customer,
	projects,
}: Props) {
	const { auth } = usePage<SharedData>().props;
	const breadcrumbs: BreadcrumbItem[] = [
		{
			title: "Customers",
			href: "/customers",
		},
		{
			title: customer.name,
			href: route("customers.show", customer.id),
		},
		{
			title: "Projects",
			href: route("customers.projects.index", customer.id),
		},
	];

	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<Head title={`${customer.name} - Projects`} />

			<div className="flex h-full flex-1 flex-col gap-6 p-6">
				{/* Header */}
				<div className="flex items-start justify-between">
					<div className="flex items-center gap-4">
						<div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
							<FolderIcon className="h-6 w-6 text-primary" />
						</div>
						<div>
							<h1 className="text-3xl font-bold tracking-tight">Projects</h1>
							<p className="text-muted-foreground">
								{projects.length}{" "}
								{projects.length === 1 ? "project" : "projects"} for{" "}
								{customer.name}
							</p>
						</div>
					</div>
					{auth.canManageCompany && (
						<Button asChild>
							<Link href={route("customers.projects.create", customer.id)}>
								<PlusIcon className="h-4 w-4 mr-2" />
								New Project
							</Link>
						</Button>
					)}
				</div>

				{/* Projects Content */}
				{projects.length === 0 ? (
					<Card>
						<CardContent className="flex flex-col items-center justify-center py-16">
							<div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
								<FolderIcon className="h-10 w-10 text-muted-foreground" />
							</div>
							<h3 className="mt-4 text-lg font-semibold">No projects yet</h3>
							<p className="mt-2 text-center text-sm text-muted-foreground max-w-sm">
								Get started by creating the first project for {customer.name}.
								Projects help you organize and track work.
							</p>
							{auth.canManageCompany && (
								<Button className="mt-6" asChild>
									<Link href={route("customers.projects.create", customer.id)}>
										<PlusIcon className="h-4 w-4 mr-2" />
										Create First Project
									</Link>
								</Button>
							)}
						</CardContent>
					</Card>
				) : (
					<Card>
						<CardHeader>
							<CardTitle>Project Overview</CardTitle>
							<CardDescription>
								Manage and track all projects for {customer.name}
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Project Name</TableHead>
										<TableHead>Status</TableHead>
										<TableHead>Timeline</TableHead>
										<TableHead>Budget</TableHead>
										<TableHead className="w-[50px]"></TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{projects.map((project) => (
										<TableRow
											key={project.id}
											className="group cursor-pointer hover:bg-muted/50"
											onClick={() =>
												router.visit(route("projects.show", project.id))
											}
										>
											<TableCell>
												<div>
													<Link
														href={route("projects.show", project.id)}
														className="font-medium hover:underline"
														onClick={(e) => e.stopPropagation()}
													>
														{project.name}
													</Link>
													{project.description && (
														<p className="text-sm text-muted-foreground mt-1 line-clamp-1">
															{project.description}
														</p>
													)}
												</div>
											</TableCell>
											<TableCell>
												<Badge variant={getStatusVariant(project.status)}>
													{getStatusLabel(project.status)}
												</Badge>
											</TableCell>
											<TableCell>
												<div className="space-y-1">
													{project.start_date && (
														<div className="flex items-center gap-1 text-xs text-muted-foreground">
															<CalendarIcon className="h-3 w-3" />
															{new Date(
																project.start_date,
															).toLocaleDateString()}
														</div>
													)}
													{project.end_date && (
														<div className="text-xs text-muted-foreground">
															→{" "}
															{new Date(project.end_date).toLocaleDateString()}
														</div>
													)}
													{!project.start_date && !project.end_date && (
														<span className="text-xs text-muted-foreground">
															No timeline set
														</span>
													)}
												</div>
											</TableCell>
											<TableCell>
												{project.budget ? (
													<div className="flex items-center gap-1 font-medium">
														<DollarSignIcon className="h-3 w-3 text-muted-foreground" />
														{project.budget.toLocaleString()}
													</div>
												) : (
													<span className="text-muted-foreground text-sm">
														—
													</span>
												)}
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
															<Link href={route("projects.show", project.id)}>
																<EyeIcon className="h-4 w-4 mr-2" />
																View Details
															</Link>
														</DropdownMenuItem>
														{auth.canManageCompany && (
															<DropdownMenuItem asChild>
																<Link href={route("projects.edit", project.id)}>
																	<EditIcon className="h-4 w-4 mr-2" />
																	Edit Project
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
