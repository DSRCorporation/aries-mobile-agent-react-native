"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.InfoBoxType = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _reactNativeDeviceInfo = require("react-native-device-info");
var _MaterialIcons = _interopRequireDefault(require("react-native-vector-icons/MaterialIcons"));
var _constants = require("../../constants");
var _theme = require("../../contexts/theme");
var _testable = require("../../utils/testable");
var _Button = _interopRequireWildcard(require("../buttons/Button"));
var _containerApi = require("../../container-api");
var _ThemedText = require("../texts/ThemedText");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
// eslint-disable-next-line import/no-named-as-default

const iconSize = 30;
let InfoBoxType = exports.InfoBoxType = /*#__PURE__*/function (InfoBoxType) {
  InfoBoxType[InfoBoxType["Info"] = 0] = "Info";
  InfoBoxType[InfoBoxType["Success"] = 1] = "Success";
  InfoBoxType[InfoBoxType["Warn"] = 2] = "Warn";
  InfoBoxType[InfoBoxType["Error"] = 3] = "Error";
  return InfoBoxType;
}({});
const InfoBox = ({
  notificationType,
  title,
  description,
  bodyContent,
  message,
  callToActionDisabled,
  callToActionIcon,
  secondaryCallToActionTitle,
  secondaryCallToActionPressed,
  secondaryCallToActionDisabled,
  secondaryCallToActionIcon,
  onCallToActionPressed,
  onCallToActionLabel,
  onClosePressed,
  showVersionFooter,
  renderShowDetails = false
}) => {
  const {
    width
  } = (0, _reactNative.useWindowDimensions)();
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const {
    TextTheme,
    ColorPalette
  } = (0, _theme.useTheme)();
  const [showDetails, setShowDetails] = (0, _react.useState)(renderShowDetails);
  const [{
    showDetailsInfo
  }] = (0, _containerApi.useServices)([_containerApi.TOKENS.CONFIG]);
  const styles = _reactNative.StyleSheet.create({
    container: {
      backgroundColor: ColorPalette.brand.modalPrimaryBackground,
      borderColor: ColorPalette.notification.infoBorder,
      borderRadius: 5,
      borderWidth: 1,
      padding: 10,
      minWidth: width - 2 * 25
    },
    headerContainer: {
      flexDirection: 'row',
      paddingHorizontal: 5,
      paddingTop: 5
    },
    bodyContainer: {
      flexDirection: 'column',
      marginLeft: 10 + iconSize,
      paddingHorizontal: 5,
      paddingBottom: 5,
      flexGrow: 0
    },
    headerText: {
      marginLeft: 7,
      flexShrink: 1,
      alignSelf: 'center',
      color: ColorPalette.notification.infoText
    },
    bodyText: {
      flexShrink: 1,
      marginVertical: 16,
      color: ColorPalette.notification.infoText
    },
    icon: {
      marginRight: 10,
      alignSelf: 'center'
    },
    showDetailsText: {
      fontWeight: TextTheme.normal.fontWeight,
      color: ColorPalette.brand.link
    }
  });
  let iconName = 'info';
  let iconColor = ColorPalette.notification.infoIcon;
  switch (notificationType) {
    case InfoBoxType.Info:
      iconName = 'info';
      iconColor = ColorPalette.notification.infoIcon;
      styles.container = {
        ...styles.container,
        backgroundColor: ColorPalette.notification.info,
        borderColor: ColorPalette.notification.infoBorder
      };
      styles.headerText = {
        ...styles.headerText,
        color: ColorPalette.notification.infoText
      };
      styles.bodyText = {
        ...styles.bodyText,
        color: ColorPalette.notification.infoText
      };
      break;
    case InfoBoxType.Success:
      iconName = 'check-circle';
      iconColor = ColorPalette.notification.successIcon;
      styles.container = {
        ...styles.container,
        backgroundColor: ColorPalette.notification.success,
        borderColor: ColorPalette.notification.successBorder
      };
      styles.headerText = {
        ...styles.headerText,
        color: ColorPalette.notification.successText
      };
      styles.bodyText = {
        ...styles.bodyText,
        color: ColorPalette.notification.successText
      };
      break;
    case InfoBoxType.Warn:
      iconName = 'warning';
      iconColor = ColorPalette.notification.warnIcon;
      styles.container = {
        ...styles.container,
        backgroundColor: ColorPalette.notification.warn,
        borderColor: ColorPalette.notification.warnBorder
      };
      styles.headerText = {
        ...styles.headerText,
        color: ColorPalette.notification.warnText
      };
      styles.bodyText = {
        ...styles.bodyText,
        color: ColorPalette.notification.warnText
      };
      break;
    case InfoBoxType.Error:
      iconName = 'error';
      iconColor = ColorPalette.notification.errorIcon;
      styles.container = {
        ...styles.container,
        backgroundColor: ColorPalette.notification.error,
        borderColor: ColorPalette.notification.errorBorder
      };
      styles.headerText = {
        ...styles.headerText,
        color: ColorPalette.notification.errorText
      };
      styles.bodyText = {
        ...styles.bodyText,
        color: ColorPalette.notification.errorText
      };
      break;
    default:
      throw new Error('InfoTextBoxType needs to be set correctly');
  }
  const onShowDetailsTouched = () => {
    setShowDetails(true);
  };
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.headerContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.icon, {
      flexDirection: 'row'
    }]
  }, /*#__PURE__*/_react.default.createElement(_MaterialIcons.default, {
    accessible: false,
    name: iconName,
    size: iconSize,
    color: iconColor
  }), /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    variant: "bold",
    style: styles.headerText,
    testID: (0, _testable.testIdWithKey)('HeaderText')
  }, title)), onClosePressed && /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    accessibilityLabel: t('Global.Dismiss'),
    accessibilityRole: 'button',
    testID: (0, _testable.testIdWithKey)(`Dismiss${notificationType}`),
    onPress: onClosePressed,
    hitSlop: _constants.hitSlop
  }, /*#__PURE__*/_react.default.createElement(_MaterialIcons.default, {
    name: 'close',
    size: iconSize,
    color: ColorPalette.notification.infoIcon
  })))), /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
    style: styles.bodyContainer
  }, /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, !showDetails ? bodyContent : null, (description || message && showDetails) && /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    style: styles.bodyText,
    testID: (0, _testable.testIdWithKey)('BodyText')
  }, showDetails ? message : description), message && !showDetails && (showDetailsInfo ?? true) && /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    accessibilityLabel: t('Global.ShowDetails'),
    accessibilityRole: "button",
    testID: (0, _testable.testIdWithKey)('ShowDetails'),
    style: {
      marginVertical: 14
    },
    onPress: onShowDetailsTouched,
    hitSlop: _constants.hitSlop
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      flexDirection: 'row'
    }
  }, /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    variant: "title",
    style: styles.showDetailsText
  }, t('Global.ShowDetails'), ' '), /*#__PURE__*/_react.default.createElement(_MaterialIcons.default, {
    name: "chevron-right",
    size: iconSize,
    color: ColorPalette.brand.link
  }))), onCallToActionPressed && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      paddingTop: 10
    }
  }, /*#__PURE__*/_react.default.createElement(_Button.default, {
    title: onCallToActionLabel || t('Global.Okay'),
    accessibilityLabel: onCallToActionLabel || t('Global.Okay'),
    testID: onCallToActionLabel ? (0, _testable.testIdWithKey)(onCallToActionLabel) : (0, _testable.testIdWithKey)('Okay'),
    buttonType: _Button.ButtonType.Primary,
    onPress: onCallToActionPressed,
    disabled: callToActionDisabled
  }, callToActionIcon)), secondaryCallToActionTitle && secondaryCallToActionPressed && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      paddingTop: 10
    }
  }, /*#__PURE__*/_react.default.createElement(_Button.default, {
    title: secondaryCallToActionTitle,
    accessibilityLabel: secondaryCallToActionTitle,
    testID: (0, _testable.testIdWithKey)(secondaryCallToActionTitle),
    buttonType: _Button.ButtonType.Secondary,
    onPress: secondaryCallToActionPressed,
    disabled: secondaryCallToActionDisabled
  }, secondaryCallToActionIcon)), showVersionFooter ? /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    variant: "caption",
    style: {
      flex: 1,
      marginTop: 8,
      textAlign: 'center'
    },
    testID: (0, _testable.testIdWithKey)('VersionNumber')
  }, `${t('Settings.Version')} ${(0, _reactNativeDeviceInfo.getVersion)()} (${(0, _reactNativeDeviceInfo.getBuildNumber)()})`) : null)));
};
var _default = exports.default = InfoBox;
//# sourceMappingURL=InfoBox.js.map