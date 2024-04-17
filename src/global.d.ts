interface Window {
    electron: {
        fetch(input: string, requestInit?: RequestInit): Promise<Response>;
        versions: NodeJS.ProcessVersions;
    };
}
