"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isPredicate = void 0;
/** Minimal shape extracted from OCA bundle resolver output */

/** W3C VC → UI model */

const isPredicate = x => x && (typeof x.pType === 'string' || x.pValue !== undefined);
exports.isPredicate = isPredicate;
//# sourceMappingURL=ui-types.js.map