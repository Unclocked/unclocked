import { z } from "zod";

export const createCustomerSchema = z.object({
	name: z
		.string()
		.min(1, "Name is required")
		.max(255, "Name must be less than 255 characters"),
	email: z
		.string()
		.email("Invalid email")
		.nullable()
		.optional()
		.or(z.literal("")),
	phone: z
		.string()
		.max(255, "Phone must be less than 255 characters")
		.nullable()
		.optional(),
	address: z.string().nullable().optional(),
	notes: z.string().nullable().optional(),
	status: z.enum(["active", "inactive", "archived"]),
});

export const updateCustomerSchema = createCustomerSchema;

export type CreateCustomerFormData = z.infer<typeof createCustomerSchema>;
export type UpdateCustomerFormData = z.infer<typeof updateCustomerSchema>;
