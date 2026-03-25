"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthLevel = void 0;
let AuthLevel = exports.AuthLevel = /*#__PURE__*/function (AuthLevel) {
  AuthLevel["BiometricsFallbackPIN"] = "BiometricsFallbackPIN";
  AuthLevel["BiometricsAndPIN"] = "BiometricsAndPIN";
  AuthLevel["BiometricsOnly"] = "BiometricsOnly";
  return AuthLevel;
}({});
/*
  no_repeated_numbers - adjacent characters allowed repeating times
  0 - Disable adjacent number repeating validation, any times repeating are allowed
  n > 0 - Enable the repeating validation, n repeating times are forbidden, e.g. n = 2 forbid repeating 2 times, '11' is allowed but '111' forbidden
*/
//# sourceMappingURL=security.js.map