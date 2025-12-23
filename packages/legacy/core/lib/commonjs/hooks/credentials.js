"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCredentialsByConnectionId = void 0;
var _reactHooks = require("@credo-ts/react-hooks");
var _react = require("react");
const useCredentialsByConnectionId = connectionId => {
  const {
    records: credentials
  } = (0, _reactHooks.useCredentials)();
  return (0, _react.useMemo)(() => credentials.filter(credential => credential.connectionId === connectionId), [credentials, connectionId]);
};
exports.useCredentialsByConnectionId = useCredentialsByConnectionId;
//# sourceMappingURL=credentials.js.map