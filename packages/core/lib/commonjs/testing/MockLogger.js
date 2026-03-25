"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MockLogger = void 0;
var _AbstractBifoldLogger = require("../services/AbstractBifoldLogger");
class MockLogger extends _AbstractBifoldLogger.AbstractBifoldLogger {
  constructor() {
    super();
  }
  test = jest.fn();
  trace = jest.fn();
  debug = jest.fn();
  info = jest.fn();
  warn = jest.fn();
  error = jest.fn();
  fatal = jest.fn();
  report = jest.fn();
}
exports.MockLogger = MockLogger;
//# sourceMappingURL=MockLogger.js.map