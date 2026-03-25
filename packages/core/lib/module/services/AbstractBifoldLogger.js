import { BaseLogger, LogLevel } from '@credo-ts/core';
export class AbstractBifoldLogger extends BaseLogger {
  logLevel = LogLevel.debug;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  _config = {
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
  isEnabled(logLevel) {
    return logLevel >= this.logLevel;
  }
  test(message, data) {
    var _this$_log;
    (_this$_log = this._log) === null || _this$_log === void 0 || _this$_log.test({
      message,
      data
    });
  }
  trace(message, data) {
    var _this$_log2;
    (_this$_log2 = this._log) === null || _this$_log2 === void 0 || _this$_log2.trace({
      message,
      data
    });
  }
  debug(message, data) {
    var _this$_log3;
    (_this$_log3 = this._log) === null || _this$_log3 === void 0 || _this$_log3.debug({
      message,
      data
    });
  }
  info(message, data) {
    var _this$_log4;
    (_this$_log4 = this._log) === null || _this$_log4 === void 0 || _this$_log4.info({
      message,
      data
    });
  }
  warn(message, data) {
    var _this$_log5;
    (_this$_log5 = this._log) === null || _this$_log5 === void 0 || _this$_log5.warn({
      message,
      data
    });
  }

  // Allow for overload signatures for error method, I think
  // this makes the clearest API.

  error(message, dataOrError, error) {
    var _this$_log6;
    let data;
    let actualError;
    if (dataOrError instanceof Error) {
      // Second parameter is an Error, so no data
      actualError = dataOrError;
    } else {
      // Second parameter is data (or undefined)
      data = dataOrError;
      actualError = error;
    }
    (_this$_log6 = this._log) === null || _this$_log6 === void 0 || _this$_log6.error({
      message,
      data,
      error: actualError
    });
  }

  // Allow for overload signatures for fatal method, I think
  // this makes the clearest API.

  fatal(message, dataOrError, error) {
    var _this$_log7;
    let data;
    let actualError;
    if (dataOrError instanceof Error) {
      // Second parameter is an Error, so no data
      actualError = dataOrError;
    } else {
      // Second parameter is data (or undefined)
      data = dataOrError;
      actualError = error;
    }
    (_this$_log7 = this._log) === null || _this$_log7 === void 0 || _this$_log7.fatal({
      message,
      data,
      error: actualError
    });
  }
}
//# sourceMappingURL=AbstractBifoldLogger.js.map