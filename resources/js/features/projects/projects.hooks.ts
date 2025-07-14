import { router } from "@inertiajs/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateProject(customerId?: string) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ["create-project", customerId],
		mutationFn: async (data: App.Data.Requests.CreateProjectData) => {
			return new Promise<void>((resolve, reject) => {
				const routeName = customerId
					? route("customers.projects.store", customerId)
					: route("projects.store");
				router.post(routeName, data, {
					onSuccess: () => {
						queryClient.invalidateQueries({ queryKey: ["projects"] });
						queryClient.invalidateQueries({
							queryKey: ["customer-projects", customerId],
						});
						resolve();
					},
					onError: (error) => reject(error),
				});
			});
		},
	});
}

export function useUpdateProject() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ["update-project"],
		mutationFn: async ({
			id,
			data,
		}: {
			id: string;
			data: App.Data.Requests.UpdateProjectData;
		}) => {
			return new Promise<void>((resolve, reject) => {
				router.put(route("projects.update", id), data, {
					onSuccess: () => {
						queryClient.invalidateQueries({ queryKey: ["projects"] });
						queryClient.invalidateQueries({ queryKey: ["project", id] });
						resolve();
					},
					onError: (error) => reject(error),
				});
			});
		},
	});
}

export function useDeleteProject() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ["delete-project"],
		mutationFn: async (id: string) => {
			return new Promise<void>((resolve, reject) => {
				router.delete(route("projects.destroy", id), {
					onSuccess: () => {
						queryClient.invalidateQueries({ queryKey: ["projects"] });
						queryClient.invalidateQueries({ queryKey: ["customer-projects"] });
						resolve();
					},
					onError: (error) => reject(error),
				});
			});
		},
	});
}
