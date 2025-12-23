"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useNetwork = exports.NetworkProvider = exports.NetworkContext = void 0;
var _netinfo = require("@react-native-community/netinfo");
var _react = _interopRequireWildcard(require("react"));
var React = _react;
var _NetInfoModal = _interopRequireDefault(require("../components/modals/NetInfoModal"));
var _ledger = require("../utils/ledger");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const NetworkContext = exports.NetworkContext = /*#__PURE__*/(0, _react.createContext)(null);
const NetworkProvider = ({
  children
}) => {
  const netInfo = (0, _netinfo.useNetInfo)();
  const [isNetInfoModalDisplayed, setIsNetInfoModalDisplayed] = (0, _react.useState)(false);
  const displayNetInfoModal = () => {
    setIsNetInfoModalDisplayed(true);
  };
  const hideNetInfoModal = () => {
    setIsNetInfoModalDisplayed(false);
  };
  const silentAssertConnectedNetwork = () => {
    return netInfo.isConnected || netInfo.type !== _netinfo.NetInfoStateType.none;
  };
  const assertConnectedNetwork = () => {
    const isConnected = silentAssertConnectedNetwork();
    if (!isConnected) {
      displayNetInfoModal();
    }
    return isConnected;
  };
  const assertLedgerConnectivity = async () => {
    const nodes = (0, _ledger.fetchLedgerNodes)();
    if (typeof nodes === 'undefined' || nodes.length === 0) {
      return false;
    }
    const connections = await Promise.all(nodes.map(n => (0, _ledger.canConnectToLedgerNode)(n)));
    return connections.includes(true);
  };
  return /*#__PURE__*/React.createElement(NetworkContext.Provider, {
    value: {
      silentAssertConnectedNetwork,
      assertConnectedNetwork,
      displayNetInfoModal,
      hideNetInfoModal,
      assertLedgerConnectivity
    }
  }, children, /*#__PURE__*/React.createElement(_NetInfoModal.default, {
    visible: isNetInfoModalDisplayed,
    onSubmit: () => hideNetInfoModal()
  }));
};
exports.NetworkProvider = NetworkProvider;
const useNetwork = () => (0, _react.useContext)(NetworkContext);
exports.useNetwork = useNetwork;
//# sourceMappingURL=network.js.map