"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _native = require("@react-navigation/native");
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _MaterialCommunityIcons = _interopRequireDefault(require("react-native-vector-icons/MaterialCommunityIcons"));
var _constants = require("../../constants");
var _theme = require("../../contexts/theme");
var _navigators = require("../../types/navigators");
var _PopupModal = _interopRequireDefault(require("../modals/PopupModal"));
var _Link = _interopRequireDefault(require("../texts/Link"));
var _InfoBox = require("./InfoBox");
var _UnorderedList = _interopRequireDefault(require("./UnorderedList"));
var _ThemedText = require("../texts/ThemedText");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const ConnectionAlert = ({
  connectionLabel
}) => {
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const {
    ColorPalette
  } = (0, _theme.useTheme)();
  const [infoCardVisible, setInfoCardVisible] = (0, _react.useState)(false);
  const settingsNavigation = (0, _native.useNavigation)();
  const styles = _reactNative.StyleSheet.create({
    modalCenter: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: ColorPalette.notification.popupOverlay,
      padding: 20
    },
    notifyTextContainer: {
      borderLeftColor: ColorPalette.brand.highlight,
      backgroundColor: ColorPalette.brand.secondaryBackground,
      borderLeftWidth: 10,
      flex: 1,
      paddingLeft: 10,
      paddingVertical: 15,
      marginVertical: 15
    },
    row: {
      flexDirection: 'row'
    },
    notifyTitle: {
      marginBottom: 5
    },
    notifyText: {
      marginVertical: 5
    },
    notifyTextList: {
      marginVertical: 6
    },
    informationIcon: {
      color: ColorPalette.notification.infoIcon,
      marginLeft: 10
    }
  });
  const toggleInfoCard = () => setInfoCardVisible(!infoCardVisible);
  const navigateToSettings = () => {
    toggleInfoCard();
    settingsNavigation.navigate(_navigators.Stacks.SettingStack, {
      screen: _navigators.Screens.Settings
    });
  };
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.notifyTextContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.row
  }, /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    variant: "title",
    style: styles.notifyTitle
  }, t('ConnectionAlert.AddedContacts')), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    testID: t('Global.Info'),
    accessibilityLabel: t('ConnectionAlert.WhatAreContacts'),
    accessibilityRole: 'button',
    onPress: toggleInfoCard,
    hitSlop: _constants.hitSlop
  }, /*#__PURE__*/_react.default.createElement(_MaterialCommunityIcons.default, {
    name: 'information-outline',
    size: 30,
    style: styles.informationIcon
  }))), infoCardVisible && /*#__PURE__*/_react.default.createElement(_PopupModal.default, {
    notificationType: _InfoBox.InfoBoxType.Info,
    title: t('ConnectionAlert.WhatAreContacts'),
    bodyContent: /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
      variant: "popupModalText"
    }, t('ConnectionAlert.PopupIntro')), /*#__PURE__*/_react.default.createElement(_UnorderedList.default, {
      unorderedListItems: [t('ConnectionAlert.PopupPoint1'), t('ConnectionAlert.PopupPoint2'), t('ConnectionAlert.PopupPoint3')]
    }), /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
      variant: "popupModalText"
    }, t('ConnectionAlert.SettingsInstruction')), /*#__PURE__*/_react.default.createElement(_Link.default, {
      style: {
        marginBottom: 8
      },
      onPress: navigateToSettings,
      linkText: t('ConnectionAlert.SettingsLink')
    }), /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
      variant: "popupModalText"
    }, t('ConnectionAlert.PrivacyMessage'))),
    onCallToActionLabel: t('ConnectionAlert.PopupExit'),
    onCallToActionPressed: toggleInfoCard
  }), /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    style: styles.notifyText
  }, t('ConnectionAlert.NotificationBodyUpper') + (connectionLabel ?? t('ContactDetails.AContact').toLowerCase()) + t('ConnectionAlert.NotificationBodyLower')));
};
var _default = exports.default = ConnectionAlert;
//# sourceMappingURL=ConnectionAlert.js.map