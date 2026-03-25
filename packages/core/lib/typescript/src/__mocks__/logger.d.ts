import { AbstractBifoldLogger } from '../services/AbstractBifoldLogger';
/**
 * Mock logger to reduce noise in tests
 */
export declare class MockLogger extends AbstractBifoldLogger {
    constructor();
    test: jest.Mock<any, any, any>;
    trace: jest.Mock<any, any, any>;
    debug: jest.Mock<any, any, any>;
    info: jest.Mock<any, any, any>;
    warn: jest.Mock<any, any, any>;
    error: jest.Mock<any, any, any>;
    fatal: jest.Mock<any, any, any>;
    report: jest.Mock<any, any, any>;
}
//# sourceMappingURL=logger.d.ts.map