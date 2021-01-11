declare type Options = {
    relative_external: boolean;
    web_external: boolean;
    shouldReplace: (module_id: string) => boolean;
};
export declare function skypin(options: Options): {
    resolveId(id: string): Promise<{
        id: string;
        external: boolean;
    } | undefined>;
};
export declare function unpkg(options: Options): {
    resolveId(id: string): Promise<{
        id: string;
        external: boolean;
    } | undefined>;
};
export {};
