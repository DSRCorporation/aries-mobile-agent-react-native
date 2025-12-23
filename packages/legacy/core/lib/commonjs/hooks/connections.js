"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useOutOfBandById = exports.useOutOfBandByConnectionId = exports.useConnectionByOutOfBandId = void 0;
var _reactHooks = require("@credo-ts/react-hooks");
var _react = require("react");
const useConnectionByOutOfBandId = outOfBandId => {
  const {
    records: connections
  } = (0, _reactHooks.useConnections)();
  return (0, _react.useMemo)(() => connections.find(connection => connection.outOfBandId === outOfBandId), [connections, outOfBandId]);
};
exports.useConnectionByOutOfBandId = useConnectionByOutOfBandId;
const useOutOfBandById = oobId => {
  const {
    agent
  } = (0, _reactHooks.useAgent)();
  const [oob, setOob] = (0, _react.useState)(undefined);
  if (!oob) {
    agent === null || agent === void 0 || agent.oob.findById(oobId).then(res => {
      if (res) {
        setOob(res);
      }
    });
  }
  return oob;
};
exports.useOutOfBandById = useOutOfBandById;
const useOutOfBandByConnectionId = connectionId => {
  const connection = (0, _reactHooks.useConnectionById)(connectionId);
  return useOutOfBandById((connection === null || connection === void 0 ? void 0 : connection.outOfBandId) ?? '');
};
exports.useOutOfBandByConnectionId = useOutOfBandByConnectionId;
//# sourceMappingURL=connections.js.map