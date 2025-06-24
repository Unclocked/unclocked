import { expo } from "@better-auth/expo";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin, multiSession, organization } from "better-auth/plugins";
import { db } from "../db";
import * as schema from "../db/schema/auth";
import { ac, admin as adminRole, member, owner } from "./permissions";

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg",

		schema: schema,
	}),
	trustedOrigins: [process.env.CORS_ORIGIN || "", "my-better-t-app://"],
	emailAndPassword: {
		enabled: true,
	},
	secret: process.env.BETTER_AUTH_SECRET,
	baseURL: process.env.BETTER_AUTH_URL,
	plugins: [
		expo(),
		organization({
			ac: ac,
			roles: {
				owner,
				admin: adminRole,
				member,
			},
		}),
		admin(),
		multiSession(),
	],
});
