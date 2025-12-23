"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hashPIN = void 0;
var _reactNativeArgon = _interopRequireDefault(require("react-native-argon2"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const hashPIN = async (PIN, salt) => {
  const result = await (0, _reactNativeArgon.default)(PIN, salt, {});
  const {
    rawHash
  } = result;
  return rawHash;
};
exports.hashPIN = hashPIN;
//# sourceMappingURL=crypto.js.map