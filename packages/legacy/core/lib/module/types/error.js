export class QrCodeScanError extends Error {
  constructor(message, data, details) {
    super(message);
    this.data = data;
    this.details = details;
  }
}
export class BifoldError extends Error {
  constructor(title, description, message, code) {
    super(message);
    this.title = title;
    this.description = description;
    this.code = code;

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, BifoldError.prototype);
  }
}
//# sourceMappingURL=error.js.map