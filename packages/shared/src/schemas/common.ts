import { z } from "zod";

// CUID2 validation schema
export const cuid2Schema = z
	.string()
	.regex(/^[a-z0-9]{24,}$/, "Invalid ID format");

// Date range schema
export const dateRangeSchema = z.object({
	from: z.date(),
	to: z.date(),
});

// Pagination schema
export const paginationSchema = z.object({
	page: z.number().int().positive().default(1),
	limit: z.number().int().positive().max(100).default(20),
});

// Sort schema
export const sortSchema = z.object({
	field: z.string(),
	order: z.enum(["asc", "desc"]).default("asc"),
});
