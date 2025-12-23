"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.InfoBoxType = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _MaterialIcons = _interopRequireDefault(require("react-native-vector-icons/MaterialIcons"));
var _constants = require("../../constants");
var _theme = require("../../contexts/theme");
var _testable = require("../../utils/testable");
var _Button = _interopRequireWildcard(require("../buttons/Button"));
var _containerApi = require("../../container-api");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
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
  secondaryCallToActionTitle,
  secondaryCallToActionPressed,
  onCallToActionPressed,
  onCallToActionLabel,
  onClosePressed
}) => {
  const {
    width
  } = (0, _reactNative.useWindowDimensions)();
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const {
    TextTheme,
    ColorPallet
  } = (0, _theme.useTheme)();
  const [showDetails, setShowDetails] = (0, _react.useState)(false);
  const [{
    showDetailsInfo
  }] = (0, _containerApi.useServices)([_containerApi.TOKENS.CONFIG]);
  const styles = _reactNative.StyleSheet.create({
    container: {
      backgroundColor: ColorPallet.brand.modalPrimaryBackground,
      borderColor: ColorPallet.notification.infoBorder,
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
      ...TextTheme.bold,
      marginLeft: 7,
      flexShrink: 1,
      alignSelf: 'center',
      color: ColorPallet.notification.infoText
    },
    bodyText: {
      ...TextTheme.normal,
      flexShrink: 1,
      marginVertical: 16,
      color: ColorPallet.notification.infoText
    },
    icon: {
      marginRight: 10,
      alignSelf: 'center'
    },
    showDetailsText: {
      ...TextTheme.title,
      fontWeight: TextTheme.normal.fontWeight,
      color: ColorPallet.brand.link
    }
  });
  let iconName = 'info';
  let iconColor = ColorPallet.notification.infoIcon;
  switch (notificationType) {
    case InfoBoxType.Info:
      iconName = 'info';
      iconColor = ColorPallet.notification.infoIcon;
      styles.container = {
        ...styles.container,
        backgroundColor: ColorPallet.notification.info,
        borderColor: ColorPallet.notification.infoBorder
      };
      styles.headerText = {
        ...styles.headerText,
        color: ColorPallet.notification.infoText
      };
      styles.bodyText = {
        ...styles.bodyText,
        color: ColorPallet.notification.infoText
      };
      break;
    case InfoBoxType.Success:
      iconName = 'check-circle';
      iconColor = ColorPallet.notification.successIcon;
      styles.container = {
        ...styles.container,
        backgroundColor: ColorPallet.notification.success,
        borderColor: ColorPallet.notification.successBorder
      };
      styles.headerText = {
        ...styles.headerText,
        color: ColorPallet.notification.successText
      };
      styles.bodyText = {
        ...styles.bodyText,
        color: ColorPallet.notification.successText
      };
      break;
    case InfoBoxType.Warn:
      iconName = 'warning';
      iconColor = ColorPallet.notification.warnIcon;
      styles.container = {
        ...styles.container,
        backgroundColor: ColorPallet.notification.warn,
        borderColor: ColorPallet.notification.warnBorder
      };
      styles.headerText = {
        ...styles.headerText,
        color: ColorPallet.notification.warnText
      };
      styles.bodyText = {
        ...styles.bodyText,
        color: ColorPallet.notification.warnText
      };
      break;
    case InfoBoxType.Error:
      iconName = 'error';
      iconColor = ColorPallet.notification.errorIcon;
      styles.container = {
        ...styles.container,
        backgroundColor: ColorPallet.notification.error,
        borderColor: ColorPallet.notification.errorBorder
      };
      styles.headerText = {
        ...styles.headerText,
        color: ColorPallet.notification.errorText
      };
      styles.bodyText = {
        ...styles.bodyText,
        color: ColorPallet.notification.errorText
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
  }), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
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
    color: ColorPallet.notification.infoIcon
  })))), /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
    style: styles.bodyContainer
  }, /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, !showDetails ? bodyContent : null, (description || message && showDetails) && /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.bodyText,
    testID: (0, _testable.testIdWithKey)('BodyText')
  }, showDetails ? message : description), message && !showDetails && (showDetailsInfo ?? true) && /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    accessibilityLabel: t('Global.ShowDetails'),
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
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.showDetailsText
  }, t('Global.ShowDetails'), " "), /*#__PURE__*/_react.default.createElement(_MaterialIcons.default, {
    name: "chevron-right",
    size: iconSize,
    color: ColorPallet.brand.link
  }))), onCallToActionPressed && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      paddingTop: 10
    }
  }, /*#__PURE__*/_react.default.createElement(_Button.default, {
    title: onCallToActionLabel || t('Global.Okay'),
    accessibilityLabel: onCallToActionLabel || t('Global.Okay'),
    testID: onCallToActionLabel ? (0, _testable.testIdWithKey)(onCallToActionLabel) : (0, _testable.testIdWithKey)('Okay'),
    buttonType: _Button.ButtonType.Primary,
    onPress: onCallToActionPressed
  })), secondaryCallToActionTitle && secondaryCallToActionPressed && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      paddingTop: 10
    }
  }, /*#__PURE__*/_react.default.createElement(_Button.default, {
    title: secondaryCallToActionTitle,
    accessibilityLabel: secondaryCallToActionTitle,
    testID: (0, _testable.testIdWithKey)(secondaryCallToActionTitle),
    buttonType: _Button.ButtonType.Secondary,
    onPress: secondaryCallToActionPressed
  })))));
};
var _default = exports.default = InfoBox;
//# sourceMappingURL=InfoBox.js.map