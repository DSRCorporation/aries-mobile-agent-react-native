"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useOutOfBandByReceivedInvitationId = void 0;
var _reactHooks = require("@credo-ts/react-hooks");
var _react = require("react");
const useOutOfBandByReceivedInvitationId = receivedInvitationId => {
  const {
    agent
  } = (0, _reactHooks.useAgent)();
  const [oob, setOob] = (0, _react.useState)(undefined);
  if (!oob) {
    agent === null || agent === void 0 || agent.oob.findByReceivedInvitationId(receivedInvitationId).then(res => {
      if (res) {
        setOob(res);
      }
    });
  }
  return oob;
};
exports.useOutOfBandByReceivedInvitationId = useOutOfBandByReceivedInvitationId;
//# sourceMappingURL=oob.js.map