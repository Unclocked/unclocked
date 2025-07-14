import { Loader2Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCreateProject } from "../projects.hooks";

interface CreateProjectFormProps {
	customers: App.Data.Resources.CustomerResource[];
}

interface ProjectFormData {
	customer_id: string;
	name: string;
	description: string;
	status: App.Enums.ProjectStatus;
	start_date: string;
	end_date: string;
	budget: string;
}

export function CreateProjectForm({ customers }: CreateProjectFormProps) {
	const form = useForm<ProjectFormData>({
		defaultValues: {
			customer_id: "",
			name: "",
			description: "",
			status: "active" as App.Enums.ProjectStatus,
			start_date: "",
			end_date: "",
			budget: "",
		},
	});

	const { mutate: createProject, isPending } = useCreateProject();

	const handleSubmit = form.handleSubmit((data) => {
		// Convert empty strings to null for optional fields to match API
		const cleanData: App.Data.Requests.CreateProjectData = {
			customer_id: data.customer_id,
			name: data.name,
			description: data.description || null,
			status: data.status,
			start_date: data.start_date || null,
			end_date: data.end_date || null,
			budget: data.budget ? parseFloat(data.budget) : null,
		};
		createProject(cleanData);
	});

	return (
		<Form {...form}>
			<form onSubmit={handleSubmit} className="space-y-6">
				<FormField
					control={form.control}
					name="customer_id"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Customer</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Select a customer" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{customers.map((customer) => (
										<SelectItem key={customer.id} value={customer.id}>
											{customer.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Project Name</FormLabel>
							<FormControl>
								<Input placeholder="Project name" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description</FormLabel>
							<FormControl>
								<Textarea
									placeholder="Project description..."
									className="resize-none"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
					<FormField
						control={form.control}
						name="start_date"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Start Date</FormLabel>
								<FormControl>
									<Input type="date" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="end_date"
						render={({ field }) => (
							<FormItem>
								<FormLabel>End Date</FormLabel>
								<FormControl>
									<Input type="date" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
					<FormField
						control={form.control}
						name="budget"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Budget</FormLabel>
								<FormControl>
									<Input
										type="number"
										placeholder="0.00"
										step="0.01"
										min="0"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="status"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Status</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select status" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value="active">Active</SelectItem>
										<SelectItem value="on_hold">On Hold</SelectItem>
										<SelectItem value="completed">Completed</SelectItem>
										<SelectItem value="cancelled">Cancelled</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<Button type="submit" className="w-full" disabled={isPending}>
					{isPending ? (
						<>
							<Loader2Icon className="h-4 w-4 animate-spin mr-2" />
							Creating Project...
						</>
					) : (
						"Create Project"
					)}
				</Button>
			</form>
		</Form>
	);
}
