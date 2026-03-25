"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RefreshStatus = exports.OpenIDCustomNotificationType = void 0;
let RefreshStatus = exports.RefreshStatus = /*#__PURE__*/function (RefreshStatus) {
  RefreshStatus["Valid"] = "valid";
  RefreshStatus["Invalid"] = "invalid";
  RefreshStatus["Error"] = "error";
  return RefreshStatus;
}({});
let OpenIDCustomNotificationType = exports.OpenIDCustomNotificationType = /*#__PURE__*/function (OpenIDCustomNotificationType) {
  OpenIDCustomNotificationType["CredentialReplacementAvailable"] = "CustomNotificationOpenIDCredential";
  OpenIDCustomNotificationType["CredentialExpired"] = "CredentialExpired";
  return OpenIDCustomNotificationType;
}({});
//# sourceMappingURL=types.js.map