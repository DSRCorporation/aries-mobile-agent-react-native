export declare const canConnectToHost: (host: {
    host: string;
    port: number;
}) => Promise<boolean>;
export declare const fetchLedgerNodes: (indyNamespace?: string) => Array<{
    host: string;
    port: number;
}>;
export declare function withRetry<T>(promise: (...args: any[]) => Promise<T>, args: any[], maxRetries?: number, onRetry?: () => unknown): Promise<T>;
//# sourceMappingURL=network.d.ts.map