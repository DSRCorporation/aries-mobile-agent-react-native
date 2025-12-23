"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QrCodeScanError = exports.BifoldError = void 0;
class QrCodeScanError extends Error {
  constructor(message, data, details) {
    super(message);
    this.data = data;
    this.details = details;
  }
}
exports.QrCodeScanError = QrCodeScanError;
class BifoldError extends Error {
  constructor(title, description, message, code) {
    super(message);
    this.title = title;
    this.description = description;
    this.code = code;

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, BifoldError.prototype);
  }
}
exports.BifoldError = BifoldError;
//# sourceMappingURL=error.js.map