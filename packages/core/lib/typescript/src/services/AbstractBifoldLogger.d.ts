import { BaseLogger, LogLevel } from '@credo-ts/core';
import { BifoldError } from '../types/error';
export declare abstract class AbstractBifoldLogger extends BaseLogger {
    logLevel: LogLevel;
    protected _log: any;
    protected _config: {
        levels: {
            test: number;
            trace: number;
            debug: number;
            info: number;
            warn: number;
            error: number;
            fatal: number;
        };
        severity: string;
        async: boolean;
        dateFormat: string;
        printDate: boolean;
    };
    isEnabled(logLevel: LogLevel): boolean;
    test(message: string, data?: Record<string, unknown>): void;
    trace(message: string, data?: Record<string, unknown>): void;
    debug(message: string, data?: Record<string, unknown>): void;
    info(message: string, data?: Record<string, unknown>): void;
    warn(message: string, data?: Record<string, unknown>): void;
    error(message: string): void;
    error(message: string, data: Record<string, unknown>): void;
    error(message: string, error: Error): void;
    error(message: string, data: Record<string, unknown>, error: Error): void;
    fatal(message: string): void;
    fatal(message: string, data: Record<string, unknown>): void;
    fatal(message: string, error: Error): void;
    fatal(message: string, data: Record<string, unknown>, error: Error): void;
    abstract report(bifoldError: BifoldError): void;
}
//# sourceMappingURL=AbstractBifoldLogger.d.ts.map