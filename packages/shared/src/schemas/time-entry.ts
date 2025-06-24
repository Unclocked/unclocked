import { z } from "zod";
import { cuid2Schema } from "./common";

export const createTimeEntrySchema = z.object({
	description: z.string().min(1, "Description is required"),
	startTime: z.date(),
	endTime: z.date().optional(),
	duration: z.number().int().positive().optional(),
	customerId: cuid2Schema.optional(),
	projectId: cuid2Schema.optional(),
	organizationId: cuid2Schema,
	billable: z.boolean().default(true),
	tags: z.array(z.string()).default([]),
});

export const updateTimeEntrySchema = createTimeEntrySchema.partial().extend({
	id: cuid2Schema,
});

export type CreateTimeEntryInput = z.infer<typeof createTimeEntrySchema>;
export type UpdateTimeEntryInput = z.infer<typeof updateTimeEntrySchema>;
