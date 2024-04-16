import { Hono } from "hono";

const app = new Hono();
app.get("/", (c) => c.text("Hono meets Node.js"));

app.post("/", (c) => c.json({msg: 'create a book'}, 201));

export default app;
