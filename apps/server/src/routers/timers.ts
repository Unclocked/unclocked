import { z } from "zod";
import { protectedProcedure, router } from "@/lib/trpc";

export const timersRouter = router({
	start: protectedProcedure
		.input(z.object({}))
		.mutation(async ({ ctx, input }) => {}),
});
