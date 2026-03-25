"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _MaterialIcons = _interopRequireDefault(require("react-native-vector-icons/MaterialIcons"));
var _constants = require("../../constants");
var _theme = require("../../contexts/theme");
var _testable = require("../../utils/testable");
var _Button = _interopRequireWildcard(require("../buttons/Button"));
var _ThemedText = require("../texts/ThemedText");
var _SafeAreaModal = _interopRequireDefault(require("./SafeAreaModal"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const DismissiblePopupModal = ({
  title,
  description,
  onCallToActionPressed,
  onCallToActionLabel,
  onDismissPressed
}) => {
  const {
    height,
    width,
    fontScale
  } = (0, _reactNative.useWindowDimensions)();
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const {
    ColorPalette,
    TextTheme
  } = (0, _theme.useTheme)();
  const iconSize = 30;
  const styles = _reactNative.StyleSheet.create({
    modalCenter: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: ColorPalette.notification.popupOverlay,
      padding: 20,
      minHeight: height,
      minWidth: width
    },
    container: {
      backgroundColor: ColorPalette.brand.modalPrimaryBackground,
      borderColor: ColorPalette.brand.modalSecondaryBackground,
      borderRadius: 5,
      borderWidth: 1,
      padding: 10,
      minWidth: width - 2 * 25,
      maxWidth: width,
      flex: 1,
      maxHeight: fontScale < 1.7 ? '50%' : '70%'
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 5,
      paddingTop: 5
    },
    bodyContainer: {
      marginLeft: 10 + iconSize,
      paddingHorizontal: 5,
      paddingBottom: 5,
      flexShrink: 1,
      justifyContent: 'space-between'
    },
    headerTextContainer: {
      ...(fontScale < 1.7 ? {
        flexGrow: 1
      } : {
        flexShrink: 1
      })
    },
    headerText: {
      ...TextTheme.bold,
      alignSelf: 'flex-start',
      color: ColorPalette.notification.infoText
    },
    scrollViewContentContainer: {
      flexGrow: 1
    },
    scrollViewStyle: {
      flex: 1
    },
    bodyText: {
      ...TextTheme.normal,
      paddingVertical: 16,
      color: ColorPalette.notification.infoText
    },
    footer: {
      paddingTop: 10
    },
    infoIcon: {
      marginRight: 10,
      alignSelf: 'center'
    },
    dismissIcon: {
      alignSelf: fontScale < 1.7 ? 'flex-end' : 'flex-start'
    }
  });
  const infoIconName = 'info';
  const dismissIconName = 'clear';
  const iconColor = ColorPalette.notification.infoIcon;
  return /*#__PURE__*/_react.default.createElement(_SafeAreaModal.default, {
    transparent: true
  }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    onPress: onDismissPressed,
    accessible: false
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.modalCenter
  }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableWithoutFeedback, {
    accessible: false
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.headerContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.infoIcon
  }, /*#__PURE__*/_react.default.createElement(_MaterialIcons.default, {
    name: infoIconName,
    size: iconSize,
    color: iconColor
  })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.headerTextContainer
  }, /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    variant: "bold",
    style: styles.headerText,
    testID: (0, _testable.testIdWithKey)('HeaderText')
  }, title)), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.dismissIcon
  }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    onPress: onDismissPressed,
    testID: (0, _testable.testIdWithKey)('Dismiss'),
    accessibilityLabel: t('Global.Dismiss'),
    accessibilityRole: 'button',
    hitSlop: _constants.hitSlop
  }, /*#__PURE__*/_react.default.createElement(_MaterialIcons.default, {
    name: dismissIconName,
    size: iconSize,
    color: iconColor
  })))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.bodyContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
    showsVerticalScrollIndicator: false,
    contentContainerStyle: styles.scrollViewContentContainer,
    style: styles.scrollViewStyle
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    onStartShouldSetResponder: () => true
  }, /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    selectable: true,
    style: styles.bodyText,
    testID: (0, _testable.testIdWithKey)('BodyText')
  }, description))), onCallToActionPressed && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.footer
  }, /*#__PURE__*/_react.default.createElement(_Button.default, {
    title: onCallToActionLabel || t('Global.Okay'),
    accessibilityLabel: onCallToActionLabel || t('Global.Okay'),
    testID: (0, _testable.testIdWithKey)('Okay'),
    buttonType: _Button.ButtonType.ModalPrimary,
    onPress: onCallToActionPressed
  }))))))));
};
var _default = exports.default = DismissiblePopupModal;
//# sourceMappingURL=DismissiblePopupModal.js.map