"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  Agent: true,
  AgentProvider: true,
  createApp: true,
  components: true,
  Button: true,
  ButtonType: true,
  IconButton: true,
  ButtonLocation: true,
  BulletPoint: true,
  CheckBoxRow: true,
  LimitedTextInput: true,
  NotificationListItem: true,
  ContentGradient: true,
  ErrorBoundaryWrapper: true,
  FauxHeader: true,
  InfoBox: true,
  InfoBoxType: true,
  QRRenderer: true,
  QRScannerTorch: true,
  ScanCamera: true,
  SVGOverlay: true,
  MaskType: true,
  DeveloperModal: true,
  DismissiblePopupModal: true,
  ErrorModal: true,
  SafeAreaModal: true,
  Record: true,
  InfoTextBox: true,
  Link: true,
  Text: true,
  ThemedText: true,
  ToastType: true,
  toastConfig: true,
  AttachTourStep: true,
  credentialOfferTourSteps: true,
  credentialsTourSteps: true,
  homeTourSteps: true,
  proofRequestTourSteps: true,
  TourBox: true,
  Banner: true,
  BannerSection: true,
  HomeContentView: true,
  KeyboardView: true,
  ScreenWrapper: true,
  attemptLockoutConfig: true,
  PINRules: true,
  tours: true,
  walletTimeout: true,
  EventTypes: true,
  LocalStorageKeys: true,
  defaultConfig: true,
  defaultHistoryEventsLogger: true,
  MainContainer: true,
  contexts: true,
  ActivityProvider: true,
  AutoLockTime: true,
  useActivity: true,
  AuthProvider: true,
  useAuth: true,
  LockoutReason: true,
  NavContainer: true,
  NetworkProvider: true,
  useNetwork: true,
  useTour: true,
  TourProvider: true,
  useDeveloperMode: true,
  usePreventScreenCapture: true,
  useBifoldAgentSetup: true,
  OpenIDCredentialRecordProvider: true,
  DefaultScreenLayoutOptions: true,
  DefaultScreenOptionsDictionary: true,
  useDefaultStackOptions: true,
  AttemptLockout: true,
  Biometry: true,
  Developer: true,
  Onboarding: true,
  OnboardingPages: true,
  createStyles: true,
  Preface: true,
  Scan: true,
  Splash: true,
  Terms: true,
  UpdateAvailable: true,
  AbstractBifoldLogger: true,
  bifoldLoggerInstance: true,
  isBiometricsActive: true,
  loadLoginAttempt: true,
  BifoldLogger: true,
  MockLogger: true,
  ThemeBuilder: true,
  types: true,
  QrCodeScanError: true,
  BifoldError: true,
  InlineErrorPosition: true,
  RefreshOrchestrator: true,
  AgentBridge: true,
  animatedComponents: true,
  AnimatedComponentsProvider: true,
  useAnimatedComponents: true,
  DispatchAction: true,
  reducer: true,
  Store: true,
  defaultState: true,
  mergeReducers: true,
  StoreContext: true,
  StoreProvider: true,
  useStore: true,
  ThemeProvider: true,
  useTheme: true,
  useDeepLinks: true,
  initLanguages: true,
  initStoredLanguage: true,
  Locales: true,
  translationResources: true,
  bifoldTheme: true,
  ColorPalette: true,
  ImageAssets: true,
  Screens: true,
  Stacks: true,
  TabStacks: true,
  createLinkSecretIfRequired: true,
  getAgentModules: true,
  getCredentialIdentifiers: true,
  isValidAnonCredsCredential: true,
  connectFromScanOrDeepLink: true,
  formatTime: true,
  getConnectionName: true,
  removeExistingInvitationsById: true,
  useCredentialConnectionLabel: true,
  getIndyLedgers: true,
  IndyLedger: true,
  readIndyLedgersFromFile: true,
  writeIndyLedgersToFile: true,
  statusBarStyleForColor: true,
  StatusBarStyles: true,
  migrateToAskar: true,
  buildFieldsFromAnonCredsCredential: true,
  testIdForAccessabilityLabel: true,
  testIdWithKey: true,
  BasicMessageMetadata: true,
  CredentialMetadata: true,
  BaseTourID: true
};
Object.defineProperty(exports, "AbstractBifoldLogger", {
  enumerable: true,
  get: function () {
    return _AbstractBifoldLogger.AbstractBifoldLogger;
  }
});
Object.defineProperty(exports, "ActivityProvider", {
  enumerable: true,
  get: function () {
    return _activity.ActivityProvider;
  }
});
Object.defineProperty(exports, "Agent", {
  enumerable: true,
  get: function () {
    return _core.Agent;
  }
});
Object.defineProperty(exports, "AgentBridge", {
  enumerable: true,
  get: function () {
    return _AgentBridge.AgentBridge;
  }
});
Object.defineProperty(exports, "AgentProvider", {
  enumerable: true,
  get: function () {
    return _reactHooks.default;
  }
});
Object.defineProperty(exports, "AnimatedComponentsProvider", {
  enumerable: true,
  get: function () {
    return _animatedComponents2.AnimatedComponentsProvider;
  }
});
Object.defineProperty(exports, "AttachTourStep", {
  enumerable: true,
  get: function () {
    return _AttachTourStep.AttachTourStep;
  }
});
Object.defineProperty(exports, "AttemptLockout", {
  enumerable: true,
  get: function () {
    return _AttemptLockout.default;
  }
});
Object.defineProperty(exports, "AuthProvider", {
  enumerable: true,
  get: function () {
    return _auth.AuthProvider;
  }
});
Object.defineProperty(exports, "AutoLockTime", {
  enumerable: true,
  get: function () {
    return _activity.AutoLockTime;
  }
});
Object.defineProperty(exports, "Banner", {
  enumerable: true,
  get: function () {
    return _Banner.Banner;
  }
});
Object.defineProperty(exports, "BannerSection", {
  enumerable: true,
  get: function () {
    return _Banner.BannerSection;
  }
});
Object.defineProperty(exports, "BaseTourID", {
  enumerable: true,
  get: function () {
    return _tour.BaseTourID;
  }
});
Object.defineProperty(exports, "BasicMessageMetadata", {
  enumerable: true,
  get: function () {
    return _metadata.BasicMessageMetadata;
  }
});
Object.defineProperty(exports, "BifoldError", {
  enumerable: true,
  get: function () {
    return _error.BifoldError;
  }
});
Object.defineProperty(exports, "BifoldLogger", {
  enumerable: true,
  get: function () {
    return _logger.BifoldLogger;
  }
});
Object.defineProperty(exports, "Biometry", {
  enumerable: true,
  get: function () {
    return _Biometry.default;
  }
});
Object.defineProperty(exports, "BulletPoint", {
  enumerable: true,
  get: function () {
    return _BulletPoint.default;
  }
});
Object.defineProperty(exports, "Button", {
  enumerable: true,
  get: function () {
    return _Button.ButtonImpl;
  }
});
Object.defineProperty(exports, "ButtonLocation", {
  enumerable: true,
  get: function () {
    return _IconButton.ButtonLocation;
  }
});
Object.defineProperty(exports, "ButtonType", {
  enumerable: true,
  get: function () {
    return _Button.ButtonType;
  }
});
Object.defineProperty(exports, "CheckBoxRow", {
  enumerable: true,
  get: function () {
    return _CheckBoxRow.default;
  }
});
Object.defineProperty(exports, "ColorPalette", {
  enumerable: true,
  get: function () {
    return _theme2.ColorPalette;
  }
});
Object.defineProperty(exports, "ContentGradient", {
  enumerable: true,
  get: function () {
    return _ContentGradient.default;
  }
});
Object.defineProperty(exports, "CredentialMetadata", {
  enumerable: true,
  get: function () {
    return _metadata.CredentialMetadata;
  }
});
Object.defineProperty(exports, "DefaultScreenLayoutOptions", {
  enumerable: true,
  get: function () {
    return _defaultLayoutOptions.DefaultScreenLayoutOptions;
  }
});
Object.defineProperty(exports, "DefaultScreenOptionsDictionary", {
  enumerable: true,
  get: function () {
    return _defaultStackOptions.DefaultScreenOptionsDictionary;
  }
});
Object.defineProperty(exports, "Developer", {
  enumerable: true,
  get: function () {
    return _Developer.default;
  }
});
Object.defineProperty(exports, "DeveloperModal", {
  enumerable: true,
  get: function () {
    return _DeveloperModal.default;
  }
});
Object.defineProperty(exports, "DismissiblePopupModal", {
  enumerable: true,
  get: function () {
    return _DismissiblePopupModal.default;
  }
});
Object.defineProperty(exports, "DispatchAction", {
  enumerable: true,
  get: function () {
    return _store.DispatchAction;
  }
});
Object.defineProperty(exports, "ErrorBoundaryWrapper", {
  enumerable: true,
  get: function () {
    return _ErrorBoundary.default;
  }
});
Object.defineProperty(exports, "ErrorModal", {
  enumerable: true,
  get: function () {
    return _ErrorModal.default;
  }
});
Object.defineProperty(exports, "EventTypes", {
  enumerable: true,
  get: function () {
    return _constants.EventTypes;
  }
});
Object.defineProperty(exports, "FauxHeader", {
  enumerable: true,
  get: function () {
    return _FauxHeader.default;
  }
});
Object.defineProperty(exports, "HomeContentView", {
  enumerable: true,
  get: function () {
    return _HomeFooterView.default;
  }
});
Object.defineProperty(exports, "IconButton", {
  enumerable: true,
  get: function () {
    return _IconButton.default;
  }
});
Object.defineProperty(exports, "ImageAssets", {
  enumerable: true,
  get: function () {
    return _theme2.Assets;
  }
});
Object.defineProperty(exports, "IndyLedger", {
  enumerable: true,
  get: function () {
    return _ledger.IndyLedger;
  }
});
Object.defineProperty(exports, "InfoBox", {
  enumerable: true,
  get: function () {
    return _InfoBox.default;
  }
});
Object.defineProperty(exports, "InfoBoxType", {
  enumerable: true,
  get: function () {
    return _InfoBox.InfoBoxType;
  }
});
Object.defineProperty(exports, "InfoTextBox", {
  enumerable: true,
  get: function () {
    return _InfoTextBox.default;
  }
});
Object.defineProperty(exports, "InlineErrorPosition", {
  enumerable: true,
  get: function () {
    return _error.InlineErrorPosition;
  }
});
Object.defineProperty(exports, "KeyboardView", {
  enumerable: true,
  get: function () {
    return _KeyboardView.default;
  }
});
Object.defineProperty(exports, "LimitedTextInput", {
  enumerable: true,
  get: function () {
    return _LimitedTextInput.default;
  }
});
Object.defineProperty(exports, "Link", {
  enumerable: true,
  get: function () {
    return _Link.default;
  }
});
Object.defineProperty(exports, "LocalStorageKeys", {
  enumerable: true,
  get: function () {
    return _constants.LocalStorageKeys;
  }
});
Object.defineProperty(exports, "Locales", {
  enumerable: true,
  get: function () {
    return _localization.Locales;
  }
});
Object.defineProperty(exports, "LockoutReason", {
  enumerable: true,
  get: function () {
    return _auth.LockoutReason;
  }
});
Object.defineProperty(exports, "MainContainer", {
  enumerable: true,
  get: function () {
    return _containerImpl.MainContainer;
  }
});
Object.defineProperty(exports, "MaskType", {
  enumerable: true,
  get: function () {
    return _SVGOverlay.MaskType;
  }
});
Object.defineProperty(exports, "MockLogger", {
  enumerable: true,
  get: function () {
    return _MockLogger.MockLogger;
  }
});
Object.defineProperty(exports, "NavContainer", {
  enumerable: true,
  get: function () {
    return _navigation.default;
  }
});
Object.defineProperty(exports, "NetworkProvider", {
  enumerable: true,
  get: function () {
    return _network.NetworkProvider;
  }
});
Object.defineProperty(exports, "NotificationListItem", {
  enumerable: true,
  get: function () {
    return _NotificationListItem.default;
  }
});
Object.defineProperty(exports, "Onboarding", {
  enumerable: true,
  get: function () {
    return _Onboarding.default;
  }
});
Object.defineProperty(exports, "OnboardingPages", {
  enumerable: true,
  get: function () {
    return _OnboardingPages.default;
  }
});
Object.defineProperty(exports, "OpenIDCredentialRecordProvider", {
  enumerable: true,
  get: function () {
    return _OpenIDCredentialRecordProvider.OpenIDCredentialRecordProvider;
  }
});
Object.defineProperty(exports, "PINRules", {
  enumerable: true,
  get: function () {
    return _constants.PINRules;
  }
});
Object.defineProperty(exports, "Preface", {
  enumerable: true,
  get: function () {
    return _Preface.default;
  }
});
Object.defineProperty(exports, "QRRenderer", {
  enumerable: true,
  get: function () {
    return _QRRenderer.default;
  }
});
Object.defineProperty(exports, "QRScannerTorch", {
  enumerable: true,
  get: function () {
    return _QRScannerTorch.default;
  }
});
Object.defineProperty(exports, "QrCodeScanError", {
  enumerable: true,
  get: function () {
    return _error.QrCodeScanError;
  }
});
Object.defineProperty(exports, "Record", {
  enumerable: true,
  get: function () {
    return _Record.default;
  }
});
Object.defineProperty(exports, "RefreshOrchestrator", {
  enumerable: true,
  get: function () {
    return _refreshOrchestrator.RefreshOrchestrator;
  }
});
Object.defineProperty(exports, "SVGOverlay", {
  enumerable: true,
  get: function () {
    return _SVGOverlay.default;
  }
});
Object.defineProperty(exports, "SafeAreaModal", {
  enumerable: true,
  get: function () {
    return _SafeAreaModal.default;
  }
});
Object.defineProperty(exports, "Scan", {
  enumerable: true,
  get: function () {
    return _Scan.default;
  }
});
Object.defineProperty(exports, "ScanCamera", {
  enumerable: true,
  get: function () {
    return _ScanCamera.default;
  }
});
Object.defineProperty(exports, "ScreenWrapper", {
  enumerable: true,
  get: function () {
    return _ScreenWrapper.default;
  }
});
Object.defineProperty(exports, "Screens", {
  enumerable: true,
  get: function () {
    return _navigators2.Screens;
  }
});
Object.defineProperty(exports, "Splash", {
  enumerable: true,
  get: function () {
    return _Splash.default;
  }
});
Object.defineProperty(exports, "Stacks", {
  enumerable: true,
  get: function () {
    return _navigators2.Stacks;
  }
});
Object.defineProperty(exports, "StatusBarStyles", {
  enumerable: true,
  get: function () {
    return _luminance.StatusBarStyles;
  }
});
Object.defineProperty(exports, "Store", {
  enumerable: true,
  get: function () {
    return _store.default;
  }
});
Object.defineProperty(exports, "StoreContext", {
  enumerable: true,
  get: function () {
    return _store2.StoreContext;
  }
});
Object.defineProperty(exports, "StoreProvider", {
  enumerable: true,
  get: function () {
    return _store2.StoreProvider;
  }
});
Object.defineProperty(exports, "TabStacks", {
  enumerable: true,
  get: function () {
    return _navigators2.TabStacks;
  }
});
Object.defineProperty(exports, "Terms", {
  enumerable: true,
  get: function () {
    return _Terms.default;
  }
});
Object.defineProperty(exports, "Text", {
  enumerable: true,
  get: function () {
    return _Text.default;
  }
});
Object.defineProperty(exports, "ThemeBuilder", {
  enumerable: true,
  get: function () {
    return _themeBuilder.ThemeBuilder;
  }
});
Object.defineProperty(exports, "ThemeProvider", {
  enumerable: true,
  get: function () {
    return _theme.ThemeProvider;
  }
});
Object.defineProperty(exports, "ThemedText", {
  enumerable: true,
  get: function () {
    return _ThemedText.ThemedText;
  }
});
Object.defineProperty(exports, "ToastType", {
  enumerable: true,
  get: function () {
    return _BaseToast.ToastType;
  }
});
Object.defineProperty(exports, "TourBox", {
  enumerable: true,
  get: function () {
    return _TourBox.TourBox;
  }
});
Object.defineProperty(exports, "TourProvider", {
  enumerable: true,
  get: function () {
    return _tourProvider.TourProvider;
  }
});
Object.defineProperty(exports, "UpdateAvailable", {
  enumerable: true,
  get: function () {
    return _UpdateAvailable.default;
  }
});
Object.defineProperty(exports, "animatedComponents", {
  enumerable: true,
  get: function () {
    return _animatedComponents.animatedComponents;
  }
});
Object.defineProperty(exports, "attemptLockoutConfig", {
  enumerable: true,
  get: function () {
    return _constants.attemptLockoutConfig;
  }
});
Object.defineProperty(exports, "bifoldLoggerInstance", {
  enumerable: true,
  get: function () {
    return _bifoldLogger.bifoldLoggerInstance;
  }
});
Object.defineProperty(exports, "bifoldTheme", {
  enumerable: true,
  get: function () {
    return _theme2.bifoldTheme;
  }
});
Object.defineProperty(exports, "buildFieldsFromAnonCredsCredential", {
  enumerable: true,
  get: function () {
    return _oca.buildFieldsFromAnonCredsCredential;
  }
});
exports.components = void 0;
Object.defineProperty(exports, "connectFromScanOrDeepLink", {
  enumerable: true,
  get: function () {
    return _helpers.connectFromScanOrDeepLink;
  }
});
exports.contexts = void 0;
Object.defineProperty(exports, "createApp", {
  enumerable: true,
  get: function () {
    return _App.default;
  }
});
Object.defineProperty(exports, "createLinkSecretIfRequired", {
  enumerable: true,
  get: function () {
    return _agent.createLinkSecretIfRequired;
  }
});
Object.defineProperty(exports, "createStyles", {
  enumerable: true,
  get: function () {
    return _OnboardingPages.createStyles;
  }
});
Object.defineProperty(exports, "credentialOfferTourSteps", {
  enumerable: true,
  get: function () {
    return _CredentialOfferTourSteps.credentialOfferTourSteps;
  }
});
Object.defineProperty(exports, "credentialsTourSteps", {
  enumerable: true,
  get: function () {
    return _CredentialsTourSteps.credentialsTourSteps;
  }
});
Object.defineProperty(exports, "defaultConfig", {
  enumerable: true,
  get: function () {
    return _containerImpl.defaultConfig;
  }
});
Object.defineProperty(exports, "defaultHistoryEventsLogger", {
  enumerable: true,
  get: function () {
    return _containerImpl.defaultHistoryEventsLogger;
  }
});
Object.defineProperty(exports, "defaultState", {
  enumerable: true,
  get: function () {
    return _store2.defaultState;
  }
});
Object.defineProperty(exports, "formatTime", {
  enumerable: true,
  get: function () {
    return _helpers.formatTime;
  }
});
Object.defineProperty(exports, "getAgentModules", {
  enumerable: true,
  get: function () {
    return _agent.getAgentModules;
  }
});
Object.defineProperty(exports, "getConnectionName", {
  enumerable: true,
  get: function () {
    return _helpers.getConnectionName;
  }
});
Object.defineProperty(exports, "getCredentialIdentifiers", {
  enumerable: true,
  get: function () {
    return _credential.getCredentialIdentifiers;
  }
});
Object.defineProperty(exports, "getIndyLedgers", {
  enumerable: true,
  get: function () {
    return _ledger.getIndyLedgers;
  }
});
Object.defineProperty(exports, "homeTourSteps", {
  enumerable: true,
  get: function () {
    return _HomeTourSteps.homeTourSteps;
  }
});
Object.defineProperty(exports, "initLanguages", {
  enumerable: true,
  get: function () {
    return _localization.initLanguages;
  }
});
Object.defineProperty(exports, "initStoredLanguage", {
  enumerable: true,
  get: function () {
    return _localization.initStoredLanguage;
  }
});
Object.defineProperty(exports, "isBiometricsActive", {
  enumerable: true,
  get: function () {
    return _keychain.isBiometricsActive;
  }
});
Object.defineProperty(exports, "isValidAnonCredsCredential", {
  enumerable: true,
  get: function () {
    return _credential.isValidAnonCredsCredential;
  }
});
Object.defineProperty(exports, "loadLoginAttempt", {
  enumerable: true,
  get: function () {
    return _keychain.loadLoginAttempt;
  }
});
Object.defineProperty(exports, "mergeReducers", {
  enumerable: true,
  get: function () {
    return _store2.mergeReducers;
  }
});
Object.defineProperty(exports, "migrateToAskar", {
  enumerable: true,
  get: function () {
    return _migration.migrateToAskar;
  }
});
Object.defineProperty(exports, "proofRequestTourSteps", {
  enumerable: true,
  get: function () {
    return _ProofRequestTourSteps.proofRequestTourSteps;
  }
});
Object.defineProperty(exports, "readIndyLedgersFromFile", {
  enumerable: true,
  get: function () {
    return _ledger.readIndyLedgersFromFile;
  }
});
Object.defineProperty(exports, "reducer", {
  enumerable: true,
  get: function () {
    return _store.reducer;
  }
});
Object.defineProperty(exports, "removeExistingInvitationsById", {
  enumerable: true,
  get: function () {
    return _helpers.removeExistingInvitationsById;
  }
});
Object.defineProperty(exports, "statusBarStyleForColor", {
  enumerable: true,
  get: function () {
    return _luminance.statusBarStyleForColor;
  }
});
Object.defineProperty(exports, "testIdForAccessabilityLabel", {
  enumerable: true,
  get: function () {
    return _testable.testIdForAccessabilityLabel;
  }
});
Object.defineProperty(exports, "testIdWithKey", {
  enumerable: true,
  get: function () {
    return _testable.testIdWithKey;
  }
});
Object.defineProperty(exports, "toastConfig", {
  enumerable: true,
  get: function () {
    return _ToastConfig.default;
  }
});
Object.defineProperty(exports, "tours", {
  enumerable: true,
  get: function () {
    return _constants.tours;
  }
});
Object.defineProperty(exports, "translationResources", {
  enumerable: true,
  get: function () {
    return _localization.translationResources;
  }
});
exports.types = void 0;
Object.defineProperty(exports, "useActivity", {
  enumerable: true,
  get: function () {
    return _activity.useActivity;
  }
});
Object.defineProperty(exports, "useAnimatedComponents", {
  enumerable: true,
  get: function () {
    return _animatedComponents2.useAnimatedComponents;
  }
});
Object.defineProperty(exports, "useAuth", {
  enumerable: true,
  get: function () {
    return _auth.useAuth;
  }
});
Object.defineProperty(exports, "useBifoldAgentSetup", {
  enumerable: true,
  get: function () {
    return _useBifoldAgentSetup.default;
  }
});
Object.defineProperty(exports, "useCredentialConnectionLabel", {
  enumerable: true,
  get: function () {
    return _helpers.useCredentialConnectionLabel;
  }
});
Object.defineProperty(exports, "useDeepLinks", {
  enumerable: true,
  get: function () {
    return _deepLinks.useDeepLinks;
  }
});
Object.defineProperty(exports, "useDefaultStackOptions", {
  enumerable: true,
  get: function () {
    return _defaultStackOptions.useDefaultStackOptions;
  }
});
Object.defineProperty(exports, "useDeveloperMode", {
  enumerable: true,
  get: function () {
    return _developerMode.useDeveloperMode;
  }
});
Object.defineProperty(exports, "useNetwork", {
  enumerable: true,
  get: function () {
    return _network.useNetwork;
  }
});
Object.defineProperty(exports, "usePreventScreenCapture", {
  enumerable: true,
  get: function () {
    return _screenCapture.default;
  }
});
Object.defineProperty(exports, "useStore", {
  enumerable: true,
  get: function () {
    return _store2.useStore;
  }
});
Object.defineProperty(exports, "useTheme", {
  enumerable: true,
  get: function () {
    return _theme.useTheme;
  }
});
Object.defineProperty(exports, "useTour", {
  enumerable: true,
  get: function () {
    return _tourContext.useTour;
  }
});
Object.defineProperty(exports, "walletTimeout", {
  enumerable: true,
  get: function () {
    return _constants.walletTimeout;
  }
});
Object.defineProperty(exports, "writeIndyLedgersToFile", {
  enumerable: true,
  get: function () {
    return _ledger.writeIndyLedgersToFile;
  }
});
var _core = require("@credo-ts/core");
var _reactHooks = _interopRequireDefault(require("@bifold/react-hooks"));
var _App = _interopRequireDefault(require("./App"));
var components = _interopRequireWildcard(require("./components"));
exports.components = components;
var _Button = require("./components/buttons/Button");
var _IconButton = _interopRequireWildcard(require("./components/buttons/IconButton"));
var _BulletPoint = _interopRequireDefault(require("./components/inputs/BulletPoint"));
var _CheckBoxRow = _interopRequireDefault(require("./components/inputs/CheckBoxRow"));
var _LimitedTextInput = _interopRequireDefault(require("./components/inputs/LimitedTextInput"));
var _NotificationListItem = _interopRequireDefault(require("./components/listItems/NotificationListItem"));
var _ContentGradient = _interopRequireDefault(require("./components/misc/ContentGradient"));
var _ErrorBoundary = _interopRequireDefault(require("./components/misc/ErrorBoundary"));
var _FauxHeader = _interopRequireDefault(require("./components/misc/FauxHeader"));
var _InfoBox = _interopRequireWildcard(require("./components/misc/InfoBox"));
var _QRRenderer = _interopRequireDefault(require("./components/misc/QRRenderer"));
var _QRScannerTorch = _interopRequireDefault(require("./components/misc/QRScannerTorch"));
var _ScanCamera = _interopRequireDefault(require("./components/misc/ScanCamera"));
var _SVGOverlay = _interopRequireWildcard(require("./components/misc/SVGOverlay"));
var _DeveloperModal = _interopRequireDefault(require("./components/modals/DeveloperModal"));
var _DismissiblePopupModal = _interopRequireDefault(require("./components/modals/DismissiblePopupModal"));
var _ErrorModal = _interopRequireDefault(require("./components/modals/ErrorModal"));
var _SafeAreaModal = _interopRequireDefault(require("./components/modals/SafeAreaModal"));
var _Record = _interopRequireDefault(require("./components/record/Record"));
var _InfoTextBox = _interopRequireDefault(require("./components/texts/InfoTextBox"));
var _Link = _interopRequireDefault(require("./components/texts/Link"));
var _Text = _interopRequireDefault(require("./components/texts/Text"));
var _ThemedText = require("./components/texts/ThemedText");
var _BaseToast = require("./components/toast/BaseToast");
var _ToastConfig = _interopRequireDefault(require("./components/toast/ToastConfig"));
var _AttachTourStep = require("./components/tour/AttachTourStep");
var _CredentialOfferTourSteps = require("./components/tour/CredentialOfferTourSteps");
var _CredentialsTourSteps = require("./components/tour/CredentialsTourSteps");
var _HomeTourSteps = require("./components/tour/HomeTourSteps");
var _ProofRequestTourSteps = require("./components/tour/ProofRequestTourSteps");
var _TourBox = require("./components/tour/TourBox");
var _Banner = require("./components/views/Banner");
var _HomeFooterView = _interopRequireDefault(require("./components/views/HomeFooterView"));
var _KeyboardView = _interopRequireDefault(require("./components/views/KeyboardView"));
var _ScreenWrapper = _interopRequireDefault(require("./components/views/ScreenWrapper"));
var _constants = require("./constants");
var _containerImpl = require("./container-impl");
var contexts = _interopRequireWildcard(require("./contexts"));
exports.contexts = contexts;
var _activity = require("./contexts/activity");
var _auth = require("./contexts/auth");
var _navigation = _interopRequireDefault(require("./contexts/navigation"));
var _network = require("./contexts/network");
var _tourContext = require("./contexts/tour/tour-context");
var _tourProvider = require("./contexts/tour/tour-provider");
var _developerMode = require("./hooks/developer-mode");
var _screenCapture = _interopRequireDefault(require("./hooks/screen-capture"));
var _useBifoldAgentSetup = _interopRequireDefault(require("./hooks/useBifoldAgentSetup"));
var _OpenIDCredentialRecordProvider = require("./modules/openid/context/OpenIDCredentialRecordProvider");
var _defaultLayoutOptions = require("./navigators/defaultLayoutOptions");
var _defaultStackOptions = require("./navigators/defaultStackOptions");
var _AttemptLockout = _interopRequireDefault(require("./screens/AttemptLockout"));
var _Biometry = _interopRequireDefault(require("./screens/Biometry"));
var _Developer = _interopRequireDefault(require("./screens/Developer"));
var _Onboarding = _interopRequireDefault(require("./screens/Onboarding"));
var _OnboardingPages = _interopRequireWildcard(require("./screens/OnboardingPages"));
var _Preface = _interopRequireDefault(require("./screens/Preface"));
var _Scan = _interopRequireDefault(require("./screens/Scan"));
var _Splash = _interopRequireDefault(require("./screens/Splash"));
var _Terms = _interopRequireDefault(require("./screens/Terms"));
var _UpdateAvailable = _interopRequireDefault(require("./screens/UpdateAvailable"));
var _AbstractBifoldLogger = require("./services/AbstractBifoldLogger");
var _bifoldLogger = require("./services/bifoldLogger");
var _keychain = require("./services/keychain");
var _logger = require("./services/logger");
var _MockLogger = require("./testing/MockLogger");
var _themeBuilder = require("./theme-builder");
var types = _interopRequireWildcard(require("./types"));
exports.types = types;
var _error = require("./types/error");
var _refreshOrchestrator = require("./modules/openid/refresh/refreshOrchestrator");
var _AgentBridge = require("./services/AgentBridge");
var _animatedComponents = require("./animated-components");
var _animatedComponents2 = require("./contexts/animated-components");
var _store = _interopRequireWildcard(require("./contexts/reducers/store"));
var _store2 = require("./contexts/store");
var _theme = require("./contexts/theme");
var _deepLinks = require("./hooks/deep-links");
var _localization = require("./localization");
var _navigators = require("./navigators");
Object.keys(_navigators).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _navigators[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _navigators[key];
    }
  });
});
var _storage = require("./services/storage");
Object.keys(_storage).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _storage[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _storage[key];
    }
  });
});
var _theme2 = require("./theme");
var _attestation = require("./types/attestation");
Object.keys(_attestation).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _attestation[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _attestation[key];
    }
  });
});
var _navigators2 = require("./types/navigators");
var _versionCheck = require("./types/version-check");
Object.keys(_versionCheck).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _versionCheck[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _versionCheck[key];
    }
  });
});
var _agent = require("./utils/agent");
var _credential = require("./utils/credential");
var _helpers = require("./utils/helpers");
var _ledger = require("./utils/ledger");
var _luminance = require("./utils/luminance");
var _migration = require("./utils/migration");
var _oca = require("./utils/oca");
var _testable = require("./utils/testable");
var _metadata = require("./types/metadata");
var _containerApi = require("./container-api");
Object.keys(_containerApi).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _containerApi[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _containerApi[key];
    }
  });
});
var _tour = require("./types/tour");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
//# sourceMappingURL=index.js.map