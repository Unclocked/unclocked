import { z } from "zod";
import { cuid2Schema } from "./common";

export const createCustomerSchema = z.object({
	name: z
		.string()
		.min(1, "Customer name is required")
		.max(255, "Customer name must be less than 255 characters"),
	organizationId: cuid2Schema,
	email: z.string().email().optional(),
	phone: z.string().optional(),
	address: z.string().optional(),
	notes: z.string().optional(),
});

export const updateCustomerSchema = createCustomerSchema.partial().extend({
	id: cuid2Schema,
});

export type CreateCustomerInput = z.infer<typeof createCustomerSchema>;
export type UpdateCustomerInput = z.infer<typeof updateCustomerSchema>;
