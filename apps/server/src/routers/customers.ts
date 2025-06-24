import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db";
import { customer } from "@/db/schema";
import { auth } from "@/lib/auth";
import { protectedProcedure, router } from "@/lib/trpc";

export const customersRouter = router({
	list: protectedProcedure
		.input(
			z.object({
				organizationId: z.string(),
			}),
		)
		.query(async ({ ctx, input }) => {
			const customers = await db.query.customer.findMany({
				where: eq(customer.organizationId, input.organizationId),
			});
			return customers;
		}),
	create: protectedProcedure
		.input(
			z.object({
				name: z.string().min(1).max(255),
				organizationId: z.string(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			await auth.api.hasPermission({
				headers: ctx.headers,
				body: {
					organizationId: input.organizationId,
					permissions: {
						customer: ["create"],
					},
				},
			});

			const [newCustomer] = await db
				.insert(customer)
				.values({
					name: input.name,
					organizationId: input.organizationId,
				})
				.returning();

			return newCustomer;
		}),
});
