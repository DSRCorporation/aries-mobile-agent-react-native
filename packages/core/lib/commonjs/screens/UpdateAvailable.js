"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _Button = _interopRequireWildcard(require("../components/buttons/Button"));
var _Link = _interopRequireDefault(require("../components/texts/Link"));
var _ThemedText = require("../components/texts/ThemedText");
var _theme = require("../contexts/theme");
var _store = require("../contexts/store");
var _store2 = require("../contexts/reducers/store");
var _testable = require("../utils/testable");
var _containerApi = require("../container-api");
var _ScreenWrapper = _interopRequireDefault(require("../components/views/ScreenWrapper"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const UpdateAvailable = ({
  appleAppStoreUrl,
  googlePlayStoreUrl
}) => {
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const [, dispatch] = (0, _store.useStore)();
  const {
    ColorPalette,
    Assets,
    Spacing
  } = (0, _theme.useTheme)();
  const [logger] = (0, _containerApi.useServices)([_containerApi.TOKENS.UTIL_LOGGER]);

  // Check if both store links are available
  const hasStoreLinks = Boolean(appleAppStoreUrl && googlePlayStoreUrl);
  const onPressWhatIsNew = (0, _react.useCallback)(() => {
    const url = _reactNative.Platform.OS === 'ios' ? appleAppStoreUrl : googlePlayStoreUrl;
    if (url) {
      _reactNative.Linking.openURL(url).catch(err => logger.error('Failed to open app store link', err));
    }
  }, [appleAppStoreUrl, googlePlayStoreUrl, logger]);
  const onPressLater = (0, _react.useCallback)(() => {
    dispatch({
      type: _store2.DispatchAction.SET_VERSION_INFO,
      payload: [{
        dismissed: true
      }]
    });
  }, [dispatch]);
  const iconOptions = {
    fill: ColorPalette.notification.infoText,
    height: 130,
    width: 130
  };
  const styles = _reactNative.StyleSheet.create({
    image: {
      marginTop: Spacing.md
    },
    imageContainer: {
      alignItems: 'center',
      marginBottom: Spacing.lg
    },
    messageText: {
      textAlign: 'center',
      marginTop: Spacing.lg
    },
    delayMessageText: {
      textAlign: 'center',
      marginTop: Spacing.md
    }
  });
  const controls = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, hasStoreLinks && /*#__PURE__*/_react.default.createElement(_Button.default, {
    title: t('AppUpdate.UpdateNow'),
    accessibilityLabel: t('AppUpdate.UpdateNow'),
    testID: (0, _testable.testIdWithKey)('UpdateNow'),
    buttonType: _Button.ButtonType.Primary,
    onPress: onPressWhatIsNew
  }), /*#__PURE__*/_react.default.createElement(_Button.default, {
    title: t('AppUpdate.UpdateLater'),
    accessibilityLabel: t('AppUpdate.UpdateLater'),
    testID: (0, _testable.testIdWithKey)('UpdateLater'),
    buttonType: _Button.ButtonType.Secondary,
    onPress: onPressLater
  }));
  return /*#__PURE__*/_react.default.createElement(_ScreenWrapper.default, {
    controls: controls,
    padded: true
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.imageContainer
  }, /*#__PURE__*/_react.default.createElement(Assets.svg.updateAvailable, iconOptions)), /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    variant: "headingTwo",
    style: {
      marginBottom: Spacing.lg
    }
  }, t('AppUpdate.Heading')), /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, null, t('AppUpdate.Body')), hasStoreLinks && /*#__PURE__*/_react.default.createElement(_Link.default, {
    style: {
      marginVertical: Spacing.lg
    },
    onPress: onPressWhatIsNew,
    linkText: t('AppUpdate.LearnMore')
  }));
};
var _default = exports.default = UpdateAvailable;
//# sourceMappingURL=UpdateAvailable.js.map