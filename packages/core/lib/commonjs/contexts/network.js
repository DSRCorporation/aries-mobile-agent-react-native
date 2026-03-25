"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useNetwork = exports.NetworkProvider = exports.NetworkContext = void 0;
var _netinfo = require("@react-native-community/netinfo");
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _NetInfoModal = _interopRequireDefault(require("../components/modals/NetInfoModal"));
var _store = require("./reducers/store");
var _store2 = require("./store");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const NetworkContext = exports.NetworkContext = /*#__PURE__*/(0, _react.createContext)(null);

// NOTE: @react-native-community/netinfo can be configured to use whichever reachability check desired
// eg. isInternetReachable can be set to check a specific URL (like your mediator). See the docs here for more info:
// https://github.com/react-native-netinfo/react-native-netinfo?tab=readme-ov-file#configure
const NetworkProvider = ({
  children
}) => {
  const {
    isConnected,
    type,
    isInternetReachable
  } = (0, _netinfo.useNetInfo)();
  const [isNetInfoModalDisplayed, setIsNetInfoModalDisplayed] = (0, _react.useState)(false);
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const [hasShown, setHasShown] = (0, _react.useState)(false);
  const [store, dispatch] = (0, _store2.useStore)();
  const displayNetInfoModal = (0, _react.useCallback)(() => {
    setIsNetInfoModalDisplayed(true);
  }, []);
  const hideNetInfoModal = (0, _react.useCallback)(() => {
    setIsNetInfoModalDisplayed(false);
  }, []);

  /**
   * Returns null until the network state is known, then returns boolean
   * Useful for cases where we do not want to take action until the network state is known
   *
   * @returns {boolean | null} - `true` if the network is connected, `false` if not connected,
   *                             and `null` if the network status not yet known
   */
  const silentAssertConnectedNetwork = (0, _react.useCallback)(() => {
    return type === _netinfo.NetInfoStateType.unknown ? null : isConnected || [_netinfo.NetInfoStateType.wifi, _netinfo.NetInfoStateType.cellular].includes(type);
  }, [isConnected, type]);

  /**
   * Strictly asserts that the network is connected. Will return false even if
   * the network state is not yet known - in this case it will also display the
   * NetInfoModal
   * Useful for cases where we must be sure of connectivity before proceeding
   *
   * @returns {boolean} - `true` if the network is checked and connected, otherwise `false`
   */
  const assertNetworkConnected = (0, _react.useCallback)(() => {
    const connectionConfirmed = silentAssertConnectedNetwork() === true;
    if (!connectionConfirmed) {
      displayNetInfoModal();
    }
    return connectionConfirmed;
  }, [silentAssertConnectedNetwork, displayNetInfoModal]);
  const assertInternetReachable = (0, _react.useCallback)(() => {
    return isInternetReachable;
  }, [isInternetReachable]);
  const showNetworkWarning = (0, _react.useCallback)(() => {
    setHasShown(true);
    dispatch({
      type: _store.DispatchAction.BANNER_MESSAGES,
      payload: [{
        id: 'netinfo-no-internet',
        title: t('NetInfo.NoInternetConnectionTitle'),
        type: 'error',
        variant: 'detail',
        dismissible: false
      }]
    });
  }, [dispatch, t]);
  (0, _react.useEffect)(() => {
    // This early return prevents the dispatches from overwriting
    // the persisted state until the state is loaded from storage
    if (!store.stateLoaded) {
      return;
    }
    const internetReachable = assertInternetReachable();
    if (internetReachable) {
      setHasShown(false);
      dispatch({
        type: _store.DispatchAction.REMOVE_BANNER_MESSAGE,
        payload: ['netinfo-no-internet']
      });
    }

    // Strict check for false, null means the network state is not yet known
    if (internetReachable === false && !hasShown) {
      showNetworkWarning();
    }
  }, [store.stateLoaded, showNetworkWarning, assertInternetReachable, hasShown, dispatch]);
  return /*#__PURE__*/_react.default.createElement(NetworkContext.Provider, {
    value: {
      silentAssertConnectedNetwork,
      assertNetworkConnected,
      displayNetInfoModal,
      hideNetInfoModal,
      assertInternetReachable
    }
  }, children, /*#__PURE__*/_react.default.createElement(_NetInfoModal.default, {
    visible: isNetInfoModalDisplayed,
    onSubmit: () => hideNetInfoModal()
  }));
};
exports.NetworkProvider = NetworkProvider;
const useNetwork = () => (0, _react.useContext)(NetworkContext);
exports.useNetwork = useNetwork;
//# sourceMappingURL=network.js.map