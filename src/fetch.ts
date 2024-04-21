import { ipcMain } from "electron";
import type { Hono } from "hono";

export type FetchReturnValue = {
    status: number;
    statusText: string;
    bodyUsed: boolean;
    ok: boolean;
    redirected: boolean;
    type: string;
    url: string;
    body: string;
};

const handleFetch = (app: Hono<any>) => {
    ipcMain.handle("fetch", async (e, input: string, requestInit: RequestInit) => {
        console.log("fetch", input, requestInit);
        const response = await app.request(input, requestInit);
        const { status, statusText, bodyUsed, ok, redirected, type, url } = response;
        return {
            status,
            statusText,
            bodyUsed,
            ok,
            redirected,
            type,
            url,
            body: await response.text(),
        } as FetchReturnValue;
    });
};

export default handleFetch;
