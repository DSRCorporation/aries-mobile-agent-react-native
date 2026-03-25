import { ViewStyle } from 'react-native';
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
export type InlineErrorConfig = {
    enabled: boolean;
    hasErrorIcon?: boolean;
    position?: InlineErrorPosition;
    style?: ViewStyle;
};
export declare enum InlineErrorPosition {
    Above = 0,
    Below = 1
}
//# sourceMappingURL=error.d.ts.map