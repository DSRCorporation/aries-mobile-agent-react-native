import { ViewStyle } from 'react-native';
import { SvgProps } from 'react-native-svg';
import React from 'react';
import { IChatTheme, IHomeTheme, IInputs, ISettingsTheme, ITabTheme, ITextTheme, IOnboardingTheme, IDialogTheme, ILoadingTheme, IPINInputTheme, ISeparatedPINInputTheme, IInlineInputMessage, IButtons, IListItems } from './theme.interface';
export interface ISVGAssets {
    activityIndicator: React.FC<SvgProps>;
    appLockout: React.FC<SvgProps>;
    biometrics: React.FC<SvgProps>;
    contactBook: React.FC<SvgProps>;
    credentialDeclined: React.FC<SvgProps>;
    deleteNotification: React.FC<SvgProps>;
    emptyWallet: React.FC<SvgProps>;
    logo: React.FC<SvgProps>;
    proofRequestDeclined: React.FC<SvgProps>;
    arrow: React.FC<SvgProps>;
    iconCredentialOfferDark: React.FC<SvgProps>;
    iconCredentialOfferLight: React.FC<SvgProps>;
    iconInfoRecievedDark: React.FC<SvgProps>;
    iconInfoRecievedLight: React.FC<SvgProps>;
    iconInfoSentDark: React.FC<SvgProps>;
    iconInfoSentLight: React.FC<SvgProps>;
    iconProofRequestDark: React.FC<SvgProps>;
    iconProofRequestLight: React.FC<SvgProps>;
    preface: React.FC<SvgProps>;
    updateAvailable: React.FC<SvgProps>;
    verifierRequestDeclined: React.FC<SvgProps>;
    noInfoShared: React.FC<SvgProps>;
    wallet: React.FC<SvgProps>;
    checkInCircle: React.FC<SvgProps>;
    credentialCard: React.FC<SvgProps>;
    walletBack: React.FC<SvgProps>;
    walletFront: React.FC<SvgProps>;
    credentialInHand: React.FC<SvgProps>;
    credentialList: React.FC<SvgProps>;
    scanShare: React.FC<SvgProps>;
    secureCheck: React.FC<SvgProps>;
    secureImage: React.FC<SvgProps>;
    informationReceived: React.FC<SvgProps>;
    pushNotificationImg: React.FC<SvgProps>;
    chatLoading: React.FC<SvgProps>;
    historyCardAcceptedIcon: React.FC<SvgProps>;
    historyCardDeclinedIcon: React.FC<SvgProps>;
    historyCardExpiredIcon: React.FC<SvgProps>;
    historyCardRemovedIcon: React.FC<SvgProps>;
    historyCardRevokedIcon: React.FC<SvgProps>;
    historyCardUpdatesIcon: React.FC<SvgProps>;
    historyPinUpdatedIcon: React.FC<SvgProps>;
    historyInformationSentIcon: React.FC<SvgProps>;
    historyInformationNotSentIcon: React.FC<SvgProps>;
    historyConnectionIcon: React.FC<SvgProps>;
    historyConnectionRemovedIcon: React.FC<SvgProps>;
    historyActivateBiometryIcon: React.FC<SvgProps>;
    historyDeactivateBiometryIcon: React.FC<SvgProps>;
    iconChevronRight: React.FC<SvgProps>;
    homeCenterImg: React.FC<SvgProps>;
    iconDelete: React.FC<SvgProps>;
    iconEdit: React.FC<SvgProps>;
    iconWarning: React.FC<SvgProps>;
    iconError: React.FC<SvgProps>;
    iconCode: React.FC<SvgProps>;
    tabOneIcon: React.FC<SvgProps>;
    tabOneFocusedIcon: React.FC<SvgProps>;
    tabTwoIcon: React.FC<SvgProps>;
    tabThreeIcon: React.FC<SvgProps>;
    tabThreeFocusedIcon: React.FC<SvgProps>;
    credentialRevoked: React.FC<SvgProps>;
    credentialNotAvailable: React.FC<SvgProps>;
}
export interface ISpacing {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
}
export interface IFontAttributes {
    fontFamily?: string;
    fontStyle?: 'normal' | 'italic';
    fontSize: number;
    fontWeight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
    color: string;
    lineHeight?: number;
}
export interface IInputAttributes {
    padding?: number;
    borderRadius?: number;
    fontSize?: number;
    backgroundColor?: string;
    color?: string;
    borderWidth?: number;
    borderColor?: string;
}
export interface ISemanticColors {
    error: string;
    success: string;
    focus: string;
}
export interface INotificationColors {
    success: string;
    successBorder: string;
    successIcon: string;
    successText: string;
    info: string;
    infoBorder: string;
    infoIcon: string;
    infoText: string;
    warn: string;
    warnBorder: string;
    warnIcon: string;
    warnText: string;
    error: string;
    errorBorder: string;
    errorIcon: string;
    errorText: string;
    popupOverlay: string;
}
export interface IGrayscaleColors {
    black: string;
    darkGrey: string;
    mediumGrey: string;
    lightGrey: string;
    veryLightGrey: string;
    white: string;
}
export interface IErrorColors {
    error: string;
    warning: string;
}
export interface IIconColors {
    credentialRevoked: string;
    credentialNotAvailable: string;
}
export interface IColorPalette {
    brand: IBrandColors;
    semantic: ISemanticColors;
    notification: INotificationColors;
    grayscale: IGrayscaleColors;
}
export interface IAssets {
    svg: ISVGAssets;
    img: {
        logoPrimary: any;
        logoSecondary: any;
    };
}
export declare const borderRadius = 4;
export declare const heavyOpacity = 0.7;
export declare const mediumOpacity = 0.5;
export declare const lightOpacity = 0.35;
export declare const zeroOpacity = 0;
export declare const borderWidth = 2;
export declare const maxFontSizeMultiplier = 2;
declare const BrandColors: {
    primary: string;
    primaryDisabled: string;
    secondary: string;
    secondaryDisabled: string;
    tertiary: string;
    tertiaryDisabled: string;
    primaryLight: string;
    highlight: string;
    primaryBackground: string;
    secondaryBackground: string;
    tertiaryBackground: string;
    modalPrimary: string;
    modalSecondary: string;
    modalTertiary: string;
    modalPrimaryBackground: string;
    modalSecondaryBackground: string;
    modalTertiaryBackground: string;
    modalIcon: string;
    unorderedList: string;
    unorderedListModal: string;
    link: string;
    credentialLink: string;
    text: string;
    icon: string;
    headerIcon: string;
    headerText: string;
    buttonText: string;
    tabBarInactive: string;
    inlineError: string;
    inlineWarning: string;
};
export type IBrandColors = typeof BrandColors;
export declare const ColorPalette: IColorPalette;
/**
 * Creates a text theme based on the provided color pallet.
 *
 * @param {{ ColorPalette: IColorPalette }} theme - The theme object containing the color pallet
 * @returns {*} {ITextTheme} - The created text theme
 */
export declare function createTextTheme(theme: {
    ColorPalette: IColorPalette;
}): ITextTheme;
export declare const TextTheme: ITextTheme;
/**
 * Creates a theme for inputs based on the provided color pallet and text theme.
 *
 * @param {{ ColorPalette: IColorPalette; TextTheme: ITextTheme; borderRadius: number }} theme - The theme object containing the color pallet, text theme, and border radius
 * @returns {*} {IInputs} - The created inputs theme
 */
export declare function createInputsTheme(theme: {
    ColorPalette: IColorPalette;
    TextTheme: ITextTheme;
    borderRadius: number;
}): IInputs;
export declare const Inputs: IInputs;
/**
 * Creates a theme for buttons based on the provided color pallet and text theme.
 *
 * @param {{ ColorPalette: IColorPalette; TextTheme: ITextTheme }} theme - The theme object containing the color pallet and text theme
 * @returns {*} {IButtons} - The created buttons theme
 */
export declare function createButtonsTheme(theme: {
    ColorPalette: IColorPalette;
    TextTheme: ITextTheme;
}): IButtons;
export declare const Buttons: IButtons;
/**
 * Creates a theme for list items based on the provided color pallet and text theme.
 *
 * @param {{ ColorPalette: IColorPalette; TextTheme: ITextTheme }} theme - The theme object containing the color pallet and text theme
 * @returns {*} {IListItems} - The created list items theme
 */
export declare function createListItemsTheme(theme: {
    ColorPalette: IColorPalette;
    TextTheme: ITextTheme;
}): IListItems;
export declare const ListItems: IListItems;
/**
 * Creates a theme for tabs based on the provided color pallet and text theme.
 *
 * @param {{ ColorPalette: IColorPalette; TextTheme: ITextTheme }} theme - The theme object containing the color pallet and text theme
 * @returns {*} {ITabTheme} - The created tab theme
 */
export declare function createTabTheme(theme: {
    ColorPalette: IColorPalette;
    TextTheme: ITextTheme;
}): ITabTheme;
export declare const TabTheme: ITabTheme;
/**
 * Creates a navigation theme based on the provided color pallet.
 *
 * @param {{ ColorPalette: IColorPalette }} theme - The theme object containing the color pallet
 * @returns {*} {INavigationTheme} - The created navigation theme
 */
export declare function createNavigationTheme(theme: {
    ColorPalette: IColorPalette;
}): {
    dark: boolean;
    colors: {
        primary: string;
        background: string;
        card: string;
        text: string;
        border: string;
        notification: string;
    };
    header: {
        shadowOffset: {
            width: number;
            height: number;
        };
        shadowRadius: number;
        shadowColor: string;
        shadowOpacity: number;
        elevation: number;
    };
};
export type INavigationTheme = ReturnType<typeof createNavigationTheme>;
export declare const NavigationTheme: {
    dark: boolean;
    colors: {
        primary: string;
        background: string;
        card: string;
        text: string;
        border: string;
        notification: string;
    };
    header: {
        shadowOffset: {
            width: number;
            height: number;
        };
        shadowRadius: number;
        shadowColor: string;
        shadowOpacity: number;
        elevation: number;
    };
};
/**
 * Creates a home theme based on the provided color pallet and text theme.
 *
 * @param {{ ColorPalette: IColorPalette; TextTheme: ITextTheme }} theme - The theme object containing the color pallet and text theme
 * @returns {*} {IHomeTheme} - The created home theme
 */
export declare function createHomeTheme(theme: {
    ColorPalette: IColorPalette;
    TextTheme: ITextTheme;
}): IHomeTheme;
export declare const HomeTheme: IHomeTheme;
/**
 * Creates a settings theme based on the provided color pallet and text theme.
 *
 * @param {{ ColorPalette: IColorPalette; TextTheme: ITextTheme }} theme - The theme object containing the color pallet and text theme
 * @returns {*} {ISettingsTheme} - The created settings theme
 */
export declare function createSettingsTheme(theme: {
    ColorPalette: IColorPalette;
    TextTheme: ITextTheme;
}): ISettingsTheme;
export declare const SettingsTheme: ISettingsTheme;
/**
 * Creates a chat theme based on the provided color pallet and text theme.
 *
 * @param {{ ColorPalette: IColorPalette; TextTheme: ITextTheme }} theme - The theme object containing the color pallet and text theme
 * @returns {*} {IChatTheme} - The created chat theme
 */
export declare function createChatTheme(theme: {
    ColorPalette: IColorPalette;
    TextTheme: ITextTheme;
}): IChatTheme;
export declare const ChatTheme: IChatTheme;
/**
 * Creates an onboarding theme based on the provided color pallet and text theme.
 *
 * @param {{ ColorPalette: IColorPalette; TextTheme: ITextTheme }} theme - The theme object containing the color pallet and text theme
 * @returns {*} {IOnboardingTheme} - The created onboarding theme
 */
export declare function createOnboardingTheme(theme: {
    ColorPalette: IColorPalette;
    TextTheme: ITextTheme;
}): IOnboardingTheme;
export declare const OnboardingTheme: IOnboardingTheme;
/**
 * Creates a dialog theme based on the provided color pallet.
 *
 * @param {{ ColorPalette: IColorPalette }} theme - The theme object containing the color pallet
 * @returns {*} {IDialogTheme} - The created dialog theme
 */
export declare function createDialogTheme(theme: {
    ColorPalette: IColorPalette;
}): IDialogTheme;
export declare const DialogTheme: IDialogTheme;
export declare function createLoadingTheme(theme: {
    ColorPalette: IColorPalette;
}): ILoadingTheme;
export declare const LoadingTheme: ILoadingTheme;
declare const PINEnterTheme: {
    image: {
        alignSelf: string;
        marginBottom: number;
    };
};
export type IPINEnterTheme = typeof PINEnterTheme;
/**
 * Creates a theme for PIN input based on the provided color pallet.
 *
 * @param {{ ColorPalette: IColorPalette }} theme - The theme object containing the color pallet
 * @returns {*} {IPINInputTheme} - The created PIN input theme
 */
export declare function createPINInputTheme(theme: {
    ColorPalette: IColorPalette;
}): IPINInputTheme;
export declare const PINInputTheme: IPINInputTheme;
/**
 * Creates a theme for a separated PIN input based on the provided color pallet.
 *
 * @param {{ ColorPalette: IColorPalette }} theme - The theme object containing the color pallet
 * @returns {*} {ISeparatedPINInputTheme} - The created  PIN input theme
 */
export declare function createSeparatedPINInputTheme(theme: {
    ColorPalette: IColorPalette;
}): ISeparatedPINInputTheme;
export declare const SeparatedPINInputTheme: ISeparatedPINInputTheme;
export declare const Assets: {
    svg: {
        activityIndicator: React.FC<SvgProps>;
        appLockout: React.FC<SvgProps>;
        biometrics: React.FC<SvgProps>;
        credentialDeclined: React.FC<SvgProps>;
        deleteNotification: React.FC<SvgProps>;
        emptyWallet: React.FC<SvgProps>;
        contactBook: React.FC<SvgProps>;
        logo: React.FC<SvgProps>;
        proofRequestDeclined: React.FC<SvgProps>;
        arrow: React.FC<SvgProps>;
        iconCredentialOfferDark: React.FC<SvgProps>;
        iconCredentialOfferLight: React.FC<SvgProps>;
        iconInfoRecievedDark: React.FC<SvgProps>;
        iconInfoRecievedLight: React.FC<SvgProps>;
        iconInfoSentDark: React.FC<SvgProps>;
        iconInfoSentLight: React.FC<SvgProps>;
        iconProofRequestDark: React.FC<SvgProps>;
        iconProofRequestLight: React.FC<SvgProps>;
        preface: React.FC<SvgProps>;
        updateAvailable: React.FC<SvgProps>;
        verifierRequestDeclined: React.FC<SvgProps>;
        noInfoShared: React.FC<SvgProps>;
        wallet: React.FC<SvgProps>;
        checkInCircle: React.FC<SvgProps>;
        credentialCard: React.FC<SvgProps>;
        walletBack: React.FC<SvgProps>;
        walletFront: React.FC<SvgProps>;
        credentialInHand: React.FC<SvgProps>;
        credentialList: React.FC<SvgProps>;
        scanShare: React.FC<SvgProps>;
        secureCheck: React.FC<SvgProps>;
        secureImage: React.FC<SvgProps>;
        informationReceived: React.FC<SvgProps>;
        pushNotificationImg: React.FC<SvgProps>;
        chatLoading: React.FC<SvgProps>;
        historyCardAcceptedIcon: React.FC<SvgProps>;
        historyCardDeclinedIcon: React.FC<SvgProps>;
        historyCardExpiredIcon: React.FC<SvgProps>;
        historyCardRemovedIcon: React.FC<SvgProps>;
        historyCardRevokedIcon: React.FC<SvgProps>;
        historyCardUpdatesIcon: React.FC<SvgProps>;
        historyPinUpdatedIcon: React.FC<SvgProps>;
        historyInformationSentIcon: React.FC<SvgProps>;
        historyInformationNotSentIcon: React.FC<SvgProps>;
        historyConnectionIcon: React.FC<SvgProps>;
        historyConnectionRemovedIcon: React.FC<SvgProps>;
        historyActivateBiometryIcon: React.FC<SvgProps>;
        historyDeactivateBiometryIcon: React.FC<SvgProps>;
        iconChevronRight: React.FC<SvgProps>;
        homeCenterImg: React.FC<SvgProps>;
        iconDelete: React.FC<SvgProps>;
        iconEdit: React.FC<SvgProps>;
        iconCode: React.FC<SvgProps>;
        iconError: React.FC<SvgProps>;
        iconWarning: React.FC<SvgProps>;
        tabOneIcon: React.FC<SvgProps>;
        tabOneFocusedIcon: React.FC<SvgProps>;
        tabTwoIcon: React.FC<SvgProps>;
        tabThreeIcon: React.FC<SvgProps>;
        tabThreeFocusedIcon: React.FC<SvgProps>;
        credentialRevoked: React.FC<SvgProps>;
        credentialNotAvailable: React.FC<SvgProps>;
    };
    img: {
        logoPrimary: {
            src: any;
            aspectRatio: number;
            height: string;
            width: string;
            resizeMode: string;
        };
        logoSecondary: {
            src: any;
            aspectRatio: number;
            height: number;
            width: number;
            resizeMode: string;
        };
    };
};
/**
 * Creates a theme for inline messages in inputs based on the provided text theme and assets.
 *
 * @param {{ TextTheme: ITextTheme; Assets: IAssets }} theme - The theme object containing the text theme and assets
 * @return {*} {IInlineInputMessage} - The created inline input message theme
 */
export declare function createInputInlineMessageTheme(theme: {
    TextTheme: ITextTheme;
    Assets: IAssets;
}): IInlineInputMessage;
export declare const InputInlineMessage: IInlineInputMessage;
export interface ITheme {
    themeName: string;
    Spacing: ISpacing;
    ColorPalette: IColorPalette;
    TextTheme: ITextTheme;
    InputInlineMessage: IInlineInputMessage;
    Inputs: IInputs;
    Buttons: IButtons;
    ListItems: IListItems;
    TabTheme: ITabTheme;
    NavigationTheme: INavigationTheme;
    HomeTheme: IHomeTheme;
    SettingsTheme: ISettingsTheme;
    ChatTheme: IChatTheme;
    OnboardingTheme: IOnboardingTheme;
    DialogTheme: IDialogTheme;
    LoadingTheme: ILoadingTheme;
    PINEnterTheme: IPINEnterTheme;
    PINInputTheme: IPINInputTheme;
    SeparatedPINInputTheme: ISeparatedPINInputTheme;
    CredentialCardShadowTheme: ViewStyle;
    SelectedCredTheme: ViewStyle;
    heavyOpacity: typeof heavyOpacity;
    borderRadius: typeof borderRadius;
    borderWidth: typeof borderWidth;
    maxFontSizeMultiplier: number;
    Assets: IAssets;
}
export declare const bifoldTheme: ITheme;
export declare const themes: ITheme[];
export type { ITextTheme, IInlineInputMessage, IInputs, IButtons, IListItems, ITabTheme, IHomeTheme, ISettingsTheme, IChatTheme, IOnboardingTheme, IDialogTheme, ILoadingTheme, IPINInputTheme, ISeparatedPINInputTheme, } from './theme.interface';
//# sourceMappingURL=theme.d.ts.map