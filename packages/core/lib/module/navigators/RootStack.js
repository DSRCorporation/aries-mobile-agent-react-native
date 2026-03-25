import AgentProvider from '@bifold/react-hooks';
import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { DeviceEventEmitter } from 'react-native';
import { OpenIDCredentialRecordProvider } from '../modules/openid/context/OpenIDCredentialRecordProvider';
import { EventTypes } from '../constants';
import { TOKENS, useServices } from '../container-api';
import { ActivityProvider } from '../contexts/activity';
import { useStore } from '../contexts/store';
import { BifoldError } from '../types/error';
import MainStack from './MainStack';
const RootStack = () => {
  const [store, dispatch] = useStore();
  const {
    t
  } = useTranslation();
  const [useAgentSetup, OnboardingStack, loadState] = useServices([TOKENS.HOOK_USE_AGENT_SETUP, TOKENS.STACK_ONBOARDING, TOKENS.LOAD_STATE]);
  const {
    agent,
    initializeAgent,
    shutdownAndClearAgentIfExists
  } = useAgentSetup();
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const shouldRenderMainStack = useMemo(() => onboardingComplete && store.authentication.didAuthenticate, [onboardingComplete, store.authentication.didAuthenticate]);
  useEffect(() => {
    // if user gets locked out, erase agent
    if (!store.authentication.didAuthenticate) {
      shutdownAndClearAgentIfExists();
    }
  }, [store.authentication.didAuthenticate, shutdownAndClearAgentIfExists]);
  useEffect(() => {
    const sub = DeviceEventEmitter.addListener(EventTypes.DID_COMPLETE_ONBOARDING, () => {
      setOnboardingComplete(true);
    });
    return sub.remove;
  }, []);
  useEffect(() => {
    // Load state only if it hasn't been loaded yet
    if (store.stateLoaded) return;
    loadState(dispatch).catch(err => {
      const error = new BifoldError(t('Error.Title1044'), t('Error.Message1044'), err.message, 1001);
      DeviceEventEmitter.emit(EventTypes.ERROR_ADDED, error);
    });
  }, [dispatch, loadState, t, store.stateLoaded]);
  if (shouldRenderMainStack && agent) {
    return /*#__PURE__*/React.createElement(AgentProvider, {
      agent: agent
    }, /*#__PURE__*/React.createElement(OpenIDCredentialRecordProvider, null, /*#__PURE__*/React.createElement(ActivityProvider, null, /*#__PURE__*/React.createElement(MainStack, null))));
  }
  return /*#__PURE__*/React.createElement(OnboardingStack, {
    agent: agent,
    initializeAgent: initializeAgent
  });
};
export default RootStack;
//# sourceMappingURL=RootStack.js.map