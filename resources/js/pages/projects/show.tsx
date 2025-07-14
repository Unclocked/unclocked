import { Head, Link, usePage } from "@inertiajs/react";
import {
	BuildingIcon,
	CalendarIcon,
	ClockIcon,
	DollarSignIcon,
	EditIcon,
	FolderIcon,
	PlayIcon,
	TrashIcon,
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
import { Separator } from "@/components/ui/separator";
import { useDeleteProject } from "@/features/projects/projects.hooks";
import AppLayout from "@/layouts/app-layout";
import type { BreadcrumbItem, SharedData } from "@/types";

interface Props {
	project: App.Data.Resources.ProjectResource;
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

export default function ShowProjectPage({ project }: Props) {
	const { auth } = usePage<SharedData>().props;
	const [showDeleteDialog, setShowDeleteDialog] = useState(false);
	const { mutate: deleteProject, isPending: isDeleting } = useDeleteProject();

	const breadcrumbs: BreadcrumbItem[] = [
		{
			title: "Customers",
			href: "/customers",
		},
		...(project.customer
			? [
					{
						title: project.customer.name,
						href: route("customers.show", project.customer.id),
					},
				]
			: []),
		{
			title: "Projects",
			href: project.customer
				? route("customers.projects.index", project.customer.id)
				: "/customers",
		},
		{
			title: project.name,
			href: route("projects.show", project.id),
		},
	];

	const handleDelete = () => {
		setShowDeleteDialog(true);
	};

	const handleConfirmDelete = () => {
		deleteProject(project.id);
		setShowDeleteDialog(false);
	};

	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<Head title={project.name} />

			<div className="flex h-full flex-1 flex-col gap-6 p-6">
				{/* Header Section */}
				<div className="flex items-start justify-between">
					<div className="flex items-center gap-4">
						<div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
							<FolderIcon className="h-6 w-6 text-primary" />
						</div>
						<div>
							<h1 className="text-3xl font-bold tracking-tight">
								{project.name}
							</h1>
							<div className="flex items-center gap-2 mt-1">
								<Badge variant={getStatusVariant(project.status)}>
									{getStatusLabel(project.status)}
								</Badge>
								{project.customer && (
									<>
										<span className="text-muted-foreground">·</span>
										<Link
											href={route("customers.show", project.customer.id)}
											className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
										>
											<BuildingIcon className="h-3 w-3" />
											{project.customer.name}
										</Link>
									</>
								)}
							</div>
						</div>
					</div>
					<div className="flex gap-2">
						<Button variant="default" size="sm">
							<PlayIcon className="h-4 w-4 mr-2" />
							Start Timer
						</Button>
						{auth.canManageCompany && (
							<>
								<Button variant="outline" asChild>
									<Link href={route("projects.edit", project.id)}>
										<EditIcon className="h-4 w-4 mr-2" />
										Edit Project
									</Link>
								</Button>
								<Button variant="destructive" onClick={handleDelete}>
									<TrashIcon className="h-4 w-4 mr-2" />
									Delete
								</Button>
							</>
						)}
					</div>
				</div>

				<div className="grid gap-6 lg:grid-cols-3">
					{/* Project Details */}
					<div className="lg:col-span-2 space-y-6">
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<FolderIcon className="h-5 w-5" />
									Project Overview
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-6">
								{project.description && (
									<div>
										<h4 className="text-sm font-medium text-muted-foreground mb-2">
											Description
										</h4>
										<div className="p-4 rounded-lg bg-muted/50">
											<p className="whitespace-pre-wrap">
												{project.description}
											</p>
										</div>
									</div>
								)}

								<div className="grid gap-4 sm:grid-cols-2">
									{(project.start_date || project.end_date) && (
										<div className="p-4 rounded-lg bg-muted/50">
											<div className="flex items-center gap-2 mb-2">
												<CalendarIcon className="h-4 w-4 text-muted-foreground" />
												<h4 className="text-sm font-medium text-muted-foreground">
													Timeline
												</h4>
											</div>
											<div className="space-y-1">
												{project.start_date && (
													<p className="text-sm">
														<strong>Start:</strong>{" "}
														{new Date(project.start_date).toLocaleDateString()}
													</p>
												)}
												{project.end_date && (
													<p className="text-sm">
														<strong>End:</strong>{" "}
														{new Date(project.end_date).toLocaleDateString()}
													</p>
												)}
											</div>
										</div>
									)}

									{project.budget && (
										<div className="p-4 rounded-lg bg-muted/50">
											<div className="flex items-center gap-2 mb-2">
												<DollarSignIcon className="h-4 w-4 text-muted-foreground" />
												<h4 className="text-sm font-medium text-muted-foreground">
													Budget
												</h4>
											</div>
											<p className="text-2xl font-bold">
												${project.budget.toLocaleString()}
											</p>
										</div>
									)}
								</div>
							</CardContent>
						</Card>

						{/* Time Tracking Section */}
						<Card>
							<CardHeader>
								<div className="flex items-center justify-between">
									<CardTitle className="flex items-center gap-2">
										<ClockIcon className="h-5 w-5" />
										Time Tracking
									</CardTitle>
									<Button size="sm">
										<PlayIcon className="h-4 w-4 mr-2" />
										Start Timer
									</Button>
								</div>
								<CardDescription>
									Track time and monitor progress for this project
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="text-center py-8">
									<ClockIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
									<h4 className="text-lg font-semibold mb-2">
										No time entries yet
									</h4>
									<p className="text-sm text-muted-foreground mb-4">
										Start tracking time for this project to see detailed reports
										and analytics.
									</p>
									<Button>
										<PlayIcon className="h-4 w-4 mr-2" />
										Start First Timer
									</Button>
								</div>
							</CardContent>
						</Card>
					</div>

					{/* Sidebar */}
					<div className="space-y-6">
						<Card>
							<CardHeader>
								<CardTitle>Quick Stats</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex items-center justify-between">
									<span className="text-sm text-muted-foreground">
										Total Time
									</span>
									<span className="font-medium">0h 0m</span>
								</div>
								<Separator />
								<div className="flex items-center justify-between">
									<span className="text-sm text-muted-foreground">
										Time Entries
									</span>
									<span className="font-medium">0</span>
								</div>
								<Separator />
								<div className="flex items-center justify-between">
									<span className="text-sm text-muted-foreground">Status</span>
									<Badge
										variant={getStatusVariant(project.status)}
										className="text-xs"
									>
										{getStatusLabel(project.status)}
									</Badge>
								</div>
							</CardContent>
						</Card>

						{project.customer && (
							<Card>
								<CardHeader>
									<CardTitle className="flex items-center gap-2">
										<BuildingIcon className="h-5 w-5" />
										Customer
									</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="space-y-3">
										<div>
											<p className="font-medium">{project.customer.name}</p>
											<p className="text-sm text-muted-foreground">Customer</p>
										</div>
										<div className="flex gap-2">
											<Button
												variant="outline"
												size="sm"
												className="flex-1"
												asChild
											>
												<Link
													href={route("customers.show", project.customer.id)}
												>
													View Details
												</Link>
											</Button>
											<Button
												variant="outline"
												size="sm"
												className="flex-1"
												asChild
											>
												<Link
													href={route(
														"customers.projects.index",
														project.customer.id,
													)}
												>
													All Projects
												</Link>
											</Button>
										</div>
									</div>
								</CardContent>
							</Card>
						)}
					</div>
				</div>

				<DeletionDialog
					open={showDeleteDialog}
					onOpenChange={setShowDeleteDialog}
					onConfirm={handleConfirmDelete}
					title="Delete Project"
					description="This action cannot be undone. This will permanently delete the project and all associated time entries."
					itemName={project.name}
					isLoading={isDeleting}
				/>
			</div>
		</AppLayout>
	);
}
