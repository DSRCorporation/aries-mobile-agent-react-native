"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _theme = require("../../contexts/theme");
var _testable = require("../../utils/testable");
var _IconButton = _interopRequireWildcard(require("../buttons/IconButton"));
var _ThemedText = require("../texts/ThemedText");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Used for modals that we want to look like regular screens
const FauxHeader = ({
  title,
  onBackPressed = () => {},
  showBackButton = true
}) => {
  const {
    Spacing,
    NavigationTheme
  } = (0, _theme.useTheme)();
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const styles = _reactNative.StyleSheet.create({
    header: {
      backgroundColor: NavigationTheme.colors.primary,
      zIndex: 2,
      borderWidth: 0,
      flexDirection: 'row',
      alignItems: 'stretch',
      minHeight: _reactNative.Platform.OS === 'ios' ? 44 : 56,
      ...NavigationTheme.header
    },
    left: {
      justifyContent: 'center',
      alignItems: 'flex-start'
    },
    titleContainer: {
      marginHorizontal: Spacing.md,
      justifyContent: 'center',
      alignItems: 'center',
      flexShrink: 1,
      maxWidth: '68%',
      width: '100%'
    },
    title: {
      textAlign: 'center'
    },
    right: {
      justifyContent: 'center',
      alignItems: 'flex-end'
    }
  });
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.header
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.left
  }, showBackButton && /*#__PURE__*/_react.default.createElement(_IconButton.default, {
    buttonLocation: _IconButton.ButtonLocation.Left,
    accessibilityLabel: t('Global.Back'),
    testID: (0, _testable.testIdWithKey)('BackButton'),
    onPress: onBackPressed,
    icon: "chevron-left"
  })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.titleContainer
  }, /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    variant: 'headerTitle',
    numberOfLines: 1,
    ellipsizeMode: "tail",
    style: styles.title
  }, title)), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.right
  }));
};
var _default = exports.default = FauxHeader;
//# sourceMappingURL=FauxHeader.js.map