// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from "electron";
import type { FetchReturnValue } from "./fetch";

contextBridge.exposeInMainWorld("electron", {
    fetch: async (input: string, requestInit: { method?: string; body?: unknown }) => {
        const res = (await ipcRenderer.invoke("fetch", input, requestInit)) as FetchReturnValue;
        const { status, statusText, bodyUsed, ok, redirected, type, url, body } = res;
        const json = () => {
            return new Promise((resolve, reject) => {
                try {
                    resolve(JSON.parse(body));
                } catch (err) {
                    reject(err);
                }
            });
        };
        const text = () => {
            return Promise.resolve(body || "");
        };
        return {
            status,
            statusText,
            bodyUsed,
            ok,
            redirected,
            type,
            url,
            body,
            json,
            text,
        };
    },
    versions: process.versions,
});
