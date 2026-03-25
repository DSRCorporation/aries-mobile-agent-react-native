"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactHooks = require("@bifold/react-hooks");
var _didcomm = require("@credo-ts/didcomm");
var _native = require("@react-navigation/native");
var _elements = require("@react-navigation/elements");
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNativeGiftedChat = require("react-native-gifted-chat");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _InfoIcon = _interopRequireDefault(require("../components/buttons/InfoIcon"));
var _chat = require("../components/chat");
var _ActionSlider = _interopRequireDefault(require("../components/chat/ActionSlider"));
var _ChatActions = require("../components/chat/ChatActions");
var _ChatMessage = require("../components/chat/ChatMessage");
var _network = require("../contexts/network");
var _store = require("../contexts/store");
var _theme = require("../contexts/theme");
var _chatMessages = require("../hooks/chat-messages");
var _chat2 = require("../types/chat");
var _metadata = require("../types/metadata");
var _navigators = require("../types/navigators");
var _helpers = require("../utils/helpers");
var _reactNative = require("react-native");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const Chat = ({
  route
}) => {
  if (!(route !== null && route !== void 0 && route.params)) {
    throw new Error('Chat route params were not set properly');
  }
  const {
    connectionId
  } = route.params;
  const [store] = (0, _store.useStore)();
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const {
    agent
  } = (0, _reactHooks.useAgent)();
  const navigation = (0, _native.useNavigation)();
  const connection = (0, _reactHooks.useConnectionById)(connectionId);
  const basicMessages = (0, _reactHooks.useBasicMessagesByConnectionId)(connectionId);
  const chatMessages = (0, _chatMessages.useChatMessagesByConnection)(connection);
  const isFocused = (0, _native.useIsFocused)();
  const {
    assertNetworkConnected,
    silentAssertConnectedNetwork
  } = (0, _network.useNetwork)();
  const [showActionSlider, setShowActionSlider] = (0, _react.useState)(false);
  const theme = (0, _theme.useTheme)();
  const {
    ColorPalette,
    ChatTheme,
    Assets
  } = theme;
  const [theirLabel, setTheirLabel] = (0, _react.useState)((0, _helpers.getConnectionName)(connection, store.preferences.alternateContactNames));
  const headerHeight = (0, _elements.useHeaderHeight)();

  // This useEffect is for properly rendering changes to the alt contact name, useMemo did not pick them up
  (0, _react.useEffect)(() => {
    setTheirLabel((0, _helpers.getConnectionName)(connection, store.preferences.alternateContactNames));
  }, [isFocused, connection, store.preferences.alternateContactNames]);
  (0, _react.useEffect)(() => {
    assertNetworkConnected();
  }, [assertNetworkConnected]);
  (0, _react.useEffect)(() => {
    navigation.setOptions({
      title: theirLabel,
      headerRight: () => /*#__PURE__*/_react.default.createElement(_InfoIcon.default, {
        connectionId: connection === null || connection === void 0 ? void 0 : connection.id
      })
    });
  }, [navigation, theirLabel, connection]);

  // when chat is open, mark messages as seen
  (0, _react.useEffect)(() => {
    basicMessages.forEach(msg => {
      const meta = msg.metadata.get(_metadata.BasicMessageMetadata.customMetadata);
      if (agent && !(meta !== null && meta !== void 0 && meta.seen)) {
        msg.metadata.set(_metadata.BasicMessageMetadata.customMetadata, {
          ...meta,
          seen: true
        });
        const basicMessageRepository = agent.context.dependencyManager.resolve(_didcomm.DidCommBasicMessageRepository); // Should maybe be resolved differently
        basicMessageRepository.update(agent.context, msg);
      }
    });
  }, [basicMessages, agent]);
  const onSend = (0, _react.useCallback)(async messages => {
    await (agent === null || agent === void 0 ? void 0 : agent.modules.didcomm.basicMessages.sendMessage(connectionId, messages[0].text));
  }, [agent, connectionId]);
  const onSendRequest = (0, _react.useCallback)(async () => {
    navigation.navigate(_navigators.Stacks.ProofRequestsStack, {
      screen: _navigators.Screens.ProofRequests,
      params: {
        connectionId
      }
    });
  }, [navigation, connectionId]);
  const actions = (0, _react.useMemo)(() => {
    return store.preferences.useVerifierCapability ? [{
      text: t('Verifier.SendProofRequest'),
      onPress: () => {
        setShowActionSlider(false);
        onSendRequest();
      },
      icon: () => /*#__PURE__*/_react.default.createElement(Assets.svg.iconInfoSentDark, {
        height: 30,
        width: 30
      })
    }] : undefined;
  }, [store.preferences.useVerifierCapability, t, onSendRequest, Assets]);
  const onDismiss = (0, _react.useCallback)(() => {
    setShowActionSlider(false);
  }, []);
  return /*#__PURE__*/_react.default.createElement(_reactNativeSafeAreaContext.SafeAreaView, {
    edges: ['bottom', 'left', 'right'],
    style: {
      flex: 1,
      backgroundColor: ColorPalette.grayscale.white,
      borderRadius: 24
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.KeyboardAvoidingView, {
    style: {
      flex: 1
    },
    behavior: _reactNative.Platform.OS === 'ios' ? undefined : 'padding',
    keyboardVerticalOffset: headerHeight
  }, /*#__PURE__*/_react.default.createElement(_reactNativeGiftedChat.GiftedChat, {
    keyboardShouldPersistTaps: 'handled',
    messages: chatMessages,
    showAvatarForEveryMessage: true,
    alignTop: true,
    renderAvatar: () => null,
    messageIdGenerator: msg => (msg === null || msg === void 0 ? void 0 : msg._id.toString()) || '0',
    renderMessage: props => /*#__PURE__*/_react.default.createElement(_ChatMessage.ChatMessage, {
      messageProps: props
    }),
    renderInputToolbar: props => (0, _chat.renderInputToolbar)(props, ChatTheme),
    renderSend: props => (0, _chat.renderSend)(props, ChatTheme),
    renderComposer: props => (0, _chat.renderComposer)(props, ChatTheme, t('Contacts.TypeHere')),
    disableComposer: !silentAssertConnectedNetwork(),
    onSend: onSend,
    user: {
      _id: _chat2.Role.me
    },
    renderActions: props => (0, _ChatActions.renderActions)(props, ChatTheme, actions),
    onPressActionButton: actions ? () => setShowActionSlider(true) : undefined
  }), showActionSlider && /*#__PURE__*/_react.default.createElement(_ActionSlider.default, {
    onDismiss: onDismiss,
    actions: actions
  })));
};
var _default = exports.default = Chat;
//# sourceMappingURL=Chat.js.map