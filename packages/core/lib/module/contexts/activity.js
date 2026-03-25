function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { AppState, PanResponder, View } from 'react-native';
import { TOKENS, useServices } from '../container-api';
import { LockoutReason, useAuth } from './auth';
import { useStore } from './store';
import { defaultAutoLockTime } from '../constants';
import { useAppAgent } from '../utils/agent';

// number of minutes before the timeout action is triggered
// a value of 0 will never trigger the lock out action and
// an undefined value will default to 5 minutes
export const AutoLockTime = {
  OneMinute: 1,
  ThreeMinutes: 3,
  FiveMinutes: 5,
  Never: 0
};
export const ActivityContext = /*#__PURE__*/createContext(null);
export const ActivityProvider = ({
  children
}) => {
  var _customAutoLockTimes$;
  const [logger, {
    customAutoLockTimes
  }] = useServices([TOKENS.UTIL_LOGGER, TOKENS.CONFIG]);
  const [store] = useStore();
  const {
    agent
  } = useAppAgent();
  const {
    lockOutUser
  } = useAuth();
  const lastActiveTimeRef = useRef(undefined);
  const defaultAutoLockoutTime = (customAutoLockTimes === null || customAutoLockTimes === void 0 || (_customAutoLockTimes$ = customAutoLockTimes.default) === null || _customAutoLockTimes$ === void 0 ? void 0 : _customAutoLockTimes$.time) ?? defaultAutoLockTime;
  const timeoutInMilliseconds = useRef((store.preferences.autoLockTime ?? defaultAutoLockoutTime) * 60000);
  const inactivityTimeoutRef = useRef(null);
  const prevAppStateStatusRef = useRef(AppState.currentState);
  const [appStateStatus, setAppStateStatus] = useState(AppState.currentState);
  if (!agent) {
    throw new Error('ActivityProvider must be used within agent context provider');
  }
  const clearInactivityTimeoutIfExists = useCallback(() => {
    if (inactivityTimeoutRef.current) {
      clearTimeout(inactivityTimeoutRef.current);
    }
  }, []);
  const resetInactivityTimeout = useCallback(milliseconds => {
    clearInactivityTimeoutIfExists();
    lastActiveTimeRef.current = Date.now();

    // do not set timeout if timeout duration is set to 0
    if (milliseconds > 0) {
      // create new timeout
      inactivityTimeoutRef.current = setTimeout(() => lockOutUser(LockoutReason.Timeout), milliseconds);
    }
  }, [clearInactivityTimeoutIfExists, lockOutUser]);
  useEffect(() => {
    // listener for backgrounding / foregrounding
    const eventSubscription = AppState.addEventListener('change', async nextAppState => {
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
          lockOutUser(LockoutReason.Timeout);
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
  useEffect(() => {
    // user has updated settings for auto lock time
    timeoutInMilliseconds.current = (store.preferences.autoLockTime ?? defaultAutoLockoutTime) * 60000;
  }, [store.preferences.autoLockTime, defaultAutoLockoutTime]);
  const panResponder = useMemo(() => {
    return PanResponder.create({
      onStartShouldSetPanResponderCapture: () => {
        // some user interaction detected, reset timeout
        resetInactivityTimeout(timeoutInMilliseconds.current);

        // returns false so the PanResponder doesn't consume the touch event
        return false;
      }
    });
  }, [resetInactivityTimeout]);
  return /*#__PURE__*/React.createElement(ActivityContext.Provider, {
    value: {
      appStateStatus
    }
  }, /*#__PURE__*/React.createElement(View, _extends({
    style: {
      flex: 1
    }
  }, panResponder.panHandlers), children));
};
export const useActivity = () => useContext(ActivityContext);
//# sourceMappingURL=activity.js.map