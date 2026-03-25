"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _reactI18next = require("react-i18next");
var _FauxHeader = _interopRequireDefault(require("../misc/FauxHeader"));
var _SafeAreaModal = _interopRequireDefault(require("./SafeAreaModal"));
var _InfoBox = _interopRequireWildcard(require("../misc/InfoBox"));
var _Button = _interopRequireWildcard(require("../buttons/Button"));
var _theme = require("../../contexts/theme");
var _store = require("../../contexts/store");
var _containerApi = require("../../container-api");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const FullScreenErrorModal = ({
  errorTitle = '',
  errorDescription = '',
  visible = false,
  onPressCTA = () => {}
}) => {
  const {
    ColorPalette,
    NavigationTheme
  } = (0, _theme.useTheme)();
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const [store] = (0, _store.useStore)();
  const [{
    showGenericErrors
  }] = (0, _containerApi.useServices)([_containerApi.TOKENS.CONFIG]);
  const showGenericErrorMessage = store.preferences.genericErrorMessages || showGenericErrors;
  const style = _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      paddingTop: 40,
      backgroundColor: ColorPalette.brand.primaryBackground,
      justifyContent: 'space-between'
    },
    buttonContainer: {
      paddingBottom: 20
    }
  });
  return /*#__PURE__*/_react.default.createElement(_SafeAreaModal.default, {
    style: {
      backgroundColor: ColorPalette.brand.primaryBackground
    },
    visible: visible,
    transparent: false,
    animationType: 'none',
    presentationStyle: 'fullScreen',
    statusBarTranslucent: true
  }, /*#__PURE__*/_react.default.createElement(_reactNativeSafeAreaContext.SafeAreaView, {
    edges: ['top'],
    style: {
      backgroundColor: NavigationTheme.colors.primary
    }
  }), /*#__PURE__*/_react.default.createElement(_FauxHeader.default, {
    title: t('Global.AppName'),
    onBackPressed: onPressCTA
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style.container
  }, /*#__PURE__*/_react.default.createElement(_InfoBox.default, {
    title: showGenericErrorMessage ? t('Error.GenericError.Title') : errorTitle,
    message: showGenericErrorMessage ? t('Error.GenericError.Message') : errorDescription,
    notificationType: _InfoBox.InfoBoxType.Error,
    renderShowDetails: true
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style.buttonContainer
  }, /*#__PURE__*/_react.default.createElement(_Button.default, {
    title: t('FullScreenErrorModal.PrimaryCTA'),
    buttonType: _Button.ButtonType.Primary,
    onPress: onPressCTA
  }))));
};
var _default = exports.default = FullScreenErrorModal;
//# sourceMappingURL=FullScreenErrorModal.js.map