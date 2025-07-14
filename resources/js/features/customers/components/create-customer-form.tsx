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
import { useCreateCustomer } from "../customers.hooks";

interface CustomerFormData {
	name: string;
	email: string;
	phone: string;
	address: string;
	notes: string;
	status: App.Enums.CustomerStatus;
}

export function CreateCustomerForm() {
	const form = useForm<CustomerFormData>({
		defaultValues: {
			name: "",
			email: "",
			phone: "",
			address: "",
			notes: "",
			status: "active" as App.Enums.CustomerStatus,
		},
	});

	const { mutate: createCustomer, isPending } = useCreateCustomer();

	const handleSubmit = form.handleSubmit((data) => {
		const apiData: App.Data.Requests.CreateCustomerData = {
			name: data.name,
			email: data.email || null,
			phone: data.phone || null,
			address: data.address || null,
			notes: data.notes || null,
			status: data.status,
		};
		createCustomer(apiData);
	});

	return (
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
							<Select onValueChange={field.onChange} defaultValue={field.value}>
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
							Creating Customer...
						</>
					) : (
						"Create Customer"
					)}
				</Button>
			</form>
		</Form>
	);
}
