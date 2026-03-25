import React from 'react';
import { ParamListBase, RouteConfig, StackNavigationState } from '@react-navigation/native';
import { StackNavigationOptions } from '@react-navigation/stack';
import type { StackNavigationEventMap } from '@react-navigation/stack/lib/typescript/src/types';
import { TFunction } from 'i18next';
import { ScreenOptionsType, Screens } from '../types/navigators';
type ScreenOptions = RouteConfig<ParamListBase, Screens, StackNavigationState<ParamListBase>, StackNavigationOptions, StackNavigationEventMap>;
interface ScreenComponents {
    SplashScreen: React.FC;
    Preface: React.FC;
    UpdateAvailableScreen: React.FC;
    Terms: React.FC;
    NameWallet: React.FC;
    Biometry: React.FC;
    PushNotifications: React.FC;
    AttemptLockout: React.FC;
    OnboardingScreen: React.FC;
    CreatePINScreen: React.FC;
    EnterPINScreen: React.FC;
}
export declare const getOnboardingScreens: (t: TFunction, ScreenOptionsDictionary: ScreenOptionsType, components: ScreenComponents) => ScreenOptions[];
export {};
//# sourceMappingURL=OnboardingScreens.d.ts.map