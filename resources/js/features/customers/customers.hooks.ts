import { router } from "@inertiajs/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateCustomer() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ["create-customer"],
		mutationFn: async (data: App.Data.Requests.CreateCustomerData) => {
			return new Promise<void>((resolve, reject) => {
				router.post(route("customers.store"), data, {
					onSuccess: () => {
						queryClient.invalidateQueries({ queryKey: ["customers"] });
						resolve();
					},
					onError: (error) => reject(error),
				});
			});
		},
	});
}

export function useUpdateCustomer() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ["update-customer"],
		mutationFn: async ({
			id,
			data,
		}: {
			id: string;
			data: App.Data.Requests.UpdateCustomerData;
		}) => {
			return new Promise<void>((resolve, reject) => {
				router.put(route("customers.update", id), data, {
					onSuccess: () => {
						queryClient.invalidateQueries({ queryKey: ["customers"] });
						queryClient.invalidateQueries({ queryKey: ["customer", id] });
						resolve();
					},
					onError: (error) => reject(error),
				});
			});
		},
	});
}

export function useDeleteCustomer() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ["delete-customer"],
		mutationFn: async (id: string) => {
			return new Promise<void>((resolve, reject) => {
				router.delete(route("customers.destroy", id), {
					onSuccess: () => {
						queryClient.invalidateQueries({ queryKey: ["customers"] });
						resolve();
					},
					onError: (error) => reject(error),
				});
			});
		},
	});
}
