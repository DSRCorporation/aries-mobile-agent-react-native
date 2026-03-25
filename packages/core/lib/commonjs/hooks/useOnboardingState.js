"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useOnboardingState = void 0;
var _react = require("react");
var _native = require("@react-navigation/native");
/**
 * Hook to manage onboarding workflow state
 * Tracks the onboarding tasks, their completion status.
 */
const useOnboardingState = (store, config, termsVersion, agent, generateOnboardingWorkflowSteps) => {
  const [onboardingState, setOnboardingState] = (0, _react.useState)([]);
  const currentRoute = (0, _native.useNavigationState)(state => state === null || state === void 0 ? void 0 : state.routes[state === null || state === void 0 ? void 0 : state.index]);
  const activeScreen = (0, _react.useMemo)(() => {
    var _onboardingState$find;
    return (_onboardingState$find = onboardingState.find(task => !task.completed)) === null || _onboardingState$find === void 0 ? void 0 : _onboardingState$find.name;
  }, [onboardingState]);
  (0, _react.useEffect)(() => {
    if (!store.stateLoaded) {
      return;
    }
    const onboardingTasks = generateOnboardingWorkflowSteps(store, config, termsVersion, agent);
    setOnboardingState(onboardingTasks);
  }, [store, config, termsVersion, agent, generateOnboardingWorkflowSteps]);
  return {
    onboardingState,
    setOnboardingState,
    activeScreen,
    currentRoute,
    isComplete: !activeScreen
  };
};
exports.useOnboardingState = useOnboardingState;
//# sourceMappingURL=useOnboardingState.js.map