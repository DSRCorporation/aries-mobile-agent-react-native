"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _BiometryControl = _interopRequireDefault(require("../components/inputs/BiometryControl"));
var _containerApi = require("../container-api");
var _auth = require("../contexts/auth");
var _store = require("../contexts/reducers/store");
var _store2 = require("../contexts/store");
var _types = require("../modules/history/types");
var _agent = require("../utils/agent");
var _VerifyPINModal = _interopRequireDefault(require("../components/modals/VerifyPINModal"));
var _PINVerify = require("./PINVerify");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const ToggleBiometry = () => {
  const [store, dispatch] = (0, _store2.useStore)();
  const {
    agent
  } = (0, _agent.useAppAgent)();
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const [logger, historyManagerCurried, historyEnabled, historyEventsLogger] = (0, _containerApi.useServices)([_containerApi.TOKENS.UTIL_LOGGER, _containerApi.TOKENS.FN_LOAD_HISTORY, _containerApi.TOKENS.HISTORY_ENABLED, _containerApi.TOKENS.HISTORY_EVENTS_LOGGER]);
  const {
    commitWalletToKeychain,
    disableBiometrics
  } = (0, _auth.useAuth)();
  const [biometryEnabled, setBiometryEnabled] = (0, _react.useState)(store.preferences.useBiometry);
  const [canSeeCheckPIN, setCanSeeCheckPIN] = (0, _react.useState)(false);
  const logHistoryRecord = (0, _react.useCallback)(type => {
    try {
      if (!(agent && historyEnabled)) {
        logger.trace(`[${ToggleBiometry.name}]:[logHistoryRecord] Skipping history log, either history function disabled or agent undefined!`);
        return;
      }
      const historyManager = historyManagerCurried(agent);

      /** Save history record for card accepted */
      const recordData = {
        type: type,
        message: type,
        createdAt: new Date()
      };
      historyManager.saveHistory(recordData);
    } catch (err) {
      logger.error(`[${ToggleBiometry.name}]:[logHistoryRecord] Error saving history: ${err}`);
    }
  }, [agent, historyEnabled, logger, historyManagerCurried]);
  const onSwitchToggleAllowed = (0, _react.useCallback)(() => {
    setCanSeeCheckPIN(true);
    if (historyEventsLogger.logToggleBiometry && store.onboarding.didAgreeToTerms && store.onboarding.didConsiderBiometry) {
      const type = _types.HistoryCardType.ActivateBiometry;
      logHistoryRecord(type);
    }
  }, [historyEventsLogger.logToggleBiometry, logHistoryRecord, store.onboarding.didAgreeToTerms, store.onboarding.didConsiderBiometry]);
  const handleBiometryToggle = (0, _react.useCallback)(newValue => {
    if (newValue === biometryEnabled) return;
    onSwitchToggleAllowed();
  }, [biometryEnabled, onSwitchToggleAllowed]);
  const onAuthenticationComplete = (0, _react.useCallback)(status => {
    // If successfully authenticated the toggle may proceed.
    if (status) {
      const newValue = !biometryEnabled;
      setBiometryEnabled(newValue);
      if (newValue) {
        commitWalletToKeychain(newValue).then(() => {
          dispatch({
            type: _store.DispatchAction.USE_BIOMETRY,
            payload: [newValue]
          });
        });
      } else {
        disableBiometrics().then(() => {
          dispatch({
            type: _store.DispatchAction.USE_BIOMETRY,
            payload: [newValue]
          });
        });
      }
      if (historyEventsLogger.logToggleBiometry && store.onboarding.didAgreeToTerms && store.onboarding.didConsiderBiometry) {
        const type = _types.HistoryCardType.DeactivateBiometry;
        logHistoryRecord(type);
      }
    }
    setCanSeeCheckPIN(false);
  }, [biometryEnabled, commitWalletToKeychain, disableBiometrics, dispatch, historyEventsLogger.logToggleBiometry, logHistoryRecord, store.onboarding.didAgreeToTerms, store.onboarding.didConsiderBiometry]);
  const onBackPressed = (0, _react.useCallback)(() => {
    setCanSeeCheckPIN(false);
  }, [setCanSeeCheckPIN]);
  return /*#__PURE__*/_react.default.createElement(_BiometryControl.default, {
    biometryEnabled: biometryEnabled,
    onBiometryToggle: handleBiometryToggle
  }, /*#__PURE__*/_react.default.createElement(_VerifyPINModal.default, {
    onAuthenticationComplete: onAuthenticationComplete,
    onBackPressed: onBackPressed,
    onCancelAuth: onBackPressed,
    PINVerifyModalUsage: _PINVerify.PINEntryUsage.ChangeBiometrics,
    title: t('Screens.EnterPIN'),
    visible: canSeeCheckPIN
  }));
};
var _default = exports.default = ToggleBiometry;
//# sourceMappingURL=ToggleBiometry.js.map