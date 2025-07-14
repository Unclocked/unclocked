import { Head } from "@inertiajs/react";
import { Loader2Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
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
import { useUpdateCustomer } from "@/features/customers/customers.hooks";
import AppLayout from "@/layouts/app-layout";
import type { BreadcrumbItem } from "@/types";

interface Props {
	customer: App.Data.Resources.CustomerResource;
}

interface CustomerFormData {
	name: string;
	email: string;
	phone: string;
	address: string;
	notes: string;
	status: App.Enums.CustomerStatus;
}

export default function EditCustomerPage({ customer }: Props) {
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
			title: "Edit",
			href: route("customers.edit", customer.id),
		},
	];

	const form = useForm<CustomerFormData>({
		defaultValues: {
			name: customer.name,
			email: customer.email || "",
			phone: customer.phone || "",
			address: customer.address || "",
			notes: customer.notes || "",
			status: customer.status,
		},
	});

	const { mutate: updateCustomer, isPending } = useUpdateCustomer();

	const handleSubmit = form.handleSubmit((data) => {
		const apiData: App.Data.Requests.UpdateCustomerData = {
			name: data.name,
			email: data.email || null,
			phone: data.phone || null,
			address: data.address || null,
			notes: data.notes || null,
			status: data.status,
		};
		updateCustomer({
			id: customer.id,
			data: apiData,
		});
	});

	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<Head title={`Edit ${customer.name}`} />

			<div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
				<div className="max-w-2xl mx-auto w-full">
					<Card>
						<CardHeader>
							<CardTitle>Edit Customer</CardTitle>
							<CardDescription>Update customer information.</CardDescription>
						</CardHeader>
						<CardContent>
							<Form {...form}>
								<form onSubmit={handleSubmit} className="space-y-6">
									<FormField
										control={form.control}
										name="name"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Name</FormLabel>
												<FormControl>
													<Input placeholder="Customer name" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="email"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Email</FormLabel>
												<FormControl>
													<Input
														type="email"
														placeholder="customer@example.com"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="phone"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Phone</FormLabel>
												<FormControl>
													<Input placeholder="+1 (555) 123-4567" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="address"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Address</FormLabel>
												<FormControl>
													<Textarea
														placeholder="Customer address..."
														className="resize-none"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="notes"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Notes</FormLabel>
												<FormControl>
													<Textarea
														placeholder="Additional notes about the customer..."
														className="resize-none"
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
														<SelectItem value="inactive">Inactive</SelectItem>
														<SelectItem value="archived">Archived</SelectItem>
													</SelectContent>
												</Select>
												<FormMessage />
											</FormItem>
										)}
									/>

									<Button type="submit" className="w-full" disabled={isPending}>
										{isPending ? (
											<>
												<Loader2Icon className="h-4 w-4 animate-spin mr-2" />
												Updating Customer...
											</>
										) : (
											"Update Customer"
										)}
									</Button>
								</form>
							</Form>
						</CardContent>
					</Card>
				</div>
			</div>
		</AppLayout>
	);
}
