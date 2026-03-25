"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _clipboard = _interopRequireDefault(require("@react-native-clipboard/clipboard"));
var _netinfo = require("@react-native-community/netinfo");
var _react = _interopRequireDefault(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _reactNativeGestureHandler = require("react-native-gesture-handler");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _reactNativeToastMessage = _interopRequireDefault(require("react-native-toast-message"));
var _Button = _interopRequireWildcard(require("../components/buttons/Button"));
var _ThemedText = require("../components/texts/ThemedText");
var _BaseToast = require("../components/toast/BaseToast");
var _theme = require("../contexts/theme");
var _testable = require("../utils/testable");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const JSONDetails = ({
  route
}) => {
  if (!(route !== null && route !== void 0 && route.params)) {
    throw new Error('JSONDetails route params were not set properly');
  }
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const {
    ColorPalette
  } = (0, _theme.useTheme)();
  const netInfo = (0, _netinfo.useNetInfo)();
  const jsonBlob = JSON.stringify({
    caller_info: route.params.jsonBlob,
    network_info: netInfo
  }, null, 2);
  const styles = _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: ColorPalette.brand.primaryBackground,
      padding: 20
    },
    title: {
      marginBottom: 16
    },
    buttonContainer: {
      width: '100%',
      paddingVertical: 8
    },
    jsonContainer: {
      padding: 16,
      backgroundColor: ColorPalette.brand.secondaryBackground,
      height: '75%',
      borderWidth: 1,
      borderStyle: 'solid',
      borderRadius: 5
    }
  });
  const copyToClipboard = async () => {
    try {
      await _clipboard.default.setString(jsonBlob);
      _reactNativeToastMessage.default.show({
        type: _BaseToast.ToastType.Success,
        text1: t('JSONDetails.CopiedSuccess')
      });
    } catch (e) {
      _reactNativeToastMessage.default.show({
        type: _BaseToast.ToastType.Error,
        text1: `${t('JSONDetails.CopiedError')}: ${e}`
      });
    }
  };
  const shareJSON = async () => {
    await _reactNative.Share.share({
      message: jsonBlob
    });
  };
  return /*#__PURE__*/_react.default.createElement(_reactNativeSafeAreaContext.SafeAreaView, {
    style: styles.container,
    edges: ['bottom', 'left', 'right']
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNativeGestureHandler.ScrollView, {
    style: styles.jsonContainer,
    testID: (0, _testable.testIdWithKey)('JSONDetails.ScrollView')
  }, /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, null, jsonBlob)), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.buttonContainer
  }, /*#__PURE__*/_react.default.createElement(_Button.default, {
    title: t('JSONDetails.Share'),
    buttonType: _Button.ButtonType.Primary,
    testID: (0, _testable.testIdWithKey)('Share'),
    accessibilityLabel: t('JSONDetails.Share'),
    onPress: () => {
      shareJSON();
    }
  })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.buttonContainer
  }, /*#__PURE__*/_react.default.createElement(_Button.default, {
    title: t('JSONDetails.Copy'),
    buttonType: _Button.ButtonType.Secondary,
    testID: (0, _testable.testIdWithKey)('CopyToClipboard'),
    accessibilityLabel: t('JSONDetails.Copy'),
    onPress: () => {
      copyToClipboard();
    }
  }))));
};
var _default = exports.default = JSONDetails;
//# sourceMappingURL=JSONDetails.js.map