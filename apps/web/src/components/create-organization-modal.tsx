import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { createOrganizationSchema, generateSlug } from "@unclocked/shared";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
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
import { authClient } from "@/lib/auth-client";

type Organization = NonNullable<
	Awaited<ReturnType<typeof authClient.organization.create>>["data"]
>;

interface CreateOrganizationModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onSuccess?: (organization: Organization) => void;
}

type FormData = z.infer<typeof createOrganizationSchema>;

export function CreateOrganizationModal({
	open,
	onOpenChange,
	onSuccess,
}: CreateOrganizationModalProps) {
	const [checkingSlug, setCheckingSlug] = useState(false);
	const [slugAvailable, setSlugAvailable] = useState<boolean | null>(null);
	const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

	const form = useForm<FormData>({
		resolver: zodResolver(createOrganizationSchema),
		defaultValues: {
			name: "",
			slug: "",
		},
	});

	const nameValue = form.watch("name");
	const slugValue = form.watch("slug");

	// Auto-generate slug from name
	useEffect(() => {
		if (!slugManuallyEdited && nameValue) {
			const generatedSlug = generateSlug(nameValue);
			form.setValue("slug", generatedSlug, { shouldValidate: true });
		}
	}, [nameValue, slugManuallyEdited, form]);

	// Check slug availability using better-auth API
	useEffect(() => {
		const checkSlugAvailability = async () => {
			if (!slugValue || slugValue.length < 3) {
				setSlugAvailable(null);
				return;
			}

			// Validate slug format before checking
			const slugValidation =
				createOrganizationSchema.shape.slug.safeParse(slugValue);
			if (!slugValidation.success) {
				setSlugAvailable(null);
				return;
			}

			setCheckingSlug(true);
			const result = await authClient.organization.checkSlug({
				slug: slugValue,
			});

			if (result.error) {
				// If there's an error with code SLUG_IS_TAKEN, the slug is taken
				if (result.error.code === "SLUG_IS_TAKEN") {
					setSlugAvailable(false);
				} else {
					// For other errors, we can't determine availability
					setSlugAvailable(null);
				}
			} else {
				// If no error, the slug is available
				setSlugAvailable(true);
			}
			setCheckingSlug(false);
		};

		const timeoutId = setTimeout(checkSlugAvailability, 500);
		return () => clearTimeout(timeoutId);
	}, [slugValue]);

	const createOrganizationMutation = useMutation({
		mutationFn: async (data: FormData) => {
			const { data: org } = await authClient.organization.create(data);
			return org;
		},
		onSuccess: (data) => {
			form.reset();
			setSlugManuallyEdited(false);
			setSlugAvailable(null);
			onOpenChange(false);
			onSuccess?.(data);
		},
	});

	const onSubmit = (data: FormData) => {
		if (slugAvailable === false) {
			form.setError("slug", { message: "This slug is already taken" });
			return;
		}
		createOrganizationMutation.mutate(data);
	};

	const handleSlugChange = (value: string) => {
		setSlugManuallyEdited(true);
		form.setValue("slug", value, { shouldValidate: true });
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Create Organization</DialogTitle>
					<DialogDescription>
						Add a new organization to manage your team and projects.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Organization Name</FormLabel>
									<FormControl>
										<Input placeholder="My Organization" {...field} autoFocus />
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
									<FormLabel>Organization Slug</FormLabel>
									<FormControl>
										<div className="relative">
											<Input
												placeholder="my-organization"
												{...field}
												onChange={(e) => handleSlugChange(e.target.value)}
												className={
													slugValue && slugValue.length >= 3
														? slugAvailable === true
															? "pr-10"
															: slugAvailable === false
																? "pr-10"
																: "pr-10"
														: ""
												}
											/>
											{slugValue && slugValue.length >= 3 && (
												<div className="absolute top-2.5 right-2">
													{checkingSlug ? (
														<Loader2 className="h-5 w-5 animate-spin text-gray-400" />
													) : slugAvailable === true ? (
														<CheckCircle2 className="h-5 w-5 text-green-500" />
													) : slugAvailable === false ? (
														<XCircle className="h-5 w-5 text-red-500" />
													) : null}
												</div>
											)}
										</div>
									</FormControl>
									<FormDescription>
										{slugAvailable === false
											? "This slug is already taken. Please choose another."
											: "This will be used in URLs and cannot be changed later."}
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<DialogFooter>
							<Button
								type="button"
								variant="outline"
								onClick={() => onOpenChange(false)}
								disabled={createOrganizationMutation.isPending}
							>
								Cancel
							</Button>
							<Button
								type="submit"
								disabled={
									createOrganizationMutation.isPending ||
									checkingSlug ||
									slugAvailable === false
								}
							>
								{createOrganizationMutation.isPending ? (
									<>
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
										Creating...
									</>
								) : (
									"Create Organization"
								)}
							</Button>
						</DialogFooter>
						{createOrganizationMutation.error && (
							<div className="mt-4 rounded-md bg-red-50 p-3 text-red-700 text-sm">
								Failed to create organization:{" "}
								{createOrganizationMutation.error.message}
							</div>
						)}
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
