"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useActivity = exports.AutoLockTime = exports.ActivityProvider = exports.ActivityContext = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _containerApi = require("../container-api");
var _auth = require("./auth");
var _store = require("./store");
var _constants = require("../constants");
var _agent = require("../utils/agent");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// number of minutes before the timeout action is triggered
// a value of 0 will never trigger the lock out action and
// an undefined value will default to 5 minutes
const AutoLockTime = exports.AutoLockTime = {
  OneMinute: 1,
  ThreeMinutes: 3,
  FiveMinutes: 5,
  Never: 0
};
const ActivityContext = exports.ActivityContext = /*#__PURE__*/(0, _react.createContext)(null);
const ActivityProvider = ({
  children
}) => {
  var _customAutoLockTimes$;
  const [logger, {
    customAutoLockTimes
  }] = (0, _containerApi.useServices)([_containerApi.TOKENS.UTIL_LOGGER, _containerApi.TOKENS.CONFIG]);
  const [store] = (0, _store.useStore)();
  const {
    agent
  } = (0, _agent.useAppAgent)();
  const {
    lockOutUser
  } = (0, _auth.useAuth)();
  const lastActiveTimeRef = (0, _react.useRef)(undefined);
  const defaultAutoLockoutTime = (customAutoLockTimes === null || customAutoLockTimes === void 0 || (_customAutoLockTimes$ = customAutoLockTimes.default) === null || _customAutoLockTimes$ === void 0 ? void 0 : _customAutoLockTimes$.time) ?? _constants.defaultAutoLockTime;
  const timeoutInMilliseconds = (0, _react.useRef)((store.preferences.autoLockTime ?? defaultAutoLockoutTime) * 60000);
  const inactivityTimeoutRef = (0, _react.useRef)(null);
  const prevAppStateStatusRef = (0, _react.useRef)(_reactNative.AppState.currentState);
  const [appStateStatus, setAppStateStatus] = (0, _react.useState)(_reactNative.AppState.currentState);
  if (!agent) {
    throw new Error('ActivityProvider must be used within agent context provider');
  }
  const clearInactivityTimeoutIfExists = (0, _react.useCallback)(() => {
    if (inactivityTimeoutRef.current) {
      clearTimeout(inactivityTimeoutRef.current);
    }
  }, []);
  const resetInactivityTimeout = (0, _react.useCallback)(milliseconds => {
    clearInactivityTimeoutIfExists();
    lastActiveTimeRef.current = Date.now();

    // do not set timeout if timeout duration is set to 0
    if (milliseconds > 0) {
      // create new timeout
      inactivityTimeoutRef.current = setTimeout(() => lockOutUser(_auth.LockoutReason.Timeout), milliseconds);
    }
  }, [clearInactivityTimeoutIfExists, lockOutUser]);
  (0, _react.useEffect)(() => {
    // listener for backgrounding / foregrounding
    const eventSubscription = _reactNative.AppState.addEventListener('change', async nextAppState => {
      // if going into the background
      if (['active', 'inactive'].includes(prevAppStateStatusRef.current) && nextAppState === 'background') {
        // remove timeout when backgrounded as timeout refs can be lost when app is backgrounded
        clearInactivityTimeoutIfExists();
        try {
          await agent.modules.didcomm.mediationRecipient.stopMessagePickup();
          logger.info('Stopped agent message pickup');
        } catch (err) {
          logger.error(`Error stopping agent message pickup, ${err}`);
        }
      }

      // if coming to the foreground
      if (prevAppStateStatusRef.current === 'background' && ['active', 'inactive'].includes(nextAppState)) {
        // if app was in background for longer than allowed time, lock out user
        if (lastActiveTimeRef.current && Date.now() - lastActiveTimeRef.current >= timeoutInMilliseconds.current && timeoutInMilliseconds.current > 0) {
          lockOutUser(_auth.LockoutReason.Timeout);
        } else {
          // otherwise restart message pickup
          try {
            await agent.modules.didcomm.mediationRecipient.initiateMessagePickup();
            logger.info('Restarted agent message pickup');
          } catch (err) {
            logger.error(`Error restarting agent message pickup, ${err}`);
          }
        }

        // app coming into the foreground is 'user activity', reset timeout
        resetInactivityTimeout(timeoutInMilliseconds.current);
      }
      prevAppStateStatusRef.current = nextAppState;
      setAppStateStatus(nextAppState);
    });

    // initial timeout setup
    resetInactivityTimeout(timeoutInMilliseconds.current);
    return () => {
      clearInactivityTimeoutIfExists();
      eventSubscription.remove();
    };
  }, [clearInactivityTimeoutIfExists, lockOutUser, resetInactivityTimeout, agent, logger]);
  (0, _react.useEffect)(() => {
    // user has updated settings for auto lock time
    timeoutInMilliseconds.current = (store.preferences.autoLockTime ?? defaultAutoLockoutTime) * 60000;
  }, [store.preferences.autoLockTime, defaultAutoLockoutTime]);
  const panResponder = (0, _react.useMemo)(() => {
    return _reactNative.PanResponder.create({
      onStartShouldSetPanResponderCapture: () => {
        // some user interaction detected, reset timeout
        resetInactivityTimeout(timeoutInMilliseconds.current);

        // returns false so the PanResponder doesn't consume the touch event
        return false;
      }
    });
  }, [resetInactivityTimeout]);
  return /*#__PURE__*/_react.default.createElement(ActivityContext.Provider, {
    value: {
      appStateStatus
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, _extends({
    style: {
      flex: 1
    }
  }, panResponder.panHandlers), children));
};
exports.ActivityProvider = ActivityProvider;
const useActivity = () => (0, _react.useContext)(ActivityContext);
exports.useActivity = useActivity;
//# sourceMappingURL=activity.js.map