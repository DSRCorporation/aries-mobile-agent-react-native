"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useOutOfBandById = exports.useOutOfBandByConnectionId = exports.useConnectionByOutOfBandId = void 0;
var _reactHooks = require("@bifold/react-hooks");
var _react = require("react");
var _agent = require("../utils/agent");
const useOutOfBandById = oobId => {
  const {
    agent
  } = (0, _agent.useAppAgent)();
  const [oob, setOob] = (0, _react.useState)(undefined);
  (0, _react.useEffect)(() => {
    if (!oobId || !agent) {
      setOob(undefined);
      return;
    }
    agent.modules.didcomm.oob.findById(oobId).then(res => {
      setOob(res ?? undefined);
    }).catch(() => {
      setOob(undefined);
    });
  }, [oobId, agent]);
  return oob;
};
exports.useOutOfBandById = useOutOfBandById;
const useConnectionByOutOfBandId = outOfBandId => {
  var _useOutOfBandById;
  const reuseConnectionId = (_useOutOfBandById = useOutOfBandById(outOfBandId)) === null || _useOutOfBandById === void 0 ? void 0 : _useOutOfBandById.reuseConnectionId;
  const {
    records: connections
  } = (0, _reactHooks.useConnections)();
  return (0, _react.useMemo)(() => connections.find(connection => connection.outOfBandId === outOfBandId ||
  // Check for a reusable connection
  reuseConnectionId && connection.id === reuseConnectionId), [connections, outOfBandId, reuseConnectionId]);
};
exports.useConnectionByOutOfBandId = useConnectionByOutOfBandId;
const useOutOfBandByConnectionId = connectionId => {
  const connection = (0, _reactHooks.useConnectionById)(connectionId);
  return useOutOfBandById((connection === null || connection === void 0 ? void 0 : connection.outOfBandId) ?? '');
};
exports.useOutOfBandByConnectionId = useOutOfBandByConnectionId;
//# sourceMappingURL=connections.js.map