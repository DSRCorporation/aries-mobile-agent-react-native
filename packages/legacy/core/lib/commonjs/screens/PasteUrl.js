"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactHooks = require("@credo-ts/react-hooks");
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _Button = _interopRequireWildcard(require("../components/buttons/Button"));
var _InfoBox = _interopRequireWildcard(require("../components/misc/InfoBox"));
var _containerApi = require("../container-api");
var _theme = require("../contexts/theme");
var _helpers = require("../utils/helpers");
var _testable = require("../utils/testable");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const PasteUrl = ({
  navigation
}) => {
  const {
    ColorPallet,
    TextTheme
  } = (0, _theme.useTheme)();
  const [pastedContent, setPastedContent] = (0, _react.useState)('');
  const [errorMessage, setErrorMessage] = (0, _react.useState)();
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const {
    agent
  } = (0, _reactHooks.useAgent)();
  const [logger, {
    enableImplicitInvitations,
    enableReuseConnections
  }] = (0, _containerApi.useServices)([_containerApi.TOKENS.UTIL_LOGGER, _containerApi.TOKENS.CONFIG]);
  const styles = _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: ColorPallet.brand.primaryBackground
    },
    content: {
      margin: 20
    },
    description: {
      ...TextTheme.normal,
      marginBottom: 20
    },
    textBox: {
      ...TextTheme.normal,
      textAlignVertical: 'top',
      borderColor: ColorPallet.grayscale.darkGrey,
      borderWidth: 1,
      borderRadius: 5,
      backgroundColor: ColorPallet.grayscale.lightGrey
    },
    buttonContainer: {
      margin: 20
    }
  });
  const processPastedContent = async () => {
    try {
      await (0, _helpers.connectFromScanOrDeepLink)(pastedContent, agent, logger, navigation === null || navigation === void 0 ? void 0 : navigation.getParent(), false,
      // isDeepLink
      enableImplicitInvitations, enableReuseConnections);
    } catch (err) {
      setErrorMessage({
        title: t('PasteUrl.ErrorInvalidUrl'),
        message: t('PasteUrl.ErrorInvalidUrlDescription')
      });
    }
  };
  return /*#__PURE__*/_react.default.createElement(_reactNativeSafeAreaContext.SafeAreaView, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, null, /*#__PURE__*/_react.default.createElement(_reactNative.Modal, {
    visible: !!errorMessage,
    testID: (0, _testable.testIdWithKey)('ErrorModal'),
    animationType: "fade",
    transparent: true
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      flex: 1,
      paddingHorizontal: 10,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.6)'
    }
  }, /*#__PURE__*/_react.default.createElement(_InfoBox.default, {
    notificationType: _InfoBox.InfoBoxType.Error,
    title: (errorMessage === null || errorMessage === void 0 ? void 0 : errorMessage.title) ?? '',
    description: (errorMessage === null || errorMessage === void 0 ? void 0 : errorMessage.message) ?? '',
    onCallToActionPressed: () => setErrorMessage(undefined),
    onCallToActionLabel: t('Global.TryAgain')
  }))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.content
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.description
  }, t('PasteUrl.PasteUrlDescription')), /*#__PURE__*/_react.default.createElement(_reactNative.TextInput, {
    testID: (0, _testable.testIdWithKey)('PastedUrl'),
    style: styles.textBox,
    numberOfLines: 15,
    multiline: true,
    value: pastedContent,
    onChangeText: text => setPastedContent(text)
  })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.buttonContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    testID: (0, _testable.testIdWithKey)('ScanPastedUrlDisabled'),
    disabled: pastedContent.length > 0,
    onPress: () => {
      setErrorMessage({
        title: t('PasteUrl.ErrorTextboxEmpty'),
        message: t('PasteUrl.ErrorTextboxEmptyDescription')
      });
    }
  }, /*#__PURE__*/_react.default.createElement(_Button.default, {
    title: t('Global.Continue'),
    accessibilityLabel: t('Global.Continue'),
    testID: (0, _testable.testIdWithKey)('ScanPastedUrl'),
    buttonType: _Button.ButtonType.Primary,
    onPress: processPastedContent,
    disabled: pastedContent.length === 0
  })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      marginTop: 15
    }
  }, /*#__PURE__*/_react.default.createElement(_Button.default, {
    title: t('PasteUrl.Clear'),
    accessibilityLabel: t('PasteUrl.Clear'),
    testID: (0, _testable.testIdWithKey)('ClearPastedUrl'),
    buttonType: _Button.ButtonType.Secondary,
    onPress: () => {
      setPastedContent('');
    }
  })))));
};
var _default = exports.default = PasteUrl;
//# sourceMappingURL=PasteUrl.js.map