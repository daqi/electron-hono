interface Window {
    electron: {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        fetch<T = any, S = any>(
            url: string,
            config?: {
                method?: string;
                body?: S;
            },
        ): Promise<T>;
        versions: NodeJS.ProcessVersions;
    };
}
