"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zeroOpacity = exports.theme = exports.mediumOpacity = exports.lightOpacity = exports.heavyOpacity = exports.borderWidth = exports.borderRadius = exports.TextTheme = exports.TabTheme = exports.SettingsTheme = exports.OnboardingTheme = exports.NavigationTheme = exports.ListItems = exports.Inputs = exports.HomeTheme = exports.DialogTheme = exports.ColorPallet = exports.ChatTheme = exports.Buttons = exports.Assets = void 0;
var _reactNative = require("react-native");
var _largeArrow = _interopRequireDefault(require("./assets/icons/large-arrow.svg"));
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
var _proofDeclined = _interopRequireDefault(require("./assets/img/proof-declined.svg"));
var _verifierRequestDeclined = _interopRequireDefault(require("./assets/img/verifier-request-declined.svg"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const borderRadius = exports.borderRadius = 4;
const heavyOpacity = exports.heavyOpacity = 0.7;
const mediumOpacity = exports.mediumOpacity = 0.5;
const lightOpacity = exports.lightOpacity = 0.35;
const zeroOpacity = exports.zeroOpacity = 0.0;
const borderWidth = exports.borderWidth = 2;
const GrayscaleColors = {
  black: '#000000',
  darkGrey: '#313132',
  mediumGrey: '#606060',
  lightGrey: '#D3D3D3',
  veryLightGrey: '#F2F2F2',
  white: '#FFFFFF'
};
const BrandColors = {
  primary: '#42803E',
  primaryDisabled: `rgba(53, 130, 63, ${lightOpacity})`,
  secondary: '#FFFFFFFF',
  secondaryDisabled: `rgba(53, 130, 63, ${heavyOpacity})`,
  primaryLight: `rgba(53, 130, 63, ${lightOpacity})`,
  highlight: '#FCBA19',
  primaryBackground: '#000000',
  secondaryBackground: '#313132',
  modalPrimary: '#42803E',
  modalSecondary: '#FFFFFFFF',
  modalPrimaryBackground: '#000000',
  modalSecondaryBackground: '#313132',
  modalIcon: GrayscaleColors.white,
  unorderedList: GrayscaleColors.white,
  unorderedListModal: GrayscaleColors.white,
  link: GrayscaleColors.white,
  text: GrayscaleColors.white,
  icon: GrayscaleColors.white,
  headerIcon: GrayscaleColors.white,
  headerText: GrayscaleColors.white,
  buttonText: GrayscaleColors.white,
  tabBarInactive: GrayscaleColors.white
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
const ColorPallet = exports.ColorPallet = {
  brand: BrandColors,
  semantic: SemanticColors,
  notification: NotificationColors,
  grayscale: GrayscaleColors
};
const TextTheme = exports.TextTheme = {
  headingOne: {
    fontSize: 38,
    fontWeight: 'bold',
    color: ColorPallet.brand.text
  },
  headingTwo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: ColorPallet.brand.text
  },
  headingThree: {
    fontSize: 26,
    fontWeight: 'bold',
    color: ColorPallet.brand.text
  },
  headingFour: {
    fontSize: 21,
    fontWeight: 'bold',
    color: ColorPallet.brand.text
  },
  normal: {
    fontSize: 18,
    fontWeight: 'normal',
    color: ColorPallet.brand.text
  },
  bold: {
    fontSize: 18,
    fontWeight: 'bold',
    color: ColorPallet.brand.text
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: ColorPallet.brand.text
  },
  labelTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: ColorPallet.brand.text
  },
  labelSubtitle: {
    fontSize: 14,
    fontWeight: 'normal',
    color: ColorPallet.brand.text
  },
  labelText: {
    fontSize: 10,
    fontWeight: 'normal',
    fontStyle: 'italic',
    color: ColorPallet.brand.text
  },
  caption: {
    fontSize: 14,
    fontWeight: 'normal',
    color: ColorPallet.brand.text
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: ColorPallet.brand.text
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: ColorPallet.brand.headerText
  },
  modalNormal: {
    fontSize: 18,
    fontWeight: 'normal',
    color: ColorPallet.grayscale.white
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: ColorPallet.grayscale.white
  },
  modalHeadingOne: {
    fontSize: 38,
    fontWeight: 'bold',
    color: ColorPallet.grayscale.white
  },
  modalHeadingThree: {
    fontSize: 26,
    fontWeight: 'bold',
    color: ColorPallet.grayscale.white
  },
  popupModalText: {
    fontSize: 18,
    fontWeight: 'normal',
    color: ColorPallet.grayscale.white
  },
  settingsText: {
    fontSize: 21,
    fontWeight: 'normal',
    color: ColorPallet.brand.text
  }
};
const Inputs = exports.Inputs = _reactNative.StyleSheet.create({
  label: {
    ...TextTheme.label
  },
  textInput: {
    padding: 10,
    borderRadius,
    fontSize: 16,
    backgroundColor: ColorPallet.brand.primaryBackground,
    color: ColorPallet.notification.infoText,
    borderWidth: 2,
    borderColor: ColorPallet.brand.secondary
  },
  inputSelected: {
    borderColor: ColorPallet.brand.primary
  },
  singleSelect: {
    padding: 12,
    borderRadius: borderRadius * 2,
    backgroundColor: ColorPallet.brand.secondaryBackground
  },
  singleSelectText: {
    ...TextTheme.normal
  },
  singleSelectIcon: {
    color: ColorPallet.grayscale.white
  },
  checkBoxColor: {
    color: ColorPallet.brand.primary
  },
  checkBoxText: {
    ...TextTheme.normal
  }
});
const Buttons = exports.Buttons = _reactNative.StyleSheet.create({
  critical: {
    padding: 16,
    borderRadius: 4,
    backgroundColor: ColorPallet.brand.primary
  },
  primary: {
    padding: 16,
    borderRadius: 4,
    backgroundColor: ColorPallet.brand.primary
  },
  primaryDisabled: {
    padding: 16,
    borderRadius: 4,
    backgroundColor: ColorPallet.brand.primaryDisabled
  },
  primaryText: {
    ...TextTheme.bold,
    color: ColorPallet.brand.buttonText,
    textAlign: 'center'
  },
  primaryTextDisabled: {
    ...TextTheme.bold,
    textAlign: 'center'
  },
  secondary: {
    padding: 16,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: ColorPallet.brand.primary
  },
  secondaryDisabled: {
    padding: 16,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: ColorPallet.brand.secondaryDisabled
  },
  secondaryText: {
    ...TextTheme.bold,
    color: ColorPallet.brand.primary,
    textAlign: 'center'
  },
  secondaryTextDisabled: {
    ...TextTheme.bold,
    color: ColorPallet.brand.secondaryDisabled,
    textAlign: 'center'
  },
  modalCritical: {
    padding: 16,
    borderRadius: 4,
    backgroundColor: ColorPallet.brand.primary
  },
  modalPrimary: {
    padding: 16,
    borderRadius: 4,
    backgroundColor: ColorPallet.brand.modalPrimary
  },
  modalPrimaryText: {
    ...TextTheme.bold,
    textAlign: 'center'
  },
  modalSecondary: {
    padding: 16,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: ColorPallet.brand.modalPrimary
  },
  modalSecondaryText: {
    ...TextTheme.bold,
    color: ColorPallet.brand.modalPrimary,
    textAlign: 'center'
  },
  secondaryCritical: {
    padding: 16,
    borderRadius: 4,
    borderWidth: 2,
    backgroundColor: 'transparent',
    borderColor: ColorPallet.semantic.error
  },
  secondaryCriticalText: {
    ...TextTheme.bold,
    color: ColorPallet.semantic.error
  }
});
const ListItems = exports.ListItems = _reactNative.StyleSheet.create({
  credentialBackground: {
    backgroundColor: ColorPallet.brand.secondaryBackground
  },
  credentialTitle: {
    ...TextTheme.headingFour
  },
  credentialDetails: {
    ...TextTheme.caption
  },
  credentialOfferBackground: {
    backgroundColor: ColorPallet.brand.modalPrimaryBackground
  },
  credentialOfferTitle: {
    ...TextTheme.modalHeadingThree,
    fontWeight: 'normal'
  },
  credentialOfferDetails: {
    ...TextTheme.normal
  },
  revoked: {
    backgroundColor: ColorPallet.notification.error,
    borderColor: ColorPallet.notification.errorBorder
  },
  contactBackground: {
    backgroundColor: ColorPallet.brand.secondaryBackground
  },
  credentialIconColor: {
    color: ColorPallet.notification.infoText
  },
  contactTitle: {
    color: ColorPallet.brand.text
  },
  contactDate: {
    color: ColorPallet.brand.text,
    marginTop: 10
  },
  contactIconBackground: {
    backgroundColor: ColorPallet.brand.primary
  },
  contactIcon: {
    color: ColorPallet.grayscale.white
  },
  recordAttributeLabel: {
    ...TextTheme.bold
  },
  recordContainer: {
    backgroundColor: ColorPallet.brand.secondaryBackground
  },
  recordBorder: {
    borderBottomColor: ColorPallet.brand.primaryBackground
  },
  recordLink: {
    color: ColorPallet.brand.link
  },
  recordAttributeText: {
    ...TextTheme.normal
  },
  proofIcon: {
    ...TextTheme.headingOne
  },
  proofError: {
    color: ColorPallet.semantic.error
  },
  avatarText: {
    ...TextTheme.headingTwo,
    fontWeight: 'normal'
  },
  avatarCircle: {
    borderRadius: TextTheme.headingTwo.fontSize,
    borderColor: TextTheme.headingTwo.color,
    width: TextTheme.headingTwo.fontSize * 2,
    height: TextTheme.headingTwo.fontSize * 2
  },
  emptyList: {
    ...TextTheme.normal
  },
  requestTemplateBackground: {
    backgroundColor: ColorPallet.grayscale.white
  },
  requestTemplateIconColor: {
    color: ColorPallet.notification.infoText
  },
  requestTemplateTitle: {
    color: ColorPallet.grayscale.black,
    fontWeight: 'bold',
    fontSize: 16
  },
  requestTemplateDetails: {
    color: ColorPallet.grayscale.black,
    fontWeight: 'normal',
    fontSize: 16
  },
  requestTemplateZkpLabel: {
    color: ColorPallet.grayscale.mediumGrey,
    fontSize: 12
  },
  requestTemplateIcon: {
    color: ColorPallet.grayscale.black,
    fontSize: 36
  },
  requestTemplateDate: {
    color: ColorPallet.grayscale.mediumGrey,
    fontSize: 10
  }
});
const TabTheme = exports.TabTheme = {
  tabBarStyle: {
    height: 60,
    backgroundColor: ColorPallet.brand.secondaryBackground,
    shadowOffset: {
      width: 0,
      height: -3
    },
    shadowRadius: 6,
    shadowColor: ColorPallet.grayscale.black,
    shadowOpacity: 0.1,
    borderTopWidth: 0,
    paddingBottom: 0
  },
  tabBarContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tabBarActiveTintColor: ColorPallet.brand.primary,
  tabBarInactiveTintColor: ColorPallet.brand.tabBarInactive,
  tabBarTextStyle: {
    ...TextTheme.labelSubtitle,
    paddingBottom: 5
  },
  tabBarButtonIconStyle: {
    color: ColorPallet.brand.headerIcon
  },
  focusTabIconStyle: {
    height: 60,
    width: 60,
    backgroundColor: ColorPallet.brand.primary,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center'
  },
  focusTabActiveTintColor: {
    backgroundColor: ColorPallet.brand.secondary
  }
};
const NavigationTheme = exports.NavigationTheme = {
  dark: true,
  colors: {
    primary: ColorPallet.brand.primary,
    background: ColorPallet.brand.primaryBackground,
    card: ColorPallet.brand.primary,
    text: ColorPallet.grayscale.white,
    border: ColorPallet.grayscale.white,
    notification: ColorPallet.grayscale.white
  }
};
const HomeTheme = exports.HomeTheme = _reactNative.StyleSheet.create({
  welcomeHeader: {
    ...TextTheme.headingOne
  },
  credentialMsg: {
    ...TextTheme.normal
  },
  notificationsHeader: {
    ...TextTheme.headingThree
  },
  noNewUpdatesText: {
    ...TextTheme.normal,
    color: ColorPallet.notification.infoText
  },
  link: {
    ...TextTheme.normal,
    color: ColorPallet.brand.link
  }
});
const SettingsTheme = exports.SettingsTheme = {
  groupHeader: {
    ...TextTheme.normal,
    marginBottom: 8
  },
  groupBackground: ColorPallet.brand.secondaryBackground,
  iconColor: TextTheme.normal.color,
  text: {
    ...TextTheme.caption,
    color: ColorPallet.grayscale.white
  }
};
const ChatTheme = exports.ChatTheme = {
  containerStyle: {
    marginBottom: 16,
    marginLeft: 16,
    marginRight: 16,
    flexDirection: 'column',
    alignItems: 'flex-start',
    alignSelf: 'flex-end'
  },
  leftBubble: {
    backgroundColor: ColorPallet.brand.secondaryBackground,
    borderRadius: 4,
    padding: 16,
    marginLeft: 16
  },
  rightBubble: {
    backgroundColor: ColorPallet.brand.primaryLight,
    borderRadius: 4,
    padding: 16,
    marginRight: 16
  },
  timeStyleLeft: {
    color: ColorPallet.grayscale.lightGrey,
    fontSize: 12,
    marginTop: 8
  },
  timeStyleRight: {
    color: ColorPallet.grayscale.lightGrey,
    fontSize: 12,
    marginTop: 8
  },
  leftText: {
    color: ColorPallet.brand.secondary,
    fontSize: TextTheme.normal.fontSize
  },
  leftTextHighlighted: {
    ...TextTheme.bold,
    color: ColorPallet.brand.secondary
  },
  rightText: {
    color: ColorPallet.brand.secondary,
    fontSize: TextTheme.normal.fontSize
  },
  rightTextHighlighted: {
    ...TextTheme.bold,
    color: ColorPallet.brand.secondary
  },
  inputToolbar: {
    backgroundColor: ColorPallet.brand.secondary,
    shadowColor: ColorPallet.brand.primaryDisabled,
    borderRadius: 10
  },
  inputText: {
    lineHeight: undefined,
    fontWeight: '500',
    fontSize: TextTheme.normal.fontSize
  },
  placeholderText: ColorPallet.grayscale.lightGrey,
  sendContainer: {
    marginBottom: 4,
    paddingHorizontal: 4,
    justifyContent: 'center'
  },
  sendEnabled: ColorPallet.brand.primary,
  sendDisabled: ColorPallet.brand.primaryDisabled,
  options: ColorPallet.brand.primary,
  optionsText: ColorPallet.grayscale.black,
  openButtonStyle: {
    borderRadius: 32,
    backgroundColor: ColorPallet.brand.primary,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    marginTop: 16
  },
  openButtonTextStyle: {
    fontSize: TextTheme.normal.fontSize,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  documentIconContainer: {
    backgroundColor: ColorPallet.brand.primary,
    alignSelf: 'flex-start',
    borderRadius: 4,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50
  },
  documentIcon: {
    color: ColorPallet.grayscale.white
  }
};
const OnboardingTheme = exports.OnboardingTheme = {
  container: {
    backgroundColor: ColorPallet.brand.primaryBackground
  },
  carouselContainer: {
    backgroundColor: ColorPallet.brand.primaryBackground
  },
  pagerDot: {
    borderColor: ColorPallet.brand.primary
  },
  pagerDotActive: {
    color: ColorPallet.brand.primary
  },
  pagerDotInactive: {
    color: ColorPallet.brand.secondary
  },
  pagerNavigationButton: {
    color: ColorPallet.brand.primary,
    fontWeight: 'bold',
    fontSize: 18
  },
  headerTintColor: ColorPallet.grayscale.white,
  headerText: {
    ...TextTheme.bold
  },
  bodyText: {
    ...TextTheme.normal
  },
  imageDisplayOptions: {
    fill: ColorPallet.notification.infoText
  }
};
const DialogTheme = exports.DialogTheme = {
  modalView: {
    backgroundColor: ColorPallet.brand.secondaryBackground
  },
  titleText: {
    color: ColorPallet.grayscale.white
  },
  description: {
    color: ColorPallet.grayscale.white
  },
  closeButtonIcon: {
    color: ColorPallet.grayscale.white
  },
  carouselButtonText: {
    color: ColorPallet.grayscale.white
  }
};
const LoadingTheme = {
  backgroundColor: ColorPallet.brand.modalPrimaryBackground
};
const PINEnterTheme = {
  image: {
    alignSelf: 'center',
    marginBottom: 20
  }
};
const PINInputTheme = {
  cell: {
    backgroundColor: ColorPallet.brand.secondaryBackground,
    borderColor: ColorPallet.brand.secondary,
    borderWidth: 1
  },
  focussedCell: {
    borderColor: ColorPallet.brand.headerIcon
  },
  cellText: {
    color: ColorPallet.brand.text
  },
  icon: {
    color: ColorPallet.brand.headerIcon
  }
};
const Assets = exports.Assets = {
  svg: {
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
    verifierRequestDeclined: _verifierRequestDeclined.default,
    noInfoShared: _no_information_shared.default
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
const theme = exports.theme = {
  ColorPallet,
  TextTheme,
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
  heavyOpacity,
  borderRadius,
  borderWidth,
  Assets
};
//# sourceMappingURL=theme.js.map