import React from 'react';
import { SvgProps } from 'react-native-svg';
import { GenericFn } from '../types/fn';
export declare const createCarouselStyle: (OnboardingTheme: any) => {
    container: any;
    carouselContainer: any;
    pagerContainer: {
        flexShrink: number;
        flexDirection: "row";
        alignItems: "center";
        marginBottom: number;
    };
    pagerDot: any;
    pagerDotActive: any;
    pagerDotInactive: any;
    pagerPosition: {
        position: "relative";
        top: number;
    };
    pagerNavigationButton: any;
};
export declare const createStyles: (OnboardingTheme: any) => {
    headerText: any;
    bodyText: any;
    point: {
        flexDirection: "row";
        alignItems: "center";
        marginLeft: number;
        marginTop: number;
        marginRight: number;
        marginBottom: number;
    };
    icon: {
        marginRight: number;
    };
};
export declare const createPageWith: (PageImage: React.FC<SvgProps>, title: string, body: string, OnboardingTheme: any, devModeListener?: boolean, onDevModeTouched?: () => void) => React.JSX.Element;
declare const OnboardingPages: (onTutorialCompleted: GenericFn, OnboardingTheme: any) => Array<Element>;
export default OnboardingPages;
//# sourceMappingURL=OnboardingPages.d.ts.map