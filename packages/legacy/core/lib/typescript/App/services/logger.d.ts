import { BaseLogger } from '@credo-ts/core';
export declare class ConsoleLogger extends BaseLogger {
    private log;
    private config;
    constructor();
    test(message: string, data?: object | undefined): void;
    trace(message: string, data?: object | undefined): void;
    debug(message: string, data?: object | undefined): void;
    info(message: string, data?: object | undefined): void;
    warn(message: string, data?: object | undefined): void;
    error(message: string, data?: object | undefined): void;
    fatal(message: string, data?: object | undefined): void;
}
//# sourceMappingURL=logger.d.ts.map