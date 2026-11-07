import { pgTable, text, boolean, timestamp, uuid } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: uuid("id").defaultRandom().primaryKey(),
    email: text("email").notNull().unique(),
    passwordHash: text("password_hash").notNull(),
    mustChangePassword: boolean("must_change_password").default(true).notNull(),
    name: text("name"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});