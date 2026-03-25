import { useState, useEffect, useMemo } from 'react';
import { useNavigationState } from '@react-navigation/native';
/**
 * Hook to manage onboarding workflow state
 * Tracks the onboarding tasks, their completion status.
 */
export const useOnboardingState = (store, config, termsVersion, agent, generateOnboardingWorkflowSteps) => {
  const [onboardingState, setOnboardingState] = useState([]);
  const currentRoute = useNavigationState(state => state === null || state === void 0 ? void 0 : state.routes[state === null || state === void 0 ? void 0 : state.index]);
  const activeScreen = useMemo(() => {
    var _onboardingState$find;
    return (_onboardingState$find = onboardingState.find(task => !task.completed)) === null || _onboardingState$find === void 0 ? void 0 : _onboardingState$find.name;
  }, [onboardingState]);
  useEffect(() => {
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
//# sourceMappingURL=useOnboardingState.js.map