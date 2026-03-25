export default class QueeManager {
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
//# sourceMappingURL=queue.service.js.map