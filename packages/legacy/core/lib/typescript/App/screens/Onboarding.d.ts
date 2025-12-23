import React from 'react';
export interface OnboardingStyleSheet {
    container: Record<string, any>;
    carouselContainer: Record<string, any>;
    pagerContainer: Record<string, any>;
    pagerDot: Record<string, any>;
    pagerDotActive: Record<string, any>;
    pagerDotInactive: Record<string, any>;
    pagerPosition: Record<string, any>;
    pagerNavigationButton: Record<string, any>;
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