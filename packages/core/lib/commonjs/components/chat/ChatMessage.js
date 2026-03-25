"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChatMessage = exports.CallbackType = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _reactNativeGiftedChat = require("react-native-gifted-chat");
var _constants = require("../../constants");
var _theme = require("../../contexts/theme");
var _chat = require("../../types/chat");
var _helpers = require("../../utils/helpers");
var _testable = require("../../utils/testable");
var _ThemedText = require("../texts/ThemedText");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
let CallbackType = exports.CallbackType = /*#__PURE__*/function (CallbackType) {
  CallbackType["CredentialOffer"] = "CredentialOffer";
  CallbackType["ProofRequest"] = "ProofRequest";
  CallbackType["PresentationSent"] = "PresentationSent";
  return CallbackType;
}({});
const MessageTime = ({
  message
}) => {
  const {
    ChatTheme: theme
  } = (0, _theme.useTheme)();
  return /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    style: message.user._id === _chat.Role.me ? theme.timeStyleRight : theme.timeStyleLeft
  }, (0, _helpers.formatTime)(message.createdAt, {
    includeHour: true,
    chatFormat: true,
    trim: true
  }));
};
const MessageIcon = ({
  type
}) => {
  const {
    ChatTheme: theme,
    Assets
  } = (0, _theme.useTheme)();
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      ...theme.documentIconContainer
    }
  }, type === CallbackType.CredentialOffer && /*#__PURE__*/_react.default.createElement(Assets.svg.iconCredentialOfferLight, {
    width: 40,
    height: 40
  }), type === CallbackType.PresentationSent && /*#__PURE__*/_react.default.createElement(Assets.svg.iconInfoSentLight, {
    width: 40,
    height: 40
  }), type === CallbackType.ProofRequest && /*#__PURE__*/_react.default.createElement(Assets.svg.iconProofRequestLight, {
    width: 40,
    height: 40
  }));
};
const ChatMessage = ({
  messageProps
}) => {
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const {
    ChatTheme: theme
  } = (0, _theme.useTheme)();
  const message = (0, _react.useMemo)(() => messageProps.currentMessage, [messageProps]);
  const textForCallbackType = callbackType => {
    // Receiving a credential offer
    if (callbackType === CallbackType.CredentialOffer) {
      return t('Chat.ViewOffer');
    }

    // Receiving a proof request
    if (callbackType === CallbackType.ProofRequest) {
      return t('Chat.ViewRequest');
    }

    // After a presentation of a proof
    if (callbackType === CallbackType.PresentationSent) {
      return t('Chat.OpenPresentation');
    }
    return t('Chat.OpenItem');
  };
  const testIdForCallbackType = callbackType => {
    const text = textForCallbackType(callbackType);
    const textWithoutSpaces = text.replace(/\s+/g, '');
    return (0, _testable.testIdWithKey)(textWithoutSpaces);
  };
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      flexDirection: 'row',
      justifyContent: message.user._id === _chat.Role.me ? 'flex-end' : 'flex-start'
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      ...theme.containerStyle
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNativeGiftedChat.Bubble, _extends({}, messageProps, {
    key: messageProps.key,
    renderUsernameOnMessage: false,
    renderMessageText: () => message.renderEvent(),
    containerStyle: {
      left: {
        margin: 0
      },
      right: {
        margin: 0
      }
    },
    wrapperStyle: {
      left: {
        ...theme.leftBubble,
        marginRight: 0,
        marginLeft: 0
      },
      right: {
        ...theme.rightBubble,
        marginLeft: 0,
        marginRight: 0
      }
    },
    textStyle: {
      left: {
        ...theme.leftText
      },
      right: {
        ...theme.rightText
      }
    },
    renderTime: () => /*#__PURE__*/_react.default.createElement(MessageTime, {
      message: message
    }),
    renderCustomView: () => message.messageOpensCallbackType ? /*#__PURE__*/_react.default.createElement(MessageIcon, {
      type: message.messageOpensCallbackType
    }) : null
  })), message.messageOpensCallbackType && /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    accessibilityLabel: textForCallbackType(message.messageOpensCallbackType),
    accessibilityRole: "button",
    testID: testIdForCallbackType(message.messageOpensCallbackType),
    onPress: () => {
      if (message.onDetails) message.onDetails();
    },
    style: {
      ...theme.openButtonStyle
    },
    hitSlop: _constants.hitSlop
  }, /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    style: {
      ...theme.openButtonTextStyle
    }
  }, textForCallbackType(message.messageOpensCallbackType)))));
};
exports.ChatMessage = ChatMessage;
//# sourceMappingURL=ChatMessage.js.map