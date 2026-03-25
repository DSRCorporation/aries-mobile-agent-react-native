"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useOutOfBandByReceivedInvitationId = void 0;
var _react = require("react");
var _agent = require("../utils/agent");
const useOutOfBandByReceivedInvitationId = receivedInvitationId => {
  const {
    agent
  } = (0, _agent.useAppAgent)();
  const [oob, setOob] = (0, _react.useState)(undefined);
  (0, _react.useEffect)(() => {
    var _agent$modules;
    let isMounted = true;
    if (oob) return;
    const oobApi = agent === null || agent === void 0 || (_agent$modules = agent.modules) === null || _agent$modules === void 0 || (_agent$modules = _agent$modules.didcomm) === null || _agent$modules === void 0 ? void 0 : _agent$modules.oob;
    if (!(oobApi !== null && oobApi !== void 0 && oobApi.findByReceivedInvitationId) || !receivedInvitationId) return;
    oobApi.findByReceivedInvitationId(receivedInvitationId).then(res => {
      if (isMounted && res) {
        setOob(res);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [agent, receivedInvitationId, oob]);
  return oob;
};
exports.useOutOfBandByReceivedInvitationId = useOutOfBandByReceivedInvitationId;
//# sourceMappingURL=oob.js.map