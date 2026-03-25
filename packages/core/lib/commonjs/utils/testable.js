"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testIdWithKey = exports.testIdForAccessabilityLabel = void 0;
var _constants = require("../constants");
const testIdWithKey = key => {
  return `${_constants.testIdPrefix}${key}`;
};
exports.testIdWithKey = testIdWithKey;
const testIdForAccessabilityLabel = label => {
  if (!label) {
    return '';
  }
  return label.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ').replace(/\s/g, '');
};
exports.testIdForAccessabilityLabel = testIdForAccessabilityLabel;
//# sourceMappingURL=testable.js.map