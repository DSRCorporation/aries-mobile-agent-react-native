"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.refreshAndQueueReplacement = refreshAndQueueReplacement;
var _credentialRecord = require("../credentialRecord");
var _refreshToken = require("./refreshToken");
var _registry = require("./registry");
var _reIssuance = require("./reIssuance");
async function refreshAndQueueReplacement({
  agent,
  logger,
  record,
  toLite = _credentialRecord.toOpenIDCredentialLite
}) {
  const token = await (0, _refreshToken.refreshAccessToken)({
    logger,
    cred: record,
    agent
  });
  if (!token) {
    return undefined;
  }
  const newRecord = await (0, _reIssuance.reissueCredentialWithAccessToken)({
    agent,
    logger,
    record,
    tokenResponse: token
  });
  if (!newRecord) {
    return undefined;
  }
  _registry.credentialRegistry.getState().markExpiredWithReplacement(record.id, toLite(newRecord));
  return newRecord;
}
//# sourceMappingURL=operations.js.map