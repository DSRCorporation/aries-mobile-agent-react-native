"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hashPIN = void 0;
var _askarReactNative = require("@openwallet-foundation/askar-react-native");
var _buffer = require("buffer");
// Buffer polyfill for React Native environment where Buffer is not available globally

const hashPIN = async (PIN, salt) => {
  const passwordBytes = Uint8Array.from(_buffer.Buffer.from(PIN));
  const saltBytes = Uint8Array.from(_buffer.Buffer.from(salt));

  // Parameters match react-native-argon2 defaults for backward compatibility
  const derivedPassword = _askarReactNative.Argon2.derivePassword({
    algorithm: _askarReactNative.Argon2Algorithm.Argon2id,
    version: _askarReactNative.Argon2Version.V0x13,
    parallelism: 1,
    memCost: 32 * 1024,
    timeCost: 2
  }, passwordBytes, saltBytes);
  return _buffer.Buffer.from(derivedPassword).toString('hex');
};
exports.hashPIN = hashPIN;
//# sourceMappingURL=crypto.js.map