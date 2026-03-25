"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactHooks = require("@bifold/react-hooks");
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _Button = _interopRequireWildcard(require("../components/buttons/Button"));
var _InfoBox = _interopRequireWildcard(require("../components/misc/InfoBox"));
var _SafeAreaModal = _interopRequireDefault(require("../components/modals/SafeAreaModal"));
var _containerApi = require("../container-api");
var _theme = require("../contexts/theme");
var _helpers = require("../utils/helpers");
var _testable = require("../utils/testable");
var _ThemedText = require("../components/texts/ThemedText");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const PasteUrl = ({
  navigation
}) => {
  const {
    ColorPalette,
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
      backgroundColor: ColorPalette.brand.primaryBackground
    },
    content: {
      margin: 20
    },
    description: {
      marginBottom: 20
    },
    textBox: {
      ...TextTheme.normal,
      textAlignVertical: 'top',
      borderColor: ColorPalette.grayscale.darkGrey,
      borderWidth: 1,
      borderRadius: 5,
      backgroundColor: ColorPalette.grayscale.lightGrey
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
    } catch {
      setErrorMessage({
        title: t('PasteUrl.ErrorInvalidUrl'),
        message: t('PasteUrl.ErrorInvalidUrlDescription')
      });
    }
  };
  return /*#__PURE__*/_react.default.createElement(_reactNativeSafeAreaContext.SafeAreaView, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, null, /*#__PURE__*/_react.default.createElement(_SafeAreaModal.default, {
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
  }, /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
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