"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isUpdateCheckComplete = exports.isTermsComplete = exports.isPushNotificationComplete = exports.isPrefaceComplete = exports.isPINCreationComplete = exports.isOnboardingTutorialComplete = exports.isNameWalletComplete = exports.isBiometryComplete = exports.isAuthenticationComplete = exports.isAttemptLockoutComplete = exports.isAgentInitializationComplete = exports.generateOnboardingWorkflowSteps = void 0;
var _navigators = require("./types/navigators");
const isPrefaceComplete = (didSeePreface, showPreface) => {
  return {
    name: _navigators.Screens.Preface,
    completed: didSeePreface && showPreface || !showPreface
  };
};
exports.isPrefaceComplete = isPrefaceComplete;
const isUpdateCheckComplete = () => {
  return {
    name: _navigators.Screens.UpdateAvailable,
    completed: true
  };
};
exports.isUpdateCheckComplete = isUpdateCheckComplete;
const isOnboardingTutorialComplete = didCompleteTutorial => {
  return {
    name: _navigators.Screens.Onboarding,
    completed: didCompleteTutorial
  };
};
exports.isOnboardingTutorialComplete = isOnboardingTutorialComplete;
const isTermsComplete = (didAgreeToTerms, termsVersion) => {
  return {
    name: _navigators.Screens.Terms,
    completed: didAgreeToTerms === termsVersion
  };
};
exports.isTermsComplete = isTermsComplete;
const isPINCreationComplete = didCreatePIN => {
  return {
    name: _navigators.Screens.CreatePIN,
    completed: didCreatePIN
  };
};
exports.isPINCreationComplete = isPINCreationComplete;
const isBiometryComplete = didConsiderBiometry => {
  return {
    name: _navigators.Screens.Biometry,
    completed: didConsiderBiometry
  };
};
exports.isBiometryComplete = isBiometryComplete;
const isPushNotificationComplete = (didConsiderPushNotifications, enablePushNotifications) => {
  return {
    name: _navigators.Screens.PushNotifications,
    completed: !enablePushNotifications || didConsiderPushNotifications && enablePushNotifications
  };
};
exports.isPushNotificationComplete = isPushNotificationComplete;
const isNameWalletComplete = (didNameWallet, enableWalletNaming) => {
  return {
    name: _navigators.Screens.NameWallet,
    completed: didNameWallet || !enableWalletNaming
  };
};
exports.isNameWalletComplete = isNameWalletComplete;
const isAuthenticationComplete = (didCreatePIN, didAuthenticate) => {
  return {
    name: _navigators.Screens.EnterPIN,
    completed: didAuthenticate || !didCreatePIN
  };
};
exports.isAuthenticationComplete = isAuthenticationComplete;
const isAttemptLockoutComplete = servedPenalty => {
  return {
    name: _navigators.Screens.AttemptLockout,
    completed: servedPenalty !== false
  };
};
exports.isAttemptLockoutComplete = isAttemptLockoutComplete;
const isAgentInitializationComplete = agent => {
  return {
    name: _navigators.Screens.Splash,
    completed: !!agent
  };
};
exports.isAgentInitializationComplete = isAgentInitializationComplete;
const generateOnboardingWorkflowSteps = (state, config, termsVersion, agent) => {
  const {
    didSeePreface,
    didCompleteTutorial,
    didAgreeToTerms,
    didCreatePIN,
    didConsiderBiometry,
    didConsiderPushNotifications,
    didNameWallet
  } = state.onboarding;
  const {
    servedPenalty
  } = state.loginAttempt;
  const {
    didAuthenticate
  } = state.authentication;
  const {
    enableWalletNaming
  } = state.preferences;
  const {
    showPreface,
    enablePushNotifications
  } = config;
  return [isPrefaceComplete(didSeePreface, showPreface ?? false), isUpdateCheckComplete(), isOnboardingTutorialComplete(didCompleteTutorial), isTermsComplete(Number(didAgreeToTerms), termsVersion), isPINCreationComplete(didCreatePIN), isBiometryComplete(didConsiderBiometry), isPushNotificationComplete(didConsiderPushNotifications, enablePushNotifications), isNameWalletComplete(didNameWallet, enableWalletNaming), isAttemptLockoutComplete(servedPenalty), isAuthenticationComplete(didCreatePIN, didAuthenticate), isAgentInitializationComplete(agent)];
};
exports.generateOnboardingWorkflowSteps = generateOnboardingWorkflowSteps;
//# sourceMappingURL=onboarding.js.map