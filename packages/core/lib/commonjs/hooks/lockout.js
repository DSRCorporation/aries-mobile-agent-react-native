"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useUnMarkServedPenalty = exports.useLockout = exports.useGetLockoutPenalty = exports.useAttemptLockout = void 0;
var _react = require("react");
var _native = require("@react-navigation/native");
var _store = require("../contexts/store");
var _store2 = require("../contexts/reducers/store");
var _navigators = require("../types/navigators");
var _containerApi = require("../container-api");
var _constants = require("../constants");
const useAttemptLockout = () => {
  const [store, dispatch] = (0, _store.useStore)();
  const navigation = (0, _native.useNavigation)();
  // set the attempt lockout time
  return (0, _react.useCallback)(async penalty => {
    dispatch({
      type: _store2.DispatchAction.ATTEMPT_UPDATED,
      payload: [{
        loginAttempts: store.loginAttempt.loginAttempts + 1,
        lockoutDate: Date.now() + penalty,
        servedPenalty: false
      }]
    });
    navigation.dispatch(_native.CommonActions.reset({
      index: 0,
      routes: [{
        name: _navigators.Screens.AttemptLockout
      }]
    }));
  }, [store, dispatch, navigation]);
};
exports.useAttemptLockout = useAttemptLockout;
const useGetLockoutPenalty = () => {
  const [{
    attemptLockoutConfig: {
      baseRules,
      thresholdRules
    } = _constants.attemptLockoutConfig
  }] = (0, _containerApi.useServices)([_containerApi.TOKENS.CONFIG]);
  return (0, _react.useCallback)(attempts => {
    let penalty = baseRules[attempts];
    if (!penalty && attempts >= thresholdRules.threshold && !(attempts % thresholdRules.increment)) {
      penalty = thresholdRules.thresholdPenaltyDuration;
    }
    return penalty;
  }, [baseRules, thresholdRules]);
};

// This method is used to notify the app that the user is able to receive
// another lockout penalty
exports.useGetLockoutPenalty = useGetLockoutPenalty;
const useUnMarkServedPenalty = () => {
  const [store, dispatch] = (0, _store.useStore)();
  return (0, _react.useCallback)(() => {
    dispatch({
      type: _store2.DispatchAction.ATTEMPT_UPDATED,
      payload: [{
        loginAttempts: store.loginAttempt.loginAttempts,
        lockoutDate: undefined,
        servedPenalty: undefined
      }]
    });
  }, [dispatch, store.loginAttempt.loginAttempts]);
};
exports.useUnMarkServedPenalty = useUnMarkServedPenalty;
const useLockout = () => {
  const getLockoutPenalty = useGetLockoutPenalty();
  const attemptLockout = useAttemptLockout();
  const unMarkServedPenalty = useUnMarkServedPenalty();
  return {
    getLockoutPenalty,
    attemptLockout,
    unMarkServedPenalty
  };
};
exports.useLockout = useLockout;
//# sourceMappingURL=lockout.js.map