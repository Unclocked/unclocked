import { router } from "@inertiajs/react";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import type { UseFormReturn } from "react-hook-form";

interface SlugAvailability {
	available: boolean | null;
	message: string;
	isChecking: boolean;
}

export function useSlugAvailability(
	form: UseFormReturn<App.Data.Requests.CreateCompanyData>,
) {
	const [slugAvailability, setSlugAvailability] = useState<SlugAvailability>({
		available: null,
		message: "",
		isChecking: false,
	});

	useEffect(() => {
		let timeoutId: ReturnType<typeof setTimeout> | null = null;

		const subscription = form.watch((value) => {
			const slug = value.slug;

			if (timeoutId) {
				clearTimeout(timeoutId);
			}

			if (!slug || slug.length < 2) {
				setSlugAvailability({
					available: null,
					message: "",
					isChecking: false,
				});
				return;
			}

			setSlugAvailability((prev) => ({ ...prev, isChecking: true }));

			timeoutId = setTimeout(() => {
				fetch(
					`/companies/check-slug-availability?slug=${encodeURIComponent(slug)}`,
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							"X-Requested-With": "XMLHttpRequest",
						},
					},
				)
					.then((response) => response.json())
					.then((data) => {
						setSlugAvailability({
							available: data.available,
							message: data.message,
							isChecking: false,
						});
					})
					.catch(() => {
						setSlugAvailability({
							available: null,
							message: "Error checking availability",
							isChecking: false,
						});
					});
			}, 500);
		});

		return () => {
			if (timeoutId) {
				clearTimeout(timeoutId);
			}
			subscription.unsubscribe();
		};
	}, [form]);

	return slugAvailability;
}

export function useCreateCompany() {
	return useMutation({
		mutationKey: ["create-company"],
		mutationFn: async (data: App.Data.Requests.CreateCompanyData) => {
			return new Promise<void>((resolve, reject) => {
				router.post(route("companies.store"), data, {
					onSuccess: () => resolve(),
					onError: (error) => reject(error),
				});
			});
		},
	});
}
