import { z } from "zod";

export const createOrganizationSchema = z.object({
	name: z
		.string()
		.min(1, "Organization name is required")
		.max(100, "Organization name must be less than 100 characters"),
	slug: z
		.string()
		.min(3, "Slug must be at least 3 characters")
		.max(50, "Slug must be less than 50 characters")
		.regex(
			/^[a-z0-9]+(?:-[a-z0-9]+)*$/,
			"Slug must contain only lowercase letters, numbers, and hyphens",
		),
});

export type CreateOrganizationInput = z.infer<typeof createOrganizationSchema>;
