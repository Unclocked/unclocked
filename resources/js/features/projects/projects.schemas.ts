import { z } from "zod";

export const createProjectSchema = z
	.object({
		customer_id: z.string().min(1, "Customer is required"),
		name: z
			.string()
			.min(1, "Name is required")
			.max(255, "Name must be less than 255 characters"),
		description: z.string().nullable().optional(),
		status: z.enum(["active", "on_hold", "completed", "cancelled"]),
		start_date: z.string().nullable().optional().or(z.literal("")),
		end_date: z.string().nullable().optional().or(z.literal("")),
		budget: z.coerce
			.number()
			.min(0, "Budget must be positive")
			.nullable()
			.optional()
			.or(z.literal("")),
	})
	.refine(
		(data) => {
			if (data.start_date && data.end_date) {
				return new Date(data.start_date) <= new Date(data.end_date);
			}
			return true;
		},
		{
			message: "End date must be after start date",
			path: ["end_date"],
		},
	);

export const updateProjectSchema = createProjectSchema;

export type CreateProjectFormData = z.infer<typeof createProjectSchema>;
export type UpdateProjectFormData = z.infer<typeof updateProjectSchema>;
