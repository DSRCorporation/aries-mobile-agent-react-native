"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.borderWidth = exports.borderRadius = exports.bifoldTheme = exports.TextTheme = exports.TabTheme = exports.SettingsTheme = exports.SeparatedPINInputTheme = exports.PINInputTheme = exports.OnboardingTheme = exports.NavigationTheme = exports.LoadingTheme = exports.ListItems = exports.Inputs = exports.InputInlineMessage = exports.HomeTheme = exports.DialogTheme = exports.ColorPalette = exports.ChatTheme = exports.Buttons = exports.Assets = void 0;
exports.createButtonsTheme = createButtonsTheme;
exports.createChatTheme = createChatTheme;
exports.createDialogTheme = createDialogTheme;
exports.createHomeTheme = createHomeTheme;
exports.createInputInlineMessageTheme = createInputInlineMessageTheme;
exports.createInputsTheme = createInputsTheme;
exports.createListItemsTheme = createListItemsTheme;
exports.createLoadingTheme = createLoadingTheme;
exports.createNavigationTheme = createNavigationTheme;
exports.createOnboardingTheme = createOnboardingTheme;
exports.createPINInputTheme = createPINInputTheme;
exports.createSeparatedPINInputTheme = createSeparatedPINInputTheme;
exports.createSettingsTheme = createSettingsTheme;
exports.createTabTheme = createTabTheme;
exports.createTextTheme = createTextTheme;
exports.zeroOpacity = exports.themes = exports.mediumOpacity = exports.maxFontSizeMultiplier = exports.lightOpacity = exports.heavyOpacity = void 0;
var _reactNative = require("react-native");
var _largeArrow = _interopRequireDefault(require("./assets/icons/large-arrow.svg"));
var _trash = _interopRequireDefault(require("./assets/icons/trash.svg"));
var _pencil = _interopRequireDefault(require("./assets/icons/pencil.svg"));
var _code = _interopRequireDefault(require("./assets/icons/code.svg"));
var _activityIndicatorCircle = _interopRequireDefault(require("./assets/img/activity-indicator-circle.svg"));
var _appLockout = _interopRequireDefault(require("./assets/img/app-lockout.svg"));
var _biometrics = _interopRequireDefault(require("./assets/img/biometrics.svg"));
var _contactBook = _interopRequireDefault(require("./assets/img/contact-book.svg"));
var _credentialDeclined = _interopRequireDefault(require("./assets/img/credential-declined.svg"));
var _deleteNotification = _interopRequireDefault(require("./assets/img/delete-notification.svg"));
var _emptyWallet = _interopRequireDefault(require("./assets/img/empty-wallet.svg"));
var _iconCredentialOfferDark = _interopRequireDefault(require("./assets/img/icon-credential-offer-dark.svg"));
var _iconCredentialOfferLight = _interopRequireDefault(require("./assets/img/icon-credential-offer-light.svg"));
var _iconInfoRecievedDark = _interopRequireDefault(require("./assets/img/icon-info-recieved-dark.svg"));
var _iconInfoRecievedLight = _interopRequireDefault(require("./assets/img/icon-info-recieved-light.svg"));
var _iconInfoSentDark = _interopRequireDefault(require("./assets/img/icon-info-sent-dark.svg"));
var _iconInfoSentLight = _interopRequireDefault(require("./assets/img/icon-info-sent-light.svg"));
var _iconProofRequestDark = _interopRequireDefault(require("./assets/img/icon-proof-request-dark.svg"));
var _iconProofRequestLight = _interopRequireDefault(require("./assets/img/icon-proof-request-light.svg"));
var _logo = _interopRequireDefault(require("./assets/img/logo.svg"));
var _no_information_shared = _interopRequireDefault(require("./assets/img/no_information_shared.svg"));
var _preface = _interopRequireDefault(require("./assets/img/preface.svg"));
var _updateAvailable = _interopRequireDefault(require("./assets/img/update-available.svg"));
var _proofDeclined = _interopRequireDefault(require("./assets/img/proof-declined.svg"));
var _verifierRequestDeclined = _interopRequireDefault(require("./assets/img/verifier-request-declined.svg"));
var _wallet = _interopRequireDefault(require("./assets/img/wallet.svg"));
var _checkInCircle = _interopRequireDefault(require("./assets/img/check-in-circle.svg"));
var _credentialCard = _interopRequireDefault(require("./assets/img/credential-card.svg"));
var _walletBack = _interopRequireDefault(require("./assets/img/wallet-back.svg"));
var _walletFront = _interopRequireDefault(require("./assets/img/wallet-front.svg"));
var _credentialInHand = _interopRequireDefault(require("./assets/img/credential-in-hand.svg"));
var _credentialList = _interopRequireDefault(require("./assets/img/credential-list.svg"));
var _scanShare = _interopRequireDefault(require("./assets/img/scan-share.svg"));
var _secureCheck = _interopRequireDefault(require("./assets/img/secure-check.svg"));
var _secureImage = _interopRequireDefault(require("./assets/img/secure-image.svg"));
var _informationReceived = _interopRequireDefault(require("./assets/img/information-received.svg"));
var _pushNotifications = _interopRequireDefault(require("./assets/img/push-notifications.svg"));
var _chatLoading = _interopRequireDefault(require("./assets/img/chat-loading.svg"));
var _HistoryCardAcceptedIcon = _interopRequireDefault(require("./assets/img/HistoryCardAcceptedIcon.svg"));
var _HistoryCardExpiredIcon = _interopRequireDefault(require("./assets/img/HistoryCardExpiredIcon.svg"));
var _HistoryCardRevokedIcon = _interopRequireDefault(require("./assets/img/HistoryCardRevokedIcon.svg"));
var _HistoryInformationSentIcon = _interopRequireDefault(require("./assets/img/HistoryInformationSentIcon.svg"));
var _HistoryPinUpdatedIcon = _interopRequireDefault(require("./assets/img/HistoryPinUpdatedIcon.svg"));
var _IconChevronRight = _interopRequireDefault(require("./assets/img/IconChevronRight.svg"));
var _homeCenterImg = _interopRequireDefault(require("./assets/img/home-center-img.svg"));
var _exclamationMark = _interopRequireDefault(require("./assets/img/exclamation-mark.svg"));
var _errorFilled = _interopRequireDefault(require("./assets/img/error-filled.svg"));
var _messageTextIcon = _interopRequireDefault(require("./assets/img/message-text-icon.svg"));
var _messageTextIconOutline = _interopRequireDefault(require("./assets/img/message-text-icon-outline.svg"));
var _qrcodeScanIcon = _interopRequireDefault(require("./assets/img/qrcode-scan-icon.svg"));
var _walletIcon = _interopRequireDefault(require("./assets/img/wallet-icon.svg"));
var _walletIconOutline = _interopRequireDefault(require("./assets/img/wallet-icon-outline.svg"));
var _credentialRevoked = _interopRequireDefault(require("./assets/img/credential-revoked.svg"));
var _credentialNotAvailable = _interopRequireDefault(require("./assets/img/credential-not-available.svg"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const borderRadius = exports.borderRadius = 4;
const heavyOpacity = exports.heavyOpacity = 0.7;
const mediumOpacity = exports.mediumOpacity = 0.5;
const lightOpacity = exports.lightOpacity = 0.35;
const zeroOpacity = exports.zeroOpacity = 0.0;
const borderWidth = exports.borderWidth = 2;
const maxFontSizeMultiplier = exports.maxFontSizeMultiplier = 2;
const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40
};
const GrayscaleColors = {
  black: '#000000',
  darkGrey: '#313132',
  mediumGrey: '#606060',
  lightGrey: '#D3D3D3',
  veryLightGrey: '#F2F2F2',
  white: '#FFFFFF'
};
const InlineErrorMessageColors = {
  error: '#ff0000',
  warning: '#ff9000'
};
const BrandColors = {
  primary: '#42803E',
  primaryDisabled: `rgba(53, 130, 63, ${lightOpacity})`,
  secondary: '#FFFFFFFF',
  secondaryDisabled: `rgba(53, 130, 63, ${heavyOpacity})`,
  tertiary: '#FFFFFFFF',
  tertiaryDisabled: `rgba(53, 130, 63, ${heavyOpacity})`,
  primaryLight: `rgba(53, 130, 63, ${lightOpacity})`,
  highlight: '#FCBA19',
  primaryBackground: '#000000',
  secondaryBackground: '#313132',
  tertiaryBackground: '#313132',
  modalPrimary: '#42803E',
  modalSecondary: '#FFFFFFFF',
  modalTertiary: '#FFFFFFFF',
  modalPrimaryBackground: '#000000',
  modalSecondaryBackground: '#313132',
  modalTertiaryBackground: '#313132',
  modalIcon: GrayscaleColors.white,
  unorderedList: GrayscaleColors.white,
  unorderedListModal: GrayscaleColors.white,
  link: '#42803E',
  credentialLink: '#42803E',
  text: GrayscaleColors.white,
  icon: GrayscaleColors.white,
  headerIcon: GrayscaleColors.white,
  headerText: GrayscaleColors.white,
  buttonText: GrayscaleColors.white,
  tabBarInactive: GrayscaleColors.white,
  inlineError: InlineErrorMessageColors.error,
  inlineWarning: InlineErrorMessageColors.warning
};
const SemanticColors = {
  error: '#D8292F',
  success: '#2E8540',
  focus: '#3399FF'
};
const NotificationColors = {
  success: '#313132',
  successBorder: '#2E8540',
  successIcon: '#2E8540',
  successText: '#FFFFFF',
  info: '#313132',
  infoBorder: '#0099FF',
  infoIcon: '#0099FF',
  infoText: '#FFFFFF',
  warn: '#313132',
  warnBorder: '#FCBA19',
  warnIcon: '#FCBA19',
  warnText: '#FFFFFF',
  error: '#313132',
  errorBorder: '#D8292F',
  errorIcon: '#D8292F',
  errorText: '#FFFFFF',
  popupOverlay: `rgba(0, 0, 0, ${mediumOpacity})`
};
const ColorPalette = exports.ColorPalette = {
  brand: BrandColors,
  semantic: SemanticColors,
  notification: NotificationColors,
  grayscale: GrayscaleColors
};

/**
 * Creates a text theme based on the provided color pallet.
 *
 * @param {{ ColorPalette: IColorPalette }} theme - The theme object containing the color pallet
 * @returns {*} {ITextTheme} - The created text theme
 */
function createTextTheme(theme) {
  return _reactNative.StyleSheet.create({
    headingOne: {
      fontSize: 38,
      fontWeight: 'bold',
      color: theme.ColorPalette.brand.text
    },
    headingTwo: {
      fontSize: 32,
      fontWeight: 'bold',
      color: theme.ColorPalette.brand.text
    },
    headingThree: {
      fontSize: 26,
      fontWeight: 'bold',
      color: theme.ColorPalette.brand.text
    },
    headingFour: {
      fontSize: 21,
      fontWeight: 'bold',
      color: theme.ColorPalette.brand.text
    },
    normal: {
      fontSize: 18,
      fontWeight: 'normal',
      color: theme.ColorPalette.brand.text
    },
    bold: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.ColorPalette.brand.text
    },
    label: {
      fontSize: 14,
      fontWeight: 'bold',
      color: theme.ColorPalette.brand.text
    },
    labelTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.ColorPalette.brand.text
    },
    labelSubtitle: {
      fontSize: 14,
      fontWeight: 'normal',
      color: theme.ColorPalette.brand.text
    },
    labelText: {
      fontSize: 10,
      fontWeight: 'normal',
      fontStyle: 'italic',
      color: theme.ColorPalette.brand.text
    },
    caption: {
      fontSize: 14,
      fontWeight: 'normal',
      color: theme.ColorPalette.brand.text
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.ColorPalette.brand.text
    },
    headerTitle: {
      fontSize: 28,
      fontWeight: 'bold',
      color: theme.ColorPalette.brand.headerText
    },
    modalNormal: {
      fontSize: 18,
      fontWeight: 'normal',
      color: theme.ColorPalette.grayscale.white
    },
    modalTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.ColorPalette.grayscale.white
    },
    modalHeadingOne: {
      fontSize: 38,
      color: theme.ColorPalette.grayscale.white,
      fontWeight: 'bold'
    },
    modalHeadingThree: {
      fontSize: 26,
      color: theme.ColorPalette.grayscale.white,
      fontWeight: 'bold'
    },
    popupModalText: {
      fontSize: 18,
      fontWeight: 'normal',
      color: theme.ColorPalette.grayscale.white
    },
    settingsText: {
      fontSize: 21,
      fontWeight: 'normal',
      color: theme.ColorPalette.brand.text
    },
    inlineErrorText: {
      fontSize: 16,
      fontWeight: 'normal',
      color: theme.ColorPalette.brand.inlineError
    },
    inlineWarningText: {
      fontSize: 16,
      fontWeight: 'normal',
      color: theme.ColorPalette.brand.inlineWarning
    }
  });
}
const TextTheme = exports.TextTheme = createTextTheme({
  ColorPalette
});

/**
 * Creates a theme for inputs based on the provided color pallet and text theme.
 *
 * @param {{ ColorPalette: IColorPalette; TextTheme: ITextTheme; borderRadius: number }} theme - The theme object containing the color pallet, text theme, and border radius
 * @returns {*} {IInputs} - The created inputs theme
 */
function createInputsTheme(theme) {
  return _reactNative.StyleSheet.create({
    label: {
      ...theme.TextTheme.label
    },
    textInput: {
      padding: 10,
      borderRadius,
      fontSize: 16,
      backgroundColor: theme.ColorPalette.brand.primaryBackground,
      color: theme.ColorPalette.notification.infoText,
      borderWidth: 2,
      borderColor: theme.ColorPalette.brand.secondary
    },
    singleSelectText: {
      ...theme.TextTheme.normal
    },
    singleSelectIcon: {
      color: theme.ColorPalette.grayscale.white
    },
    checkBoxColor: {
      color: theme.ColorPalette.brand.primary
    },
    checkBoxText: {
      ...theme.TextTheme.normal
    },
    inputSelected: {
      borderColor: theme.ColorPalette.brand.primary
    },
    singleSelect: {
      padding: 12,
      borderRadius: theme.borderRadius * 2,
      backgroundColor: theme.ColorPalette.brand.secondaryBackground
    }
  });
}
const Inputs = exports.Inputs = createInputsTheme({
  ColorPalette,
  TextTheme,
  borderRadius
});

/**
 * Creates a theme for buttons based on the provided color pallet and text theme.
 *
 * @param {{ ColorPalette: IColorPalette; TextTheme: ITextTheme }} theme - The theme object containing the color pallet and text theme
 * @returns {*} {IButtons} - The created buttons theme
 */
function createButtonsTheme(theme) {
  const textStyles = _reactNative.StyleSheet.create({
    criticalText: {
      ...theme.TextTheme.bold,
      color: theme.ColorPalette.brand.buttonText,
      textAlign: 'center'
    },
    criticalTextDisabled: {
      ...theme.TextTheme.bold,
      color: theme.ColorPalette.brand.buttonText,
      textAlign: 'center'
    },
    primaryText: {
      ...theme.TextTheme.bold,
      color: theme.ColorPalette.brand.buttonText,
      textAlign: 'center'
    },
    primaryTextDisabled: {
      ...theme.TextTheme.bold,
      textAlign: 'center'
    },
    secondaryText: {
      ...theme.TextTheme.bold,
      color: theme.ColorPalette.brand.primary,
      textAlign: 'center'
    },
    secondaryTextDisabled: {
      ...theme.TextTheme.bold,
      color: theme.ColorPalette.brand.secondaryDisabled,
      textAlign: 'center'
    },
    tertiaryText: {
      ...theme.TextTheme.bold,
      color: theme.ColorPalette.brand.primary,
      textAlign: 'center'
    },
    tertiaryTextDisabled: {
      ...theme.TextTheme.bold,
      color: theme.ColorPalette.brand.tertiaryDisabled,
      textAlign: 'center'
    },
    modalCriticalText: {
      ...theme.TextTheme.bold,
      color: theme.ColorPalette.brand.buttonText,
      textAlign: 'center'
    },
    modalCriticalTextDisabled: {
      ...theme.TextTheme.bold,
      color: theme.ColorPalette.brand.buttonText,
      textAlign: 'center'
    },
    modalPrimaryText: {
      ...theme.TextTheme.bold,
      color: theme.ColorPalette.brand.buttonText,
      textAlign: 'center'
    },
    modalPrimaryTextDisabled: {
      ...theme.TextTheme.bold,
      color: theme.ColorPalette.brand.buttonText,
      textAlign: 'center'
    },
    modalSecondaryText: {
      ...theme.TextTheme.bold,
      color: theme.ColorPalette.brand.modalPrimary,
      textAlign: 'center'
    },
    modalSecondaryTextDisabled: {
      ...theme.TextTheme.bold,
      color: theme.ColorPalette.brand.secondaryDisabled,
      textAlign: 'center'
    },
    modalTertiaryText: {
      ...theme.TextTheme.bold,
      color: theme.ColorPalette.brand.modalPrimary,
      textAlign: 'center'
    },
    modalTertiaryTextDisabled: {
      ...theme.TextTheme.bold,
      color: theme.ColorPalette.brand.tertiaryDisabled,
      textAlign: 'center'
    },
    secondaryCriticalText: {
      ...TextTheme.bold,
      color: theme.ColorPalette.semantic.error
    }
  });
  const viewStyles = _reactNative.StyleSheet.create({
    critical: {
      padding: 16,
      borderRadius: 4,
      backgroundColor: theme.ColorPalette.semantic.error
    },
    criticalDisabled: {
      padding: 16,
      borderRadius: 4,
      backgroundColor: `rgba(216, 41, 47, ${lightOpacity})`
    },
    primary: {
      padding: 16,
      borderRadius: 4,
      backgroundColor: theme.ColorPalette.brand.primary
    },
    primaryDisabled: {
      padding: 16,
      borderRadius: 4,
      backgroundColor: theme.ColorPalette.brand.primaryDisabled
    },
    secondary: {
      padding: 16,
      borderRadius: 4,
      borderWidth: 2,
      borderColor: theme.ColorPalette.brand.primary
    },
    secondaryDisabled: {
      padding: 16,
      borderRadius: 4,
      borderWidth: 2,
      borderColor: theme.ColorPalette.brand.secondaryDisabled
    },
    tertiary: {
      padding: 16
    },
    tertiaryDisabled: {
      padding: 16
    },
    modalCritical: {
      padding: 16,
      borderRadius: 4,
      backgroundColor: theme.ColorPalette.brand.primary
    },
    modalCriticalDisabled: {
      padding: 16,
      borderRadius: 4,
      backgroundColor: theme.ColorPalette.brand.primaryDisabled
    },
    modalPrimary: {
      padding: 16,
      borderRadius: 4,
      backgroundColor: theme.ColorPalette.brand.modalPrimary
    },
    modalPrimaryDisabled: {
      padding: 16,
      borderRadius: 4,
      backgroundColor: theme.ColorPalette.brand.primaryDisabled
    },
    modalSecondary: {
      padding: 16,
      borderRadius: 4,
      borderWidth: 2,
      borderColor: theme.ColorPalette.brand.modalPrimary
    },
    modalSecondaryDisabled: {
      padding: 16,
      borderRadius: 4,
      borderWidth: 2,
      borderColor: theme.ColorPalette.brand.secondaryDisabled
    },
    modalTertiary: {
      padding: 16
    },
    modalTertiaryDisabled: {
      padding: 16
    },
    secondaryCritical: {
      padding: 16,
      borderRadius: 4,
      borderWidth: 2,
      backgroundColor: 'transparent',
      borderColor: theme.ColorPalette.semantic.error
    }
  });
  return {
    ...textStyles,
    ...viewStyles
  };
}
const Buttons = exports.Buttons = createButtonsTheme({
  ColorPalette,
  TextTheme
});

/**
 * Creates a theme for list items based on the provided color pallet and text theme.
 *
 * @param {{ ColorPalette: IColorPalette; TextTheme: ITextTheme }} theme - The theme object containing the color pallet and text theme
 * @returns {*} {IListItems} - The created list items theme
 */
function createListItemsTheme(theme) {
  const testStyles = _reactNative.StyleSheet.create({
    credentialTitle: {
      ...theme.TextTheme.headingFour
    },
    credentialDetails: {
      ...theme.TextTheme.caption
    },
    credentialOfferTitle: {
      ...theme.TextTheme.modalHeadingThree,
      fontWeight: 'normal'
    },
    credentialOfferDetails: {
      ...theme.TextTheme.normal
    },
    credentialIconColor: {
      color: theme.ColorPalette.notification.infoText
    },
    contactTitle: {
      color: theme.ColorPalette.brand.text
    },
    contactDate: {
      color: theme.ColorPalette.brand.text,
      marginTop: 10
    },
    contactIcon: {
      color: theme.ColorPalette.grayscale.white
    },
    recordAttributeLabel: {
      ...theme.TextTheme.bold
    },
    recordLink: {
      color: theme.ColorPalette.brand.link
    },
    recordAttributeText: {
      ...theme.TextTheme.normal
    },
    proofIcon: {
      ...theme.TextTheme.headingOne
    },
    proofError: {
      color: theme.ColorPalette.semantic.error
    },
    avatarText: {
      ...theme.TextTheme.headingTwo,
      fontWeight: 'normal'
    },
    avatarCircle: {
      borderRadius: theme.TextTheme.headingTwo.fontSize,
      borderColor: theme.TextTheme.headingTwo.color,
      width: (theme.TextTheme.headingTwo.fontSize ?? 32) * 2,
      height: (theme.TextTheme.headingTwo.fontSize ?? 32) * 2
    },
    requestTemplateIconColor: {
      color: theme.ColorPalette.notification.infoText
    },
    requestTemplateTitle: {
      color: theme.ColorPalette.grayscale.black,
      fontWeight: 'bold',
      fontSize: 16
    },
    requestTemplateDetails: {
      color: theme.ColorPalette.grayscale.black,
      fontWeight: 'normal',
      fontSize: 16
    },
    requestTemplateZkpLabel: {
      color: theme.ColorPalette.grayscale.mediumGrey,
      fontSize: 12
    },
    requestTemplateIcon: {
      color: theme.ColorPalette.grayscale.black,
      fontSize: 36
    },
    requestTemplateDate: {
      color: theme.ColorPalette.grayscale.mediumGrey,
      fontSize: 10
    }
  });
  const viewStyles = _reactNative.StyleSheet.create({
    credentialBackground: {
      backgroundColor: theme.ColorPalette.brand.secondaryBackground
    },
    credentialOfferBackground: {
      backgroundColor: theme.ColorPalette.brand.modalPrimaryBackground
    },
    revoked: {
      backgroundColor: theme.ColorPalette.notification.error,
      borderColor: theme.ColorPalette.notification.errorBorder
    },
    contactBackground: {
      backgroundColor: theme.ColorPalette.brand.secondaryBackground
    },
    contactIconBackground: {
      backgroundColor: theme.ColorPalette.brand.primary
    },
    recordContainer: {
      backgroundColor: theme.ColorPalette.brand.secondaryBackground
    },
    recordBorder: {
      borderBottomColor: theme.ColorPalette.brand.primaryBackground
    },
    emptyList: {
      ...theme.TextTheme.normal
    },
    requestTemplateBackground: {
      backgroundColor: theme.ColorPalette.grayscale.white
    }
  });
  return {
    ...testStyles,
    ...viewStyles
  };
}
const ListItems = exports.ListItems = createListItemsTheme({
  ColorPalette,
  TextTheme
});

/**
 * Creates a theme for tabs based on the provided color pallet and text theme.
 *
 * @param {{ ColorPalette: IColorPalette; TextTheme: ITextTheme }} theme - The theme object containing the color pallet and text theme
 * @returns {*} {ITabTheme} - The created tab theme
 */
function createTabTheme(theme) {
  const textStyles = _reactNative.StyleSheet.create({
    tabBarTextStyle: {
      ...theme.TextTheme.labelSubtitle,
      paddingBottom: 5
    },
    tabBarButtonIconStyle: {
      color: theme.ColorPalette.brand.headerIcon
    }
  });
  const viewStyles = _reactNative.StyleSheet.create({
    tabBarStyle: {
      height: 60,
      backgroundColor: theme.ColorPalette.brand.secondaryBackground,
      shadowOffset: {
        width: 0,
        height: -3
      },
      shadowRadius: 6,
      shadowColor: theme.ColorPalette.grayscale.black,
      shadowOpacity: 0.1,
      borderTopWidth: 0,
      paddingBottom: 0
    },
    tabBarContainerStyle: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    focusTabIconStyle: {
      height: 60,
      width: 60,
      backgroundColor: theme.ColorPalette.brand.primary,
      borderRadius: 60,
      justifyContent: 'center',
      alignItems: 'center'
    },
    focusTabActiveTintColor: {
      backgroundColor: theme.ColorPalette.brand.secondary
    }
  });
  return {
    ...textStyles,
    ...viewStyles,
    tabBarActiveTintColor: theme.ColorPalette.brand.primary,
    tabBarInactiveTintColor: theme.ColorPalette.brand.tabBarInactive,
    tabBarSecondaryBackgroundColor: theme.ColorPalette.brand.secondaryBackground
  };
}
const TabTheme = exports.TabTheme = createTabTheme({
  ColorPalette,
  TextTheme
});

/**
 * Creates a navigation theme based on the provided color pallet.
 *
 * @param {{ ColorPalette: IColorPalette }} theme - The theme object containing the color pallet
 * @returns {*} {INavigationTheme} - The created navigation theme
 */
function createNavigationTheme(theme) {
  return {
    dark: true,
    colors: {
      primary: theme.ColorPalette.brand.primary,
      background: theme.ColorPalette.brand.primaryBackground,
      card: theme.ColorPalette.brand.primary,
      text: theme.ColorPalette.grayscale.white,
      border: theme.ColorPalette.grayscale.white,
      notification: theme.ColorPalette.grayscale.white
    },
    header: {
      shadowOffset: {
        width: 0,
        height: 6
      },
      shadowRadius: 6,
      shadowColor: ColorPalette.grayscale.black,
      shadowOpacity: 0.15,
      elevation: 0
    }
  };
}
const NavigationTheme = exports.NavigationTheme = createNavigationTheme({
  ColorPalette
});

/**
 * Creates a home theme based on the provided color pallet and text theme.
 *
 * @param {{ ColorPalette: IColorPalette; TextTheme: ITextTheme }} theme - The theme object containing the color pallet and text theme
 * @returns {*} {IHomeTheme} - The created home theme
 */
function createHomeTheme(theme) {
  return _reactNative.StyleSheet.create({
    welcomeHeader: {
      ...theme.TextTheme.headingOne
    },
    credentialMsg: {
      ...theme.TextTheme.normal
    },
    notificationsHeader: {
      ...theme.TextTheme.headingThree
    },
    noNewUpdatesText: {
      ...theme.TextTheme.normal,
      color: theme.ColorPalette.notification.infoText
    },
    link: {
      ...theme.TextTheme.normal,
      color: theme.ColorPalette.brand.link
    }
  });
}
const HomeTheme = exports.HomeTheme = createHomeTheme({
  ColorPalette,
  TextTheme
});

/**
 * Creates a settings theme based on the provided color pallet and text theme.
 *
 * @param {{ ColorPalette: IColorPalette; TextTheme: ITextTheme }} theme - The theme object containing the color pallet and text theme
 * @returns {*} {ISettingsTheme} - The created settings theme
 */
function createSettingsTheme(theme) {
  const settingsTheme = _reactNative.StyleSheet.create({
    groupHeader: {
      ...theme.TextTheme.normal,
      marginBottom: 8
    },
    text: {
      ...theme.TextTheme.caption,
      color: theme.ColorPalette.grayscale.white
    }
  });
  return {
    ...settingsTheme,
    groupBackground: theme.ColorPalette.brand.secondaryBackground,
    iconColor: theme.ColorPalette.brand.text
  };
}
const SettingsTheme = exports.SettingsTheme = createSettingsTheme({
  ColorPalette,
  TextTheme
});

/**
 * Creates a chat theme based on the provided color pallet and text theme.
 *
 * @param {{ ColorPalette: IColorPalette; TextTheme: ITextTheme }} theme - The theme object containing the color pallet and text theme
 * @returns {*} {IChatTheme} - The created chat theme
 */
function createChatTheme(theme) {
  const textStyles = _reactNative.StyleSheet.create({
    timeStyleLeft: {
      color: theme.ColorPalette.grayscale.lightGrey,
      fontSize: 12,
      marginTop: 8
    },
    timeStyleRight: {
      color: theme.ColorPalette.grayscale.lightGrey,
      fontSize: 12,
      marginTop: 8
    },
    leftText: {
      color: theme.ColorPalette.brand.secondary,
      fontSize: theme.TextTheme.normal.fontSize
    },
    leftTextHighlighted: {
      ...theme.TextTheme.bold,
      color: theme.ColorPalette.brand.secondary
    },
    rightText: {
      color: theme.ColorPalette.brand.secondary,
      fontSize: theme.TextTheme.normal.fontSize
    },
    rightTextHighlighted: {
      ...theme.TextTheme.bold,
      color: theme.ColorPalette.brand.secondary
    },
    inputText: {
      lineHeight: undefined,
      fontWeight: '500',
      fontSize: theme.TextTheme.normal.fontSize
    },
    openButtonTextStyle: {
      fontSize: theme.TextTheme.normal.fontSize,
      fontWeight: 'bold',
      textAlign: 'center'
    },
    documentIcon: {
      color: theme.ColorPalette.grayscale.white
    }
  });
  const viewStyles = _reactNative.StyleSheet.create({
    containerStyle: {
      marginBottom: 16,
      marginLeft: 16,
      marginRight: 16,
      flexDirection: 'column',
      alignItems: 'flex-start',
      alignSelf: 'flex-end'
    },
    leftBubble: {
      backgroundColor: theme.ColorPalette.brand.secondaryBackground,
      borderRadius: 4,
      padding: 16,
      marginLeft: 16
    },
    rightBubble: {
      backgroundColor: theme.ColorPalette.brand.primaryLight,
      borderRadius: 4,
      padding: 16,
      marginRight: 16
    },
    sendContainer: {
      marginBottom: 4,
      paddingHorizontal: 4,
      justifyContent: 'center'
    },
    openButtonStyle: {
      borderRadius: 32,
      backgroundColor: theme.ColorPalette.brand.primary,
      paddingTop: 8,
      paddingBottom: 8,
      paddingLeft: 16,
      paddingRight: 16,
      marginTop: 16
    },
    documentIconContainer: {
      backgroundColor: theme.ColorPalette.brand.primary,
      alignSelf: 'flex-start',
      borderRadius: 4,
      marginBottom: 16,
      justifyContent: 'center',
      alignItems: 'center',
      width: 50,
      height: 50
    },
    inputToolbar: {
      backgroundColor: theme.ColorPalette.brand.secondary,
      shadowColor: theme.ColorPalette.brand.primaryDisabled,
      borderRadius: 10
    }
  });
  return {
    ...textStyles,
    ...viewStyles,
    placeholderText: theme.ColorPalette.grayscale.lightGrey,
    sendEnabled: theme.ColorPalette.brand.primary,
    sendDisabled: theme.ColorPalette.brand.primaryDisabled,
    options: theme.ColorPalette.brand.primary,
    optionsText: theme.ColorPalette.grayscale.black
  };
}
const ChatTheme = exports.ChatTheme = createChatTheme({
  ColorPalette,
  TextTheme
});

/**
 * Creates an onboarding theme based on the provided color pallet and text theme.
 *
 * @param {{ ColorPalette: IColorPalette; TextTheme: ITextTheme }} theme - The theme object containing the color pallet and text theme
 * @returns {*} {IOnboardingTheme} - The created onboarding theme
 */
function createOnboardingTheme(theme) {
  const textStyles = _reactNative.StyleSheet.create({
    pagerDot: {
      borderColor: theme.ColorPalette.brand.primary
    },
    pagerDotActive: {
      color: theme.ColorPalette.brand.primary
    },
    pagerDotInactive: {
      color: theme.ColorPalette.brand.secondary
    },
    pagerNavigationButton: {
      color: theme.ColorPalette.brand.primary,
      fontWeight: 'bold',
      fontSize: 18
    },
    headerText: {
      ...theme.TextTheme.bold
    },
    bodyText: {
      ...theme.TextTheme.normal
    }
  });
  const viewStyles = _reactNative.StyleSheet.create({
    container: {
      backgroundColor: theme.ColorPalette.brand.primaryBackground
    },
    carouselContainer: {
      backgroundColor: theme.ColorPalette.brand.primaryBackground
    }
  });
  return {
    ...textStyles,
    ...viewStyles,
    headerTintColor: ColorPalette.grayscale.white,
    imageDisplayOptions: {
      fill: ColorPalette.notification.infoText
    }
  };
}
const OnboardingTheme = exports.OnboardingTheme = createOnboardingTheme({
  ColorPalette,
  TextTheme
});

/**
 * Creates a dialog theme based on the provided color pallet.
 *
 * @param {{ ColorPalette: IColorPalette }} theme - The theme object containing the color pallet
 * @returns {*} {IDialogTheme} - The created dialog theme
 */
function createDialogTheme(theme) {
  return _reactNative.StyleSheet.create({
    modalView: {
      backgroundColor: theme.ColorPalette.brand.secondaryBackground
    },
    titleText: {
      color: theme.ColorPalette.grayscale.white
    },
    description: {
      color: theme.ColorPalette.grayscale.white
    },
    closeButtonIcon: {
      color: theme.ColorPalette.grayscale.white
    },
    carouselButtonText: {
      color: theme.ColorPalette.grayscale.white
    }
  });
}
const DialogTheme = exports.DialogTheme = createDialogTheme({
  ColorPalette
});
function createLoadingTheme(theme) {
  return {
    backgroundColor: theme.ColorPalette.brand.modalPrimaryBackground
  };
}
const LoadingTheme = exports.LoadingTheme = createLoadingTheme({
  ColorPalette
});

// NOTE: If ColorPalette or TextTheme is needed in this theme,
// we can convert this to a function like the others.
const PINEnterTheme = {
  image: {
    alignSelf: 'center',
    marginBottom: 20
  }
};
/**
 * Creates a theme for PIN input based on the provided color pallet.
 *
 * @param {{ ColorPalette: IColorPalette }} theme - The theme object containing the color pallet
 * @returns {*} {IPINInputTheme} - The created PIN input theme
 */
function createPINInputTheme(theme) {
  const textStyles = _reactNative.StyleSheet.create({
    cellText: {
      color: theme.ColorPalette.brand.text
    },
    icon: {
      color: theme.ColorPalette.brand.headerIcon
    }
  });
  const viewStyles = _reactNative.StyleSheet.create({
    cell: {
      height: 48,
      paddingHorizontal: 2,
      backgroundColor: theme.ColorPalette.brand.secondaryBackground,
      borderColor: theme.ColorPalette.brand.secondaryBackground,
      borderWidth: 1
    },
    focussedCell: {
      borderColor: theme.ColorPalette.brand.headerIcon
    },
    codeFieldRoot: {
      justifyContent: 'flex-start',
      alignItems: 'center'
    },
    labelAndFieldContainer: {
      flexDirection: 'row',
      borderRadius: 5,
      paddingHorizontal: 12,
      paddingVertical: 4,
      alignItems: 'center',
      backgroundColor: theme.ColorPalette.brand.secondaryBackground,
      borderColor: theme.ColorPalette.brand.secondary,
      borderWidth: 1
    }
  });
  return {
    ...textStyles,
    ...viewStyles
  };
}
const PINInputTheme = exports.PINInputTheme = createPINInputTheme({
  ColorPalette
});

/**
 * Creates a theme for a separated PIN input based on the provided color pallet.
 *
 * @param {{ ColorPalette: IColorPalette }} theme - The theme object containing the color pallet
 * @returns {*} {ISeparatedPINInputTheme} - The created  PIN input theme
 */
function createSeparatedPINInputTheme(theme) {
  const textStyles = _reactNative.StyleSheet.create({
    cellText: {
      color: theme.ColorPalette.brand.text
    },
    icon: {
      color: theme.ColorPalette.brand.headerIcon
    }
  });
  const viewStyles = _reactNative.StyleSheet.create({
    cell: {
      height: 48,
      paddingHorizontal: 4,
      backgroundColor: theme.ColorPalette.brand.secondaryBackground,
      borderColor: theme.ColorPalette.brand.secondary,
      borderWidth: 1,
      margin: 6,
      borderRadius: 4,
      flex: 1,
      flexShrink: 0
    },
    focussedCell: {
      borderColor: theme.ColorPalette.brand.headerIcon
    },
    codeFieldRoot: {
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    labelAndFieldContainer: {
      flexDirection: 'row',
      paddingHorizontal: 0,
      paddingVertical: 4,
      alignItems: 'center'
    }
  });
  return {
    ...textStyles,
    ...viewStyles
  };
}
const SeparatedPINInputTheme = exports.SeparatedPINInputTheme = createSeparatedPINInputTheme({
  ColorPalette
});
const CredentialCardShadowTheme = {
  shadowColor: '#000',
  shadowOffset: {
    width: 1,
    height: 1
  },
  shadowOpacity: 0.3
};
const SelectedCredTheme = {
  borderWidth: 5,
  borderRadius: 15,
  borderColor: ColorPalette.semantic.focus
};
const Assets = exports.Assets = {
  svg: {
    activityIndicator: _activityIndicatorCircle.default,
    appLockout: _appLockout.default,
    biometrics: _biometrics.default,
    credentialDeclined: _credentialDeclined.default,
    deleteNotification: _deleteNotification.default,
    emptyWallet: _emptyWallet.default,
    contactBook: _contactBook.default,
    logo: _logo.default,
    proofRequestDeclined: _proofDeclined.default,
    arrow: _largeArrow.default,
    iconCredentialOfferDark: _iconCredentialOfferDark.default,
    iconCredentialOfferLight: _iconCredentialOfferLight.default,
    iconInfoRecievedDark: _iconInfoRecievedDark.default,
    iconInfoRecievedLight: _iconInfoRecievedLight.default,
    iconInfoSentDark: _iconInfoSentDark.default,
    iconInfoSentLight: _iconInfoSentLight.default,
    iconProofRequestDark: _iconProofRequestDark.default,
    iconProofRequestLight: _iconProofRequestLight.default,
    preface: _preface.default,
    updateAvailable: _updateAvailable.default,
    verifierRequestDeclined: _verifierRequestDeclined.default,
    noInfoShared: _no_information_shared.default,
    wallet: _wallet.default,
    checkInCircle: _checkInCircle.default,
    credentialCard: _credentialCard.default,
    walletBack: _walletBack.default,
    walletFront: _walletFront.default,
    credentialInHand: _credentialInHand.default,
    credentialList: _credentialList.default,
    scanShare: _scanShare.default,
    secureCheck: _secureCheck.default,
    secureImage: _secureImage.default,
    informationReceived: _informationReceived.default,
    pushNotificationImg: _pushNotifications.default,
    chatLoading: _chatLoading.default,
    historyCardAcceptedIcon: _HistoryCardAcceptedIcon.default,
    historyCardDeclinedIcon: _HistoryCardRevokedIcon.default,
    historyCardExpiredIcon: _HistoryCardExpiredIcon.default,
    historyCardRemovedIcon: _HistoryCardRevokedIcon.default,
    historyCardRevokedIcon: _HistoryCardRevokedIcon.default,
    historyCardUpdatesIcon: _HistoryCardAcceptedIcon.default,
    historyPinUpdatedIcon: _HistoryPinUpdatedIcon.default,
    historyInformationSentIcon: _HistoryInformationSentIcon.default,
    historyInformationNotSentIcon: _HistoryCardRevokedIcon.default,
    historyConnectionIcon: _HistoryCardAcceptedIcon.default,
    historyConnectionRemovedIcon: _HistoryCardRevokedIcon.default,
    historyActivateBiometryIcon: _HistoryCardAcceptedIcon.default,
    historyDeactivateBiometryIcon: _HistoryCardRevokedIcon.default,
    iconChevronRight: _IconChevronRight.default,
    homeCenterImg: _homeCenterImg.default,
    iconDelete: _trash.default,
    iconEdit: _pencil.default,
    iconCode: _code.default,
    iconError: _errorFilled.default,
    iconWarning: _exclamationMark.default,
    tabOneIcon: _messageTextIconOutline.default,
    tabOneFocusedIcon: _messageTextIcon.default,
    tabTwoIcon: _qrcodeScanIcon.default,
    tabThreeIcon: _walletIconOutline.default,
    tabThreeFocusedIcon: _walletIcon.default,
    credentialRevoked: _credentialRevoked.default,
    credentialNotAvailable: _credentialNotAvailable.default
  },
  img: {
    logoPrimary: {
      src: require('./assets/img/logo-large.png'),
      aspectRatio: 1,
      height: '33%',
      width: '33%',
      resizeMode: 'contain'
    },
    logoSecondary: {
      src: require('./assets/img/logo-large.png'),
      aspectRatio: 1,
      height: 120,
      width: 120,
      resizeMode: 'contain'
    }
  }
};

/**
 * Creates a theme for inline messages in inputs based on the provided text theme and assets.
 *
 * @param {{ TextTheme: ITextTheme; Assets: IAssets }} theme - The theme object containing the text theme and assets
 * @return {*} {IInlineInputMessage} - The created inline input message theme
 */
function createInputInlineMessageTheme(theme) {
  return {
    inlineErrorText: {
      ...theme.TextTheme.inlineErrorText
    },
    InlineErrorIcon: theme.Assets.svg.iconError,
    inlineWarningText: {
      ...theme.TextTheme.inlineWarningText
    },
    InlineWarningIcon: theme.Assets.svg.iconWarning
  };
}
const InputInlineMessage = exports.InputInlineMessage = createInputInlineMessageTheme({
  TextTheme,
  Assets
});
const bifoldTheme = exports.bifoldTheme = {
  themeName: 'bifold',
  Spacing,
  ColorPalette,
  TextTheme,
  InputInlineMessage,
  Inputs,
  Buttons,
  ListItems,
  TabTheme,
  NavigationTheme,
  HomeTheme,
  SettingsTheme,
  ChatTheme,
  OnboardingTheme,
  DialogTheme,
  LoadingTheme,
  PINEnterTheme,
  PINInputTheme,
  SeparatedPINInputTheme,
  CredentialCardShadowTheme,
  SelectedCredTheme,
  heavyOpacity,
  borderRadius,
  borderWidth,
  maxFontSizeMultiplier,
  Assets
};
const themes = exports.themes = [bifoldTheme];

// Backwards compatible exports
//# sourceMappingURL=theme.js.map