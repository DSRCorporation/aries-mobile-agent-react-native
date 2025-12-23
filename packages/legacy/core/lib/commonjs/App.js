"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactHooks = _interopRequireDefault(require("@credo-ts/react-hooks"));
var _react = _interopRequireWildcard(require("react"));
var React = _react;
var _reactNative = require("react-native");
var _reactNativeSplashScreen = _interopRequireDefault(require("react-native-splash-screen"));
var _reactNativeToastMessage = _interopRequireDefault(require("react-native-toast-message"));
var _animatedComponents = require("./animated-components");
var _ErrorModal = _interopRequireDefault(require("./components/modals/ErrorModal"));
var _NetInfo = _interopRequireDefault(require("./components/network/NetInfo"));
var _ToastConfig = _interopRequireDefault(require("./components/toast/ToastConfig"));
var _CredentialOfferTourSteps = require("./components/tour/CredentialOfferTourSteps");
var _CredentialsTourSteps = require("./components/tour/CredentialsTourSteps");
var _HomeTourSteps = require("./components/tour/HomeTourSteps");
var _ProofRequestTourSteps = require("./components/tour/ProofRequestTourSteps");
var _containerApi = require("./container-api");
var _animatedComponents2 = require("./contexts/animated-components");
var _auth = require("./contexts/auth");
var _network = require("./contexts/network");
var _store = require("./contexts/store");
var _theme = require("./contexts/theme");
var _tourProvider = require("./contexts/tour/tour-provider");
var _localization = require("./localization");
var _RootStack = _interopRequireDefault(require("./navigators/RootStack"));
var _theme2 = require("./theme");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const App = system => {
  (0, _localization.initLanguages)(_localization.translationResources);
  const AppComponent = () => {
    (0, _react.useMemo)(() => {
      (0, _localization.initStoredLanguage)().then();
    }, []);
    (0, _react.useEffect)(() => {
      // Hide the native splash / loading screen so that our
      // RN version can be displayed.
      _reactNativeSplashScreen.default.hide();
    }, []);
    return /*#__PURE__*/React.createElement(_containerApi.ContainerProvider, {
      value: system
    }, /*#__PURE__*/React.createElement(_store.StoreProvider, null, /*#__PURE__*/React.createElement(_reactHooks.default, {
      agent: undefined
    }, /*#__PURE__*/React.createElement(_theme.ThemeProvider, {
      value: _theme2.theme
    }, /*#__PURE__*/React.createElement(_animatedComponents2.AnimatedComponentsProvider, {
      value: _animatedComponents.animatedComponents
    }, /*#__PURE__*/React.createElement(_auth.AuthProvider, null, /*#__PURE__*/React.createElement(_network.NetworkProvider, null, /*#__PURE__*/React.createElement(_reactNative.StatusBar, {
      hidden: false,
      barStyle: "light-content",
      backgroundColor: _theme2.theme.ColorPallet.brand.primary,
      translucent: false
    }), /*#__PURE__*/React.createElement(_NetInfo.default, null), /*#__PURE__*/React.createElement(_ErrorModal.default, null), /*#__PURE__*/React.createElement(_tourProvider.TourProvider, {
      homeTourSteps: _HomeTourSteps.homeTourSteps,
      credentialsTourSteps: _CredentialsTourSteps.credentialsTourSteps,
      credentialOfferTourSteps: _CredentialOfferTourSteps.credentialOfferTourSteps,
      proofRequestTourSteps: _ProofRequestTourSteps.proofRequestTourSteps,
      overlayColor: 'gray',
      overlayOpacity: 0.7
    }, /*#__PURE__*/React.createElement(_RootStack.default, null)), /*#__PURE__*/React.createElement(_reactNativeToastMessage.default, {
      topOffset: 15,
      config: _ToastConfig.default
    }))))))));
  };
  return AppComponent;
};
var _default = exports.default = App;
//# sourceMappingURL=App.js.map