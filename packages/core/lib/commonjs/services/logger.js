"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BifoldLogger = void 0;
var _reactNativeLogs = require("react-native-logs");
var _AbstractBifoldLogger = require("./AbstractBifoldLogger");
class BifoldLogger extends _AbstractBifoldLogger.AbstractBifoldLogger {
  constructor() {
    super();
    const transport = [_reactNativeLogs.consoleTransport];
    const config = {
      ...this._config,
      transport
    };
    this._log = _reactNativeLogs.logger.createLogger(config);
  }
  report(bifoldError) {
    var _this$_log;
    (_this$_log = this._log) === null || _this$_log === void 0 || _this$_log.info({
      message: 'No remote logging configured, report not sent for error:',
      data: bifoldError.message
    });
  }
}
exports.BifoldLogger = BifoldLogger;
//# sourceMappingURL=logger.js.map