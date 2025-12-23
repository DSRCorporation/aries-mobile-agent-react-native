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
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const ConnectionAlert = ({
  connectionID
}) => {
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const {
    ColorPallet,
    TextTheme
  } = (0, _theme.useTheme)();
  const [infoCardVisible, setInfoCardVisible] = (0, _react.useState)(false);
  const settingsNavigation = (0, _native.useNavigation)();
  const styles = _reactNative.StyleSheet.create({
    modalCenter: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: ColorPallet.notification.popupOverlay,
      padding: 20
    },
    notifyTextContainer: {
      borderLeftColor: ColorPallet.brand.highlight,
      backgroundColor: ColorPallet.brand.secondaryBackground,
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
      ...TextTheme.title,
      marginBottom: 5
    },
    notifyText: {
      ...TextTheme.normal,
      marginVertical: 5
    },
    modalText: {
      ...TextTheme.popupModalText
    },
    notifyTextList: {
      marginVertical: 6
    },
    informationIcon: {
      color: ColorPallet.notification.infoIcon,
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
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
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
    bodyContent: /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: styles.modalText
    }, t('ConnectionAlert.PopupIntro')), /*#__PURE__*/_react.default.createElement(_UnorderedList.default, {
      unorderedListItems: [t('ConnectionAlert.PopupPoint1'), t('ConnectionAlert.PopupPoint2'), t('ConnectionAlert.PopupPoint3')]
    }), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: styles.modalText
    }, t('ConnectionAlert.SettingsInstruction')), /*#__PURE__*/_react.default.createElement(_Link.default, {
      style: {
        marginBottom: 8
      },
      onPress: navigateToSettings,
      linkText: t('ConnectionAlert.SettingsLink')
    }), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: styles.modalText
    }, t('ConnectionAlert.PrivacyMessage'))),
    onCallToActionLabel: t('ConnectionAlert.PopupExit'),
    onCallToActionPressed: toggleInfoCard
  }), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.notifyText
  }, t('ConnectionAlert.NotificationBodyUpper') + (connectionID || t('ContactDetails.AContact').toLowerCase()) + t('ConnectionAlert.NotificationBodyLower')));
};
var _default = exports.default = ConnectionAlert;
//# sourceMappingURL=ConnectionAlert.js.map