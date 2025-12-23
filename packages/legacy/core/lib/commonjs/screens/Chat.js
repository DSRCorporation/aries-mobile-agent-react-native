"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _core = require("@credo-ts/core");
var _reactHooks = require("@credo-ts/react-hooks");
var _native = require("@react-navigation/native");
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
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
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
    assertConnectedNetwork,
    silentAssertConnectedNetwork
  } = (0, _network.useNetwork)();
  const [showActionSlider, setShowActionSlider] = (0, _react.useState)(false);
  const theme = (0, _theme.useTheme)();
  const {
    ColorPallet,
    ChatTheme,
    Assets
  } = theme;
  const [theirLabel, setTheirLabel] = (0, _react.useState)((0, _helpers.getConnectionName)(connection, store.preferences.alternateContactNames));

  // This useEffect is for properly rendering changes to the alt contact name, useMemo did not pick them up
  (0, _react.useEffect)(() => {
    setTheirLabel((0, _helpers.getConnectionName)(connection, store.preferences.alternateContactNames));
  }, [isFocused, connection, store.preferences.alternateContactNames]);
  (0, _react.useMemo)(() => {
    assertConnectedNetwork();
  }, []);
  (0, _react.useEffect)(() => {
    navigation.setOptions({
      title: theirLabel,
      headerRight: () => /*#__PURE__*/_react.default.createElement(_InfoIcon.default, {
        connectionId: connection === null || connection === void 0 ? void 0 : connection.id
      })
    });
  }, [connection, theirLabel]);

  // when chat is open, mark messages as seen
  (0, _react.useEffect)(() => {
    basicMessages.forEach(msg => {
      const meta = msg.metadata.get(_metadata.BasicMessageMetadata.customMetadata);
      if (agent && !(meta !== null && meta !== void 0 && meta.seen)) {
        msg.metadata.set(_metadata.BasicMessageMetadata.customMetadata, {
          ...meta,
          seen: true
        });
        const basicMessageRepository = agent.context.dependencyManager.resolve(_core.BasicMessageRepository);
        basicMessageRepository.update(agent.context, msg);
      }
    });
  }, [basicMessages]);
  const onSend = (0, _react.useCallback)(async messages => {
    await (agent === null || agent === void 0 ? void 0 : agent.basicMessages.sendMessage(connectionId, messages[0].text));
  }, [agent, connectionId]);
  const onSendRequest = (0, _react.useCallback)(async () => {
    navigation.navigate(_navigators.Stacks.ProofRequestsStack, {
      screen: _navigators.Screens.ProofRequests,
      params: {
        navigation: navigation,
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
  }, [t, store.preferences.useVerifierCapability, onSendRequest]);
  const onDismiss = () => {
    setShowActionSlider(false);
  };
  return /*#__PURE__*/_react.default.createElement(_reactNativeSafeAreaContext.SafeAreaView, {
    edges: ['bottom', 'left', 'right'],
    style: {
      flex: 1,
      backgroundColor: ColorPallet.grayscale.white,
      borderRadius: 24
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNativeGiftedChat.GiftedChat, {
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
  }));
};
var _default = exports.default = Chat;
//# sourceMappingURL=Chat.js.map