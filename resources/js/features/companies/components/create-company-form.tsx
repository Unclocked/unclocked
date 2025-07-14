import { CheckIcon, Loader2Icon, XIcon } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { generateSlug } from "@/lib/utils";
import { useCreateCompany, useSlugAvailability } from "../companies.hooks";

export function CreateCompanyForm() {
	const form = useForm<App.Data.Requests.CreateCompanyData>();
	const slugAvailability = useSlugAvailability(form);
	const { mutate: createCompany, isPending } = useCreateCompany();

	useEffect(() => {
		const subscription = form.watch((value, { name }) => {
			if (name === "name" && value.name) {
				const generatedSlug = generateSlug(value.name);
				form.setValue("slug", generatedSlug);
			}
		});

		return () => subscription.unsubscribe();
	}, [form]);

	const handleSubmit = form.handleSubmit((data) => {
		console.log(data);
		createCompany(data);
	});

	return (
		<Form {...form}>
			<form onSubmit={handleSubmit} className="space-y-6">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Company Name</FormLabel>
							<FormControl>
								<Input placeholder="Unclocked LLC" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="slug"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Company URL</FormLabel>
							<FormControl>
								<div className="relative">
									<Input placeholder="unclocked" {...field} className="pr-10" />
									<div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
										{slugAvailability.isChecking && (
											<Loader2Icon className="h-4 w-4 animate-spin text-muted-foreground" />
										)}
										{!slugAvailability.isChecking &&
											slugAvailability.available === true && (
												<CheckIcon className="h-4 w-4 text-green-600" />
											)}
										{!slugAvailability.isChecking &&
											slugAvailability.available === false && (
												<XIcon className="h-4 w-4 text-red-600" />
											)}
									</div>
								</div>
							</FormControl>
							<FormDescription>
								{!slugAvailability.isChecking &&
									slugAvailability.available === true && (
										<span className="text-green-600">
											✓ {slugAvailability.message}
										</span>
									)}
								{!slugAvailability.isChecking &&
									slugAvailability.available === false && (
										<span className="text-red-600">
											✗ {slugAvailability.message}
										</span>
									)}
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					type="submit"
					className="w-full"
					disabled={
						slugAvailability.available === false ||
						slugAvailability.isChecking ||
						isPending
					}
				>
					{isPending ? (
						<>
							<Loader2Icon className="h-4 w-4 animate-spin mr-2" />
							Creating Company...
						</>
					) : (
						"Create Company"
					)}
				</Button>
			</form>
		</Form>
	);
}
