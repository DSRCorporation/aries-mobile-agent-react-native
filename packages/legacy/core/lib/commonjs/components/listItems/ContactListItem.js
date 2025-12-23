"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _store = require("../../contexts/store");
var _theme = require("../../contexts/theme");
var _chatMessages = require("../../hooks/chat-messages");
var _navigators = require("../../types/navigators");
var _helpers = require("../../utils/helpers");
var _testable = require("../../utils/testable");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const ContactListItem = ({
  contact,
  navigation
}) => {
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const {
    TextTheme,
    ColorPallet,
    ListItems
  } = (0, _theme.useTheme)();
  const messages = (0, _chatMessages.useChatMessagesByConnection)(contact);
  const message = messages[0];
  const hasOnlyInitialMessage = messages.length < 2;
  const [store] = (0, _store.useStore)();
  const styles = _reactNative.StyleSheet.create({
    container: {
      flexDirection: 'row',
      padding: 16,
      backgroundColor: ColorPallet.brand.secondaryBackground
    },
    avatarContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 50,
      height: 50,
      borderRadius: 25,
      borderColor: ListItems.avatarCircle.borderColor,
      borderWidth: 1,
      marginRight: 16
    },
    avatarPlaceholder: {
      ...TextTheme.headingFour,
      textAlign: 'center'
    },
    avatarImage: {
      width: 30,
      height: 30
    },
    contactNameContainer: {
      flex: 1,
      paddingVertical: 4
    },
    nameAndTimeContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      flex: 1
    },
    contactNameText: {
      ...TextTheme.labelTitle
    },
    timeContainer: {
      paddingVertical: 4,
      alignSelf: 'center'
    },
    timeText: {
      color: TextTheme.normal.color
    }
  });
  const navigateToContact = (0, _react.useCallback)(() => {
    var _navigation$getParent;
    (_navigation$getParent = navigation.getParent()) === null || _navigation$getParent === void 0 || _navigation$getParent.navigate(_navigators.Stacks.ContactStack, {
      screen: _navigators.Screens.Chat,
      params: {
        connectionId: contact.id
      }
    });
  }, [contact]);
  const contactLabel = (0, _react.useMemo)(() => (0, _helpers.getConnectionName)(contact, store.preferences.alternateContactNames), [contact, store.preferences.alternateContactNames]);
  const contactLabelAbbr = (0, _react.useMemo)(() => contactLabel === null || contactLabel === void 0 ? void 0 : contactLabel.charAt(0).toUpperCase(), [contact, store.preferences.alternateContactNames]);
  return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    onPress: navigateToContact,
    testID: (0, _testable.testIdWithKey)('Contact'),
    accessibilityLabel: t('ContactDetails.AContact')
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.avatarContainer
  }, contact.imageUrl ? /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
    style: styles.avatarImage,
    source: {
      uri: contact.imageUrl
    }
  })) : /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.avatarPlaceholder
  }, contactLabelAbbr)), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.nameAndTimeContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.contactNameContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.contactNameText
  }, contactLabel)), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.timeContainer
  }, message && /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.timeText
  }, (0, _helpers.formatTime)(message.createdAt, {
    shortMonth: true,
    trim: true
  })))), /*#__PURE__*/_react.default.createElement(_reactNative.View, null, message && !hasOnlyInitialMessage && /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: TextTheme.normal,
    numberOfLines: 1,
    ellipsizeMode: 'tail'
  }, message.text)))));
};
var _default = exports.default = ContactListItem;
//# sourceMappingURL=ContactListItem.js.map