import { zValidator } from "@hono/zod-validator";
import { createInsertSchema } from "drizzle-zod";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { z } from "zod";
import DB from "./db";
import type { Env } from "./db";
import { posts, users } from "./schema";
import type { NewPost, NewUser, Post, User } from "./schema";

const app = new Hono<Env>();

app.use(logger());
app.use(DB());

app.get("/users", async (c) => {
    const data = c.var.db.select().from(users).all();
    return c.json({ data });
}).post("/users", zValidator("json", createInsertSchema(users, { id: z.undefined() })), async (c) => {
    const data: NewUser = c.req.valid("json");
    data.updateAt = new Date();
    const res = await c.var.db
        .insert(users)
        .values(data)
        .execute();
    return c.json({ data: res });
});

app.get("/posts", async (c) => {
    const data = c.var.db.select().from(posts).all();
    return c.json({ data });
}).post("/posts", zValidator("json", createInsertSchema(posts, { id: z.undefined() })), async (c) => {
    const data = c.req.valid("json") as unknown as NewPost;
    data.updateAt = new Date();
    const res = await c.var.db
        .insert(posts)
        .values(data)
        .execute();
    return c.json({ data: res });
});

export default app;
