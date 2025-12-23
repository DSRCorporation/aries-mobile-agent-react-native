export declare class QrCodeScanError extends Error {
    data?: string;
    details?: string;
    constructor(message?: string, data?: string, details?: string);
}
export declare class BifoldError extends Error {
    title: string;
    code: number;
    description: string;
    constructor(title: string, description: string, message: string, code: number);
}
//# sourceMappingURL=error.d.ts.map