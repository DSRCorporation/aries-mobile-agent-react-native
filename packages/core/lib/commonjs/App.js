"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeSplashScreen = _interopRequireDefault(require("react-native-splash-screen"));
var _reactNativeToastMessage = _interopRequireDefault(require("react-native-toast-message"));
var _native = require("@react-navigation/native");
var _reactNativeDeviceInfo = require("react-native-device-info");
var _reactNativeOrientationLocker = _interopRequireDefault(require("react-native-orientation-locker"));
var _animatedComponents = require("./animated-components");
var _ErrorModal = _interopRequireDefault(require("./components/modals/ErrorModal"));
var _ToastConfig = _interopRequireDefault(require("./components/toast/ToastConfig"));
var _constants = require("./constants");
var _containerApi = require("./container-api");
var _animatedComponents2 = require("./contexts/animated-components");
var _auth = require("./contexts/auth");
var _navigation = _interopRequireDefault(require("./contexts/navigation"));
var _network = require("./contexts/network");
var _store = require("./contexts/store");
var _theme = require("./contexts/theme");
var _tourProvider = require("./contexts/tour/tour-provider");
var _localization = require("./localization");
var _RootStack = _interopRequireDefault(require("./navigators/RootStack"));
var _theme2 = require("./theme");
var _ErrorBoundary = _interopRequireDefault(require("./components/misc/ErrorBoundary"));
var _bifoldLogger = require("./services/bifoldLogger");
var _reactNativeKeyboardController = require("react-native-keyboard-controller");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const createApp = container => {
  const AppComponent = () => {
    const navigationRef = (0, _native.useNavigationContainerRef)();
    (0, _react.useEffect)(() => {
      (0, _localization.initStoredLanguage)().then();
    }, []);
    (0, _react.useEffect)(() => {
      // Hide the native splash / loading screen so that our
      // RN version can be displayed.
      _reactNativeSplashScreen.default.hide();
    }, []);
    if (!(0, _reactNativeDeviceInfo.isTablet)()) {
      _reactNativeOrientationLocker.default.lockToPortrait();
    }
    return /*#__PURE__*/_react.default.createElement(_ErrorBoundary.default, {
      logger: _bifoldLogger.bifoldLoggerInstance
    }, /*#__PURE__*/_react.default.createElement(_containerApi.ContainerProvider, {
      value: container
    }, /*#__PURE__*/_react.default.createElement(_store.StoreProvider, null, /*#__PURE__*/_react.default.createElement(_theme.ThemeProvider, {
      themes: _theme2.themes,
      defaultThemeName: _theme2.bifoldTheme.themeName
    }, /*#__PURE__*/_react.default.createElement(_navigation.default, {
      navigationRef: navigationRef
    }, /*#__PURE__*/_react.default.createElement(_animatedComponents2.AnimatedComponentsProvider, {
      value: _animatedComponents.animatedComponents
    }, /*#__PURE__*/_react.default.createElement(_auth.AuthProvider, null, /*#__PURE__*/_react.default.createElement(_network.NetworkProvider, null, /*#__PURE__*/_react.default.createElement(_reactNative.StatusBar, {
      hidden: false,
      barStyle: "light-content",
      backgroundColor: _theme2.bifoldTheme.ColorPalette.brand.primary,
      translucent: false
    }), /*#__PURE__*/_react.default.createElement(_ErrorModal.default, null), /*#__PURE__*/_react.default.createElement(_tourProvider.TourProvider, {
      tours: _constants.tours,
      overlayColor: 'gray',
      overlayOpacity: 0.7
    }, /*#__PURE__*/_react.default.createElement(_reactNativeKeyboardController.KeyboardProvider, {
      statusBarTranslucent: true,
      navigationBarTranslucent: true
    }, /*#__PURE__*/_react.default.createElement(_RootStack.default, null))), /*#__PURE__*/_react.default.createElement(_reactNativeToastMessage.default, {
      topOffset: 15,
      config: _ToastConfig.default
    })))))))));
  };
  return AppComponent;
};
var _default = exports.default = createApp;
//# sourceMappingURL=App.js.map