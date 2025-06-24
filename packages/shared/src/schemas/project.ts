import { z } from "zod";
import { cuid2Schema } from "./common";

export const createProjectSchema = z.object({
	name: z
		.string()
		.min(1, "Project name is required")
		.max(255, "Project name must be less than 255 characters"),
	description: z.string().optional(),
	customerId: cuid2Schema,
	organizationId: cuid2Schema,
	hourlyRate: z.number().positive().optional(),
	budget: z.number().positive().optional(),
	status: z.enum(["active", "completed", "archived"]).default("active"),
	startDate: z.date().optional(),
	endDate: z.date().optional(),
});

export const updateProjectSchema = createProjectSchema.partial().extend({
	id: cuid2Schema,
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
