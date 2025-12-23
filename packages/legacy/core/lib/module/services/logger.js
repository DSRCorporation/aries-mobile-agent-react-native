import { BaseLogger } from '@credo-ts/core';
import { consoleTransport, logger } from 'react-native-logs';
export class ConsoleLogger extends BaseLogger {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  config = {
    levels: {
      test: 0,
      trace: 0,
      debug: 0,
      info: 1,
      warn: 2,
      error: 3,
      fatal: 4
    },
    severity: 'debug',
    async: true,
    dateFormat: 'time',
    printDate: false
  };
  constructor() {
    super();
    const transport = [consoleTransport];
    const config = {
      ...this.config,
      transport
    };
    this.log = logger.createLogger(config);
  }
  test(message, data) {
    var _this$log;
    (_this$log = this.log) === null || _this$log === void 0 || _this$log.test(message, data);
  }
  trace(message, data) {
    var _this$log2;
    (_this$log2 = this.log) === null || _this$log2 === void 0 || _this$log2.trace(message, data);
  }
  debug(message, data) {
    var _this$log3;
    (_this$log3 = this.log) === null || _this$log3 === void 0 || _this$log3.debug(message, data);
  }
  info(message, data) {
    var _this$log4;
    (_this$log4 = this.log) === null || _this$log4 === void 0 || _this$log4.info(message, data);
  }
  warn(message, data) {
    var _this$log5;
    (_this$log5 = this.log) === null || _this$log5 === void 0 || _this$log5.warn(message, data);
  }
  error(message, data) {
    var _this$log6;
    (_this$log6 = this.log) === null || _this$log6 === void 0 || _this$log6.error(message, data);
  }
  fatal(message, data) {
    var _this$log7;
    (_this$log7 = this.log) === null || _this$log7 === void 0 || _this$log7.fatal(message, data);
  }
}
//# sourceMappingURL=logger.js.map