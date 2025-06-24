import { createId } from "@paralleldrive/cuid2";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { organization } from "./auth";

export const customer = pgTable("customer", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => createId()),
	organizationId: text("organization_id").references(() => organization.id),
	name: text("name").notNull(),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at")
		.notNull()
		.defaultNow()
		.$onUpdate(() => new Date()),
	deletedAt: timestamp("deleted_at"),
});

export const timeEntry = pgTable("time_entry", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => createId()),
});
