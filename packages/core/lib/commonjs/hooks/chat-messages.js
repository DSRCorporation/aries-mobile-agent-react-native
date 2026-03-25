"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useChatMessagesByConnection = void 0;
var _reactHooks = require("@bifold/react-hooks");
var _didcomm = require("@credo-ts/didcomm");
var _verifier = require("@bifold/verifier");
var _native = require("@react-navigation/native");
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _ChatEvent = require("../components/chat/ChatEvent");
var _ChatMessage = require("../components/chat/ChatMessage");
var _store = require("../contexts/store");
var _theme = require("../contexts/theme");
var _credentials = require("./credentials");
var _proofs = require("./proofs");
var _chat = require("../types/chat");
var _navigators = require("../types/navigators");
var _helpers = require("../utils/helpers");
var _ThemedText = require("../components/texts/ThemedText");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
/**
 * Determines the callback to be called when the button below a given chat message is pressed, if it exists.
 *
 * eg. 'View offer' -> opens the credential offer screen
 *
 * @param {DidCommCredentialExchangeRecord | DidCommProofExchangeRecord} record - The record to determine the callback type for.
 * @returns {CallbackType} The callback type for the given record.
 */
const callbackTypeForMessage = record => {
  if (record instanceof _didcomm.DidCommCredentialExchangeRecord && (record.state === _didcomm.DidCommCredentialState.Done || record.state === _didcomm.DidCommCredentialState.OfferReceived)) {
    return _ChatMessage.CallbackType.CredentialOffer;
  }
  if (record instanceof _didcomm.DidCommProofExchangeRecord && (0, _verifier.isPresentationReceived)(record) && record.isVerified !== undefined || record.state === _didcomm.DidCommProofState.RequestReceived || record.state === _didcomm.DidCommProofState.Done && record.isVerified === undefined) {
    return _ChatMessage.CallbackType.ProofRequest;
  }
  if (record instanceof _didcomm.DidCommProofExchangeRecord && (record.state === _didcomm.DidCommProofState.PresentationSent || record.state === _didcomm.DidCommProofState.Done)) {
    return _ChatMessage.CallbackType.PresentationSent;
  }
};

/**
 * Custom hook for retrieving chat messages for a given connection. This hook includes some of
 * the JSX for rendering the chat messages, including the logic for handling links in messages.
 *
 * @param {ConnectionRecord} connection - The connection to retrieve chat messages for.
 * @returns {ExtendedChatMessage[]} The chat messages for the given connection.
 */
const useChatMessagesByConnection = connection => {
  const [messages, setMessages] = (0, _react.useState)([]);
  const [store] = (0, _store.useStore)();
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const {
    ChatTheme: theme,
    ColorPalette
  } = (0, _theme.useTheme)();
  const navigation = (0, _native.useNavigation)();
  const basicMessages = (0, _reactHooks.useBasicMessagesByConnectionId)(connection === null || connection === void 0 ? void 0 : connection.id);
  const credentials = (0, _credentials.useCredentialsByConnectionId)(connection === null || connection === void 0 ? void 0 : connection.id);
  const proofs = (0, _proofs.useProofsByConnectionId)(connection === null || connection === void 0 ? void 0 : connection.id);
  const [theirLabel, setTheirLabel] = (0, _react.useState)((0, _helpers.getConnectionName)(connection, store.preferences.alternateContactNames));

  // This useEffect is for properly rendering changes to the alt contact name, useMemo did not pick them up
  (0, _react.useEffect)(() => {
    setTheirLabel((0, _helpers.getConnectionName)(connection, store.preferences.alternateContactNames));
  }, [connection, store.preferences.alternateContactNames]);
  (0, _react.useEffect)(() => {
    const transformedMessages = basicMessages.map(record => {
      const role = (0, _helpers.getMessageEventRole)(record);
      // eslint-disable-next-line
      const linkRegex = /(?:https?\:\/\/\w+(?:\.\w+)+\S*)|(?:[\w\d\.\_\-]+@\w+(?:\.\w+)+)/gim;
      // eslint-disable-next-line
      const mailRegex = /^[\w\d\.\_\-]+@\w+(?:\.\w+)+$/gim;
      const links = record.content.match(linkRegex) ?? [];
      const handleLinkPress = link => {
        if (link.match(mailRegex)) {
          link = 'mailto:' + link;
        }
        _reactNative.Linking.openURL(link);
      };
      const msgText = /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
        style: role === _chat.Role.me ? theme.rightText : theme.leftText
      }, record.content.split(linkRegex).map((split, i) => {
        if (i < links.length) {
          const link = links[i];
          return /*#__PURE__*/_react.default.createElement(_react.Fragment, {
            key: `${record.id}-${i}`
          }, /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, null, split), /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
            onPress: () => handleLinkPress(link),
            style: {
              color: ColorPalette.brand.link,
              textDecorationLine: 'underline'
            },
            accessibilityRole: 'link'
          }, link));
        }
        return /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
          key: `${record.id}-${i}`
        }, split);
      }));
      return {
        _id: record.id,
        text: record.content,
        renderEvent: () => msgText,
        createdAt: record.createdAt,
        type: record.type,
        user: {
          _id: role
        }
      };
    });
    transformedMessages.push(...credentials.map(record => {
      const role = (0, _helpers.getCredentialEventRole)(record);
      const userLabel = role === _chat.Role.me ? t('Chat.UserYou') : theirLabel;
      const actionLabel = t((0, _helpers.getCredentialEventLabel)(record));
      return {
        _id: record.id,
        text: actionLabel,
        renderEvent: () => /*#__PURE__*/_react.default.createElement(_ChatEvent.ChatEvent, {
          role: role,
          userLabel: userLabel,
          actionLabel: actionLabel
        }),
        createdAt: record.createdAt,
        type: record.type,
        user: {
          _id: role
        },
        messageOpensCallbackType: callbackTypeForMessage(record),
        onDetails: () => {
          const navMap = {
            [_didcomm.DidCommCredentialState.Done]: () => {
              navigation.navigate(_navigators.Stacks.ContactStack, {
                screen: _navigators.Screens.CredentialDetails,
                params: {
                  credentialId: record.id
                }
              });
            },
            [_didcomm.DidCommCredentialState.OfferReceived]: () => {
              // if we are in the contact stack, use the parent navigator
              if (navigation.getParent()) {
                var _navigation$getParent;
                (_navigation$getParent = navigation.getParent()) === null || _navigation$getParent === void 0 || _navigation$getParent.navigate(_navigators.Stacks.ConnectionStack, {
                  screen: _navigators.Screens.Connection,
                  params: {
                    credentialId: record.id
                  }
                });
              } else {
                // if we are in the root stack, use the current navigator
                navigation.navigate(_navigators.Stacks.ConnectionStack, {
                  screen: _navigators.Screens.Connection,
                  params: {
                    credentialId: record.id
                  }
                });
              }
            }
          };
          const nav = navMap[record.state];
          if (nav) {
            nav();
          }
        }
      };
    }));
    transformedMessages.push(...proofs.map(record => {
      const role = (0, _helpers.getProofEventRole)(record);
      const userLabel = role === _chat.Role.me ? t('Chat.UserYou') : theirLabel;
      const actionLabel = t((0, _helpers.getProofEventLabel)(record));
      return {
        _id: record.id,
        text: actionLabel,
        renderEvent: () => /*#__PURE__*/_react.default.createElement(_ChatEvent.ChatEvent, {
          role: role,
          userLabel: userLabel,
          actionLabel: actionLabel
        }),
        createdAt: record.createdAt,
        type: record.type,
        user: {
          _id: role
        },
        messageOpensCallbackType: callbackTypeForMessage(record),
        onDetails: () => {
          const toProofDetails = () => {
            navigation.navigate(_navigators.Stacks.ContactStack, {
              screen: _navigators.Screens.ProofDetails,
              params: {
                recordId: record.id,
                isHistory: true,
                senderReview: record.state === _didcomm.DidCommProofState.PresentationSent || record.state === _didcomm.DidCommProofState.Done && record.isVerified === undefined
              }
            });
          };
          const navMap = {
            [_didcomm.DidCommProofState.Done]: toProofDetails,
            [_didcomm.DidCommProofState.PresentationSent]: toProofDetails,
            [_didcomm.DidCommProofState.PresentationReceived]: toProofDetails,
            [_didcomm.DidCommProofState.RequestReceived]: () => {
              // if we are in the contact stack, use the parent navigator
              if (navigation.getParent()) {
                var _navigation$getParent2;
                (_navigation$getParent2 = navigation.getParent()) === null || _navigation$getParent2 === void 0 || _navigation$getParent2.navigate(_navigators.Stacks.ConnectionStack, {
                  screen: _navigators.Screens.Connection,
                  params: {
                    proofId: record.id
                  }
                });
              } else {
                // if we are in the root stack, use the current navigator
                navigation.navigate(_navigators.Stacks.ConnectionStack, {
                  screen: _navigators.Screens.Connection,
                  params: {
                    proofId: record.id
                  }
                });
              }
            }
          };
          const nav = navMap[record.state];
          if (nav) {
            nav();
          }
        }
      };
    }));
    const connectedMessage = connection ? {
      _id: 'connected',
      text: `${t('Chat.YouConnected')} ${theirLabel}`,
      renderEvent: () => /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
        style: theme.rightText
      }, t('Chat.YouConnected'), /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
        style: [theme.rightText, theme.rightTextHighlighted]
      }, " ", theirLabel)),
      createdAt: connection.createdAt,
      user: {
        _id: _chat.Role.me
      }
    } : undefined;
    setMessages(connectedMessage ? [...transformedMessages.sort((a, b) => b.createdAt - a.createdAt), connectedMessage] : transformedMessages.sort((a, b) => b.createdAt - a.createdAt));
  }, [ColorPalette, basicMessages, theme, credentials, t, navigation, proofs, theirLabel, connection]);
  return messages;
};
exports.useChatMessagesByConnection = useChatMessagesByConnection;
//# sourceMappingURL=chat-messages.js.map