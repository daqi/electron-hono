import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
    id: integer("id").primaryKey(),
    name: text("full_name"),
    createAt: integer("create_at", { mode: "timestamp" }).default(sql`(datetime('now','localtime'))`),
    updateAt: integer("update_at", { mode: "timestamp" }),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export const posts = sqliteTable("posts", {
    id: integer("id").primaryKey(),
    name: text("name"),
    content: text("content"),
    ownerId: integer("owner_id")
        .notNull()
        .references(() => users.id),
    createAt: integer("create_at", { mode: "timestamp" }).default(sql`(datetime('now','localtime'))`),
    updateAt: integer("update_at", { mode: "timestamp" }),
});

export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;
