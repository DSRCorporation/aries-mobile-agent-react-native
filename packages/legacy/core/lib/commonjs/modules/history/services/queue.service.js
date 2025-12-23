"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
class QueeManager {
  constructor() {
    this.recordsQuee = [];
  }

  // public
  addQuee(item) {
    this.recordsQuee.push(item);
  }
  getLast() {
    return this.recordsQuee.pop();
  }

  // Static methods
  static myInstance = null;
  static getInstance() {
    if (QueeManager.myInstance == null) {
      QueeManager.myInstance = new QueeManager();
    }
    return this.myInstance;
  }
}
exports.default = QueeManager;
//# sourceMappingURL=queue.service.js.map