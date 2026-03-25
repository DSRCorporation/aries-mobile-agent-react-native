import { consoleTransport } from 'react-native-logs';
import { logger } from 'react-native-logs';
import { AbstractBifoldLogger } from './AbstractBifoldLogger';
export class BifoldLogger extends AbstractBifoldLogger {
  constructor() {
    super();
    const transport = [consoleTransport];
    const config = {
      ...this._config,
      transport
    };
    this._log = logger.createLogger(config);
  }
  report(bifoldError) {
    var _this$_log;
    (_this$_log = this._log) === null || _this$_log === void 0 || _this$_log.info({
      message: 'No remote logging configured, report not sent for error:',
      data: bifoldError.message
    });
  }
}
//# sourceMappingURL=logger.js.map