import React from 'react';
import { SvgProps } from 'react-native-svg';
import { GenericFn } from '../types/fn';
import { OnboardingStyleSheet } from './Onboarding';
export declare const createCarouselStyle: (OnboardingTheme: any) => OnboardingStyleSheet;
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
export declare const createPageWith: (PageImage: React.FC<SvgProps>, title: string, body: string, OnboardingTheme: any) => React.JSX.Element;
declare const OnboardingPages: (onTutorialCompleted: GenericFn, OnboardingTheme: any) => Array<Element>;
export default OnboardingPages;
//# sourceMappingURL=OnboardingPages.d.ts.map