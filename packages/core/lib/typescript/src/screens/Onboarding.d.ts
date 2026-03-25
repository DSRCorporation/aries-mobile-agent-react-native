import React from 'react';
import { ViewStyle } from 'react-native';
export interface OnboardingStyleSheet {
    container: ViewStyle;
    carouselContainer: ViewStyle;
    pagerContainer: ViewStyle;
    pagerDot: ViewStyle;
    pagerDotActive: ViewStyle;
    pagerDotInactive: ViewStyle;
    pagerPosition: ViewStyle;
    pagerNavigationButton: ViewStyle;
}
interface OnboardingProps {
    pages: Array<Element>;
    nextButtonText: string;
    previousButtonText: string;
    style: OnboardingStyleSheet;
    disableSkip?: boolean;
}
declare const Onboarding: React.FC<OnboardingProps>;
export default Onboarding;
//# sourceMappingURL=Onboarding.d.ts.map