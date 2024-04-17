import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import type { BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import type { MiddlewareHandler } from "hono";

const sqlite = new Database("./sqlite.db");
const db = drizzle(sqlite);

export type Env = {
    Variables: {
        db: BetterSQLite3Database;
    };
};

export default function DB() {
    const middleware: MiddlewareHandler = async (c, next) => {
        c.set("db", db);
        await next();
    };
    return middleware;
}
