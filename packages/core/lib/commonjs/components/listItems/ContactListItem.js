"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _store = require("../../contexts/store");
var _theme = require("../../contexts/theme");
var _chatMessages = require("../../hooks/chat-messages");
var _navigators = require("../../types/navigators");
var _helpers = require("../../utils/helpers");
var _testable = require("../../utils/testable");
var _containerApi = require("../../container-api");
var _ThemedText = require("../texts/ThemedText");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const ContactListItem = ({
  contact,
  navigation
}) => {
  const {
    ColorPalette,
    ListItems
  } = (0, _theme.useTheme)();
  const messages = (0, _chatMessages.useChatMessagesByConnection)(contact);
  const message = messages[0];
  const hasOnlyInitialMessage = messages.length < 2;
  const [store] = (0, _store.useStore)();
  const [{
    enableChat
  }] = (0, _containerApi.useServices)([_containerApi.TOKENS.CONFIG]);
  const styles = _reactNative.StyleSheet.create({
    container: {
      flexDirection: 'row',
      padding: 16,
      backgroundColor: ColorPalette.brand.secondaryBackground
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
    timeContainer: {
      paddingVertical: 4,
      alignSelf: 'center'
    }
  });
  const navigateToContact = (0, _react.useCallback)(() => {
    var _navigation$getParent;
    (_navigation$getParent = navigation.getParent()) === null || _navigation$getParent === void 0 || _navigation$getParent.navigate(_navigators.Stacks.ContactStack, {
      screen: enableChat ? _navigators.Screens.Chat : _navigators.Screens.ContactDetails,
      params: {
        connectionId: contact.id
      }
    });
  }, [navigation, contact, enableChat]);
  const contactLabel = (0, _react.useMemo)(() => (0, _helpers.getConnectionName)(contact, store.preferences.alternateContactNames), [contact, store.preferences.alternateContactNames]);
  const contactLabelAbbr = (0, _react.useMemo)(() => contactLabel === null || contactLabel === void 0 ? void 0 : contactLabel.charAt(0).toUpperCase(), [contactLabel]);
  return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    onPress: navigateToContact,
    testID: (0, _testable.testIdWithKey)('Contact'),
    accessibilityLabel: contactLabel,
    accessibilityRole: "button"
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.avatarContainer
  }, contact.imageUrl ? /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
    style: styles.avatarImage,
    source: {
      uri: contact.imageUrl
    }
  })) : /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    allowFontScaling: false,
    variant: "headingFour",
    style: styles.avatarPlaceholder
  }, contactLabelAbbr)), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.nameAndTimeContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.contactNameContainer
  }, /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    variant: "labelTitle"
  }, contactLabel)), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.timeContainer
  }, message && /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, null, (0, _helpers.formatTime)(message.createdAt, {
    shortMonth: true,
    trim: true
  })))), /*#__PURE__*/_react.default.createElement(_reactNative.View, null, message && !hasOnlyInitialMessage && /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    numberOfLines: 1,
    ellipsizeMode: 'tail'
  }, message.text)))));
};
var _default = exports.default = ContactListItem;
//# sourceMappingURL=ContactListItem.js.map