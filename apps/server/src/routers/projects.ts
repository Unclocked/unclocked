import z from "zod";
import { protectedProcedure, router } from "@/lib/trpc";

export const projectsRouter = router({
	create: protectedProcedure
		.input(
			z.object({
				name: z.string(),

				description: z.string(),
				organizationId: z.string(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const { name, description, organizationId } = input;
		}),
});
