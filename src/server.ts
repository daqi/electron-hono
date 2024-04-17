import { Hono } from "hono";
import { logger } from "hono/logger";

const app = new Hono();

app.use(logger());

app.post("/", async (c) => {
    const body = await c.req.json<{ name: string }>();
    return c.json({ message: `Hello ${body.name}` });
});

export default app;
