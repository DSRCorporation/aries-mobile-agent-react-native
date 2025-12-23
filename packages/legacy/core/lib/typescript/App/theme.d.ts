/// <reference types="react" />
import { SvgProps } from 'react-native-svg';
export interface ISVGAssets {
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
    verifierRequestDeclined: React.FC<SvgProps>;
    noInfoShared: React.FC<SvgProps>;
}
export interface IFontAttributes {
    fontFamily?: string;
    fontStyle?: 'normal' | 'italic';
    fontSize: number;
    fontWeight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
    color: string;
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
export interface IInputs {
    label: IFontAttributes;
    textInput: IInputAttributes;
    inputSelected: IInputAttributes;
    singleSelect: IInputAttributes;
    singleSelectText: IFontAttributes;
    singleSelectIcon: IInputAttributes;
    checkBoxColor: IInputAttributes;
    checkBoxText: IFontAttributes;
}
export interface ITextTheme {
    headingOne: IFontAttributes;
    headingTwo: IFontAttributes;
    headingThree: IFontAttributes;
    headingFour: IFontAttributes;
    normal: IFontAttributes;
    bold: IFontAttributes;
    label: IFontAttributes;
    labelTitle: IFontAttributes;
    labelSubtitle: IFontAttributes;
    labelText: IFontAttributes;
    caption: IFontAttributes;
    title: IFontAttributes;
    headerTitle: IFontAttributes;
    modalNormal: IFontAttributes;
    modalTitle: IFontAttributes;
    popupModalText: IFontAttributes;
    modalHeadingOne: IFontAttributes;
    modalHeadingThree: IFontAttributes;
    settingsText: IFontAttributes;
}
export interface IBrandColors {
    primary: string;
    primaryDisabled: string;
    secondary: string;
    secondaryDisabled: string;
    primaryLight: string;
    highlight: string;
    primaryBackground: string;
    secondaryBackground: string;
    modalPrimary: string;
    modalSecondary: string;
    modalPrimaryBackground: string;
    modalSecondaryBackground: string;
    modalIcon: string;
    link: string;
    text: string;
    icon: string;
    headerText: string;
    headerIcon: string;
    buttonText: string;
    tabBarInactive: string;
    unorderedList: string;
    unorderedListModal: string;
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
export interface IColorPallet {
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
export declare const ColorPallet: IColorPallet;
export declare const TextTheme: ITextTheme;
export declare const Inputs: IInputs;
export declare const Buttons: {
    critical: {
        padding: number;
        borderRadius: number;
        backgroundColor: string;
    };
    primary: {
        padding: number;
        borderRadius: number;
        backgroundColor: string;
    };
    primaryDisabled: {
        padding: number;
        borderRadius: number;
        backgroundColor: string;
    };
    primaryText: {
        color: string;
        textAlign: "center";
        fontFamily?: string | undefined;
        fontStyle?: "normal" | "italic" | undefined;
        fontSize: number;
        fontWeight?: "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900" | undefined;
    };
    primaryTextDisabled: {
        textAlign: "center";
        fontFamily?: string | undefined;
        fontStyle?: "normal" | "italic" | undefined;
        fontSize: number;
        fontWeight?: "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900" | undefined;
        color: string;
    };
    secondary: {
        padding: number;
        borderRadius: number;
        borderWidth: number;
        borderColor: string;
    };
    secondaryDisabled: {
        padding: number;
        borderRadius: number;
        borderWidth: number;
        borderColor: string;
    };
    secondaryText: {
        color: string;
        textAlign: "center";
        fontFamily?: string | undefined;
        fontStyle?: "normal" | "italic" | undefined;
        fontSize: number;
        fontWeight?: "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900" | undefined;
    };
    secondaryTextDisabled: {
        color: string;
        textAlign: "center";
        fontFamily?: string | undefined;
        fontStyle?: "normal" | "italic" | undefined;
        fontSize: number;
        fontWeight?: "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900" | undefined;
    };
    modalCritical: {
        padding: number;
        borderRadius: number;
        backgroundColor: string;
    };
    modalPrimary: {
        padding: number;
        borderRadius: number;
        backgroundColor: string;
    };
    modalPrimaryText: {
        textAlign: "center";
        fontFamily?: string | undefined;
        fontStyle?: "normal" | "italic" | undefined;
        fontSize: number;
        fontWeight?: "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900" | undefined;
        color: string;
    };
    modalSecondary: {
        padding: number;
        borderRadius: number;
        borderWidth: number;
        borderColor: string;
    };
    modalSecondaryText: {
        color: string;
        textAlign: "center";
        fontFamily?: string | undefined;
        fontStyle?: "normal" | "italic" | undefined;
        fontSize: number;
        fontWeight?: "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900" | undefined;
    };
    secondaryCritical: {
        padding: number;
        borderRadius: number;
        borderWidth: number;
        backgroundColor: string;
        borderColor: string;
    };
    secondaryCriticalText: {
        color: string;
        fontFamily?: string | undefined;
        fontStyle?: "normal" | "italic" | undefined;
        fontSize: number;
        fontWeight?: "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900" | undefined;
    };
};
export declare const ListItems: {
    credentialBackground: {
        backgroundColor: string;
    };
    credentialTitle: {
        fontFamily?: string | undefined;
        fontStyle?: "normal" | "italic" | undefined;
        fontSize: number;
        fontWeight?: "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900" | undefined;
        color: string;
    };
    credentialDetails: {
        fontFamily?: string | undefined;
        fontStyle?: "normal" | "italic" | undefined;
        fontSize: number;
        fontWeight?: "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900" | undefined;
        color: string;
    };
    credentialOfferBackground: {
        backgroundColor: string;
    };
    credentialOfferTitle: {
        fontWeight: "normal";
        fontFamily?: string | undefined;
        fontStyle?: "normal" | "italic" | undefined;
        fontSize: number;
        color: string;
    };
    credentialOfferDetails: {
        fontFamily?: string | undefined;
        fontStyle?: "normal" | "italic" | undefined;
        fontSize: number;
        fontWeight?: "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900" | undefined;
        color: string;
    };
    revoked: {
        backgroundColor: string;
        borderColor: string;
    };
    contactBackground: {
        backgroundColor: string;
    };
    credentialIconColor: {
        color: string;
    };
    contactTitle: {
        color: string;
    };
    contactDate: {
        color: string;
        marginTop: number;
    };
    contactIconBackground: {
        backgroundColor: string;
    };
    contactIcon: {
        color: string;
    };
    recordAttributeLabel: {
        fontFamily?: string | undefined;
        fontStyle?: "normal" | "italic" | undefined;
        fontSize: number;
        fontWeight?: "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900" | undefined;
        color: string;
    };
    recordContainer: {
        backgroundColor: string;
    };
    recordBorder: {
        borderBottomColor: string;
    };
    recordLink: {
        color: string;
    };
    recordAttributeText: {
        fontFamily?: string | undefined;
        fontStyle?: "normal" | "italic" | undefined;
        fontSize: number;
        fontWeight?: "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900" | undefined;
        color: string;
    };
    proofIcon: {
        fontFamily?: string | undefined;
        fontStyle?: "normal" | "italic" | undefined;
        fontSize: number;
        fontWeight?: "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900" | undefined;
        color: string;
    };
    proofError: {
        color: string;
    };
    avatarText: {
        fontWeight: "normal";
        fontFamily?: string | undefined;
        fontStyle?: "normal" | "italic" | undefined;
        fontSize: number;
        color: string;
    };
    avatarCircle: {
        borderRadius: number;
        borderColor: string;
        width: number;
        height: number;
    };
    emptyList: {
        fontFamily?: string | undefined;
        fontStyle?: "normal" | "italic" | undefined;
        fontSize: number;
        fontWeight?: "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900" | undefined;
        color: string;
    };
    requestTemplateBackground: {
        backgroundColor: string;
    };
    requestTemplateIconColor: {
        color: string;
    };
    requestTemplateTitle: {
        color: string;
        fontWeight: "bold";
        fontSize: number;
    };
    requestTemplateDetails: {
        color: string;
        fontWeight: "normal";
        fontSize: number;
    };
    requestTemplateZkpLabel: {
        color: string;
        fontSize: number;
    };
    requestTemplateIcon: {
        color: string;
        fontSize: number;
    };
    requestTemplateDate: {
        color: string;
        fontSize: number;
    };
};
export declare const TabTheme: {
    tabBarStyle: {
        height: number;
        backgroundColor: string;
        shadowOffset: {
            width: number;
            height: number;
        };
        shadowRadius: number;
        shadowColor: string;
        shadowOpacity: number;
        borderTopWidth: number;
        paddingBottom: number;
    };
    tabBarContainerStyle: {
        flex: number;
        justifyContent: string;
        alignItems: string;
    };
    tabBarActiveTintColor: string;
    tabBarInactiveTintColor: string;
    tabBarTextStyle: {
        paddingBottom: number;
        fontFamily?: string | undefined;
        fontStyle?: "normal" | "italic" | undefined;
        fontSize: number;
        fontWeight?: "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900" | undefined;
        color: string;
    };
    tabBarButtonIconStyle: {
        color: string;
    };
    focusTabIconStyle: {
        height: number;
        width: number;
        backgroundColor: string;
        borderRadius: number;
        justifyContent: string;
        alignItems: string;
    };
    focusTabActiveTintColor: {
        backgroundColor: string;
    };
};
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
};
export declare const HomeTheme: {
    welcomeHeader: {
        fontFamily?: string | undefined;
        fontStyle?: "normal" | "italic" | undefined;
        fontSize: number;
        fontWeight?: "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900" | undefined;
        color: string;
    };
    credentialMsg: {
        fontFamily?: string | undefined;
        fontStyle?: "normal" | "italic" | undefined;
        fontSize: number;
        fontWeight?: "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900" | undefined;
        color: string;
    };
    notificationsHeader: {
        fontFamily?: string | undefined;
        fontStyle?: "normal" | "italic" | undefined;
        fontSize: number;
        fontWeight?: "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900" | undefined;
        color: string;
    };
    noNewUpdatesText: {
        color: string;
        fontFamily?: string | undefined;
        fontStyle?: "normal" | "italic" | undefined;
        fontSize: number;
        fontWeight?: "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900" | undefined;
    };
    link: {
        color: string;
        fontFamily?: string | undefined;
        fontStyle?: "normal" | "italic" | undefined;
        fontSize: number;
        fontWeight?: "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900" | undefined;
    };
};
export declare const SettingsTheme: {
    groupHeader: {
        marginBottom: number;
        fontFamily?: string | undefined;
        fontStyle?: "normal" | "italic" | undefined;
        fontSize: number;
        fontWeight?: "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900" | undefined;
        color: string;
    };
    groupBackground: string;
    iconColor: string;
    text: {
        color: string;
        fontFamily?: string | undefined;
        fontStyle?: "normal" | "italic" | undefined;
        fontSize: number;
        fontWeight?: "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900" | undefined;
    };
};
export declare const ChatTheme: {
    containerStyle: {
        marginBottom: number;
        marginLeft: number;
        marginRight: number;
        flexDirection: string;
        alignItems: string;
        alignSelf: string;
    };
    leftBubble: {
        backgroundColor: string;
        borderRadius: number;
        padding: number;
        marginLeft: number;
    };
    rightBubble: {
        backgroundColor: string;
        borderRadius: number;
        padding: number;
        marginRight: number;
    };
    timeStyleLeft: {
        color: string;
        fontSize: number;
        marginTop: number;
    };
    timeStyleRight: {
        color: string;
        fontSize: number;
        marginTop: number;
    };
    leftText: {
        color: string;
        fontSize: number;
    };
    leftTextHighlighted: {
        color: string;
        fontFamily?: string | undefined;
        fontStyle?: "normal" | "italic" | undefined;
        fontSize: number;
        fontWeight?: "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900" | undefined;
    };
    rightText: {
        color: string;
        fontSize: number;
    };
    rightTextHighlighted: {
        color: string;
        fontFamily?: string | undefined;
        fontStyle?: "normal" | "italic" | undefined;
        fontSize: number;
        fontWeight?: "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900" | undefined;
    };
    inputToolbar: {
        backgroundColor: string;
        shadowColor: string;
        borderRadius: number;
    };
    inputText: {
        lineHeight: undefined;
        fontWeight: string;
        fontSize: number;
    };
    placeholderText: string;
    sendContainer: {
        marginBottom: number;
        paddingHorizontal: number;
        justifyContent: string;
    };
    sendEnabled: string;
    sendDisabled: string;
    options: string;
    optionsText: string;
    openButtonStyle: {
        borderRadius: number;
        backgroundColor: string;
        paddingTop: number;
        paddingBottom: number;
        paddingLeft: number;
        paddingRight: number;
        marginTop: number;
    };
    openButtonTextStyle: {
        fontSize: number;
        fontWeight: string;
        textAlign: string;
    };
    documentIconContainer: {
        backgroundColor: string;
        alignSelf: string;
        borderRadius: number;
        marginBottom: number;
        justifyContent: string;
        alignItems: string;
        width: number;
        height: number;
    };
    documentIcon: {
        color: string;
    };
};
export declare const OnboardingTheme: {
    container: {
        backgroundColor: string;
    };
    carouselContainer: {
        backgroundColor: string;
    };
    pagerDot: {
        borderColor: string;
    };
    pagerDotActive: {
        color: string;
    };
    pagerDotInactive: {
        color: string;
    };
    pagerNavigationButton: {
        color: string;
        fontWeight: string;
        fontSize: number;
    };
    headerTintColor: string;
    headerText: {
        fontFamily?: string | undefined;
        fontStyle?: "normal" | "italic" | undefined;
        fontSize: number;
        fontWeight?: "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900" | undefined;
        color: string;
    };
    bodyText: {
        fontFamily?: string | undefined;
        fontStyle?: "normal" | "italic" | undefined;
        fontSize: number;
        fontWeight?: "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900" | undefined;
        color: string;
    };
    imageDisplayOptions: {
        fill: string;
    };
};
export declare const DialogTheme: {
    modalView: {
        backgroundColor: string;
    };
    titleText: {
        color: string;
    };
    description: {
        color: string;
    };
    closeButtonIcon: {
        color: string;
    };
    carouselButtonText: {
        color: string;
    };
};
export declare const Assets: {
    svg: {
        appLockout: import("react").FC<SvgProps>;
        biometrics: import("react").FC<SvgProps>;
        credentialDeclined: import("react").FC<SvgProps>;
        deleteNotification: import("react").FC<SvgProps>;
        emptyWallet: import("react").FC<SvgProps>;
        contactBook: import("react").FC<SvgProps>;
        logo: import("react").FC<SvgProps>;
        proofRequestDeclined: import("react").FC<SvgProps>;
        arrow: import("react").FC<SvgProps>;
        iconCredentialOfferDark: import("react").FC<SvgProps>;
        iconCredentialOfferLight: import("react").FC<SvgProps>;
        iconInfoRecievedDark: import("react").FC<SvgProps>;
        iconInfoRecievedLight: import("react").FC<SvgProps>;
        iconInfoSentDark: import("react").FC<SvgProps>;
        iconInfoSentLight: import("react").FC<SvgProps>;
        iconProofRequestDark: import("react").FC<SvgProps>;
        iconProofRequestLight: import("react").FC<SvgProps>;
        preface: import("react").FC<SvgProps>;
        verifierRequestDeclined: import("react").FC<SvgProps>;
        noInfoShared: import("react").FC<SvgProps>;
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
export interface ITheme {
    ColorPallet: IColorPallet;
    TextTheme: ITextTheme;
    Inputs: IInputs;
    Buttons: any;
    ListItems: any;
    TabTheme: any;
    NavigationTheme: any;
    HomeTheme: any;
    SettingsTheme: any;
    ChatTheme: any;
    OnboardingTheme: any;
    DialogTheme: any;
    LoadingTheme: any;
    PINEnterTheme: any;
    PINInputTheme: any;
    heavyOpacity: any;
    borderRadius: any;
    borderWidth: typeof borderWidth;
    Assets: IAssets;
}
export declare const theme: ITheme;
//# sourceMappingURL=theme.d.ts.map