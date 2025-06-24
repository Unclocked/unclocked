import { protectedProcedure, publicProcedure, router } from "../lib/trpc";
import { customersRouter } from "./customers";

export const appRouter = router({
	healthCheck: publicProcedure.query(() => {
		return "OK";
	}),
	privateData: protectedProcedure.query(({ ctx }) => {
		return {
			message: "This is private",
			user: ctx.session.user,
		};
	}),
	customers: customersRouter,
});
export type AppRouter = typeof appRouter;
